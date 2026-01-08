import { Category } from '../../../types';
import { HIRING_OFFER_ANALYSIS_TOPICS } from './analysis';
import { HIRING_OFFER_TACTICS_TOPICS } from './tactics';
import { HIRING_OFFER_ACCEPTANCE_TOPICS } from './acceptance';

export const HIRING_OFFER_NEGOTIATIONS_CATEGORIES: Category[] = [
  {
    id: 'hiring-offer-negotiations',
    title: 'ОФФЕР И ПЕРЕГОВОРЫ — ФИНИШНАЯ ПРЯМАЯ',
    topics: [
      ...HIRING_OFFER_ANALYSIS_TOPICS,
      ...HIRING_OFFER_TACTICS_TOPICS,
      ...HIRING_OFFER_ACCEPTANCE_TOPICS
    ]
  }
];
