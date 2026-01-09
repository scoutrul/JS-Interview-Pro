import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const STATE_FILE = join(__dirname, 'posted-topics.json');

const DEFAULT_STATE = {
  lastIndex: 0,
  posted: [],
  lastPostDate: null,
  metaCategoryRotation: {}, // { metaCategoryId: lastIndex }
  lastMetaCategories: [] // Последние использованные мета-категории для ротации
};

/**
 * Загрузить состояние постинга
 */
export async function loadState() {
  try {
    if (!existsSync(STATE_FILE)) {
      return DEFAULT_STATE;
    }
    
    const content = await readFile(STATE_FILE, 'utf-8');
    const state = JSON.parse(content);
    
    // Валидация структуры
    return {
      lastIndex: state.lastIndex ?? 0,
      posted: Array.isArray(state.posted) ? state.posted : [],
      lastPostDate: state.lastPostDate || null,
      metaCategoryRotation: state.metaCategoryRotation || {},
      lastMetaCategories: Array.isArray(state.lastMetaCategories) ? state.lastMetaCategories : []
    };
  } catch (error) {
    console.error('Error loading state:', error);
    return DEFAULT_STATE;
  }
}

/**
 * Сохранить состояние постинга
 */
export async function saveState(state) {
  try {
    const data = {
      lastIndex: state.lastIndex ?? 0,
      posted: Array.isArray(state.posted) ? state.posted : [],
      lastPostDate: state.lastPostDate || null,
      metaCategoryRotation: state.metaCategoryRotation || {},
      lastMetaCategories: Array.isArray(state.lastMetaCategories) ? state.lastMetaCategories : []
    };
    
    await writeFile(STATE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving state:', error);
    throw error;
  }
}

/**
 * Получить следующие темы для постинга с ротацией по мета-категориям
 */
export async function getNextTopics(count, getAllTopicsFn, getTopicsByMetaCategoryFn, findTopicMetaCategoryFn) {
  const state = await loadState();
  const topicsByMeta = getTopicsByMetaCategoryFn();
  const allMetaCategories = Object.keys(topicsByMeta);
  
  if (allMetaCategories.length === 0) {
    return { topics: [], state };
  }
  
  const topics = [];
  const usedMetaCategories = [];
  
  // Если все статьи опубликованы, начинаем заново
  const allTopics = getAllTopicsFn();
  if (state.posted.length >= allTopics.length) {
    console.log('All topics have been posted. Resetting to start.');
    state.posted = [];
    state.metaCategoryRotation = {};
    state.lastMetaCategories = [];
  }
  
  // Инициализируем ротацию для всех мета-категорий
  allMetaCategories.forEach(metaId => {
    if (state.metaCategoryRotation[metaId] === undefined) {
      state.metaCategoryRotation[metaId] = 0;
    }
  });
  
  // Выбираем темы из разных мета-категорий
  let attempts = 0;
  const maxAttempts = allMetaCategories.length * 10; // Защита от бесконечного цикла
  
  while (topics.length < count && attempts < maxAttempts) {
    // Определяем, из какой мета-категории брать следующую тему
    // Чередуем категории, избегая повторений в рамках одного дня
    let availableMetaCategories = allMetaCategories.filter(metaId => {
      const categoryTopics = topicsByMeta[metaId] || [];
      const unpostedTopics = categoryTopics.filter(t => !state.posted.includes(t.id));
      return unpostedTopics.length > 0;
    });
    
    // Исключаем категории, которые уже использованы в этом запросе
    availableMetaCategories = availableMetaCategories.filter(
      metaId => !usedMetaCategories.includes(metaId)
    );
    
    // Если все категории использованы, сбрасываем список
    if (availableMetaCategories.length === 0) {
      usedMetaCategories.length = 0;
      availableMetaCategories = allMetaCategories.filter(metaId => {
        const categoryTopics = topicsByMeta[metaId] || [];
        const unpostedTopics = categoryTopics.filter(t => !state.posted.includes(t.id));
        return unpostedTopics.length > 0;
      });
    }
    
    if (availableMetaCategories.length === 0) {
      // Все темы опубликованы
      break;
    }
    
    // Выбираем категорию (приоритет тем, которые давно не использовались)
    let selectedMetaCategory;
    if (state.lastMetaCategories.length > 0) {
      // Ищем категорию, которая не использовалась в последних запросах
      const lastUsed = new Set(state.lastMetaCategories);
      const notRecentlyUsed = availableMetaCategories.filter(id => !lastUsed.has(id));
      selectedMetaCategory = notRecentlyUsed.length > 0 
        ? notRecentlyUsed[0] 
        : availableMetaCategories[0];
    } else {
      // Первый запуск - берем первую доступную
      selectedMetaCategory = availableMetaCategories[0];
    }
    
    // Получаем темы из выбранной категории
    const categoryTopics = topicsByMeta[selectedMetaCategory] || [];
    const unpostedTopics = categoryTopics.filter(t => !state.posted.includes(t.id));
    
    if (unpostedTopics.length > 0) {
      // Берем следующую тему из этой категории
      const categoryIndex = state.metaCategoryRotation[selectedMetaCategory] || 0;
      const topic = unpostedTopics[categoryIndex % unpostedTopics.length];
      
      topics.push(topic);
      state.posted.push(topic.id);
      usedMetaCategories.push(selectedMetaCategory);
      
      // Обновляем индекс для этой категории
      state.metaCategoryRotation[selectedMetaCategory] = 
        (state.metaCategoryRotation[selectedMetaCategory] || 0) + 1;
    }
    
    attempts++;
  }
  
  // Обновляем список последних использованных категорий (храним последние 10)
  state.lastMetaCategories = [
    ...usedMetaCategories,
    ...state.lastMetaCategories.filter(id => !usedMetaCategories.includes(id))
  ].slice(0, 10);
  
  state.lastPostDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  return { topics, state };
}

/**
 * Получить конкретную тему по ID для постинга
 */
export async function getTopicByIdForPosting(topicId, getAllTopicsFn) {
  const allTopics = getAllTopicsFn();
  const topic = allTopics.find(t => t.id === topicId);
  
  if (!topic) {
    return { topic: null, error: `Topic with id "${topicId}" not found` };
  }
  
  const state = await loadState();
  
  // Проверяем, не опубликована ли уже
  if (state.posted.includes(topicId)) {
    return { topic, warning: `Topic "${topicId}" already posted` };
  }
  
  // Добавляем в список опубликованных
  state.posted.push(topicId);
  state.lastPostDate = new Date().toISOString().split('T')[0];
  
  return { topic, state };
}
