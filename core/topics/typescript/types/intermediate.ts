import { Topic } from '../../../types';

export const TYPESCRIPT_TYPES_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'ts-type-guards',
    title: 'Type Guards и Narrowing',
    description: 'Type guards — это функции или проверки, которые сужают тип значения в определенной области кода. TypeScript использует narrowing для определения более точного типа после проверок typeof, instanceof, in или пользовательских type guards.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'type-guards', 'narrowing', 'intermediate', 'fundamentals'],
    keyPoints: [
      'typeof: проверка примитивных типов (string, number, boolean, undefined, object, function).',
      'instanceof: проверка экземпляров классов (Array, Date, Error и т.д.).',
      'in: проверка наличия свойства в объекте.',
      'Пользовательские type guards: функции с предикатом типа (value is Type).',
      'Narrowing: TypeScript автоматически сужает тип после проверок в if/switch.',
      'Discriminated unions: union типы с общим полем для безопасного narrowing.'
    ],
    examples: [
      {
        title: 'typeof guards',
        code: `function processValue(value: string | number) {
  if (typeof value === "string") {
    // Здесь value - string
    console.log(value.toUpperCase());
  } else {
    // Здесь value - number
    console.log(value.toFixed(2));
  }
}

// typeof возвращает: "string" | "number" | "boolean" | "undefined" | "object" | "function" | "symbol" | "bigint"`
      },
      {
        title: 'instanceof guards',
        code: `function processError(error: Error | string) {
  if (error instanceof Error) {
    // Здесь error - Error
    console.log(error.message);
    console.log(error.stack);
  } else {
    // Здесь error - string
    console.log(error);
  }
}

// Работает с классами
class CustomError extends Error {}
const err = new CustomError();
if (err instanceof CustomError) {
  // Тип: CustomError
}`
      },
      {
        title: 'in operator',
        code: `interface Dog {
  bark(): void;
}

interface Cat {
  meow(): void;
}

function makeSound(animal: Dog | Cat) {
  if ("bark" in animal) {
    // Здесь animal - Dog
    animal.bark();
  } else {
    // Здесь animal - Cat
    animal.meow();
  }
}`
      },
      {
        title: 'Пользовательские type guards',
        code: `// Функция с type predicate
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

function process(value: unknown) {
  if (isString(value)) {
    // TypeScript знает, что value - string
    value.toUpperCase(); // ✅
  } else if (isNumber(value)) {
    // TypeScript знает, что value - number
    value.toFixed(2); // ✅
  }
}`
      },
      {
        title: 'Narrowing в разных контекстах',
        code: `function example(value: string | number | null) {
  // Проверка на null
  if (value === null) {
    return; // value здесь - null
  }

  // После проверки value - string | number
  if (typeof value === "string") {
    // value - string
  } else {
    // value - number
  }

  // В switch тоже работает narrowing
  switch (typeof value) {
    case "string":
      // value - string
      break;
    case "number":
      // value - number
      break;
  }
}`
      }
    ],
    relatedTopics: ['ts-discriminated-unions', 'ts-type-predicates', 'ts-strict-null']
  },
  {
    id: 'ts-discriminated-unions',
    title: 'Discriminated Unions',
    description: 'Discriminated unions — это union типы с общим полем-дискриминатором, которое позволяет TypeScript безопасно сужать тип. Каждый вариант union имеет уникальное значение дискриминатора, что делает narrowing надежным и понятным.',
    difficulty: 'intermediate',
    tags: ['typescript', 'types', 'discriminated-unions', 'narrowing', 'intermediate'],
    keyPoints: [
      'Общее поле: все варианты union имеют одно поле с литеральным типом (kind, type, status).',
      'Уникальные значения: каждое значение дискриминатора соответствует одному варианту union.',
      'Безопасный narrowing: TypeScript автоматически сужает тип по значению дискриминатора.',
      'Практика: состояния загрузки, результаты операций, варианты конфигураций.',
      'Exhaustive checks: можно проверить, что все варианты обработаны.'
    ],
    examples: [
      {
        title: 'Базовый discriminated union',
        code: `// Каждый вариант имеет поле type с уникальным значением
type Result =
  | { type: "success"; data: string }
  | { type: "error"; message: string }
  | { type: "loading" };

function handleResult(result: Result) {
  // TypeScript автоматически сужает тип по полю type
  switch (result.type) {
    case "success":
      // result - { type: "success"; data: string }
      console.log(result.data);
      break;
    case "error":
      // result - { type: "error"; message: string }
      console.error(result.message);
      break;
    case "loading":
      // result - { type: "loading" }
      console.log("Loading...");
      break;
  }
}`
      },
      {
        title: 'Exhaustive check',
        code: `type Status = "idle" | "loading" | "success" | "error";

function handleStatus(status: Status) {
  switch (status) {
    case "idle":
      return "Ready";
    case "loading":
      return "Loading...";
    case "success":
      return "Done";
    case "error":
      return "Failed";
    default:
      // never гарантирует, что все варианты обработаны
      const exhaustive: never = status;
      return exhaustive;
  }
}

// Если добавить новый вариант в Status, TypeScript покажет ошибку`
      },
      {
        title: 'Практический пример: API ответы',
        code: `type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string }
  | { status: "loading" };

function processResponse<T>(response: ApiResponse<T>) {
  if (response.status === "success") {
    // response.data доступен, тип T
    return response.data;
  } else if (response.status === "error") {
    // response.error доступен
    throw new Error(response.error);
  } else {
    // response.status === "loading"
    return null;
  }
}`
      }
    ],
    relatedTopics: ['ts-type-guards', 'ts-literal-types', 'ts-union-intersection']
  },
  {
    id: 'ts-type-predicates',
    title: 'Type Predicates',
    description: 'Type predicates — это специальные функции, которые возвращают предикат типа (value is Type). Они используются как пользовательские type guards и позволяют TypeScript сужать тип значения после проверки функции.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['typescript', 'types', 'type-predicates', 'type-guards', 'intermediate'],
    keyPoints: [
      'Синтаксис: function isType(value: unknown): value is Type.',
      'Возвращает boolean, но TypeScript понимает предикат типа.',
      'Использование: проверка сложных структур данных, валидация входящих данных.',
      'Комбинирование: можно создавать сложные предикаты для объектов и массивов.',
      'Практика: проверка API ответов, валидация форм, работа с внешними данными.'
    ],
    examples: [
      {
        title: 'Базовый type predicate',
        code: `// Функция возвращает boolean, но TypeScript понимает предикат
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    // TypeScript знает, что value - string
    value.toUpperCase(); // ✅
    value.length;        // ✅
  }
}`
      },
      {
        title: 'Проверка объектов',
        code: `interface User {
  name: string;
  age: number;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "age" in value &&
    typeof (value as any).name === "string" &&
    typeof (value as any).age === "number"
  );
}

function processUser(data: unknown) {
  if (isUser(data)) {
    // data - User
    console.log(data.name, data.age); // ✅
  }
}`
      },
      {
        title: 'Проверка массивов',
        code: `function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(item => typeof item === "string")
  );
}

function processStrings(data: unknown) {
  if (isStringArray(data)) {
    // data - string[]
    data.map(s => s.toUpperCase()); // ✅
  }
}`
      },
      {
        title: 'Практический пример: валидация API',
        code: `interface ApiUser {
  id: number;
  name: string;
  email: string;
}

function isValidUser(data: unknown): data is ApiUser {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;
  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string"
  );
}

async function fetchUser(id: number): Promise<ApiUser | null> {
  const response = await fetch(\`/api/users/\${id}\`);
  const data = await response.json();

  if (isValidUser(data)) {
    return data; // ✅ тип ApiUser
  }

  return null;
}`
      }
    ],
    relatedTopics: ['ts-type-guards', 'ts-assertion-functions', 'ts-data-handling']
  },
  {
    id: 'ts-assertion-functions',
    title: 'Assertion Functions',
    description: 'Assertion functions — это функции, которые проверяют условие и выбрасывают ошибку, если условие не выполнено. TypeScript сужает тип после вызова такой функции, предполагая, что выполнение продолжилось только при успешной проверке.',
    difficulty: 'intermediate',
    tags: ['typescript', 'types', 'assertions', 'intermediate'],
    keyPoints: [
      'Синтаксис: asserts condition — функция утверждает условие.',
      'После вызова: TypeScript предполагает, что условие выполнено.',
      'Использование: валидация входных данных, проверка инвариантов, защитные проверки.',
      'Отличие от type predicates: assertion функции выбрасывают ошибку, не возвращают boolean.',
      'Практика: проверка обязательных параметров, валидация конфигураций.'
    ],
    examples: [
      {
        title: 'Базовое использование',
        code: `// Функция утверждает, что value не null/undefined
function assertIsDefined<T>(value: T | null | undefined): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error("Value is not defined");
  }
}

function process(value: string | null) {
  assertIsDefined(value);
  // После вызова TypeScript знает, что value - string
  value.toUpperCase(); // ✅
}`
      },
      {
        title: 'Проверка типа',
        code: `function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new TypeError("Value must be a string");
  }
}

function processData(data: unknown) {
  assertIsString(data);
  // data - string
  console.log(data.length); // ✅
}`
      },
      {
        title: 'Проверка условий',
        code: `function assertPositive(value: number): asserts value is number {
  if (value <= 0) {
    throw new Error("Value must be positive");
  }
}

function calculateSqrt(value: number) {
  assertPositive(value);
  // TypeScript знает, что value > 0
  return Math.sqrt(value); // ✅ безопасно
}`
      },
      {
        title: 'Практический пример: валидация конфигурации',
        code: `interface Config {
  apiUrl: string;
  timeout: number;
}

function assertValidConfig(config: unknown): asserts config is Config {
  if (
    typeof config !== "object" ||
    config === null ||
    !("apiUrl" in config) ||
    !("timeout" in config) ||
    typeof (config as any).apiUrl !== "string" ||
    typeof (config as any).timeout !== "number"
  ) {
    throw new Error("Invalid configuration");
  }
}

function initializeApp(config: unknown) {
  assertValidConfig(config);
  // config - Config
  fetch(config.apiUrl, { timeout: config.timeout }); // ✅
}`
      }
    ],
    relatedTopics: ['ts-type-predicates', 'ts-type-guards']
  },
  {
    id: 'ts-const-assertions',
    title: 'Const Assertions',
    description: 'Const assertions (as const) превращают значение в его литеральный тип, делая его readonly и максимально узким. Полезно для создания неизменяемых констант и извлечения литеральных типов из значений.',
    difficulty: 'intermediate',
    tags: ['typescript', 'types', 'const-assertions', 'literals', 'intermediate'],
    keyPoints: [
      'as const: делает значение readonly и максимально узким типом.',
      'Массивы: [1, 2, 3] as const → readonly [1, 2, 3] (кортеж литералов).',
      'Объекты: { name: "John" } as const → readonly объект с литеральными типами.',
      'Извлечение типов: typeof value[number] для получения union из массива.',
      'Практика: константы, конфигурации, создание union типов из значений.'
    ],
    examples: [
      {
        title: 'Базовое использование',
        code: `// Без as const
const colors = ["red", "green", "blue"];
// Тип: string[]

// С as const
const colorsConst = ["red", "green", "blue"] as const;
// Тип: readonly ["red", "green", "blue"]

// colorsConst[0] = "blue"; // ❌ readonly
// colorsConst.push("yellow"); // ❌ readonly`
      },
      {
        title: 'Извлечение union типа',
        code: `const statuses = ["pending", "success", "error"] as const;
// Тип: readonly ["pending", "success", "error"]

// Извлечение union типа
type Status = typeof statuses[number];
// Тип: "pending" | "success" | "error"

function setStatus(status: Status) {
  // status может быть только одним из значений
}`
      },
      {
        title: 'Объекты с as const',
        code: `const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
} as const;

// Тип: {
//   readonly apiUrl: "https://api.example.com";
//   readonly timeout: 5000;
//   readonly retries: 3;
// }

// Все значения - литеральные типы
// config.apiUrl = "other"; // ❌ readonly`
      },
      {
        title: 'Практический пример: константы',
        code: `// Создание типизированных констант
export const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"] as const;
export type HttpMethod = typeof HTTP_METHODS[number];

// Использование
function request(method: HttpMethod, url: string) {
  // method гарантированно один из значений
}

// request("GET", "/api"); // ✅
// request("PATCH", "/api"); // ❌ ошибка`
      }
    ],
    relatedTopics: ['ts-literal-types', 'ts-template-literal-types']
  },
  {
    id: 'ts-template-literal-types',
    title: 'Template Literal Types (базовые)',
    description: 'Template literal types позволяют создавать строковые типы на основе шаблонов, комбинируя литеральные типы и другие строковые типы. Полезны для создания типизированных строковых паттернов и интерполяции.',
    difficulty: 'intermediate',
    tags: ['typescript', 'types', 'template-literals', 'intermediate'],
    keyPoints: [
      'Синтаксис: `prefix${Type}suffix` — шаблон с интерполяцией типов.',
      'Интерполяция: можно использовать union типы, создавая все комбинации.',
      'Практика: типизация CSS классов, API endpoints, идентификаторов.',
      'Комбинирование: можно создавать сложные паттерны с несколькими интерполяциями.',
      'Utility types: Uppercase, Lowercase, Capitalize, Uncapitalize для трансформации.'
    ],
    examples: [
      {
        title: 'Базовый template literal type',
        code: `type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ClickEvent = EventName<"click">;    // "onClick"
type ChangeEvent = EventName<"change">;  // "onChange"
type SubmitEvent = EventName<"submit">;   // "onSubmit"

// Использование
interface EventHandlers {
  onClick: () => void;
  onChange: () => void;
  onSubmit: () => void;
}`
      },
      {
        title: 'С union типами',
        code: `type Color = "red" | "green" | "blue";
type Size = "small" | "large";

// Создает все комбинации
type ButtonClass = \`btn-\${Color}-\${Size}\`;
// "btn-red-small" | "btn-red-large" | "btn-green-small" | ...

// Практическое использование
function getButtonClass(color: Color, size: Size): ButtonClass {
  return \`btn-\${color}-\${size}\` as ButtonClass;
}`
      },
      {
        title: 'Utility types для трансформации',
        code: `type Method = "get" | "post" | "put" | "delete";

// Преобразование в верхний регистр
type HttpMethod = Uppercase<Method>;
// "GET" | "POST" | "PUT" | "DELETE"

// Преобразование в нижний регистр
type LowerMethod = Lowercase<HttpMethod>;
// "get" | "post" | "put" | "delete"

// Первая буква заглавная
type CapitalMethod = Capitalize<Method>;
// "Get" | "Post" | "Put" | "Delete"`
      }
    ],
    relatedTopics: ['ts-literal-types', 'ts-advanced-types']
  }
];
