import { Topic } from '../../../types';
import { SECURITY_HTTPS_BEGINNER_TOPICS } from './beginner';
import { SECURITY_HTTPS_INTERMEDIATE_TOPICS } from './intermediate';
import { SECURITY_HTTPS_ADVANCED_TOPICS } from './advanced';

export const SECURITY_HTTPS_TOPICS: Topic[] = [
  ...SECURITY_HTTPS_BEGINNER_TOPICS,
  ...SECURITY_HTTPS_INTERMEDIATE_TOPICS,
  ...SECURITY_HTTPS_ADVANCED_TOPICS
];
