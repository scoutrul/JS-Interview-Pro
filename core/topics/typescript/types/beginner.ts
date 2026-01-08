import { Topic } from '../../../types';

export const TYPESCRIPT_TYPES_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'ts-primitive-types',
    title: 'Примитивные типы',
    description: 'TypeScript поддерживает все примитивные типы JavaScript: number, string, boolean, null, undefined, а также специальные типы void и never. Также поддерживает symbol и bigint из современных стандартов JavaScript.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'primitives', 'basics', 'fundamentals'],
    keyPoints: [
      'number: целые и дробные числа, Infinity, NaN.',
      'string: текстовые строки, шаблонные строки.',
      'boolean: true или false.',
      'null: явное отсутствие значения.',
      'undefined: неинициализированная переменная.',
      'void: отсутствие возвращаемого значения (для функций).',
      'never: тип для значений, которые никогда не произойдут (ошибки, бесконечные циклы).',
      'symbol: уникальные идентификаторы (ES6).',
      'bigint: целые числа произвольной точности (ES2020).'
    ],
    examples: [
      {
        title: 'Базовые примитивные типы',
        code: `let age: number = 25;
let name: string = "John";
let isActive: boolean = true;
let value: null = null;
let notDefined: undefined = undefined;

// void для функций без возвращаемого значения
function logMessage(msg: string): void {
  console.log(msg);
}

// never для функций, которые никогда не завершаются
function throwError(): never {
  throw new Error("Error!");
}`
      },
      {
        title: 'symbol и bigint',
        code: `// symbol - уникальные идентификаторы
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2); // false (всегда уникальны)

// bigint - большие целые числа
const bigNumber: bigint = 9007199254740991n;
const anotherBig = BigInt("9007199254740991");`
      }
    ],
    relatedTopics: ['ts-any-unknown-never', 'ts-union-intersection']
  },
  {
    id: 'ts-arrays-tuples',
    title: 'Массивы и кортежи',
    description: 'Массивы в TypeScript типизируются двумя способами: через синтаксис типа элемента[] или через generic Array<T>. Кортежи (tuples) — это массивы фиксированной длины с известными типами элементов в каждой позиции.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'arrays', 'tuples', 'basics'],
    keyPoints: [
      'Массивы: number[], string[], Array<number> — все элементы одного типа.',
      'Кортежи: [string, number] — фиксированная длина, разные типы в позициях.',
      'Необязательные элементы кортежей: [string, number?] — второй элемент опционален.',
      'Rest элементы в кортежах: [string, ...number[]] — первый string, остальные number.',
      'Readonly массивы: readonly number[] или ReadonlyArray<number> — неизменяемые.'
    ],
    examples: [
      {
        title: 'Типизация массивов',
        code: `// Синтаксис типа элемента[]
let numbers: number[] = [1, 2, 3];
let strings: string[] = ["a", "b", "c"];

// Generic синтаксис
let numbers2: Array<number> = [1, 2, 3];

// Многомерные массивы
let matrix: number[][] = [[1, 2], [3, 4]];`
      },
      {
        title: 'Кортежи (tuples)',
        code: `// Кортеж фиксированной длины
let person: [string, number] = ["John", 30];

// Доступ по индексу с правильным типом
let name: string = person[0]; // ✅ string
let age: number = person[1];  // ✅ number

// Ошибка: неправильный тип
// let wrong: number = person[0]; // ❌

// Необязательные элементы
let optional: [string, number?] = ["John"];
let full: [string, number?] = ["John", 30];`
      },
      {
        title: 'Rest элементы в кортежах',
        code: `// Rest элемент в конце
let scores: [string, ...number[]] = ["John", 95, 87, 92];

// Rest элемент в начале
let coordinates: [...number[], string] = [1, 2, 3, "point"];`
      }
    ],
    relatedTopics: ['ts-primitive-types', 'ts-objects']
  },
  {
    id: 'ts-objects',
    title: 'Объекты и индексы',
    description: 'Объекты в TypeScript типизируются через интерфейсы, типы или inline-объекты. Индексные сигнатуры позволяют описывать объекты с динамическими ключами, когда точная структура неизвестна.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'objects', 'basics'],
    keyPoints: [
      'Inline объекты: { name: string; age: number } — прямое описание структуры.',
      'Индексные сигнатуры: [key: string]: value — динамические ключи одного типа.',
      'Смешанные объекты: известные свойства + индексная сигнатура.',
      'Readonly свойства: readonly name: string — неизменяемые поля.',
      'Опциональные свойства: name?: string — могут отсутствовать.'
    ],
    examples: [
      {
        title: 'Inline объекты',
        code: `// Прямое описание структуры
let user: { name: string; age: number } = {
  name: "John",
  age: 30
};

// Вложенные объекты
let address: {
  street: string;
  city: string;
  zip: number;
} = {
  street: "Main St",
  city: "NYC",
  zip: 10001
};`
      },
      {
        title: 'Индексные сигнатуры',
        code: `// Объект с динамическими строковыми ключами
let dictionary: { [key: string]: string } = {
  "hello": "привет",
  "world": "мир"
};

dictionary["new"] = "новый"; // ✅

// Объект с числовыми ключами
let numericDict: { [key: number]: string } = {
  1: "one",
  2: "two"
};`
      },
      {
        title: 'Смешанные объекты',
        code: `// Известные свойства + индексная сигнатура
interface Config {
  apiUrl: string;           // обязательное свойство
  timeout?: number;          // опциональное
  [key: string]: any;        // остальные свойства любого типа
}

let config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,                // ✅ через индексную сигнатуру
  debug: true                // ✅
};`
      }
    ],
    relatedTopics: ['ts-interfaces-types', 'ts-arrays-tuples']
  },
  {
    id: 'ts-union-intersection',
    title: 'Union и Intersection типы',
    description: 'Union типы (|) позволяют значению быть одним из нескольких типов. Intersection типы (&) комбинируют несколько типов в один, требуя, чтобы значение соответствовало всем типам одновременно.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'union', 'intersection', 'basics'],
    keyPoints: [
      'Union (|): значение может быть одним из типов: string | number.',
      'Intersection (&): значение должно соответствовать всем типам: A & B.',
      'Union narrowing: TypeScript сужает тип при проверках (typeof, instanceof).',
      'Discriminated unions: union с общим полем-дискриминатором для безопасного narrowing.',
      'Практика: union для опциональных значений (string | null), intersection для расширения типов.'
    ],
    examples: [
      {
        title: 'Union типы',
        code: `// Значение может быть string или number
function formatId(id: string | number): string {
  // TypeScript требует проверку типа
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toString();
}

formatId("abc123");  // ✅
formatId(123);       // ✅
// formatId(true);   // ❌ ошибка`
      },
      {
        title: 'Intersection типы',
        code: `// Комбинирование типов
interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

// Intersection: должен иметь оба типа
type Staff = Person & Employee;

let staff: Staff = {
  name: "John",
  employeeId: 123
}; // ✅ имеет и name, и employeeId`
      },
      {
        title: 'Union narrowing',
        code: `function processValue(value: string | number) {
  // После проверки TypeScript знает точный тип
  if (typeof value === "string") {
    // Здесь value - string
    console.log(value.toUpperCase());
  } else {
    // Здесь value - number
    console.log(value.toFixed(2));
  }
}`
      }
    ],
    relatedTopics: ['ts-type-guards', 'ts-primitive-types']
  },
  {
    id: 'ts-literal-types',
    title: 'Литеральные типы',
    description: 'Литеральные типы — это типы, которые принимают только конкретное значение. Строковые литералы позволяют ограничить значение конкретной строкой, числовые — конкретным числом. Часто используются в union типах для создания дискриминированных union.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'literals', 'basics'],
    keyPoints: [
      'Строковые литералы: "success" | "error" — только эти значения.',
      'Числовые литералы: 0 | 1 | 2 — только эти числа.',
      'Boolean литералы: true | false (обычно просто boolean).',
      'Использование: статусы, константы, конфигурации, discriminated unions.',
      'Const assertions: as const превращает значение в литеральный тип.'
    ],
    examples: [
      {
        title: 'Строковые литералы',
        code: `// Только конкретные строки
type Status = "pending" | "success" | "error";

function setStatus(status: Status) {
  console.log(status);
}

setStatus("pending"); // ✅
setStatus("success"); // ✅
// setStatus("unknown"); // ❌ ошибка

// С числовыми литералами
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;`
      },
      {
        title: 'Const assertions',
        code: `// Обычное объявление
const colors = ["red", "green", "blue"];
// Тип: string[]

// С const assertion
const colorsConst = ["red", "green", "blue"] as const;
// Тип: readonly ["red", "green", "blue"]

// Теперь можно использовать как литеральные типы
type Color = typeof colorsConst[number]; // "red" | "green" | "blue"`
      },
      {
        title: 'Практическое использование',
        code: `// API методы
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function request(method: HttpMethod, url: string) {
  // method гарантированно один из этих значений
}

// Состояния загрузки
type LoadingState = "idle" | "loading" | "success" | "error";`
      }
    ],
    relatedTopics: ['ts-union-intersection', 'ts-discriminated-unions']
  },
  {
    id: 'ts-type-assertions',
    title: 'Type Assertions',
    description: 'Type assertions позволяют явно указать TypeScript, какой тип имеет значение, когда TypeScript не может это определить автоматически. Используются с осторожностью, так как обходят проверку типов.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'assertions', 'basics'],
    keyPoints: [
      'Синтаксис as: value as Type — предпочтительный способ.',
      'Синтаксис угловых скобок: <Type>value — не работает в JSX.',
      'Использование: работа с DOM, приведение типов из внешних источников.',
      'Осторожность: assertions не проверяют типы во время выполнения, только компиляцию.',
      'Лучше использовать type guards для безопасной проверки типов.'
    ],
    examples: [
      {
        title: 'Базовое использование',
        code: `// TypeScript не знает тип из DOM
const input = document.getElementById("input");
// Тип: HTMLElement | null

// Assertion к конкретному типу
const inputElement = input as HTMLInputElement;
// Теперь можно использовать .value

inputElement.value = "test"; // ✅

// Альтернативный синтаксис (не в JSX)
const inputElement2 = <HTMLInputElement>input;`
      },
      {
        title: 'Двойное утверждение (осторожно!)',
        code: `// Иногда нужно двойное утверждение
const value: unknown = "hello";

// Сначала в any, потом в нужный тип
const str = value as any as string;

// Лучше использовать type guard
function isString(value: unknown): value is string {
  return typeof value === "string";
}

if (isString(value)) {
  // Здесь value - string, безопасно
}`
      }
    ],
    relatedTopics: ['ts-type-guards', 'ts-any-unknown-never']
  },
  {
    id: 'ts-any-unknown-never',
    title: 'any, unknown, never',
    description: 'any, unknown и never — специальные типы TypeScript. any отключает проверку типов и должен избегаться. unknown — безопасная альтернатива any для значений неизвестного типа. never — тип для значений, которые никогда не произойдут.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'any', 'unknown', 'never', 'basics', 'fundamentals'],
    keyPoints: [
      'any: отключает проверку типов, позволяет любое значение и операции — избегать!',
      'unknown: безопасный any, требует проверки типа перед использованием.',
      'never: тип для значений, которые никогда не произойдут (ошибки, бесконечные циклы).',
      'Практика: использовать unknown вместо any для внешних данных, проверять через type guards.',
      'never используется в exhaustive checks и функциях, которые никогда не возвращают значение.'
    ],
    examples: [
      {
        title: 'any — избегать!',
        code: `// any отключает проверку типов
let value: any = "hello";
value = 42;           // ✅ нет ошибки
value.foo.bar;        // ✅ нет ошибки (но упадет во время выполнения!)
value();              // ✅ нет ошибки (но упадет!)

// Проблемы: теряется безопасность типов`
      },
      {
        title: 'unknown — безопасная альтернатива',
        code: `// unknown требует проверки типа
let value: unknown = "hello";

// ❌ Нельзя использовать без проверки
// value.toUpperCase(); // ошибка!

// ✅ Нужна проверка типа
if (typeof value === "string") {
  value.toUpperCase(); // ✅ теперь безопасно
}

// Полезно для данных извне
function processData(data: unknown) {
  if (typeof data === "object" && data !== null) {
    // Проверка и использование
  }
}`
      },
      {
        title: 'never — значения, которые никогда не произойдут',
        code: `// Функция, которая никогда не возвращает значение
function throwError(message: string): never {
  throw new Error(message);
}

// Бесконечный цикл
function infiniteLoop(): never {
  while (true) {
    // ...
  }
}

// Exhaustive check в switch
type Status = "success" | "error";

function handleStatus(status: Status) {
  switch (status) {
    case "success":
      return "OK";
    case "error":
      return "Failed";
    default:
      // never гарантирует, что все случаи обработаны
      const exhaustive: never = status;
      return exhaustive;
  }
}`
      }
    ],
    relatedTopics: ['ts-type-guards', 'ts-type-assertions', 'ts-strict-null']
  },
  {
    id: 'ts-strict-null',
    title: 'Работа с null и undefined',
    description: 'TypeScript с strictNullChecks требует явной обработки null и undefined. Опциональная цепочка (?.) и оператор объединения с null (??) помогают безопасно работать с потенциально отсутствующими значениями.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'null', 'undefined', 'strict', 'basics', 'fundamentals'],
    keyPoints: [
      'strictNullChecks: включен в strict mode, требует явной обработки null/undefined.',
      'Опциональная цепочка (?.): безопасный доступ к свойствам: obj?.prop?.method?.().',
      'Оператор объединения с null (??): возвращает правый операнд, если левый null/undefined.',
      'Опциональные свойства: name?: string — могут быть undefined.',
      'Union с null: string | null — явное указание возможности null.',
      'Non-null assertion (!): value! — утверждает, что значение не null/undefined (осторожно!).'
    ],
    examples: [
      {
        title: 'strictNullChecks',
        code: `// С strictNullChecks
function greet(name: string | null) {
  // ❌ Ошибка: name может быть null
  // return \`Hello, \${name.toUpperCase()}!\`;

  // ✅ Нужна проверка
  if (name !== null) {
    return \`Hello, \${name.toUpperCase()}!\`;
  }
  return "Hello, Guest!";
}`
      },
      {
        title: 'Опциональная цепочка (?.)',
        code: `interface User {
  address?: {
    street?: string;
    city?: string;
  };
}

const user: User = {};

// Безопасный доступ к вложенным свойствам
const city = user.address?.city; // undefined, не ошибка

// С методами
const result = user.address?.street?.toUpperCase(); // undefined, не ошибка

// С вызовом функций
const callback = user.address?.someMethod?.(); // undefined, если нет метода`
      },
      {
        title: 'Оператор объединения с null (??)',
        code: `// Возвращает правый операнд, если левый null/undefined
const name = null ?? "Guest";        // "Guest"
const age = undefined ?? 0;          // 0
const value = "" ?? "default";       // "" (не "default"!)

// Отличие от || (|| проверяет falsy значения)
const count = 0 || 10;               // 10 (0 - falsy)
const count2 = 0 ?? 10;              // 0 (0 - не null/undefined)

// Практическое использование
function getConfig() {
  return {
    timeout: userConfig.timeout ?? 5000,
    retries: userConfig.retries ?? 3
  };
}`
      },
      {
        title: 'Non-null assertion (!)',
        code: `// Утверждение, что значение не null/undefined
const input = document.getElementById("input")!;
// Тип: HTMLInputElement (не HTMLElement | null)

input.value = "test"; // ✅

// Осторожно: если значение null, будет ошибка во время выполнения!
// Используйте только когда уверены`
      }
    ],
    relatedTopics: ['ts-any-unknown-never', 'ts-type-guards']
  }
];
