
import React from 'react';
import { Topic, Category } from '../../../core/types';
import { Badge } from '../../../components/ui';
import { highlightText } from '../utils/highlightText';
import { MetaCategoryId } from '../../../core/metaCategories';
import { META_CATEGORIES } from '../../../core/metaCategories';

interface TopicCardProps {
  topic: Topic;
  onClick: () => void;
  highlightQuery?: string | null;
  metaCategoryId?: MetaCategoryId;
  category?: Category;
  padding?: 'p-4' | 'p-5';
  descriptionLines?: 2 | 3;
}

const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  onClick,
  highlightQuery,
  metaCategoryId,
  category,
  padding = 'p-4',
  descriptionLines = 2
}) => {
  const metaCategory = metaCategoryId ? META_CATEGORIES.find(m => m.id === metaCategoryId) : null;

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
            {metaCategory && (
              <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/50 rounded text-[10px] text-emerald-400 font-bold">
                <i className={`${metaCategory.icon} mr-1`}></i>
                {metaCategory.title}
              </span>
            )}
            {category && (
              <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/50 rounded text-[10px] text-emerald-400 font-bold">
                {category.title}
              </span>
            )}
          </div>
          <p className={`text-slate-400 text-xs ${descriptionLines === 2 ? 'line-clamp-2' : 'line-clamp-3'}`}>
            {highlightQuery ? highlightText(topic.description, highlightQuery) : (topic.description || '')}
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

