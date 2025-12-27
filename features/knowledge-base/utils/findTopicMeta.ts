
import { getKnowledgeBaseByCategory } from '../../../core/constants';
import { Category } from '../../../core/types';
import { MetaCategoryId } from '../../../core/metaCategories';

export const findTopicMeta = (topicId: string): { metaCategoryId: MetaCategoryId | null; category: Category | null } => {
  const allCategories: MetaCategoryId[] = [
    'javascript',
    'markup',
    'frameworks',
    'typescript',
    'architecture',
    'security',
    'tools',
    'network',
    'optimization'
  ];

  for (const categoryId of allCategories) {
    const categories = getKnowledgeBaseByCategory(categoryId);
    for (const category of categories) {
      const topic = category.topics.find(t => t.id === topicId);
      if (topic) {
        return {
          metaCategoryId: categoryId,
          category
        };
      }
    }
  }

  return {
    metaCategoryId: null,
    category: null
  };
};




