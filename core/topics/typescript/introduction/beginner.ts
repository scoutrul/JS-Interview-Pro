import { Topic } from '../../../types';

export const TYPESCRIPT_INTRODUCTION_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'ts-introduction',
    title: 'Введение в TypeScript',
    description: 'TypeScript — типизированное надмножество JavaScript, разработанное Microsoft. Добавляет статическую типизацию к JavaScript, проверяя типы на этапе компиляции, а не во время выполнения. Компилируется в обычный JavaScript и полностью совместим с экосистемой JavaScript.',
    difficulty: 'beginner',
    tags: ['typescript', 'introduction', 'basics', 'fundamentals'],
    keyPoints: [
      'TypeScript — надмножество JavaScript: весь валидный JavaScript код является валидным TypeScript.',
      'Статическая типизация: проверка типов происходит на этапе компиляции, до выполнения кода.',
      'Компиляция: TypeScript компилируется в JavaScript, типы удаляются из финального кода.',
      'Создан Microsoft в 2012 году, стал стандартом для больших JavaScript-проектов.',
      'Совместимость: работает с любым JavaScript-кодом и библиотеками.',
      'Инструменты: автодополнение, рефакторинг, навигация по коду улучшаются благодаря типам.'
    ],
    funFact: 'TypeScript был создан Андерсом Хейлсбергом, который также создал C# и Turbo Pascal. Изначально TypeScript разрабатывался как внутренний проект Microsoft, но был открыт в 2012 году.',
    examples: [
      {
        title: 'TypeScript компилируется в JavaScript',
        code: `// TypeScript код
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// После компиляции (JavaScript)
function greet(name) {
  return \`Hello, \${name}!\`;
}`
      },
      {
        title: 'Проверка типов на этапе компиляции',
        code: `// TypeScript покажет ошибку до выполнения
function add(a: number, b: number): number {
  return a + b;
}

add(5, 3);     // ✅ OK
add("5", 3);   // ❌ Ошибка: аргумент типа "string" не может быть присвоен параметру типа "number"`
      },
      {
        title: 'Совместимость с JavaScript',
        code: `// Можно использовать любой JavaScript код
const existingJS = {
  name: "John",
  age: 30
};

// TypeScript понимает структуру
console.log(existingJS.name); // ✅ Автодополнение работает`
      }
    ],
    relatedTopics: ['ts-primitive-types', 'ts-interfaces-types']
  },
  {
    id: 'ts-why-typescript',
    title: 'Зачем нужен TypeScript',
    description: 'TypeScript решает проблемы масштабирования больших JavaScript-проектов. Предотвращает ошибки типов на этапе разработки, улучшает читаемость кода, упрощает рефакторинг и обеспечивает лучшую поддержку IDE с автодополнением и навигацией.',
    difficulty: 'beginner',
    tags: ['typescript', 'introduction', 'basics', 'fundamentals', 'engineering'],
    keyPoints: [
      'Предотвращение ошибок: находит ошибки типов до выполнения кода, уменьшая количество багов.',
      'Улучшенная поддержка IDE: автодополнение, навигация по коду, рефакторинг становятся надежнее.',
      'Документация: типы служат самодокументирующимся кодом, показывая ожидаемые структуры данных.',
      'Рефакторинг: безопасное переименование и изменение кода с проверкой всех использований.',
      'Масштабируемость: упрощает работу с большими проектами и командой разработчиков.',
      'Совместимость: работает с существующим JavaScript-кодом, постепенная миграция возможна.'
    ],
    examples: [
      {
        title: 'Предотвращение ошибок типов',
        code: `// JavaScript - ошибка обнаружится только во время выполнения
function calculateTotal(price, quantity) {
  return price * quantity;
}

calculateTotal("10", 5); // "105" (неправильный результат!)

// TypeScript - ошибка на этапе компиляции
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

calculateTotal("10", 5); // ❌ Ошибка компиляции`
      },
      {
        title: 'Автодополнение и навигация',
        code: `// TypeScript знает структуру объекта
interface User {
  name: string;
  age: number;
  email: string;
}

function getUser(): User {
  return { name: "John", age: 30, email: "john@example.com" };
}

const user = getUser();
user. // ✅ IDE предложит: name, age, email`
      }
    ],
    relatedTopics: ['ts-introduction', 'ts-interfaces-types']
  }
];
