import { Topic } from '../../../types';
import { VPS_BEGINNER_TOPICS } from './beginner';
import { VPS_INTERMEDIATE_TOPICS } from './intermediate';
import { VPS_ADVANCED_TOPICS } from './advanced';

export const VPS_TOPICS: Topic[] = [
  ...VPS_BEGINNER_TOPICS,
  ...VPS_INTERMEDIATE_TOPICS,
  ...VPS_ADVANCED_TOPICS
];

