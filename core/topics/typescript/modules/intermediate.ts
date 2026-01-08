import { Topic } from '../../../types';

export const TYPESCRIPT_MODULES_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'ts-modules-declaration',
    title: 'Declaration Files',
    description: 'Declaration files (.d.ts) содержат только типы и используются для типизации JavaScript кода или библиотек без типов. Ambient declarations позволяют описывать типы для внешнего кода.',
    difficulty: 'intermediate',
    tags: ['typescript', 'modules', 'declaration-files', 'intermediate'],
    keyPoints: [
      'Расширение .d.ts: файлы только с типами.',
      'Ambient declarations: declare module, declare namespace.',
      'Практика: типизация библиотек, расширение глобальных типов.'
    ],
    examples: [
      {
        title: 'Declaration file',
        code: `// types.d.ts
declare module "my-library" {
  export function doSomething(): void;
}

// Теперь можно использовать
import { doSomething } from "my-library";`
      }
    ],
    relatedTopics: ['ts-modules-typing']
  }
];
