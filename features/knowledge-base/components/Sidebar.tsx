
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Difficulty } from '../../../core/types';
import { Badge } from '../../../components/ui';
import { useKnowledgeBaseStore } from '../../../store/knowledgeBaseStore';
import { useTopicsFilter, useTags } from '../hooks';
import { META_CATEGORIES } from '../../../core/metaCategories';

interface SidebarHeaderProps {
  categoryIcon: string;
  selectedMetaCategory: string;
  className?: string;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ categoryIcon, selectedMetaCategory, className = '' }) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-emerald-500">
          <i className={`${categoryIcon} text-emerald-500 text-base`}></i>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-white text-lg tracking-tight">
            <span className="relative">            
              Front
              <span className="text-emerald-500 font-bold">Start</span>
            </span>

            {selectedMetaCategory && (
              <>
                <span className="text-slate-500 text-sm"> / </span>
                <span className="text-amber-500 text-sm">{META_CATEGORIES.find(c => c.id === selectedMetaCategory)?.title}</span>
              </>
            )}
          </h1>
        </div>
      </div>
    </div>
  );
};

interface SidebarProps {
  onTopicSelect: (id: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onTopicSelect, isOpen = true, onClose }) => {
  const { 
    selectedTopicId, 
    searchQuery, 
    selectedDifficulty, 
    selectedTags,
    selectedMetaCategory,
    setSearchQuery,
    setSelectedDifficulty,
    toggleTag,
    clearSelectedTags,
    isLearned,
    clearAllLearned,
    learnedTopics
  } = useKnowledgeBaseStore();
  
  const [showAllTags, setShowAllTags] = useState(false);
  const [tagsCategory, setTagsCategory] = useState<string>(selectedMetaCategory);
  const TAGS_LIMIT = 12;
  
  const { filteredCategories } = useTopicsFilter();
  const { availableTags } = useTags();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Получаем текущую категорию для иконки
  const currentCategory = META_CATEGORIES.find(c => c.id === selectedMetaCategory);
  const categoryIcon = currentCategory?.icon || 'fa-brands fa-js';

  // Сворачиваем теги при переключении категории (синхронно, без мигания)
  useEffect(() => {
    if (tagsCategory !== selectedMetaCategory) {
      setShowAllTags(false);
      setTagsCategory(selectedMetaCategory);
    }
  }, [selectedMetaCategory, tagsCategory]);

  // Очищаем теги и сворачиваем блок при изменении фильтров
  useEffect(() => {
    if (selectedTags.length > 0) {
      clearSelectedTags();
      setShowAllTags(false);
    }
  }, [searchQuery, selectedDifficulty]);

  // Вычисляем актуальное состояние тегов - всегда false при смене категории
  const actualShowAllTags = tagsCategory === selectedMetaCategory ? showAllTags : false;

  // Скроллим к заголовку подраздела, содержащего активную тему
  useEffect(() => {
    if (!selectedTopicId || !scrollRef.current) return;
    const container = scrollRef.current;
    const active = container.querySelector<HTMLButtonElement>(`[data-topic-id="${selectedTopicId}"]`);
    if (!active) return;
    
    // Находим родительский div категории (mb-8 last:mb-0)
    const categoryDiv = active.closest('.mb-8');
    if (!categoryDiv) return;
    
    // Находим заголовок подраздела (h3) внутри этой категории
    const categoryHeader = categoryDiv.querySelector<HTMLHeadingElement>('h3');
    if (!categoryHeader) return;
    
    const containerRect = container.getBoundingClientRect();
    const headerRect = categoryHeader.getBoundingClientRect();
    const offset = headerRect.top - containerRect.top + container.scrollTop - 12; // небольшой отступ сверху
    container.scrollTo({ top: offset, behavior: 'smooth' });
  }, [selectedTopicId, filteredCategories]);
  
  const renderDifficultyStars = (d: Difficulty | 'all') => {
    if (d === 'all') return 'BCE';
    const count = d === 'beginner' ? 1 : d === 'intermediate' ? 2 : 3;
    const colors: Record<string, string> = {
      beginner: 'text-emerald-500',
      intermediate: 'text-amber-500',
      advanced: 'text-purple-500'
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
    <aside className={`
      fixed lg:static
      w-full lg:w-[max(300px,min(25vw,20rem))]
      h-full
      bg-slate-900 border-r border-slate-800/80
      flex flex-col flex-shrink-0
      z-40 lg:z-20
      transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="flex items-center justify-between p-5 border-b border-slate-800/80 lg:hidden">
        <SidebarHeader categoryIcon={categoryIcon} selectedMetaCategory={selectedMetaCategory} />
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <i className="fa-solid fa-times text-sm"></i>
        </button>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar">
        <div key={selectedMetaCategory} className="p-5 animate-sidebar">
          <SidebarHeader 
            categoryIcon={categoryIcon} 
            selectedMetaCategory={selectedMetaCategory}
            className="hidden lg:flex items-center gap-3 mb-6"
          />

          <div className="space-y-4 mb-6">
            <div className="relative group">
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]"></i>
              <input 
                type="text" 
                placeholder="Фильтр по темам и тегам" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-[#1e293b]/30 border border-slate-800/80 rounded-md py-1.5 text-[11px] text-slate-300 outline-none focus:border-emerald-500/40 transition-all placeholder:text-slate-700 ${searchQuery ? 'pl-8 pr-8' : 'pl-8 pr-3'}`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
                  title="Очистить"
                >
                  <i className="fa-solid fa-times text-[10px]"></i>
                </button>
              )}
            </div>

            <div className="flex bg-[#0a0f1d] p-0.5 rounded-md border border-slate-800/80 shadow-inner">
              {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(d => (
                <button 
                  key={d} 
                  onClick={() => setSelectedDifficulty(d)}
                  className={`flex-1 flex justify-center items-center text-[9px] font-bold py-1.5 rounded transition-all ${
                    selectedDifficulty === d ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-400'
                  }`}
                >
                  {renderDifficultyStars(d)}
                </button>
              ))}
            </div>

            <div key={selectedMetaCategory} className="space-y-2">
              <div className="flex flex-wrap gap-1.5 pt-1">
                {availableTags.length > 0 ? (
                  (actualShowAllTags ? availableTags : availableTags.slice(0, TAGS_LIMIT)).map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`text-[12px] px-2 py-0.5 rounded border transition-all ${
                        selectedTags.includes(tag) 
                          ? 'bg-transparent border-white text-white' 
                          : 'bg-transparent border-slate-800/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))
                ) : (
                  <div className="text-[9px] text-slate-600 italic">Нет доступных тегов</div>
                )}
                {availableTags.length > TAGS_LIMIT && (
                  <button
                    onClick={() => setShowAllTags(!actualShowAllTags)}
                    className="text-[9px] text-slate-500 hover:text-slate-400 transition-colors flex items-center gap-1"
                  >
                    <span>{actualShowAllTags ? '' : '...'}</span>
                    <i className={`fa-solid fa-chevron-${actualShowAllTags ? 'up' : 'down'} text-[9px]`}></i>
                  </button>
                )}
              </div>

            </div>
          </div>

          {(() => {
            // Не показываем блок прогресса, если есть активный поиск
            if (searchQuery) return null;
            
            const totalTopics = filteredCategories.reduce((sum, cat) => sum + cat.topics.length, 0);
            const learnedInFiltered = filteredCategories.reduce(
              (sum, cat) => sum + cat.topics.filter(t => isLearned(t.id, selectedMetaCategory)).length,
              0
            );
            const categoryLearned = learnedTopics[selectedMetaCategory] || [];
            const hasLearned = categoryLearned.length > 0;
            
            if (totalTopics === 0 && !hasLearned) return null;
            
            return (
              <div className="mb-4 bg-slate-800/20 border border-slate-700/30 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  {totalTopics > 0 && (
                    <>
                      <span className="text-[10px] text-slate-500 font-bold uppercase whitespace-nowrap">Прогресс</span>
                      <div className="flex-1 bg-slate-800/40 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-300"
                          style={{ width: `${totalTopics > 0 ? (learnedInFiltered / totalTopics) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-emerald-400 font-bold whitespace-nowrap">
                        {learnedInFiltered}/{totalTopics}
                      </span>
                    </>
                  )}
                  {hasLearned && (
                    <button
                      onClick={() => {
                        if (confirm('Очистить все отметки об изученных темах?')) {
                          clearAllLearned(selectedMetaCategory);
                        }
                      }}
                      className="w-6 h-6 flex items-center justify-center bg-slate-800/40 border border-slate-700/50 rounded text-slate-400 hover:text-slate-300 hover:bg-slate-700/40 transition-all flex-shrink-0"
                      title="Очистить изученное"
                    >
                      <i className="fa-solid fa-trash text-[10px]"></i>
                    </button>
                  )}
                </div>
              </div>
            );
          })()}

          <nav className="pt-4 border-t border-slate-800/40">
            {filteredCategories.length > 0 ? (
              filteredCategories.map(cat => (
              <div key={cat.id} className="mb-8 last:mb-0">
                <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-3 px-1">{cat.title}</h3>
                <div className="space-y-2">
                  {cat.topics.map(topic => {
                    const isActive = selectedTopicId === topic.id;
                    const topicLearned = isLearned(topic.id, selectedMetaCategory);
                    const difficultyColors: Record<Difficulty, { bg: string; border: string; text: string; shadow: string }> = {
                      beginner: {
                        bg: 'bg-emerald-500/5',
                        border: 'border-emerald-500',
                        text: 'text-emerald-400',
                        shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                      },
                      intermediate: {
                        bg: 'bg-amber-500/5',
                        border: 'border-amber-500',
                        text: 'text-amber-400',
                        shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.05)]'
                      },
                      advanced: {
                        bg: 'bg-purple-500/5',
                        border: 'border-purple-500',
                        text: 'text-purple-400',
                        shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.05)]'
                      }
                    };
                    const activeColors = isActive ? difficultyColors[topic.difficulty] : null;
                    
                    return (
                      <button
                        key={topic.id}
                        onClick={() => onTopicSelect(topic.id)}
                        data-topic-id={topic.id}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-all border flex items-center justify-between group relative ${
                          isActive 
                            ? `${activeColors?.bg} ${activeColors?.border} ${activeColors?.text} ${activeColors?.shadow}` 
                            : topicLearned
                            ? 'bg-slate-800/30 border-slate-700/40 text-slate-500 hover:bg-slate-800/40 hover:text-slate-400'
                            : 'bg-[#1e293b]/20 border-slate-800/80 text-slate-400 hover:bg-slate-800/40 hover:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {topicLearned ? (
                            <i className="fa-solid fa-check-circle text-emerald-500 text-[10px] flex-shrink-0"></i>
                          ) : (
                            <i className="fa-regular fa-circle text-slate-500 text-[10px] flex-shrink-0"></i>
                          )}
                          <span className={`text-[14px] font-bold truncate ${isActive ? activeColors?.text : 'text-slate-300'}`}>
                            {topic.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <Badge variant={topic.difficulty} className="h-4 px-1.5" />
                          {topic.isFrontendEssential && (
                            <div className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0 absolute right-[6px] top-[4px]"></div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-slate-600 text-sm mb-2">Темы не найдены</div>
                <div className="text-slate-700 text-[11px]">Попробуйте изменить фильтры</div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

