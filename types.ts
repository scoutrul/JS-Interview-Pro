
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface CodeExample {
  title: string;
  code: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  examples?: CodeExample[]; // Теперь массив для подразделов
  keyPoints: string[];
  tags: string[];         
  relatedTopics: string[]; 
  nextTopicId?: string;    
}

export interface Category {
  id: string;
  title: string;
  topics: Topic[];
}

export interface AppState {
  selectedTopicId: string | null;
  searchQuery: string;
  selectedDifficulty: Difficulty | 'all';
  isAiInterviewerOpen: boolean;
}
