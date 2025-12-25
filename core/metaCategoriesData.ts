import { Category, Topic, Difficulty } from './types';
import { MetaCategoryId } from './metaCategories';
import { BEGINNER_TOPICS, INTERMEDIATE_TOPICS, ADVANCED_TOPICS } from './topics';

// Простые темы для каждой категории (для начала)
const createSimpleTopic = (
  id: string,
  title: string,
  description: string,
  difficulty: Difficulty,
  tags: string[]
): Topic => ({
  id,
  title,
  description,
  difficulty,
  tags,
  keyPoints: [],
  relatedTopics: []
});

// MARKUP категория
const MARKUP_TOPICS: Topic[] = [
  createSimpleTopic(
    'html-basics',
    'Основы HTML',
    'Структура HTML документа, семантические теги, атрибуты',
    'beginner',
    ['html', 'semantics', 'basics']
  ),
  createSimpleTopic(
    'css-basics',
    'Основы CSS',
    'Селекторы, каскадность, специфичность, наследование',
    'beginner',
    ['css', 'selectors', 'specificity']
  ),
  createSimpleTopic(
    'css-layout',
    'CSS Layout',
    'Flexbox, Grid, позиционирование элементов',
    'intermediate',
    ['css', 'flexbox', 'grid', 'layout']
  ),
  createSimpleTopic(
    'css-animations',
    'CSS Анимации',
    'Transitions, animations, transform, keyframes',
    'intermediate',
    ['css', 'animations', 'transitions']
  ),
  createSimpleTopic(
    'responsive-design',
    'Адаптивный дизайн',
    'Media queries, viewport, mobile-first подход',
    'intermediate',
    ['css', 'responsive', 'media-queries']
  )
];

// Вспомогательные функции для получения темы по ID
const getTopicById = (id: string): Topic | undefined => {
  return BEGINNER_TOPICS.find(t => t.id === id) ||
         INTERMEDIATE_TOPICS.find(t => t.id === id) ||
         ADVANCED_TOPICS.find(t => t.id === id);
};

