import { Topic } from '../../../types';

export const REACT_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'react-server-components',
    title: 'Server Components',
    difficulty: 'intermediate',
    description: 'React Server Components — это парадигмальный сдвиг в React: компоненты могут выполняться на сервере, а не только на клиенте. Server Components рендерятся на сервере, отправляются как данные, и не требуют JavaScript на клиенте. Это снижает размер JavaScript бандла и улучшает производительность.\n\nПреимущества Server Components: меньше JavaScript на клиенте (компоненты не загружаются), прямой доступ к серверным ресурсам (база данных, файловая система), автоматический code splitting (загружаются только нужные компоненты). Но Server Components имеют ограничения: не могут использовать состояние, хуки, обработчики событий.\n\nГибридный подход: Server Components для статичного контента и данных, Client Components для интерактивности. Это даёт лучшее из обоих миров: меньше JavaScript для статики, интерактивность где нужно. Понимание Server Components критично для современной разработки на React.\n\nВ 2026 Server Components стали стандартом через Next.js 13+. Они решают проблемы производительности и размера бандла, делая React более эффективным. Понимание Server Components критично для работы с современным React.',
    keyPoints: [
      'Server Components: компоненты выполняются на сервере',
      'Преимущества: меньше JavaScript, прямой доступ к серверу, автоматический code splitting',
      'Ограничения: не могут использовать состояние, хуки, обработчики событий',
      'Гибридный подход: Server Components для статики, Client Components для интерактивности',
      'Стандарт через Next.js 13+ в 2026',
      'Критично для современной разработки на React'
    ],
    funFact: 'React Server Components были анонсированы в 2020 году, но стали доступны только в 2023 году через Next.js 13. Это один из самых значительных изменений в React с момента появления хуков, меняющий парадигму разработки.',
    tags: ['react', 'server-components', 'nextjs', 'ssr', 'intermediate', 'core'],
    examples: [
      {
        title: 'Server Components',
        code: `// Server Component (по умолчанию в Next.js 13+)
// app/components/UserProfile.tsx
async function UserProfile({ userId }) {
  // Выполняется на сервере
  // Прямой доступ к базе данных
  const user = await db.user.findUnique({ where: { id: userId } });
  
  // Не требует JavaScript на клиенте
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Преимущество: меньше JavaScript
// Данные загружаются на сервере
// Не нужно загружать компонент на клиенте`
      },
      {
        title: 'Client Components',
        code: `// Client Component (с директивой 'use client')
// app/components/Counter.tsx
'use client';

import { useState } from 'react';

function Counter() {
  // Может использовать состояние и хуки
  const [count, setCount] = useState(0);
  
  // Может иметь обработчики событий
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// Преимущество: интерактивность
// Может использовать все возможности React`
      },
      {
        title: 'Гибридный подход',
        code: `// Гибридный подход: Server + Client Components
// Server Component
async function Page() {
  const posts = await fetchPosts(); // На сервере
  
  return (
    <div>
      {/* Server Component: статичный контент */}
      <PostList posts={posts} />
      
      {/* Client Component: интерактивность */}
      <SearchForm />
    </div>
  );
}

// Преимущество: лучшее из обоих миров
// Статичный контент без JavaScript
// Интерактивность где нужно`
      }
    ],
    relatedTopics: ['react-concurrent-features', 'frameworks-rendering-ssr'],
    isFrontendEssential: true
  },
  {
    id: 'react-concurrent-features',
    title: 'Concurrent Features',
    difficulty: 'intermediate',
    description: 'Concurrent Features — это возможности React для приоритизации обновлений и прерывания рендеринга. startTransition помечает обновления как низкоприоритетные, useDeferredValue откладывает обновление значения, Suspense приостанавливает рендеринг до готовности данных. Это улучшает отзывчивость интерфейса.\n\nПриоритизация обновлений: высокоприоритетные обновления (пользовательский ввод) выполняются сразу, низкоприоритетные (рендеринг списка) могут быть отложены или прерваны. Это создаёт отзывчивый интерфейс: пользовательский ввод не блокируется долгими обновлениями.\n\nstartTransition и useDeferredValue: startTransition помечает обновления как низкоприоритетные, useDeferredValue откладывает обновление значения, давая приоритет более важным обновлениям. Это позволяет создавать отзывчивые интерфейсы даже при больших обновлениях.\n\nВ 2026 Concurrent Features стали стандартом React 18+. Они улучшают отзывчивость интерфейса, особенно для больших приложений. Понимание Concurrent Features критично для создания отзывчивых интерфейсов.',
    keyPoints: [
      'Concurrent Features: приоритизация обновлений и прерывание рендеринга',
      'startTransition: помечает обновления как низкоприоритетные',
      'useDeferredValue: откладывает обновление значения',
      'Suspense: приостанавливает рендеринг до готовности данных',
      'Улучшает отзывчивость: пользовательский ввод не блокируется',
      'Стандарт React 18+ в 2026'
    ],
    funFact: 'Concurrent Features были добавлены в React 18 в 2022 году после нескольких лет разработки. Они основаны на концепции "concurrent rendering", где React может прерывать рендеринг для более важных обновлений, что улучшает отзывчивость интерфейса.',
    tags: ['react', 'concurrent', 'startTransition', 'suspense', 'intermediate', 'core'],
    examples: [
      {
        title: 'startTransition',
        code: `// startTransition: низкоприоритетные обновления
import { startTransition, useState } from 'react';

function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  
  const handleChange = (value) => {
    // Высокоприоритетное: обновление input
    setQuery(value);
    
    // Низкоприоритетное: обновление результатов
    startTransition(() => {
      setResults(filterResults(value));
    });
  };
  
  return (
    <div>
      <input value={query} onChange={e => handleChange(e.target.value)} />
      <ResultsList results={results} />
    </div>
  );
}

// Преимущество: input остаётся отзывчивым
// Обновление результатов не блокирует ввод`
      },
      {
        title: 'useDeferredValue',
        code: `// useDeferredValue: отложенное обновление значения
import { useDeferredValue, useState } from 'react';

function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  
  // Отложенное значение: обновляется с задержкой
  const deferredQuery = useDeferredValue(query);
  
  useEffect(() => {
    // Используем отложенное значение
    setResults(filterResults(deferredQuery));
  }, [deferredQuery]);
  
  return (
    <div>
      <input value={query} />
      <ResultsList results={results} />
    </div>
  );
}

// Преимущество: query обновляется сразу
// results обновляются с задержкой
// Интерфейс остаётся отзывчивым`
      },
      {
        title: 'Suspense',
        code: `// Suspense: приостановка рендеринга
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <UserProfile />
    </Suspense>
  );
}

async function UserProfile() {
  // Приостанавливает рендеринг до готовности данных
  const user = await fetchUser();
  return <div>{user.name}</div>;
}

// Преимущество: показывает fallback во время загрузки
// Не блокирует рендеринг других компонентов
// Улучшает воспринимаемую производительность`
      }
    ],
    relatedTopics: ['react-optimization-rerenders', 'frameworks-reactivity-batching-scheduling'],
    isFrontendEssential: true
  },
  {
    id: 'react-optimization-rerenders',
    title: 'Оптимизация ререндеров',
    difficulty: 'intermediate',
    description: 'Оптимизация ререндеров — это предотвращение лишних перерисовок компонентов. React.memo предотвращает ререндеры при неизменных props, useMemo мемоизирует дорогие вычисления, useCallback мемоизирует функции. Это улучшает производительность, особенно для компонентов с дорогими вычислениями.\n\nReact.memo: обёртка для компонентов, которая предотвращает ререндеры если props не изменились. useMemo: мемоизирует результат вычисления, пересчитывая только при изменении зависимостей. useCallback: мемоизирует функцию, предотвращая создание новой функции при каждом рендере.\n\nКогда использовать: React.memo для компонентов, которые часто перерисовываются, useMemo для дорогих вычислений, useCallback для функций, передаваемых в дочерние компоненты. Но мемоизация имеет стоимость: память для кэша, сравнение зависимостей. Нужно балансировать между оптимизацией и сложностью.\n\nВ 2026 оптимизация ререндеров остаётся важной, но React Forget компилирует компоненты с автоматической оптимизацией, снижая необходимость ручной мемоизации. Но понимание принципов остаётся важным для оптимизации.',
    keyPoints: [
      'Оптимизация ререндеров: предотвращение лишних перерисовок',
      'React.memo: предотвращает ререндеры при неизменных props',
      'useMemo: мемоизирует дорогие вычисления',
      'useCallback: мемоизирует функции',
      'Когда использовать: часто перерисовывающиеся компоненты, дорогие вычисления',
      'React Forget автоматизирует оптимизацию в 2026'
    ],
    funFact: 'Оптимизация ререндеров стала одной из самых частых тем на собеседованиях по React. React.memo, useMemo и useCallback были добавлены в React 16.6 в 2018 году специально для решения проблем производительности.',
    tags: ['react', 'optimization', 'memo', 'useMemo', 'useCallback', 'intermediate', 'core'],
    examples: [
      {
        title: 'React.memo',
        code: `// React.memo: предотвращает ререндеры
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  // Дорогие вычисления
  const processed = expensiveProcessing(data);
  
  return <div>{processed}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({ value: 1 });
  
  return (
    <div>
      <p>{count}</p>
      {/* ExpensiveComponent не перерисовывается при изменении count */}
      <ExpensiveComponent data={data} />
    </div>
  );
}

// Преимущество: перерисовывается только при изменении data
// Не перерисовывается при изменении count`
      },
      {
        title: 'useMemo',
        code: `// useMemo: мемоизация дорогих вычислений
function Component({ items, filter }) {
  // Дорогое вычисление мемоизируется
  const filtered = useMemo(() => {
    return items.filter(item => 
      item.name.includes(filter)
    );
  }, [items, filter]); // Пересчитывается только при изменении items или filter
  
  return <List items={filtered} />;
}

// Преимущество: пересчёт только при изменении зависимостей
// Не пересчитывается при каждом рендере`
      },
      {
        title: 'useCallback',
        code: `// useCallback: мемоизация функций
function Parent() {
  const [count, setCount] = useState(0);
  
  // Функция мемоизируется
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]); // Не меняется если count не изменился
  
  return <Child onClick={handleClick} />;
}

const Child = React.memo(function Child({ onClick }) {
  // Child не перерисовывается если onClick не изменился
  return <button onClick={onClick}>Клик</button>;
});

// Преимущество: Child не перерисовывается
// Если handleClick не изменился`
      }
    ],
    relatedTopics: ['react-state-management', 'frameworks-performance-memoization'],
    isFrontendEssential: true
  },
  {
    id: 'react-state-management',
    title: 'Управление состоянием',
    difficulty: 'intermediate',
    description: 'Экосистема управления состоянием в React включает: Redux Toolkit (проверенное решение, большая экосистема), Zustand (простота, меньше кода), Jotai (атомарные stores, fine-grained обновления). Каждая библиотека решает свою задачу и подходит для разных сценариев.\n\nВыбор библиотеки зависит от требований: Redux Toolkit для больших проектов с сложным состоянием, Zustand для средних проектов с простым состоянием, Jotai для приложений с частыми точечными обновлениями. Context API подходит для простого глобального состояния, но не для частых обновлений.\n\nСовременный подход: разделение server state (React Query) и client state (Zustand). React Query управляет серверными данными (кэширование, синхронизация), Zustand управляет клиентским состоянием (UI состояние, настройки). Это создаёт чёткое разделение ответственности.\n\nВ 2026 разделение server и client state стало стандартом. React Query для server state, Zustand для client state. Понимание экосистемы управления состоянием критично для выбора правильного инструмента.',
    keyPoints: [
      'Экосистема: Redux Toolkit, Zustand, Jotai, Context API',
      'Redux Toolkit: для больших проектов с сложным состоянием',
      'Zustand: для средних проектов с простым состоянием',
      'Jotai: для приложений с частыми точечными обновлениями',
      'Современный подход: разделение server state (React Query) и client state (Zustand)',
      'Стандарт в 2026: React Query + Zustand'
    ],
    funFact: 'Zustand был создан в 2019 году как альтернатива Redux. Идея в том, что для большинства проектов не нужна сложность Redux, достаточно простого решения. За годы Zustand стал популярным выбором для новых проектов.',
    tags: ['react', 'state-management', 'redux', 'zustand', 'jotai', 'intermediate', 'core'],
    examples: [
      {
        title: 'Redux Toolkit',
        code: `// Redux Toolkit: для больших проектов
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count++;
    }
  }
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

function Component() {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  
  return (
    <button onClick={() => dispatch(counterSlice.actions.increment())}>
      {count}
    </button>
  );
}

// Преимущество: структура, инструменты, экосистема
// Недостаток: больше boilerplate`
      },
      {
        title: 'Zustand',
        code: `// Zustand: простота
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));

function Component() {
  const { count, increment } = useStore();
  
  return (
    <button onClick={increment}>
      {count}
    </button>
  );
}

// Преимущество: простота, меньше кода
// Недостаток: меньшая экосистема`
      },
      {
        title: 'Разделение server и client state',
        code: `// Современный подход: разделение
// React Query для server state
import { useQuery } from 'react-query';

function UserProfile({ userId }) {
  const { data: user } = useQuery(['user', userId], () => fetchUser(userId));
  // Server state: кэширование, синхронизация
}

// Zustand для client state
import { create } from 'zustand';

const useUIStore = create((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen }))
}));

function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  // Client state: просто локальное хранение
}

// Преимущество: чёткое разделение
// Server state: специальная обработка
// Client state: просто хранение`
      }
    ],
    relatedTopics: ['react-routing', 'frameworks-state-management-flux'],
    isFrontendEssential: true
  },
  {
    id: 'react-routing',
    title: 'Роутинг',
    difficulty: 'intermediate',
    description: 'Роутинг в React включает: React Router (библиотека роутинга) и file-based routing (Next.js). React Router предоставляет гибкость и контроль, file-based routing предоставляет простоту и конвенцию. Выбор зависит от требований: нужна ли гибкость или простота.\n\nReact Router: декларативный роутинг через компоненты, поддержка nested routes, guards, lazy loading. File-based routing: роутинг по структуре файлов, автоматический code splitting, конвенция над конфигурацией. Каждый подход имеет свои преимущества и подходит для разных сценариев.\n\nNested routes: вложенные маршруты, где дочерние маршруты рендерятся внутри родительских. Это позволяет создавать сложные структуры страниц с переиспользуемыми layout\'ами. React Router и Next.js поддерживают nested routes, но по-разному.\n\nВ 2026 file-based routing стал популярным через мета-фреймворки (Next.js, Remix). Он упрощает разработку, но React Router остаётся популярным для SPA без SSR. Понимание роутинга критично для создания навигации в React приложениях.',
    keyPoints: [
      'Роутинг: React Router (библиотека) vs file-based (Next.js)',
      'React Router: гибкость и контроль, file-based: простота и конвенция',
      'Nested routes: вложенные маршруты с переиспользуемыми layout\'ами',
      'Выбор зависит от требований: гибкость vs простота',
      'File-based популярен через мета-фреймворки в 2026',
      'Критично для создания навигации'
    ],
    funFact: 'React Router был создан в 2014 году Райаном Флоренсом и Майклом Джексоном как решение проблемы роутинга в SPA. За годы он стал стандартом для роутинга в React приложениях, используемым миллионами разработчиков.',
    tags: ['react', 'routing', 'react-router', 'nextjs', 'intermediate', 'core'],
    examples: [
      {
        title: 'React Router',
        code: `// React Router: декларативный роутинг
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

// Преимущество: гибкость, контроль
// Можно создавать сложные маршруты
// Guards, lazy loading, nested routes`
      },
      {
        title: 'File-based routing',
        code: `// Next.js: file-based routing
// pages/index.js → маршрут /
export default function Home() {
  return <h1>Главная</h1>;
}

// pages/about.js → маршрут /about
export default function About() {
  return <h1>О нас</h1>;
}

// pages/users/[id].js → маршрут /users/:id
export default function UserProfile({ id }) {
  return <h1>Пользователь: {id}</h1>;
}

// Преимущество: простота, конвенция
// Структура файлов определяет маршруты
// Автоматический code splitting`
      },
      {
        title: 'Nested routes',
        code: `// Nested routes в React Router
<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />
    <Route path="settings" element={<Settings />} />
    <Route path="profile" element={<Profile />} />
  </Route>
</Routes>

// DashboardLayout рендерит <Outlet /> для дочерних маршрутов
// /dashboard → DashboardHome
// /dashboard/settings → Settings
// /dashboard/profile → Profile

// Преимущество: переиспользуемые layout'ы
// Сложные структуры с общими частями`
      }
    ],
    relatedTopics: ['react-forms-validation', 'frameworks-meta-frameworks-file-based-routing'],
    isFrontendEssential: true
  },
  {
    id: 'react-forms-validation',
    title: 'Формы и валидация',
    difficulty: 'intermediate',
    description: 'Формы и валидация в React включают: React Hook Form (производительность, меньше ререндеров), Formik (простота, популярность), Zod (типобезопасная валидация). Каждая библиотека решает свою задачу: React Hook Form фокусируется на производительности, Formik на простоте, Zod на типобезопасности.\n\nReact Hook Form: использует uncontrolled компоненты по умолчанию, что снижает ререндеры. Formik: использует controlled компоненты, что проще для понимания. Zod: схема валидации, которая может использоваться с любой библиотекой форм. Выбор зависит от требований: производительность vs простота vs типобезопасность.\n\nИнтеграция с TypeScript: Zod предоставляет типобезопасную валидацию, генерируя типы из схем. Это создаёт единый источник истины: схема определяет и валидацию, и типы. Понимание форм и валидации критично для создания качественных форм.\n\nВ 2026 React Hook Form + Zod стал популярным выбором: производительность React Hook Form + типобезопасность Zod. Понимание форм и валидации критично для работы с формами в React.',
    keyPoints: [
      'Библиотеки: React Hook Form, Formik, Zod',
      'React Hook Form: производительность, меньше ререндеров',
      'Formik: простота, популярность',
      'Zod: типобезопасная валидация',
      'React Hook Form + Zod: популярный выбор в 2026',
      'Критично для работы с формами'
    ],
    funFact: 'React Hook Form был создан в 2019 году как ответ на проблемы производительности Formik. Идея в использовании uncontrolled компонентов по умолчанию, что снижает ререндеры и улучшает производительность больших форм.',
    tags: ['react', 'forms', 'validation', 'react-hook-form', 'zod', 'intermediate'],
    examples: [
      {
        title: 'React Hook Form',
        code: `// React Hook Form: производительность
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Email обязателен</span>}
      
      <input {...register('password', { required: true })} />
      {errors.password && <span>Пароль обязателен</span>}
      
      <button type="submit">Войти</button>
    </form>
  );
}

// Преимущество: меньше ререндеров
// Uncontrolled компоненты по умолчанию
// Лучшая производительность`
      },
      {
        title: 'Zod интеграция',
        code: `// Zod: типобезопасная валидация
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Неверный email'),
  password: z.string().min(8, 'Пароль должен быть минимум 8 символов')
});

type FormData = z.infer<typeof schema>; // Типы из схемы

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = (data: FormData) => {
    // data типизирован
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Войти</button>
    </form>
  );
}

// Преимущество: типобезопасность
// Схема определяет и валидацию, и типы`
      },
      {
        title: 'Сравнение библиотек',
        code: `// React Hook Form:
// - Производительность (меньше ререндеров)
// - Uncontrolled по умолчанию
// - Меньше кода

// Formik:
// - Простота
// - Controlled компоненты
// - Больше ререндеров

// Zod:
// - Типобезопасность
// - Схемы валидации
// - Работает с любой библиотекой

// Выбор:
// - Производительность → React Hook Form
// - Простота → Formik
// - Типобезопасность → Zod

// Популярный выбор: React Hook Form + Zod`
      }
    ],
    relatedTopics: ['react-testing', 'react-typescript'],
    isFrontendEssential: false
  },
  {
    id: 'react-testing',
    title: 'Тестирование',
    difficulty: 'intermediate',
    description: 'Тестирование React включает: React Testing Library для тестирования компонентов, Jest для unit тестов, моки для изоляции зависимостей. React Testing Library фокусируется на тестировании поведения, а не реализации, что создаёт более надёжные тесты.\n\nПодход к тестированию: тестировать как пользователь (что видит, что делает), не тестировать реализацию (внутренние детали компонента), использовать data-testid для поиска элементов. Это создаёт тесты, которые не ломаются при рефакторинге, так как они тестируют поведение, а не реализацию.\n\nТестирование хуков: renderHook для тестирования кастомных хуков, моки для зависимостей, проверка возвращаемых значений и побочных эффектов. Понимание тестирования критично для создания качественного кода.\n\nВ 2026 тестирование стало стандартом для качественной разработки. React Testing Library стал стандартом для тестирования компонентов, фокусируясь на пользовательском опыте. Понимание тестирования критично для работы в команде.',
    keyPoints: [
      'Тестирование: React Testing Library, Jest, моки',
      'Подход: тестировать как пользователь, не тестировать реализацию',
      'React Testing Library фокусируется на поведении',
      'Тестирование хуков: renderHook для кастомных хуков',
      'Стандарт для качественной разработки в 2026',
      'Критично для работы в команде'
    ],
    funFact: 'React Testing Library был создан в 2018 году Кентом Доддсом как альтернатива Enzyme. Философия: тестировать компоненты как пользователь, а не как разработчик. Это привело к более надёжным тестам, которые не ломаются при рефакторинге.',
    tags: ['react', 'testing', 'testing-library', 'jest', 'intermediate'],
    examples: [
      {
        title: 'Тестирование компонента',
        code: `// React Testing Library: тестирование поведения
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

test('Counter increments on click', () => {
  render(<Counter />);
  
  // Ищем как пользователь
  const button = screen.getByRole('button', { name: /0/i });
  
  // Взаимодействуем как пользователь
  fireEvent.click(button);
  
  // Проверяем результат как пользователь
  expect(screen.getByRole('button', { name: /1/i })).toBeInTheDocument();
});

// Преимущество: тестирует поведение
// Не ломается при рефакторинге
// Фокусируется на пользовательском опыте`
      },
      {
        title: 'Тестирование хуков',
        code: `// Тестирование кастомных хуков
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter());
  
  expect(result.current.count).toBe(0);
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});

// Преимущество: тестирует логику хука
// Изолированно от компонентов
// Легко тестировать`
      },
      {
        title: 'Моки для зависимостей',
        code: `// Моки для изоляции зависимостей
import { render, screen } from '@testing-library/react';
import { UserProfile } from './UserProfile';

// Мокируем API
jest.mock('./api', () => ({
  fetchUser: jest.fn().mockResolvedValue({
    id: 1,
    name: 'Иван',
    email: 'ivan@example.com'
  })
}));

test('UserProfile displays user', async () => {
  render(<UserProfile userId={1} />);
  
  await waitFor(() => {
    expect(screen.getByText('Иван')).toBeInTheDocument();
  });
});

// Преимущество: изоляция теста
// Не зависит от реального API
// Быстрые и стабильные тесты`
      }
    ],
    relatedTopics: ['react-typescript', 'frameworks-ecosystem-testing'],
    isFrontendEssential: false
  },
  {
    id: 'react-typescript',
    title: 'TypeScript',
    difficulty: 'intermediate',
    description: 'React + TypeScript — это типобезопасная разработка на React. Типизация пропсов, хуков, контекстов, дженерики для переиспользуемых компонентов. TypeScript помогает находить ошибки на этапе разработки, улучшая качество кода и developer experience.\n\nТипизация пропсов: интерфейсы или типы для props компонентов, обязательные и опциональные поля, дженерики для переиспользуемых компонентов. Типизация хуков: типы для возвращаемых значений, типы для параметров, типы для зависимостей. Типизация контекстов: типы для значения контекста, типы для провайдера.\n\nДженерики для компонентов: переиспользуемые компоненты с типизацией, например List<T> для списков разных типов. Это создаёт типобезопасные переиспользуемые компоненты. Понимание TypeScript критично для современной разработки на React.\n\nВ 2026 TypeScript стал стандартом для React приложений. Он улучшает качество кода и developer experience, помогая находить ошибки на этапе разработки. Понимание TypeScript критично для работы с современным React.',
    keyPoints: [
      'React + TypeScript: типобезопасная разработка',
      'Типизация: пропсов, хуков, контекстов, дженерики',
      'Помогает находить ошибки на этапе разработки',
      'Дженерики для переиспользуемых компонентов',
      'Стандарт для React приложений в 2026',
      'Критично для современной разработки'
    ],
    funFact: 'TypeScript стал особенно популярным в React сообществе в 2018-2019 годах. С ростом сложности приложений типобезопасность стала критичной. Сейчас большинство новых React проектов используют TypeScript.',
    tags: ['react', 'typescript', 'typing', 'generics', 'intermediate', 'core'],
    examples: [
      {
        title: 'Типизация пропсов',
        code: `// Типизация пропсов
interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
  onEdit?: (id: number) => void; // Опциональный
}

function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {onEdit && <button onClick={() => onEdit(user.id)}>Редактировать</button>}
    </div>
  );
}

// Преимущество: типобезопасность
// Ошибки на этапе разработки
// Автодополнение в IDE`
      },
      {
        title: 'Типизация хуков',
        code: `// Типизация кастомных хуков
function useFetch<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((data: T) => setData(data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
}

// Использование:
const { data, loading } = useFetch<User[]>('/api/users');
// data типизирован как User[] | null

// Преимущество: типобезопасность
// Автодополнение для data`
      },
      {
        title: 'Дженерики для компонентов',
        code: `// Дженерики для переиспользуемых компонентов
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Использование:
<List
  items={users}
  renderItem={(user) => <div>{user.name}</div>}
/>
// user типизирован автоматически

// Преимущество: типобезопасные переиспользуемые компоненты`
      }
    ],
    relatedTopics: ['react-migration-classes', 'frameworks-ecosystem-testing'],
    isFrontendEssential: true
  }
];
