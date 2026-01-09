import { Topic } from '../../../types';
import { REACT_BEGINNER_TOPICS } from './beginner';
import { REACT_INTERMEDIATE_TOPICS } from './intermediate';
import { REACT_ADVANCED_TOPICS } from './advanced';

export const REACT_TOPICS: Topic[] = [
  ...REACT_BEGINNER_TOPICS,
  ...REACT_INTERMEDIATE_TOPICS,
  ...REACT_ADVANCED_TOPICS
];

