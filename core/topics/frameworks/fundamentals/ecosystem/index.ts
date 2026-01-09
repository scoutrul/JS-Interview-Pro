import { Topic } from '../../../../types';
import { ECOSYSTEM_BEGINNER_TOPICS } from './beginner';
import { ECOSYSTEM_INTERMEDIATE_TOPICS } from './intermediate';
import { ECOSYSTEM_ADVANCED_TOPICS } from './advanced';

export const ECOSYSTEM_TOPICS: Topic[] = [
  ...ECOSYSTEM_BEGINNER_TOPICS,
  ...ECOSYSTEM_INTERMEDIATE_TOPICS,
  ...ECOSYSTEM_ADVANCED_TOPICS
];
