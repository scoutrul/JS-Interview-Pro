import { Topic } from '../../../types';

export const TYPESCRIPT_GENERICS_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'ts-generics-multiple',
    title: 'Multiple Type Parameters',
    description: 'Дженерики могут иметь несколько параметров типа, разделенных запятыми. Позволяют создавать функции и типы, которые работают с несколькими независимыми типами одновременно.',
    difficulty: 'intermediate',
    tags: ['typescript', 'generics', 'multiple-parameters', 'intermediate'],
    keyPoints: [
      'Синтаксис: <T, U, V> — несколько параметров типа.',
      'Независимость: каждый параметр типа независим от других.',
      'Constraints: каждый параметр может иметь свои constraints.',
      'Практика: функции с несколькими типами, маппинг типов, комбинирование типов.'
    ],
    examples: [
      {
        title: 'Базовое использование',
        code: `// Функция с двумя параметрами типа
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair("hello", 42); // [string, number]
const result2 = pair(true, { name: "John" }); // [boolean, { name: string }]`
      },
      {
        title: 'С constraints',
        code: `// Каждый параметр со своим constraint
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge(
  { name: "John" },
  { age: 30 }
); // { name: string } & { age: number }`
      }
    ],
    relatedTopics: ['ts-generics-basics', 'ts-utility-types']
  },
  {
    id: 'ts-generics-keyof',
    title: 'Generic Constraints с keyof',
    description: 'Комбинирование дженериков с keyof позволяет создавать функции, которые работают с ключами объектов. Классический паттерн для безопасного доступа к свойствам объектов с проверкой типов.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['typescript', 'generics', 'keyof', 'constraints', 'intermediate'],
    keyPoints: [
      'keyof T: получает union всех ключей типа T.',
      'K extends keyof T: K должен быть одним из ключей T.',
      'T[K]: indexed access type — тип значения свойства K в T.',
      'Практика: безопасный доступ к свойствам, создание utility функций.'
    ],
    examples: [
      {
        title: 'Базовый паттерн',
        code: `// Классический пример
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = { name: "John", age: 30, email: "john@example.com" };

const name = getProperty(user, "name");  // string
const age = getProperty(user, "age");    // number
// const invalid = getProperty(user, "invalid"); // ❌ ошибка`
      },
      {
        title: 'Установка свойства',
        code: `function setProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): void {
  obj[key] = value;
}

setProperty(user, "name", "Jane"); // ✅
setProperty(user, "age", 25);      // ✅
// setProperty(user, "name", 123); // ❌ ошибка: неверный тип`
      }
    ],
    relatedTopics: ['ts-generics-constraints', 'ts-keyof-operator', 'ts-indexed-access']
  }
];
