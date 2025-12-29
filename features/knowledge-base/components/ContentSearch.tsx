import React from 'react';
import { TopicWithMeta } from '../hooks/useContentSearch';
import TopicCard from './TopicCard';

interface ContentSearchProps {
  contentSearchQuery: string | null;
  setContentSearchQuery: (query: string | null) => void;
  searchResults: TopicWithMeta[];
  searchAreaRef: React.RefObject<HTMLDivElement | null>;
  onTopicSelect: (id: string, query: string | null) => void;
}

const ContentSearch: React.FC<ContentSearchProps> = ({
  contentSearchQuery,
  setContentSearchQuery,
  searchResults,
  searchAreaRef,
  onTopicSelect
}) => {
  if (contentSearchQuery === null) {
    return (
      <button
        onClick={() => setContentSearchQuery('')}
        className="fixed top-4 right-6 z-40 w-10 h-10 bg-slate-900/90 border border-slate-800/80 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-300 hover:bg-slate-800/90 transition-all shadow-lg"
        title="Поиск по контенту"
      >
        <i className="fa-solid fa-search text-sm"></i>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop overlay с blur эффектом */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all"
        onClick={() => setContentSearchQuery(null)}
      />
      
      <div 
        ref={searchAreaRef}
        className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[min(90vw,80rem)] px-2 lg:px-6"
      >
      <div className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800/80 shadow-xl py-4 rounded-b-lg">
        <div className="relative px-2 lg:px-4">
          <i className="fa-solid fa-search absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
          <input 
            type="text" 
            placeholder="Поиск по контенту..." 
            value={contentSearchQuery}
            onChange={(e) => setContentSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-3 pl-11 pr-11 text-base text-slate-300 outline-none focus:border-emerald-500/50 placeholder:text-slate-600 transition-colors"
            autoFocus
          />
          <button
            onClick={() => setContentSearchQuery(null)}
            className="absolute right-7 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
            title="Закрыть поиск"
          >
            <i className="fa-solid fa-times text-xs"></i>
          </button>
        </div>
      </div>

      {/* Результаты поиска - под формой */}
      {searchResults.length > 0 && (
        <div className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800/80 max-h-[60vh] overflow-y-auto py-4 rounded-b-lg">
          <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 px-2 lg:px-4">
            РЕЗУЛЬТАТЫ ПОИСКА ({searchResults.length})
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-2 lg:px-4">
            {searchResults.map(({ topic, metaCategoryId, category }) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                onClick={() => {
                  // Передаем запрос перед переходом, чтобы он сохранился для выделения
                  onTopicSelect(topic.id, contentSearchQuery);
                  setContentSearchQuery(null);
                }}
                highlightQuery={contentSearchQuery}
                metaCategoryId={metaCategoryId}
                category={category}
                padding="p-4"
                descriptionLines={2}
              />
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ContentSearch;

