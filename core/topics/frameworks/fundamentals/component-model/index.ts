import { Topic } from '../../../../types';
import { COMPONENT_MODEL_BEGINNER_TOPICS } from './beginner';
import { COMPONENT_MODEL_INTERMEDIATE_TOPICS } from './intermediate';
import { COMPONENT_MODEL_ADVANCED_TOPICS } from './advanced';

export const COMPONENT_MODEL_TOPICS: Topic[] = [
  ...COMPONENT_MODEL_BEGINNER_TOPICS,
  ...COMPONENT_MODEL_INTERMEDIATE_TOPICS,
  ...COMPONENT_MODEL_ADVANCED_TOPICS
];
