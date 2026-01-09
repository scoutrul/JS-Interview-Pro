import { Topic } from '../../../../types';

export const ARCHITECTURE_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'frameworks-architecture-feature-based',
    title: 'Feature-based структура',
    difficulty: 'intermediate',
    description: 'Feature-based структура — это организация кода по бизнес-функциям, а не по типам файлов. Вместо components/, hooks/, utils/ используется features/auth/, features/dashboard/, features/settings/, где каждая функция содержит все необходимые файлы. Это создаёт инкапсуляцию: всё для функции в одном месте.\n\nПреимущества feature-based структуры: легко найти код для конкретной функции, легко понять связи между компонентами, легко добавлять новые функции, команды могут работать параллельно над разными функциями. Это особенно важно для больших проектов и командной разработки.\n\nСтруктура функции включает: components/ для компонентов функции, hooks/ для хуков функции, utils/ для утилит функции, types/ для типов функции, api/ для API функции. Это создаёт самодостаточные модули, которые можно легко перемещать или удалять.\n\nВ 2026 feature-based структура стала стандартом для больших проектов. Она упрощает масштабирование команды и приложения, делая код более организованным. Понимание feature-based структуры критично для работы над большими проектами.',
    keyPoints: [
      'Feature-based: организация по бизнес-функциям, а не по типам файлов',
      'Создаёт инкапсуляцию: всё для функции в одном месте',
      'Преимущества: легко найти код, понять связи, добавлять функции',
      'Структура функции: components/, hooks/, utils/, types/, api/',
      'Самодостаточные модули, легко перемещать или удалять',
      'Стандарт для больших проектов в 2026'
    ],
    funFact: 'Feature-based структура была популяризирована в 2010-х годах как решение проблем разделения по типам файлов в больших проектах. Идея пришла из domain-driven design, где код организуется по доменам бизнеса.',
    tags: ['frameworks', 'architecture', 'feature-based', 'organization', 'intermediate', 'scaling'],
    examples: [
      {
        title: 'Feature-based структура',
        code: `// Feature-based: организация по функциям
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── api/
│   │   │   └── authApi.ts
│   │   └── types/
│   │       └── user.ts
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── api/
│   └── settings/
│       ├── components/
│       ├── hooks/
│       └── api/
├── shared/         # Общие компоненты
│   ├── components/
│   └── utils/
└── core/           # Ядро приложения
    ├── api/
    └── store/

// Преимущество: всё для функции в одном месте
// Легко найти код для "авторизация"`
      },
      {
        title: 'Инкапсуляция функции',
        code: `// Функция auth: самодостаточный модуль
features/auth/
├── components/
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
├── hooks/
│   └── useAuth.ts
├── api/
│   └── authApi.ts
├── types/
│   └── user.ts
└── index.ts        # Публичный API функции

// index.ts экспортирует только публичный API
export { LoginForm, RegisterForm } from './components';
export { useAuth } from './hooks';
export type { User } from './types';

// Преимущество: инкапсуляция
// Внутренние детали скрыты
// Публичный API чётко определён`
      },
      {
        title: 'Параллельная разработка',
        code: `// Feature-based позволяет параллельную разработку
// Команда A работает над features/auth/
// Команда B работает над features/dashboard/
// Команда C работает над features/settings/

// Они не мешают друг другу:
// - Разные папки
// - Разные файлы
// - Минимум конфликтов

// Преимущество: масштабирование команды
// Несколько команд могут работать параллельно
// Не нужно ждать друг друга`
      }
    ],
    relatedTopics: ['frameworks-architecture-shared-core-domain', 'frameworks-architecture-clean'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-architecture-shared-core-domain',
    title: 'Shared / Core / Domain',
    difficulty: 'intermediate',
    description: 'Shared / Core / Domain — это трёхслойная архитектура для организации кода. Shared слой содержит общие компоненты и утилиты, используемые во всём приложении. Core слой содержит ядро приложения: API клиент, хранилище состояния, конфигурация. Domain слой содержит бизнес-логику: функции, типы, правила.\n\nРазделение на слои создаёт чёткие границы: Shared не зависит от Domain, Core не зависит от Domain, Domain не зависит от Shared или Core. Это создаёт предсказуемость: изменения в одном слое не влияют на другие слои.\n\nПреимущества трёхслойной архитектуры: чёткие границы ответственности, легко тестировать (каждый слой отдельно), легко масштабировать (добавлять новые функции в Domain). Но это добавляет сложность: больше папок, больше абстракций.\n\nВ 2026 трёхслойная архитектура стала популярной для больших проектов. Она упрощает организацию кода, создавая чёткие границы между общими компонентами, ядром приложения и бизнес-логикой. Понимание слоёв критично для создания масштабируемых приложений.',
    keyPoints: [
      'Трёхслойная архитектура: Shared / Core / Domain',
      'Shared: общие компоненты и утилиты',
      'Core: ядро приложения (API, хранилище, конфигурация)',
      'Domain: бизнес-логика (функции, типы, правила)',
      'Чёткие границы: изменения в одном слое не влияют на другие',
      'Популярна для больших проектов в 2026'
    ],
    funFact: 'Трёхслойная архитектура пришла из enterprise разработки, где разделение на слои критично для масштабирования. В веб-разработке это стало популярным с ростом сложности фронтенд приложений.',
    tags: ['frameworks', 'architecture', 'layers', 'shared', 'core', 'domain', 'intermediate'],
    examples: [
      {
        title: 'Трёхслойная архитектура',
        code: `// Трёхслойная архитектура
src/
├── shared/         # Общие компоненты
│   ├── components/
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── utils/
│   │   └── formatDate.ts
│   └── hooks/
│       └── useLocalStorage.ts
├── core/           # Ядро приложения
│   ├── api/
│   │   └── client.ts
│   ├── store/
│   │   └── store.ts
│   └── config/
│       └── env.ts
└── domain/         # Бизнес-логика
    ├── auth/
    │   ├── types.ts
    │   ├── api.ts
    │   └── rules.ts
    └── products/
        ├── types.ts
        ├── api.ts
        └── rules.ts

// Границы: Domain → Core → Shared
// Domain использует Core, Core использует Shared`
      },
      {
        title: 'Границы между слоями',
        code: `// Чёткие границы между слоями
// Shared: не зависит ни от чего
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

// Core: зависит от Shared
import { formatDate } from '../shared/utils';
export function formatUserDate(user: User): string {
  return formatDate(user.createdAt);
}

// Domain: зависит от Core
import { apiClient } from '../core/api';
export async function fetchUser(id: string): Promise<User> {
  return apiClient.get(\`/users/\${id}\`);
}

// Преимущество: предсказуемость
// Изменения в Shared не влияют на Domain
// Изменения в Core не влияют на Shared`
      },
      {
        title: 'Преимущества слоёв',
        code: `// Трёхслойная архитектура даёт:
// 1. Чёткие границы ответственности
// Каждый слой знает свою роль
// Shared: общие компоненты
// Core: ядро приложения
// Domain: бизнес-логика

// 2. Легко тестировать
// Каждый слой тестируется отдельно
// Shared: unit тесты
// Core: integration тесты
// Domain: business logic тесты

// 3. Легко масштабировать
// Добавлять новые функции в Domain
// Не затрагивать Core и Shared
// Изменения изолированы`
      }
    ],
    relatedTopics: ['frameworks-architecture-feature-based', 'frameworks-architecture-clean'],
    isFrontendEssential: false
  }
];