// TOOLS категория
const TOOLS_TOPICS: Topic[] = [
  // Git - используем полные темы из всех уровней
  // Beginner
  getTopicById('git-init-clone'),
  getTopicById('git-add-commit'),
  getTopicById('git-status-log'),
  getTopicById('git-branches'),
  getTopicById('git-merge'),
  getTopicById('git-remote'),
  // Intermediate
  getTopicById('git-conflicts'),
  getTopicById('git-rebase'),
  getTopicById('git-reset-revert'),
  getTopicById('git-history'),
  getTopicById('git-stash'),
  getTopicById('git-remote-advanced'),
  // Advanced
  getTopicById('git-cherry-pick'),
  getTopicById('git-reflog'),
  getTopicById('git-hooks'),
  getTopicById('git-submodules'),
  getTopicById('git-workflow'),
].filter((t): t is Topic => t !== undefined).concat([
  // Terminal
  createSimpleTopic(
    'terminal-basics',
    'Основы Terminal',
    'Навигация: cd, ls, pwd. Файлы: cat, touch, mkdir, rm. Поиск: find, grep',
    'beginner',
    ['terminal', 'cli', 'bash', 'shell', 'basics', 'tools', 'productivity']
  ),
  createSimpleTopic(
    'terminal-intermediate',
    'Terminal средний уровень',
    'Перенаправление: >, >>, |. Переменные окружения: export, PATH. Пакетные менеджеры: apt/yum, brew',
    'intermediate',
    ['terminal', 'cli', 'bash', 'shell', 'pipes', 'environment', 'tools', 'productivity']
  ),
  createSimpleTopic(
    'terminal-advanced',
    'Продвинутый Terminal',
    'Bash скрипты, alias, процессы: ps, kill, jobs, bg/fg. SSH, rsync, sed/awk',
    'advanced',
    ['terminal', 'cli', 'bash', 'shell', 'scripting', 'ssh', 'tools', 'productivity']
  ),
  // npm
  createSimpleTopic(
    'npm-basics',
    'Основы npm',
    'Установка: npm install, npm i. package.json: зависимости, scripts. Команды: npm start, npm run',
    'beginner',
    ['npm', 'package-manager', 'node', 'basics', 'tools', 'productivity']
  ),
  createSimpleTopic(
    'npm-intermediate',
    'npm средний уровень',
    'Версионирование: ^, ~, семантическое версионирование. Глобальные vs локальные пакеты. npm audit, npm outdated',
    'intermediate',
    ['npm', 'package-manager', 'node', 'versioning', 'dependencies', 'tools', 'productivity']
  ),
  createSimpleTopic(
    'npm-advanced',
    'Продвинутый npm',
    'npm workspaces, монорепозитории, npm link, создание пакетов, package-lock.json, разрешение конфликтов',
    'advanced',
    ['npm', 'package-manager', 'node', 'workspaces', 'monorepo', 'tools', 'productivity']
  ),
  // Docker
  createSimpleTopic(
    'docker-basics',
    'Основы Docker',
    'docker run, docker build. Dockerfile: FROM, RUN, COPY. Образы и контейнеры: images, containers',
    'beginner',
    ['docker', 'containers', 'devops', 'basics', 'tools', 'productivity']
  ),
  createSimpleTopic(
    'docker-intermediate',
    'Docker средний уровень',
    'Docker Compose: docker-compose.yml. Volumes, networks. Многоэтапная сборка (multi-stage)',
    'intermediate',
    ['docker', 'containers', 'devops', 'compose', 'volumes', 'networks', 'tools', 'productivity']
  ),
  createSimpleTopic(
    'docker-advanced',
    'Продвинутый Docker',
    'Оптимизация образов, .dockerignore. Docker Swarm, Kubernetes основы. CI/CD интеграция',
    'advanced',
    ['docker', 'containers', 'devops', 'kubernetes', 'optimization', 'cicd', 'tools', 'productivity']
  ),
  // DevTools
  createSimpleTopic(
    'devtools-basics',
    'Основы DevTools',
    'Console: логи, ошибки. Elements: инспектор, стили. Network: запросы, статусы',
    'beginner',
    ['devtools', 'debugging', 'browser', 'console', 'basics', 'tools', 'productivity']
  ),
  createSimpleTopic(
    'devtools-intermediate',
    'DevTools средний уровень',
    'Sources: отладка, breakpoints. Performance: профилирование. Application: Storage, Cookies',
    'intermediate',
    ['devtools', 'debugging', 'browser', 'performance', 'profiling', 'tools', 'productivity']
  ),
  createSimpleTopic(
    'devtools-advanced',
    'Продвинутый DevTools',
    'Memory leaks, heap snapshots. Lighthouse, аудит производительности. Remote debugging, мобильная отладка',
    'advanced',
    ['devtools', 'debugging', 'browser', 'performance', 'memory', 'lighthouse', 'tools', 'productivity']
  ),
  // Cursor
  createSimpleTopic(
    'cursor-basics',
    'Основы Cursor',
    'Интерфейс, настройка, базовое использование AI. Автодополнение, быстрые команды, чат с AI',
    'beginner',
    ['cursor', 'editor', 'ai', 'basics', 'tools', 'productivity']
  ),
  createSimpleTopic(
    'cursor-intermediate',
    'Cursor средний уровень',
    'Продвинутые AI возможности: рефакторинг, генерация кода, объяснение кода. Настройка промптов, контекстные команды',
    'intermediate',
    ['cursor', 'editor', 'ai', 'refactoring', 'code-generation', 'tools', 'productivity']
  ),
  createSimpleTopic(
    'cursor-advanced',
    'Продвинутый Cursor',
    'Кастомные AI модели, интеграции, расширения. Оптимизация workflow, продвинутые промпты, работа с большими проектами',
    'advanced',
    ['cursor', 'editor', 'ai', 'custom-models', 'integrations', 'workflow', 'tools', 'productivity']
  ),
  // AI Tools
  createSimpleTopic(
    'ai-tools-basics',
    'Основы AI инструментов',
    'ChatGPT, Copilot, базовое использование AI. Промпты: формулировка задач. GitHub Copilot: автодополнение',
    'beginner',
    ['ai', 'chatgpt', 'copilot', 'prompts', 'basics', 'tools', 'productivity']
  ),
  createSimpleTopic(
    'ai-tools-intermediate',
    'AI инструменты средний уровень',
    'Продвинутые промпты: few-shot, chain-of-thought. Рефакторинг с AI. Генерация тестов, документации',
    'intermediate',
    ['ai', 'prompts', 'refactoring', 'testing', 'documentation', 'tools', 'productivity']
  ),
  createSimpleTopic(
    'ai-tools-advanced',
    'Продвинутые AI инструменты',
    'Fine-tuning моделей. AI в CI/CD: авторевью, автотесты. Локальные модели: Ollama, LM Studio',
    'advanced',
    ['ai', 'fine-tuning', 'cicd', 'local-models', 'ollama', 'tools', 'productivity']
  ),
  // Testing
  createSimpleTopic(
    'testing-basics',
    'Основы тестирования',
    'Unit тесты, интеграционные тесты, Jest, Vitest. Настройка, базовые матчеры, describe/it, beforeEach/afterEach',
    'beginner',
    ['testing', 'jest', 'vitest', 'unit-tests', 'basics', 'tools', 'productivity']
  ),
  createSimpleTopic(
    'testing-intermediate',
    'Тестирование средний уровень',
    'Mocking, spies, stubs. Тестирование асинхронного кода, промисов, async/await. Snapshot тесты, покрытие кода',
    'intermediate',
    ['testing', 'jest', 'vitest', 'mocking', 'async', 'snapshots', 'coverage', 'tools', 'productivity']
  ),
  createSimpleTopic(
    'testing-advanced',
    'Продвинутое тестирование',
    'E2E тесты: Playwright, Cypress. Тестирование производительности, нагрузочное тестирование. TDD/BDD подходы, тестирование архитектуры',
    'advanced',
    ['testing', 'e2e', 'playwright', 'cypress', 'performance', 'tdd', 'bdd', 'architecture', 'tools', 'productivity']
  )
]);

