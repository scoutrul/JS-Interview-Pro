
import React from 'react';
import { Category, Difficulty } from '../../../core/types';
import { Badge } from '../../../components/ui';
import { POPULAR_TAGS } from '../../../core/constants';

interface SidebarProps {
  categories: Category[];
  selectedTopicId: string;
  onTopicSelect: (id: string) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedDifficulty: Difficulty | 'all';
  onDifficultyChange: (val: Difficulty | 'all') => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  
  const renderDifficultyStars = (d: Difficulty | 'all') => {
    if (d === 'all') return 'BCE';
    const count = d === 'beginner' ? 1 : d === 'intermediate' ? 2 : 3;
    const colors: Record<string, string> = {
      beginner: 'text-emerald-500',
      intermediate: 'text-amber-500',
      advanced: 'text-rose-500'
    };
    return (
      <div className="flex gap-0.5">
        {[...Array(count)].map((_, i) => (
          <i key={i} className={`fa-solid fa-star text-[7px] ${colors[d]}`}></i>
        ))}
      </div>
    );
  };

  return (
    <aside className="w-full md:w-80 h-full bg-slate-900 border-r border-slate-800/80 flex flex-col flex-shrink-0 z-20 transition-colors duration-300">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-500 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <i className="fa-brands fa-js text-slate-950 text-base"></i>
            </div>
            <h1 className="font-bold text-white text-lg tracking-tight">
              JS Interview <span className="text-emerald-500">Pro</span>
            </h1>
          </div>

          <div className="space-y-4 mb-6">
            <div className="relative group">
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]"></i>
              <input 
                type="text" 
                placeholder="Поиск..." 
                value={props.searchQuery}
                onChange={(e) => props.onSearchChange(e.target.value)}
                className="w-full bg-[#1e293b]/30 border border-slate-800/80 rounded-md py-1.5 pl-8 pr-3 text-[11px] text-slate-300 outline-none focus:border-emerald-500/40 transition-all placeholder:text-slate-700"
              />
            </div>

            <div className="flex bg-[#0a0f1d] p-0.5 rounded-md border border-slate-800/80 shadow-inner">
              {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(d => (
                <button 
                  key={d} 
                  onClick={() => props.onDifficultyChange(d)}
                  className={`flex-1 flex justify-center items-center text-[9px] font-bold py-1.5 rounded transition-all ${
                    props.selectedDifficulty === d ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-400'
                  }`}
                >
                  {renderDifficultyStars(d)}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {POPULAR_TAGS.slice(0, 11).map(tag => (
                <button
                  key={tag}
                  onClick={() => props.onTagToggle(tag)}
                  className={`text-[9px] px-2 py-0.5 rounded border transition-all ${
                    props.selectedTags.includes(tag) 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-transparent border-slate-800/60 text-slate-600 hover:border-slate-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <nav className="pt-4 border-t border-slate-800/40">
            {props.categories.map(cat => (
              <div key={cat.id} className="mb-8 last:mb-0">
                <h3 className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3 px-1">{cat.title}</h3>
                <div className="space-y-2">
                  {cat.topics.map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => props.onTopicSelect(topic.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all border flex items-center justify-between group ${
                        props.selectedTopicId === topic.id 
                          ? 'bg-emerald-500/5 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                          : 'bg-[#1e293b]/20 border-slate-800/80 text-slate-400 hover:bg-slate-800/40 hover:text-slate-300'
                      }`}
                    >
                      <span className={`text-[11px] font-bold truncate max-w-[140px] ${props.selectedTopicId === topic.id ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {topic.title}
                      </span>
                      <Badge variant={topic.difficulty} className="h-4 px-1.5" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
