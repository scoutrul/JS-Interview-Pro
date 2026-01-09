import { Topic } from '../../../../types';
import { REACTIVITY_BEGINNER_TOPICS } from './beginner';
import { REACTIVITY_INTERMEDIATE_TOPICS } from './intermediate';
import { REACTIVITY_ADVANCED_TOPICS } from './advanced';

export const REACTIVITY_TOPICS: Topic[] = [
  ...REACTIVITY_BEGINNER_TOPICS,
  ...REACTIVITY_INTERMEDIATE_TOPICS,
  ...REACTIVITY_ADVANCED_TOPICS
];
