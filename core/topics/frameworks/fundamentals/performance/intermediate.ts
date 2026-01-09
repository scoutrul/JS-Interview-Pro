import { Topic } from '../../../../types';

export const PERFORMANCE_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'frameworks-performance-memoization',
    title: 'Мемоизация',
    difficulty: 'intermediate',
    description: 'Мемоизация — это кэширование результатов вычислений для предотвращения повторных вычислений. Если входные данные не изменились, мемоизированная функция возвращает кэшированный результат вместо пересчёта. Это улучшает производительность, особенно для дорогих вычислений.\n\nВ React мемоизация реализуется через: useMemo для мемоизации значений, useCallback для мемоизации функций, React.memo для мемоизации компонентов. В Vue мемоизация реализуется через computed для вычисляемых значений. Каждый инструмент решает свою задачу: предотвращение лишних вычислений, предотвращение лишних ререндеров.\n\nКогда использовать мемоизацию: дорогие вычисления (фильтрация больших массивов, сложные вычисления), нестабильные ссылки (объекты, функции, которые создаются каждый раз), оптимизация ререндеров (компоненты, которые не должны перерисовываться). Но мемоизация имеет стоимость: память для кэша, сравнение зависимостей.\n\nВ 2026 мемоизация стала стандартом для оптимизации производительности. React Forget компилирует компоненты с автоматической мемоизацией, снижая необходимость ручной мемоизации. Но понимание мемоизации остаётся важным для оптимизации.',
    keyPoints: [
      'Мемоизация: кэширование результатов для предотвращения повторных вычислений',
      'React: useMemo, useCallback, React.memo',
      'Vue: computed для вычисляемых значений',
      'Когда использовать: дорогие вычисления, нестабильные ссылки, оптимизация ререндеров',
      'Имеет стоимость: память для кэша, сравнение зависимостей',
      'Стандарт для оптимизации производительности в 2026'
    ],
    funFact: 'Мемоизация была изобретена в 1968 году Дональдом Мичи как техника оптимизации в функциональном программировании. В React она стала популярной с появлением хуков в 2018 году, когда useMemo и useCallback были добавлены для оптимизации производительности.',
    tags: ['frameworks', 'performance', 'memoization', 'optimization', 'intermediate', 'core'],
    examples: [
      {
        title: 'useMemo для дорогих вычислений',
        code: `// ❌ Проблема: дорогое вычисление каждый раз
function Component({ items, filter }) {
  // Фильтрация выполняется при каждом рендере
  const filtered = items.filter(item => 
    item.name.includes(filter)
  );
  
  return <List items={filtered} />;
}

// ✅ Решение: мемоизация
function Component({ items, filter }) {
  // Фильтрация выполняется только при изменении items или filter
  const filtered = useMemo(() => {
    return items.filter(item => 
      item.name.includes(filter)
    );
  }, [items, filter]);
  
  return <List items={filtered} />;
}

// Преимущество: пересчёт только при изменении зависимостей`
      },
      {
        title: 'useCallback для функций',
        code: `// ❌ Проблема: новая функция каждый раз
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
  };
  
  // handleClick создаётся каждый раз
  return <Child onClick={handleClick} />;
}

// ✅ Решение: useCallback
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  
  // handleClick не меняется если count не изменился
  return <Child onClick={handleClick} />;
}

// Преимущество: Child не перерисовывается если count не изменился`
      },
      {
        title: 'React.memo для компонентов',
        code: `// ❌ Проблема: компонент перерисовывается каждый раз
function Child({ user }) {
  return <div>{user.name}</div>;
}

function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <Child user={{ name: 'Иван' }} /> {/* Перерисовывается при изменении count */}
    </div>
  );
}

// ✅ Решение: React.memo
const Child = React.memo(function Child({ user }) {
  return <div>{user.name}</div>;
});

// Преимущество: Child перерисовывается только при изменении user
// Не перерисовывается при изменении count`
      }
    ],
    relatedTopics: ['frameworks-performance-lazy-loading', 'frameworks-performance-code-splitting'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-performance-lazy-loading',
    title: 'Ленивая загрузка',
    difficulty: 'intermediate',
    description: 'Ленивая загрузка — это загрузка кода только когда он нужен, а не сразу при загрузке приложения. Компоненты, маршруты, библиотеки загружаются по требованию: при первом использовании, при появлении в viewport, при взаимодействии. Это снижает размер начального бандла и улучшает Time to Interactive.\n\nЛенивая загрузка компонентов: React.lazy загружает компонент только при первом рендере, Suspense показывает fallback во время загрузки. Ленивая загрузка маршрутов: динамический import загружает код маршрута только при навигации. Ленивая загрузка библиотек: динамический import загружает библиотеку только при использовании.\n\nСтратегии ленивой загрузки: по требованию (при первом использовании), по видимости (при появлении в viewport), по взаимодействию (при наведении, клике). Выбор стратегии зависит от приоритета: критичный контент загружается сразу, некритичный откладывается.\n\nВ 2026 ленивая загрузка стала стандартом для оптимизации производительности. Мета-фреймворки автоматизируют ленивую загрузку маршрутов, библиотеки предоставляют инструменты для ленивой загрузки компонентов. Понимание ленивой загрузки критично для оптимизации.',
    keyPoints: [
      'Ленивая загрузка: загрузка кода только когда нужен',
      'Снижает размер начального бандла, улучшает TTI',
      'Стратегии: по требованию, по видимости, по взаимодействию',
      'React.lazy для компонентов, динамический import для маршрутов и библиотек',
      'Выбор стратегии зависит от приоритета',
      'Стандарт для оптимизации производительности в 2026'
    ],
    funFact: 'Ленивая загрузка была популяризирована в веб-разработке в 2010-х годах с появлением code splitting. React.lazy был добавлен в React 16.6 в 2018 году, сделав ленивую загрузку компонентов стандартной практикой.',
    tags: ['frameworks', 'performance', 'lazy-loading', 'code-splitting', 'intermediate', 'core'],
    examples: [
      {
        title: 'Ленивая загрузка компонентов',
        code: `// React.lazy: ленивая загрузка компонентов
import { lazy, Suspense } from 'react';

// Компонент загружается только при первом рендере
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

// Преимущество: HeavyComponent не входит в начальный бандл
// Загружается только когда нужен
// Снижает размер начального бандла`
      },
      {
        title: 'Ленивая загрузка маршрутов',
        code: `// Динамический import: ленивая загрузка маршрутов
// React Router
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// Преимущество: код маршрута загружается только при навигации
// Не загружается сразу, снижает начальный бандл`
      },
      {
        title: 'Ленивая загрузка по видимости',
        code: `// Ленивая загрузка при появлении в viewport
import { useInView } from 'react-intersection-observer';

function LazyComponent() {
  const { ref, inView } = useInView({
    triggerOnce: true
  });
  
  return (
    <div ref={ref}>
      {inView && <HeavyComponent />}
    </div>
  );
}

// Преимущество: компонент загружается только когда виден
// Не загружается если пользователь не прокрутил до него
// Оптимизирует загрузку для длинных страниц`
      }
    ],
    relatedTopics: ['frameworks-performance-code-splitting', 'frameworks-performance-memoization'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-performance-code-splitting',
    title: 'Code splitting',
    difficulty: 'intermediate',
    description: 'Code splitting — это разбиение кода на части (chunks), которые загружаются отдельно. Вместо одного большого бандла создаётся несколько маленьких бандлов, которые загружаются по мере необходимости. Это снижает размер начального бандла и улучшает Time to Interactive.\n\nСтратегии code splitting: по маршрутам (каждый маршрут = отдельный бандл), по компонентам (критичные компоненты в основном бандле, некритичные в отдельных), по библиотекам (большие библиотеки в отдельных бандлах), по вендорам (код вендоров отдельно от кода приложения).\n\nИнструменты code splitting: Webpack автоматически разбивает код при использовании динамического import, Vite оптимизирует code splitting, мета-фреймворки автоматизируют code splitting для маршрутов. Визуализация бандла (webpack-bundle-analyzer) помогает понять структуру бандла и оптимизировать его.\n\nВ 2026 code splitting стал стандартом через мета-фреймворки и инструменты сборки. Они автоматизируют code splitting, делая его доступным без сложной настройки. Понимание code splitting критично для оптимизации производительности.',
    keyPoints: [
      'Code splitting: разбиение кода на части, загружаемые отдельно',
      'Снижает размер начального бандла, улучшает TTI',
      'Стратегии: по маршрутам, по компонентам, по библиотекам, по вендорам',
      'Инструменты: Webpack, Vite, мета-фреймворки автоматизируют',
      'Визуализация бандла помогает понять структуру и оптимизировать',
      'Стандарт через мета-фреймворки в 2026'
    ],
    funFact: 'Code splitting был популяризирован Webpack в 2014 году через динамический import. Идея в том, что не весь код нужен сразу, поэтому можно разбить его на части и загружать по мере необходимости.',
    tags: ['frameworks', 'performance', 'code-splitting', 'bundling', 'intermediate'],
    examples: [
      {
        title: 'Code splitting по маршрутам',
        code: `// Code splitting: каждый маршрут = отдельный бандл
// Next.js автоматически разбивает по маршрутам
// pages/index.js → main bundle
// pages/about.js → about bundle
// pages/contact.js → contact bundle

// При навигации загружается только нужный бандл
// Не загружается весь код сразу

// Преимущество: минимальный начальный бандл
// Загружается только код для текущей страницы`
      },
      {
        title: 'Code splitting по компонентам',
        code: `// Code splitting: критичные и некритичные компоненты
// Критичные компоненты в основном бандле
import Header from './Header';
import Footer from './Footer';

// Некритичные компоненты в отдельных бандлах
const Modal = lazy(() => import('./Modal'));
const Chart = lazy(() => import('./Chart'));

function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<div>Загрузка...</div>}>
        <Modal />
      </Suspense>
    </div>
  );
}

// Преимущество: основной бандл содержит только критичное
// Некритичное загружается по мере необходимости`
      },
      {
        title: 'Визуализация бандла',
        code: `// webpack-bundle-analyzer: визуализация бандла
// Показывает:
// - Размер каждого бандла
// - Какие модули в каком бандле
// - Дублирование кода

// Использование:
// 1. Установить: npm install webpack-bundle-analyzer
// 2. Добавить в webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};

// 3. Запустить сборку
// 4. Увидеть визуализацию бандла

// Преимущество: видно что занимает место
// Можно оптимизировать большие бандлы`
      }
    ],
    relatedTopics: ['frameworks-performance-lazy-loading', 'frameworks-performance-performance-budgets'],
    isFrontendEssential: false
  }
];
