import { Category } from '../../../types';
import { HIRING_STRATEGY_SEARCH_TOPICS } from './search';
import { HIRING_STRATEGY_WHERE_TOPICS } from './where';
import { HIRING_STRATEGY_TACTICS_TOPICS } from './tactics';

export const HIRING_STRATEGY_CATEGORIES: Category[] = [
  {
    id: 'hiring-strategy',
    title: 'СТРАТЕГИЯ — КАК НЕ ТРАТИТЬ ВРЕМЯ ВПУСТУЮ',
    topics: [
      ...HIRING_STRATEGY_SEARCH_TOPICS,
      ...HIRING_STRATEGY_WHERE_TOPICS,
      ...HIRING_STRATEGY_TACTICS_TOPICS
    ]
  }
];
