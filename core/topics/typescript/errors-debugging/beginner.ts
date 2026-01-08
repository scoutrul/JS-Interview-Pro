import { Topic } from '../../../types';

export const TYPESCRIPT_ERRORS_DEBUGGING_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'ts-common-errors',
    title: 'Понимание ошибок TypeScript',
    description: 'TypeScript выдает ошибки на этапе компиляции, помогая находить проблемы до выполнения кода. Понимание типичных ошибок и их решений критично для эффективной работы с TypeScript.',
    difficulty: 'beginner',
    tags: ['typescript', 'errors', 'debugging', 'basics'],
    keyPoints: [
      'Типы ошибок: type errors, syntax errors, semantic errors.',
      'Чтение ошибок: понимание сообщений об ошибках TypeScript.',
      'Common errors: типичные ошибки и их решения.',
      'Type narrowing: использование для устранения ошибок типов.'
    ],
    examples: [
      {
        title: 'Типичные ошибки',
        code: `// Ошибка: тип не совместим
function add(a: number, b: number): number {
  return a + b;
}

// add("5", 3); // ❌ Ошибка: аргумент типа "string" не может быть присвоен параметру типа "number"

// Ошибка: свойство не существует
interface User {
  name: string;
}

const user: User = { name: "John" };
// user.age; // ❌ Ошибка: свойство "age" не существует в типе "User"`

      }
    ],
    relatedTopics: ['ts-type-narrowing', 'ts-strict-mode']
  }
];
