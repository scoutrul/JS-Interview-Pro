import { useState, useMemo, useRef } from 'react';
import { KNOWLEDGE_BASE, getKnowledgeBaseByCategory } from '../../../core/constants';
import { Topic } from '../../../core/types';
import { MetaCategoryId } from '../../../core/metaCategories';

export const useContentSearch = (currentTopicId: string | undefined) => {
  const [contentSearchQuery, setContentSearchQuery] = useState<string | null>(null);
  const searchAreaRef = useRef<HTMLDivElement | null>(null);

  // Получаем все темы из всех категорий
  const allTopics = useMemo(() => {
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
    
    return allCategories.flatMap(categoryId => {
      const categories = getKnowledgeBaseByCategory(categoryId);
      return categories.flatMap(cat => cat.topics);
    });
  }, []);

  const searchResults = useMemo(() => {
    if (!contentSearchQuery || !contentSearchQuery.trim() || !currentTopicId) {
      return [];
    }

    // Разбиваем запрос на слова (минимум 3 символа)
    const searchWords = contentSearchQuery
      .toLowerCase()
      .split(/\s+/)
      .map(word => word.trim())
      .filter(word => word.length >= 3);

    if (searchWords.length === 0) {
      return [];
    }

    // Ищем темы, где хотя бы одно слово найдено в контенте
    return allTopics.filter(t => {
      const searchText = [
        t.title,
        t.description,
        ...t.keyPoints,
        ...(t.examples?.map(ex => `${ex.title} ${ex.code}`) || []),
        ...t.tags
      ].join(' ').toLowerCase();

      return searchWords.some(word => searchText.includes(word));
    });
  }, [contentSearchQuery, allTopics, currentTopicId]);

  // Закрытие поиска при клике вне области поиска
  // Обработчик вынесен в компонент для более точного контроля

  return {
    contentSearchQuery,
    setContentSearchQuery,
    searchResults,
    searchAreaRef
  };
};

