import { Topic } from '../../../types';
import { SECURITY_OWASP_BEGINNER_TOPICS } from './beginner';
import { SECURITY_OWASP_INTERMEDIATE_TOPICS } from './intermediate';

export const SECURITY_OWASP_TOPICS: Topic[] = [
  ...SECURITY_OWASP_BEGINNER_TOPICS,
  ...SECURITY_OWASP_INTERMEDIATE_TOPICS
];
