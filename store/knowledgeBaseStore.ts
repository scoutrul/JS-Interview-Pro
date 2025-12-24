import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Difficulty } from '../core/types';

interface KnowledgeBaseState {
  selectedTopicId: string;
  searchQuery: string;
  selectedDifficulty: Difficulty | 'all';
  selectedTags: string[];
  learnedTopics: string[];
  
  setSelectedTopicId: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedDifficulty: (difficulty: Difficulty | 'all') => void;
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  toggleLearned: (topicId: string) => void;
  isLearned: (topicId: string) => boolean;
  clearAllLearned: () => void;
}

export const useKnowledgeBaseStore = create<KnowledgeBaseState>()(
  persist(
    (set, get) => ({
      selectedTopicId: 'var-let-const',
      searchQuery: '',
      selectedDifficulty: 'all',
      selectedTags: [],
      learnedTopics: [],
      
      setSelectedTopicId: (id) => set({ selectedTopicId: id }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
      toggleTag: (tag) => set((state) => ({
        selectedTags: state.selectedTags.includes(tag)
          ? state.selectedTags.filter(t => t !== tag)
          : [...state.selectedTags, tag]
      })),
      clearFilters: () => set({ 
        searchQuery: '', 
        selectedDifficulty: 'all', 
        selectedTags: [] 
      }),
      toggleLearned: (topicId) => set((state) => ({
        learnedTopics: state.learnedTopics.includes(topicId)
          ? state.learnedTopics.filter(id => id !== topicId)
          : [...state.learnedTopics, topicId]
      })),
      isLearned: (topicId) => get().learnedTopics.includes(topicId),
      clearAllLearned: () => set({ learnedTopics: [] }),
    }),
    {
      name: 'js-interview-pro-storage',
      partialize: (state) => ({ learnedTopics: state.learnedTopics }),
    }
  )
);

