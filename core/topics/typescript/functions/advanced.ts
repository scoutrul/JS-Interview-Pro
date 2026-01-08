import { Topic } from '../../../types';

export const TYPESCRIPT_FUNCTIONS_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'ts-higher-order-functions',
    title: 'Higher-order Function Types',
    description: 'Higher-order functions — это функции, которые принимают или возвращают другие функции. Типизация таких функций требует понимания типов функций и их композиции.',
    difficulty: 'advanced',
    tags: ['typescript', 'functions', 'higher-order', 'advanced'],
    keyPoints: [
      'Типы функций: (param: Type) => ReturnType.',
      'Функции как параметры: функции могут принимать другие функции.',
      'Функции как возвращаемое значение: функции могут возвращать функции.',
      'Композиция: создание сложных функций из простых.'
    ],
    examples: [
      {
        title: 'Функция как параметр',
        code: `function map<T, U>(array: T[], fn: (item: T) => U): U[] {
  return array.map(fn);
}

const numbers = [1, 2, 3];
const doubled = map(numbers, n => n * 2); // number[]`
      }
    ],
    relatedTopics: ['ts-function-typing', 'ts-generic-functions']
  }
];
