import { useMemo } from 'react';
import { KNOWLEDGE_BASE } from '../../../core/constants';
import { Category, Difficulty } from '../../../core/types';
import { useKnowledgeBaseStore } from '../../../store/knowledgeBaseStore';

export const useTopicsFilter = () => {
  const { searchQuery, selectedDifficulty, selectedTags } = useKnowledgeBaseStore();

  const flatTopics = useMemo(
    () => KNOWLEDGE_BASE.flatMap(c => c.topics),
    []
  );

  const { isLearned } = useKnowledgeBaseStore();

  const filteredCategories = useMemo(() => {
    return KNOWLEDGE_BASE.map(cat => ({
      ...cat,
      topics: cat.topics
        .filter(t => {
          const matchesSearch = !searchQuery || 
            t.title.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesDifficulty = selectedDifficulty === 'all' || 
            t.difficulty === selectedDifficulty;
          const matchesTags = selectedTags.length === 0 || 
            selectedTags.some(tag => t.tags.includes(tag));
          return matchesSearch && matchesDifficulty && matchesTags;
        })
        .sort((a, b) => {
          const aLearned = isLearned(a.id);
          const bLearned = isLearned(b.id);
          if (aLearned === bLearned) return 0;
          return aLearned ? 1 : -1;
        })
    })).filter(cat => cat.topics.length > 0);
  }, [searchQuery, selectedDifficulty, selectedTags, isLearned]);

  return { flatTopics, filteredCategories };
};

