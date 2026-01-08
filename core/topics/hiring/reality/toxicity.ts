import { Topic } from '../../../types';
import { HIRING_REALITY_BEGINNER_TOPICS } from './beginner';

// Экспортируем темы из beginner, которые относятся к токсичности
export const HIRING_REALITY_TOXICITY_TOPICS: Topic[] = [
  HIRING_REALITY_BEGINNER_TOPICS[3] // Почему процесс выглядит токсично
];
