import { Topic } from '../../../types';

export const TYPESCRIPT_UTILITY_TYPES_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'ts-partial-required',
    title: 'Partial и Required',
    description: 'Partial<T> делает все свойства типа T опциональными. Required<T> делает все свойства типа T обязательными. Полезны для работы с частичными объектами и обязательными конфигурациями.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'utility-types', 'partial', 'required', 'basics', 'fundamentals'],
    keyPoints: [
      'Partial<T>: все свойства становятся опциональными (property?: Type).',
      'Required<T>: все свойства становятся обязательными (property: Type).',
      'Практика: Partial для обновлений, Required для валидации.',
      'Поверхностное: работает только на первом уровне, не затрагивает вложенные объекты.'
    ],
    examples: [
      {
        title: 'Partial',
        code: `interface User {
  name: string;
  age: number;
  email: string;
}

// Все свойства опциональны
type PartialUser = Partial<User>;
// { name?: string; age?: number; email?: string; }

function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

const user: User = { name: "John", age: 30, email: "john@example.com" };
updateUser(user, { age: 31 }); // ✅ Можно обновить только age`
      },
      {
        title: 'Required',
        code: `interface Config {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}

// Все свойства обязательны
type RequiredConfig = Required<Config>;
// { apiUrl: string; timeout: number; retries: number; }

function validateConfig(config: RequiredConfig) {
  // Все свойства гарантированно присутствуют
}`
      }
    ],
    relatedTopics: ['ts-pick-omit', 'ts-readonly-utility']
  },
  {
    id: 'ts-pick-omit',
    title: 'Pick и Omit',
    description: 'Pick<T, K> выбирает указанные свойства K из типа T. Omit<T, K> исключает указанные свойства K из типа T. Полезны для создания производных типов из существующих.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'utility-types', 'pick', 'omit', 'basics', 'fundamentals'],
    keyPoints: [
      'Pick<T, K>: выбирает свойства K из T, K должно быть keyof T.',
      'Omit<T, K>: исключает свойства K из T, создает тип без этих свойств.',
      'Практика: создание типов для форм, API запросов, производных интерфейсов.',
      'Комбинирование: можно комбинировать с другими utility types.'
    ],
    examples: [
      {
        title: 'Pick',
        code: `interface User {
  name: string;
  age: number;
  email: string;
  password: string;
}

// Выбрать только name и age
type UserProfile = Pick<User, "name" | "age">;
// { name: string; age: number; }

const profile: UserProfile = {
  name: "John",
  age: 30
  // email и password не нужны
};`
      },
      {
        title: 'Omit',
        code: `// Исключить password из User
type PublicUser = Omit<User, "password">;
// { name: string; age: number; email: string; }

// Исключить несколько свойств
type UserWithoutSensitive = Omit<User, "password" | "email">;
// { name: string; age: number; }`
      },
      {
        title: 'Практический пример',
        code: `// Создание типа для формы регистрации
type RegistrationForm = Pick<User, "name" | "email" | "password">;

// Создание типа для публичного профиля
type PublicProfile = Omit<User, "password">;

// Комбинирование
type EditableProfile = Pick<User, "name" | "age">;`
      }
    ],
    relatedTopics: ['ts-partial-required', 'ts-record-utility']
  },
  {
    id: 'ts-record-utility',
    title: 'Record',
    description: 'Record<K, V> создает объектный тип с ключами типа K и значениями типа V. Эквивалентен { [key in K]: V }. Полезен для создания словарей и маппингов с типизированными ключами и значениями.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'utility-types', 'record', 'basics', 'fundamentals'],
    keyPoints: [
      'Синтаксис: Record<K, V> — объект с ключами K и значениями V.',
      'K должен быть union типом или keyof чего-то.',
      'Практика: словари, конфигурации, маппинги.',
      'Альтернатива: { [key in K]: V } — эквивалентный синтаксис.'
    ],
    examples: [
      {
        title: 'Базовое использование',
        code: `// Словарь с строковыми ключами и числовыми значениями
type Scores = Record<string, number>;

const scores: Scores = {
  "math": 95,
  "english": 87,
  "science": 92
};

// С литеральными типами ключей
type Status = "pending" | "success" | "error";
type StatusMessages = Record<Status, string>;

const messages: StatusMessages = {
  pending: "Processing...",
  success: "Completed",
  error: "Failed"
  // Должны быть все три ключа
};`
      },
      {
        title: 'Практический пример',
        code: `// Маппинг кодов ошибок
type ErrorCode = 400 | 401 | 404 | 500;
type ErrorMessages = Record<ErrorCode, string>;

const errorMessages: ErrorMessages = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  500: "Internal Server Error"
};`
      }
    ],
    relatedTopics: ['ts-pick-omit', 'ts-exclude-extract']
  },
  {
    id: 'ts-exclude-extract',
    title: 'Exclude и Extract',
    description: 'Exclude<T, U> исключает из типа T все типы, которые можно присвоить U. Extract<T, U> извлекает из типа T только те типы, которые можно присвоить U. Работают с union типами.',
    difficulty: 'beginner',
    tags: ['typescript', 'utility-types', 'exclude', 'extract', 'basics'],
    keyPoints: [
      'Exclude<T, U>: удаляет из T все типы, совместимые с U.',
      'Extract<T, U>: оставляет в T только типы, совместимые с U.',
      'Работа с union: полезны для фильтрации union типов.',
      'Практика: создание производных типов, исключение определенных значений.'
    ],
    examples: [
      {
        title: 'Exclude',
        code: `type Status = "pending" | "success" | "error" | "loading";

// Исключить "loading"
type FinalStatus = Exclude<Status, "loading">;
// "pending" | "success" | "error"

// Исключить несколько значений
type NonErrorStatus = Exclude<Status, "error" | "loading">;
// "pending" | "success"`
      },
      {
        title: 'Extract',
        code: `// Извлечь только строковые типы
type Mixed = string | number | boolean | string[];

type StringsOnly = Extract<Mixed, string>;
// string

// Извлечь только массивы
type ArraysOnly = Extract<Mixed, any[]>;
// string[]`
      }
    ],
    relatedTopics: ['ts-pick-omit', 'ts-nonnullable']
  }
];
