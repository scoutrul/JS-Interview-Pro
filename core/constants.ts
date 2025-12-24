
import { Category, Topic } from './types';

const VARIABLES_TOPICS: Topic[] = [
  {
    id: 'var-let-const',
    title: 'var, let, const',
    difficulty: 'beginner',
    description: 'Основополагающая тема JavaScript, касающаяся управления памятью и жизненного цикла данных. До появления стандарта ES6 в 2015 году, JavaScript полагался исключительно на var, что приводило к проблемам с "загрязнением" глобальной области видимости и трудноуловимым багам из-за отсутствия блочной видимости. Современный стандарт диктует использование let для изменяемых данных и const для неизменяемых ссылок, что делает код более предсказуемым и безопасным. Понимание разницы между ними — первый критический шаг на любом техническом интервью.',
    keyPoints: [
      'var: функциональная область видимости, допускает повторное объявление, всплывает (hoisting).',
      'let/const: блочная область видимости, не допускают повторного объявления.',
      'const требует инициализации и запрещает переопределение ссылки.'
    ],
    tags: ['variables', 'scope', 'let', 'const', 'hoisting', 'ES6'],
    examples: [
      {
        title: "Разница областей видимости",
        code: `if (true) {\n  var x = 5;\n  let y = 10;\n}\nconsole.log(x); // 5\n// console.log(y); // ReferenceError`
      }
    ],
    relatedTopics: ['hoisting', 'tdz'],
    nextTopicId: 'hoisting'
  },
  {
    id: 'hoisting',
    title: 'Hoisting (Всплытие)',
    difficulty: 'intermediate',
    description: 'Механизм, при котором интерпретатор JavaScript визуально "поднимает" объявления переменных и функций в начало их области видимости перед выполнением кода. Важно понимать, что физически код остается на месте — это поведение движка на стадии компиляции (creation phase). Hoisting часто становится причиной недоразумений, особенно при использовании var, где переменная инициализируется значением undefined до фактической строки кода, в то время как функции (Function Declarations) всплывают целиком, позволяя вызывать их раньше объявления.',
    keyPoints: [
      'Function Declaration всплывает полностью.',
      'var всплывает с инициализацией undefined.',
      'let/const всплывают, но доступ к ним запрещен до объявления (TDZ).'
    ],
    tags: ['hoisting', 'scope', 'internals'],
    examples: [
      {
        title: "Всплытие функций и переменных",
        code: `sayHi(); // "Hi"\nfunction sayHi() { console.log("Hi"); }\n\nconsole.log(a); // undefined\nvar a = 5;`
      }
    ],
    relatedTopics: ['var-let-const', 'tdz'],
    nextTopicId: 'tdz'
  },
  {
    id: 'tdz',
    title: 'Temporal Dead Zone (TDZ)',
    difficulty: 'intermediate',
    description: 'Временная мертвая зона — это специфическое поведение let и const, предназначенное для предотвращения использования переменных до их фактической инициализации. В отличие от var, который возвращает undefined, попытка обращения к переменной в TDZ приведет к фатальной ошибке ReferenceError. Это дисциплинирует разработчика и помогает ловить логические ошибки на ранних этапах. Зона начинается с момента входа в блок кода и длится до строки, где переменная объявляется.',
    keyPoints: [
      'Зона от начала блока до строки объявления.',
      'Защищает от логических ошибок использования неинициализированных данных.'
    ],
    tags: ['tdz', 'variables', 'errors'],
    examples: [
      {
        title: "Проявление TDZ",
        code: `{\n  // console.log(x); // ReferenceError\n  let x = 5;\n}`
      }
    ],
    relatedTopics: ['var-let-const', 'scope-chain'],
    nextTopicId: 'scope-chain'
  },
  {
    id: 'scope-chain',
    title: 'Scope Chain',
    difficulty: 'beginner',
    description: 'Цепочка областей видимости определяет, как JavaScript ищет переменные в коде. Когда вы обращаетесь к переменной, движок сначала ищет её в текущей (локальной) области видимости. Если не находит — переходит к "родительской" области, и так далее до глобальной области. Это однонаправленный процесс: функция может видеть переменные своих родителей, но родители не имеют доступа к локальным переменным дочерних функций. Понимание этой иерархии критически важно для работы с замыканиями и отладки сложных приложений.',
    keyPoints: [
      'Поиск идет строго снизу вверх по иерархии.',
      'Функции имеют доступ к переменным родителей, но не наоборот.'
    ],
    tags: ['scope', 'closure', 'chain'],
    examples: [
      {
        title: "Поиск по цепочке",
        code: `const name = "Global";\nfunction outer() {\n  const name = "Outer";\n  function inner() {\n    console.log(name); // "Outer"\n  }\n  inner();\n}\nouter();`
      }
    ],
    relatedTopics: ['lexical-env', 'closures-basic'],
    nextTopicId: 'lexical-env'
  }
];

