
import React, { useEffect, useRef, useMemo } from 'react';
import { Topic } from '../../../core/types';
import { Badge, CodeBlock } from '../../../components/ui';
import ScopeChainVisualizer from '../visualizers/ScopeChainVisualizer';
import { useKnowledgeBaseStore } from '../../../store/knowledgeBaseStore';
import { highlightText } from '../utils/highlightText';
import { TopicWithMeta } from '../hooks/useContentSearch';
import TopicCard from './TopicCard';
import ChatAssistant from './ChatAssistant';
import { findTopicMeta } from '../utils/findTopicMeta';
import { hasHighlightedWords } from '../utils/hasHighlightedWords';
import { hasTitleMatch } from '../utils/hasTitleMatch';
import { hasCategoryMatch } from '../utils/hasCategoryMatch';
import { calculateRelevanceScore } from '../utils/calculateRelevanceScore';
import { getKnowledgeBaseByCategory } from '../../../core/constants';

interface ContentProps {
  topic: Topic;
  relatedTopics: Topic[];
  explicitRelatedTopicIds?: Set<string>; // Явные связи из relatedTopics
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
  
  // Находим категорию для текущей темы
  const topicMeta = findTopicMeta(topic.id);

  // Получаем следующую тему из структуры
  const nextTopic = useMemo(() => {
    const knowledgeBase = getKnowledgeBaseByCategory(selectedMetaCategory);
    const allTopics = knowledgeBase.flatMap(cat => cat.topics);
    const currentIndex = allTopics.findIndex(t => t.id === topic.id);
    if (currentIndex !== -1 && currentIndex < allTopics.length - 1) {
      return allTopics[currentIndex + 1];
    }
    return null;
  }, [topic.id, selectedMetaCategory]);

  // Используем сохраненный запрос для выделения, если есть
  const highlightQuery = savedSearchQuery && savedSearchQuery.trim() 
    ? savedSearchQuery 
    : (contentSearchQuery && contentSearchQuery.trim() ? contentSearchQuery : null);

