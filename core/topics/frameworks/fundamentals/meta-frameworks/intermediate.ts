import { Topic } from '../../../../types';

export const META_FRAMEWORKS_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'frameworks-meta-frameworks-file-based-routing',
    title: 'File-based routing',
    difficulty: 'intermediate',
    description: 'File-based routing — это роутинг, где структура файлов определяет маршруты. Файл pages/about.js становится маршрутом /about, файл pages/blog/[slug].js становится маршрутом /blog/:slug. Это упрощает навигацию: не нужно настраивать роутинг вручную, структура файлов определяет маршруты.\n\nПреимущества file-based routing: простота (структура файлов = маршруты), предсказуемость (легко найти страницу по URL), автоматический code splitting (каждая страница = отдельный бандл). Но есть ограничения: сложные маршруты могут быть неудобными, меньше контроля над роутингом.\n\nДинамические маршруты используют специальный синтаксис: [id].js для одного параметра, [...slug].js для catch-all, (group) для группировки без изменения URL. Это позволяет создавать сложные маршруты, сохраняя простоту file-based подхода.\n\nВ 2026 file-based routing стал стандартом через мета-фреймворки (Next.js, Nuxt, SvelteKit). Он упрощает разработку, делая структуру файлов определяющей маршруты. Понимание file-based routing критично для работы с мета-фреймворками.',
    keyPoints: [
      'File-based routing: структура файлов определяет маршруты',
      'Преимущества: простота, предсказуемость, автоматический code splitting',
      'Ограничения: сложные маршруты могут быть неудобными',
      'Динамические маршруты: [id].js, [...slug].js, (group)',
      'Упрощает разработку, делая структуру определяющей маршруты',
      'Стандарт через мета-фреймворки в 2026'
    ],
    funFact: 'File-based routing был популяризирован Next.js, но идея существовала в веб-разработке с 1990-х годов в серверных фреймворках типа PHP, где структура файлов определяла URL. Next.js адаптировал это для клиентского роутинга.',
    tags: ['frameworks', 'meta-frameworks', 'routing', 'file-based', 'intermediate', 'core'],
    examples: [
      {
        title: 'File-based routing в Next.js',
        code: `// Next.js: структура файлов = маршруты
// pages/index.js → маршрут /
export default function Home() {
  return <h1>Главная</h1>;
}

// pages/about.js → маршрут /about
export default function About() {
  return <h1>О нас</h1>;
}

// pages/blog/index.js → маршрут /blog
export default function Blog() {
  return <h1>Блог</h1>;
}

// pages/blog/[slug].js → маршрут /blog/:slug
export default function BlogPost({ slug }) {
  return <h1>Пост: {slug}</h1>;
}

// Преимущество: структура файлов определяет маршруты
// Не нужно настраивать роутинг вручную`
      },
      {
        title: 'Динамические маршруты',
        code: `// Динамические маршруты
// pages/users/[id].js → /users/:id
export async function getServerSideProps({ params }) {
  return { props: { userId: params.id } };
}

// pages/shop/[...slug].js → /shop/* (catch-all)
export default function Shop({ slug }) {
  // slug = ['category', 'product'] для /shop/category/product
}

// pages/(dashboard)/admin.js → /admin (группировка)
// pages/(dashboard)/settings.js → /settings
// (dashboard) не влияет на URL, только группирует файлы

// Преимущество: гибкость при сохранении простоты`
      },
      {
        title: 'File-based vs Config-based',
        code: `// File-based routing
// pages/about.js → /about
// Простота, предсказуемость

// Config-based routing
// router.js
const routes = [
  { path: '/about', component: About },
  { path: '/blog/:slug', component: BlogPost }
];
// Больше контроля, больше настройки

// File-based преимущества:
// - Меньше кода
// - Предсказуемость
// - Автоматический code splitting

// Config-based преимущества:
// - Больше контроля
// - Сложные маршруты
// - Динамические маршруты`
      }
    ],
    relatedTopics: ['frameworks-meta-frameworks-data-fetching', 'frameworks-meta-frameworks-layouts'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-meta-frameworks-data-fetching',
    title: 'Data fetching',
    difficulty: 'intermediate',
    description: 'Data fetching в мета-фреймворках интегрирован в жизненный цикл страницы. Данные могут запрашиваться на сервере (SSR), на этапе сборки (SSG), или на клиенте (CSR) в зависимости от стратегии рендеринга. Это определяет когда и где запрашивать данные.\n\nSSR data fetching: данные запрашиваются на сервере при каждом запросе, отправляются вместе с HTML. SSG data fetching: данные запрашиваются на этапе сборки, встраиваются в статический HTML. CSR data fetching: данные запрашиваются на клиенте после загрузки страницы.\n\nВыбор стратегии зависит от типа данных: статичные данные → SSG, динамические данные → SSR, данные пользователя → CSR. Понимание когда и где запрашивать данные критично для производительности и правильной архитектуры.\n\nВ 2026 мета-фреймворки предоставляют инструменты для всех стратегий: getServerSideProps для SSR, getStaticProps для SSG, useQuery для CSR. Это позволяет выбрать правильную стратегию под задачу.',
    keyPoints: [
      'Data fetching интегрирован в жизненный цикл страницы',
      'SSR: данные на сервере при каждом запросе',
      'SSG: данные на этапе сборки',
      'CSR: данные на клиенте после загрузки',
      'Выбор зависит от типа данных: статичные → SSG, динамические → SSR',
      'Мета-фреймворки предоставляют инструменты для всех стратегий'
    ],
    funFact: 'Интеграция data fetching в жизненный цикл страницы была одной из ключевых инноваций Next.js. До этого разработчики запрашивали данные в useEffect, что создавало проблемы с SSR и SEO.',
    tags: ['frameworks', 'meta-frameworks', 'data-fetching', 'ssr', 'ssg', 'intermediate', 'core'],
    examples: [
      {
        title: 'SSR data fetching',
        code: `// Next.js: SSR data fetching
export async function getServerSideProps(context) {
  // Выполняется на сервере при каждом запросе
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();
  
  return {
    props: { data: json }
  };
}

export default function Page({ data }) {
  // data доступен сразу, отрендерен на сервере
  return <div>{data.title}</div>;
}

// Преимущество: всегда актуальные данные
// Недостаток: нагрузка на сервер`
      },
      {
        title: 'SSG data fetching',
        code: `// Next.js: SSG data fetching
export async function getStaticProps() {
  // Выполняется на этапе сборки
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();
  
  return {
    props: { data: json },
    revalidate: 60 // Регенерировать каждые 60 секунд (ISR)
  };
}

export default function Page({ data }) {
  // data встроен в статический HTML
  return <div>{data.title}</div>;
}

// Преимущество: максимальная скорость
// Недостаток: данные могут быть устаревшими`
      },
      {
        title: 'CSR data fetching',
        code: `// Next.js: CSR data fetching
'use client';
import { useQuery } from 'react-query';

export default function Page() {
  // Данные запрашиваются на клиенте
  const { data, isLoading } = useQuery(
    ['data'],
    () => fetch('https://api.example.com/data').then(r => r.json())
  );
  
  if (isLoading) return <div>Загрузка...</div>;
  
  return <div>{data.title}</div>;
}

// Преимущество: меньше нагрузка на сервер
// Недостаток: медленная первая загрузка`
      }
    ],
    relatedTopics: ['frameworks-meta-frameworks-file-based-routing', 'frameworks-rendering-ssr'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-meta-frameworks-layouts',
    title: 'Layouts и nested routes',
    difficulty: 'intermediate',
    description: 'Layouts — это обёртки для страниц, которые определяют общую структуру (header, footer, sidebar). Nested routes — это вложенные маршруты, где дочерние маршруты рендерятся внутри родительских. Это позволяет создавать сложные структуры страниц с переиспользуемыми layout\'ами.\n\nLayouts решают проблему дублирования: вместо повторения header и footer на каждой странице, они определяются в layout и применяются ко всем страницам. Nested routes позволяют создавать сложные структуры: /dashboard/settings/profile, где /dashboard — layout, /settings — вложенный layout, /profile — страница.\n\nРеализация включает: _app.js для глобального layout, _layout.js для вложенных layout\'ов, специальный синтаксис для nested routes. Это требует понимания структуры файлов и того, как layout\'ы применяются к страницам.\n\nВ 2026 layouts и nested routes стали стандартом через мета-фреймворки. Они упрощают создание сложных структур страниц, делая layout\'ы переиспользуемыми. Понимание layouts критично для создания масштабируемых приложений.',
    keyPoints: [
      'Layouts: обёртки для страниц, определяют общую структуру',
      'Nested routes: вложенные маршруты, дочерние внутри родительских',
      'Решают проблему дублирования: переиспользуемые layout\'ы',
      'Позволяют создавать сложные структуры: /dashboard/settings/profile',
      'Реализация: _app.js, _layout.js, специальный синтаксис',
      'Стандарт через мета-фреймворки в 2026'
    ],
    funFact: 'Layouts были популяризированы Next.js через _app.js, но идея существовала в серверных фреймворках типа Rails, где layout определяет общую структуру страницы. Мета-фреймворки адаптировали это для клиентского рендеринга.',
    tags: ['frameworks', 'meta-frameworks', 'layouts', 'nested-routes', 'intermediate'],
    examples: [
      {
        title: 'Layouts в Next.js',
        code: `// _app.js: глобальный layout
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// Layout компонент
function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

// Все страницы используют Layout автоматически
// Преимущество: переиспользование структуры`
      },
      {
        title: 'Nested routes',
        code: `// Nested routes в Next.js
// pages/dashboard/_layout.js → layout для /dashboard/*
function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

// pages/dashboard/settings.js → /dashboard/settings
// Использует DashboardLayout автоматически

// pages/dashboard/settings/profile.js → /dashboard/settings/profile
// Использует DashboardLayout + SettingsLayout

// Преимущество: сложные структуры с переиспользуемыми layout'ами`
      },
      {
        title: 'Преимущества layouts',
        code: `// Layouts решают проблемы:
// 1. Дублирование кода
// Без layout: header и footer на каждой странице
// С layout: header и footer в одном месте

// 2. Консистентность
// Все страницы используют одинаковую структуру
// Легко изменить структуру в одном месте

// 3. Переиспользование
// Layout можно использовать для группы страниц
// Не нужно повторять код

// 4. Вложенность
// Layout'ы могут быть вложенными
// Сложные структуры с переиспользуемыми частями`
      }
    ],
    relatedTopics: ['frameworks-meta-frameworks-file-based-routing', 'frameworks-meta-frameworks-vendor-lock-in'],
    isFrontendEssential: false
  }
];
