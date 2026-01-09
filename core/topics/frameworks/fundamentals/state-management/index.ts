import { Topic } from '../../../../types';
import { STATE_MANAGEMENT_BEGINNER_TOPICS } from './beginner';
import { STATE_MANAGEMENT_INTERMEDIATE_TOPICS } from './intermediate';
import { STATE_MANAGEMENT_ADVANCED_TOPICS } from './advanced';

export const STATE_MANAGEMENT_TOPICS: Topic[] = [
  ...STATE_MANAGEMENT_BEGINNER_TOPICS,
  ...STATE_MANAGEMENT_INTERMEDIATE_TOPICS,
  ...STATE_MANAGEMENT_ADVANCED_TOPICS
];