  // Скролл к первому выделенному элементу при переходе из поиска
  useEffect(() => {
    if (highlightQuery && savedSearchQuery) {
      // Небольшая задержка для рендеринга выделенных элементов
      setTimeout(() => {
        const firstMark = contentRef.current?.querySelector('mark');
        if (firstMark) {
          firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [topic.id, highlightQuery, savedSearchQuery]);

  // Определяем, используем ли мы результаты поиска или релевантные темы
  const isSearchMode = contentSearchQuery && contentSearchQuery.trim();
  const rawRelevantTopics: Topic[] = useMemo(() => {
    const topics = isSearchMode 
      ? searchResults.map(item => item.topic)
      : props.relatedTopics;
    
    // Убираем дубликаты по id темы (оставляем первое вхождение)
    const seenTopicIds = new Set<string>();
    const uniqueTopics: Topic[] = [];
    for (const topic of topics) {
      if (!seenTopicIds.has(topic.id)) {
        seenTopicIds.add(topic.id);
        uniqueTopics.push(topic);
      }
    }
    return uniqueTopics;
  }, [isSearchMode, searchResults, props.relatedTopics]);
  
  // Сортируем релевантные темы с учетом совокупности совпадений
  const relevantTopics = useMemo(() => {
    const relevanceWords = !isSearchMode ? topic.tags : undefined;
    const explicitIds = props.explicitRelatedTopicIds || new Set<string>();
    
    return [...rawRelevantTopics].sort((a, b) => {
      // Получаем метаданные для обеих тем
      const aMeta = findTopicMeta(a.id);
      const bMeta = findTopicMeta(b.id);
      
      // Сначала сортируем по общему баллу релевантности (по убыванию)
      const aScore = calculateRelevanceScore(
        a,
        aMeta.category ?? undefined,
        aMeta.metaCategoryId ?? undefined,
        highlightQuery,
        relevanceWords
      );
      const bScore = calculateRelevanceScore(
        b,
        bMeta.category ?? undefined,
        bMeta.metaCategoryId ?? undefined,
        highlightQuery,
        relevanceWords
      );
      
      if (aScore !== bScore) {
        return bScore - aScore; // По убыванию
      }
      
      // Если баллы равны, используем текущую систему приоритетов
      // Приоритет 1: Совпадение в заголовке
      const aHasTitleMatch = hasTitleMatch(a.title, highlightQuery, relevanceWords);
      const bHasTitleMatch = hasTitleMatch(b.title, highlightQuery, relevanceWords);
      
      if (aHasTitleMatch && !bHasTitleMatch) return -1;
      if (!aHasTitleMatch && bHasTitleMatch) return 1;
      
      // Приоритет 2: Название мета-секции или подсекции содержит искомое слово
      const aHasCategoryMatch = hasCategoryMatch(aMeta.category ?? undefined, aMeta.metaCategoryId ?? undefined, highlightQuery, relevanceWords);
      const bHasCategoryMatch = hasCategoryMatch(bMeta.category ?? undefined, bMeta.metaCategoryId ?? undefined, highlightQuery, relevanceWords);
      
      if (aHasCategoryMatch && !bHasCategoryMatch) return -1;
      if (!aHasCategoryMatch && bHasCategoryMatch) return 1;
      
      // Приоритет 3: Подсветка в тексте
      const aHasHighlight = hasHighlightedWords(a, highlightQuery, relevanceWords);
      const bHasHighlight = hasHighlightedWords(b, highlightQuery, relevanceWords);
      
      if (aHasHighlight && !bHasHighlight) return -1;
      if (!aHasHighlight && bHasHighlight) return 1;
      
      // Приоритет 4: Явные связи (explicitRelatedTopicIds)
      const aIsExplicit = explicitIds.has(a.id);
      const bIsExplicit = explicitIds.has(b.id);
      
      if (aIsExplicit && !bIsExplicit) return -1;
      if (!aIsExplicit && bIsExplicit) return 1;
      
      // Приоритет 5: Автоматические связи по тегам (остальные)
      // Если все приоритеты равны, сохраняем исходный порядок
      return 0;
    });
  }, [rawRelevantTopics, highlightQuery, isSearchMode, topic.tags, props.explicitRelatedTopicIds]);
  
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

    // Очищаем от пунктуации в начале и конце (с поддержкой Unicode/кириллицы)
    const cleanedWord = selectedText.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
    
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
      }, 250);
    };

    const element = contentRef.current;
    element.addEventListener('dblclick', handleDoubleClick);

    return () => {
      if (element) {
        element.removeEventListener('dblclick', handleDoubleClick);
      }
    };
  }, [setContentSearchQuery, topic.id]);


