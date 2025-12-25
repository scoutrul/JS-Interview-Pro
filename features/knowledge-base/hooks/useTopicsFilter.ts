import { useMemo } from 'react';
import { getKnowledgeBaseByCategory } from '../../../core/constants';
import { Category, Difficulty } from '../../../core/types';
import { useKnowledgeBaseStore } from '../../../store/knowledgeBaseStore';

export const useTopicsFilter = () => {
  const { searchQuery, selectedDifficulty, selectedTags, selectedMetaCategory } = useKnowledgeBaseStore();

  const knowledgeBase = useMemo(
    () => getKnowledgeBaseByCategory(selectedMetaCategory),
    [selectedMetaCategory]
  );

  const flatTopics = useMemo(
    () => knowledgeBase.flatMap(c => c.topics),
    [knowledgeBase]
  );

  const { isLearned } = useKnowledgeBaseStore();

  const filteredCategories = useMemo(() => {
    // Разбиваем запрос на слова (минимум 3 символа)
    // Разбиваем по пробелам, фильтруем слова >= 3 символов
    const searchWords = searchQuery
      .toLowerCase()
      .split(/\s+/)
      .map(word => word.trim())
      .filter(word => word.length >= 3);
    
    return knowledgeBase.map(cat => ({
      ...cat,
      topics: cat.topics
        .filter(t => {
          // Поиск по словам: хотя бы одно слово должно быть найдено в title, description или tags
          const matchesSearch = !searchQuery || searchWords.length === 0 || 
            searchWords.some(word => {
              const titleMatch = t.title.toLowerCase().includes(word);
              const descriptionMatch = t.description.toLowerCase().includes(word);
              const tagsMatch = t.tags.some(tag => tag.toLowerCase().includes(word));
              return titleMatch || descriptionMatch || tagsMatch;
            });
          const matchesDifficulty = selectedDifficulty === 'all' || 
            t.difficulty === selectedDifficulty;
          const matchesTags = selectedTags.length === 0 || 
            selectedTags.some(tag => t.tags.includes(tag));
          return matchesSearch && matchesDifficulty && matchesTags;
        })
        .sort((a, b) => {
          const aLearned = isLearned(a.id, selectedMetaCategory);
          const bLearned = isLearned(b.id, selectedMetaCategory);
          // Изученные темы в конец списка
          if (aLearned && !bLearned) return 1;
          if (!aLearned && bLearned) return -1;
          
          // Сортировка по сложности: beginner → intermediate → advanced
          const difficultyOrder: Record<Difficulty, number> = {
            beginner: 1,
            intermediate: 2,
            advanced: 3
          };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        })
    })).filter(cat => cat.topics.length > 0);
  }, [searchQuery, selectedDifficulty, selectedTags, isLearned, knowledgeBase, selectedMetaCategory]);

  return { flatTopics, filteredCategories };
};

