
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Prism from 'prismjs';
// Импортируем языковую поддержку JS для Prism
import 'https://esm.sh/prismjs@1.29.0/components/prism-javascript';
import { KNOWLEDGE_BASE } from './constants';
import { Topic, Difficulty } from './types';
import { askInterviewer, handleFollowUp, generateSelfTestQuestions } from './geminiService';

const CodeHighlighter: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  
  const highlighted = useMemo(() => {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }, [code]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-container overflow-hidden my-6 relative group">
      <button 
        onClick={copyToClipboard}
        className="absolute top-4 right-4 text-slate-500 hover:text-white transition-all text-xs flex items-center gap-1.5 bg-slate-900/50 hover:bg-slate-900 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-slate-700/50"
      >
        {copied ? <><i className="fa-solid fa-check text-emerald-500"></i> Снято</> : <><i className="fa-solid fa-copy"></i> Копировать</>}
      </button>
      <div className="p-6 overflow-x-auto text-[15px]">
        <pre className="language-javascript">
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    </div>
  );
};

const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  const lines = text.split('\n');
  
  const parseInlines = (str: string) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code class="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-400 text-[0.9em] font-mono">$1</code>');
  };

  const renderedContent = lines.map((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine === '---') return <hr key={index} className="my-4 border-slate-800" />;
    if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
      const content = trimmedLine.substring(2);
      return (
        <li key={index} className="ml-4">
          <span dangerouslySetInnerHTML={{ __html: parseInlines(content) }} />
        </li>
      );
    }
    if (trimmedLine === '') return <div key={index} className="h-4" />;
    return (
      <p key={index} dangerouslySetInnerHTML={{ __html: parseInlines(line) }} />
    );
  });

  const groupedContent: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];

  renderedContent.forEach((node, idx) => {
    if (React.isValidElement(node) && node.type === 'li') {
      currentList.push(node);
    } else {
      if (currentList.length > 0) {
        groupedContent.push(<ul key={`list-${idx}`}>{[...currentList]}</ul>);
        currentList = [];
      }
      groupedContent.push(node);
    }
  });
  
  if (currentList.length > 0) {
    groupedContent.push(<ul key="list-final">{[...currentList]}</ul>);
  }

  return <div className="prose-custom">{groupedContent}</div>;
};

const DifficultyBadge: React.FC<{ difficulty: Difficulty; className?: string; size?: 'sm' | 'md' }> = ({ difficulty, className = '', size = 'sm' }) => {
  const styles = {
    beginner: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    intermediate: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    advanced: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  };
  const labels = { beginner: 'Новичок', intermediate: 'Средний', advanced: 'Продвинутый' };
  const sizeStyles = size === 'sm' ? 'text-[9px] px-1.5 py-0.5' : 'text-[11px] px-2.5 py-1';

  return (
    <span className={`rounded-full border font-bold uppercase tracking-wider flex-shrink-0 ${styles[difficulty]} ${sizeStyles} ${className}`}>
      {labels[difficulty]}
    </span>
  );
};

