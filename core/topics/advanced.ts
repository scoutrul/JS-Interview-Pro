import { Topic } from '../types';

export const ADVANCED_TOPICS: Topic[] = [
  {
    id: 'lexical-env',
    title: 'Лексическое окружение',
    difficulty: 'advanced',
    description: 'Это внутренняя структура движка, которая "живет" в памяти при выполнении функций. Она состоит из двух частей: записи окружения (Environment Record), где хранятся локальные переменные, и ссылки на внешнее окружение (Outer Reference). Каждый раз, когда функция создается, она "захватывает" ссылку на то место, где была определена. Именно благодаря этой невидимой связи в JavaScript работают замыкания. Лексическое окружение — это теоретический фундамент, на котором строится вся магия управления состоянием.',
    keyPoints: [
      'Создается при каждом вызове функции.',
      'Определяет доступный контекст данных.'
    ],
    tags: ['lexical environment', 'internals', 'memory'],
    examples: [
      {
        title: "Захват окружения",
        code: `let x = 1;\nfunction func() {\n  console.log(x);\n}\nx = 2;\nfunc(); // 2 (берет актуальное значение)`
      }
    ],
    relatedTopics: ['scope-chain', 'closures-basic'],
    nextTopicId: 'closures-basic'
  },
  {
    id: 'event-loop',
    title: 'Event Loop',
    difficulty: 'advanced',
    description: 'Цикл событий — это механизм, который делает возможным асинхронное программирование в однопоточном JavaScript. Движок выполняет код в Call Stack. Когда встречается асинхронная операция (таймер, запрос к API), она делегируется браузеру/среде окружения. По завершении результат попадает в очереди (Microtasks или Macrotasks). Event Loop постоянно следит: если стек пуст, он берет задачи из очередей и переносит их в стек. Понимание приоритета микрозадач (промисы) над макрозадачами (таймеры) — ключ к написанию производительных приложений.',
    keyPoints: [
      'Сначала выполняется стек (синхронный код).',
      'Затем все микрозадачи (Promises).',
      'Затем одна макрозадача (setTimeout).'
    ],
    tags: ['event loop', 'async', 'performance'],
    examples: [
      {
        title: "Приоритеты",
        code: `console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n// 1, 4, 3, 2`
      }
    ],
    relatedTopics: ['promises', 'async-await'],
    nextTopicId: 'promises'
  },
  {
    id: 'generators',
    title: 'Generators',
    difficulty: 'advanced',
    description: 'Генераторы — это особый тип функций, которые могут приостанавливать свое выполнение на середине и возвращать промежуточный результат с помощью ключевого слова yield, а затем возобновлять работу с того же места. При вызове генератор возвращает специальный объект-итератор. Это мощный инструмент для работы с бесконечными потоками данных, реализации сложной асинхронной логики (как в библиотеке Redux-Saga) и ленивых вычислений.',
    keyPoints: [
      'Возвращают объект-итератор.',
      'Основа для сложных асинхронных паттернов.'
    ],
    tags: ['generators', 'iterators', 'yield'],
    examples: [
      {
        title: "Простой генератор",
        code: `function* gen() {\n  yield 1;\n  yield 2;\n}\nconst g = gen();\ng.next().value; // 1`
      }
    ],
    relatedTopics: ['async-await'],
    nextTopicId: 'immutability'
  }
];

