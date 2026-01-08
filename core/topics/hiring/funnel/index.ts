import { Category } from '../../../types';
import { HIRING_FUNNEL_STAGES_TOPICS } from './stages';
import { HIRING_FUNNEL_GOALS_TOPICS } from './goals';

export const HIRING_FUNNEL_CATEGORIES: Category[] = [
  {
    id: 'hiring-funnel',
    title: 'ВОРОНКА — ГДЕ ВЫ ТЕРЯЕТЕСЬ',
    topics: [
      ...HIRING_FUNNEL_STAGES_TOPICS,
      ...HIRING_FUNNEL_GOALS_TOPICS
    ]
  }
];
