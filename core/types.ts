
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
  examples?: CodeExample[];
  keyPoints: string[];
  funFact?: string;
  additionalDescription?: string;
  tags: string[];         
  relatedTopics: string[]; 
}

export interface Category {
  id: string;
  title: string;
  topics: Topic[];
}