  return (
    <article ref={contentRef} key={topic.id} className="w-full mx-auto py-16 mt-6 md:mt-0 px-4 lg:px-6 animate-content relative pb-20 lg:pb-12" style={{ minWidth: '255px', width: '100%' }}>
      {/* Фейковая строка поиска */}
      <div className="mb-6 -mt-4">
        <div 
          onClick={() => setContentSearchQuery('')}
          className="relative cursor-pointer"
        >
          <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
          <input 
            type="text" 
            placeholder="Поиск по контенту..." 
            readOnly
            className="w-full max-w-[calc(100%-3rem)] bg-slate-800/30 border border-slate-700/50 rounded-lg py-2.5 pl-11 pr-4 text-sm text-slate-400 outline-none hover:border-slate-600/50 placeholder:text-slate-600 transition-colors cursor-pointer"
          />
        </div>
      </div>

      <header className="mb-10 relative">
        <div className="flex items-start gap-4 mb-4 flex-wrap">
          <Badge variant={topic.difficulty} className="px-3 py-1.5" />
          {topic.tags && topic.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {topic.tags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setContentSearchQuery(tag)}
                  className="px-2 py-0.5 bg-slate-700/30 border border-slate-600/50 rounded text-[12px] text-slate-300 font-medium hover:bg-slate-600/40 hover:border-slate-500/60 transition-colors cursor-pointer"
                  title={`Поиск по тегу: ${tag}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <h1 className="text-4xl font-black text-white tracking-tight leading-tight">{topic.title}</h1>
          {topicMeta.category && (
            <span className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded text-emerald-400 text-xs font-bold">
              {topicMeta.category.title}
            </span>
          )}
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

      {/* Первый занимательный факт - перед ключевыми моментами */}
      {topic.funFact && (Array.isArray(topic.funFact) ? topic.funFact[0] : topic.funFact) && (
        <section className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-xl p-6 mb-10">
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-lightbulb text-emerald-400 text-lg mt-0.5"></i>
            <div>
              <h3 className="text-emerald-400 text-sm font-bold mb-2">Занимательный факт</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {highlightQuery 
                  ? highlightText(Array.isArray(topic.funFact) ? topic.funFact[0] : topic.funFact, highlightQuery)
                  : (Array.isArray(topic.funFact) ? topic.funFact[0] : topic.funFact)
                }
              </p>
            </div>
          </div>
        </section>
      )}

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

      {/* Второй и следующие занимательные факты - после ключевых моментов */}
      {topic.funFact && Array.isArray(topic.funFact) && topic.funFact.length > 1 && (
        <>
          {topic.funFact.slice(1).map((fact, index) => (
            <section key={index} className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-xl p-6 mb-10">
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-lightbulb text-emerald-400 text-lg mt-0.5"></i>
                <div>
                  <h3 className="text-emerald-400 text-sm font-bold mb-2">Занимательный факт</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {highlightQuery ? highlightText(fact, highlightQuery) : fact}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </>
      )}

      <section className="mb-10">
        <h2 className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-4">ПРИМЕРЫ</h2>
        {topic.examples?.map((ex, i) => (
          <CodeBlock key={i} title={ex.title} code={ex.code} />
        ))}
      </section>

      {topic.id === 'scope-chain' && <ScopeChainVisualizer />}

      <ChatAssistant topic={topic} />

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => toggleLearned(topic.id, selectedMetaCategory)}
          className={`flex-[1] flex items-center justify-center gap-2 px-6 py-3 rounded-lg border transition-all font-bold ${
            learned
              ? 'bg-emerald-500/20 border-emerald-500/70 text-emerald-300 hover:bg-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
              : 'bg-blue-500/20 border-blue-500/60 text-blue-300 hover:bg-blue-500/30 hover:border-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
          }`}
        >
          <i className={`fa-solid ${learned ? 'fa-check-circle' : 'fa-circle'} text-lg`}></i>
          <span className="text-sm">{learned ? 'Изучено' : 'Отметить как изученное'}</span>
        </button>
        
        {nextTopic && (
          <button
            onClick={() => props.onTopicJump(nextTopic.id)}
            className="flex-[2] w-full text-right px-6 py-3 rounded-lg transition-all flex items-center justify-end gap-2 group bg-transparent text-blue-400 hover:text-blue-300 border-0 hover:underline underline-offset-4"
          >
            <span className="text-sm font-medium truncate">Следующая тема: "{nextTopic.title}"</span>
            <i className="fa-solid fa-arrow-right text-sm flex-shrink-0 group-hover:translate-x-1 transition-transform"></i>
          </button>
        )}
      </div>

      {relevantTopics.length > 0 && (
        <section className="mt-16">
          <h2 className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-6">
            {contentSearchQuery ? 'РЕЛЕВАНТНЫЕ ТЕМЫ (поиск)' : 'РЕЛЕВАНТНЫЕ ТЕМЫ'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
                  relevanceWords={!isSearchMode ? topic.tags : undefined}
                  metaCategoryId={meta?.metaCategoryId || undefined}
                  category={meta?.category || undefined}
                  padding="p-5"
                  descriptionLines={3}
                />
              );
            })}
          </div>
        </section>
      )}

    </article>
  );
};

export default Content;
