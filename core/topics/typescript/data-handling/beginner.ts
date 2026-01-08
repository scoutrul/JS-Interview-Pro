import { Topic } from '../../../types';

export const TYPESCRIPT_DATA_HANDLING_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'ts-api-typing',
    title: 'Типизация ответа API',
    description: 'Типизация API ответов через interface или type позволяет обеспечить типобезопасность при работе с внешними данными. Позволяет получить автодополнение и проверку типов на этапе разработки.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'api', 'typing', 'data', 'basics', 'fundamentals'],
    keyPoints: [
      'Interface/type для структуры: описание ожидаемой структуры ответа API.',
      'Практика: типизация всех API endpoints, создание переиспользуемых типов.',
      'Автодополнение: IDE предлагает доступные свойства ответа.',
      'Проверка типов: ошибки обнаруживаются на этапе компиляции.'
    ],
    examples: [
      {
        title: 'Типизация API ответа',
        code: `// Определение типа ответа
interface ApiUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

// Использование
async function fetchUser(id: number): Promise<ApiUser> {
  const response = await fetch(\`/api/users/\${id}\`);
  const data = await response.json();
  return data; // ✅ Типизированный ответ
}

const user = await fetchUser(1);
user.name; // ✅ Автодополнение работает`
      },
      {
        title: 'Типизация ошибок',
        code: `interface ApiError {
  message: string;
  code: number;
  details?: Record<string, any>;
}

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}`
      }
    ],
    relatedTopics: ['ts-data-validation', 'ts-partial-updates']
  },
  {
    id: 'ts-data-validation',
    title: 'Безопасное преобразование данных',
    description: 'Type guards и assertion functions позволяют безопасно преобразовывать данные неизвестного типа в типизированные структуры. Критично для валидации данных из внешних источников (API, формы, localStorage).',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'validation', 'type-guards', 'data', 'basics', 'fundamentals'],
    keyPoints: [
      'Type guards: функции с предикатом типа (value is Type) для проверки структуры.',
      'Assertion functions: функции, которые выбрасывают ошибку при невалидных данных.',
      'Практика: валидация API ответов, проверка данных форм, работа с localStorage.',
      'Безопасность: проверка на этапе выполнения перед использованием данных.'
    ],
    examples: [
      {
        title: 'Type guard для валидации',
        code: `interface User {
  id: number;
  name: string;
  email: string;
}

function isValidUser(data: unknown): data is User {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;
  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string"
  );
}

async function fetchUser(id: number): Promise<User | null> {
  const response = await fetch(\`/api/users/\${id}\`);
  const data = await response.json();

  if (isValidUser(data)) {
    return data; // ✅ Тип User
  }

  return null;
}`
      },
      {
        title: 'Assertion function',
        code: `function assertIsUser(data: unknown): asserts data is User {
  if (!isValidUser(data)) {
    throw new Error("Invalid user data");
  }
}

function processUser(data: unknown) {
  assertIsUser(data);
  // После вызова data - User
  console.log(data.name, data.email); // ✅`
      }
    ],
    relatedTopics: ['ts-type-guards', 'ts-assertion-functions']
  },
  {
    id: 'ts-partial-updates',
    title: 'Работа с частичными объектами',
    description: 'Partial<T> utility type позволяет работать с частичными обновлениями объектов. Полезно для функций обновления, где нужно изменить только некоторые свойства объекта, не трогая остальные.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['typescript', 'partial', 'updates', 'data', 'basics', 'fundamentals'],
    keyPoints: [
      'Partial<T>: делает все свойства опциональными.',
      'Практика: функции обновления состояния, PATCH запросы, частичные обновления форм.',
      'Комбинирование: можно комбинировать с другими utility types.',
      'Безопасность: TypeScript проверяет, что обновляемые свойства существуют.'
    ],
    examples: [
      {
        title: 'Обновление объекта',
        code: `interface User {
  name: string;
  age: number;
  email: string;
}

function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

const user: User = { name: "John", age: 30, email: "john@example.com" };

// Можно обновить только некоторые свойства
const updated = updateUser(user, { age: 31 }); // ✅
const updated2 = updateUser(user, { name: "Jane", email: "jane@example.com" }); // ✅`
      },
      {
        title: 'Обновление состояния',
        code: `type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

function updateState(
  state: UserState,
  updates: Partial<UserState>
): UserState {
  return { ...state, ...updates };
}

// Обновить только loading
updateState(state, { loading: true }); // ✅`
      }
    ],
    relatedTopics: ['ts-partial-required', 'ts-data-validation']
  }
];