const CLOSURES_TOPICS: Topic[] = [
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
    id: 'closures-basic',
    title: 'Замыкания (Closures)',
    difficulty: 'intermediate',
    description: 'Замыкание — это комбинация функции и её лексического окружения, в котором она была создана. Говоря проще: это функция, которая "помнит" свои внешние переменные даже после того, как внешняя функция завершила работу. Это одна из самых мощных концепций JavaScript, позволяющая создавать инкапсулированные данные, приватные методы и сохранять состояние без использования глобальных переменных. На интервью это "золотой стандарт" вопроса, который проверяет глубину понимания языка.',
    keyPoints: [
      'Используется для инкапсуляции и создания приватных данных.',
      'Переменные сохраняются в памяти, пока на них ссылается внутренняя функция.'
    ],
    tags: ['closure', 'scope', 'encapsulation'],
    examples: [
      {
        title: "Счетчик",
        code: `function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2`
      }
    ],
    relatedTopics: ['lexical-env', 'private-state'],
    nextTopicId: 'private-state'
  },
  {
    id: 'private-state',
    title: 'Приватное состояние',
    difficulty: 'intermediate',
    description: 'В JavaScript до недавнего времени не было встроенных средств для создания по-настоящему приватных свойств объектов. Замыкания стали классическим решением этой задачи (паттерн Модуль). Вы определяете переменные внутри функции и возвращаете объект с методами, которые имеют доступ к этим переменным. Снаружи напрямую изменить эти данные невозможно — только через предоставленный интерфейс. Это основа модульной архитектуры и многих современных библиотек.',
    keyPoints: [
      'Паттерн "Модуль".',
      'Защита данных от прямого изменения извне.'
    ],
    tags: ['closure', 'privacy', 'module pattern'],
    examples: [
      {
        title: "Инкапсуляция баланса",
        code: `function createAccount(initial) {\n  let balance = initial;\n  return {\n    get: () => balance,\n    add: (v) => balance += v\n  };\n}`
      }
    ],
    relatedTopics: ['closures-basic'],
    nextTopicId: 'this-basics'
  }
];

