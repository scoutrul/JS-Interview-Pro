import { Topic } from '../../../types';
import { VUE_BEGINNER_TOPICS } from './beginner';
import { VUE_INTERMEDIATE_TOPICS } from './intermediate';
import { VUE_ADVANCED_TOPICS } from './advanced';

export const VUE_TOPICS: Topic[] = [
  ...VUE_BEGINNER_TOPICS,
  ...VUE_INTERMEDIATE_TOPICS,
  ...VUE_ADVANCED_TOPICS
];

