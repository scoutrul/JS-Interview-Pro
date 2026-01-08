import { Topic } from '../../../types';

export const TYPESCRIPT_INTERFACES_TYPES_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'ts-recursive-types',
    title: 'Recursive Types',
    description: 'Recursive types — это типы, которые ссылаются на самих себя в своем определении. Полезны для описания древовидных структур, связанных списков и других рекурсивных структур данных.',
    difficulty: 'advanced',
    tags: ['typescript', 'types', 'recursive', 'advanced'],
    keyPoints: [
      'Самоссылка: тип использует себя в определении.',
      'Практика: деревья, связанные списки, вложенные структуры.',
      'Ограничения: нужна базовая точка остановки (листья дерева).',
      'Глубина: TypeScript имеет ограничения на глубину рекурсии.',
      'Проверка: TypeScript проверяет корректность рекурсивных типов.'
    ],
    examples: [
      {
        title: 'Базовый рекурсивный тип',
        code: `// Древовидная структура
interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

// Использование
const tree: TreeNode<string> = {
  value: "root",
  children: [
    {
      value: "child1",
      children: []
    },
    {
      value: "child2",
      children: [
        {
          value: "grandchild",
          children: []
        }
      ]
    }
  ]
};`
      },
      {
        title: 'Связанный список',
        code: `// Узел связанного списка
interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

// Создание списка
const list: ListNode<number> = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: null
    }
  }
};`
      },
      {
        title: 'JSON-подобная структура',
        code: `// Рекурсивный тип для JSON
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

// Использование
const json: JsonValue = {
  name: "John",
  age: 30,
  tags: ["developer", "typescript"],
  address: {
    street: "Main St",
    city: "NYC"
  }
};`
      }
    ],
    relatedTopics: ['ts-self-referential-types']
  },
  {
    id: 'ts-self-referential-types',
    title: 'Self-referential Types',
    description: 'Self-referential types — это типы, которые ссылаются на самих себя, часто через generic параметры или условные типы. Позволяют создавать сложные типы с самоссылками для описания рекурсивных структур.',
    difficulty: 'advanced',
    tags: ['typescript', 'types', 'self-referential', 'advanced'],
    keyPoints: [
      'Самоссылка через generic: тип использует себя как параметр.',
      'Условные типы: рекурсивные условные типы для трансформаций.',
      'Практика: глубокие трансформации типов, рекурсивные структуры.',
      'Ограничения: TypeScript имеет лимиты на глубину рекурсии.',
      'Сложность: требуют глубокого понимания системы типов.'
    ],
    examples: [
      {
        title: 'Self-referential через generic',
        code: `// Тип, который ссылается на себя
interface Node<T> {
  value: T;
  children: Node<T>[];
}

// Функция для обхода
function traverse<T>(node: Node<T>, callback: (value: T) => void) {
  callback(node.value);
  node.children.forEach(child => traverse(child, callback));
}`
      },
      {
        title: 'Рекурсивные условные типы',
        code: `// Глубокая трансформация типа
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

interface Config {
  api: {
    url: string;
    timeout: number;
  };
  features: {
    enabled: boolean;
  };
}

type ReadonlyConfig = DeepReadonly<Config>;
// Все вложенные свойства тоже readonly`
      }
    ],
    relatedTopics: ['ts-recursive-types', 'ts-conditional-types']
  }
];
