import { Topic } from '../../../types';

export const TYPESCRIPT_MODULES_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'ts-modules-typing',
    title: 'ES Modules типизация',
    description: 'TypeScript поддерживает типизацию ES modules через export и import типов. Type-only imports/exports позволяют импортировать только типы, не включая их в финальный JavaScript код.',
    difficulty: 'beginner',
    tags: ['typescript', 'modules', 'es-modules', 'basics'],
    keyPoints: [
      'Export типов: export type { Type } или export interface.',
      'Import типов: import type { Type } — только для типов.',
      'Практика: разделение типов и значений, уменьшение размера bundle.'
    ],
    examples: [
      {
        title: 'Export и import типов',
        code: `// types.ts
export type User = { name: string; age: number };
export interface Config { apiUrl: string; }

// main.ts
import type { User, Config } from './types';
// Типы не попадут в финальный JavaScript`
      }
    ],
    relatedTopics: ['ts-modules-declaration']
  }
];
