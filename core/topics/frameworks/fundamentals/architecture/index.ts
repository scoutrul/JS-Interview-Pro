import { Topic } from '../../../../types';
import { ARCHITECTURE_BEGINNER_TOPICS } from './beginner';
import { ARCHITECTURE_INTERMEDIATE_TOPICS } from './intermediate';
import { ARCHITECTURE_ADVANCED_TOPICS } from './advanced';

export const ARCHITECTURE_TOPICS: Topic[] = [
  ...ARCHITECTURE_BEGINNER_TOPICS,
  ...ARCHITECTURE_INTERMEDIATE_TOPICS,
  ...ARCHITECTURE_ADVANCED_TOPICS
];
