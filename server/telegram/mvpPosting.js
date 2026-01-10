import { getAllTopics } from '../services/topics.js';
import { loadState, saveState } from '../services/telegram/state.js';
import { formatArticleForTelegram } from './formatArticle.js';
import { sendMessage } from './client.js';
import { addLogEntry } from './postingLog.js';
import { FRONTEND_BASE_URL } from '../config/env.js';

/**
 * Выбрать случайную неопубликованную тему
 */
function getRandomUnpostedTopic(allTopics, postedIds) {
  const unpostedTopics = allTopics.filter(topic => !postedIds.includes(topic.id));
  
  if (unpostedTopics.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * unpostedTopics.length);
  return unpostedTopics[randomIndex];
}

/**
 * Отправить случайную статью в Telegram канал
 */
export async function postRandomTopic() {
  try {
    console.log('Starting MVP posting: selecting random topic...');
    
    // Загружаем все темы и состояние
    const allTopics = getAllTopics();
    const state = await loadState();
    
    // Если все темы опубликованы, сбрасываем
    if (state.posted.length >= allTopics.length) {
      console.log('All topics have been posted. Resetting to start.');
      state.posted = [];
      await saveState(state);
    }
    
    // Выбираем случайную неопубликованную тему
    const topic = getRandomUnpostedTopic(allTopics, state.posted);
    
    if (!topic) {
      const error = 'No unposted topics available';
      console.log(error);
      await addLogEntry({
        topicId: null,
        status: 'error',
        error
      });
      return {
        success: false,
        error,
        posted: []
      };
    }
    
    console.log(`Posting topic: ${topic.id} - ${topic.title}`);
    
    // Форматируем и отправляем (без обрезки контента)
    const formattedText = formatArticleForTelegram(topic, FRONTEND_BASE_URL);
    
    // Отправляем сообщение
    const telegramResponse = await sendMessage(formattedText);
    const messageId = telegramResponse?.result?.message_id || null;
    
    // Сохраняем в состояние
    state.posted.push(topic.id);
    state.lastPostDate = new Date().toISOString().split('T')[0];
    await saveState(state);
    
    // Записываем в журнал
    await addLogEntry({
      topicId: topic.id,
      status: 'success',
      messageId
    });
    
    console.log(`Successfully posted: ${topic.id} (messageId: ${messageId})`);
    
    return {
      success: true,
      posted: [topic.id],
      messageId,
      topic: {
        id: topic.id,
        title: topic.title
      }
    };
  } catch (error) {
    console.error('Error in postRandomTopic:', error);
    
    // Записываем ошибку в журнал
    const topicId = error.topicId || null;
    await addLogEntry({
      topicId,
      status: 'error',
      error: error.message || String(error)
    });
    
    return {
      success: false,
      error: error.message || String(error),
      posted: []
    };
  }
}
