import { Topic } from '../../../types';

export const TYPESCRIPT_ADVANCED_TYPES_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'ts-keyof-operator',
    title: 'Keyof Operator',
    description: 'keyof оператор получает union всех ключей объекта. Позволяет создавать типы, основанные на ключах существующих типов, что критично для понимания utility types и безопасного доступа к свойствам.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'keyof', 'basics', 'fundamentals'],
    keyPoints: [
      'keyof T: получает union всех ключей типа T.',
      'Практика: создание типов на основе ключей, безопасный доступ к свойствам.',
      'Критично для utility types: Pick, Omit, Record используют keyof.',
      'Строковые ключи: keyof работает со строковыми ключами объектов.'
    ],
    examples: [
      {
        title: 'Базовое использование',
        code: `interface User {
  name: string;
  age: number;
  email: string;
}

// Получить union всех ключей
type UserKeys = keyof User;
// "name" | "age" | "email"

// Использование
function getProperty(obj: User, key: UserKeys): User[UserKeys] {
  return obj[key];
}`
      },
      {
        title: 'С дженериками',
        code: `// Классический паттерн
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { name: "John", age: 30, email: "john@example.com" };
const name = getValue(user, "name"); // string
const age = getValue(user, "age");  // number`
      }
    ],
    relatedTopics: ['ts-indexed-access', 'ts-generics-keyof']
  },
  {
    id: 'ts-indexed-access',
    title: 'Indexed Access Types',
    description: 'Indexed access types (T[K]) позволяют получить тип значения свойства K из типа T. Полезны для извлечения типов из объектов и создания производных типов на основе существующих.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'indexed-access', 'basics', 'fundamentals'],
    keyPoints: [
      'Синтаксис: T[K] — тип значения свойства K в типе T.',
      'K должен быть keyof T: ключ должен существовать в типе T.',
      'Практика: извлечение типов свойств, создание производных типов.',
      'Вложенный доступ: T[K][M] — доступ к вложенным свойствам.'
    ],
    examples: [
      {
        title: 'Базовое использование',
        code: `interface User {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
}

// Извлечь тип свойства
type UserName = User["name"];        // string
type UserAge = User["age"];         // number
type UserAddress = User["address"]; // { street: string; city: string; }

// Вложенный доступ
type Street = User["address"]["street"]; // string`
      },
      {
        title: 'С union ключей',
        code: `// Извлечь тип для нескольких ключей
type NameOrAge = User["name" | "age"];
// string | number

// Все значения
type AllValues = User[keyof User];
// string | number | { street: string; city: string; }`
      }
    ],
    relatedTopics: ['ts-keyof-operator', 'ts-typeof-operator']
  },
  {
    id: 'ts-typeof-operator',
    title: 'Typeof на уровне типов',
    description: 'typeof на уровне типов позволяет получить тип значения переменной. Полезен для создания типов на основе существующих значений и избежания дублирования определений типов.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'typeof', 'basics', 'fundamentals'],
    keyPoints: [
      'typeof value: получает тип значения переменной.',
      'Практика: создание типов из констант, извлечение типов из функций.',
      'Отличие от JavaScript: typeof в TypeScript работает на уровне типов.',
      'Комбинирование: можно комбинировать с keyof, indexed access.'
    ],
    examples: [
      {
        title: 'Базовое использование',
        code: `const user = {
  name: "John",
  age: 30,
  email: "john@example.com"
};

// Получить тип значения
type User = typeof user;
// { name: string; age: number; email: string; }

// Использование
const anotherUser: User = {
  name: "Jane",
  age: 25,
  email: "jane@example.com"
};`
      },
      {
        title: 'С функциями',
        code: `function createUser(name: string, age: number) {
  return { name, age };
}

// Получить тип возвращаемого значения
type User = ReturnType<typeof createUser>;
// { name: string; age: number; }

// Получить тип параметров
type Params = Parameters<typeof createUser>;
// [string, number]`
      },
      {
        title: 'С константами',
        code: `const STATUSES = ["pending", "success", "error"] as const;

// Получить тип массива
type Statuses = typeof STATUSES;
// readonly ["pending", "success", "error"]

// Извлечь union тип
type Status = typeof STATUSES[number];
// "pending" | "success" | "error"`
      }
    ],
    relatedTopics: ['ts-keyof-operator', 'ts-indexed-access']
  }
];
