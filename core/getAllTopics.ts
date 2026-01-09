import { Topic, Category } from './types';
import { META_CATEGORIES_DATA } from './metaCategoriesData';
import { MetaCategoryId } from './metaCategories';

interface TopicWithMeta {
  topic: Topic;
  metaCategoryId: MetaCategoryId;
  category: Category;
}

/**
 * Получить все темы из всех мета-категорий
 */
export function getAllTopics(): Topic[] {
  const allCategories = Object.values(META_CATEGORIES_DATA).flat();
  return allCategories.flatMap(c => c.topics);
}

/**
 * Получить тему по ID
 */
export function getTopicById(id: string): Topic | undefined {
  const allTopics = getAllTopics();
  return allTopics.find(t => t.id === id);
}

/**
 * Получить все темы с мета-информацией (категория и мета-категория)
 */
export function getAllTopicsWithMeta(): TopicWithMeta[] {
  const result: TopicWithMeta[] = [];
  
  Object.entries(META_CATEGORIES_DATA).forEach(([metaCategoryId, categories]) => {
    categories.forEach(category => {
      category.topics.forEach(topic => {
        result.push({
          topic,
          metaCategoryId: metaCategoryId as MetaCategoryId,
          category
        });
      });
    });
  });
  
  return result;
}

/**
 * Найти мета-категорию для темы по ID
 */
export function findTopicMetaCategory(topicId: string): MetaCategoryId | null {
  const topicsWithMeta = getAllTopicsWithMeta();
  const found = topicsWithMeta.find(t => t.topic.id === topicId);
  return found ? found.metaCategoryId : null;
}
