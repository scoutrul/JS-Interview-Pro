import { Category } from '../../../types';
import { HIRING_SOFT_SKILLS_WHAT_CHECK_TOPICS } from './what-check';
import { HIRING_SOFT_SKILLS_CULTURAL_FIT_TOPICS } from './cultural-fit';

export const HIRING_SOFT_SKILLS_CATEGORIES: Category[] = [
  {
    id: 'hiring-soft-skills',
    title: 'SOFT SKILLS НА КАЖДОМ ЭТАПЕ',
    topics: [
      ...HIRING_SOFT_SKILLS_WHAT_CHECK_TOPICS,
      ...HIRING_SOFT_SKILLS_CULTURAL_FIT_TOPICS
    ]
  }
];
