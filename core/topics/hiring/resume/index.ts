import { Category } from '../../../types';
import { HIRING_RESUME_ATS_TOPICS } from './ats';
import { HIRING_RESUME_STRUCTURE_TOPICS } from './structure';
import { HIRING_RESUME_DISTRIBUTION_TOPICS } from './distribution';

export const HIRING_RESUME_CATEGORIES: Category[] = [
  {
    id: 'hiring-resume',
    title: 'РЕЗЮМЕ — БИЛЕТ В ПЕРВЫЙ ЗВОНОК',
    topics: [
      ...HIRING_RESUME_ATS_TOPICS,
      ...HIRING_RESUME_STRUCTURE_TOPICS,
      ...HIRING_RESUME_DISTRIBUTION_TOPICS
    ]
  }
];
