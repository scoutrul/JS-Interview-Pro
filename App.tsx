
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './features/knowledge-base/components/Sidebar';
import Content from './features/knowledge-base/components/Content';
import ContentSearch from './features/knowledge-base/components/ContentSearch';
import KnowledgePath from './features/knowledge-base/components/KnowledgePath';
import ProjectInfoModal from './components/ui/ProjectInfoModal';
import NotesModal from './components/ui/NotesModal';
import { useCurrentTopic, useContentSearch } from './features/knowledge-base/hooks';
import { useKnowledgeBaseStore } from './store/knowledgeBaseStore';
import { getKnowledgeBaseByCategory } from './core/constants';
import { MetaCategoryId, META_CATEGORIES } from './core/metaCategories';
import { useNotesCount } from './hooks/useNotesCount';

// Компонент для обновления meta-тегов
const SEOHead: React.FC<{ topic: { title: string; description: string } | null; category: MetaCategoryId }> = ({ topic, category }) => {
  useEffect(() => {
    if (!topic) return;
    
    const categoryTitle = META_CATEGORIES.find(c => c.id === category)?.title || '';
    const title = `${topic.title} - ${categoryTitle} | Frontender Pro`;
    const description = topic.description || `Изучите тему "${topic.title}" в разделе ${categoryTitle}`;
    
    document.title = title;
    
    // Обновляем или создаем meta-теги
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Open Graph теги
    const updateOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    
    updateOGTag('og:title', title);
    updateOGTag('og:description', description);
    updateOGTag('og:type', 'website');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
  }, [topic, category]);
  
  return null;
};

// Основной компонент контента
const KnowledgeBaseContent: React.FC = () => {
  const navigate = useNavigate();
  const { category: urlCategory, topicId: urlTopicId } = useParams<{ category?: MetaCategoryId; topicId?: string }>();
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [savedSearchQuery, setSavedSearchQuery] = useState<string | null>(null);
  const { selectedTopicId, setSelectedTopicId, setSelectedMetaCategory, selectedMetaCategory } = useKnowledgeBaseStore();
  const { currentTopic, relatedTopics } = useCurrentTopic();
  const notesCount = useNotesCount();
  
  const {
    contentSearchQuery,
    setContentSearchQuery,
    searchResults,
    searchAreaRef
  } = useContentSearch(currentTopic?.id);

  // Синхронизация: URL -> состояние (только когда URL меняется)
  useEffect(() => {
    if (urlCategory && META_CATEGORIES.find(c => c.id === urlCategory)) {
      if (urlCategory !== selectedMetaCategory) {
        setSelectedMetaCategory(urlCategory);
      }
      if (urlTopicId && urlTopicId !== selectedTopicId) {
        setSelectedTopicId(urlTopicId);
      }
    }
  }, [urlCategory, urlTopicId]);

  // Синхронизация: состояние -> URL (только когда состояние меняется программно)
  useEffect(() => {
    // Не обновляем URL, если он уже соответствует состоянию
    if (urlCategory === selectedMetaCategory && urlTopicId === selectedTopicId) {
      return;
    }
    
    const expectedPath = `/${selectedMetaCategory}${selectedTopicId ? `/${selectedTopicId}` : ''}`;
    navigate(expectedPath, { replace: true });
  }, [selectedMetaCategory, selectedTopicId]);

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
    <>
      <SEOHead topic={currentTopic} category={selectedMetaCategory} />
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

      {/* Кнопка заметок */}
      <button
        onClick={() => setIsNotesOpen(true)}
        className="fixed top-28 right-6 z-40 h-8 bg-slate-950/90 border border-emerald-500/80 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-300 hover:bg-slate-800/90 transition-all shadow-lg text-xs px-2.5 gap-1.5"
        title="Заметки"
      >
        <span>Заметки</span>
        {notesCount > 0 && (
          <span className="bg-emerald-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1.5">
            {notesCount > 99 ? '99+' : notesCount}
          </span>
        )}
      </button>

      {/* Модальное окно информации о проекте */}
      <ProjectInfoModal 
        isOpen={isProjectInfoOpen}
        onClose={() => setIsProjectInfoOpen(false)}
      />

      {/* Модальное окно заметок */}
      <NotesModal 
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
      />
    </div>
    </>
  );
};

// Главный компонент с роутингом
const App: React.FC = () => {
  const { selectedMetaCategory, selectedTopicId } = useKnowledgeBaseStore();
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${selectedMetaCategory}${selectedTopicId ? `/${selectedTopicId}` : ''}`} replace />} />
      <Route path="/:category" element={<KnowledgeBaseContent />} />
      <Route path="/:category/:topicId" element={<KnowledgeBaseContent />} />
      <Route path="*" element={<Navigate to={`/${selectedMetaCategory}${selectedTopicId ? `/${selectedTopicId}` : ''}`} replace />} />
    </Routes>
  );
};

export default App;
