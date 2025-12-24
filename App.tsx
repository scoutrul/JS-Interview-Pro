
import React, { useState, useMemo, useRef } from 'react';
import { KNOWLEDGE_BASE } from './core/constants';
import { Topic, Difficulty } from './core/types';
import { generateSelfTestQuestions } from './services/gemini';
import Sidebar from './features/knowledge-base/components/Sidebar';
import Content from './features/knowledge-base/components/Content';

const App: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('var-let-const');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selfTestQuestions, setSelfTestQuestions] = useState<string | null>(null);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const flatTopics = useMemo(() => KNOWLEDGE_BASE.flatMap(c => c.topics), []);
  const currentTopic = useMemo(() => {
    const topic = flatTopics.find(t => t.id === selectedTopicId) || flatTopics[0];
    if (!topic) {
      console.error('No topics found in KNOWLEDGE_BASE');
    }
    return topic;
  }, [selectedTopicId, flatTopics]);

  const filteredCategories = useMemo(() => {
    return KNOWLEDGE_BASE.map(cat => ({
      ...cat,
      topics: cat.topics.filter(t => {
        const matchesSearch = !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = selectedDifficulty === 'all' || t.difficulty === selectedDifficulty;
        const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => t.tags.includes(tag));
        return matchesSearch && matchesDifficulty && matchesTags;
      })
    })).filter(cat => cat.topics.length > 0);
  }, [searchQuery, selectedDifficulty, selectedTags]);

  const handleTopicJump = (id: string) => {
    setSelectedTopicId(id);
    setSelfTestQuestions(null);
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenQuestions = async () => {
    if (!currentTopic) return;
    setIsGeneratingQuestions(true);
    const questions = await generateSelfTestQuestions(currentTopic.title, currentTopic.keyPoints);
    setSelfTestQuestions(questions || null);
    setIsGeneratingQuestions(false);
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
      <Sidebar 
        categories={filteredCategories}
        selectedTopicId={selectedTopicId}
        onTopicSelect={handleTopicJump}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedTags={selectedTags}
        onTagToggle={(tag) => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
      />
      <main ref={scrollContainerRef} className="flex-1 overflow-y-auto bg-[#0a0f1d] relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none"></div>
        <Content 
          topic={currentTopic}
          nextTopic={currentTopic.nextTopicId ? flatTopics.find(t => t.id === currentTopic.nextTopicId) : null}
          relatedTopics={currentTopic.relatedTopics.map(id => flatTopics.find(t => t.id === id)).filter(Boolean) as Topic[]}
          onTopicJump={handleTopicJump}
          onGenerateQuestions={handleGenQuestions}
          isGeneratingQuestions={isGeneratingQuestions}
          selfTestQuestions={selfTestQuestions}
        />
      </main>
    </div>
  );
};

export default App;
