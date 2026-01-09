import { Topic } from '../../../../types';
import { RENDERING_BEGINNER_TOPICS } from './beginner';
import { RENDERING_INTERMEDIATE_TOPICS } from './intermediate';
import { RENDERING_ADVANCED_TOPICS } from './advanced';

export const RENDERING_TOPICS: Topic[] = [
  ...RENDERING_BEGINNER_TOPICS,
  ...RENDERING_INTERMEDIATE_TOPICS,
  ...RENDERING_ADVANCED_TOPICS
];
