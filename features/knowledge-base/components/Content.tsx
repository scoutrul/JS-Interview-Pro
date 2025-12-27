
import React, { useEffect, useRef } from 'react';
import { Topic } from '../../../core/types';
import { Badge, CodeBlock } from '../../../components/ui';
import ScopeChainVisualizer from '../visualizers/ScopeChainVisualizer';
import { useKnowledgeBaseStore } from '../../../store/knowledgeBaseStore';
import { highlightText } from '../utils/highlightText';
import TopicCard from './TopicCard';
import { findTopicMeta } from '../utils/findTopicMeta';

import { TopicWithMeta } from '../hooks/useContentSearch';

interface ContentProps {
  topic: Topic;
  relatedTopics: Topic[];
  onTopicJump: (id: string) => void;
  contentSearchQuery: string | null;
  setContentSearchQuery: (query: string | null) => void;
  searchResults: TopicWithMeta[];
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

  // Определяем, используем ли мы результаты поиска или релевантные темы
  const isSearchMode = contentSearchQuery && contentSearchQuery.trim();
  const relevantTopics: Topic[] = isSearchMode 
    ? searchResults.map(item => item.topic)
    : props.relatedTopics;
  
  // Создаем мапу метаданных для результатов поиска
  const searchResultsMeta = isSearchMode 
    ? new Map(searchResults.map(item => [item.topic.id, { metaCategoryId: item.metaCategoryId, category: item.category }]))
    : null;

  // Получение слова из выделения после двойного клика
  const getWordFromSelection = (): string | null => {
    const selection = window.getSelection();
    
    if (!selection || selection.rangeCount === 0) {
      return null;
    }

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString().trim();

    // Проверяем, что выделение находится внутри контентной части
    if (!contentRef.current) {
      return null;
    }

    // Проверяем, что выделение внутри нашего контейнера
    const container = range.commonAncestorContainer;
    const isInContainer = contentRef.current.contains(
      container.nodeType === Node.TEXT_NODE ? container.parentElement : container as Node
    );

    if (!isInContainer) {
      return null;
    }

    // Проверяем, что выделено одно слово (без пробелов и спецсимволов в начале/конце)
    if (!selectedText || /\s/.test(selectedText) || selectedText.length < 2) {
      return null;
    }

    // Очищаем от пунктуации в начале и конце
    const cleanedWord = selectedText.replace(/^[^\w]+|[^\w]+$/g, '');
    if (cleanedWord.length < 2) {
      return null;
    }

    return cleanedWord;
  };

  // Обработка двойного клика
  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    const handleDoubleClick = (e: MouseEvent) => {
      // Проверяем, что клик внутри контентной области
      const target = e.target as Node;
      if (!contentRef.current || !contentRef.current.contains(target)) {
        return;
      }

      // Увеличиваем задержку, чтобы браузер успел выделить слово
      setTimeout(() => {
        const word = getWordFromSelection();
        
        if (word) {
          setContentSearchQuery(word);
          // Снимаем выделение
          window.getSelection()?.removeAllRanges();
        }
      }, 50);
    };

    const element = contentRef.current;
    element.addEventListener('dblclick', handleDoubleClick);

    return () => {
      element.removeEventListener('dblclick', handleDoubleClick);
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
        <div className="text-slate-400 text-base font-medium leading-relaxed mb-6 space-y-3 whitespace-pre-line">
          {highlightQuery ? highlightText(topic.description, highlightQuery) : topic.description}
        </div>
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
        {topic.additionalDescription && (
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <div className="text-slate-300 text-sm leading-relaxed space-y-3 whitespace-pre-line">
              {highlightQuery ? highlightText(topic.additionalDescription, highlightQuery) : topic.additionalDescription}
            </div>
          </div>
        )}
      </section>

      {topic.funFact && (
        <section className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-xl p-6 mb-10">
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-lightbulb text-emerald-400 text-lg mt-0.5"></i>
            <div>
              <h3 className="text-emerald-400 text-sm font-bold mb-2">Занимательный факт</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {highlightQuery ? highlightText(topic.funFact, highlightQuery) : topic.funFact}
              </p>
            </div>
          </div>
        </section>
      )}

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
            {relevantTopics.map((relatedTopic, index) => {
              // Если это режим поиска, используем метаданные из searchResults, иначе ищем их
              const meta = isSearchMode && searchResultsMeta 
                ? searchResultsMeta.get(relatedTopic.id)
                : findTopicMeta(relatedTopic.id);
              
              return (
                <TopicCard
                  key={relatedTopic.id || `topic-${index}`}
                  topic={relatedTopic}
                  onClick={() => props.onTopicJump(relatedTopic.id)}
                  highlightQuery={highlightQuery}
                  metaCategoryId={meta?.metaCategoryId || undefined}
                  category={meta?.category || undefined}
                  padding="p-5"
                  descriptionLines={3}
                />
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

export default Content;
