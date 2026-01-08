import { Topic } from '../../../types';
import { HIRING_REALITY_BEGINNER_TOPICS } from './beginner';

// Экспортируем темы из beginner, которые относятся к рынку
export const HIRING_REALITY_MARKET_TOPICS: Topic[] = [
  HIRING_REALITY_BEGINNER_TOPICS[0], // Цикличность рынка
  HIRING_REALITY_BEGINNER_TOPICS[1], // Статистика
  HIRING_REALITY_BEGINNER_TOPICS[2]  // Глобальный vs локальный
];