// TYPESCRIPT категория
const TYPESCRIPT_TOPICS: Topic[] = [
  createSimpleTopic(
    'ts-basics',
    'Основы TypeScript',
    'Типы, интерфейсы, type vs interface',
    'beginner',
    ['typescript', 'types', 'basics']
  ),
  createSimpleTopic(
    'ts-generics',
    'Дженерики',
    'Generic типы, constraints, utility types',
    'intermediate',
    ['typescript', 'generics', 'advanced']
  ),
  createSimpleTopic(
    'ts-utilities',
    'Utility Types',
    'Partial, Pick, Omit, Record и другие утилиты',
    'intermediate',
    ['typescript', 'utilities', 'types']
  ),
  createSimpleTopic(
    'ts-advanced',
    'Продвинутый TypeScript',
    'Conditional types, mapped types, template literal types',
    'advanced',
    ['typescript', 'advanced', 'types']
  )
];

// FRAMEWORKS категория
const FRAMEWORKS_TOPICS: Topic[] = [
  createSimpleTopic(
    'react-basics',
    'Основы React',
    'Компоненты, props, state, hooks',
    'beginner',
    ['react', 'components', 'hooks']
  ),
  createSimpleTopic(
    'react-hooks',
    'React Hooks',
    'useState, useEffect, useContext, кастомные хуки',
    'intermediate',
    ['react', 'hooks', 'state']
  ),
  createSimpleTopic(
    'vue-basics',
    'Основы Vue',
    'Компоненты, реактивность, директивы',
    'beginner',
    ['vue', 'components', 'reactivity']
  ),
  createSimpleTopic(
    'svelte-basics',
    'Основы Svelte',
    'Компоненты, реактивность, stores',
    'beginner',
    ['svelte', 'components', 'reactivity']
  )
];

// ARCHITECTURE категория
const ARCHITECTURE_TOPICS: Topic[] = [
  createSimpleTopic(
    'design-patterns',
    'Паттерны проектирования',
    'Singleton, Factory, Observer, MVC, MVP',
    'intermediate',
    ['patterns', 'architecture', 'design']
  ),
  createSimpleTopic(
    'clean-code',
    'Чистый код',
    'SOLID принципы, код-ревью, рефакторинг',
    'intermediate',
    ['clean-code', 'solid', 'best-practices']
  ),
  createSimpleTopic(
    'project-structure',
    'Структура проекта',
    'Организация файлов, модули, архитектура приложений',
    'intermediate',
    ['architecture', 'structure', 'organization']
  )
];

// SECURITY категория
const SECURITY_TOPICS: Topic[] = [
  createSimpleTopic(
    'xss-protection',
    'Защита от XSS',
    'Cross-Site Scripting, санитизация, CSP',
    'intermediate',
    ['security', 'xss', 'csp']
  ),
  createSimpleTopic(
    'csrf-protection',
    'Защита от CSRF',
    'Cross-Site Request Forgery, токены, SameSite cookies',
    'intermediate',
    ['security', 'csrf', 'cookies']
  ),
  createSimpleTopic(
    'cors-basics',
    'CORS',
    'Cross-Origin Resource Sharing, preflight, credentials',
    'intermediate',
    ['security', 'cors', 'http']
  ),
  createSimpleTopic(
    'data-protection',
    'Защита данных',
    'Хеширование, шифрование, безопасное хранение',
    'advanced',
    ['security', 'encryption', 'hashing']
  )
];

// NETWORK категория
const NETWORK_TOPICS: Topic[] = [
  createSimpleTopic(
    'http-basics',
    'Основы HTTP',
    'Методы, статус коды, заголовки, протокол',
    'beginner',
    ['http', 'network', 'protocol']
  ),
  createSimpleTopic(
    'rest-api',
    'REST API',
    'REST принципы, ресурсы, методы, статусы',
    'intermediate',
    ['rest', 'api', 'http']
  ),
  createSimpleTopic(
    'graphql-basics',
    'GraphQL',
    'Запросы, мутации, схемы, резолверы',
    'intermediate',
    ['graphql', 'api', 'queries']
  ),
  createSimpleTopic(
    'websocket',
    'WebSocket',
    'Двусторонняя связь, события, переподключение',
    'intermediate',
    ['websocket', 'realtime', 'network']
  )
];

