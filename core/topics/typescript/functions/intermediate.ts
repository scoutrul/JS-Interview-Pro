import { Topic } from '../../../types';

export const TYPESCRIPT_FUNCTIONS_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'ts-generic-functions',
    title: 'Generic Functions',
    description: 'Функции могут быть generic, принимая параметры типа. Позволяет создавать переиспользуемые функции, которые работают с разными типами, сохраняя типобезопасность.',
    difficulty: 'intermediate',
    tags: ['typescript', 'functions', 'generics', 'intermediate'],
    keyPoints: [
      'Синтаксис: function name<T>(param: T): T.',
      'Вывод типов: TypeScript автоматически определяет тип из аргументов.',
      'Constraints: можно ограничить параметр типа через extends.',
      'Практика: создание переиспользуемых утилит, работа с коллекциями.'
    ],
    examples: [
      {
        title: 'Базовый generic function',
        code: `function identity<T>(value: T): T {
  return value;
}

const str = identity("hello");  // string
const num = identity(42);        // number`
      }
    ],
    relatedTopics: ['ts-function-typing', 'ts-generics-basics']
  }
];
