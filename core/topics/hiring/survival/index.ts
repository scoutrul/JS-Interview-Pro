import { Category } from '../../../types';
import { HIRING_SURVIVAL_ANALYSIS_TOPICS } from './analysis';
import { HIRING_SURVIVAL_PSYCHOLOGY_TOPICS } from './psychology';
import { HIRING_SURVIVAL_ALTERNATIVES_TOPICS } from './alternatives';

export const HIRING_SURVIVAL_CATEGORIES: Category[] = [
  {
    id: 'hiring-survival',
    title: 'КАК ВЫЖИТЬ В ПОИСКЕ',
    topics: [
      ...HIRING_SURVIVAL_ANALYSIS_TOPICS,
      ...HIRING_SURVIVAL_PSYCHOLOGY_TOPICS,
      ...HIRING_SURVIVAL_ALTERNATIVES_TOPICS
    ]
  }
];
