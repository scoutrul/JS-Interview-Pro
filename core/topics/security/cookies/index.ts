import { Topic } from '../../../types';
import { SECURITY_COOKIES_BEGINNER_TOPICS } from './beginner';
import { SECURITY_COOKIES_INTERMEDIATE_TOPICS } from './intermediate';
import { SECURITY_COOKIES_ADVANCED_TOPICS } from './advanced';

export const SECURITY_COOKIES_TOPICS: Topic[] = [
  ...SECURITY_COOKIES_BEGINNER_TOPICS,
  ...SECURITY_COOKIES_INTERMEDIATE_TOPICS,
  ...SECURITY_COOKIES_ADVANCED_TOPICS
];
