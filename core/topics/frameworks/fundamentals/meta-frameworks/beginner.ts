import { Topic } from '../../../../types';

export const META_FRAMEWORKS_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'frameworks-meta-frameworks-nextjs-nuxt',
    title: 'Next.js, Nuxt, SvelteKit',
    difficulty: 'beginner',
    description: 'Мета-фреймворки — это фреймворки, построенные поверх других фреймворков. Они добавляют дополнительные возможности: роутинг, серверный рендеринг, оптимизацию сборки, API routes. Next.js (для React), Nuxt (для Vue), SvelteKit (для Svelte) — это примеры мета-фреймворков.\n\nМета-фреймворки решают проблемы базовых фреймворков: React не имеет роутинга и SSR из коробки, Vue не имеет file-based routing, Svelte не имеет структуры для больших приложений. Мета-фреймворки добавляют эти возможности, делая разработку проще.\n\nОсновные возможности мета-фреймворков: file-based routing (роутинг по файлам), SSR/SSG (серверный рендеринг), API routes (серверные API), оптимизация сборки (code splitting, image optimization). Это даёт готовое решение для полного стека без сложной настройки.\n\nВ 2026 мета-фреймворки стали стандартом для новых проектов. Они решают большинство типовых задач из коробки, ускоряя разработку и улучшая производительность. Понимание мета-фреймворков критично для современной разработки.',
    keyPoints: [
      'Мета-фреймворки: фреймворки поверх фреймворков (Next.js, Nuxt, SvelteKit)',
      'Добавляют: роутинг, SSR/SSG, API routes, оптимизацию сборки',
      'Решают проблемы базовых фреймворков: нет роутинга, SSR из коробки',
      'File-based routing: роутинг по структуре файлов',
      'Готовое решение для полного стека без сложной настройки',
      'Стандарт для новых проектов в 2026'
    ],
    funFact: 'Next.js был создан в 2016 году компанией Vercel (тогда Zeit) как решение проблем React: отсутствие роутинга и SSR из коробки. За 8 лет Next.js стал самым популярным мета-фреймворком для React, используемым миллионами разработчиков.',
    tags: ['frameworks', 'meta-frameworks', 'nextjs', 'nuxt', 'sveltekit', 'basics', 'fundamentals', 'core'],
    examples: [
      {
        title: 'Next.js: мета-фреймворк для React',
        code: `// Next.js добавляет к React:
// 1. File-based routing
// pages/index.js → маршрут /
// pages/about.js → маршрут /about

// 2. SSR/SSG
export async function getServerSideProps() {
  return { props: { data: await fetchData() } };
}

// 3. API routes
// pages/api/users.js → /api/users
export default function handler(req, res) {
  res.json({ users: [] });
}

// 4. Оптимизация
// Автоматический code splitting, image optimization

// Преимущество: всё из коробки, не нужно настраивать`
      },
      {
        title: 'Nuxt: мета-фреймворк для Vue',
        code: `// Nuxt добавляет к Vue:
// 1. File-based routing
// pages/index.vue → маршрут /
// pages/about.vue → маршрут /about

// 2. SSR/SSG
export default {
  async asyncData() {
    return { data: await fetchData() };
  }
};

// 3. Автоматические импорты
// Не нужно импортировать компоненты вручную

// 4. Оптимизация
// Автоматический code splitting, prefetching

// Преимущество: конвенция над конфигурацией`
      },
      {
        title: 'SvelteKit: мета-фреймворк для Svelte',
        code: `// SvelteKit добавляет к Svelte:
// 1. File-based routing
// src/routes/+page.svelte → маршрут /

// 2. SSR/SSG
export async function load({ fetch }) {
  return { data: await fetch('/api/data').then(r => r.json()) };
}

// 3. API routes
// src/routes/api/users/+server.js → /api/users

// 4. Адаптеры
// Развёртывание на разных платформах

// Преимущество: минимальный runtime, максимальная производительность`
      }
    ],
    relatedTopics: ['frameworks-meta-frameworks-file-based-routing', 'frameworks-meta-frameworks-data-fetching'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-meta-frameworks-routing-data-build',
    title: 'Routing, data fetching, build',
    difficulty: 'beginner',
    description: 'Мета-фреймворки предоставляют три основные возможности: routing (роутинг), data fetching (получение данных), build optimizations (оптимизация сборки). Роутинг определяет как URL соответствуют страницам, data fetching определяет когда и где запрашивать данные, build optimizations улучшают производительность.\n\nFile-based routing — это роутинг по структуре файлов: файл pages/about.js становится маршрутом /about. Это упрощает навигацию: не нужно настраивать роутинг вручную, структура файлов определяет маршруты. Data fetching интегрирован в жизненный цикл страницы: данные запрашиваются на сервере или клиенте в зависимости от стратегии рендеринга.\n\nBuild optimizations включают: code splitting (разбиение кода на части), tree shaking (удаление неиспользуемого кода), image optimization (оптимизация изображений), prefetching (предзагрузка ресурсов). Это улучшает производительность без дополнительной настройки.\n\nВ 2026 эти возможности стали стандартом через мета-фреймворки. Они автоматизируют типовые задачи, ускоряя разработку и улучшая производительность. Понимание этих возможностей критично для эффективной работы с мета-фреймворками.',
    keyPoints: [
      'Три основные возможности: routing, data fetching, build optimizations',
      'File-based routing: роутинг по структуре файлов',
      'Data fetching: интегрирован в жизненный цикл страницы',
      'Build optimizations: code splitting, tree shaking, image optimization',
      'Автоматизируют типовые задачи, ускоряя разработку',
      'Стандарт через мета-фреймворки в 2026'
    ],
    funFact: 'File-based routing был популяризирован Next.js в 2016 году. До этого разработчики настраивали роутинг вручную через библиотеки типа React Router. File-based routing упростил это, сделав структуру файлов определяющей маршруты.',
    tags: ['frameworks', 'meta-frameworks', 'routing', 'data-fetching', 'build', 'basics', 'fundamentals'],
    examples: [
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

// pages/blog/[slug].js → маршрут /blog/:slug
export default function BlogPost({ slug }) {
  return <h1>Пост: {slug}</h1>;
}

// Преимущество: структура файлов определяет маршруты
// Не нужно настраивать роутинг вручную`
      },
      {
        title: 'Data fetching',
        code: `// Next.js: data fetching
// SSR: данные на сервере
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}

// SSG: данные на этапе сборки
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}

// CSR: данные на клиенте
'use client';
export default function Page() {
  const { data } = useQuery(['data'], fetchData);
  return <div>{data}</div>;
}

// Преимущество: данные интегрированы в жизненный цикл страницы`
      },
      {
        title: 'Build optimizations',
        code: `// Мета-фреймворки автоматически оптимизируют:
// 1. Code splitting
// Каждая страница = отдельный бандл
// Загружается только нужный код

// 2. Tree shaking
// Удаляется неиспользуемый код
// Уменьшается размер бандла

// 3. Image optimization
// Автоматическое сжатие и форматы
<Image src="/photo.jpg" width={500} height={300} />
// → Оптимизированное изображение

// 4. Prefetching
// Предзагрузка страниц при наведении на ссылки
// Быстрая навигация

// Преимущество: оптимизация из коробки`
      }
    ],
    relatedTopics: ['frameworks-meta-frameworks-nextjs-nuxt', 'frameworks-meta-frameworks-convention'],
    isFrontendEssential: false
  },
  {
    id: 'frameworks-meta-frameworks-convention',
    title: 'Конвенция над конфигурацией',
    difficulty: 'beginner',
    description: 'Конвенция над конфигурацией — это принцип, при котором фреймворк использует соглашения (conventions) вместо конфигурации. Вместо настройки всего вручную, фреймворк предполагает стандартную структуру и поведение, которые можно переопределить при необходимости.\n\nПреимущество конвенций в простоте: не нужно настраивать всё вручную, фреймворк работает "из коробки" со стандартными настройками. Это ускоряет разработку: меньше времени на настройку, больше на решение бизнес-задач. Но это требует изучения конвенций: нужно знать стандартную структуру и поведение.\n\nПримеры конвенций: file-based routing (структура файлов определяет маршруты), автоматические импорты (компоненты импортируются автоматически), стандартная структура проекта (pages/, components/, api/). Эти конвенции можно переопределить, но по умолчанию они работают.\n\nВ 2026 конвенция над конфигурацией стала стандартом через мета-фреймворки. Они упрощают разработку, используя стандартные конвенции, которые можно переопределить при необходимости. Понимание конвенций критично для эффективной работы.',
    keyPoints: [
      'Конвенция над конфигурацией: стандартные соглашения вместо настройки',
      'Упрощает разработку: работает "из коробки"',
      'Требует изучения конвенций: стандартная структура и поведение',
      'Примеры: file-based routing, автоматические импорты, стандартная структура',
      'Конвенции можно переопределить при необходимости',
      'Стандарт через мета-фреймворки в 2026'
    ],
    funFact: 'Принцип "convention over configuration" был популяризирован Ruby on Rails в 2004 году. Идея в том, что стандартные конвенции упрощают разработку, уменьшая количество решений, которые нужно принимать. Мета-фреймворки адаптировали этот принцип для JavaScript.',
    tags: ['frameworks', 'meta-frameworks', 'conventions', 'configuration', 'basics', 'fundamentals'],
    examples: [
      {
        title: 'Конвенции в Next.js',
        code: `// Next.js использует конвенции:
// 1. File-based routing
// pages/index.js → маршрут /
// Не нужно настраивать роутинг

// 2. API routes
// pages/api/users.js → /api/users
// Не нужно настраивать сервер

// 3. Стандартная структура
// pages/ - страницы
// components/ - компоненты
// public/ - статика
// Не нужно настраивать структуру

// 4. Автоматические оптимизации
// Code splitting, image optimization
// Не нужно настраивать сборку

// Преимущество: работает "из коробки"
// Недостаток: нужно знать конвенции`
      },
      {
        title: 'Переопределение конвенций',
        code: `// Конвенции можно переопределить
// next.config.js
module.exports = {
  // Переопределяем структуру
  pageExtensions: ['page.js', 'page.jsx'],
  
  // Переопределяем роутинг
  async rewrites() {
    return [
      { source: '/old', destination: '/new' }
    ];
  },
  
  // Переопределяем сборку
  webpack: (config) => {
    // Кастомная конфигурация
    return config;
  }
};

// Преимущество: гибкость при необходимости
// По умолчанию: конвенции работают`
      },
      {
        title: 'Конвенции vs Конфигурация',
        code: `// Конвенция: стандартное поведение
// pages/about.js → маршрут /about
// Не нужно настраивать

// Конфигурация: настройка вручную
// router.js
const routes = [
  { path: '/about', component: About }
];
// Нужно настраивать

// Преимущество конвенций:
// - Меньше кода
// - Меньше решений
// - Быстрее разработка

// Преимущество конфигурации:
// - Больше контроля
// - Больше гибкости
// - Больше настройки`
      }
    ],
    relatedTopics: ['frameworks-meta-frameworks-nextjs-nuxt', 'frameworks-meta-frameworks-vendor-lock-in'],
    isFrontendEssential: false
  }
];
