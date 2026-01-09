import { Topic } from '../../../../types';

export const STATE_MANAGEMENT_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'frameworks-state-management-server-vs-client',
    title: 'Server state vs Client state',
    difficulty: 'advanced',
    description: 'Разделение состояния на server state (серверное) и client state (клиентское) критично для правильной архитектуры. Server state — это данные, которые приходят с сервера и синхронизируются с ним. Client state — это локальное состояние приложения, которое не синхронизируется с сервером.\n\nServer state имеет особенности: кэширование, инвалидация, оптимистичные обновления, синхронизация. Client state проще: просто хранится локально, обновляется локально. Смешивание их создаёт проблемы: server state требует специальной обработки (кэш, синхронизация), client state не требует.\n\nБиблиотеки типа React Query, SWR, Apollo Client специализируются на server state: они управляют кэшированием, синхронизацией, инвалидацией. Redux, Zustand, Context лучше подходят для client state: простое локальное хранение.\n\nВ 2026 разделение стало стандартом: React Query для server state, Zustand для client state. Понимание различий критично для правильного выбора инструментов и архитектуры.',
    keyPoints: [
      'Server state: данные с сервера, требуют кэширования и синхронизации',
      'Client state: локальное состояние, не синхронизируется с сервером',
      'Server state требует специальной обработки: кэш, инвалидация, оптимистичные обновления',
      'Client state проще: просто хранится и обновляется локально',
      'React Query/SWR для server state, Redux/Zustand для client state',
      'Разделение стало стандартом в 2026'
    ],
    funFact: 'React Query был создан в 2019 году специально для управления server state. До этого разработчики использовали Redux для всего состояния, что создавало проблемы: server state требует кэширования и синхронизации, которые Redux не предоставляет из коробки.',
    tags: ['frameworks', 'state-management', 'server-state', 'client-state', 'caching', 'advanced', 'architecture'],
    examples: [
      {
        title: 'Server state: особенности',
        code: `// Server state: требует специальной обработки
import { useQuery, useMutation } from 'react-query';

function UserProfile({ userId }) {
  // Server state: кэширование, синхронизация, инвалидация
  const { data: user, isLoading } = useQuery(
    ['user', userId],
    () => fetchUser(userId),
    {
      staleTime: 5000, // Кэш на 5 секунд
      cacheTime: 10000 // Хранить в кэше 10 секунд
    }
  );
  
  const updateUser = useMutation(
    (data) => updateUser(userId, data),
    {
      onSuccess: () => {
        // Инвалидация кэша после обновления
        queryClient.invalidateQueries(['user', userId]);
      },
      onMutate: async (newData) => {
        // Оптимистичное обновление
        await queryClient.cancelQueries(['user', userId]);
        const previousUser = queryClient.getQueryData(['user', userId]);
        queryClient.setQueryData(['user', userId], newData);
        return { previousUser };
      }
    }
  );
  
  if (isLoading) return <Spinner />;
  return <div>{user.name}</div>;
}

// Server state требует: кэширование, синхронизация, инвалидация`
      },
      {
        title: 'Client state: простота',
        code: `// Client state: просто хранится локально
import { useState } from 'react';

function Form() {
  // Client state: просто хранится и обновляется
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  const [isDirty, setIsDirty] = useState(false);
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };
  
  return (
    <form>
      <input 
        value={formData.name}
        onChange={e => handleChange('name', e.target.value)}
      />
    </form>
  );
}

// Client state не требует:
// - Кэширования
// - Синхронизации
// - Инвалидации
// Просто хранится и обновляется локально`
      },
      {
        title: 'Разделение server и client state',
        code: `// ✅ Правильно: разделение
import { useQuery } from 'react-query';
import { useStore } from 'zustand';

// Server state: React Query
function UserProfile({ userId }) {
  const { data: user } = useQuery(['user', userId], () => fetchUser(userId));
  // Server state: кэширование, синхронизация
}

// Client state: Zustand
const useUIStore = create((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen }))
}));

function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  // Client state: просто локальное хранение
}

// ❌ Плохо: смешивание
const store = {
  user: null, // Server state в Redux
  sidebarOpen: false // Client state в Redux
};
// Проблема: server state требует специальной обработки, которую Redux не предоставляет`
      }
    ],
    relatedTopics: ['frameworks-state-management-global-smell', 'frameworks-state-management-state-machines'],
    isFrontendEssential: false
  },
  {
    id: 'frameworks-state-management-global-smell',
    title: 'Глобальное состояние как smell',
    difficulty: 'advanced',
    description: 'Глобальное состояние — это антипаттерн, когда состояние используется глобально, хотя должно быть локальным. Это создаёт проблемы: тесная связанность, сложность тестирования, непредсказуемость. Глобальное состояние должно использоваться только когда действительно нужно многим компонентам в разных частях приложения.\n\nПризнаки неправильного использования глобального состояния: состояние используется только в одном компоненте, состояние используется только в компонентах-братьях, состояние можно передать через props. В этих случаях глобальное состояние — это smell, который усложняет код.\n\nРешения: поднять состояние к общему родителю (lifted state), использовать композицию для уменьшения уровней, использовать Context только для действительно глобальных данных. Каждое решение имеет свои trade-offs, но понимание когда глобальное состояние — это smell критично для чистой архитектуры.\n\nВ 2026 инструменты (ESLint правила, TypeScript) помогают обнаруживать неправильное использование глобального состояния. Но понимание принципов остаётся важным для создания поддерживаемого кода.',
    keyPoints: [
      'Глобальное состояние — smell когда должно быть локальным',
      'Признаки: используется только в одном компоненте, только в братьях, можно передать через props',
      'Создаёт проблемы: тесная связанность, сложность тестирования, непредсказуемость',
      'Решения: lifted state, композиция, Context только для действительно глобальных данных',
      'Инструменты помогают обнаруживать неправильное использование',
      'Понимание принципов критично для чистой архитектуры'
    ],
    funFact: 'Термин "code smell" был введён Кентом Беком в 1999 году для описания признаков проблем в коде. Глобальное состояние стало классическим примером code smell в контексте управления состоянием.',
    tags: ['frameworks', 'state-management', 'antipatterns', 'global-state', 'advanced', 'refactoring'],
    examples: [
      {
        title: 'Глобальное состояние как smell',
        code: `// ❌ Плохо: глобальное состояние для локального использования
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 }))
}));

function Counter() {
  // Используется только в Counter, но хранится глобально
  const { count, increment } = useCounterStore();
  return <button onClick={increment}>{count}</button>;
}

// Проблема: глобальное состояние для локального использования
// Усложняет тестирование, создаёт ненужные зависимости

// ✅ Хорошо: локальное состояние
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Преимущество: простота, изоляция, легко тестировать`
      },
      {
        title: 'Глобальное для компонентов-братьев',
        code: `// ❌ Плохо: глобальное состояние для братьев
const useFormStore = create((set) => ({
  name: '',
  setName: (name) => set({ name })
}));

function App() {
  return (
    <div>
      <NameInput /> {/* Использует useFormStore */}
      <NameDisplay /> {/* Использует useFormStore */}
    </div>
  );
}

// Проблема: можно поднять состояние к App

// ✅ Хорошо: lifted state
function App() {
  const [name, setName] = useState('');
  return (
    <div>
      <NameInput name={name} setName={setName} />
      <NameDisplay name={name} />
    </div>
  );
}

// Преимущество: состояние ближе к использованию, проще понять`
      },
      {
        title: 'Когда глобальное состояние оправдано',
        code: `// ✅ Глобальное состояние оправдано: действительно глобальные данные
const useAuthStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null })
}));

// Используется в разных частях приложения:
// - Header (показать имя пользователя)
// - Sidebar (показать меню)
// - ProtectedRoute (проверить авторизацию)
// - Settings (редактировать профиль)

// Это действительно глобальные данные, глобальное состояние оправдано

// Критерии для глобального состояния:
// - Используется в разных частях приложения
// - Нельзя передать через props (слишком много уровней)
// - Требует синхронизации между компонентами`
      }
    ],
    relatedTopics: ['frameworks-state-management-server-vs-client', 'frameworks-state-management-state-machines'],
    isFrontendEssential: false
  },
  {
    id: 'frameworks-state-management-state-machines',
    title: 'State machines',
    difficulty: 'advanced',
    description: 'State machines (конечные автоматы) — это математическая модель для описания состояний и переходов между ними. В контексте управления состоянием state machines используются для сложных процессов с множеством состояний и переходов: формы с валидацией, модальные окна, процессы загрузки данных.\n\nState machine определяет: состояния (например: idle, loading, success, error), переходы между состояниями (например: idle → loading → success), условия переходов (например: при успешной загрузке → success). Это создаёт предсказуемость: всегда знаете в каком состоянии находитесь и какие переходы возможны.\n\nБиблиотеки типа XState предоставляют инструменты для создания state machines: визуализация состояний, тестирование переходов, отладка. State machines особенно полезны для сложных процессов, где обычное управление состоянием становится запутанным.\n\nВ 2026 state machines становятся популярными для сложных процессов. XState предоставляет мощные инструменты, но требует изучения. Понимание state machines критично для работы со сложными процессами.',
    keyPoints: [
      'State machines: математическая модель состояний и переходов',
      'Определяет: состояния, переходы, условия переходов',
      'Создаёт предсказуемость: всегда знаете состояние и возможные переходы',
      'Полезны для сложных процессов: формы, модальные окна, загрузка данных',
      'XState предоставляет инструменты: визуализация, тестирование, отладка',
      'Становятся популярными для сложных процессов в 2026'
    ],
    funFact: 'State machines были изобретены в 1950-х годах для описания поведения вычислительных систем. В веб-разработке они стали популярными с появлением XState в 2017 году, который адаптировал теорию конечных автоматов для управления состоянием в JavaScript.',
    tags: ['frameworks', 'state-management', 'state-machines', 'xstate', 'advanced', 'patterns'],
    examples: [
      {
        title: 'State machine для процесса загрузки',
        code: `// State machine: состояния и переходы
import { createMachine } from 'xstate';

const fetchMachine = createMachine({
  id: 'fetch',
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: 'loading'
      }
    },
    loading: {
      on: {
        SUCCESS: 'success',
        ERROR: 'error'
      }
    },
    success: {
      on: {
        FETCH: 'loading'
      }
    },
    error: {
      on: {
        RETRY: 'loading',
        RESET: 'idle'
      }
    }
  }
});

// Использование
function DataFetcher() {
  const [state, send] = useMachine(fetchMachine);
  
  return (
    <div>
      {state.matches('idle') && <button onClick={() => send('FETCH')}>Загрузить</button>}
      {state.matches('loading') && <Spinner />}
      {state.matches('success') && <Data data={data} />}
      {state.matches('error') && <Error onRetry={() => send('RETRY')} />}
    </div>
  );
}

// Преимущество: предсказуемость, всегда знаете состояние и возможные переходы`
      },
      {
        title: 'State machine для формы',
        code: `// State machine для сложной формы
const formMachine = createMachine({
  id: 'form',
  initial: 'editing',
  states: {
    editing: {
      on: {
        SUBMIT: 'validating'
      }
    },
    validating: {
      on: {
        VALID: 'submitting',
        INVALID: 'editing'
      }
    },
    submitting: {
      on: {
        SUCCESS: 'success',
        ERROR: 'error'
      }
    },
    success: {
      type: 'final'
    },
    error: {
      on: {
        RETRY: 'editing'
      }
    }
  }
});

// Преимущество: чёткие состояния и переходы
// Легко понять: в каком состоянии форма, какие действия возможны`
      },
      {
        title: 'Преимущества state machines',
        code: `// State machines дают:
// 1. Предсказуемость
// Всегда знаете состояние и возможные переходы
const state = 'loading';
// Возможные переходы: SUCCESS или ERROR

// 2. Визуализацию
// XState может визуализировать state machine
// Легко понять структуру процесса

// 3. Тестирование
// Можно тестировать переходы между состояниями
test('should transition from loading to success', () => {
  const machine = createMachine({...});
  const nextState = machine.transition('loading', 'SUCCESS');
  expect(nextState.value).toBe('success');
});

// 4. Отладку
// XState DevTools показывает текущее состояние и историю переходов
// Легко найти проблему в сложном процессе`
      }
    ],
    relatedTopics: ['frameworks-state-management-server-vs-client', 'frameworks-state-management-global-smell'],
    isFrontendEssential: false
  }
];
