import { Topic } from '../../../types';

export const TYPESCRIPT_CONFIG_TOOLS_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'ts-strict-mode',
    title: 'Strict Mode',
    description: 'Strict mode включает все строгие проверки типов TypeScript. Помогает находить ошибки на этапе компиляции, уменьшая количество багов в продакшене. Включается через "strict": true в tsconfig.json.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'config', 'strict', 'basics', 'fundamentals'],
    keyPoints: [
      'Включение: "strict": true в tsconfig.json включает все строгие проверки.',
      'Компоненты: strictNullChecks, strictFunctionTypes, strictPropertyInitialization и др.',
      'Практика: большинство компаний требуют strict mode для всех проектов.',
      'Ошибки: помогает отловить ошибки типов, null/undefined, неинициализированные свойства.'
    ],
    examples: [
      {
        title: 'tsconfig.json',
        code: `{
  "compilerOptions": {
    "strict": true,
    // Включает:
    // - strictNullChecks
    // - strictFunctionTypes
    // - strictPropertyInitialization
    // - noImplicitAny
    // - и другие
  }
}`
      },
      {
        title: 'strictNullChecks',
        code: `// С strictNullChecks
function process(value: string | null) {
  // ❌ Ошибка: value может быть null
  // console.log(value.toUpperCase());

  // ✅ Нужна проверка
  if (value !== null) {
    console.log(value.toUpperCase());
  }
}`
      }
    ],
    relatedTopics: ['ts-strict-null', 'ts-config-options']
  }
];
