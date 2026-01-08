import { Topic } from '../../../types';

export const TYPESCRIPT_UTILITY_TYPES_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'ts-custom-utility-types',
    title: 'Создание собственных Utility Types',
    description: 'Можно создавать собственные utility types, комбинируя встроенные utility types и условные типы. Позволяет создавать переиспользуемые трансформации типов для конкретных задач проекта.',
    difficulty: 'advanced',
    tags: ['typescript', 'utility-types', 'custom', 'advanced'],
    keyPoints: [
      'Композиция: комбинирование встроенных utility types.',
      'Условные типы: использование conditional types для сложной логики.',
      'Практика: создание типов, специфичных для проекта.',
      'Переиспользование: создание библиотеки utility types для команды.'
    ],
    examples: [
      {
        title: 'Создание собственного utility type',
        code: `// Utility type для глубокого Partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
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

type PartialConfig = DeepPartial<Config>;
// Все свойства опциональны, включая вложенные`
      }
    ],
    relatedTopics: ['ts-conditional-types', 'ts-mapped-types']
  }
];
