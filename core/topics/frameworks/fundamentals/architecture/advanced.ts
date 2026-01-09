import { Topic } from '../../../../types';

export const ARCHITECTURE_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'frameworks-architecture-clean',
    title: 'Clean Architecture',
    difficulty: 'advanced',
    description: 'Clean Architecture — это архитектурный подход, где код организован по уровням зависимостей: внешние слои зависят от внутренних, но не наоборот. Внутренние слои содержат бизнес-логику, внешние слои содержат детали реализации (UI, API, база данных).\n\nУровни Clean Architecture: Entities (бизнес-сущности), Use Cases (бизнес-правила), Interface Adapters (адаптеры для UI и API), Frameworks (фреймворки и инструменты). Зависимости идут внутрь: Frameworks → Interface Adapters → Use Cases → Entities.\n\nПреимущества Clean Architecture: независимость от фреймворков (бизнес-логика не зависит от React/Vue), легко тестировать (бизнес-логика изолирована), легко менять детали реализации (UI, API) без изменения бизнес-логики. Но это добавляет сложность: больше слоёв, больше абстракций.\n\nВ 2026 Clean Architecture стала популярной для больших проектов, где важна независимость от фреймворков и долгосрочная поддержка. Она требует больше кода, но даёт больше гибкости. Понимание Clean Architecture критично для создания масштабируемых приложений.',
    keyPoints: [
      'Clean Architecture: организация по уровням зависимостей',
      'Уровни: Entities → Use Cases → Interface Adapters → Frameworks',
      'Зависимости идут внутрь: внешние зависят от внутренних',
      'Преимущества: независимость от фреймворков, легко тестировать, легко менять детали',
      'Добавляет сложность: больше слоёв, больше абстракций',
      'Популярна для больших проектов в 2026'
    ],
    funFact: 'Clean Architecture была описана Робертом Мартином (Uncle Bob) в 2012 году как развитие идей из Hexagonal Architecture и Onion Architecture. В веб-разработке это стало популярным с ростом сложности фронтенд приложений.',
    tags: ['frameworks', 'architecture', 'clean-architecture', 'layers', 'advanced', 'enterprise'],
    examples: [
      {
        title: 'Уровни Clean Architecture',
        code: `// Clean Architecture: уровни зависимостей
src/
├── domain/              # Entities (бизнес-сущности)
│   ├── entities/
│   │   ├── User.ts
│   │   └── Product.ts
│   └── use-cases/       # Use Cases (бизнес-правила)
│       ├── GetUser.ts
│       └── CreateProduct.ts
├── application/         # Interface Adapters
│   ├── adapters/
│   │   ├── ui/          # UI адаптеры
│   │   └── api/         # API адаптеры
│   └── repositories/
│       └── UserRepository.ts
└── infrastructure/      # Frameworks
    ├── react/           # React компоненты
    ├── api/             # API клиент
    └── storage/         # Хранилище

// Зависимости: infrastructure → application → domain
// Domain не зависит от infrastructure`
      },
      {
        title: 'Независимость от фреймворков',
        code: `// Domain: бизнес-логика без зависимостей
// domain/use-cases/GetUser.ts
export class GetUser {
  constructor(private userRepository: UserRepository) {}
  
  async execute(userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }
}

// Не зависит от React, Vue, Angular
// Можно использовать с любым фреймворком

// Infrastructure: адаптер для React
// infrastructure/react/UserComponent.tsx
import { GetUser } from '../../domain/use-cases/GetUser';

export function UserComponent({ userId }: { userId: string }) {
  const getUser = new GetUser(userRepository);
  const user = await getUser.execute(userId);
  return <div>{user.name}</div>;
}

// Преимущество: можно заменить React на Vue
// Бизнес-логика остаётся неизменной`
      },
      {
        title: 'Тестирование',
        code: `// Clean Architecture упрощает тестирование
// Domain: бизнес-логика изолирована
// domain/use-cases/GetUser.ts
export class GetUser {
  constructor(private userRepository: UserRepository) {}
  
  async execute(userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }
}

// Тест: мокируем repository
test('GetUser should return user', async () => {
  const mockRepository = {
    findById: jest.fn().mockResolvedValue({ id: '1', name: 'Иван' })
  };
  const getUser = new GetUser(mockRepository);
  const user = await getUser.execute('1');
  expect(user.name).toBe('Иван');
});

// Преимущество: бизнес-логика тестируется изолированно
// Не нужно мокировать React, API, хранилище`
      }
    ],
    relatedTopics: ['frameworks-architecture-hexagonal', 'frameworks-architecture-modular-monolith'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-architecture-hexagonal',
    title: 'Hexagonal architecture',
    difficulty: 'advanced',
    description: 'Hexagonal Architecture (Ports and Adapters) — это архитектурный подход, где приложение имеет порты (интерфейсы) и адаптеры (реализации). Порт определяет интерфейс, адаптер реализует его для конкретной технологии. Это создаёт независимость от внешних зависимостей.\n\nПорты делятся на: входные порты (driving ports) для получения данных (UI, API), выходные порты (driven ports) для отправки данных (база данных, внешние API). Адаптеры реализуют порты: React компоненты для входных портов, API клиенты для выходных портов.\n\nПреимущества Hexagonal Architecture: независимость от технологий (можно заменить React на Vue, REST на GraphQL), легко тестировать (мокировать адаптеры), легко интегрировать (новые адаптеры для новых технологий). Но это добавляет сложность: больше интерфейсов, больше абстракций.\n\nВ 2026 Hexagonal Architecture стала популярной для больших проектов, где важна независимость от технологий. Она требует больше кода, но даёт больше гибкости. Понимание Hexagonal Architecture критично для создания гибких приложений.',
    keyPoints: [
      'Hexagonal Architecture: порты (интерфейсы) и адаптеры (реализации)',
      'Входные порты: получение данных (UI, API)',
      'Выходные порты: отправка данных (база данных, внешние API)',
      'Преимущества: независимость от технологий, легко тестировать, легко интегрировать',
      'Добавляет сложность: больше интерфейсов, больше абстракций',
      'Популярна для больших проектов в 2026'
    ],
    funFact: 'Hexagonal Architecture была описана Алистером Кокберном в 2005 году как способ создания независимых от технологий приложений. Название "hexagonal" происходит от визуализации, где приложение в центре, а адаптеры по краям.',
    tags: ['frameworks', 'architecture', 'hexagonal', 'ports-adapters', 'advanced', 'enterprise'],
    examples: [
      {
        title: 'Порты и адаптеры',
        code: `// Hexagonal Architecture: порты и адаптеры
// Порт: интерфейс
// domain/ports/UserRepository.ts
export interface UserRepository {
  findById(id: string): Promise<User>;
  save(user: User): Promise<void>;
}

// Адаптер: реализация
// infrastructure/adapters/UserRepositoryImpl.ts
export class UserRepositoryImpl implements UserRepository {
  async findById(id: string): Promise<User> {
    // Реализация для конкретной технологии
    const response = await fetch(\`/api/users/\${id}\`);
    return response.json();
  }
  
  async save(user: User): Promise<void> {
    await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  }
}

// Преимущество: можно заменить адаптер
// Не меняя бизнес-логику`
      },
      {
        title: 'Входные и выходные порты',
        code: `// Входные порты (driving): получение данных
// domain/ports/GetUserUseCase.ts
export interface GetUserUseCase {
  execute(userId: string): Promise<User>;
}

// Адаптер для UI (React)
// infrastructure/ui/UserComponent.tsx
export function UserComponent({ userId }: { userId: string }) {
  const getUser = useGetUser(); // Использует GetUserUseCase
  const user = await getUser.execute(userId);
  return <div>{user.name}</div>;
}

// Выходные порты (driven): отправка данных
// domain/ports/UserRepository.ts
export interface UserRepository {
  findById(id: string): Promise<User>;
}

// Адаптер для API
// infrastructure/api/UserRepositoryImpl.ts
export class UserRepositoryImpl implements UserRepository {
  async findById(id: string): Promise<User> {
    return apiClient.get(\`/users/\${id}\`);
  }
}

// Преимущество: независимость от технологий`
      },
      {
        title: 'Замена адаптеров',
        code: `// Можно заменить адаптеры без изменения бизнес-логики
// Было: REST API
class UserRepositoryImpl implements UserRepository {
  async findById(id: string) {
    return fetch(\`/api/users/\${id}\`).then(r => r.json());
  }
}

// Стало: GraphQL
class UserRepositoryGraphQL implements UserRepository {
  async findById(id: string) {
    return graphqlClient.query(\`
      query { user(id: "\${id}") { id name } }
    \`);
  }
}

// Бизнес-логика не изменилась
// Только адаптер заменили

// Преимущество: гибкость
// Можно использовать разные технологии
// Не меняя бизнес-логику`
      }
    ],
    relatedTopics: ['frameworks-architecture-clean', 'frameworks-architecture-modular-monolith'],
    isFrontendEssential: false
  },
  {
    id: 'frameworks-architecture-modular-monolith',
    title: 'Modular monolith',
    difficulty: 'advanced',
    description: 'Modular monolith — это архитектурный подход, где приложение организовано как монолит, но с чёткими границами модулей. Каждый модуль инкапсулирует свою функциональность и может быть выделен в отдельный сервис при необходимости. Это даёт преимущества монолита (простота развёртывания) и микросервисов (модульность).\n\nМодули в modular monolith: каждый модуль имеет свою структуру (components/, hooks/, api/), чёткие границы (публичный API через index.ts), независимое состояние (собственное хранилище). Модули взаимодействуют через явные интерфейсы, а не через общее состояние.\n\nПреимущества modular monolith: простота развёртывания (один бандл), модульность (чёткие границы), легко масштабировать команду (команды работают над модулями), легко мигрировать в микросервисы (модули уже выделены). Но это требует дисциплины: нужно поддерживать границы модулей.\n\nВ 2026 modular monolith стал популярным как компромисс между монолитом и микросервисами. Он даёт модульность без сложности микросервисов. Понимание modular monolith критично для создания масштабируемых приложений.',
    keyPoints: [
      'Modular monolith: монолит с чёткими границами модулей',
      'Модули: инкапсулируют функциональность, чёткие границы, независимое состояние',
      'Взаимодействие через явные интерфейсы, а не через общее состояние',
      'Преимущества: простота развёртывания, модульность, легко масштабировать команду',
      'Требует дисциплины: поддерживать границы модулей',
      'Популярен как компромисс между монолитом и микросервисами'
    ],
    funFact: 'Modular monolith был популяризирован Саймоном Брауном в 2010-х годах как решение проблем микросервисов. Идея в том, что можно получить модульность без сложности распределённых систем.',
    tags: ['frameworks', 'architecture', 'modular-monolith', 'modules', 'advanced', 'scaling'],
    examples: [
      {
        title: 'Модули в modular monolith',
        code: `// Modular monolith: модули с чёткими границами
src/
├── modules/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── store/
│   │   └── index.ts      # Публичный API
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── store/
│   │   └── index.ts
│   └── settings/
│       ├── components/
│       ├── hooks/
│       ├── api/
│       ├── store/
│       └── index.ts
└── shared/               # Общие компоненты
    ├── components/
    └── utils/

// Каждый модуль: самодостаточен
// Чёткие границы через публичный API`
      },
      {
        title: 'Взаимодействие модулей',
        code: `// Модули взаимодействуют через явные интерфейсы
// modules/auth/index.ts (публичный API)
export { useAuth } from './hooks/useAuth';
export type { User } from './types';

// modules/dashboard/index.ts
import { useAuth } from '../auth';

export function Dashboard() {
  const { user } = useAuth(); // Использует публичный API
  return <div>Добро пожаловать, {user.name}</div>;
}

// ❌ Плохо: прямой доступ к внутренностям модуля
import { authStore } from '../auth/store'; // Нарушает границы

// ✅ Хорошо: через публичный API
import { useAuth } from '../auth'; // Через публичный API

// Преимущество: границы модулей защищены`
      },
      {
        title: 'Миграция в микросервисы',
        code: `// Modular monolith: легко мигрировать в микросервисы
// Модули уже выделены, границы чёткие

// Было: modular monolith
modules/
├── auth/
├── dashboard/
└── settings/

// Стало: микросервисы
services/
├── auth-service/      # Выделен из modules/auth
├── dashboard-service/ # Выделен из modules/dashboard
└── settings-service/   # Выделен из modules/settings

// Преимущество: модули уже готовы к выделению
// Нужно только добавить API и развернуть отдельно

// Недостаток: нужно добавить межсервисную коммуникацию
// Но структура уже готова`
      }
    ],
    relatedTopics: ['frameworks-architecture-clean', 'frameworks-architecture-hexagonal'],
    isFrontendEssential: false
  }
];
