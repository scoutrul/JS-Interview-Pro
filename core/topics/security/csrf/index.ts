import { Topic } from '../../../types';
import { SECURITY_CSRF_BEGINNER_TOPICS } from './beginner';
import { SECURITY_CSRF_INTERMEDIATE_TOPICS } from './intermediate';
import { SECURITY_CSRF_ADVANCED_TOPICS } from './advanced';

export const SECURITY_CSRF_TOPICS: Topic[] = [
  ...SECURITY_CSRF_BEGINNER_TOPICS,
  ...SECURITY_CSRF_INTERMEDIATE_TOPICS,
  ...SECURITY_CSRF_ADVANCED_TOPICS
];
