import { Topic } from '../../../types';
import { ANGULAR_BEGINNER_TOPICS } from './beginner';
import { ANGULAR_INTERMEDIATE_TOPICS } from './intermediate';
import { ANGULAR_ADVANCED_TOPICS } from './advanced';

export const ANGULAR_TOPICS: Topic[] = [
  ...ANGULAR_BEGINNER_TOPICS,
  ...ANGULAR_INTERMEDIATE_TOPICS,
  ...ANGULAR_ADVANCED_TOPICS
];
