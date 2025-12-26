
import React, { useEffect, useRef } from 'react';
import { Topic } from '../../../core/types';
import { Badge, CodeBlock } from '../../../components/ui';
import ScopeChainVisualizer from '../visualizers/ScopeChainVisualizer';
import { useKnowledgeBaseStore } from '../../../store/knowledgeBaseStore';
import { highlightText } from '../utils/highlightText';

interface ContentProps {
  topic: Topic;
  relatedTopics: Topic[];
  onTopicJump: (id: string) => void;
  contentSearchQuery: string | null;
  setContentSearchQuery: (query: string | null) => void;
  searchResults: Topic[];
  savedSearchQuery: string | null;
}

const Content: React.FC<ContentProps> = (props) => {
  const { topic, contentSearchQuery, searchResults, savedSearchQuery, setContentSearchQuery } = props;
  const { isLearned, toggleLearned, selectedMetaCategory } = useKnowledgeBaseStore();
  const learned = isLearned(topic.id, selectedMetaCategory);
  const contentRef = useRef<HTMLDivElement>(null);

  // Используем сохраненный запрос для выделения, если есть
  const highlightQuery = savedSearchQuery && savedSearchQuery.trim() 
    ? savedSearchQuery 
    : (contentSearchQuery && contentSearchQuery.trim() ? contentSearchQuery : null);

  const relevantTopics = contentSearchQuery && contentSearchQuery.trim() 
    ? searchResults 
    : props.relatedTopics;

  // Получение слова из выделения после двойного клика
  const getWordFromSelection = (): string | null => {
    const selection = window.getSelection();
    
    if (!selection || selection.rangeCount === 0) {
      return null;
    }

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString().trim();

    // Проверяем, что выделение находится внутри контентной части
    if (!contentRef.current || !contentRef.current.contains(range.commonAncestorContainer)) {
      return null;
    }

    // Проверяем, что выделено одно слово (без пробелов)
    if (!selectedText || /\s/.test(selectedText) || selectedText.length < 2) {
      return null;
    }

    return selectedText;
  };

  // Обработка двойного клика
  useEffect(() => {
    const handleDoubleClick = (e: MouseEvent) => {
      if (!contentRef.current || !contentRef.current.contains(e.target as Node)) {
        return;
      }

      // Небольшая задержка, чтобы браузер успел выделить слово
      setTimeout(() => {
        const word = getWordFromSelection();
        
        if (word) {
          setContentSearchQuery(word);
          // Снимаем выделение
          window.getSelection()?.removeAllRanges();
        }
      }, 10);
    };

    const element = contentRef.current;
    if (element) {
      element.addEventListener('dblclick', handleDoubleClick);
    }

    return () => {
      if (element) {
        element.removeEventListener('dblclick', handleDoubleClick);
      }
    };
  }, [setContentSearchQuery]);


  return (
    <div ref={contentRef} key={topic.id} className="w-full max-w-[min(90vw,80rem)] mx-auto py-12 px-6 animate-content relative">
      <header className="mb-10 relative">
        <div className="flex items-start mb-2">
          <Badge variant={topic.difficulty} className="px-3 py-1.5" />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-4xl font-black text-white tracking-tight leading-tight">{topic.title}</h2>
          {learned && (
            <span className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded text-emerald-400 text-xs font-bold">
              ИЗУЧЕНО
            </span>
          )}
        </div>
        <p className="text-slate-400 text-base font-medium leading-relaxed mb-6">
          {highlightQuery ? highlightText(topic.description, highlightQuery) : topic.description}
        </p>
      </header>

      <section className="bg-[#12162a] border border-slate-800/60 rounded-xl p-8 mb-10 shadow-xl">
        <h3 className="text-white text-sm font-bold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-star text-emerald-500 text-xs"></i>
          Ключевые моменты
        </h3>
        <ul className="space-y-4">
          {topic.keyPoints.map((point, i) => (
            <li key={i} className="flex gap-3 text-slate-300 text-sm leading-relaxed group">
              <span className="text-emerald-500 font-bold">•</span>
              <span>{highlightQuery ? highlightText(point, highlightQuery) : point}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mb-10">
        <h3 className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-4">ПРИМЕРЫ</h3>
        {topic.examples?.map((ex, i) => (
          <CodeBlock key={i} title={ex.title} code={ex.code} />
        ))}
      </div>

      {topic.id === 'scope-chain' && <ScopeChainVisualizer />}

      <button
        onClick={() => toggleLearned(topic.id, selectedMetaCategory)}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg border transition-all ${
          learned
            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20'
            : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-700/40 hover:text-slate-300'
        }`}
      >
        <i className={`fa-solid ${learned ? 'fa-check-circle' : 'fa-circle'} text-base`}></i>
        <span className="text-sm font-bold">{learned ? 'Изучено' : 'Отметить как изученное'}</span>
      </button>

      {relevantTopics.length > 0 && (
        <div className="mt-16">
          <h3 className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-6">
            {contentSearchQuery ? 'РЕЛЕВАНТНЫЕ ТЕМЫ (поиск)' : 'РЕЛЕВАНТНЫЕ ТЕМЫ'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {relevantTopics.map(relatedTopic => (
              <div
                key={relatedTopic.id}
                onClick={() => props.onTopicJump(relatedTopic.id)}
                className="text-left bg-[#334155] border border-slate-800/60 rounded-xl p-5 hover:border-emerald-500/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={relatedTopic.difficulty} className="px-2 py-0.5" />
                      <h4 className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {relatedTopic.title}
                      </h4>
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-3">{relatedTopic.description}</p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-800/40 flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all flex-shrink-0">
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

export default Content;
