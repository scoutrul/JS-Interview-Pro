import { Topic } from '../../../types';

export const TYPESCRIPT_ADVANCED_TYPES_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'ts-recursive-conditional',
    title: 'Recursive Conditional Types',
    description: 'Recursive conditional types — это conditional types, которые ссылаются на самих себя. Позволяют создавать глубокие трансформации типов, которые работают на произвольной глубине вложенности.',
    difficulty: 'advanced',
    tags: ['typescript', 'types', 'recursive', 'conditional', 'advanced'],
    keyPoints: [
      'Самоссылка: conditional type использует себя в определении.',
      'Глубина: работает на произвольной глубине вложенности.',
      'Ограничения: TypeScript имеет лимиты на глубину рекурсии.',
      'Практика: DeepReadonly, DeepPartial, глубокие трансформации типов.'
    ],
    examples: [
      {
        title: 'DeepReadonly',
        code: `type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

interface Config {
  api: {
    url: string;
    timeout: number;
  };
}

type ReadonlyConfig = DeepReadonly<Config>;
// Все свойства readonly, включая вложенные`
      }
    ],
    relatedTopics: ['ts-conditional-types', 'ts-recursive-types']
  }
];
