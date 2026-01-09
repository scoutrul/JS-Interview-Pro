import { Topic } from '../../../../types';
import { FUTURE_BEGINNER_TOPICS } from './beginner';
import { FUTURE_INTERMEDIATE_TOPICS } from './intermediate';
import { FUTURE_ADVANCED_TOPICS } from './advanced';

export const FUTURE_TOPICS: Topic[] = [
  ...FUTURE_BEGINNER_TOPICS,
  ...FUTURE_INTERMEDIATE_TOPICS,
  ...FUTURE_ADVANCED_TOPICS
];
