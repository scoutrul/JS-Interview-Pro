import { Topic } from '../types';

export const INTERMEDIATE_TOPICS: Topic[] = [
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
  },
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
];

