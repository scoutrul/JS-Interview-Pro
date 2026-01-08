import { Category } from '../../../types';
import { HIRING_FIRST_CALL_BEGINNER_TOPICS } from './beginner';

export const HIRING_FIRST_CALL_CATEGORIES: Category[] = [
  {
    id: 'hiring-first-call',
    title: 'ПЕРВЫЙ ЗВОНОК — ФИЛЬТР АДЕКВАТНОСТИ',
    topics: [
      ...HIRING_FIRST_CALL_BEGINNER_TOPICS
    ]
  }
];
