import { Topic } from '../../../types';

export const TYPESCRIPT_UTILITY_TYPES_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'ts-parameters-returntype',
    title: 'Parameters и ReturnType',
    description: 'Parameters<T> извлекает типы параметров функции T в виде кортежа. ReturnType<T> извлекает тип возвращаемого значения функции T. Используют infer для извлечения типов из сигнатуры функции.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['typescript', 'utility-types', 'parameters', 'returntype', 'infer', 'intermediate', 'fundamentals'],
    keyPoints: [
      'Parameters<T>: извлекает типы параметров функции как кортеж.',
      'ReturnType<T>: извлекает тип возвращаемого значения функции.',
      'Используют infer: ключевое слово для извлечения типов из условных типов.',
      'Практика: создание производных типов из функций, типизация колбэков.',
      'Проверка понимания: часто спрашивают на собеседованиях, как работают эти utility types.'
    ],
    examples: [
      {
        title: 'ReturnType',
        code: `function getUser(id: string): { name: string; age: number } {
  return { name: "John", age: 30 };
}

// Извлечь тип возвращаемого значения
type User = ReturnType<typeof getUser>;
// { name: string; age: number }

// Использование
const user: User = { name: "Jane", age: 25 };`
      },
      {
        title: 'Parameters',
        code: `function createUser(name: string, age: number, email: string): User {
  return { name, age, email };
}

// Извлечь типы параметров
type CreateUserParams = Parameters<typeof createUser>;
// [string, number, string]

// Использование для типизации колбэка
function callWithParams(
  fn: (...args: Parameters<typeof createUser>) => void,
  ...args: Parameters<typeof createUser>
) {
  fn(...args);
}`
      },
      {
        title: 'Практический пример',
        code: `// Типизация обработчика события на основе функции
function handleSubmit(data: { name: string; email: string }) {
  // ...
}

type SubmitHandler = (data: Parameters<typeof handleSubmit>[0]) => void;
type SubmitResult = ReturnType<typeof handleSubmit>;`
      }
    ],
    relatedTopics: ['ts-infer-keyword', 'ts-conditional-types']
  },
  {
    id: 'ts-this-parameter-types',
    title: 'ThisParameterType и OmitThisParameter',
    description: 'ThisParameterType<T> извлекает тип параметра this из функции. OmitThisParameter<T> создает тип функции без параметра this. Полезны для работы с функциями, которые используют this контекст.',
    difficulty: 'intermediate',
    tags: ['typescript', 'utility-types', 'this', 'intermediate'],
    keyPoints: [
      'ThisParameterType<T>: извлекает тип this из функции.',
      'OmitThisParameter<T>: удаляет this параметр из типа функции.',
      'Практика: работа с методами классов, типизация контекста.',
      'Использование: редко, но полезно для продвинутой типизации.'
    ],
    examples: [
      {
        title: 'ThisParameterType',
        code: `class User {
  name: string;
  
  getName(this: User): string {
    return this.name;
  }
}

// Извлечь тип this
type UserThis = ThisParameterType<typeof User.prototype.getName>;
// User`
      },
      {
        title: 'OmitThisParameter',
        code: `// Удалить this параметр
type GetNameWithoutThis = OmitThisParameter<typeof User.prototype.getName>;
// () => string

// Теперь можно вызвать без контекста
const getName: GetNameWithoutThis = () => "test";`
      }
    ],
    relatedTopics: ['ts-parameters-returntype', 'ts-functions-this']
  },
  {
    id: 'ts-nonnullable',
    title: 'NonNullable',
    description: 'NonNullable<T> исключает null и undefined из типа T. Создает тип, который гарантированно не содержит null или undefined значений.',
    difficulty: 'intermediate',
    tags: ['typescript', 'utility-types', 'nonnullable', 'intermediate'],
    keyPoints: [
      'NonNullable<T>: удаляет null и undefined из типа T.',
      'Работа с union: полезен для очистки union типов от null/undefined.',
      'Практика: гарантирование наличия значения, работа с опциональными типами.'
    ],
    examples: [
      {
        title: 'Базовое использование',
        code: `type MaybeString = string | null | undefined;

// Исключить null и undefined
type StringOnly = NonNullable<MaybeString>;
// string

// Практическое использование
function processValue(value: string | null | undefined) {
  if (value !== null && value !== undefined) {
    // После проверки TypeScript знает, что value - string
    const safe: NonNullable<typeof value> = value;
    safe.toUpperCase(); // ✅
  }
}`
      }
    ],
    relatedTopics: ['ts-exclude-extract', 'ts-strict-null']
  }
];