const THIS_TOPICS: Topic[] = [
  {
    id: 'this-basics',
    title: 'Контекст this',
    difficulty: 'beginner',
    description: 'Ключевое слово this в JavaScript ведет себя иначе, чем во многих других языках. Его значение не фиксируется при определении функции, а вычисляется в момент её вызова. Это делает язык гибким, но часто запутывает новичков. Существует 4 основных правила определения this: вызов как метода объекта, обычный вызов функции (в строгом режиме this будет undefined), явная привязка через call/apply/bind и вызов через оператор new. Мастерство управления контекстом — признак опытного разработчика.',
    keyPoints: [
      'В методе — ссылается на объект.',
      'В обычной функции (strict mode) — undefined.',
      'В глобальном контексте — window/global.'
    ],
    tags: ['this', 'context', 'objects'],
    examples: [
      {
        title: "Вызов метода",
        code: `const user = {\n  name: "Alice",\n  say() { console.log(this.name); }\n};\nuser.say(); // "Alice"`
      }
    ],
    relatedTopics: ['arrow-functions', 'context-loss'],
    nextTopicId: 'arrow-functions'
  },
  {
    id: 'arrow-functions',
    title: 'this в стрелках',
    difficulty: 'intermediate',
    description: 'Стрелочные функции (ES6) кардинально изменили подход к работе с контекстом. У них нет своего собственного this — они "заимствуют" его из окружающего лексического контекста в момент создания. Это свойство делает их незаменимыми для колбэков, обработчиков событий и методов setTimeout, где обычные функции часто теряют контекст. Однако это же свойство делает их непригодными для использования в качестве методов объекта, если вы хотите иметь доступ к свойствам этого объекта через this.',
    keyPoints: [
      'this в стрелках нельзя переопределить через bind/call.',
      'Идеальны для колбэков внутри методов.'
    ],
    tags: ['this', 'arrow functions', 'ES6'],
    examples: [
      {
        title: "Лексический this",
        code: `const obj = {\n  name: "Obj",\n  log() {\n    setTimeout(() => console.log(this.name), 100);\n  }\n};\nobj.log(); // "Obj"`
      }
    ],
    relatedTopics: ['this-basics'],
    nextTopicId: 'context-loss'
  },
  {
    id: 'context-loss',
    title: 'Потеря контекста',
    difficulty: 'intermediate',
    description: 'Один из самых распространенных багов в JavaScript — когда метод объекта передается куда-то как обычная функция (например, в setTimeout или как обработчик клика). В этом случае связь с объектом разрывается, и this перестает указывать на него. Разработчики используют несколько стратегий для борьбы с этим: создание "обертки" в виде стрелочной функции или использование метода bind для жесткой фиксации контекста. Понимание причин потери контекста экономит часы отладки.',
    keyPoints: [
      'Часто случается в setTimeout или event listeners.',
      'Решается через bind или стрелочные функции.'
    ],
    tags: ['this', 'callbacks', 'errors'],
    examples: [
      {
        title: "Потеря и решение",
        code: `const user = { name: "Ivan", greet() { console.log(this.name); } };\nconst f = user.greet;\nf(); // undefined\nconst boundF = user.greet.bind(user);\nboundF(); // "Ivan"`
      }
    ],
    relatedTopics: ['bind-call-apply'],
    nextTopicId: 'bind-call-apply'
  },
  {
    id: 'bind-call-apply',
    title: 'Методы функций',
    difficulty: 'intermediate',
    description: 'Это инструменты для явного управления контекстом (explicit binding). Методы call и apply вызывают функцию немедленно с указанным this, разница лишь в способе передачи аргументов (call — через запятую, apply — массивом). Метод bind работает иначе: он не вызывает функцию сразу, а создает и возвращает её новую копию, "намертво" привязанную к определенному объекту. Это позволяет гарантировать корректность контекста в будущем.',
    keyPoints: [
      'call: аргументы через запятую.',
      'apply: аргументы массивом.',
      'bind: жесткая фиксация контекста навсегда.'
    ],
    tags: ['bind', 'call', 'apply', 'this'],
    examples: [
      {
        title: "Явная привязка",
        code: `function greet(s) { console.log(s + this.name); }\ngreet.call({name: "Bob"}, "Hello ");`
      }
    ],
    relatedTopics: ['this-basics'],
    nextTopicId: 'prototype-chain'
  }
];

const PROTOTYPE_TOPICS: Topic[] = [
  {
    id: 'prototype-chain',
    title: 'Прототипы',
    difficulty: 'intermediate',
    description: 'Прототипное наследование — это "сердце" объектно-ориентированной модели JavaScript. В отличие от классических языков (Java, C++), где наследование идет от классов, здесь объекты наследуют напрямую от других объектов. Каждый объект имеет скрытое свойство [[Prototype]] (доступное через __proto__), которое ссылается на другой объект. Если свойство не найдено в самом объекте, поиск продолжается по цепочке прототипов до самого верха (Object.prototype). Это позволяет эффективно переиспользовать методы и экономить память.',
    keyPoints: [
      'Свойство __proto__ ссылается на прототип.',
      'Object.prototype — вершина цепочки.'
    ],
    tags: ['prototype', 'inheritance', 'oop'],
    examples: [
      {
        title: "Наследование",
        code: `const animal = { eats: true };\nconst cat = { jumps: true };\ncat.__proto__ = animal;\nconsole.log(cat.eats); // true`
      }
    ],
    relatedTopics: ['this-basics'],
    nextTopicId: 'event-loop'
  }
];

