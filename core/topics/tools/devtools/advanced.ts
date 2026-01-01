import { Topic } from '../../../types';

export const DEVTOOLS_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'devtools-performance',
    title: 'Performance и Web Vitals',
    difficulty: 'advanced',
    description: 'Анализ производительности и пользовательского опыта. Performance tab позволяет записывать и анализировать производительность страницы, визуализировать Main Thread, Layout и Paint, а также измерять метрики Web Vitals.',
    keyPoints: [
      'Что это: инструменты для анализа производительности и UX',
      'Main Thread: визуализация выполнения JavaScript',
      'Layout и Paint: анализ этапов рендеринга',
      'LCP, CLS, INP: метрики Web Vitals',
      'Performance recording: запись и анализ производительности',
      'Flame Chart: визуализация стека вызовов',
      'Использование: поиск узких мест, оптимизация рендеринга, работа с метриками UX',
      'Performance — мост между кодом и UX, важно понимать связь DevTools и Web Vitals'
    ],
    tags: ['tools', 'devtools', 'performance', 'web-vitals', 'optimization', 'metrics', 'lcp', 'cls', 'inp'],
    relatedTopics: ['devtools-intro', 'devtools-debugging'],
    examples: [
      {
        title: 'Performance recording',
        code: `// В Performance tab:
// 1. Нажать Record
// 2. Взаимодействовать со страницей
// 3. Остановить запись
// 4. Анализировать:
//    - Main Thread
//    - Layout shifts
//    - Paint events
//    - Web Vitals`
      }
    ]
  },
  {
    id: 'devtools-memory',
    title: 'Memory и Performance Profiling',
    difficulty: 'advanced',
    description: 'Инструменты DevTools для анализа использования памяти и поиска утечек. Memory panel позволяет делать снимки кучи, отслеживать выделение памяти во времени и находить объекты, которые не освобождаются сборщиком мусора.',
    keyPoints: [
      'Что это: инструменты для анализа использования памяти и поиска утечек',
      'Memory panel: основные инструменты для работы с памятью',
      'Heap Snapshot: снимок состояния памяти в конкретный момент времени',
      'Allocation instrumentation on timeline: отслеживание выделения памяти во времени',
      'Detached DOM nodes: узлы DOM, которые больше не связаны с документом, но остаются в памяти',
      'Retainers и ссылки в памяти: цепочки ссылок, которые удерживают объекты в памяти',
      'Использование: поиск утечек памяти в SPA, анализ роста потребления памяти, отладка подписок и event listeners',
      'Утечка памяти — это сохранённая ссылка на больше не нужный объект, частые причины — замыкания, listeners, таймеры'
    ],
    additionalDescription: 'Утечки памяти в JavaScript часто возникают из-за замыканий, которые сохраняют ссылки на большие объекты, или из-за event listeners, которые не удаляются. Memory profiling помогает найти эти проблемы через сравнение снимков кучи до и после действий пользователя.',
    tags: ['tools', 'devtools', 'memory', 'performance', 'profiling', 'memory-leaks', 'optimization'],
    relatedTopics: ['devtools-performance', 'devtools-debugging'],
    funFact: 'В 2013 году Facebook обнаружил утечку памяти в своем веб-приложении, которая приводила к потреблению нескольких гигабайт памяти за несколько часов работы. Проблема была найдена именно через Memory profiling в DevTools.',
    examples: [
      {
        title: 'Типичная утечка памяти',
        code: `// Проблема: замыкание сохраняет ссылку на большой объект
function createHandler() {
  const largeData = new Array(1000000).fill(0);
  return function() {
    // largeData остается в памяти даже после удаления handler
    console.log('Handler called');
  };
}

const handler = createHandler();
// handler удален, но largeData все еще в памяти

// Решение: явно очистить ссылки
function createHandlerFixed() {
  const largeData = new Array(1000000).fill(0);
  return function() {
    console.log('Handler called');
    // Очистка после использования
    largeData.length = 0;
  };
}`
      },
      {
        title: 'Утечка через event listeners',
        code: `// Проблема: listeners не удаляются
class Component {
  constructor() {
    window.addEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    // обработка
  }
  // Компонент удален, но listener остался
}

// Решение: удаление listeners
class ComponentFixed {
  constructor() {
    window.addEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    // обработка
  }
  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}`
      },
      {
        title: 'Анализ через Heap Snapshot',
        code: `// В Memory tab:
// 1. Сделать Heap Snapshot (Take snapshot)
// 2. Выполнить действия на странице
// 3. Сделать второй Heap Snapshot
// 4. Сравнить (Comparison view)
// 5. Найти объекты, которые росли между снимками
// 6. Проверить Retainers для найденных объектов`
      }
    ]
  },
  {
    id: 'devtools-lighthouse',
    title: 'Lighthouse: аудит приложения',
    difficulty: 'advanced',
    description: 'Lighthouse — автоматический инструмент для аудита качества веб-приложений. Он анализирует производительность, доступность, SEO, best practices и PWA-функциональность, предоставляя детальные отчеты с рекомендациями по улучшению.',
    keyPoints: [
      'Что это: автоматический инструмент для аудита качества веб-приложений',
      'Performance: анализ производительности и метрик Web Vitals',
      'Accessibility: проверка доступности для пользователей с ограниченными возможностями',
      'SEO: оптимизация для поисковых систем',
      'Best Practices: соответствие современным стандартам веб-разработки',
      'PWA: проверка функциональности прогрессивных веб-приложений',
      'Использование: оценка качества страницы, поиск проблем с производительностью, подготовка к релизу',
      'Важно: Lighthouse — симуляция, а не реальные метрики, результаты нужно интерпретировать, а не слепо улучшать'
    ],
    additionalDescription: 'Lighthouse использует синтетические тесты в контролируемых условиях, поэтому его результаты могут отличаться от реальных пользовательских метрик. Важно понимать, что высокий балл Lighthouse не гарантирует хороший UX, но помогает выявить очевидные проблемы и направления для оптимизации.',
    tags: ['tools', 'devtools', 'lighthouse', 'performance', 'accessibility', 'seo', 'pwa', 'audit', 'optimization'],
    relatedTopics: ['devtools-performance', 'devtools-intro'],
    funFact: 'Lighthouse был создан Google в 2016 году и изначально был доступен только как расширение Chrome. Сегодня он встроен в Chrome DevTools и доступен через командную строку, что сделало его стандартом для аудита веб-приложений.',
    examples: [
      {
        title: 'Запуск Lighthouse',
        code: `// В Chrome DevTools:
// 1. Открыть вкладку Lighthouse
// 2. Выбрать категории для проверки
// 3. Выбрать устройство (Desktop/Mobile)
// 4. Нажать "Analyze page load"
// 5. Дождаться результатов

// Через командную строку:
// lighthouse https://example.com --view`
      },
      {
        title: 'Интерпретация результатов',
        code: `// Performance Score:
// 90-100: Отлично
// 50-89: Требует улучшения
// 0-49: Плохо

// Важные метрики:
// - First Contentful Paint (FCP)
// - Largest Contentful Paint (LCP)
// - Total Blocking Time (TBT)
// - Cumulative Layout Shift (CLS)
// - Speed Index`
      },
      {
        title: 'Типичные рекомендации',
        code: `// Lighthouse часто предлагает:
// - Уменьшить размер JavaScript
// - Оптимизировать изображения
// - Удалить неиспользуемый CSS
// - Включить кеширование
// - Использовать современные форматы (WebP, AVIF)
// - Минифицировать ресурсы
// - Предзагружать важные ресурсы`
      }
    ]
  },
  {
    id: 'devtools-remote',
    title: 'Remote Debugging',
    difficulty: 'advanced',
    description: 'Remote Debugging позволяет отлаживать мобильные браузеры и устройства удаленно через DevTools на компьютере. Это критически важно для поиска багов, которые проявляются только на реальных устройствах, и для тестирования производительности в реальных условиях.',
    keyPoints: [
      'Что это: удалённая отладка мобильных браузеров и устройств через DevTools',
      'Отладка Android через Chrome DevTools: подключение Android-устройства через USB',
      'Safari Web Inspector для iOS: отладка через Safari на macOS',
      'USB и Network debugging: два способа подключения устройств',
      'Real device debugging: отладка на реальных устройствах, а не эмуляторах',
      'Использование: поиск багов только на мобильных устройствах, отладка touch-событий, проверка производительности на реальных девайсах',
      'Важно: эмуляция не заменяет реальное устройство, remote debugging критичен для production-отладки'
    ],
    additionalDescription: 'Многие проблемы, особенно связанные с производительностью, памятью и touch-событиями, проявляются только на реальных устройствах. Remote debugging позволяет использовать полный функционал DevTools для отладки на реальных устройствах, что делает его незаменимым инструментом для мобильной разработки.',
    tags: ['tools', 'devtools', 'remote-debugging', 'mobile', 'android', 'ios', 'debugging'],
    relatedTopics: ['devtools-mobile', 'browser-mobile'],
    funFact: 'Remote debugging был впервые реализован в Chrome для Android в 2012 году. До этого разработчикам приходилось полагаться только на логи и эмуляторы, что значительно усложняло отладку мобильных приложений.',
    examples: [
      {
        title: 'Настройка Remote Debugging для Android',
        code: `// 1. Включить USB debugging на Android:
// Settings → Developer options → USB debugging

// 2. Подключить устройство через USB

// 3. В Chrome на компьютере:
// chrome://inspect → Devices
// Найти устройство и нажать "inspect"

// 4. DevTools откроется для мобильного браузера`
      },
      {
        title: 'Настройка Remote Debugging для iOS',
        code: `// 1. На iOS устройстве:
// Settings → Safari → Advanced → Web Inspector (включить)

// 2. Подключить устройство к Mac через USB

// 3. На Mac в Safari:
// Develop → [Device Name] → [Page]
// Откроется Web Inspector для iOS Safari`
      },
      {
        title: 'Network debugging через remote',
        code: `// В Chrome DevTools на компьютере:
// 1. Подключить мобильное устройство
// 2. Открыть вкладку Network
// 3. Все запросы с мобильного устройства
//    будут видны в Network tab
// 4. Можно анализировать:
//    - Время загрузки
//    - Размер ответов
//    - Headers
//    - Throttling сети`
      }
    ]
  }
];
