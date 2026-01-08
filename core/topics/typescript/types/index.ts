import { Topic } from '../../../types';
import { TYPESCRIPT_TYPES_BEGINNER_TOPICS } from './beginner';
import { TYPESCRIPT_TYPES_INTERMEDIATE_TOPICS } from './intermediate';
import { TYPESCRIPT_TYPES_ADVANCED_TOPICS } from './advanced';

export const TYPESCRIPT_TYPES_TOPICS: Topic[] = [
  ...TYPESCRIPT_TYPES_BEGINNER_TOPICS,
  ...TYPESCRIPT_TYPES_INTERMEDIATE_TOPICS,
  ...TYPESCRIPT_TYPES_ADVANCED_TOPICS
];