const ADVANCED_TOPICS: Topic[] = [
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
    id: 'promises',
    title: 'Promises (Промисы)',
    difficulty: 'intermediate',
    description: 'Промис — это объект, представляющий результат асинхронной операции, который может быть доступен сейчас, позже или никогда. До их появления разработчики страдали от "Callback Hell" (вложенных обратных вызовов), что делало код нечитаемым. Промисы позволяют писать асинхронный код в линейном стиле с использованием методов .then(), .catch() и .finally(). Промис может находиться в одном из трех состояний: ожидание (pending), успешно выполнен (fulfilled) или отклонен (rejected).',
    keyPoints: [
      'Состояния: pending, fulfilled, rejected.',
      'Методы: then, catch, finally.',
      'Promise.all для параллельного выполнения.'
    ],
    tags: ['promise', 'async', 'flow'],
    examples: [
      {
        title: "Цепочка промисов",
        code: `fetch(url)\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`
      }
    ],
    relatedTopics: ['event-loop', 'async-await'],
    nextTopicId: 'async-await'
  },
  {
    id: 'async-await',
    title: 'Async / Await',
    difficulty: 'intermediate',
    description: 'Async/await — это синтаксический сахар над промисами, введенный в ES2017. Он позволяет писать асинхронный код так, будто он синхронный, что значительно упрощает чтение и поддержку. Ключевое слово async делает функцию асинхронной (она всегда возвращает промис), а await заставляет интерпретатор ждать завершения промиса внутри такой функции, не блокируя при этом основной поток выполнения. Для обработки ошибок используется стандартная конструкция try/catch.',
    keyPoints: [
      'async всегда возвращает промис.',
      'await приостанавливает функцию до выполнения промиса.',
      'Обработка ошибок через try/catch.'
    ],
    tags: ['async', 'await', 'ES2017'],
    examples: [
      {
        title: "Чистая асинхронность",
        code: `async function load() {\n  try {\n    const res = await fetch(url);\n    const data = await res.json();\n    return data;\n  } catch(e) { /* ... */ }\n}`
      }
    ],
    relatedTopics: ['promises'],
    nextTopicId: 'generators'
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

export const KNOWLEDGE_BASE: Category[] = [
  { id: 'variables', title: 'Переменные и Область видимости', topics: VARIABLES_TOPICS },
  { id: 'closures', title: 'Замыкания и Окружение', topics: CLOSURES_TOPICS },
  { id: 'this-context', title: 'Контекст this', topics: THIS_TOPICS },
  { id: 'prototypes', title: 'Прототипы и ООП', topics: PROTOTYPE_TOPICS },
  { id: 'advanced-js', title: 'Продвинутый JavaScript', topics: ADVANCED_TOPICS },
  { id: 'functional', title: 'Функциональные концепции', topics: [
    {
      id: 'immutability',
      title: 'Иммутабельность',
      difficulty: 'intermediate',
      description: 'Иммутабельность (неизменяемость) — это концепция программирования, при которой данные никогда не меняются напрямую. Вместо изменения существующего объекта или массива создается его новая копия с обновленными данными. Этот подход критически важен в функциональном программировании и в современных фронтенд-фреймворках (React, Redux), так как он позволяет легко отслеживать изменения данных и реализовывать функции вроде "отмены" (undo/redo) или оптимизации рендеринга.',
      keyPoints: [
        'Предотвращает побочные эффекты.',
        'Важно для React и Redux.'
      ],
      tags: ['immutability', 'functional', 'react'],
      examples: [
        {
          title: "Обновление объекта",
          code: `const user = { name: "Ivan", age: 20 };\nconst updatedUser = { ...user, age: 21 };`
        }
      ],
      relatedTopics: ['closures-basic']
    }
  ]}
];
