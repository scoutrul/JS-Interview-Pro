import { Category } from '../../types';
import { TYPESCRIPT_INTRODUCTION_TOPICS } from './introduction';
import { TYPESCRIPT_TYPES_TOPICS } from './types';
import { TYPESCRIPT_INTERFACES_TYPES_TOPICS } from './interfaces-types';
import { TYPESCRIPT_GENERICS_TOPICS } from './generics';
import { TYPESCRIPT_UTILITY_TYPES_TOPICS } from './utility-types';
import { TYPESCRIPT_ADVANCED_TYPES_TOPICS } from './advanced-types';
import { TYPESCRIPT_FUNCTIONS_TOPICS } from './functions';
import { TYPESCRIPT_CLASSES_TOPICS } from './classes';
import { TYPESCRIPT_MODULES_TOPICS } from './modules';
import { TYPESCRIPT_CONFIG_TOOLS_TOPICS } from './config-tools';
import { TYPESCRIPT_DATA_HANDLING_TOPICS } from './data-handling';
import { TYPESCRIPT_PATTERNS_TOPICS } from './patterns';
import { TYPESCRIPT_REACT_TYPING_TOPICS } from './react-typing';
import { TYPESCRIPT_VUE_TYPING_TOPICS } from './vue-typing';
import { TYPESCRIPT_ANGULAR_TYPING_TOPICS } from './angular-typing';
import { TYPESCRIPT_ERRORS_DEBUGGING_TOPICS } from './errors-debugging';

export const TYPESCRIPT_CATEGORIES: Category[] = [
  {
    id: 'ts-introduction',
    title: 'Введение в TypeScript',
    topics: TYPESCRIPT_INTRODUCTION_TOPICS
  },
  {
    id: 'ts-types',
    title: 'Типы и типизация',
    topics: TYPESCRIPT_TYPES_TOPICS
  },
  {
    id: 'ts-interfaces-types',
    title: 'Интерфейсы и типы',
    topics: TYPESCRIPT_INTERFACES_TYPES_TOPICS
  },
  {
    id: 'ts-generics',
    title: 'Дженерики',
    topics: TYPESCRIPT_GENERICS_TOPICS
  },
  {
    id: 'ts-utility-types',
    title: 'Utility Types',
    topics: TYPESCRIPT_UTILITY_TYPES_TOPICS
  },
  {
    id: 'ts-advanced-types',
    title: 'Продвинутые типы',
    topics: TYPESCRIPT_ADVANCED_TYPES_TOPICS
  },
  {
    id: 'ts-functions',
    title: 'Функции',
    topics: TYPESCRIPT_FUNCTIONS_TOPICS
  },
  {
    id: 'ts-classes',
    title: 'Классы и ООП',
    topics: TYPESCRIPT_CLASSES_TOPICS
  },
  {
    id: 'ts-modules',
    title: 'Модули и пространства имен',
    topics: TYPESCRIPT_MODULES_TOPICS
  },
  {
    id: 'ts-config-tools',
    title: 'Конфигурация и инструменты',
    topics: TYPESCRIPT_CONFIG_TOOLS_TOPICS
  },
  {
    id: 'ts-data-handling',
    title: 'Работа с данными',
    topics: TYPESCRIPT_DATA_HANDLING_TOPICS
  },
  {
    id: 'ts-patterns',
    title: 'Практические паттерны',
    topics: TYPESCRIPT_PATTERNS_TOPICS
  },
  {
    id: 'ts-react-typing',
    title: 'Типизация для React',
    topics: TYPESCRIPT_REACT_TYPING_TOPICS
  },
  {
    id: 'ts-vue-typing',
    title: 'Типизация для Vue',
    topics: TYPESCRIPT_VUE_TYPING_TOPICS
  },
  {
    id: 'ts-angular-typing',
    title: 'Типизация для Angular',
    topics: TYPESCRIPT_ANGULAR_TYPING_TOPICS
  },
  {
    id: 'ts-errors-debugging',
    title: 'Ошибки и отладка',
    topics: TYPESCRIPT_ERRORS_DEBUGGING_TOPICS
  }
];

// Экспорт плоского массива для обратной совместимости
export const TYPESCRIPT_TOPICS = [
  ...TYPESCRIPT_INTRODUCTION_TOPICS,
  ...TYPESCRIPT_TYPES_TOPICS,
  ...TYPESCRIPT_INTERFACES_TYPES_TOPICS,
  ...TYPESCRIPT_GENERICS_TOPICS,
  ...TYPESCRIPT_UTILITY_TYPES_TOPICS,
  ...TYPESCRIPT_ADVANCED_TYPES_TOPICS,
  ...TYPESCRIPT_FUNCTIONS_TOPICS,
  ...TYPESCRIPT_CLASSES_TOPICS,
  ...TYPESCRIPT_MODULES_TOPICS,
  ...TYPESCRIPT_CONFIG_TOOLS_TOPICS,
  ...TYPESCRIPT_DATA_HANDLING_TOPICS,
  ...TYPESCRIPT_PATTERNS_TOPICS,
  ...TYPESCRIPT_REACT_TYPING_TOPICS,
  ...TYPESCRIPT_VUE_TYPING_TOPICS,
  ...TYPESCRIPT_ANGULAR_TYPING_TOPICS,
  ...TYPESCRIPT_ERRORS_DEBUGGING_TOPICS
];
