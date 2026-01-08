import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Difficulty } from '../core/types';
import { MetaCategoryId, DEFAULT_META_CATEGORY } from '../core/metaCategories';

interface KnowledgeBaseState {
  selectedMetaCategory: MetaCategoryId;
  selectedTopicId: string;
  searchQuery: string;
  selectedDifficulty: Difficulty | 'all';
  selectedTags: string[];
  learnedTopics: Record<MetaCategoryId, string[]>;
  
  setSelectedMetaCategory: (category: MetaCategoryId) => void;
  setSelectedTopicId: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedDifficulty: (difficulty: Difficulty | 'all') => void;
  toggleTag: (tag: string) => void;
  clearSelectedTags: () => void;
  clearFilters: () => void;
  toggleLearned: (topicId: string, metaCategory?: MetaCategoryId) => void;
  isLearned: (topicId: string, metaCategory?: MetaCategoryId) => boolean;
  clearAllLearned: (metaCategory?: MetaCategoryId) => void;
  getProgress: (metaCategory: MetaCategoryId, totalTopics: number) => number;
}

const getInitialLearnedTopics = (): Record<MetaCategoryId, string[]> => ({
  'computer-science': [],
  javascript: [],
  markup: [],
  frameworks: [],
  typescript: [],
  architecture: [],
  security: [],
  tools: [],
  network: [],
  optimization: [],
  hiring: []
});

export const useKnowledgeBaseStore = create<KnowledgeBaseState>()(
  persist(
    (set, get) => ({
      selectedMetaCategory: DEFAULT_META_CATEGORY,
      selectedTopicId: 'data-types',
      searchQuery: '',
      selectedDifficulty: 'all',
      selectedTags: [],
      learnedTopics: getInitialLearnedTopics(),
      
      setSelectedMetaCategory: (category) => set({ selectedMetaCategory: category }),
      setSelectedTopicId: (id) => set({ selectedTopicId: id }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
      toggleTag: (tag) => set((state) => ({
        selectedTags: state.selectedTags.includes(tag)
          ? state.selectedTags.filter(t => t !== tag)
          : [...state.selectedTags, tag]
      })),
      clearSelectedTags: () => set({ selectedTags: [] }),
      clearFilters: () => set({ 
        searchQuery: '', 
        selectedDifficulty: 'all', 
        selectedTags: [] 
      }),
      toggleLearned: (topicId, metaCategory) => {
        const category = metaCategory || get().selectedMetaCategory;
        set((state) => {
          const categoryTopics = state.learnedTopics[category] || [];
          return {
            learnedTopics: {
              ...state.learnedTopics,
              [category]: categoryTopics.includes(topicId)
                ? categoryTopics.filter(id => id !== topicId)
                : [...categoryTopics, topicId]
            }
          };
        });
      },
      isLearned: (topicId, metaCategory) => {
        const category = metaCategory || get().selectedMetaCategory;
        const categoryTopics = get().learnedTopics[category] || [];
        return categoryTopics.includes(topicId);
      },
      clearAllLearned: (metaCategory) => {
        if (metaCategory) {
          set((state) => ({
            learnedTopics: {
              ...state.learnedTopics,
              [metaCategory]: []
            }
          }));
        } else {
          set({ learnedTopics: getInitialLearnedTopics() });
        }
      },
      getProgress: (metaCategory, totalTopics) => {
        const learned = get().learnedTopics[metaCategory] || [];
        return totalTopics > 0 ? Math.round((learned.length / totalTopics) * 100) : 0;
      },
    }),
    {
      name: 'front-start-storage-v3', // Изменили имя для сброса кэша
      partialize: (state) => ({ 
        learnedTopics: state.learnedTopics,
        selectedMetaCategory: state.selectedMetaCategory,
        selectedTopicId: state.selectedTopicId
      }),
    }
  )
);

