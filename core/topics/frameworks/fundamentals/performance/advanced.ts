import { Topic } from '../../../../types';

export const PERFORMANCE_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'frameworks-performance-performance-budgets',
    title: 'Performance budgets',
    difficulty: 'advanced',
    description: 'Performance budgets — это ограничения на метрики производительности, которые должны соблюдаться при разработке. Например: размер бандла не должен превышать 200KB, Time to Interactive не должен превышать 3 секунды, First Contentful Paint не должен превышать 1.5 секунды. Это создаёт требования к производительности на уровне проекта.\n\nPerformance budgets помогают предотвратить деградацию производительности: если новая функция увеличивает размер бандла сверх бюджета, это блокирует merge. Это заставляет думать о производительности с самого начала, а не оптимизировать в конце.\n\nИнструменты для performance budgets: Lighthouse CI проверяет метрики при CI/CD, Bundle Size Limits ограничивают размер бандла, Web Vitals проверяет Core Web Vitals. Эти инструменты автоматизируют проверку бюджетов, блокируя изменения, которые нарушают бюджеты.\n\nВ 2026 performance budgets стали стандартом для больших проектов. Они интегрируются в CI/CD, автоматически проверяя метрики при каждом изменении. Понимание performance budgets критично для поддержания производительности на долгосрочной основе.',
    keyPoints: [
      'Performance budgets: ограничения на метрики производительности',
      'Помогают предотвратить деградацию производительности',
      'Блокируют изменения, которые нарушают бюджеты',
      'Инструменты: Lighthouse CI, Bundle Size Limits, Web Vitals',
      'Интегрируются в CI/CD для автоматической проверки',
      'Стандарт для больших проектов в 2026'
    ],
    funFact: 'Performance budgets были введены Google в 2014 году как способ поддержания производительности веб-сайтов. Идея в том, что если не установить ограничения, производительность будет деградировать со временем.',
    tags: ['frameworks', 'performance', 'budgets', 'metrics', 'ci-cd', 'advanced'],
    examples: [
      {
        title: 'Performance budgets',
        code: `// Performance budgets в package.json
{
  "bundlesize": [
    {
      "path": "./dist/main.js",
      "maxSize": "200KB"
    },
    {
      "path": "./dist/vendor.js",
      "maxSize": "300KB"
    }
  ]
}

// При сборке проверяется размер бандла
// Если превышает бюджет → ошибка сборки

// Преимущество: автоматическая проверка
// Нельзя случайно увеличить размер бандла`
      },
      {
        title: 'Lighthouse CI',
        code: `// Lighthouse CI: проверка метрик в CI/CD
// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000']
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'time-to-interactive': ['error', { maxNumericValue: 3000 }]
      }
    }
  }
};

// При каждом PR проверяются метрики
// Если не соответствуют → блокируется merge

// Преимущество: автоматическая проверка производительности
// Нельзя деградировать производительность`
      },
      {
        title: 'Bundle Size Limits',
        code: `// Bundle Size Limits: ограничение размера бандла
// .size-limit.js
module.exports = [
  {
    path: 'dist/main.js',
    limit: '200 KB'
  },
  {
    path: 'dist/vendor.js',
    limit: '300 KB'
  }
];

// При сборке проверяется размер
// Если превышает лимит → ошибка

// Преимущество: контроль размера бандла
// Заставляет думать о производительности`
      }
    ],
    relatedTopics: ['frameworks-performance-core-web-vitals', 'frameworks-performance-runtime-vs-dx'],
    isFrontendEssential: false
  },
  {
    id: 'frameworks-performance-core-web-vitals',
    title: 'Core Web Vitals',
    difficulty: 'advanced',
    description: 'Core Web Vitals — это метрики производительности, которые Google использует для ранжирования в поиске. Три основные метрики: LCP (Largest Contentful Paint) — время до отображения самого большого элемента, FID (First Input Delay) — задержка до первого взаимодействия, CLS (Cumulative Layout Shift) — накопленное смещение layout. Эти метрики измеряют реальный пользовательский опыт.\n\nLCP измеряет скорость загрузки: время до отображения самого большого элемента (изображение, текст, видео). Хороший LCP < 2.5 секунды. FID измеряет отзывчивость: задержка до первого взаимодействия (клик, ввод). Хороший FID < 100 миллисекунд. CLS измеряет стабильность: накопленное смещение layout при загрузке. Хороший CLS < 0.1.\n\nОптимизация Core Web Vitals: LCP оптимизируется через SSR, оптимизацию изображений, предзагрузку ресурсов. FID оптимизируется через уменьшение JavaScript, code splitting, оптимизацию обработчиков событий. CLS оптимизируется через резервирование места для контента, избегание динамических вставок.\n\nВ 2026 Core Web Vitals стали критичными для SEO: Google использует их для ранжирования. Понимание и оптимизация Core Web Vitals критична для успеха веб-сайтов.',
    keyPoints: [
      'Core Web Vitals: метрики производительности для ранжирования в поиске',
      'LCP: время до отображения самого большого элемента (< 2.5s)',
      'FID: задержка до первого взаимодействия (< 100ms)',
      'CLS: накопленное смещение layout (< 0.1)',
      'Оптимизация: SSR, оптимизация изображений, уменьшение JavaScript',
      'Критичны для SEO в 2026'
    ],
    funFact: 'Core Web Vitals были введены Google в 2020 году как часть инициативы Web Vitals. С 2021 года они используются для ранжирования в поиске, что сделало оптимизацию производительности критичной для SEO.',
    tags: ['frameworks', 'performance', 'core-web-vitals', 'seo', 'metrics', 'advanced', 'core'],
    examples: [
      {
        title: 'LCP: Largest Contentful Paint',
        code: `// LCP: время до отображения самого большого элемента
// Оптимизация LCP:

// 1. SSR для быстрого отображения контента
export async function getServerSideProps() {
  return { props: { data: await fetchData() } };
}

// 2. Оптимизация изображений
<Image 
  src="/hero.jpg"
  width={1200}
  height={600}
  priority // Предзагрузка критичного изображения
/>

// 3. Предзагрузка ресурсов
<link rel="preload" href="/fonts/main.woff2" as="font" />

// 4. Удаление блокирующего JavaScript
// Минимизировать JavaScript в <head>
// Отложить некритичный JavaScript

// Цель: LCP < 2.5 секунды`
      },
      {
        title: 'FID: First Input Delay',
        code: `// FID: задержка до первого взаимодействия
// Оптимизация FID:

// 1. Уменьшение JavaScript
// Code splitting, tree shaking
// Загружать только нужный код

// 2. Оптимизация обработчиков событий
// Дебаунсинг, троттлинг
// Асинхронные обработчики

// 3. Приоритизация критичных обработчиков
// Критичные обработчики загружаются сразу
// Некритичные откладываются

// 4. Избегание длинных задач
// Разбивать длинные задачи на части
// Использовать requestIdleCallback

// Цель: FID < 100 миллисекунд`
      },
      {
        title: 'CLS: Cumulative Layout Shift',
        code: `// CLS: накопленное смещение layout
// Оптимизация CLS:

// 1. Резервирование места для контента
<img 
  src="/image.jpg"
  width={800}
  height={600}
  // Резервирует место до загрузки
/>

// 2. Избегание динамических вставок
// Не вставлять контент без резервирования места
// Использовать skeleton screens

// 3. Стабильные размеры шрифтов
// Избегать загрузки шрифтов, которые меняют размеры
// Использовать font-display: swap

// 4. Избегание рекламы без размеров
// Резервировать место для рекламы
// Не вставлять рекламу динамически

// Цель: CLS < 0.1`
      }
    ],
    relatedTopics: ['frameworks-performance-performance-budgets', 'frameworks-rendering-trade-offs'],
    isFrontendEssential: true
  },
  {
    id: 'frameworks-performance-runtime-vs-dx',
    title: 'Runtime cost vs Developer Experience',
    difficulty: 'advanced',
    description: 'Runtime cost vs Developer Experience — это компромисс между производительностью выполнения и удобством разработки. Фреймворки добавляют overhead для улучшения DX: Virtual DOM упрощает разработку, но добавляет overhead на сравнение. Реактивность упрощает синхронизацию, но добавляет overhead на отслеживание.\n\nВыбор между runtime cost и DX зависит от требований: для интерактивных приложений важна производительность → меньше overhead, для быстрой разработки важна простота → больше DX. Но современные фреймворки пытаются дать лучшее из обоих миров: компиляция снижает runtime cost, сохраняя DX.\n\nКомпиляция как решение: React Forget компилирует компоненты с оптимизациями, Svelte компилирует компоненты в нативный JavaScript, Vue компилирует шаблоны с оптимизациями. Это снижает runtime cost, сохраняя DX: разработчик пишет простой код, компилятор оптимизирует его.\n\nВ 2026 компиляция становится стандартом для снижения runtime cost при сохранении DX. Фреймворки компилируют код в более эффективный, давая лучшее из обоих миров. Понимание компромисса критично для выбора подхода.',
    keyPoints: [
      'Runtime cost vs DX: компромисс между производительностью и удобством',
      'Фреймворки добавляют overhead для улучшения DX',
      'Выбор зависит от требований: производительность vs простота',
      'Компиляция снижает runtime cost, сохраняя DX',
      'React Forget, Svelte, Vue компилируют с оптимизациями',
      'Компиляция становится стандартом в 2026'
    ],
    funFact: 'Компромисс между runtime cost и DX стал особенно актуальным с ростом сложности приложений. Компиляция стала решением: разработчик пишет простой код, компилятор оптимизирует его, давая лучшее из обоих миров.',
    tags: ['frameworks', 'performance', 'runtime', 'dx', 'compilation', 'advanced', 'trade-offs'],
    examples: [
      {
        title: 'Runtime cost vs DX',
        code: `// Runtime cost: производительность выполнения
// Virtual DOM: overhead на сравнение
// Но упрощает разработку

// Developer Experience: удобство разработки
// Простой код, меньше думать о деталях
// Но добавляет overhead

// Компромисс:
// - Больше DX → больше runtime cost
// - Меньше runtime cost → меньше DX

// Современные фреймворки пытаются дать лучшее из обоих:
// - Компиляция снижает runtime cost
// - Сохраняет DX`
      },
      {
        title: 'Компиляция как решение',
        code: `// React Forget: компиляция с оптимизациями
// Исходный код (простой, хороший DX):
function Component({ items, filter }) {
  const filtered = items.filter(item => 
    item.name.includes(filter)
  );
  return <List items={filtered} />;
}

// Компилятор оптимизирует:
// - Автоматическая мемоизация filtered
// - Оптимизация ререндеров
// - Снижение runtime cost

// Результат: хороший DX + низкий runtime cost

// Svelte: компиляция в нативный JavaScript
// Исходный код (простой):
<script>
  let count = 0;
</script>
<button on:click={() => count++}>{count}</button>

// Компилятор генерирует оптимизированный код
// Нет runtime overhead на Virtual DOM
// Нет runtime overhead на реактивность`
      },
      {
        title: 'Выбор подхода',
        code: `// Выбор зависит от требований:

// Интерактивные приложения (игры, редакторы):
// - Приоритет: производительность
// - Выбор: меньше overhead, компиляция
// - Пример: Svelte, Solid.js

// Быстрая разработка (стартапы, прототипы):
// - Приоритет: скорость разработки
// - Выбор: больше DX, меньше оптимизаций
// - Пример: React, Vue

// Большие проекты (enterprise):
// - Приоритет: баланс
// - Выбор: компиляция для оптимизации
// - Пример: React + компиляция, Vue + компиляция

// В 2026: компиляция становится стандартом
// Даёт лучшее из обоих миров`
      }
    ],
    relatedTopics: ['frameworks-performance-core-web-vitals', 'frameworks-reactivity-runtime-vs-compile-time'],
    isFrontendEssential: false
  }
];
