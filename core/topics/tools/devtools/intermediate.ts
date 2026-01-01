import { Topic } from '../../../types';

export const DEVTOOLS_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'devtools-debugging',
    title: 'Console и Sources: отладка JavaScript',
    difficulty: 'intermediate',
    description: 'Инструменты для диагностики ошибок и пошаговой отладки JavaScript-кода. Console позволяет логировать данные и выполнять код, а Sources предоставляет возможности для пошаговой отладки с breakpoints.',
    keyPoints: [
      'Console: console.log / warn / error для логирования',
      'Ошибки выполнения JS и их анализ',
      'Breakpoints: точки останова для отладки',
      'Call Stack и Scope: понимание контекста выполнения',
      'Пошаговое выполнение кода: step over, step into, step out',
      'Использование: поиск логических ошибок, отладка асинхронного кода, понимание порядка выполнения',
      'Debugger важнее console.log для глубокой отладки, связано с Call Stack и Execution Context'
    ],
    tags: ['tools', 'devtools', 'debugging', 'javascript', 'console', 'sources'],
    relatedTopics: ['devtools-intro', 'devtools-elements'],
    examples: [
      {
        title: 'Использование console',
        code: `console.log('Обычное сообщение');
console.warn('Предупреждение');
console.error('Ошибка');
console.table([{name: 'John', age: 30}]);`
      },
      {
        title: 'Breakpoints и отладка',
        code: `function processData(data) {
  debugger; // Точка останова
  const result = data.map(item => item.value);
  return result;
}`
      }
    ]
  },
  {
    id: 'devtools-network',
    title: 'Network: запросы и API',
    difficulty: 'intermediate',
    description: 'Вкладка Network показывает все сетевые запросы страницы. Она позволяет анализировать HTTP-статусы, headers, payload, response, типы запросов и тайминги загрузки.',
    keyPoints: [
      'Что это: вкладка для анализа всех сетевых запросов страницы',
      'HTTP-статусы: 200, 404, 500 и другие',
      'Headers, Payload, Response: детальная информация о запросах',
      'Типы запросов: fetch, xhr, document, stylesheet, script',
      'Тайминги загрузки: DNS, TCP, SSL, TTFB, Download',
      'Использование: отладка API, проверка CORS, поиск лишних запросов',
      'Умение читать Network — must-have для фронтендера, важно понимать жизненный цикл запроса'
    ],
    tags: ['tools', 'devtools', 'network', 'http', 'api', 'debugging'],
    relatedTopics: ['devtools-intro'],
    examples: [
      {
        title: 'Анализ запроса в Network',
        code: `// В Network tab можно увидеть:
// - Request URL
// - Request Method (GET, POST, etc.)
// - Status Code (200, 404, etc.)
// - Headers (Request/Response)
// - Payload
// - Timing`
      }
    ]
  },
  {
    id: 'devtools-application',
    title: 'Application: Storage и PWA',
    difficulty: 'intermediate',
    description: 'Инструменты для работы с хранилищами и прогрессивными веб-приложениями. Application tab позволяет просматривать и редактировать LocalStorage, SessionStorage, Cookies, IndexedDB, Cache Storage и Service Workers.',
    keyPoints: [
      'Что это: инструменты для работы с хранилищами и PWA',
      'LocalStorage и SessionStorage: просмотр и редактирование',
      'Cookies: управление cookies приложения',
      'IndexedDB: просмотр структуры базы данных',
      'Cache Storage: анализ кеша Service Workers',
      'Service Workers: регистрация и отладка',
      'Использование: отладка авторизации, проверка кеширования, работа с PWA',
      'Важно понимать различия между типами Storage и где что хранится'
    ],
    tags: ['tools', 'devtools', 'storage', 'localStorage', 'sessionStorage', 'cookies', 'indexeddb', 'pwa', 'service-workers'],
    relatedTopics: ['devtools-intro'],
    examples: [
      {
        title: 'Работа с Storage',
        code: `// LocalStorage
localStorage.setItem('key', 'value');
localStorage.getItem('key');

// SessionStorage
sessionStorage.setItem('key', 'value');

// Cookies
document.cookie = 'name=value; expires=...';`
      }
    ]
  },
  {
    id: 'devtools-mobile',
    title: 'Mobile и Responsive инструменты',
    difficulty: 'intermediate',
    description: 'Инструменты для эмуляции мобильных устройств и сетевых условий. Device Toolbar позволяет тестировать адаптивность, эмулировать различные экраны, touch-события и ограничения производительности.',
    keyPoints: [
      'Что это: инструменты для эмуляции мобильных устройств и сетевых условий',
      'Device Toolbar: переключение между устройствами',
      'Эмуляция экранов: различные разрешения и ориентации',
      'Touch-события: симуляция мобильных взаимодействий',
      'CPU и Network throttling: ограничение производительности и скорости сети',
      'Использование: проверка адаптивности, тестирование медленного интернета, анализ мобильного UX',
      'Важно помнить: эмуляция ≠ реальное устройство, но полезна для performance-тестирования'
    ],
    tags: ['tools', 'devtools', 'mobile', 'responsive', 'performance', 'testing'],
    relatedTopics: ['devtools-intro', 'browser-mobile'],
    examples: [
      {
        title: 'Device Toolbar',
        code: `// Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
// Позволяет:
// - Выбрать устройство (iPhone, iPad, etc.)
// - Изменить размер экрана
// - Эмулировать touch-события
// - Настроить throttling`
      }
    ]
  }
];
