import { Category } from '../../types';
import { JS_INTRODUCTION_TOPICS } from './introduction';
import { JS_BASICS_TOPICS } from './basics';
import { JS_VARIABLES_TOPICS } from './variables';
import { JS_FUNCTIONS_TOPICS } from './functions';
import { JS_PROTOTYPES_TOPICS } from './prototypes';
import { JS_ASYNC_TOPICS } from './async';
import { JS_COLLECTIONS_TOPICS } from './collections';
import { JS_ADVANCED_TOPICS } from './advanced';
import { JS_BROWSER_API_TOPICS } from './browser-api';
import { JS_SECURITY_TOPICS } from './security';

export const JS_KNOWLEDGE_BASE: Category[] = [
  {
    id: 'introduction',
    title: 'Введение',
    topics: JS_INTRODUCTION_TOPICS
  },
  {
    id: 'basics',
    title: 'Основы JavaScript',
    topics: JS_BASICS_TOPICS
  },
  {
    id: 'variables',
    title: 'Переменные и Область видимости',
    topics: JS_VARIABLES_TOPICS
  },
  {
    id: 'functions',
    title: 'Функции и Замыкания',
    topics: JS_FUNCTIONS_TOPICS
  },
  {
    id: 'prototypes',
    title: 'Прототипы и ООП',
    topics: JS_PROTOTYPES_TOPICS
  },
  {
    id: 'async',
    title: 'Асинхронность',
    topics: JS_ASYNC_TOPICS
  },
  {
    id: 'collections',
    title: 'Коллекции и структуры данных',
    topics: JS_COLLECTIONS_TOPICS
  },
  {
    id: 'advanced',
    title: 'Продвинутые возможности',
    topics: JS_ADVANCED_TOPICS
  },
  {
    id: 'browser-api',
    title: 'Browser API',
    topics: JS_BROWSER_API_TOPICS
  },
  {
    id: 'security',
    title: 'Безопасность',
    topics: JS_SECURITY_TOPICS
  }
];
