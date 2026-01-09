// JS версия getAllTopics для сервера
// Читает данные из topics.json (генерируется скриптом generate-topics-json.js)
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TOPICS_JSON_FILE = join(__dirname, 'topics.json');

let cachedTopicsData = null;

/**
 * Загрузить данные тем из JSON
 */
function loadTopicsData() {
  if (cachedTopicsData) {
    return cachedTopicsData;
  }

  if (!existsSync(TOPICS_JSON_FILE)) {
    throw new Error(`topics.json not found at ${TOPICS_JSON_FILE}. Run: node scripts/generate-topics-json.js`);
  }

  try {
    const content = readFileSync(TOPICS_JSON_FILE, 'utf-8');
    cachedTopicsData = JSON.parse(content);
    return cachedTopicsData;
  } catch (error) {
    throw new Error(`Failed to load topics.json: ${error.message}`);
  }
}

/**
 * Получить все темы из всех мета-категорий
 */
export function getAllTopics() {
  const data = loadTopicsData();
  return data.topics || [];
}

/**
 * Получить тему по ID
 */
export function getTopicById(id) {
  const allTopics = getAllTopics();
  return allTopics.find(t => t.id === id);
}

/**
 * Найти мета-категорию для темы по ID
 */
export function findTopicMetaCategory(topicId) {
  const data = loadTopicsData();
  const topicMeta = data.topicsWithMeta?.find(t => t.topicId === topicId);
  return topicMeta ? topicMeta.metaCategoryId : null;
}

/**
 * Получить все мета-категории с их темами
 */
export function getTopicsByMetaCategory() {
  const data = loadTopicsData();
  const topics = getAllTopics();
  const topicsWithMeta = data.topicsWithMeta || [];
  
  const result = {};
  
  topics.forEach(topic => {
    const meta = topicsWithMeta.find(m => m.topicId === topic.id);
    if (meta) {
      if (!result[meta.metaCategoryId]) {
        result[meta.metaCategoryId] = [];
      }
      result[meta.metaCategoryId].push(topic);
    }
  });
  
  return result;
}
