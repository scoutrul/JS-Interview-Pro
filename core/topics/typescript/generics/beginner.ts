import { Topic } from '../../../types';

export const TYPESCRIPT_GENERICS_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'ts-generics-basics',
    title: 'Базовые дженерики',
    description: 'Дженерики позволяют создавать переиспользуемые компоненты, которые работают с разными типами. Параметр типа указывается в угловых скобках <T> и может использоваться вместо конкретного типа в определении функции, класса или интерфейса.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'generics', 'basics', 'fundamentals'],
    keyPoints: [
      'Синтаксис: function name<T>(arg: T): T — параметр типа в угловых скобках.',
      'Классический пример: identity<T> — функция, возвращающая значение того же типа.',
      'Вывод типов: TypeScript автоматически определяет тип из аргумента.',
      'Явное указание: можно явно указать тип: identity<string>("hello").',
      'Практика: создание переиспользуемых функций, классов, интерфейсов.'
    ],
    examples: [
      {
        title: 'Классический пример: identity',
        code: `// Функция identity - классический пример дженериков
function identity<T>(arg: T): T {
  return arg;
}

// TypeScript автоматически определяет тип
const str = identity("hello");     // string
const num = identity(42);          // number
const bool = identity(true);      // boolean

// Можно явно указать тип
const explicit = identity<string>("hello"); // string`
      },
      {
        title: 'Массивы с дженериками',
        code: `// Функция для получения первого элемента
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const numbers = getFirst([1, 2, 3]);        // number | undefined
const strings = getFirst(["a", "b", "c"]); // string | undefined
const users = getFirst([{ name: "John" }]); // { name: string } | undefined`
      },
      {
        title: 'Дженерики в классах',
        code: `// Класс-контейнер с дженериком
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberBox = new Box<number>(42);
const stringBox = new Box<string>("hello");`
      },
      {
        title: 'Дженерики в интерфейсах',
        code: `// Интерфейс с дженериком
interface Repository<T> {
  findById(id: string): T | undefined;
  save(entity: T): void;
  findAll(): T[];
}

// Использование с разными типами
const userRepo: Repository<User> = { /* ... */ };
const productRepo: Repository<Product> = { /* ... */ };`
      }
    ],
    relatedTopics: ['ts-generics-constraints', 'ts-generics-multiple']
  },
  {
    id: 'ts-generics-constraints',
    title: 'Constraints (extends)',
    description: 'Constraints ограничивают допустимые типы для дженериков через ключевое слово extends. Позволяют указать, что параметр типа должен быть подтипом определенного типа, что дает доступ к свойствам и методам базового типа.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'generics', 'constraints', 'basics', 'fundamentals'],
    keyPoints: [
      'Синтаксис: <T extends BaseType> — T должен быть подтипом BaseType.',
      'Классический пример: function getValue<T, K extends keyof T> — доступ к свойству объекта.',
      'Доступ к свойствам: после extends можно использовать свойства базового типа.',
      'Множественные constraints: <T extends A & B> — T должен соответствовать обоим типам.',
      'Практика: ограничение типов для безопасного доступа к свойствам и методам.'
    ],
    examples: [
      {
        title: 'Базовый constraint',
        code: `// T должен иметь свойство length
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // ✅ Доступ к length
  return arg;
}

logLength("hello");     // ✅ string имеет length
logLength([1, 2, 3]);  // ✅ array имеет length
// logLength(42);      // ❌ number не имеет length`
      },
      {
        title: 'Классический пример: getValue',
        code: `// Классический пример собеседований
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = { name: "John", age: 30, email: "john@example.com" };

const name = getValue(user, "name");  // string
const age = getValue(user, "age");    // number
// const invalid = getValue(user, "invalid"); // ❌ ошибка: такого ключа нет`
      },
      {
        title: 'Множественные constraints',
        code: `interface Named {
  name: string;
}

interface Aged {
  age: number;
}

// T должен соответствовать обоим типам
function processPerson<T extends Named & Aged>(person: T): void {
  console.log(person.name, person.age); // ✅ Доступ к обоим свойствам
}

const person = { name: "John", age: 30, email: "john@example.com" };
processPerson(person); // ✅`
      }
    ],
    relatedTopics: ['ts-generics-basics', 'ts-keyof-operator']
  },
  {
    id: 'ts-generics-default',
    title: 'Default Type Parameters',
    description: 'Default type parameters позволяют указать значение по умолчанию для параметра типа, если он не указан явно. Полезны для создания более удобных API с разумными значениями по умолчанию.',
    difficulty: 'beginner',
    tags: ['typescript', 'generics', 'default-parameters', 'basics'],
    keyPoints: [
      'Синтаксис: <T = DefaultType> — значение по умолчанию для параметра типа.',
      'Использование: если тип не указан, используется значение по умолчанию.',
      'Практика: упрощение API, разумные значения по умолчанию.',
      'Комбинирование: можно использовать с constraints: <T extends Base = Default>.'
    ],
    examples: [
      {
        title: 'Базовое использование',
        code: `// Параметр типа по умолчанию
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

// Используется string по умолчанию
const strings = createArray(3, "hello"); // string[]

// Можно указать другой тип
const numbers = createArray<number>(3, 42); // number[]`
      },
      {
        title: 'С constraints',
        code: `// Constraint + значение по умолчанию
interface DefaultConfig {
  timeout: number;
}

function createConfig<T extends DefaultConfig = DefaultConfig>(
  config: Partial<T>
): T {
  return { timeout: 5000, ...config } as T;
}

// Используется DefaultConfig по умолчанию
const config1 = createConfig({ timeout: 3000 });

// Можно указать расширенный тип
interface ExtendedConfig extends DefaultConfig {
  retries: number;
}
const config2 = createConfig<ExtendedConfig>({ timeout: 3000, retries: 3 });`
      }
    ],
    relatedTopics: ['ts-generics-basics', 'ts-generics-constraints']
  }
];
