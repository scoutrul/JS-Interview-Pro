import { Category } from '../../../types';
import { HIRING_REALITY_MARKET_TOPICS } from './market';
import { HIRING_REALITY_TOXICITY_TOPICS } from './toxicity';

export const HIRING_REALITY_CATEGORIES: Category[] = [
  {
    id: 'hiring-reality',
    title: 'РЕАЛЬНОСТЬ — ЧТОБЫ НЕ СХОДИТЬ С УМА',
    topics: [
      ...HIRING_REALITY_MARKET_TOPICS,
      ...HIRING_REALITY_TOXICITY_TOPICS
    ]
  }
];
