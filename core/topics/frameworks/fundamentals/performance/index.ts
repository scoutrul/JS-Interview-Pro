import { Topic } from '../../../../types';
import { PERFORMANCE_BEGINNER_TOPICS } from './beginner';
import { PERFORMANCE_INTERMEDIATE_TOPICS } from './intermediate';
import { PERFORMANCE_ADVANCED_TOPICS } from './advanced';

export const PERFORMANCE_TOPICS: Topic[] = [
  ...PERFORMANCE_BEGINNER_TOPICS,
  ...PERFORMANCE_INTERMEDIATE_TOPICS,
  ...PERFORMANCE_ADVANCED_TOPICS
];
