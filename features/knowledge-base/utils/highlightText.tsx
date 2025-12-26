import React from 'react';

// Функция для подсветки найденных слов в тексте
export const highlightText = (text: string, query: string | null): React.ReactNode => {
  if (!query || query.trim().length < 3) {
    return text;
  }

  const searchWords = query
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.trim())
    .filter(word => word.length >= 3);

  if (searchWords.length === 0) {
    return text;
  }

  // Создаем регулярное выражение для поиска всех слов
  const regex = new RegExp(`(${searchWords.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    const isMatch = searchWords.some(word => part.toLowerCase() === word.toLowerCase());
    if (isMatch) {
      return (
        <mark key={index} className="bg-emerald-500/30 text-emerald-300 px-0.5 rounded">
          {part}
        </mark>
      );
    }
    return <span key={index}>{part}</span>;
  });
};



