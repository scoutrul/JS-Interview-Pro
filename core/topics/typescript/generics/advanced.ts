import { Topic } from '../../../types';

export const TYPESCRIPT_GENERICS_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'ts-generics-higher-order',
    title: 'Higher-order Generics',
    description: 'Higher-order generics — это дженерики, которые принимают другие дженерики как параметры. Позволяют создавать сложные трансформации типов и композицию generic типов.',
    difficulty: 'advanced',
    tags: ['typescript', 'generics', 'higher-order', 'advanced'],
    keyPoints: [
      'Параметр типа как generic: <T extends SomeGeneric<U>>.',
      'Композиция: создание сложных типов из простых generic типов.',
      'Практика: продвинутые utility types, трансформации типов.',
      'Сложность: требуют глубокого понимания системы типов.'
    ],
    examples: [
      {
        title: 'Базовый пример',
        code: `// Generic, который принимает другой generic
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type StringPromise = Promise<string>;
type Unwrapped = UnwrapPromise<StringPromise>; // string`
      }
    ],
    relatedTopics: ['ts-conditional-types', 'ts-infer-keyword']
  }
];
