import { Topic } from '../../../types';
import { SECURITY_XSS_BEGINNER_TOPICS } from './beginner';
import { SECURITY_XSS_INTERMEDIATE_TOPICS } from './intermediate';
import { SECURITY_XSS_ADVANCED_TOPICS } from './advanced';

export const SECURITY_XSS_TOPICS: Topic[] = [
  ...SECURITY_XSS_BEGINNER_TOPICS,
  ...SECURITY_XSS_INTERMEDIATE_TOPICS,
  ...SECURITY_XSS_ADVANCED_TOPICS
];
