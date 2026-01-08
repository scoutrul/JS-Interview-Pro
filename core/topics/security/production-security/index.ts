import { Topic } from '../../../types';
import { SECURITY_PRODUCTION_BEGINNER_TOPICS } from './beginner';
import { SECURITY_PRODUCTION_INTERMEDIATE_TOPICS } from './intermediate';

export const SECURITY_PRODUCTION_TOPICS: Topic[] = [
  ...SECURITY_PRODUCTION_BEGINNER_TOPICS,
  ...SECURITY_PRODUCTION_INTERMEDIATE_TOPICS
];
