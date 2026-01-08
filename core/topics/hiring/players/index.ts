import { Category } from '../../../types';
import { HIRING_PLAYERS_ROLES_TOPICS } from './roles';
import { HIRING_PLAYERS_MOTIVATION_TOPICS } from './motivation';

export const HIRING_PLAYERS_CATEGORIES: Category[] = [
  {
    id: 'hiring-players',
    title: 'ИГРОКИ — КТО И ЗАЧЕМ С ВАМИ ГОВОРИТ',
    topics: [
      ...HIRING_PLAYERS_ROLES_TOPICS,
      ...HIRING_PLAYERS_MOTIVATION_TOPICS
    ]
  }
];
