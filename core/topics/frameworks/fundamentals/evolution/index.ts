import { Topic } from '../../../../types';
import { EVOLUTION_BEGINNER_TOPICS } from './beginner';
import { EVOLUTION_INTERMEDIATE_TOPICS } from './intermediate';
import { EVOLUTION_ADVANCED_TOPICS } from './advanced';

export const EVOLUTION_TOPICS: Topic[] = [
  ...EVOLUTION_BEGINNER_TOPICS,
  ...EVOLUTION_INTERMEDIATE_TOPICS,
  ...EVOLUTION_ADVANCED_TOPICS
];
