import React from 'react';
import { useNavigate } from 'react-router-dom';
import { META_CATEGORIES, MetaCategoryId } from '../../../core/metaCategories';
import { useKnowledgeBaseStore } from '../../../store/knowledgeBaseStore';
import { getKnowledgeBaseByCategory } from '../../../core/constants';

const KnowledgePath: React.FC = () => {
  const navigate = useNavigate();
  const { selectedMetaCategory, setSelectedMetaCategory, setSelectedTopicId, getProgress, clearFilters } = useKnowledgeBaseStore();

  const handleCategorySelect = (categoryId: MetaCategoryId) => {
    setSelectedMetaCategory(categoryId);
    clearFilters(); // Очищаем фильтры при переключении категории
    // При переключении категории выбираем первую тему
    const knowledgeBase = getKnowledgeBaseByCategory(categoryId);
    const firstTopic = knowledgeBase.flatMap(cat => cat.topics)[0];
    if (firstTopic) {
      setSelectedTopicId(firstTopic.id);
      navigate(`/${categoryId}/${firstTopic.id}`);
    } else {
      navigate(`/${categoryId}`);
    }
  };

  // Подсчитываем общее количество тем для каждой категории
  const getTotalTopics = (categoryId: MetaCategoryId): number => {
    const knowledgeBase = getKnowledgeBaseByCategory(categoryId);
    return knowledgeBase.flatMap(cat => cat.topics).length;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800/80 shadow-2xl">
      <div className="w-full px-0 lg:px-4 py-2">
        <div className="flex items-center justify-center gap-2 overflow-x-auto custom-scrollbar">
          {META_CATEGORIES.map((category) => {
            const totalTopics = getTotalTopics(category.id);
            const progress = getProgress(category.id, totalTopics);
            const isActive = selectedMetaCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`
                  flex items-center gap-2 px-2 lg:px-3 py-1.5 rounded-md transition-all flex-shrink-0
                  ${isActive 
                    ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400' 
                    : 'bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:bg-slate-800/70 hover:text-slate-300'
                  }
                `}
              >
                <i className={`${category.icon} text-sm ${isActive ? 'text-emerald-400' : 'text-slate-500'}`}></i>
                <div className="hidden lg:flex flex-col items-start min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-wider leading-tight whitespace-nowrap">
                    {category.title}
                  </div>
                  {totalTopics > 0 && (
                    <div className="text-[9px] text-slate-500 leading-tight">
                      {progress}% • {totalTopics}
                    </div>
                  )}
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KnowledgePath;

