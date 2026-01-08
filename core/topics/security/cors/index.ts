import { Topic } from '../../../types';
import { SECURITY_CORS_BEGINNER_TOPICS } from './beginner';
import { SECURITY_CORS_INTERMEDIATE_TOPICS } from './intermediate';
import { SECURITY_CORS_ADVANCED_TOPICS } from './advanced';

export const SECURITY_CORS_TOPICS: Topic[] = [
  ...SECURITY_CORS_BEGINNER_TOPICS,
  ...SECURITY_CORS_INTERMEDIATE_TOPICS,
  ...SECURITY_CORS_ADVANCED_TOPICS
];
