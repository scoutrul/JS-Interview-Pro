import { Topic } from '../../../types';

export const JS_FUNCTIONS_INTERMEDIATE_TOPICS: Topic[] = [
{
    id: 'closures-basic',
    title: 'Замыкания (Closures)',
    difficulty: 'intermediate',
    description: 'Замыкание — функция, которая сохраняет доступ к переменным внешней области видимости после её завершения. Используется для инкапсуляции и сохранения состояния.',
    keyPoints: [
      'Используется для инкапсуляции и создания приватных данных.',
      'Переменные сохраняются в памяти, пока на них ссылается внутренняя функция.'
    ],
    funFact: 'Замыкания были открыты случайно в 1960-х годах в языке Lisp. В JavaScript они стали фундаментальной частью языка и используются повсеместно, даже когда программист об этом не думает.',
    tags: ['closure', 'scope', 'encapsulation', 'scope-chain', 'lexical-scoping'],
    examples: [
      {
        title: "Счетчик",
        code: `function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2`
      },
      {
        title: "Замыкание с параметрами",
        code: `function multiply(x) {\n  return function(y) {\n    return x * y;\n  };\n}\nconst double = multiply(2);\nconsole.log(double(5)); // 10`
      },
      {
        title: "Несколько замыканий",
        code: `function createFunctions() {\n  const arr = [];\n  for (let i = 0; i < 3; i++) {\n    arr.push(() => i);\n  }\n  return arr;\n}\nconst funcs = createFunctions();\nfuncs[0](); // 0\nfuncs[1](); // 1\nfuncs[2](); // 2`
      }
    ],
    relatedTopics: ['lexical-env', 'private-state'],
  },
{
    id: 'private-state',
    title: 'Приватное состояние',
    difficulty: 'intermediate',
    description: 'Паттерн Модуль: переменные внутри функции недоступны снаружи. Возвращаешь объект с методами, которые имеют доступ к этим переменным через замыкание.',
    keyPoints: [
      'Паттерн "Модуль".',
      'Защита данных от прямого изменения извне.'
    ],
    funFact: 'Паттерн "Модуль" был популяризирован Дугласом Крокфордом (Douglas Crockford) в 2003 году. До появления ES6 классов это был единственный способ создать приватные свойства в JavaScript.',
    tags: ['closure', 'privacy', 'module pattern', 'closures-basic', 'encapsulation'],
    examples: [
      {
        title: "Инкапсуляция баланса",
        code: `function createAccount(initial) {\n  let balance = initial;\n  return {\n    get: () => balance,\n    add: (v) => balance += v\n  };\n}`
      },
      {
        title: "Приватные методы",
        code: `function createCalculator() {\n  let value = 0;\n  \n  function add(x) { value += x; }\n  function subtract(x) { value -= x; }\n  \n  return {\n    get: () => value,\n    increment: () => add(1),\n    decrement: () => subtract(1)\n  };\n}`
      },
      {
        title: "Множественные экземпляры",
        code: `function createUser(name) {\n  let privateName = name;\n  return {\n    getName: () => privateName,\n    setName: (newName) => { privateName = newName; }\n  };\n}\nconst user1 = createUser("Alice");\nconst user2 = createUser("Bob");\n// user1 и user2 имеют независимые privateName`
      }
    ],
    relatedTopics: ['closures-basic'],
  },
{
    id: 'arrow-functions',
    title: 'this в стрелках',
    difficulty: 'intermediate',
    description: 'У стрелочных функций нет своего this — они берут его из внешнего контекста в момент создания. Нельзя переопределить через bind/call/apply.',
    keyPoints: [
      'this в стрелках нельзя переопределить через bind/call.',
      'Идеальны для колбэков внутри методов.'
    ],
    funFact: 'Стрелочные функции были добавлены в ES6 частично для решения проблемы потери контекста this в колбэках. Они "захватывают" this лексически, как обычные переменные.',
    tags: ['this', 'arrow functions', 'ES6', 'this-basics', 'context-loss'],
    examples: [
      {
        title: "Лексический this",
        code: `const obj = {\n  name: "Obj",\n  log() {\n    setTimeout(() => console.log(this.name), 100);\n  }\n};\nobj.log(); // "Obj"`
      },
      {
        title: "Стрелка не может быть методом",
        code: `const obj = {\n  name: "Test",\n  arrow: () => this.name, // undefined\n  regular: function() { return this.name; } // "Test"\n};\nobj.arrow(); // undefined\nobj.regular(); // "Test"`
      },
      {
        title: "Стрелка в колбэке",
        code: `class Button {\n  constructor(name) {\n    this.name = name;\n  }\n  \n  click() {\n    document.addEventListener('click', () => {\n      console.log(this.name); // сохраняет this\n    });\n  }\n}`
      }
    ],
    relatedTopics: ['this-basics'],
  },
{
    id: 'context-loss',
    title: 'Потеря контекста',
    difficulty: 'intermediate',
    description: 'Когда метод передается как функция (setTimeout, event listener), this теряется. Решения: стрелочная функция-обертка или bind.',
    keyPoints: [
      'Часто случается в setTimeout или event listeners.',
      'Решается через bind или стрелочные функции.'
    ],
    funFact: 'Потеря контекста this — одна из самых частых ошибок в JavaScript. React даже добавил специальный синтаксис для автоматического bind в методах класса (но он устарел в пользу стрелочных функций).',
    tags: ['this', 'callbacks', 'errors', 'this-basics', 'arrow-functions', 'bind-call-apply'],
    examples: [
      {
        title: "Потеря и решение",
        code: `const user = { name: "Ivan", greet() { console.log(this.name); } };\nconst f = user.greet;\nf(); // undefined\nconst boundF = user.greet.bind(user);\nboundF(); // "Ivan"`
      },
      {
        title: "Потеря в setTimeout",
        code: `const timer = {\n  name: "Timer",\n  start() {\n    setTimeout(function() {\n      console.log(this.name); // undefined\n    }, 100);\n  }\n};\n\ntimer.start();`
      },
      {
        title: "Решение через стрелку",
        code: `const timer = {\n  name: "Timer",\n  start() {\n    setTimeout(() => {\n      console.log(this.name); // "Timer"\n    }, 100);\n  }\n};\n\ntimer.start();`
      }
    ],
    relatedTopics: ['bind-call-apply'],
  },
{
    id: 'bind-call-apply',
    title: 'Методы функций',
    difficulty: 'intermediate',
    description: 'call и apply вызывают функцию сразу с указанным this. call принимает аргументы через запятую, apply — массивом. bind возвращает новую функцию с привязанным this.',
    keyPoints: [
      'call: аргументы через запятую.',
      'apply: аргументы массивом.',
      'bind: жесткая фиксация контекста навсегда.'
    ],
    funFact: 'Методы call, apply и bind были добавлены в JavaScript для явного управления контекстом this. Они позволяют "одалживать" методы у одних объектов и использовать их на других.',
    tags: ['bind', 'call', 'apply', 'this', 'this-basics', 'context-loss'],
    examples: [
      {
        title: "Явная привязка",
        code: `function greet(s) { console.log(s + this.name); }\ngreet.call({name: "Bob"}, "Hello ");`
      },
      {
        title: "call vs apply",
        code: `function sum(a, b, c) {\n  return a + b + c;\n}\n\nsum.call(null, 1, 2, 3); // 6\nsum.apply(null, [1, 2, 3]); // 6`
      },
      {
        title: "bind для фиксации контекста",
        code: `const user = { name: "Alice" };\nfunction greet() { console.log(this.name); }\n\nconst boundGreet = greet.bind(user);\nboundGreet(); // "Alice"\n\n// Контекст нельзя изменить\nboundGreet.call({name: "Bob"}); // все еще "Alice"`
      }
    ],
    relatedTopics: ['this-basics'],
  },
{
    id: 'iife',
    title: 'IIFE (Immediately Invoked Function Expression)',
    difficulty: 'intermediate',
    description: 'IIFE — функция, которая выполняется сразу после объявления. Создает изолированную область видимости, предотвращает загрязнение глобального scope.',
    keyPoints: [
      'Синтаксис: (function() {})() или (() => {})().',
      'Создает изолированную область видимости.',
      'Предотвращает загрязнение глобального scope.',
      'Использовалось для модулей до ES6.',
      'Может возвращать значение и присваиваться переменной.'
    ],
    funFact: 'IIFE был популяризирован Беном Алманом (Ben Alman) в 2010 году. До появления ES6 модулей это был стандартный способ создания модулей в JavaScript, используемый в библиотеках вроде jQuery.',
    tags: ['iife', 'scope', 'modules', 'encapsulation', 'functions-types', 'closures-basic'],
    examples: [
      {
        title: "Базовый IIFE",
        code: `(function() {\n  const private = "hidden";\n  console.log("Executed immediately");\n})();\n\n// Arrow function IIFE\n(() => {\n  console.log("Arrow IIFE");\n})();`
      },
      {
        title: "IIFE с возвратом значения",
        code: `const result = (function() {\n  const x = 10;\n  return x * 2;\n})();\n\nconsole.log(result); // 20\n\n// Переменная x недоступна снаружи`
      },
      {
        title: "IIFE с параметрами",
        code: `(function(name) {\n  console.log(\`Hello, \${name}\`);\n})("Alice");\n\n// Использование для модулей\nconst module = (function() {\n  let private = 0;\n  return {\n    get: () => private,\n    set: (val) => { private = val; }\n  };\n})();`
      }
    ],
    relatedTopics: ['scope-chain', 'closures-basic', 'modules']
  },
{
    id: 'callbacks',
    title: 'Callback функции',
    difficulty: 'intermediate',
    description: 'Callback — функция, передаваемая как аргумент и вызываемая позже. Используется в асинхронных операциях, обработчиках событий, методах массивов.',
    keyPoints: [
      'Callback: функция, передаваемая как аргумент.',
      'Используется в setTimeout, addEventListener, array methods.',
      'Callback hell: глубоко вложенные колбэки.',
      'Проблемы: сложность чтения, обработка ошибок.',
      'Решение: промисы, async/await.'
    ],
    funFact: 'Термин "callback hell" или "pyramid of doom" был придуман для описания глубоко вложенных колбэков. Это привело к созданию промисов и async/await для улучшения читаемости кода.',
    tags: ['callbacks', 'async', 'functions', 'patterns', 'higher-order-functions', 'promises'],
    examples: [
      {
        title: "Базовые callbacks",
        code: `function processData(data, callback) {\n  // Симуляция асинхронной операции\n  setTimeout(() => {\n    const result = data.toUpperCase();\n    callback(result);\n  }, 1000);\n}\n\nprocessData("hello", (result) => {\n  console.log(result); // "HELLO"\n});`
      },
      {
        title: "Callback hell",
        code: `getData((data1) => {\n  processData(data1, (data2) => {\n    saveData(data2, (data3) => {\n      sendData(data3, (result) => {\n        console.log(result);\n        // Сложно читать и поддерживать\n      });\n    });\n  });\n});`
      },
      {
        title: "Callbacks в методах массивов",
        code: `const numbers = [1, 2, 3, 4];\n\nnumbers.map(n => n * 2); // [2, 4, 6, 8]\nnumbers.filter(n => n > 2); // [3, 4]\nnumbers.forEach(n => console.log(n));\n\n// Callback вызывается для каждого элемента`
      }
    ],
    relatedTopics: ['promises', 'async-await', 'functions-types']
  },
{
    id: 'higher-order-functions',
    title: 'Функции высшего порядка',
    difficulty: 'intermediate',
    description: 'Функция высшего порядка — принимает функции как аргументы или возвращает функции. Примеры: map, filter, reduce, setTimeout.',
    keyPoints: [
      'Принимает функции как аргументы или возвращает функции.',
      'Примеры: map, filter, reduce, setTimeout.',
      'Создает абстракции и переиспользование кода.',
      'Декларативный стиль вместо императивного.',
      'Основа функционального программирования.'
    ],
    funFact: 'Концепция функций высшего порядка пришла из математики и функциональных языков программирования (Lisp, Haskell). В JavaScript они стали популярны благодаря методам массивов.',
    tags: ['functions', 'functional', 'abstraction', 'patterns', 'callbacks', 'closures-basic'],
    examples: [
      {
        title: "Функция, принимающая функцию",
        code: `function operate(a, b, operation) {\n  return operation(a, b);\n}\n\noperate(5, 3, (x, y) => x + y); // 8\noperate(5, 3, (x, y) => x * y); // 15\noperate(5, 3, Math.max); // 5`
      },
      {
        title: "Функция, возвращающая функцию",
        code: `function multiply(x) {\n  return function(y) {\n    return x * y;\n  };\n}\n\nconst double = multiply(2);\ndouble(5); // 10\n\nconst triple = multiply(3);\ntriple(4); // 12`
      },
      {
        title: "Встроенные HOF",
        code: `const numbers = [1, 2, 3, 4];\n\n// map, filter, reduce - функции высшего порядка\nnumbers.map(n => n * 2);\nnumbers.filter(n => n > 2);\nnumbers.reduce((sum, n) => sum + n, 0);\n\n// setTimeout тоже HOF\nsetTimeout(() => console.log("Delayed"), 1000);`
      }
    ],
    relatedTopics: ['functions-types', 'callbacks', 'closures-basic']
  },
{
    id: 'recursion',
    title: 'Рекурсия',
    difficulty: 'intermediate',
    description: 'Рекурсия — функция вызывает саму себя. Нужен базовый случай для остановки. Используется для обхода деревьев, факториала, поиска.',
    keyPoints: [
      'Функция вызывает саму себя.',
      'Базовый случай: условие остановки рекурсии.',
      'Рекурсивный случай: вызов с измененными параметрами.',
      'Стек вызовов ограничен, возможен stack overflow.',
      'Хвостовая рекурсия может оптимизироваться.'
    ],
    funFact: 'Рекурсия — один из фундаментальных концептов информатики. Многие алгоритмы (быстрая сортировка, обход деревьев) естественно выражаются через рекурсию, хотя могут быть переписаны итеративно.',
    tags: ['recursion', 'algorithms', 'functions', 'stack', 'memoization'],
    examples: [
      {
        title: "Факториал",
        code: `function factorial(n) {\n  // Базовый случай\n  if (n <= 1) return 1;\n  \n  // Рекурсивный случай\n  return n * factorial(n - 1);\n}\n\nfactorial(5); // 120`
      },
      {
        title: "Обход дерева",
        code: `function traverse(node) {\n  if (!node) return;\n  \n  console.log(node.value);\n  traverse(node.left);\n  traverse(node.right);\n}\n\nconst tree = {\n  value: 1,\n  left: { value: 2 },\n  right: { value: 3 }\n};\n\ntraverse(tree);`
      },
      {
        title: "Хвостовая рекурсия",
        code: `// Обычная рекурсия\nfunction sum(n) {\n  if (n === 0) return 0;\n  return n + sum(n - 1);\n}\n\n// Хвостовая рекурсия (оптимизируется)\nfunction sumTail(n, acc = 0) {\n  if (n === 0) return acc;\n  return sumTail(n - 1, acc + n);\n}`
      }
    ],
    relatedTopics: ['functions-types', 'callbacks', 'arrays-advanced']
  }
];
