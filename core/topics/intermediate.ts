import { Topic } from '../types';

export const INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'tdz',
    title: 'Temporal Dead Zone (TDZ)',
    difficulty: 'intermediate',
    description: 'TDZ — период от входа в блок до объявления let/const. Обращение к переменной в TDZ вызывает ReferenceError. var такой защиты не имеет. TDZ помогает избежать ошибок использования неинициализированных переменных.',
    keyPoints: [
      'Зона от начала блока до строки объявления.',
      'Защищает от логических ошибок использования неинициализированных данных.'
    ],
    tags: ['tdz', 'variables', 'errors'],
    examples: [
      {
        title: "Проявление TDZ",
        code: `{\n  // console.log(x); // ReferenceError\n  let x = 5;\n}`
      },
      {
        title: "TDZ с const",
        code: `{\n  // console.log(PI); // ReferenceError\n  const PI = 3.14;\n  console.log(PI); // 3.14\n}`
      },
      {
        title: "TDZ в параметрах функции",
        code: `function test(x = y, y = 2) {\n  // ReferenceError: y в TDZ\n}\n\nfunction test2(x = 2, y = x) {\n  // OK: x уже инициализирован\n}`
      }
    ],
    relatedTopics: ['var-let-const', 'tdz-basic', 'scope-chain'],
    nextTopicId: 'closures-basic'
  },
  {
    id: 'closures-basic',
    title: 'Замыкания (Closures)',
    difficulty: 'intermediate',
    description: 'Замыкание — функция, которая сохраняет доступ к переменным внешней области видимости после её завершения. Используется для инкапсуляции, приватных переменных и сохранения состояния. Переменные не удаляются из памяти, пока на них есть ссылка из замыкания.',
    keyPoints: [
      'Используется для инкапсуляции и создания приватных данных.',
      'Переменные сохраняются в памяти, пока на них ссылается внутренняя функция.'
    ],
    tags: ['closure', 'scope', 'encapsulation'],
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
    nextTopicId: 'private-state'
  },
  {
    id: 'private-state',
    title: 'Приватное состояние',
    difficulty: 'intermediate',
    description: 'Паттерн Модуль: переменные внутри функции недоступны снаружи. Возвращаешь объект с методами, которые имеют доступ к этим переменным через замыкание. Это классический способ создания приватных свойств до появления private полей в классах.',
    keyPoints: [
      'Паттерн "Модуль".',
      'Защита данных от прямого изменения извне.'
    ],
    tags: ['closure', 'privacy', 'module pattern'],
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
    nextTopicId: 'this-basics'
  },
  {
    id: 'arrow-functions',
    title: 'this в стрелках',
    difficulty: 'intermediate',
    description: 'У стрелочных функций нет своего this — они берут его из внешнего контекста в момент создания. Нельзя переопределить через bind/call/apply. Идеальны для колбэков, где нужно сохранить контекст. Не подходят как методы объекта, если нужен доступ к this объекта.',
    keyPoints: [
      'this в стрелках нельзя переопределить через bind/call.',
      'Идеальны для колбэков внутри методов.'
    ],
    tags: ['this', 'arrow functions', 'ES6'],
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
    nextTopicId: 'context-loss'
  },
  {
    id: 'context-loss',
    title: 'Потеря контекста',
    difficulty: 'intermediate',
    description: 'Когда метод передается как функция (setTimeout, event listener), this теряется. Решения: стрелочная функция-обертка или bind. Стрелки фиксируют this лексически, bind создает новую функцию с привязанным контекстом.',
    keyPoints: [
      'Часто случается в setTimeout или event listeners.',
      'Решается через bind или стрелочные функции.'
    ],
    tags: ['this', 'callbacks', 'errors'],
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
    nextTopicId: 'bind-call-apply'
  },
  {
    id: 'bind-call-apply',
    title: 'Методы функций',
    difficulty: 'intermediate',
    description: 'call и apply вызывают функцию сразу с указанным this. call принимает аргументы через запятую, apply — массивом. bind возвращает новую функцию с привязанным this, не вызывая оригинал. bind полезен для фиксации контекста заранее.',
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
    nextTopicId: 'prototype-chain'
  },
  {
    id: 'prototype-chain',
    title: 'Прототипы',
    difficulty: 'intermediate',
    description: 'Объекты наследуют напрямую от других объектов через [[Prototype]]. Если свойство не найдено, поиск идет по цепочке прототипов до Object.prototype. __proto__ — устаревший способ доступа, используй Object.getPrototypeOf(). Прототипы позволяют переиспользовать методы.',
    keyPoints: [
      'Свойство __proto__ ссылается на прототип.',
      'Object.prototype — вершина цепочки.'
    ],
    tags: ['prototype', 'inheritance', 'oop'],
    examples: [
      {
        title: "Наследование",
        code: `const animal = { eats: true };\nconst cat = { jumps: true };\ncat.__proto__ = animal;\nconsole.log(cat.eats); // true`
      },
      {
        title: "Поиск по цепочке",
        code: `const grandparent = { a: 1 };\nconst parent = { b: 2 };\nparent.__proto__ = grandparent;\nconst child = { c: 3 };\nchild.__proto__ = parent;\n\nconsole.log(child.a); // 1 (из grandparent)\nconsole.log(child.b); // 2 (из parent)\nconsole.log(child.c); // 3 (свое)`
      },
      {
        title: "Переопределение метода",
        code: `const animal = {\n  speak() { return "Some sound"; }\n};\nconst dog = {\n  speak() { return "Woof!"; }\n};\ndog.__proto__ = animal;\n\nconsole.log(dog.speak()); // "Woof!" (свой метод)\n\n// Удаляем свой метод\ndelete dog.speak;\nconsole.log(dog.speak()); // "Some sound" (из прототипа)`
      }
    ],
    relatedTopics: ['this-basics'],
    nextTopicId: 'event-loop'
  },
  {
    id: 'promises',
    title: 'Promises (Промисы)',
    difficulty: 'intermediate',
    description: 'Промис — объект для асинхронных операций. Состояния: pending, fulfilled, rejected. Методы: then для успеха, catch для ошибок, finally всегда выполняется. Решает проблему Callback Hell. Promise.all для параллельного выполнения, Promise.race для первого результата.',
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
      },
      {
        title: "Создание промиса",
        code: `const promise = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    resolve("Success!");\n  }, 1000);\n});\n\npromise.then(result => console.log(result));`
      },
      {
        title: "Promise.all и Promise.race",
        code: `const p1 = Promise.resolve(1);\nconst p2 = Promise.resolve(2);\nconst p3 = Promise.resolve(3);\n\nPromise.all([p1, p2, p3]).then(console.log); // [1, 2, 3]\nPromise.race([p1, p2, p3]).then(console.log); // 1 (первый)`
      }
    ],
    relatedTopics: ['event-loop', 'async-await'],
    nextTopicId: 'async-await'
  },
  {
    id: 'async-await',
    title: 'Async / Await',
    difficulty: 'intermediate',
    description: 'async/await — синтаксический сахар над промисами. async функция всегда возвращает промис. await приостанавливает выполнение до разрешения промиса, не блокируя основной поток. Ошибки обрабатываются через try/catch. Код читается как синхронный.',
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
      },
      {
        title: "async всегда возвращает промис",
        code: `async function test() {\n  return 42;\n}\n\nconst result = test();\nconsole.log(result); // Promise { <fulfilled>: 42 }\nresult.then(v => console.log(v)); // 42`
      },
      {
        title: "Параллельное выполнение",
        code: `async function fetchData() {\n  const [users, posts] = await Promise.all([\n    fetch('/users').then(r => r.json()),\n    fetch('/posts').then(r => r.json())\n  ]);\n  return { users, posts };\n}`
      }
    ],
    relatedTopics: ['promises'],
    nextTopicId: 'generators'
  },
  {
    id: 'immutability',
    title: 'Иммутабельность',
    difficulty: 'intermediate',
    description: 'Иммутабельность — данные не изменяются напрямую, создается новая копия. Используй spread оператор, map/filter вместо мутаций. Предотвращает побочные эффекты, упрощает отладку, позволяет отслеживать изменения по ссылке.',
    keyPoints: [
      'Предотвращает побочные эффекты.',
      'Упрощает отладку и тестирование.',
      'Позволяет сравнивать данные по ссылке.'
    ],
    tags: ['immutability', 'functional', 'patterns'],
    examples: [
      {
        title: "Обновление объекта",
        code: `const user = { name: "Ivan", age: 20 };\nconst updatedUser = { ...user, age: 21 };`
      },
      {
        title: "Обновление массива",
        code: `const arr = [1, 2, 3];\nconst newArr = [...arr, 4]; // [1, 2, 3, 4]\nconst doubled = arr.map(x => x * 2); // [2, 4, 6]\n// arr не изменился`
      },
      {
        title: "Вложенные объекты",
        code: `const user = { name: "Ivan", address: { city: "Moscow" } };\nconst updated = {\n  ...user,\n  address: { ...user.address, city: "SPB" }\n};\n// user.address не изменился`
      }
    ],
    relatedTopics: ['closures-basic'],
    nextTopicId: 'arrays-advanced'
  },
  {
    id: 'arrays-advanced',
    title: 'Array методы (продвинутые)',
    difficulty: 'intermediate',
    description: 'reduce аккумулирует значение из массива в одно. some проверяет, есть ли хотя бы один элемент, удовлетворяющий условию. every проверяет, все ли элементы удовлетворяют условию. flat разворачивает вложенные массивы, flatMap комбинирует map и flat.',
    keyPoints: [
      'reduce(acc, item, index, arr): аккумулятор, начальное значение опционально.',
      'some: возвращает true если хотя бы один элемент проходит проверку.',
      'every: возвращает true если все элементы проходят проверку.',
      'flat(depth): разворачивает массивы на указанную глубину.',
      'flatMap: map + flat(1) в одной операции.'
    ],
    tags: ['arrays', 'reduce', 'some', 'every', 'flat'],
    examples: [
      {
        title: "reduce",
        code: `const numbers = [1, 2, 3, 4];\nconst sum = numbers.reduce((acc, n) => acc + n, 0); // 10\nconst product = numbers.reduce((acc, n) => acc * n, 1); // 24\n\nconst max = numbers.reduce((acc, n) => n > acc ? n : acc); // 4`
      },
      {
        title: "some и every",
        code: `const numbers = [1, 2, 3, 4];\nnumbers.some(n => n > 3); // true (есть элемент > 3)\nnumbers.every(n => n > 0); // true (все > 0)\nnumbers.every(n => n > 2); // false (не все > 2)`
      },
      {
        title: "flat и flatMap",
        code: `const arr = [1, [2, 3], [4, [5, 6]]];\narr.flat(); // [1, 2, 3, 4, [5, 6]]\narr.flat(2); // [1, 2, 3, 4, 5, 6]\n\nconst words = ["hello", "world"];\nwords.flatMap(w => w.split("")); // ["h","e","l","l","o","w","o","r","l","d"]`
      }
    ],
    relatedTopics: ['arrays-basic', 'immutability'],
    nextTopicId: 'classes'
  },
  {
    id: 'classes',
    title: 'Классы',
    difficulty: 'intermediate',
    description: 'Классы — синтаксический сахар над функциями-конструкторами. constructor вызывается при new. extends для наследования, super для вызова родителя. static методы принадлежат классу, не экземпляру. private/public поля контролируют доступ.',
    keyPoints: [
      'class: синтаксический сахар над функциями-конструкторами.',
      'extends: наследование, super вызывает родительский конструктор/метод.',
      'static: методы/поля класса, доступны через Class.method.',
      'private: доступ только внутри класса, public по умолчанию.'
    ],
    tags: ['classes', 'inheritance', 'oop', 'ES6'],
    examples: [
      {
        title: "Базовый класс",
        code: `class User {\n  constructor(name) {\n    this.name = name;\n  }\n  \n  greet() {\n    return "Hello, I'm " + this.name;\n  }\n}\n\nconst user = new User("Alice");\nuser.greet(); // "Hello, I'm Alice"`
      },
      {
        title: "Наследование",
        code: `class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() { return "Some sound"; }\n}\n\nclass Dog extends Animal {\n  speak() {\n    return "Woof!";\n  }\n}\n\nconst dog = new Dog("Rex");\ndog.speak(); // "Woof!"`
      },
      {
        title: "static и private",
        code: `class MathUtils {\n  static PI = 3.14;\n  static add(a, b) { return a + b; }\n}\n\nMathUtils.PI; // 3.14\nMathUtils.add(1, 2); // 3\n\nclass Counter {\n  #count = 0; // private\n  increment() { this.#count++; }\n  getCount() { return this.#count; }\n}`
      }
    ],
    relatedTopics: ['prototype-chain', 'this-basics'],
    nextTopicId: 'map-set'
  },
  {
    id: 'map-set',
    title: 'Map и Set',
    difficulty: 'intermediate',
    description: 'Map — коллекция пар ключ-значение, ключи могут быть любого типа (не только строки). Set — коллекция уникальных значений. Map лучше объектов когда нужны ключи не-строки, частые добавления/удаления, размер коллекции. Set для уникальных значений.',
    keyPoints: [
      'Map: ключи любого типа, есть size, методы set/get/has/delete.',
      'Set: уникальные значения, методы add/has/delete.',
      'Map vs Object: ключи не-строки, частые изменения, размер коллекции.',
      'Set vs Array: автоматическая уникальность, быстрая проверка наличия.'
    ],
    tags: ['map', 'set', 'collections', 'ES6'],
    examples: [
      {
        title: "Map",
        code: `const map = new Map();\nmap.set("name", "Alice");\nmap.set(1, "one");\nmap.set({}, "object key");\n\nmap.get("name"); // "Alice"\nmap.has(1); // true\nmap.size; // 3\nmap.delete(1);`
      },
      {
        title: "Set",
        code: `const set = new Set([1, 2, 3, 2, 1]);\nset.size; // 3 (дубликаты удалены)\nset.add(4);\nset.has(3); // true\nset.delete(2);\n\n// Преобразование в массив\nArray.from(set); // [1, 3, 4]`
      },
      {
        title: "Итерация",
        code: `const map = new Map([["a", 1], ["b", 2]]);\nfor (const [key, value] of map) {\n  console.log(key, value);\n}\n\nconst set = new Set([1, 2, 3]);\nfor (const value of set) {\n  console.log(value);\n}`
      }
    ],
    relatedTopics: ['objects-basic', 'arrays-basic'],
    nextTopicId: 'destructuring-advanced'
  },
  {
    id: 'destructuring-advanced',
    title: 'Деструктуризация (продвинутая)',
    difficulty: 'intermediate',
    description: 'Вложенная деструктуризация извлекает значения из вложенных структур. Rest собирает оставшиеся элементы. Можно комбинировать переименование, значения по умолчанию и rest. Деструктуризация в параметрах функций упрощает работу с объектами.',
    keyPoints: [
      'Вложенная: деструктуризация внутри деструктуризации.',
      'Rest: ...rest собирает оставшиеся элементы.',
      'В параметрах: деструктуризация объекта в аргументах функции.',
      'Можно комбинировать: переименование + значения по умолчанию + rest.'
    ],
    tags: ['destructuring', 'rest', 'parameters', 'ES6'],
    examples: [
      {
        title: "Вложенная деструктуризация",
        code: `const user = {\n  name: "Alice",\n  address: { city: "Moscow", street: "Lenina" }\n};\n\nconst { name, address: { city } } = user;\nconsole.log(name, city); // "Alice", "Moscow"\n\nconst arr = [[1, 2], [3, 4]];\nconst [[a], [b]] = arr;\nconsole.log(a, b); // 1, 3`
      },
      {
        title: "Rest в деструктуризации",
        code: `const arr = [1, 2, 3, 4, 5];\nconst [first, second, ...rest] = arr;\nconsole.log(first); // 1\nconsole.log(rest); // [3, 4, 5]\n\nconst obj = { a: 1, b: 2, c: 3 };\nconst { a, ...others } = obj;\nconsole.log(others); // { b: 2, c: 3 }`
      },
      {
        title: "В параметрах функции",
        code: `function greet({ name, age = 18 }) {\n  return "Hello, " + name + ", age " + age;\n}\n\ngreet({ name: "Alice" }); // "Hello, Alice, age 18"\n\ngreet({ name: "Bob", age: 30 }); // "Hello, Bob, age 30"`
      }
    ],
    relatedTopics: ['destructuring-basic', 'functions-types'],
    nextTopicId: 'modules'
  },
  {
    id: 'modules',
    title: 'Модули ES6',
    difficulty: 'intermediate',
    description: 'Модули изолируют код, экспорт делает функции/переменные доступными, импорт подключает их. export default — один экспорт по умолчанию, export — именованные экспорты. import может быть default или именованным, можно переименовывать через as.',
    keyPoints: [
      'export default: один экспорт по умолчанию, импорт без фигурных скобок.',
      'export: именованные экспорты, импорт с фигурными скобками.',
      'import: можно переименовывать через as, импортировать все через *.',
      'Модули изолированы: переменные не попадают в глобальную область видимости.'
    ],
    tags: ['modules', 'import', 'export', 'ES6'],
    examples: [
      {
        title: "export default",
        code: `// math.js\nexport default function add(a, b) {\n  return a + b;\n}\n\n// main.js\nimport add from './math.js';\n// или\nimport myAdd from './math.js';`
      },
      {
        title: "Именованные экспорты",
        code: `// utils.js\nexport function multiply(a, b) { return a * b; }\nexport const PI = 3.14;\n\n// main.js\nimport { multiply, PI } from './utils.js';\n// или\nimport { multiply as mul, PI } from './utils.js';`
      },
      {
        title: "Комбинированный экспорт",
        code: `// lib.js\nexport default class User {}\nexport function helper() {}\nexport const CONST = 42;\n\n// main.js\nimport User, { helper, CONST } from './lib.js';\n// или все сразу\nimport * as lib from './lib.js';\nlib.default; // User\nlib.helper();`
      }
    ],
    relatedTopics: ['functions-types', 'classes'],
    nextTopicId: 'symbol'
  },
  {
    id: 'symbol',
    title: 'Symbol',
    difficulty: 'intermediate',
    description: 'Symbol — уникальный примитивный тип, каждый Symbol уникален даже с одинаковым описанием. Используется для создания скрытых свойств объектов, избегания конфликтов имен. Symbol.for создает глобальный символ, Symbol.keyFor получает ключ.',
    keyPoints: [
      'Каждый Symbol уникален: Symbol("id") !== Symbol("id").',
      'Скрытые свойства: не видны в Object.keys, for...in.',
      'Symbol.for(key): создает/возвращает глобальный символ по ключу.',
      'Symbol.iterator: встроенный символ для итераторов.'
    ],
    tags: ['symbol', 'primitives', 'unique', 'ES6'],
    examples: [
      {
        title: "Уникальность Symbol",
        code: `const sym1 = Symbol("id");\nconst sym2 = Symbol("id");\nconsole.log(sym1 === sym2); // false\n\nconst obj = {};\nobj[sym1] = "value1";\nobj[sym2] = "value2";\nconsole.log(obj[sym1]); // "value1"`
      },
      {
        title: "Скрытые свойства",
        code: `const id = Symbol("id");\nconst user = {\n  name: "Alice",\n  [id]: 123\n};\n\nObject.keys(user); // ["name"]\nfor (const key in user) { console.log(key); } // "name"\nconsole.log(user[id]); // 123 (доступ есть)`
      },
      {
        title: "Symbol.for",
        code: `const global1 = Symbol.for("id");\nconst global2 = Symbol.for("id");\nconsole.log(global1 === global2); // true\n\nSymbol.keyFor(global1); // "id"\n\nconst local = Symbol("id");\nSymbol.keyFor(local); // undefined (не глобальный)`
      }
    ],
    relatedTopics: ['data-types', 'objects-basic'],
    nextTopicId: 'error-handling'
  },
  {
    id: 'error-handling',
    title: 'Обработка ошибок',
    difficulty: 'intermediate',
    description: 'try/catch перехватывает ошибки, finally выполняется всегда. throw выбрасывает ошибку. Можно создавать кастомные классы ошибок через extends Error. Ошибки в промисах обрабатываются через catch, в async/await через try/catch.',
    keyPoints: [
      'try/catch: перехватывает ошибки, выполнение продолжается.',
      'finally: выполняется всегда, даже если была ошибка.',
      'throw: выбрасывает ошибку, можно передать любое значение.',
      'Кастомные ошибки: class extends Error для специфичных ошибок.'
    ],
    tags: ['errors', 'try-catch', 'throw', 'exceptions'],
    examples: [
      {
        title: "try/catch/finally",
        code: `try {\n  const result = riskyOperation();\n  console.log(result);\n} catch (error) {\n  console.error("Error:", error.message);\n} finally {\n  console.log("Always executed");\n}`
      },
      {
        title: "throw",
        code: `function divide(a, b) {\n  if (b === 0) {\n    throw new Error("Division by zero");\n  }\n  return a / b;\n}\n\ntry {\n  divide(10, 0);\n} catch (e) {\n  console.log(e.message); // "Division by zero"\n}`
      },
      {
        title: "Кастомные ошибки",
        code: `class ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = "ValidationError";\n  }\n}\n\ntry {\n  throw new ValidationError("Invalid input");\n} catch (e) {\n  if (e instanceof ValidationError) {\n    console.log("Validation error:", e.message);\n  }\n}`
      }
    ],
    relatedTopics: ['promises', 'async-await']
  }
];

