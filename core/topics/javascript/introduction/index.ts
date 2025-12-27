import { Topic } from '../../../types';
import { JS_INTRODUCTION_BEGINNER_TOPICS } from './beginner';
import { JS_INTRODUCTION_INTERMEDIATE_TOPICS } from './intermediate';
import { JS_INTRODUCTION_ADVANCED_TOPICS } from './advanced';

export const JS_INTRODUCTION_TOPICS: Topic[] = [
  ...JS_INTRODUCTION_BEGINNER_TOPICS,
  ...JS_INTRODUCTION_INTERMEDIATE_TOPICS,
  ...JS_INTRODUCTION_ADVANCED_TOPICS
];

