import { Topic } from '../../../../types';
import { META_FRAMEWORKS_BEGINNER_TOPICS } from './beginner';
import { META_FRAMEWORKS_INTERMEDIATE_TOPICS } from './intermediate';
import { META_FRAMEWORKS_ADVANCED_TOPICS } from './advanced';

export const META_FRAMEWORKS_TOPICS: Topic[] = [
  ...META_FRAMEWORKS_BEGINNER_TOPICS,
  ...META_FRAMEWORKS_INTERMEDIATE_TOPICS,
  ...META_FRAMEWORKS_ADVANCED_TOPICS
];
