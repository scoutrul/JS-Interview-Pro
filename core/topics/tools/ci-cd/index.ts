import { Topic } from '../../../types';
import { CI_CD_BEGINNER_TOPICS } from './beginner';
import { CI_CD_INTERMEDIATE_TOPICS } from './intermediate';
import { CI_CD_ADVANCED_TOPICS } from './advanced';

export const CI_CD_TOPICS: Topic[] = [
  ...CI_CD_BEGINNER_TOPICS,
  ...CI_CD_INTERMEDIATE_TOPICS,
  ...CI_CD_ADVANCED_TOPICS
];




