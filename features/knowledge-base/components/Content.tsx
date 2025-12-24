
import React from 'react';
import { Topic } from '../../../core/types';
import { Badge, CodeBlock } from '../../../components/ui';
import ScopeChainVisualizer from '../visualizers/ScopeChainVisualizer';

interface ContentProps {
  topic: Topic;
  nextTopic?: Topic | null;
  relatedTopics: Topic[];
  onTopicJump: (id: string) => void;
}

const Content: React.FC<ContentProps> = (props) => {
  const { topic } = props;

  return (
    <div key={topic.id} className="w-full max-w-4xl mx-auto py-12 px-6 animate-content">
      <header className="mb-10 relative">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">TEMA</span>
          <Badge variant={topic.difficulty} className="px-3" />
        </div>
        <h2 className="text-4xl font-black text-white mb-4 tracking-tight leading-tight">{topic.title}</h2>
        <p className="text-slate-400 text-lg font-medium leading-relaxed mb-6">
          {topic.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {topic.tags.map(tag => (
            <span key={tag} className="text-[10px] font-semibold bg-slate-800/40 text-slate-500 border border-slate-700/30 px-2 py-0.5 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <section className="bg-[#1e293b]/20 border border-slate-800/60 rounded-xl p-8 mb-10 shadow-xl">
        <h3 className="text-white text-sm font-bold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-star text-emerald-500 text-xs"></i>
          Ключевые моменты
        </h3>
        <ul className="space-y-4">
          {topic.keyPoints.map((point, i) => (
            <li key={i} className="flex gap-3 text-slate-300 text-sm leading-relaxed group">
              <span className="text-emerald-500 font-bold">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mb-10">
        <h3 className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-4">КОД ДЛЯ ЗАКРЕПЛЕНИЯ</h3>
        {topic.examples?.map((ex, i) => (
          <CodeBlock key={i} title={ex.title} code={ex.code} />
        ))}
      </div>

      {topic.id === 'scope-chain' && <ScopeChainVisualizer />}

      <div className="mt-16 text-center">
        <h3 className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em] mb-6">РЕКОМЕНДУЕМЫЙ СЛЕДУЮЩИЙ ШАГ</h3>
        {props.nextTopic && (
          <div 
            onClick={() => props.onTopicJump(props.nextTopic!.id)}
            className="w-full text-left bg-[#1e293b]/20 border border-slate-800/60 rounded-xl p-8 hover:border-emerald-500/30 transition-all cursor-pointer group flex items-center justify-between"
          >
            <div className="flex-1 pr-6">
              <Badge variant={props.nextTopic.difficulty} className="mb-2 px-3" />
              <h4 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors mb-2">
                {props.nextTopic.title}
              </h4>
              <p className="text-slate-500 text-xs line-clamp-1">{props.nextTopic.description}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800/40 flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </div>
          </div>
        )}
      </div>
      
      <footer className="mt-20 py-8 border-t border-slate-800/40 text-center">
        <span className="text-slate-700 text-[9px] font-black uppercase tracking-[0.3em]">JS INTERVIEW PRO • LEARNING PATH SYSTEM 1.0</span>
      </footer>
    </div>
  );
};

export default Content;
