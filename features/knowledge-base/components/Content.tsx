
import React from 'react';
import { Topic } from '../../../core/types';
import { Badge, CodeBlock } from '../../../components/ui';
import ScopeChainVisualizer from '../visualizers/ScopeChainVisualizer';

interface ContentProps {
  topic: Topic;
  relatedTopics: Topic[];
  onTopicJump: (id: string) => void;
}

const Content: React.FC<ContentProps> = (props) => {
  const { topic } = props;

  return (
    <div key={topic.id} className="w-full max-w-[min(90vw,80rem)] mx-auto py-12 px-6 animate-content">
      <header className="mb-10 relative">
        <div className="flex items-start mb-2">
          <Badge variant={topic.difficulty} className="px-3 py-1.5" />
        </div>
        <h2 className="text-4xl font-black text-white mb-4 tracking-tight leading-tight">{topic.title}</h2>
        <p className="text-slate-400 text-lg font-medium leading-relaxed mb-6">
          {topic.description}
        </p>
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

      {props.relatedTopics.length > 0 && (
        <div className="mt-16">
          <h3 className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-6">РЕЛЕВАНТНЫЕ ТЕМЫ</h3>
          <div className="grid grid-cols-2 gap-3">
            {props.relatedTopics.map(relatedTopic => (
              <div
                key={relatedTopic.id}
                onClick={() => props.onTopicJump(relatedTopic.id)}
                className="text-left bg-[#161b22] border border-slate-800/60 rounded-xl p-5 hover:border-emerald-500/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={relatedTopic.difficulty} className="px-2 py-0.5" />
                      <h4 className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {relatedTopic.title}
                      </h4>
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-3">{relatedTopic.description}</p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-800/40 flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all flex-shrink-0">
                    <i className="fa-solid fa-arrow-right text-[9px]"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
