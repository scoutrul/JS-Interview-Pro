
import React, { useMemo } from 'react';
import { Topic, Category } from '../../../core/types';
import { Badge } from '../../../components/ui';
import { highlightText } from '../utils/highlightText';
import { extractRelevantFragment } from '../utils/extractRelevantFragment';
import { MetaCategoryId } from '../../../core/metaCategories';
import { META_CATEGORIES } from '../../../core/metaCategories';

interface TopicCardProps {
  topic: Topic;
  onClick: () => void;
  highlightQuery?: string | null;
  relevanceWords?: string[]; // Слова для поиска релевантности (теги текущей темы)
  metaCategoryId?: MetaCategoryId;
  category?: Category;
  padding?: 'p-4' | 'p-5';
  descriptionLines?: 2 | 3;
}

const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  onClick,
  highlightQuery,
  relevanceWords,
  metaCategoryId,
  category,
  padding = 'p-4',
  descriptionLines = 2
}) => {
  const metaCategory = metaCategoryId ? META_CATEGORIES.find(m => m.id === metaCategoryId) : null;

  const labels = [
    metaCategory && { title: metaCategory.title, icon: metaCategory.icon },
    category && { title: category.title, icon: undefined }
  ].filter(Boolean) as Array<{ title: string; icon?: string }>;

  // Определяем текст описания для отображения
  const descriptionText = useMemo(() => {
    // Если есть поисковый запрос, извлекаем релевантный фрагмент
    if (highlightQuery && highlightQuery.trim().length >= 3) {
      const searchWords = highlightQuery
        .toLowerCase()
        .split(/\s+/)
        .map(word => word.trim())
        .filter(word => word.length >= 3);
      
      if (searchWords.length > 0) {
        const { fragment } = extractRelevantFragment(topic.description, searchWords);
        return fragment;
      }
      return topic.description || '';
    }
    
    // Если есть слова для релевантности, извлекаем фрагмент
    if (relevanceWords && relevanceWords.length > 0) {
      const { fragment } = extractRelevantFragment(topic.description, relevanceWords);
      return fragment;
    }
    
    // Иначе показываем полное описание
    return topic.description || '';
  }, [topic.description, highlightQuery, relevanceWords]);

  // Определяем, что подсвечивать
  const displayDescription = useMemo(() => {
    if (highlightQuery) {
      // Подсвечиваем поисковый запрос
      return highlightText(descriptionText, highlightQuery);
    }
    
    if (relevanceWords && relevanceWords.length > 0) {
      // Подсвечиваем найденное слово из relevanceWords
      const { foundWord } = extractRelevantFragment(topic.description, relevanceWords);
      if (foundWord) {
        return highlightText(descriptionText, foundWord);
      }
    }
    
    return descriptionText;
  }, [descriptionText, highlightQuery, relevanceWords, topic.description]);

  return (
    <div
      onClick={onClick}
      className={`text-left bg-[#334155] border border-slate-800/60 rounded-xl ${padding} hover:border-emerald-500/30 transition-all cursor-pointer group`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant={topic.difficulty} className="px-2 py-0.5" />
            <h4 className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
              {topic.title}
            </h4>
            {labels.length > 0 && (
              <div className="flex items-center gap-1 self-center">
                {labels.map((label, index) => (
                  <span key={index} className="px-1 text-[9px] text-emerald-500 whitespace-nowrap">
                    {label.icon && <i className={`${label.icon} mr-1`}></i>}
                    {label.title}
                  </span>
                ))}
              </div>
            )}
          </div>
          <p className={`text-slate-400 text-xs ${descriptionLines === 2 ? 'line-clamp-2' : 'line-clamp-3'}`}>
            {displayDescription}
          </p>
        </div>
        <div className={`${padding === 'p-4' ? 'w-6 h-6' : 'w-7 h-7'} rounded-full bg-slate-800/40 flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all flex-shrink-0`}>
          <i className="fa-solid fa-arrow-right text-[9px]"></i>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;