// OPTIMIZATION категория
const OPTIMIZATION_TOPICS: Topic[] = [
  createSimpleTopic(
    'performance-basics',
    'Основы производительности',
    'Метрики, профилирование, бенчмарки',
    'beginner',
    ['performance', 'metrics', 'profiling']
  ),
  createSimpleTopic(
    'code-optimization',
    'Оптимизация кода',
    'Алгоритмы, структуры данных, оптимизация циклов',
    'intermediate',
    ['optimization', 'algorithms', 'performance']
  ),
  createSimpleTopic(
    'bundle-optimization',
    'Оптимизация бандла',
    'Code splitting, tree shaking, lazy loading',
    'intermediate',
    ['bundling', 'webpack', 'optimization']
  ),
  createSimpleTopic(
    'runtime-optimization',
    'Оптимизация рантайма',
    'Мемоизация, дебаунс, троттлинг, виртуализация',
    'advanced',
    ['performance', 'optimization', 'runtime']
  )
];

// Данные по категориям
export const META_CATEGORIES_DATA: Record<MetaCategoryId, Category[]> = {
  javascript: [], // Будет заполнено динамически из существующего KNOWLEDGE_BASE
  markup: [
    {
      id: 'html',
      title: 'HTML',
      topics: MARKUP_TOPICS.filter(t => t.id.startsWith('html'))
    },
    {
      id: 'css',
      title: 'CSS',
      topics: MARKUP_TOPICS.filter(t => t.id.startsWith('css') || t.id.startsWith('responsive'))
    }
  ],
  tools: [
    {
      id: 'git',
      title: 'Git',
      topics: TOOLS_TOPICS.filter(t => t.id.startsWith('git'))
    },
    {
      id: 'terminal',
      title: 'Terminal',
      topics: TOOLS_TOPICS.filter(t => t.id.startsWith('terminal'))
    },
    {
      id: 'npm',
      title: 'npm',
      topics: TOOLS_TOPICS.filter(t => t.id.startsWith('npm'))
    },
    {
      id: 'docker',
      title: 'Docker',
      topics: TOOLS_TOPICS.filter(t => t.id.startsWith('docker'))
    },
    {
      id: 'devtools',
      title: 'DevTools',
      topics: TOOLS_TOPICS.filter(t => t.id.startsWith('devtools'))
    },
    {
      id: 'cursor',
      title: 'Cursor',
      topics: TOOLS_TOPICS.filter(t => t.id.startsWith('cursor'))
    },
    {
      id: 'ai',
      title: 'AI инструменты',
      topics: TOOLS_TOPICS.filter(t => t.id.startsWith('ai-tools'))
    },
    {
      id: 'testing',
      title: 'Тестирование',
      topics: TOOLS_TOPICS.filter(t => t.id.startsWith('testing'))
    }
  ],
  typescript: [
    {
      id: 'ts-basics-cat',
      title: 'Основы TypeScript',
      topics: TYPESCRIPT_TOPICS.filter(t => t.id === 'ts-basics')
    },
    {
      id: 'ts-advanced-cat',
      title: 'Продвинутый TypeScript',
      topics: TYPESCRIPT_TOPICS.filter(t => t.id.startsWith('ts-') && t.id !== 'ts-basics')
    }
  ],
  frameworks: [
    {
      id: 'react',
      title: 'React',
      topics: FRAMEWORKS_TOPICS.filter(t => t.id.startsWith('react'))
    },
    {
      id: 'vue',
      title: 'Vue',
      topics: FRAMEWORKS_TOPICS.filter(t => t.id.startsWith('vue'))
    },
    {
      id: 'svelte',
      title: 'Svelte',
      topics: FRAMEWORKS_TOPICS.filter(t => t.id.startsWith('svelte'))
    }
  ],
  architecture: [
    {
      id: 'patterns',
      title: 'Паттерны и принципы',
      topics: ARCHITECTURE_TOPICS
    }
  ],
  security: [
    {
      id: 'web-security',
      title: 'Веб-безопасность',
      topics: SECURITY_TOPICS
    }
  ],
  network: [
    {
      id: 'protocols',
      title: 'Протоколы и API',
      topics: NETWORK_TOPICS
    }
  ],
  optimization: [
    {
      id: 'performance',
      title: 'Производительность',
      topics: OPTIMIZATION_TOPICS
    }
  ]
};

