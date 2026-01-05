
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './features/knowledge-base/components/Sidebar';
import Content from './features/knowledge-base/components/Content';
import ContentSearch from './features/knowledge-base/components/ContentSearch';
import KnowledgePath from './features/knowledge-base/components/KnowledgePath';
import ProjectInfoModal from './components/ui/ProjectInfoModal';
import NotesModal from './components/ui/NotesModal';
import Footer from './components/ui/Footer';
import { useCurrentTopic, useContentSearch } from './features/knowledge-base/hooks';
import { useKnowledgeBaseStore } from './store/knowledgeBaseStore';
import { getKnowledgeBaseByCategory } from './core/constants';
import { MetaCategoryId, META_CATEGORIES } from './core/metaCategories';
import { useNotesCount } from './hooks/useNotesCount';

// Компонент для обновления meta-тегов и JSON-LD
const SEOHead: React.FC<{ topic: { id: string; title: string; description: string; tags?: string[] } | null; category: MetaCategoryId; topicId?: string }> = ({ topic, category, topicId }) => {
  useEffect(() => {
    const categoryTitle = META_CATEGORIES.find(c => c.id === category)?.title || '';
    const baseUrl = window.location.origin;
    const currentUrl = window.location.href;
    
    if (topic && topicId) {
      // Динамические title и description для темы
      const title = `${topic.title} - ${categoryTitle} | Front Start`;
      const description = topic.description || `Изучите тему "${topic.title}" в разделе ${categoryTitle}`;
      const keywords = topic.tags?.join(', ') || `${topic.title}, ${categoryTitle}, frontend, программирование`;
      
      document.title = title;
      
      // Meta description
      const updateMetaTag = (name: string, content: string) => {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('name', name);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };
      
      updateMetaTag('description', description);
      updateMetaTag('keywords', keywords);
      
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
      updateOGTag('og:type', 'article');
      updateOGTag('og:url', currentUrl);
      updateOGTag('og:site_name', 'Front Start');
      
      // Twitter Cards
      const updateTwitterTag = (name: string, content: string) => {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('name', name);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };
      
      updateTwitterTag('twitter:card', 'summary');
      updateTwitterTag('twitter:title', title);
      updateTwitterTag('twitter:description', description);
      
      // Canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', currentUrl);
      
      // JSON-LD структурированные данные
      const removeJSONLD = () => {
        const existing = document.querySelectorAll('script[type="application/ld+json"]');
        existing.forEach(el => el.remove());
      };
      
      removeJSONLD();
      
      // WebPage schema
      const webpageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': currentUrl,
        url: currentUrl,
        name: title,
        description: description,
        inLanguage: 'ru',
        isPartOf: {
          '@type': 'WebSite',
          name: 'Front Start',
          url: baseUrl
        }
      };
      
      // Article schema
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: topic.title,
        description: description,
        url: currentUrl,
        datePublished: '2025-01-01',
        dateModified: '2025-01-01',
        author: {
          '@type': 'Organization',
          name: 'Front Start'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Front Start',
          url: baseUrl
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': currentUrl
        },
        keywords: keywords,
        articleSection: categoryTitle
      };
      
      // LearningResource schema
      const learningResourceSchema = {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: topic.title,
        description: description,
        url: currentUrl,
        educationalLevel: 'beginner',
        learningResourceType: 'Article',
        teaches: topic.title
      };
      
      // BreadcrumbList schema
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Главная',
            item: baseUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: categoryTitle,
            item: `${baseUrl}/${category}`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: topic.title,
            item: currentUrl
          }
        ]
      };
      
      const addJSONLD = (schema: object) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      };
      
      addJSONLD(webpageSchema);
      addJSONLD(articleSchema);
      addJSONLD(learningResourceSchema);
      addJSONLD(breadcrumbSchema);
      
    } else {
      // Для страниц категорий без темы
      const title = `${categoryTitle} | Front Start`;
      const description = `Изучите ${categoryTitle.toLowerCase()} - база знаний для frontend разработчиков`;
      
      document.title = title;
      
      const updateMetaTag = (name: string, content: string) => {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('name', name);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };
      
      updateMetaTag('description', description);
      
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
      updateOGTag('og:url', currentUrl);
      
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', currentUrl);
    }
  }, [topic, category, topicId]);
  
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
  const { currentTopic, relatedTopics, explicitRelatedTopicIds } = useCurrentTopic();
  const notesCount = useNotesCount();
  
  const {
    contentSearchQuery,
    setContentSearchQuery,
    searchResults,
    searchAreaRef
  } = useContentSearch(currentTopic?.id);

  // Синхронизация: URL -> состояние (только когда URL меняется из браузера - назад/вперед или прямой переход)
  useEffect(() => {
    if (urlCategory && META_CATEGORIES.find(c => c.id === urlCategory)) {
      if (urlCategory !== selectedMetaCategory) {
        setSelectedMetaCategory(urlCategory);
      }
      if (urlTopicId && urlTopicId !== selectedTopicId) {
        setSelectedTopicId(urlTopicId);
      } else if (!urlTopicId && selectedTopicId) {
        // Если в URL нет topicId, но в состоянии есть - выбираем первую тему категории
        const knowledgeBase = getKnowledgeBaseByCategory(urlCategory);
        const firstTopic = knowledgeBase.flatMap(cat => cat.topics)[0];
        if (firstTopic && firstTopic.id !== selectedTopicId) {
          setSelectedTopicId(firstTopic.id);
        }
      }
    }
  }, [urlCategory, urlTopicId]);

  // Автоматически открываем сайдбар на мобильных при смене категории
  const prevMetaCategoryRef = useRef<MetaCategoryId | null>(null);
  useEffect(() => {
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    // Открываем сайдбар только если категория действительно изменилась (не при первой загрузке)
    if (isMobile && selectedMetaCategory && prevMetaCategoryRef.current && prevMetaCategoryRef.current !== selectedMetaCategory) {
      setIsSidebarOpen(true);
    }
    prevMetaCategoryRef.current = selectedMetaCategory;
  }, [selectedMetaCategory]);

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

  const handleTopicJump = (id: string, fromSearch: boolean | string = false) => {
    // Найти категорию для выбранной темы
    const topicCategory = findTopicCategory(id);
    if (topicCategory) {
      setSelectedMetaCategory(topicCategory);
    }
    
    // Если переход из поиска - сохранить запрос для выделения
    if (fromSearch) {
      // Если передан строковый запрос (из ContentSearch), используем его
      // Иначе используем текущий contentSearchQuery
      const queryToSave = typeof fromSearch === 'string' ? fromSearch : contentSearchQuery;
      if (queryToSave && queryToSave.trim()) {
        setSavedSearchQuery(queryToSave);
      } else {
        setSavedSearchQuery(null);
      }
    } else {
      setSavedSearchQuery(null);
    }
    
    setSelectedTopicId(id);
    
    // Навигация с push для создания записи в истории браузера
    const newPath = `/${topicCategory || selectedMetaCategory}/${id}`;
    navigate(newPath);
    
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
      <SEOHead topic={currentTopic} category={selectedMetaCategory} topicId={urlTopicId} />
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
        role="main"
        onClick={(e) => {
          // Закрываем поиск при клике вне области поиска (включая края)
          if (contentSearchQuery !== null && searchAreaRef.current && !searchAreaRef.current.contains(e.target as Node)) {
            setContentSearchQuery(null);
          }
        }}
      >
        {/* Кнопка меню для мобильных */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
          onTopicSelect={(id, query) => handleTopicJump(id, query || true)}
        />
        
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:clamp(2.5rem,4vw,3rem)_clamp(2.5rem,4vw,3rem)] pointer-events-none"></div>
        <div className={contentSearchQuery !== null && searchResults.length > 0 ? 'pt-[calc(73px+min(60vh,400px))]' : contentSearchQuery !== null ? 'pt-[73px]' : ''}>
          <Content 
            topic={currentTopic}
            relatedTopics={relatedTopics}
            explicitRelatedTopicIds={explicitRelatedTopicIds}
            onTopicJump={handleTopicJump}
            contentSearchQuery={contentSearchQuery}
            setContentSearchQuery={setContentSearchQuery}
            searchResults={searchResults}
            savedSearchQuery={savedSearchQuery}
          />
        </div>
        <Footer />
      </main>
      
      {/* Панель переключения метакатегорий */}
      <KnowledgePath />

      {/* Кнопка информации о проекте */}
      <button
        onClick={() => setIsProjectInfoOpen(true)}
        className="fixed top-16 right-6 z-40 h-8 w-8 bg-slate-950/90 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-300 hover:bg-slate-800/90 transition-all shadow-lg"
        title="Информация о проекте"
      >
        <i className="fa-solid fa-info text-sm"></i>
      </button>

      {/* Кнопка заметок */}
      <div className="fixed top-28 right-6 z-40">
        <button
          onClick={() => setIsNotesOpen(true)}
          className="h-8 w-8 bg-slate-950/90 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-300 hover:bg-slate-800/90 transition-all shadow-lg relative"
          title="Заметки"
        >
          <i className="fa-solid fa-note-sticky text-sm"></i>
          {notesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1.5">
              {notesCount > 99 ? '99+' : notesCount}
            </span>
          )}
        </button>
      </div>

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
