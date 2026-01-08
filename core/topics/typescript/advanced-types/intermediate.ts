import { Topic } from '../../../types';

export const TYPESCRIPT_ADVANCED_TYPES_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'ts-conditional-types',
    title: 'Conditional Types',
    description: 'Conditional types позволяют выбирать тип на основе условия. Синтаксис T extends U ? X : Y означает: если T можно присвоить U, то тип X, иначе Y. Основа для многих utility types и продвинутых паттернов.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'conditional', 'intermediate', 'fundamentals'],
    keyPoints: [
      'Синтаксис: T extends U ? X : Y — условный выбор типа.',
      'Практика: создание utility types, обработка разных случаев.',
      'Классические примеры: Exclude, Extract, NonNullable используют conditional types.',
      'Distributive: conditional types распределяются по union типам.',
      'Infer: ключевое слово для извлечения типов в conditional types.'
    ],
    examples: [
      {
        title: 'Базовый conditional type',
        code: `// Проверка, является ли тип массивом
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<number[]>;  // true
type B = IsArray<string>;    // false

// Упрощенная версия Exclude
type MyExclude<T, U> = T extends U ? never : T;

type Result = MyExclude<"a" | "b" | "c", "a">;
// "b" | "c"`
      },
      {
        title: 'Практический пример',
        code: `// Обработка разных типов
type ApiResponse<T> = T extends string
  ? { message: T }
  : T extends number
  ? { code: T }
  : { data: T };

type StringResponse = ApiResponse<string>;   // { message: string }
type NumberResponse = ApiResponse<number>;   // { code: number }
type ObjectResponse = ApiResponse<User>;     // { data: User }`
      }
    ],
    relatedTopics: ['ts-infer-keyword', 'ts-mapped-types']
  },
  {
    id: 'ts-infer-keyword',
    title: 'Infer Keyword',
    description: 'infer позволяет извлекать тип из другого типа в conditional types. Используется для "распаковки" типов из generic типов, что критично для utility types типа ReturnType и Parameters.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'infer', 'intermediate', 'fundamentals'],
    keyPoints: [
      'Синтаксис: T extends (...args: infer P) => infer R ? P : never.',
      'Извлечение: infer создает новый тип-переменную в conditional type.',
      'Практика: ReturnType, Parameters, Awaited используют infer.',
      'Проверка понимания: часто спрашивают на собеседованиях, как работает ReturnType.'
    ],
    examples: [
      {
        title: 'Извлечение типа возвращаемого значения',
        code: `// Упрощенная версия ReturnType
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser(): { name: string } {
  return { name: "John" };
}

type User = MyReturnType<typeof getUser>;
// { name: string }`
      },
      {
        title: 'Извлечение типов параметров',
        code: `// Упрощенная версия Parameters
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

function createUser(name: string, age: number) {
  return { name, age };
}

type Params = MyParameters<typeof createUser>;
// [string, number]`
      },
      {
        title: 'Извлечение из Promise',
        code: `// Упрощенная версия Awaited
type MyAwaited<T> = T extends Promise<infer U> ? U : T;

type StringPromise = Promise<string>;
type Unwrapped = MyAwaited<StringPromise>; // string`
      }
    ],
    relatedTopics: ['ts-conditional-types', 'ts-parameters-returntype']
  },
  {
    id: 'ts-mapped-types',
    title: 'Mapped Types',
    description: 'Mapped types позволяют создавать новые типы путем итерации по ключам существующего типа. Синтаксис [K in keyof T] создает новый тип, трансформируя каждый ключ и значение исходного типа.',
    difficulty: 'intermediate',
    tags: ['typescript', 'types', 'mapped-types', 'intermediate'],
    keyPoints: [
      'Синтаксис: { [K in keyof T]: NewType } — итерация по ключам T.',
      'Трансформация: можно изменять тип значений для каждого ключа.',
      'Практика: Readonly, Partial, Required используют mapped types.',
      'Фильтрация: можно комбинировать с conditional types для фильтрации ключей.'
    ],
    examples: [
      {
        title: 'Базовый mapped type',
        code: `// Упрощенная версия Readonly
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

interface User {
  name: string;
  age: number;
}

type ReadonlyUser = MyReadonly<User>;
// { readonly name: string; readonly age: number; }`
      },
      {
        title: 'Трансформация значений',
        code: `// Сделать все свойства опциональными
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// Сделать все свойства обязательными
type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};`
      }
    ],
    relatedTopics: ['ts-conditional-types', 'ts-utility-types']
  }
];
