import { Topic } from '../../../types';

export const TYPESCRIPT_FUNCTIONS_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'ts-function-typing',
    title: 'Типизация функций',
    description: 'Функции в TypeScript типизируются через указание типов параметров и возвращаемого значения. Arrow functions и function declarations поддерживают типизацию одинаково. Опциональные параметры и параметры по умолчанию также типизируются.',
    difficulty: 'beginner',
    tags: ['typescript', 'functions', 'typing', 'basics'],
    keyPoints: [
      'Синтаксис: function name(param: Type): ReturnType { }.',
      'Arrow functions: const name = (param: Type): ReturnType => { }.',
      'Опциональные параметры: param?: Type — могут отсутствовать.',
      'Параметры по умолчанию: param: Type = defaultValue.',
      'Rest parameters: ...args: Type[] — массив оставшихся аргументов.'
    ],
    examples: [
      {
        title: 'Базовая типизация',
        code: `// Function declaration
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Void возвращаемое значение
function log(message: string): void {
  console.log(message);
}`
      },
      {
        title: 'Опциональные параметры',
        code: `function greet(name: string, title?: string): string {
  if (title) {
    return \`Hello, \${title} \${name}!\`;
  }
  return \`Hello, \${name}!\`;
}

greet("John");              // ✅
greet("John", "Mr");        // ✅`
      },
      {
        title: 'Параметры по умолчанию',
        code: `function createUser(
  name: string,
  age: number = 18,
  active: boolean = true
): User {
  return { name, age, active };
}

createUser("John");              // age = 18, active = true
createUser("John", 25);           // active = true
createUser("John", 25, false);   // все параметры`
      },
      {
        title: 'Rest parameters',
        code: `function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3);        // 6
sum(1, 2, 3, 4, 5);  // 15`
      }
    ],
    relatedTopics: ['ts-function-overloads', 'ts-generic-functions']
  },
  {
    id: 'ts-function-overloads',
    title: 'Function Overloads',
    description: 'Function overloads позволяют определить несколько сигнатур для одной функции. TypeScript выбирает подходящую сигнатуру на основе типов аргументов. Полезны для функций, которые ведут себя по-разному в зависимости от типов параметров.',
    difficulty: 'beginner',
    tags: ['typescript', 'functions', 'overloads', 'basics'],
    keyPoints: [
      'Множественные сигнатуры: несколько объявлений функции перед реализацией.',
      'Выбор сигнатуры: TypeScript выбирает первую подходящую сигнатуру.',
      'Реализация: одна общая реализация для всех overloads.',
      'Порядок: более специфичные overloads должны быть первыми.'
    ],
    examples: [
      {
        title: 'Базовые overloads',
        code: `// Объявления overloads
function process(value: string): string;
function process(value: number): number;
function process(value: boolean): boolean;

// Реализация
function process(value: string | number | boolean): string | number | boolean {
  return value;
}

const str = process("hello");  // string
const num = process(42);       // number
const bool = process(true);    // boolean`
      }
    ],
    relatedTopics: ['ts-function-typing', 'ts-generic-functions']
  }
];
