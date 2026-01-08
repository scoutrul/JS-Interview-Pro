import { Topic } from '../../../types';

export const SECURITY_DEPENDENCIES_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'dependencies-scanning',
    title: 'Автоматическое сканирование',
    description: 'Автоматическое сканирование зависимостей на уязвимости должно быть интегрировано в процесс разработки. CI/CD пайплайны должны проверять зависимости перед деплоем.',
    difficulty: 'intermediate',
    tags: ['security', 'dependencies', 'scanning', 'ci-cd', 'automation'],
    keyPoints: [
      'Интеграция проверки в CI/CD пайплайны.',
      'Автоматическое сканирование при каждом коммите.',
      'Блокировка деплоя при обнаружении критичных уязвимостей.',
      'Использование инструментов: Snyk, Dependabot, npm audit.',
      'Регулярные отчеты о безопасности зависимостей.'
    ],
    examples: [
      {
        title: 'Автоматическое сканирование',
        code: `// GitHub Actions для автоматической проверки:
// .github/workflows/security.yml
name: Security Audit

on: [push, pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm audit --audit-level=high
      # Блокирует деплой при критичных уязвимостях

// Dependabot для автоматических обновлений:
// .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10`
      }
    ],
    relatedTopics: ['dependencies-audit', 'dependencies-updates']
  },
  {
    id: 'dependencies-updates',
    title: 'Обновление зависимостей',
    description: 'Регулярное обновление зависимостей критично для безопасности. Однако обновления могут ломать совместимость, поэтому важно тестировать обновления перед применением.',
    difficulty: 'intermediate',
    tags: ['security', 'dependencies', 'updates', 'versioning'],
    keyPoints: [
      'Регулярное обновление зависимостей для исправления уязвимостей.',
      'Тестирование обновлений перед применением.',
      'Использование semantic versioning для понимания изменений.',
      'Автоматические обновления через Dependabot, Renovate.',
      'Документирование изменений при обновлении.'
    ],
    examples: [
      {
        title: 'Обновление зависимостей',
        code: `// Проверка устаревших пакетов:
npm outdated

// Обновление всех пакетов:
npm update

// Обновление конкретного пакета:
npm install package@latest

// Обновление с проверкой breaking changes:
// 1. Проверить changelog
// 2. Обновить в dev окружении
// 3. Протестировать
// 4. Обновить в production

// Автоматические обновления (Dependabot):
// - Создает PR для обновлений
// - Тестирует обновления
// - Уведомляет о breaking changes`
      }
    ],
    relatedTopics: ['dependencies-scanning', 'dependencies-lock-files']
  },
  {
    id: 'dependencies-lock-files',
    title: 'Lock файлы и безопасность (package-lock.json, yarn.lock)',
    description: 'Lock файлы (package-lock.json, yarn.lock) фиксируют точные версии зависимостей и их подзависимостей. Это критично для безопасности и воспроизводимости сборок.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'dependencies', 'lock-files', 'package-lock', 'yarn-lock', 'front-end-essential'],
    keyPoints: [
      'Lock файлы фиксируют точные версии зависимостей.',
      'Обеспечивают воспроизводимость сборок.',
      'Защищают от неожиданных обновлений зависимостей.',
      'package-lock.json для npm, yarn.lock для Yarn.',
      'Lock файлы должны коммититься в репозиторий.'
    ],
    examples: [
      {
        title: 'Lock файлы',
        code: `// package-lock.json (npm):
// Фиксирует точные версии всех зависимостей
{
  "dependencies": {
    "package": {
      "version": "1.2.3", // Точная версия
      "resolved": "https://registry.npmjs.org/package/-/package-1.2.3.tgz",
      "integrity": "sha512-..."
    }
  }
}

// yarn.lock (Yarn):
// Аналогично фиксирует версии

// ✅ Преимущества:
// - Воспроизводимость сборок
// - Защита от неожиданных обновлений
// - Безопасность (известные версии)

// ⚠️ Важно:
// - Коммитить lock файлы в репозиторий
// - Не редактировать вручную
// - Обновлять при изменении зависимостей`
      }
    ],
    relatedTopics: ['dependencies-basics', 'dependencies-supply-chain']
  },
  {
    id: 'dependencies-supply-chain',
    title: 'Supply chain атаки',
    description: 'Supply chain атаки — это атаки на цепочку поставок зависимостей. Злоумышленники могут компрометировать пакеты в npm, что влияет на все приложения, использующие эти пакеты.',
    difficulty: 'intermediate',
    tags: ['security', 'dependencies', 'supply-chain', 'attacks'],
    keyPoints: [
      'Supply chain атаки: компрометация пакетов в npm.',
      'Злоумышленники могут внедрить вредоносный код в популярные пакеты.',
      'Использование компрометированных пакетов влияет на все приложения.',
      'Защита: проверка целостности пакетов, использование доверенных источников.',
      'Мониторинг подозрительной активности в зависимостях.'
    ],
    examples: [
      {
        title: 'Supply chain атаки',
        code: `// Пример supply chain атаки:
// 1. Злоумышленник компрометирует популярный пакет
// 2. Внедряет вредоносный код
// 3. Все приложения, использующие пакет, затронуты

// Защита:
// 1. Проверка целостности (package-lock.json, yarn.lock)
// 2. Использование доверенных источников
// 3. Регулярное сканирование на уязвимости
// 4. Мониторинг подозрительной активности

// Проверка целостности:
// npm ci (использует lock файл, проверяет integrity)

// Мониторинг:
// - npm audit
// - Snyk
// - Dependabot alerts`
      }
    ],
    relatedTopics: ['dependencies-lock-files', 'dependencies-scanning']
  }
];