const TopicCard: React.FC<{ topic: Topic; isActive: boolean; onClick: () => void }> = ({ topic, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-2.5 rounded-lg transition-all duration-200 border group ${
      isActive 
        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
        : 'border-slate-800 hover:border-slate-700 text-slate-400 hover:bg-slate-800/50'
    }`}
  >
    <div className="flex justify-between items-center gap-2 overflow-hidden">
      <div className="text-[13px] font-semibold leading-tight truncate whitespace-nowrap" title={topic.title}>{topic.title}</div>
      <DifficultyBadge difficulty={topic.difficulty} size="sm" />
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
  const [isRecording, setIsRecording] = useState(false);
  const [isFollowUpLoading, setIsFollowUpLoading] = useState(false);
  const [selfTestQuestions, setSelfTestQuestions] = useState<string | null>(null);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const flatTopics = useMemo(() => KNOWLEDGE_BASE.flatMap(c => c.topics), []);
  const currentTopic = useMemo(() => flatTopics.find(t => t.id === selectedTopicId) || flatTopics[0], [selectedTopicId, flatTopics]);
  const nextTopic = useMemo(() => currentTopic.nextTopicId ? flatTopics.find(t => t.id === currentTopic.nextTopicId) : null, [currentTopic, flatTopics]);

  const popularTags = ['this', 'closure', 'async', 'promise', 'hoisting', 'scope', 'const', 'let', 'event loop', 'microtasks', 'prototype', 'immutability'];

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ru-RU';
      recognitionRef.current.onresult = (event: any) => {
        setUserAnswer(prev => {
          const lastPart = event.results[event.results.length - 1][0].transcript;
          if (event.results[event.results.length - 1].isFinal) return prev + (prev.length > 0 ? ' ' : '') + lastPart;
          return prev;
        });
      };
      recognitionRef.current.onend = () => setIsRecording(false);
      recognitionRef.current.onerror = () => setIsRecording(false);
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) return alert('Браузер не поддерживает голос.');
    isRecording ? recognitionRef.current.stop() : (setIsRecording(true), recognitionRef.current.start());
  };

  const jumpToTopic = (id: string) => {
    setSelectedTopicId(id);
    setAiFeedback(null);
    setSelfTestQuestions(null);
    setUserAnswer('');
    if (isRecording) recognitionRef.current?.stop();
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCategories = useMemo(() => {
    return KNOWLEDGE_BASE.map(cat => ({
      ...cat,
      topics: cat.topics.filter(t => {
        const matchesSearch = !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesDifficulty = selectedDifficulty === 'all' || t.difficulty === selectedDifficulty;
        const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => t.tags.some(topicTag => topicTag.toLowerCase() === tag.toLowerCase()));
        return matchesSearch && matchesDifficulty && matchesTags;
      })
    })).filter(cat => cat.topics.length > 0);
  }, [searchQuery, selectedDifficulty, selectedTags]);

  const handleAskInterviewer = async () => {
    if (!userAnswer.trim()) return;
    setIsLoading(true);
    const feedback = await askInterviewer(currentTopic.title, userAnswer);
    setAiFeedback(feedback || "Ошибка.");
    setIsLoading(false);
  };

  const handleFollowUpRequest = async (type: 'explain' | 'tricky_question') => {
    if (!aiFeedback) return;
    setIsFollowUpLoading(true);
    const feedback = await handleFollowUp(currentTopic.title, type, aiFeedback);
    setAiFeedback(prev => `${prev}\n\n---\n\n${feedback}`);
    setIsFollowUpLoading(false);
  };

  const handleGenerateQuestions = async () => {
    setIsGeneratingQuestions(true);
    const questions = await generateSelfTestQuestions(currentTopic.title, currentTopic.keyPoints);
    setSelfTestQuestions(questions);
    setIsGeneratingQuestions(false);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const clearFilters = () => { setSearchQuery(''); setSelectedTags([]); setSelectedDifficulty('all'); };

  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden bg-[#0f172a]">
      {/* Sidebar - Compact Style */}
      <aside className="w-full md:w-80 md:min-w-[320px] bg-slate-900 border-r border-slate-800 flex flex-col p-4 overflow-y-auto shadow-2xl z-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-500 p-2 rounded-lg shadow-md"><i className="fa-brands fa-js text-slate-950 text-lg"></i></div>
          <h1 className="font-bold text-lg text-white tracking-tight">JS Interview <span className="text-emerald-500 text-xl font-black">Pro</span></h1>
        </div>

        <div className="space-y-4 mb-6">
          <div className="relative">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]"></i>
            <input type="text" placeholder="Поиск..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg py-1.5 pl-9 pr-4 text-[11px] focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600" />
          </div>
          <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(d => (
              <button key={d} onClick={() => setSelectedDifficulty(d)} className={`flex-1 text-[9px] font-bold py-1 rounded transition-all uppercase ${selectedDifficulty === d ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}>{d === 'all' ? 'Все' : d.substring(0, 3)}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {popularTags.map(tag => (
              <button key={tag} onClick={() => handleTagToggle(tag)} className={`text-[9px] font-bold uppercase tracking-tight px-2 py-0.5 rounded border transition-all ${selectedTags.includes(tag) ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600'}`}>{tag}</button>
            ))}
          </div>
        </div>

        <nav className="space-y-6 pb-10">
          {filteredCategories.map(cat => (
            <div key={cat.id}>
              <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-2 px-1">{cat.title}</h3>
              <div className="space-y-1">{cat.topics.map(t => <TopicCard key={t.id} topic={t} isActive={selectedTopicId === t.id} onClick={() => jumpToTopic(t.id)} />)}</div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content - Readable Style */}
      <main ref={contentRef} className="flex-1 overflow-y-auto bg-[#0f172a] p-6 md:p-16 scroll-smooth z-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
               <span className="text-emerald-500 text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2"><span className="w-8 h-[2px] bg-emerald-500/30"></span> Тема</span>
               <DifficultyBadge difficulty={currentTopic.difficulty} size="md" />
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight tracking-tight">{currentTopic.title}</h2>
            <p className="text-xl text-slate-400 leading-relaxed font-light">{currentTopic.description}</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 mb-10 relative overflow-hidden group shadow-xl">
            <h4 className="text-white font-bold mb-6 flex items-center gap-3 text-lg"><i className="fa-solid fa-star text-emerald-500"></i> Ключевые моменты</h4>
            <ul className="space-y-5 mb-8">
              {currentTopic.keyPoints.map((p, i) => (
                <li key={i} className="flex gap-4 text-slate-300 text-base leading-relaxed">
                  <span className="mt-2 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] flex-shrink-0"></span>{p}
                </li>
              ))}
            </ul>
            <button onClick={handleGenerateQuestions} disabled={isGeneratingQuestions} className="text-xs font-bold uppercase tracking-widest bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-6 py-3 rounded-xl transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50">
              {isGeneratingQuestions ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <i className="fa-solid fa-clipboard-question"></i>} Сгенерировать вопросы для самопроверки
            </button>
            {selfTestQuestions && <div className="mt-10 p-8 bg-[#0a0f1d] rounded-2xl border border-emerald-500/20 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500"><MarkdownRenderer text={selfTestQuestions} /></div>}
          </div>

          {currentTopic.codeExample && (
            <div className="mb-14">
              <div className="text-[11px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <i className="fa-solid fa-code"></i> Пример использования
              </div>
              <CodeHighlighter code={currentTopic.codeExample} />
            </div>
          )}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-16 shadow-xl relative">
            <div className="absolute top-0 right-12 -translate-y-1/2 bg-emerald-500 text-slate-950 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">AI Interviewer</div>
            <h4 className="text-white font-bold mb-2 flex items-center gap-3 text-lg"><i className="fa-solid fa-robot text-emerald-500"></i> Проверка понимания</h4>
            <p className="text-sm text-slate-500 mb-8 font-medium">Объясните тему своими словами — так, как вы бы сделали это на интервью.</p>
            <div className="relative mb-6">
              <textarea value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="Ваше объяснение..." className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-base text-slate-300 focus:ring-2 focus:ring-emerald-500/30 outline-none min-h-[160px] transition-all placeholder:text-slate-700" />
              <button onClick={toggleRecording} className={`absolute bottom-4 right-4 w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isRecording ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/20' : 'bg-slate-800 text-slate-400 hover:text-emerald-500 hover:bg-slate-700'}`}><i className={`fa-solid ${isRecording ? 'fa-stop text-lg' : 'fa-microphone text-lg'}`}></i></button>
            </div>
            <button onClick={handleAskInterviewer} disabled={isLoading || !userAnswer.trim()} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-2xl transition-all text-base shadow-lg shadow-emerald-500/10 active:scale-[0.99]">{isLoading ? <i className="fa-solid fa-spinner animate-spin mr-2"></i> : "Проверить мои знания"}</button>
            {aiFeedback && <div className="mt-10 p-8 bg-[#0a0f1d] border-l-4 border-emerald-500 rounded-r-2xl shadow-2xl animate-in fade-in slide-in-from-left-4 duration-500"><MarkdownRenderer text={aiFeedback} /></div>}
          </div>

          {nextTopic && (
            <div className="mb-20">
               <button onClick={() => jumpToTopic(nextTopic.id)} className="w-full group bg-gradient-to-br from-slate-900 to-[#0b1222] hover:from-emerald-950/40 hover:to-slate-900 border border-slate-800 hover:border-emerald-500/40 p-8 rounded-3xl transition-all duration-500 text-left shadow-2xl relative overflow-hidden">
                 <div className="flex items-center justify-between relative z-10">
                   <div className="space-y-3">
                     <DifficultyBadge difficulty={nextTopic.difficulty} size="md" />
                     <h5 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors tracking-tight">{nextTopic.title}</h5>
                     <p className="text-base text-slate-500 line-clamp-1 font-light">{nextTopic.description}</p>
                   </div>
                   <div className="w-14 h-14 rounded-2xl bg-slate-800 group-hover:bg-emerald-500 flex items-center justify-center transition-all group-hover:translate-x-2 shadow-lg"><i className="fa-solid fa-arrow-right text-slate-400 group-hover:text-slate-950 text-xl"></i></div>
                 </div>
               </button>
            </div>
          )}
          <footer className="text-center text-slate-700 text-[10px] font-bold tracking-[0.4em] border-t border-slate-900 pt-10 pb-16 uppercase">JS Interview Pro • engine v2.3 • 2024</footer>
        </div>
      </main>
    </div>
  );
};

export default App;
