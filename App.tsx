
import React, { useState, useMemo } from 'react';
import { KNOWLEDGE_BASE } from './constants';
import { Topic, Difficulty } from './types';
import { askInterviewer } from './geminiService';

const DifficultyBadge: React.FC<{ difficulty: Difficulty; className?: string }> = ({ difficulty, className = '' }) => {
  const styles = {
    beginner: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    intermediate: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    advanced: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  };

  const labels = {
    beginner: 'Новичок',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
  };

  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider flex-shrink-0 ${styles[difficulty]} ${className}`}>
      {labels[difficulty]}
    </span>
  );
};

const TopicCard: React.FC<{ 
  topic: Topic; 
  isActive: boolean; 
  onClick: () => void 
}> = ({ topic, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-3 rounded-lg transition-all duration-200 border group ${
      isActive 
        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
        : 'border-slate-700 hover:border-slate-500 text-slate-400 hover:bg-slate-800'
    }`}
  >
    <div className="flex justify-between items-center gap-2 overflow-hidden">
      <div className="text-sm font-semibold leading-tight truncate whitespace-nowrap" title={topic.title}>
        {topic.title}
      </div>
      <DifficultyBadge difficulty={topic.difficulty} />
    </div>
  </button>
);

const App: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('var-let-const');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const flatTopics = useMemo(() => KNOWLEDGE_BASE.flatMap(c => c.topics), []);
  
  const currentTopic = useMemo(() => 
    flatTopics.find(t => t.id === selectedTopicId) || flatTopics[0],
  [selectedTopicId, flatTopics]);

  const popularTags = [
    'this', 'closure', 'async', 'promise', 'hoisting', 'scope', 'const', 'let', 'event loop', 'microtasks', 'prototype', 'immutability'
  ];

  const filteredCategories = useMemo(() => {
    return KNOWLEDGE_BASE.map(cat => ({
      ...cat,
      topics: cat.topics.filter(t => {
        // Текстовый поиск
        const matchesSearch = !searchQuery || 
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.keyPoints.some(kp => kp.toLowerCase().includes(searchQuery.toLowerCase()));
        
        // Фильтр по сложности
        const matchesDifficulty = selectedDifficulty === 'all' || t.difficulty === selectedDifficulty;
        
        // Фильтр по тегам (тема должна содержать ХОТЯ БЫ ОДИН из выбранных тегов, если они выбраны)
        const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => {
            const lowTag = tag.toLowerCase();
            return t.title.toLowerCase().includes(lowTag) || 
                   t.description.toLowerCase().includes(lowTag) ||
                   t.keyPoints.some(kp => kp.toLowerCase().includes(lowTag));
        });
        
        return matchesSearch && matchesDifficulty && matchesTags;
      })
    })).filter(cat => cat.topics.length > 0);
  }, [searchQuery, selectedDifficulty, selectedTags]);

  const handleAskInterviewer = async () => {
    if (!userAnswer.trim()) return;
    setIsLoading(true);
    const feedback = await askInterviewer(currentTopic.title, userAnswer);
    setAiFeedback(feedback || "Ошибка связи.");
    setIsLoading(false);
  };

  const jumpToTopic = (id: string) => {
    setSelectedTopicId(id);
    setAiFeedback(null);
    setUserAnswer('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedDifficulty('all');
  };

  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-96 md:min-w-[384px] bg-slate-900/50 border-r border-slate-800 flex flex-col p-4 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="bg-emerald-500 p-2 rounded-lg">
            <i className="fa-brands fa-js text-slate-900 text-xl"></i>
          </div>
          <h1 className="font-bold text-xl tracking-tight text-white whitespace-nowrap">JS Interview <span className="text-emerald-500">Pro</span></h1>
        </div>

        <div className="space-y-4 mb-6">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
            <input 
              type="text" 
              placeholder="Поиск по темам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
            {(searchQuery || selectedTags.length > 0 || selectedDifficulty !== 'all') && (
              <button 
                onClick={clearFilters}
                title="Очистить все фильтры"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-rose-400 transition-colors"
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1 bg-slate-800/50 p-1 rounded-lg border border-slate-700">
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`flex-1 text-[10px] font-bold py-1.5 px-2 rounded-md transition-all uppercase tracking-wider whitespace-nowrap ${
                  selectedDifficulty === diff 
                    ? 'bg-slate-700 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {diff === 'all' ? 'Все' : diff === 'beginner' ? 'Beg.' : diff === 'intermediate' ? 'Int.' : 'Adv.'}
              </button>
            ))}
          </div>

          {/* Облако тегов */}
          <div className="px-1">
            <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <i className="fa-solid fa-tags"></i>
                  Облако тегов
                </div>
                {selectedTags.length > 0 && (
                  <button 
                    onClick={() => setSelectedTags([])}
                    className="text-[9px] text-slate-500 hover:text-emerald-400 uppercase font-bold tracking-tighter"
                  >
                    сбросить
                  </button>
                )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {popularTags.map(tag => {
                const isActive = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`text-[10px] px-2 py-1 rounded border transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                        : 'bg-slate-800/40 border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <nav className="space-y-8 mt-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map(category => (
              <div key={category.id}>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2 truncate">
                  {category.title}
                </h3>
                <div className="space-y-1">
                  {category.topics.map(topic => (
                    <TopicCard 
                      key={topic.id}
                      topic={topic}
                      isActive={selectedTopicId === topic.id}
                      onClick={() => jumpToTopic(topic.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 px-4">
              <i className="fa-solid fa-filter-circle-xmark text-slate-700 text-3xl mb-3"></i>
              <p className="text-slate-500 text-sm italic">Ничего не найдено</p>
              <button 
                onClick={clearFilters}
                className="mt-4 text-emerald-500 text-xs font-bold hover:underline"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Topic Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium uppercase tracking-wide">
                <i className="fa-solid fa-book-open"></i>
                База знаний
              </div>
              <DifficultyBadge difficulty={currentTopic.difficulty} className="text-sm px-4 py-1" />
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
              {currentTopic.title}
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              {currentTopic.description}
            </p>
          </div>

          {/* Key Points */}
          <div className="grid md:grid-cols-1 gap-6 mb-10">
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-list-check text-emerald-500"></i>
                Ключевые моменты
              </h4>
              <ul className="space-y-3">
                {currentTopic.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Code Example */}
          {currentTopic.codeExample && (
            <div className="mb-10 group">
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Пример кода</div>
                <button 
                   onClick={() => navigator.clipboard.writeText(currentTopic.codeExample!)}
                   className="text-xs text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  <i className="fa-regular fa-copy mr-1"></i> Копировать
                </button>
              </div>
              <div className="bg-[#1e293b] rounded-2xl p-6 overflow-x-auto border border-slate-800 shadow-xl group-hover:border-emerald-500/30 transition-all duration-300">
                <pre className="text-emerald-300 text-sm md:text-base leading-relaxed">
                  <code>{currentTopic.codeExample}</code>
                </pre>
              </div>
            </div>
          )}

          {/* AI Interviewer Section */}
          <div className="bg-gradient-to-br from-indigo-900/20 to-emerald-900/10 border border-slate-800 rounded-2xl p-8 mb-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <i className="fa-solid fa-robot text-slate-950 text-xl"></i>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">AI-Интервьюер</h4>
                <p className="text-sm text-slate-400">Проверь свои знания. Расскажи кратко об этой теме.</p>
              </div>
            </div>

            <textarea 
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Напиши свой ответ здесь..."
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[120px] mb-4 transition-all"
            />
            
            <button 
              onClick={handleAskInterviewer}
              disabled={isLoading || !userAnswer.trim()}
              className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                  Анализирую...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i>
                  Отправить ответ
                </>
              )}
            </button>

            {aiFeedback && (
              <div className="mt-6 p-5 bg-slate-900 border-l-4 border-emerald-500 rounded-r-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-slate-300 leading-relaxed italic">
                  "{aiFeedback}"
                </p>
              </div>
            )}
          </div>

          {/* Related Topics */}
          {currentTopic.relatedTopics.length > 0 && (
            <div className="mb-20">
              <h4 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Связанные темы</h4>
              <div className="flex flex-wrap gap-3">
                {currentTopic.relatedTopics.map(relId => {
                  const relTopic = flatTopics.find(t => t.id === relId);
                  if (!relTopic) return null;
                  return (
                    <button
                      key={relId}
                      onClick={() => jumpToTopic(relId)}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-800 py-2 px-4 rounded-full text-sm text-slate-400 hover:text-emerald-400 transition-all flex items-center gap-2"
                    >
                      {relTopic.title}
                      <div className={`w-1 h-1 rounded-full ${
                        relTopic.difficulty === 'beginner' ? 'bg-emerald-500' : 
                        relTopic.difficulty === 'intermediate' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}></div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <footer className="text-center text-slate-600 text-sm border-t border-slate-900 pt-8 mb-12">
            © 2024 JS Interview Pro • Подготовлено для успешного оффера
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
