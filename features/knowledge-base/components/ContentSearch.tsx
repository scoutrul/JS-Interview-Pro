import React from 'react';
import { Topic } from '../../../core/types';
import { Badge } from '../../../components/ui';
import { highlightText } from '../utils/highlightText';

interface ContentSearchProps {
  contentSearchQuery: string | null;
  setContentSearchQuery: (query: string | null) => void;
  searchResults: Topic[];
  searchAreaRef: React.RefObject<HTMLDivElement | null>;
  onTopicSelect: (id: string) => void;
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
    <div 
      ref={searchAreaRef}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[min(90vw,80rem)] px-6"
    >
      <div className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800/80 shadow-xl py-4 rounded-b-lg">
        <div className="relative px-4">
          <i className="fa-solid fa-search absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
          <input 
            type="text" 
            placeholder="Поиск по контенту..." 
            value={contentSearchQuery}
            onChange={(e) => setContentSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-3 pl-11 pr-11 text-sm text-slate-300 outline-none focus:border-emerald-500/50 placeholder:text-slate-600 transition-colors"
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
          <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 px-4">
            РЕЗУЛЬТАТЫ ПОИСКА ({searchResults.length})
          </h3>
          <div className="grid grid-cols-2 gap-3 px-4">
            {searchResults.map(resultTopic => (
              <div
                key={resultTopic.id}
                onClick={() => {
                  onTopicSelect(resultTopic.id);
                  setContentSearchQuery(null);
                }}
                className="text-left bg-[#334155] border border-slate-800/60 rounded-xl p-4 hover:border-emerald-500/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={resultTopic.difficulty} className="px-2 py-0.5" />
                      <h4 className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {resultTopic.title}
                      </h4>
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-2">
                      {contentSearchQuery ? highlightText(resultTopic.description, contentSearchQuery) : resultTopic.description}
                    </p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-800/40 flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all flex-shrink-0">
                    <i className="fa-solid fa-arrow-right text-[9px]"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentSearch;

