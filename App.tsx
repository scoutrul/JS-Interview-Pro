
import React, { useRef, useState } from 'react';
import Sidebar from './features/knowledge-base/components/Sidebar';
import Content from './features/knowledge-base/components/Content';
import { useCurrentTopic } from './features/knowledge-base/hooks';
import { useKnowledgeBaseStore } from './store/knowledgeBaseStore';

const App: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { selectedTopicId, setSelectedTopicId } = useKnowledgeBaseStore();
  const { currentTopic, relatedTopics } = useCurrentTopic();

  const handleTopicJump = (id: string) => {
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
    <div className="flex h-screen bg-[#0a0f1d] overflow-hidden">
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
      
      <main ref={scrollContainerRef} className="flex-1 overflow-y-auto bg-[#1e293b] bg-gradient-to-br from-[#1e293b] via-[#1a2332] to-[#0f172a] relative">
        {/* Кнопка меню для мобильных */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-40 w-10 h-10 bg-slate-800/80 border border-slate-700 rounded-lg flex items-center justify-center text-white hover:bg-slate-700 transition-colors"
        >
          <i className="fa-solid fa-bars text-sm"></i>
        </button>
        
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:clamp(2.5rem,4vw,3rem)_clamp(2.5rem,4vw,3rem)] pointer-events-none"></div>
        <Content 
          topic={currentTopic}
          relatedTopics={relatedTopics}
          onTopicJump={handleTopicJump}
        />
      </main>
    </div>
  );
};

export default App;
