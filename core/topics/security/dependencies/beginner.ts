import { Topic } from '../../../types';

export const SECURITY_DEPENDENCIES_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'dependencies-basics',
    title: 'Проблема уязвимостей в зависимостях',
    description: 'Зависимости (npm пакеты) могут содержать уязвимости безопасности. Использование уязвимых зависимостей создает риски для приложения. Важно регулярно проверять и обновлять зависимости.',
    difficulty: 'beginner',
    tags: ['security', 'dependencies', 'npm', 'vulnerabilities', 'basics'],
    keyPoints: [
      'Зависимости могут содержать уязвимости безопасности.',
      'Уязвимости в зависимостях могут быть использованы для атак.',
      'Регулярная проверка зависимостей на уязвимости.',
      'Обновление зависимостей для исправления уязвимостей.',
      'Использование npm audit, yarn audit для проверки.'
    ],
    examples: [
      {
        title: 'Проблема уязвимостей',
        code: `// Зависимость с уязвимостью:
// package.json
{
  "dependencies": {
    "vulnerable-package": "^1.0.0" // Содержит уязвимость!
  }
}

// Уязвимость может быть использована:
// - XSS через уязвимую библиотеку
// - Утечка данных через уязвимый компонент
// - Выполнение произвольного кода

// Проверка уязвимостей:
// npm audit
// yarn audit

// Результат:
// found 5 vulnerabilities (3 high, 2 moderate)`
      }
    ],
    relatedTopics: ['dependencies-audit', 'dependencies-left-pad']
  },
  {
    id: 'dependencies-audit',
    title: 'npm audit и проверка зависимостей',
    description: 'npm audit и yarn audit — это инструменты для проверки зависимостей на известные уязвимости. Регулярная проверка критична для безопасности приложения.',
    difficulty: 'beginner',
    tags: ['security', 'dependencies', 'npm-audit', 'yarn-audit', 'basics'],
    keyPoints: [
      'npm audit: проверка зависимостей на уязвимости.',
      'yarn audit: аналогичная проверка для Yarn.',
      'Регулярная проверка (при установке, перед деплоем).',
      'Автоматическое исправление через npm audit fix.',
      'Интеграция в CI/CD для автоматической проверки.'
    ],
    examples: [
      {
        title: 'Использование npm audit',
        code: `// Проверка уязвимостей:
npm audit

// Результат:
// found 5 vulnerabilities (3 high, 2 moderate)
// 
// Package: vulnerable-package
// Severity: high
// Vulnerability: XSS in version < 2.0.0
// Recommendation: update to 2.0.0

// Автоматическое исправление:
npm audit fix

// Исправление с обновлением major версий:
npm audit fix --force

// Проверка конкретного пакета:
npm audit vulnerable-package

// ⚠️ Важно: проверять перед каждым деплоем!`
      }
    ],
    relatedTopics: ['dependencies-basics', 'dependencies-updates']
  },
  {
    id: 'dependencies-left-pad',
    title: 'Проблема left-pad и подобных инцидентов',
    description: 'Проблема left-pad показала, как зависимость от небольших пакетов может привести к поломке тысяч приложений. Это демонстрирует важность понимания зависимостей и их влияния.',
    difficulty: 'beginner',
    tags: ['security', 'dependencies', 'left-pad', 'supply-chain', 'basics'],
    keyPoints: [
      'left-pad: небольшой пакет, от которого зависели тысячи приложений.',
      'Удаление пакета привело к поломке множества приложений.',
      'Проблема supply chain: зависимость от внешних пакетов.',
      'Важность lock файлов (package-lock.json, yarn.lock).',
      'Понимание влияния зависимостей на приложение.'
    ],
    examples: [
      {
        title: 'Проблема left-pad',
        code: `// left-pad был небольшим пакетом (11 строк кода)
// Но от него зависели тысячи приложений

// Когда пакет был удален из npm:
// - Тысячи приложений сломались
// - CI/CD пайплайны упали
// - Разработчики не могли установить зависимости

// Уроки:
// 1. Небольшие пакеты могут иметь большое влияние
// 2. Зависимости от внешних пакетов создают риски
// 3. Lock файлы критичны для стабильности

// Защита:
// - Использовать lock файлы (package-lock.json)
// - Версионировать зависимости
// - Понимать влияние зависимостей`
      }
    ],
    relatedTopics: ['dependencies-basics', 'dependencies-lock-files']
  }
];
