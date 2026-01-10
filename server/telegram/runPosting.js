import { getAllTopics, getTopicsByMetaCategory, getTopicById } from '../services/topics.js';
import { getNextTopics, getTopicByIdForPosting, saveState } from '../services/telegram/state.js';
import { formatArticleForTelegram } from './formatArticle.js';
import { sendMessage } from './client.js';
import { FRONTEND_BASE_URL } from '../config/env.js';

/**
 * Отправить одну тему в Telegram
 */
async function postSingleTopic(topic) {
  console.log(`Posting topic: ${topic.id} - ${topic.title}`);
  
  const formattedText = formatArticleForTelegram(topic, FRONTEND_BASE_URL);
  
  // Telegram имеет лимит 4096 символов на сообщение
  if (formattedText.length > 4096) {
    console.warn(`Topic ${topic.id} is too long (${formattedText.length} chars), truncating...`);
    const truncated = formattedText.substring(0, 3900);
    const finalText = truncated + '\n\n_... (сообщение обрезано, читайте полную версию на сайте)_';
    await sendMessage(finalText);
  } else {
    await sendMessage(formattedText);
  }
  
  return topic.id;
}

/**
 * Запустить постинг статей в Telegram с ротацией по мета-категориям
 */
export async function runTelegramPosting(count = 2) {
  try {
    console.log(`Starting Telegram posting for ${count} article(s)...`);
    
    // Получаем следующие темы с ротацией по мета-категориям
    const { topics, state } = await getNextTopics(
      count, 
      getAllTopics, 
      getTopicsByMetaCategory,
      null // findTopicMetaCategory не нужен в новой логике
    );
    
    if (topics.length === 0) {
      console.log('No topics to post.');
      return { success: false, message: 'No topics to post', posted: [] };
    }
    
    const posted = [];
    const errors = [];
    
    // Постим каждую тему
    for (const topic of topics) {
      try {
        const topicId = await postSingleTopic(topic);
        posted.push(topicId);
        console.log(`Successfully posted: ${topicId}`);
        
        // Небольшая задержка между постами
        if (topics.length > 1) {
          await new Promise(resolve => setTimeout(resolve, 2000)); // 2 секунды
        }
      } catch (error) {
        console.error(`Error posting topic ${topic.id}:`, error);
        errors.push({ topicId: topic.id, error: error.message });
      }
    }
    
    // Сохраняем состояние только если хотя бы один пост успешен
    if (posted.length > 0) {
      // Обновляем state, убирая темы, которые не удалось запостить
      state.posted = state.posted.filter(id => posted.includes(id) || !topics.find(t => t.id === id));
      await saveState(state);
    }
    
    return {
      success: posted.length > 0,
      posted,
      errors: errors.length > 0 ? errors : undefined,
      message: `Posted ${posted.length} of ${topics.length} topics`
    };
  } catch (error) {
    console.error('Error in runTelegramPosting:', error);
    throw error;
  }
}

/**
 * Запостить конкретную тему по ID
 */
export async function postTopicById(topicId) {
  try {
    console.log(`Posting specific topic: ${topicId}`);
    
    const { topic, state, error, warning } = await getTopicByIdForPosting(topicId, getAllTopics);
    
    if (error) {
      return { success: false, error, posted: [] };
    }
    
    if (!topic) {
      return { success: false, error: 'Topic not found', posted: [] };
    }
    
    if (warning) {
      console.warn(warning);
      // Продолжаем постинг даже если уже был запощен
    }
    
    try {
      await postSingleTopic(topic);
      
      // Сохраняем состояние
      if (state) {
        await saveState(state);
      }
      
      return {
        success: true,
        posted: [topicId],
        warning: warning || undefined,
        message: `Successfully posted topic: ${topicId}`
      };
    } catch (error) {
      // Если ошибка при отправке, не сохраняем состояние
      return {
        success: false,
        error: error.message,
        posted: []
      };
    }
  } catch (error) {
    console.error('Error in postTopicById:', error);
    throw error;
  }
}
