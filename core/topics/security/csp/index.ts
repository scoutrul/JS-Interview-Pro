import { Topic } from '../../../types';
import { SECURITY_CSP_BEGINNER_TOPICS } from './beginner';
import { SECURITY_CSP_INTERMEDIATE_TOPICS } from './intermediate';
import { SECURITY_CSP_ADVANCED_TOPICS } from './advanced';

export const SECURITY_CSP_TOPICS: Topic[] = [
  ...SECURITY_CSP_BEGINNER_TOPICS,
  ...SECURITY_CSP_INTERMEDIATE_TOPICS,
  ...SECURITY_CSP_ADVANCED_TOPICS
];
