import { Topic } from '../../../../types';
import { INTERVIEWS_BEGINNER_TOPICS } from './beginner';
import { INTERVIEWS_INTERMEDIATE_TOPICS } from './intermediate';
import { INTERVIEWS_ADVANCED_TOPICS } from './advanced';

export const INTERVIEWS_TOPICS: Topic[] = [
  ...INTERVIEWS_BEGINNER_TOPICS,
  ...INTERVIEWS_INTERMEDIATE_TOPICS,
  ...INTERVIEWS_ADVANCED_TOPICS
];
