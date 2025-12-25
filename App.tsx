
import React, { useRef, useState } from 'react';
import Sidebar from './features/knowledge-base/components/Sidebar';
import Content from './features/knowledge-base/components/Content';
import ContentSearch from './features/knowledge-base/components/ContentSearch';
import KnowledgePath from './features/knowledge-base/components/KnowledgePath';
import ProjectInfoModal from './components/ui/ProjectInfoModal';
import { useCurrentTopic, useContentSearch } from './features/knowledge-base/hooks';
import { useKnowledgeBaseStore } from './store/knowledgeBaseStore';
import { getKnowledgeBaseByCategory } from './core/constants';
import { MetaCategoryId } from './core/metaCategories';

const App: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);
  const [savedSearchQuery, setSavedSearchQuery] = useState<string | null>(null);
  const { selectedTopicId, setSelectedTopicId, setSelectedMetaCategory } = useKnowledgeBaseStore();
  const { currentTopic, relatedTopics } = useCurrentTopic();
  
  const {
    contentSearchQuery,
    setContentSearchQuery,
    searchResults,
    searchAreaRef
  } = useContentSearch(currentTopic?.id);

  // Найти категорию для темы по ID
  const findTopicCategory = (topicId: string): MetaCategoryId | null => {
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

    for (const categoryId of allCategories) {
      const categories = getKnowledgeBaseByCategory(categoryId);
      const topic = categories.flatMap(cat => cat.topics).find(t => t.id === topicId);
      if (topic) {
        return categoryId;
      }
    }
    return null;
  };

  const handleTopicJump = (id: string, fromSearch: boolean = false) => {
    // Найти категорию для выбранной темы
    const topicCategory = findTopicCategory(id);
    if (topicCategory) {
      setSelectedMetaCategory(topicCategory);
    }
    
    // Если переход из поиска - сохранить запрос, иначе - очистить
    if (fromSearch && contentSearchQuery) {
      setSavedSearchQuery(contentSearchQuery);
    } else {
      setSavedSearchQuery(null);
    }
    
    setSelectedTopicId(id);
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSidebarOpen(false);
  };

  if (!currentTopic) {
    return (
      <div className="flex h-screen bg-[#0a0f1d] items-center justify-center">
        <div className="text-slate-400">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0a0f1d] overflow-hidden pb-16">
      {/* Overlay для мобильных */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <Sidebar 
        onTopicSelect={handleTopicJump}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main 
        ref={scrollContainerRef} 
        className="flex-1 overflow-y-auto bg-[#1e293b] bg-gradient-to-br from-[#1e293b] via-[#1a2332] to-[#0f172a] relative"
        onClick={(e) => {
          // Закрываем поиск при клике вне области поиска (включая края)
          if (contentSearchQuery !== null && searchAreaRef.current && !searchAreaRef.current.contains(e.target as Node)) {
            setContentSearchQuery(null);
          }
        }}
      >
        {/* Кнопка меню для мобильных */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-40 w-10 h-10 bg-slate-800/80 border border-slate-700 rounded-lg flex items-center justify-center text-white hover:bg-slate-700 transition-colors"
        >
          <i className="fa-solid fa-bars text-sm"></i>
        </button>

        {/* Поиск по контенту */}
        <ContentSearch
          contentSearchQuery={contentSearchQuery}
          setContentSearchQuery={setContentSearchQuery}
          searchResults={searchResults}
          searchAreaRef={searchAreaRef}
          onTopicSelect={(id) => handleTopicJump(id, true)}
        />
        
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:clamp(2.5rem,4vw,3rem)_clamp(2.5rem,4vw,3rem)] pointer-events-none"></div>
        <div className={contentSearchQuery !== null && searchResults.length > 0 ? 'pt-[calc(73px+min(60vh,400px))]' : contentSearchQuery !== null ? 'pt-[73px]' : ''}>
          <Content 
            topic={currentTopic}
            relatedTopics={relatedTopics}
            onTopicJump={handleTopicJump}
            contentSearchQuery={contentSearchQuery}
            setContentSearchQuery={setContentSearchQuery}
            searchResults={searchResults}
            savedSearchQuery={savedSearchQuery}
          />
        </div>
      </main>
      
      {/* Панель переключения метакатегорий */}
      <KnowledgePath />

      {/* Кнопка информации о проекте */}
      <button
        onClick={() => setIsProjectInfoOpen(true)}
        className="fixed top-16 right-6 z-40 h-8 bg-slate-950/90 border border-emerald-500/80 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-300 hover:bg-slate-800/90 transition-all shadow-lg text-xs px-2.5"
        title="Информация о проекте"
      >
        О проекте
      </button>

      {/* Модальное окно информации о проекте */}
      <ProjectInfoModal 
        isOpen={isProjectInfoOpen}
        onClose={() => setIsProjectInfoOpen(false)}
      />
    </div>
  );
};

export default App;
