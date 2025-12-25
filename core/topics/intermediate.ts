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
    nextTopicId: 'constructors'
  },
  {
    id: 'constructors',
    title: 'Функции-конструкторы',
    difficulty: 'intermediate',
    description: 'Функция-конструктор вызывается с new и создает объект. При вызове с new: создается пустой объект, this ссылается на него, выполняется функция, возвращается объект (если нет явного return). Свойство constructor ссылается на функцию-конструктор. Все экземпляры имеют общий прототип через Constructor.prototype.',
    keyPoints: [
      'new Constructor(): создает объект, this = новый объект.',
      'Если нет return, возвращается this (новый объект).',
      'constructor property: ссылается на функцию-конструктор.',
      'Constructor.prototype: общий прототип для всех экземпляров.',
      'Методы в prototype доступны всем экземплярам.'
    ],
    tags: ['constructors', 'new', 'prototype', 'oop'],
    examples: [
      {
        title: "Базовый конструктор",
        code: `function User(name) {\n  this.name = name;\n  this.greet = function() {\n    return "Hello, " + this.name;\n  };\n}\n\nconst user = new User("Alice");\nconsole.log(user.name); // "Alice"\nconsole.log(user.greet()); // "Hello, Alice"\n\n// Проверка\nconsole.log(user.constructor === User); // true`
      },
      {
        title: "Методы в prototype",
        code: `function User(name) {\n  this.name = name;\n}\n\n// Метод в prototype - общий для всех\nUser.prototype.greet = function() {\n  return "Hello, " + this.name;\n};\n\nconst user1 = new User("Alice");\nconst user2 = new User("Bob");\n\nuser1.greet(); // "Hello, Alice"\nuser2.greet(); // "Hello, Bob"\n\n// Один метод для всех экземпляров\nconsole.log(user1.greet === user2.greet); // true`
      },
      {
        title: "Что происходит при new",
        code: `function User(name) {\n  // 1. Создается пустой объект: {} (неявно)\n  // 2. this = {} (неявно)\n  // 3. this.__proto__ = User.prototype (неявно)\n  this.name = name;\n  // 4. return this (неявно, если нет return)\n}\n\n// Эквивалент вручную\nfunction manualNew(Constructor, ...args) {\n  const obj = {};\n  Object.setPrototypeOf(obj, Constructor.prototype);\n  const result = Constructor.apply(obj, args);\n  return result instanceof Object ? result : obj;\n}`
      },
      {
        title: "Забыли new",
        code: `function User(name) {\n  this.name = name;\n}\n\n// С new - работает\nconst user1 = new User("Alice");\nconsole.log(user1.name); // "Alice"\n\n// Без new - this = window/undefined\nconst user2 = User("Bob");\nconsole.log(user2); // undefined\nconsole.log(window.name); // "Bob" (в не strict mode)\n\n// Защита от забытого new\nfunction SafeUser(name) {\n  if (!(this instanceof SafeUser)) {\n    return new SafeUser(name);\n  }\n  this.name = name;\n}`
      }
    ],
    relatedTopics: ['prototype-chain', 'this-basics', 'classes'],
    nextTopicId: 'object-create'
  },
  {
    id: 'object-create',
    title: 'Object.create()',
    difficulty: 'intermediate',
    description: 'Object.create(proto) создает объект с указанным прототипом. Более явный способ создания объектов с прототипом чем __proto__. Второй параметр - дескрипторы свойств. Используется для "чистого" прототипного наследования без конструкторов.',
    keyPoints: [
      'Object.create(proto): создает объект с прототипом proto.',
      'Object.create(null): создает объект без прототипа (чистый словарь).',
      'Второй параметр: дескрипторы свойств {prop: {value, writable, enumerable}}.',
      'Более явный способ чем __proto__ или new Constructor().',
      'Используется для прототипного наследования без конструкторов.'
    ],
    tags: ['object.create', 'prototype', 'inheritance', 'oop'],
    examples: [
      {
        title: "Базовое использование",
        code: `const animal = { eats: true };\nconst cat = Object.create(animal);\ncat.jumps = true;\n\nconsole.log(cat.eats); // true (из прототипа)\nconsole.log(cat.jumps); // true (свое)\nconsole.log(Object.getPrototypeOf(cat) === animal); // true`
      },
      {
        title: "Объект без прототипа",
        code: `// Чистый словарь без методов Object.prototype\nconst dict = Object.create(null);\n\ndict.name = "test";\nconsole.log(dict.toString); // undefined (нет методов Object)\n\n// Полезно для Map-подобных структур\nconst cleanMap = Object.create(null);\ncleanMap["__proto__"] = "safe"; // безопасно, не конфликтует`
      },
      {
        title: "С дескрипторами свойств",
        code: `const proto = { x: 1 };\nconst obj = Object.create(proto, {\n  y: {\n    value: 2,\n    writable: false,\n    enumerable: true,\n    configurable: false\n  },\n  z: {\n    get() { return this.y * 2; },\n    enumerable: true\n  }\n});\n\nconsole.log(obj.x); // 1 (из прототипа)\nconsole.log(obj.y); // 2\nconsole.log(obj.z); // 4 (геттер)\nobj.y = 10; // игнорируется (writable: false)`
      },
      {
        title: "Наследование через Object.create",
        code: `const Animal = {\n  init(name) {\n    this.name = name;\n    return this;\n  },\n  speak() {\n    return this.name + " makes a sound";\n  }\n};\n\nconst Dog = Object.create(Animal);\nDog.speak = function() {\n  return this.name + " barks";\n};\n\nconst dog = Object.create(Dog).init("Rex");\nconsole.log(dog.speak()); // "Rex barks"`
      }
    ],
    relatedTopics: ['prototype-chain', 'constructors'],
    nextTopicId: 'hasownproperty-in'
  },
  {
    id: 'hasownproperty-in',
    title: 'hasOwnProperty vs in',
    difficulty: 'intermediate',
    description: 'hasOwnProperty(prop) проверяет собственное свойство объекта (не из прототипа). prop in obj проверяет наличие свойства в объекте или прототипе. Object.hasOwn() — современная безопасная альтернатива hasOwnProperty. Разница важна при итерации и проверке свойств.',
    keyPoints: [
      'obj.hasOwnProperty(prop): true только для собственных свойств.',
      'prop in obj: true если свойство есть в объекте или прототипе.',
      'Object.hasOwn(obj, prop): современная безопасная альтернатива.',
      'for...in перебирает и собственные, и унаследованные свойства.',
      'Object.keys() возвращает только собственные свойства.'
    ],
    tags: ['hasownproperty', 'in', 'properties', 'prototype', 'oop'],
    examples: [
      {
        title: "Разница hasOwnProperty и in",
        code: `const proto = { inherited: "from proto" };\nconst obj = Object.create(proto);\nobj.own = "own property";\n\nconsole.log(obj.hasOwnProperty("own")); // true\nconsole.log(obj.hasOwnProperty("inherited")); // false\n\nconsole.log("own" in obj); // true\nconsole.log("inherited" in obj); // true (есть в прототипе)\nconsole.log("toString" in obj); // true (из Object.prototype)`
      },
      {
        title: "Object.hasOwn (современный способ)",
        code: `const obj = { x: 1 };\n\n// Старый способ (может быть переопределен)\nobj.hasOwnProperty("x"); // true\n\n// Новый способ (безопасный)\nObject.hasOwn(obj, "x"); // true\n\n// Проблема старого способа\nconst malicious = Object.create(null);\nmalicious.hasOwnProperty = () => true; // переопределили\n// Object.hasOwn безопасен`
      },
      {
        title: "Итерация по свойствам",
        code: `const proto = { protoProp: 1 };\nconst obj = Object.create(proto);\nobj.ownProp = 2;\n\n// for...in - все свойства (включая прототип)\nfor (const key in obj) {\n  console.log(key); // "ownProp", "protoProp"\n}\n\n// Только собственные\nfor (const key in obj) {\n  if (obj.hasOwnProperty(key)) {\n    console.log(key); // только "ownProp"\n  }\n}\n\n// Object.keys - только собственные\nObject.keys(obj); // ["ownProp"]`
      },
      {
        title: "Проверка перед использованием",
        code: `function safeAccess(obj, prop) {\n  // Проверяем наличие (включая прототип)\n  if (prop in obj) {\n    // Проверяем что это собственное свойство\n    if (Object.hasOwn(obj, prop)) {\n      return obj[prop];\n    } else {\n      console.warn(\`\${prop} is inherited\`);\n    }\n  }\n  return undefined;\n}`
      }
    ],
    relatedTopics: ['prototype-chain', 'objects-basic'],
    nextTopicId: 'instanceof'
  },
  {
    id: 'instanceof',
    title: 'instanceof',
    difficulty: 'intermediate',
    description: 'obj instanceof Constructor проверяет, есть ли Constructor.prototype в цепочке прототипов obj. Проверяет всю цепочку, не только прямой прототип. Работает с классами и конструкторами. Symbol.hasInstance позволяет кастомизировать проверку. Можно обмануть, изменив prototype.',
    keyPoints: [
      'obj instanceof Constructor: проверяет цепочку прототипов.',
      'Проверяет: есть ли Constructor.prototype в [[Prototype]] цепочке.',
      'Работает с классами и функциями-конструкторами.',
      'Symbol.hasInstance: кастомная логика проверки.',
      'Можно обмануть, изменив Constructor.prototype.'
    ],
    tags: ['instanceof', 'prototype', 'inheritance', 'oop'],
    examples: [
      {
        title: "Базовое использование",
        code: `function User(name) {\n  this.name = name;\n}\n\nconst user = new User("Alice");\n\nconsole.log(user instanceof User); // true\nconsole.log(user instanceof Object); // true (Object в цепочке)\nconsole.log(user instanceof Array); // false\n\n// С классами\nclass Animal {}\nclass Dog extends Animal {}\n\nconst dog = new Dog();\nconsole.log(dog instanceof Dog); // true\nconsole.log(dog instanceof Animal); // true\nconsole.log(dog instanceof Object); // true`
      },
      {
        title: "Как работает instanceof",
        code: `// obj instanceof Constructor\n// Эквивалентно:\nfunction myInstanceof(obj, Constructor) {\n  let proto = Object.getPrototypeOf(obj);\n  const prototype = Constructor.prototype;\n  \n  while (proto !== null) {\n    if (proto === prototype) {\n      return true;\n    }\n    proto = Object.getPrototypeOf(proto);\n  }\n  return false;\n}\n\nconst arr = [];\nconsole.log(myInstanceof(arr, Array)); // true\nconsole.log(myInstanceof(arr, Object)); // true`
      },
      {
        title: "Symbol.hasInstance",
        code: `class MyArray {\n  static [Symbol.hasInstance](instance) {\n    return Array.isArray(instance);\n  }\n}\n\nconst arr = [1, 2, 3];\nconsole.log(arr instanceof MyArray); // true (кастомная проверка)\n\n// Обычный массив\nconst normalArr = [];\nconsole.log(normalArr instanceof MyArray); // true`
      },
      {
        title: "Проблемы instanceof",
        code: `function User() {}\nconst user = new User();\n\nconsole.log(user instanceof User); // true\n\n// Изменили prototype\nUser.prototype = {};\n\n// Может дать неожиданный результат\nconst user2 = new User();\nconsole.log(user2 instanceof User); // true (новый prototype)\nconsole.log(user instanceof User); // false (старый prototype)`
      }
    ],
    relatedTopics: ['prototype-chain', 'constructors', 'classes'],
    nextTopicId: 'getprototypeof-setprototypeof'
  },
  {
    id: 'getprototypeof-setprototypeof',
    title: 'Object.getPrototypeOf / setPrototypeOf',
    difficulty: 'intermediate',
    description: 'Object.getPrototypeOf(obj) возвращает прототип объекта. Object.setPrototypeOf(obj, proto) устанавливает прототип. Современная альтернатива __proto__. setPrototypeOf медленный, лучше использовать Object.create() при создании. getPrototypeOf безопаснее чем __proto__.',
    keyPoints: [
      'Object.getPrototypeOf(obj): возвращает прототип объекта.',
      'Object.setPrototypeOf(obj, proto): устанавливает прототип (медленно!).',
      'Современная альтернатива __proto__ (устаревший способ).',
      'setPrototypeOf медленный, лучше Object.create() при создании.',
      'getPrototypeOf безопаснее чем obj.__proto__.'
    ],
    tags: ['getprototypeof', 'setprototypeof', 'prototype', 'oop'],
    examples: [
      {
        title: "getPrototypeOf",
        code: `const proto = { x: 1 };\nconst obj = Object.create(proto);\n\n// Получить прототип\nconst prototype = Object.getPrototypeOf(obj);\nconsole.log(prototype === proto); // true\n\n// Устаревший способ\nconsole.log(obj.__proto__ === proto); // true (но не рекомендуется)\n\n// Для классов\nclass User {}\nconst user = new User();\nconsole.log(Object.getPrototypeOf(user) === User.prototype); // true`
      },
      {
        title: "setPrototypeOf",
        code: `const obj = { x: 1 };\nconst proto = { y: 2 };\n\n// Установить прототип\nObject.setPrototypeOf(obj, proto);\n\nconsole.log(obj.x); // 1 (свое)\nconsole.log(obj.y); // 2 (из прототипа)\n\n// Проверка\nconsole.log(Object.getPrototypeOf(obj) === proto); // true`
      },
      {
        title: "Производительность",
        code: `// Медленно - setPrototypeOf\nconst obj1 = {};\nObject.setPrototypeOf(obj1, { x: 1 });\n\n// Быстро - Object.create при создании\nconst obj2 = Object.create({ x: 1 });\n\n// setPrototypeOf оптимизирует движок, но медленнее\n// Используй только если нужно изменить прототип существующего объекта`
      },
      {
        title: "Цепочка прототипов",
        code: `const grandparent = { a: 1 };\nconst parent = { b: 2 };\nconst child = { c: 3 };\n\n// Строим цепочку\nObject.setPrototypeOf(parent, grandparent);\nObject.setPrototypeOf(child, parent);\n\n// Проверяем\nconsole.log(Object.getPrototypeOf(child) === parent); // true\nconsole.log(Object.getPrototypeOf(parent) === grandparent); // true\n\n// Поиск по цепочке\nconsole.log(child.a); // 1 (из grandparent)\nconsole.log(child.b); // 2 (из parent)\nconsole.log(child.c); // 3 (свое)`
      }
    ],
    relatedTopics: ['prototype-chain', 'object-create'],
    nextTopicId: 'event-loop'
  },
  {
    id: 'promises',
    title: 'Promises (Промисы)',
    difficulty: 'intermediate',
    description: 'Промис — объект для асинхронных операций. Состояния: pending, fulfilled, rejected. Методы: then для успеха, catch для ошибок, finally всегда выполняется. Решает проблему Callback Hell. Promise.all ждет все промисы, Promise.allSettled ждет все (включая ошибки), Promise.race возвращает первый результат, Promise.any возвращает первый успешный.',
    keyPoints: [
      'Состояния: pending, fulfilled, rejected.',
      'Методы: then, catch, finally.',
      'Promise.all: все должны успешно выполниться, иначе ошибка.',
      'Promise.allSettled: ждет все промисы, возвращает результаты и ошибки.',
      'Promise.race: возвращает первый завершенный (успех или ошибка).',
      'Promise.any: возвращает первый успешный, ошибка только если все провалились.'
    ],
    tags: ['promise', 'async', 'flow', 'async-deep'],
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
        title: "Promise.all - все должны успешно выполниться",
        code: `const p1 = Promise.resolve(1);\nconst p2 = Promise.resolve(2);\nconst p3 = Promise.reject('Error');\n\nPromise.all([p1, p2, p3])\n  .then(console.log) // не выполнится\n  .catch(console.error); // "Error"\n\n// Если все успешны:\nPromise.all([p1, p2]).then(console.log); // [1, 2]`
      },
      {
        title: "Promise.allSettled - ждет все промисы",
        code: `const p1 = Promise.resolve(1);\nconst p2 = Promise.reject('Error');\nconst p3 = Promise.resolve(3);\n\nPromise.allSettled([p1, p2, p3]).then(results => {\n  console.log(results);\n  // [\n  //   { status: 'fulfilled', value: 1 },\n  //   { status: 'rejected', reason: 'Error' },\n  //   { status: 'fulfilled', value: 3 }\n  // ]\n});`
      },
      {
        title: "Promise.race - первый завершенный",
        code: `const fast = new Promise(resolve => setTimeout(() => resolve('Fast'), 100));\nconst slow = new Promise(resolve => setTimeout(() => resolve('Slow'), 500));\n\nPromise.race([fast, slow]).then(console.log); // "Fast"\n\n// С ошибкой:\nconst error = Promise.reject('Error');\nPromise.race([fast, error])\n  .then(console.log) // не выполнится\n  .catch(console.error); // "Error" (ошибка быстрее)`
      },
      {
        title: "Promise.any - первый успешный",
        code: `const p1 = Promise.reject('Error 1');\nconst p2 = Promise.resolve('Success 2');\nconst p3 = Promise.reject('Error 3');\n\nPromise.any([p1, p2, p3])\n  .then(console.log); // "Success 2"\n\n// Если все провалились:\nPromise.any([p1, p3])\n  .then(console.log) // не выполнится\n  .catch(err => console.error(err.errors)); // ['Error 1', 'Error 3']`
      }
    ],
    relatedTopics: ['event-loop', 'async-await'],
    nextTopicId: 'async-await'
  },
  {
    id: 'async-await',
    title: 'Async / Await',
    difficulty: 'intermediate',
    description: 'async/await — синтаксический сахар над промисами. async функция всегда возвращает промис. await приостанавливает выполнение до разрешения промиса, не блокируя основной поток. Ошибки обрабатываются через try/catch. Необработанные ошибки в async функциях создают rejected промис. Потерянные промисы (unhandled promise rejections) могут привести к проблемам.',
    keyPoints: [
      'async всегда возвращает промис.',
      'await приостанавливает функцию до выполнения промиса.',
      'Обработка ошибок через try/catch.',
      'Необработанные ошибки создают rejected промис.',
      'Потерянные промисы: забытый await или catch.',
      'Всегда обрабатывай ошибки явно.'
    ],
    tags: ['async', 'await', 'ES2017', 'async-deep'],
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
      },
      {
        title: "Обработка ошибок",
        code: `async function riskyOperation() {\n  try {\n    const result = await mightFail();\n    return result;\n  } catch (error) {\n    console.error('Error:', error);\n    throw error; // пробрасываем дальше\n  }\n}\n\n// Или через catch промиса\nriskyOperation().catch(err => console.error(err));`
      },
      {
        title: "Потерянные промисы",
        code: `// Плохо: забыли await или catch\nasync function bad() {\n  fetch('/api'); // промис потерян, ошибка не обработана\n}\n\n// Хорошо: явная обработка\nasync function good() {\n  try {\n    await fetch('/api');\n  } catch (err) {\n    console.error(err);\n  }\n}\n\n// Или через catch\nasync function alsoGood() {\n  fetch('/api').catch(err => console.error(err));\n}`
      },
      {
        title: "Ошибки в цепочке",
        code: `async function chain() {\n  try {\n    const a = await step1();\n    const b = await step2(a);\n    return await step3(b);\n  } catch (error) {\n    // Поймает ошибку из любого шага\n    console.error('Chain failed:', error);\n    return null;\n  }\n}`
      }
    ],
    relatedTopics: ['promises', 'error-handling'],
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
  },
  {
    id: 'array-methods-advanced',
    title: 'Методы массивов (продвинутые)',
    difficulty: 'intermediate',
    description: 'reduce() аккумулирует значение, flat() разворачивает вложенные массивы, flatMap() = map() + flat(). find() находит первый элемент, some() проверяет хотя бы один, every() проверяет все. reduce — самый мощный метод для трансформаций.',
    keyPoints: [
      'reduce(acc, item, index, arr): аккумулирует значение через callback.',
      'flat(depth): разворачивает вложенные массивы на указанную глубину.',
      'flatMap(fn): map() + flat(1) в одной операции.',
      'find(predicate): первый элемент, удовлетворяющий условию.',
      'some(predicate): true если хотя бы один элемент проходит проверку.',
      'every(predicate): true если все элементы проходят проверку.'
    ],
    tags: ['arrays', 'methods', 'functional', 'reduce', 'iteration'],
    examples: [
      {
        title: "reduce",
        code: `const numbers = [1, 2, 3, 4];\n\n// Сумма\nnumbers.reduce((sum, n) => sum + n, 0); // 10\n\n// Группировка\nconst users = [\n  { age: 20 }, { age: 30 }, { age: 20 }\n];\nusers.reduce((acc, u) => {\n  acc[u.age] = (acc[u.age] || 0) + 1;\n  return acc;\n}, {});\n// { 20: 2, 30: 1 }`
      },
      {
        title: "flat и flatMap",
        code: `const nested = [1, [2, 3], [4, [5, 6]]];\n\nnested.flat(); // [1, 2, 3, 4, [5, 6]]\nnested.flat(2); // [1, 2, 3, 4, 5, 6]\n\n// flatMap = map + flat(1)\nconst words = ["hello world", "foo bar"];\nwords.flatMap(w => w.split(" "));\n// ["hello", "world", "foo", "bar"]`
      },
      {
        title: "find, some, every",
        code: `const numbers = [1, 2, 3, 4, 5];\n\nnumbers.find(n => n > 3); // 4\nnumbers.find(n => n > 10); // undefined\n\nnumbers.some(n => n > 4); // true\nnumbers.some(n => n > 10); // false\n\nnumbers.every(n => n > 0); // true\nnumbers.every(n => n > 3); // false`
      }
    ],
    relatedTopics: ['arrays-basic', 'arrays-advanced', 'immutability']
  },
  {
    id: 'iife',
    title: 'IIFE (Immediately Invoked Function Expression)',
    difficulty: 'intermediate',
    description: 'IIFE — функция, которая выполняется сразу после объявления. Синтаксис: (function() {})() или (() => {})(). Создает изолированную область видимости, предотвращает загрязнение глобального scope. Используется для модулей до ES6, инкапсуляции кода.',
    keyPoints: [
      'Синтаксис: (function() {})() или (() => {})().',
      'Создает изолированную область видимости.',
      'Предотвращает загрязнение глобального scope.',
      'Использовалось для модулей до ES6.',
      'Может возвращать значение и присваиваться переменной.'
    ],
    tags: ['iife', 'scope', 'modules', 'encapsulation'],
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
    description: 'Callback — функция, передаваемая как аргумент и вызываемая позже. Используется в асинхронных операциях, обработчиках событий, методах массивов. Callback hell — вложенные колбэки, делающие код нечитаемым. Решение: промисы, async/await.',
    keyPoints: [
      'Callback: функция, передаваемая как аргумент.',
      'Используется в setTimeout, addEventListener, array methods.',
      'Callback hell: глубоко вложенные колбэки.',
      'Проблемы: сложность чтения, обработка ошибок.',
      'Решение: промисы, async/await.'
    ],
    tags: ['callbacks', 'async', 'functions', 'patterns'],
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
    description: 'Функция высшего порядка — принимает функции как аргументы или возвращает функции. Примеры: map, filter, reduce, setTimeout. Позволяет создавать абстракции, переиспользовать код, писать декларативный код. Основа функционального программирования.',
    keyPoints: [
      'Принимает функции как аргументы или возвращает функции.',
      'Примеры: map, filter, reduce, setTimeout.',
      'Создает абстракции и переиспользование кода.',
      'Декларативный стиль вместо императивного.',
      'Основа функционального программирования.'
    ],
    tags: ['functions', 'functional', 'abstraction', 'patterns'],
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
    description: 'Рекурсия — функция вызывает саму себя. Нужен базовый случай для остановки. Используется для обхода деревьев, факториала, поиска. Стек вызовов ограничен (~10000). Хвостовая рекурсия оптимизируется в некоторых случаях. Можно заменить итерацией.',
    keyPoints: [
      'Функция вызывает саму себя.',
      'Базовый случай: условие остановки рекурсии.',
      'Рекурсивный случай: вызов с измененными параметрами.',
      'Стек вызовов ограничен, возможен stack overflow.',
      'Хвостовая рекурсия может оптимизироваться.'
    ],
    tags: ['recursion', 'algorithms', 'functions', 'stack'],
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
  },
  {
    id: 'debounce-throttle',
    title: 'Debounce и Throttle',
    difficulty: 'intermediate',
    description: 'Debounce откладывает выполнение до паузы в вызовах. Throttle ограничивает частоту выполнения (максимум раз в N мс). Debounce для поиска, Throttle для скролла/ресайза. Оба оптимизируют производительность, уменьшая количество вызовов функций.',
    keyPoints: [
      'Debounce: выполнение после паузы в вызовах.',
      'Throttle: выполнение максимум раз в N миллисекунд.',
      'Debounce: поиск, валидация форм.',
      'Throttle: скролл, ресайз, события мыши.',
      'Оба уменьшают нагрузку и улучшают производительность.'
    ],
    tags: ['performance', 'optimization', 'events', 'patterns'],
    examples: [
      {
        title: "Debounce",
        code: `function debounce(fn, delay) {\n  let timeoutId;\n  return function(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\nconst search = debounce((query) => {\n  console.log("Searching:", query);\n}, 300);\n\n// Вызовется только после 300мс паузы\nsearch("a");\nsearch("ab");\nsearch("abc"); // Только этот вызов`
      },
      {
        title: "Throttle",
        code: `function throttle(fn, delay) {\n  let lastCall = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastCall >= delay) {\n      lastCall = now;\n      fn.apply(this, args);\n    }\n  };\n}\n\nconst handleScroll = throttle(() => {\n  console.log("Scrolled");\n}, 100);\n\n// Вызовется максимум раз в 100мс`
      },
      {
        title: "Использование",
        code: `// Debounce для поиска\ninput.addEventListener('input', debounce((e) => {\n  searchAPI(e.target.value);\n}, 300));\n\n// Throttle для скролла\nwindow.addEventListener('scroll', throttle(() => {\n  updatePosition();\n}, 100));`
      }
    ],
    relatedTopics: ['callbacks', 'higher-order-functions', 'performance']
  },
  {
    id: 'intersection-observer',
    title: 'Intersection Observer',
    difficulty: 'intermediate',
    description: 'Intersection Observer отслеживает видимость элементов в viewport. Создается через new IntersectionObserver(callback, options). Вызывается при пересечении порога (threshold). Используется для ленивой загрузки изображений, infinite scroll, анимаций при появлении, аналитики.',
    keyPoints: [
      'new IntersectionObserver(callback, options): создает наблюдатель.',
      'observe(element): начинает наблюдение, unobserve(element): останавливает.',
      'threshold: порог видимости (0.0 - 1.0), rootMargin: отступы.',
      'callback получает entries с isIntersecting, intersectionRatio.',
      'Использование: ленивая загрузка, infinite scroll, анимации.'
    ],
    tags: ['intersection-observer', 'viewport', 'performance', 'lazy-loading', 'browser', 'api'],
    examples: [
      {
        title: "Базовое использование",
        code: `const observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      console.log('Element is visible!');\n      entry.target.classList.add('visible');\n    }\n  });\n}, {\n  threshold: 0.5 // сработает при 50% видимости\n});\n\nconst element = document.querySelector('.item');\nobserver.observe(element);`
      },
      {
        title: "Ленивая загрузка изображений",
        code: `const imageObserver = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      const img = entry.target;\n      img.src = img.dataset.src; // загружаем реальное изображение\n      img.classList.remove('lazy');\n      imageObserver.unobserve(img);\n    }\n  });\n});\n\n// Наблюдаем все изображения с классом lazy\ndocument.querySelectorAll('img.lazy').forEach(img => {\n  imageObserver.observe(img);\n});`
      },
      {
        title: "Infinite scroll",
        code: `const sentinel = document.querySelector('#sentinel');\n\nconst observer = new IntersectionObserver((entries) => {\n  if (entries[0].isIntersecting) {\n    loadMoreItems(); // загружаем еще элементы\n  }\n}, {\n  rootMargin: '100px' // загружать за 100px до появления\n});\n\nobserver.observe(sentinel);`
      },
      {
        title: "Анимация при появлении",
        code: `const animateObserver = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.style.animation = 'fadeIn 0.5s';\n      animateObserver.unobserve(entry.target);\n    }\n  });\n}, {\n  threshold: 0.1\n});\n\ndocument.querySelectorAll('.animate-on-scroll').forEach(el => {\n  animateObserver.observe(el);\n});`
      }
    ],
    relatedTopics: ['dom-api', 'event-api', 'performance-optimization']
  },
  {
    id: 'web-workers',
    title: 'Web Workers',
    difficulty: 'intermediate',
    description: 'Web Workers выполняют код в отдельном потоке, не блокируя основной. new Worker(script) создает воркер. postMessage отправляет данные, onmessage получает. SharedWorker для нескольких вкладок. Используется для тяжелых вычислений, обработки данных, не имеет доступа к DOM.',
    keyPoints: [
      'new Worker(script): создает воркер в отдельном потоке.',
      'postMessage(data): отправка данных, onmessage: получение.',
      'Не имеет доступа к DOM, window, document.',
      'SharedWorker: общий воркер для нескольких вкладок.',
      'Использование: тяжелые вычисления, обработка данных, не блокирует UI.'
    ],
    tags: ['web-workers', 'multithreading', 'performance', 'async', 'browser', 'api'],
    examples: [
      {
        title: "Базовый воркер",
        code: `// main.js\nconst worker = new Worker('worker.js');\n\nworker.postMessage({ type: 'calculate', data: [1, 2, 3, 4, 5] });\n\nworker.onmessage = (event) => {\n  console.log('Result:', event.data);\n};\n\nworker.onerror = (error) => {\n  console.error('Worker error:', error);\n};\n\n// worker.js\nself.onmessage = (event) => {\n  const { type, data } = event.data;\n  \n  if (type === 'calculate') {\n    const result = data.reduce((sum, n) => sum + n, 0);\n    self.postMessage(result);\n  }\n};`
      },
      {
        title: "Тяжелые вычисления",
        code: `// main.js\nfunction heavyCalculation() {\n  const worker = new Worker('calculator.js');\n  \n  worker.postMessage({ numbers: Array.from({length: 1000000}, (_, i) => i) });\n  \n  worker.onmessage = (e) => {\n    console.log('Sum:', e.data);\n    worker.terminate(); // завершаем воркер\n  };\n}\n\n// calculator.js\nself.onmessage = (e) => {\n  const sum = e.data.numbers.reduce((acc, n) => acc + n, 0);\n  self.postMessage(sum);\n};`
      },
      {
        title: "Inline Worker",
        code: `// Создание воркера из строки\nconst workerCode = \`\n  self.onmessage = (e) => {\n    const result = e.data * 2;\n    self.postMessage(result);\n  };\n\`;\n\nconst blob = new Blob([workerCode], { type: 'application/javascript' });\nconst worker = new Worker(URL.createObjectURL(blob));\n\nworker.postMessage(5);\nworker.onmessage = (e) => console.log(e.data); // 10`
      }
    ],
    relatedTopics: ['async-await', 'promises', 'performance-optimization']
  },
  {
    id: 'resize-observer',
    title: 'Resize Observer',
    difficulty: 'intermediate',
    description: 'Resize Observer отслеживает изменение размеров элементов. Создается через new ResizeObserver(callback). Вызывается при изменении размеров. Используется для адаптивных компонентов, виртуализации, динамических макетов. Более эффективен чем window.resize для отдельных элементов.',
    keyPoints: [
      'new ResizeObserver(callback): создает наблюдатель размеров.',
      'observe(element): начинает наблюдение, unobserve(element): останавливает.',
      'callback получает entries с contentRect (размеры элемента).',
      'Более эффективен чем window.resize для отдельных элементов.',
      'Использование: адаптивные компоненты, виртуализация, динамические макеты.'
    ],
    tags: ['resize-observer', 'layout', 'responsive', 'performance', 'browser', 'api'],
    examples: [
      {
        title: "Базовое использование",
        code: `const resizeObserver = new ResizeObserver((entries) => {\n  entries.forEach(entry => {\n    const { width, height } = entry.contentRect;\n    console.log(\`Size: \${width}x\${height}\`);\n    \n    // Обновляем компонент при изменении размера\n    updateLayout(width, height);\n  });\n});\n\nconst element = document.querySelector('.container');\nresizeObserver.observe(element);`
      },
      {
        title: "Адаптивный компонент",
        code: `const cardObserver = new ResizeObserver((entries) => {\n  entries.forEach(entry => {\n    const { width } = entry.contentRect;\n    const card = entry.target;\n    \n    if (width < 400) {\n      card.classList.add('compact');\n      card.classList.remove('wide');\n    } else {\n      card.classList.add('wide');\n      card.classList.remove('compact');\n    }\n  });\n});\n\ndocument.querySelectorAll('.card').forEach(card => {\n  cardObserver.observe(card);\n});`
      },
      {
        title: "Виртуализация списка",
        code: `const listObserver = new ResizeObserver((entries) => {\n  const { width, height } = entries[0].contentRect;\n  \n  // Пересчитываем видимые элементы при изменении размера\n  const itemHeight = 50;\n  const visibleCount = Math.ceil(height / itemHeight);\n  \n  updateVisibleItems(visibleCount);\n});\n\nconst listContainer = document.querySelector('.virtual-list');\nlistObserver.observe(listContainer);`
      }
    ],
    relatedTopics: ['dom-api', 'intersection-observer', 'performance-optimization']
  },
  {
    id: 'mutation-observer',
    title: 'Mutation Observer',
    difficulty: 'intermediate',
    description: 'Mutation Observer отслеживает изменения DOM. Создается через new MutationObserver(callback). Отслеживает добавление/удаление узлов, изменения атрибутов, текста. Используется для отладки, синхронизации, реактивности. Альтернатива устаревшим Mutation Events.',
    keyPoints: [
      'new MutationObserver(callback): создает наблюдатель изменений DOM.',
      'observe(element, options): начинает наблюдение с настройками.',
      'options: childList (дети), attributes (атрибуты), characterData (текст), subtree (все потомки).',
      'callback получает mutations с type, target, addedNodes, removedNodes.',
      'Использование: отладка, синхронизация, реактивность.'
    ],
    tags: ['mutation-observer', 'dom', 'reactivity', 'debugging', 'browser', 'api'],
    examples: [
      {
        title: "Отслеживание добавления элементов",
        code: `const observer = new MutationObserver((mutations) => {\n  mutations.forEach(mutation => {\n    if (mutation.type === 'childList') {\n      mutation.addedNodes.forEach(node => {\n        if (node.nodeType === 1) { // элемент\n          console.log('Added:', node);\n        }\n      });\n      \n      mutation.removedNodes.forEach(node => {\n        console.log('Removed:', node);\n      });\n    }\n  });\n});\n\nobserver.observe(document.body, {\n  childList: true,\n  subtree: true // наблюдать все потомки\n});`
      },
      {
        title: "Отслеживание атрибутов",
        code: `const attrObserver = new MutationObserver((mutations) => {\n  mutations.forEach(mutation => {\n    if (mutation.type === 'attributes') {\n      console.log(\`\${mutation.attributeName} changed on\`, mutation.target);\n      console.log('Old value:', mutation.oldValue);\n      console.log('New value:', mutation.target.getAttribute(mutation.attributeName));\n    }\n  });\n});\n\nconst element = document.querySelector('.item');\nattrObserver.observe(element, {\n  attributes: true,\n  attributeOldValue: true, // сохранять старое значение\n  attributeFilter: ['class', 'data-id'] // только эти атрибуты\n});`
      },
      {
        title: "Синхронизация состояния",
        code: `// Синхронизация с внешним состоянием\nconst syncObserver = new MutationObserver(() => {\n  // При изменении DOM обновляем состояние\n  updateState(getStateFromDOM());\n});\n\nsyncObserver.observe(document.querySelector('#app'), {\n  childList: true,\n  subtree: true,\n  attributes: true\n});\n\n// Остановка наблюдения\nsyncObserver.disconnect();`
      }
    ],
    relatedTopics: ['dom-api', 'event-api']
  },
  {
    id: 'indexeddb',
    title: 'IndexedDB',
    difficulty: 'intermediate',
    description: 'IndexedDB — клиентская NoSQL база данных в браузере. Хранит большие объемы структурированных данных. Работает асинхронно через события или Promise API. Объектные хранилища (object stores), индексы для поиска, транзакции для атомарности. Используется для офлайн-приложений, кэширования.',
    keyPoints: [
      'indexedDB.open(name, version): открывает/создает БД.',
      'objectStore: хранилище объектов, как таблица в SQL.',
      'index: для быстрого поиска по полям.',
      'transaction: атомарные операции, режимы readwrite/readonly.',
      'Использование: офлайн-приложения, кэширование больших данных.'
    ],
    tags: ['indexeddb', 'database', 'storage', 'offline', 'browser', 'api'],
    examples: [
      {
        title: "Открытие БД и создание хранилища",
        code: `const request = indexedDB.open('myDB', 1);\n\nrequest.onupgradeneeded = (event) => {\n  const db = event.target.result;\n  \n  // Создаем хранилище\n  if (!db.objectStoreNames.contains('users')) {\n    const store = db.createObjectStore('users', { keyPath: 'id' });\n    \n    // Создаем индекс\n    store.createIndex('name', 'name', { unique: false });\n  }\n};\n\nrequest.onsuccess = (event) => {\n  const db = event.target.result;\n  console.log('DB opened:', db);\n};\n\nrequest.onerror = (event) => {\n  console.error('Error:', event.target.error);\n};`
      },
      {
        title: "Добавление и получение данных",
        code: `// Добавление\nconst transaction = db.transaction(['users'], 'readwrite');\nconst store = transaction.objectStore('users');\n\nconst user = { id: 1, name: 'Alice', age: 30 };\nconst request = store.add(user);\n\nrequest.onsuccess = () => {\n  console.log('User added');\n};\n\n// Получение\nconst getTransaction = db.transaction(['users'], 'readonly');\nconst getStore = getTransaction.objectStore('users');\nconst getRequest = getStore.get(1);\n\ngetRequest.onsuccess = () => {\n  console.log('User:', getRequest.result);\n};`
      },
      {
        title: "Поиск по индексу",
        code: `const transaction = db.transaction(['users'], 'readonly');\nconst store = transaction.objectStore('users');\nconst index = store.index('name');\n\n// Поиск по имени\nconst request = index.getAll('Alice');\n\nrequest.onsuccess = () => {\n  console.log('Users:', request.result);\n};\n\n// Или через курсор\nconst cursorRequest = index.openCursor();\ncursorRequest.onsuccess = (event) => {\n  const cursor = event.target.result;\n  if (cursor) {\n    console.log(cursor.value);\n    cursor.continue();\n  }\n};`
      },
      {
        title: "Promise обертка",
        code: `function openDB(name, version) {\n  return new Promise((resolve, reject) => {\n    const request = indexedDB.open(name, version);\n    request.onsuccess = () => resolve(request.result);\n    request.onerror = () => reject(request.error);\n    request.onupgradeneeded = (event) => {\n      const db = event.target.result;\n      // настройка БД\n    };\n  });\n}\n\n// Использование\nconst db = await openDB('myDB', 1);`
      }
    ],
    relatedTopics: ['web-storage', 'async-await', 'promises']
  },
  {
    id: 'object-copying',
    title: 'Копирование объектов',
    difficulty: 'intermediate',
    description: 'Поверхностное копирование копирует только первый уровень свойств. Глубокое копирование копирует все вложенные объекты. Spread оператор и Object.assign делают поверхностное копирование. structuredClone делает глубокое копирование (современный способ). JSON.parse/stringify работает, но имеет ограничения (нет функций, Date становится строкой).',
    keyPoints: [
      'Поверхностное копирование: копируется только первый уровень, вложенные объекты ссылаются на оригинал.',
      'Глубокое копирование: копируются все уровни, создаются новые объекты.',
      'Spread и Object.assign: поверхностное копирование.',
      'structuredClone: глубокое копирование (современный способ).',
      'JSON.parse/stringify: глубокое, но с ограничениями (нет функций, Date, Symbol, BigInt).',
      'Рекурсивное копирование: ручная реализация для полного контроля.'
    ],
    tags: ['objects', 'copying', 'immutability', 'objects-advanced'],
    examples: [
      {
        title: "Поверхностное копирование",
        code: `const original = { name: "Alice", address: { city: "Moscow" } };\n\n// Spread оператор\nconst shallow1 = { ...original };\n\n// Object.assign\nconst shallow2 = Object.assign({}, original);\n\n// Изменение вложенного объекта влияет на оригинал\nshallow1.address.city = "SPB";\nconsole.log(original.address.city); // "SPB" (изменилось!)\n\n// Изменение первого уровня не влияет\nshallow1.name = "Bob";\nconsole.log(original.name); // "Alice" (не изменилось)`
      },
      {
        title: "Глубокое копирование через structuredClone",
        code: `const original = { name: "Alice", address: { city: "Moscow" } };\n\n// structuredClone - современный способ\nconst deep = structuredClone(original);\n\ndeep.address.city = "SPB";\nconsole.log(original.address.city); // "Moscow" (не изменилось)\n\n// Поддерживает: объекты, массивы, Map, Set, Date, RegExp, и др.\nconst complex = {\n  date: new Date(),\n  map: new Map([['key', 'value']]),\n  set: new Set([1, 2, 3])\n};\nconst cloned = structuredClone(complex);`
      },
      {
        title: "Глубокое копирование через JSON",
        code: `const original = { name: "Alice", age: 30 };\n\nconst deep = JSON.parse(JSON.stringify(original));\n\ndeep.name = "Bob";\nconsole.log(original.name); // "Alice" (не изменилось)\n\n// Ограничения:\nconst withLimitations = {\n  date: new Date(),\n  fn: function() {},\n  sym: Symbol('id'),\n  bigint: BigInt(123),\n  undefined: undefined\n};\n\nconst cloned = JSON.parse(JSON.stringify(withLimitations));\n// date стал строкой, fn/sym/bigint/undefined пропали`
      },
      {
        title: "Рекурсивное глубокое копирование",
        code: `function deepClone(obj) {\n  if (obj === null || typeof obj !== 'object') {\n    return obj;\n  }\n  \n  if (obj instanceof Date) {\n    return new Date(obj);\n  }\n  \n  if (obj instanceof Array) {\n    return obj.map(item => deepClone(item));\n  }\n  \n  if (typeof obj === 'object') {\n    const cloned = {};\n    for (const key in obj) {\n      if (obj.hasOwnProperty(key)) {\n        cloned[key] = deepClone(obj[key]);\n      }\n    }\n    return cloned;\n  }\n}\n\nconst original = { a: 1, b: { c: 2 } };\nconst cloned = deepClone(original);`
      }
    ],
    relatedTopics: ['objects-basic', 'object-methods', 'json-methods', 'structured-clone'],
    nextTopicId: 'structured-clone'
  },
  {
    id: 'structured-clone',
    title: 'structuredClone',
    difficulty: 'intermediate',
    description: 'structuredClone() создает глубокую копию объекта. Поддерживает большинство типов: объекты, массивы, Map, Set, Date, RegExp, ArrayBuffer, TypedArray. Не поддерживает функции, Symbol, некоторые встроенные объекты. Более надежный чем JSON.parse/stringify, но не такой гибкий как ручное копирование.',
    keyPoints: [
      'structuredClone(value): создает глубокую копию.',
      'Поддерживает: объекты, массивы, Map, Set, Date, RegExp, ArrayBuffer, TypedArray.',
      'Не поддерживает: функции, Symbol, некоторые встроенные объекты (Error, DOM nodes).',
      'Более надежный чем JSON.parse/stringify для сложных структур.',
      'Работает синхронно, может быть медленным для больших объектов.'
    ],
    tags: ['objects', 'copying', 'structured-clone', 'objects-advanced'],
    examples: [
      {
        title: "Базовое использование",
        code: `const original = {\n  name: "Alice",\n  address: { city: "Moscow" },\n  tags: ["js", "react"]\n};\n\nconst cloned = structuredClone(original);\ncloned.address.city = "SPB";\nconsole.log(original.address.city); // "Moscow" (не изменилось)`
      },
      {
        title: "Поддерживаемые типы",
        code: `const complex = {\n  date: new Date(),\n  map: new Map([['key', 'value']]),\n  set: new Set([1, 2, 3]),\n  regexp: /test/g,\n  arrayBuffer: new ArrayBuffer(8),\n  typedArray: new Uint8Array([1, 2, 3])\n};\n\nconst cloned = structuredClone(complex);\n// Все типы скопированы правильно`
      },
      {
        title: "Неподдерживаемые типы",
        code: `const withUnsupported = {\n  fn: function() {}, // TypeError\n  sym: Symbol('id'), // TypeError\n  error: new Error('test'), // TypeError\n  node: document.body // TypeError (DOM node)\n};\n\n// structuredClone(withUnsupported); // TypeError`
      },
      {
        title: "Клонирование с циклическими ссылками",
        code: `const obj = { name: "Alice" };\nobj.self = obj; // циклическая ссылка\n\n// structuredClone обрабатывает циклические ссылки\nconst cloned = structuredClone(obj);\nconsole.log(cloned.self === cloned); // true`
      }
    ],
    relatedTopics: ['object-copying', 'objects-basic', 'json-methods'],
    nextTopicId: 'object-comparison'
  },
  {
    id: 'object-comparison',
    title: 'Сравнение объектов',
    difficulty: 'intermediate',
    description: 'Объекты сравниваются по ссылке, а не по значению. === и == сравнивают ссылки. Для сравнения по значению нужно сравнивать свойства вручную или использовать библиотеки. Глубокое сравнение проверяет все вложенные свойства. Object.is() сравнивает примитивы строже чем ===.',
    keyPoints: [
      '=== сравнивает ссылки, не значения объектов.',
      'Два объекта с одинаковыми свойствами не равны (разные ссылки).',
      'Object.is() строже чем === для примитивов (NaN, +0/-0).',
      'Глубокое сравнение: проверка всех свойств рекурсивно.',
      'Поверхностное сравнение: проверка только первого уровня.'
    ],
    tags: ['objects', 'comparison', 'equality', 'objects-advanced'],
    examples: [
      {
        title: "Сравнение по ссылке",
        code: `const obj1 = { name: "Alice" };\nconst obj2 = { name: "Alice" };\nconst obj3 = obj1;\n\nconsole.log(obj1 === obj2); // false (разные ссылки)\nconsole.log(obj1 === obj3); // true (одна ссылка)\n\n// Массивы тоже\nconst arr1 = [1, 2, 3];\nconst arr2 = [1, 2, 3];\nconsole.log(arr1 === arr2); // false`
      },
      {
        title: "Object.is() для примитивов",
        code: `// Object.is строже чем ===\nconsole.log(NaN === NaN); // false\nconsole.log(Object.is(NaN, NaN)); // true\n\nconsole.log(+0 === -0); // true\nconsole.log(Object.is(+0, -0)); // false\n\n// Для объектов работает как ===\nconst obj1 = {};\nconst obj2 = {};\nconsole.log(Object.is(obj1, obj2)); // false`
      },
      {
        title: "Поверхностное сравнение",
        code: `function shallowEqual(obj1, obj2) {\n  const keys1 = Object.keys(obj1);\n  const keys2 = Object.keys(obj2);\n  \n  if (keys1.length !== keys2.length) return false;\n  \n  for (const key of keys1) {\n    if (obj1[key] !== obj2[key]) return false;\n  }\n  \n  return true;\n}\n\nconst obj1 = { a: 1, b: 2 };\nconst obj2 = { a: 1, b: 2 };\nconsole.log(shallowEqual(obj1, obj2)); // true\n\n// Но не работает для вложенных объектов\nconst obj3 = { a: 1, b: { c: 2 } };\nconst obj4 = { a: 1, b: { c: 2 } };\nconsole.log(shallowEqual(obj3, obj4)); // false (b сравнивается по ссылке)`
      },
      {
        title: "Глубокое сравнение",
        code: `function deepEqual(obj1, obj2) {\n  if (obj1 === obj2) return true;\n  \n  if (obj1 == null || obj2 == null) return false;\n  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;\n  \n  const keys1 = Object.keys(obj1);\n  const keys2 = Object.keys(obj2);\n  \n  if (keys1.length !== keys2.length) return false;\n  \n  for (const key of keys1) {\n    if (!keys2.includes(key)) return false;\n    if (!deepEqual(obj1[key], obj2[key])) return false;\n  }\n  \n  return true;\n}\n\nconst obj1 = { a: 1, b: { c: 2 } };\nconst obj2 = { a: 1, b: { c: 2 } };\nconsole.log(deepEqual(obj1, obj2)); // true`
      }
    ],
    relatedTopics: ['objects-basic', 'object-copying', 'comparison'],
    nextTopicId: 'abort-controller'
  },
  {
    id: 'abort-controller',
    title: 'AbortController',
    difficulty: 'intermediate',
    description: 'AbortController позволяет отменять асинхронные операции (fetch, промисы). Создается через new AbortController(), signal передается в fetch или другие API. abort() отменяет операцию. Используется для отмены запросов при размонтировании компонента, таймаутов, пользовательской отмены.',
    keyPoints: [
      'new AbortController(): создает контроллер отмены.',
      'signal: передается в fetch или другие API.',
      'abort(): отменяет операцию, вызывает AbortError.',
      'Использование: отмена fetch запросов, промисов, таймаутов.',
      'Один контроллер может отменить несколько операций.'
    ],
    tags: ['abort-controller', 'async', 'fetch', 'cancellation', 'async-deep'],
    examples: [
      {
        title: "Отмена fetch запроса",
        code: `const controller = new AbortController();\nconst signal = controller.signal;\n\nfetch('/api/data', { signal })\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => {\n    if (error.name === 'AbortError') {\n      console.log('Request aborted');\n    }\n  });\n\n// Отмена запроса\ncontroller.abort();`
      },
      {
        title: "Отмена при размонтировании компонента",
        code: `// React пример\nuseEffect(() => {\n  const controller = new AbortController();\n  \n  fetch('/api/data', { signal: controller.signal })\n    .then(res => res.json())\n    .then(setData);\n  \n  return () => {\n    controller.abort(); // отмена при размонтировании\n  };\n}, []);`
      },
      {
        title: "Отмена промиса",
        code: `function cancellablePromise(promise, signal) {\n  return new Promise((resolve, reject) => {\n    signal.addEventListener('abort', () => {\n      reject(new DOMException('Aborted', 'AbortError'));\n    });\n    \n    promise.then(resolve, reject);\n  });\n}\n\nconst controller = new AbortController();\nconst promise = new Promise(resolve => setTimeout(() => resolve('Done'), 5000));\n\ncancellablePromise(promise, controller.signal)\n  .then(console.log)\n  .catch(err => console.error(err.name)); // "AbortError"\n\ncontroller.abort();`
      },
      {
        title: "Таймаут для запроса",
        code: `function fetchWithTimeout(url, timeout = 5000) {\n  const controller = new AbortController();\n  \n  const timeoutId = setTimeout(() => {\n    controller.abort();\n  }, timeout);\n  \n  return fetch(url, { signal: controller.signal })\n    .finally(() => clearTimeout(timeoutId));\n}\n\nfetchWithTimeout('/api/data', 3000)\n  .then(res => res.json())\n  .catch(err => {\n    if (err.name === 'AbortError') {\n      console.log('Request timeout');\n    }\n  });`
      }
    ],
    relatedTopics: ['fetch-api', 'promises', 'async-await'],
    nextTopicId: 'xss'
  },
  {
    id: 'xss',
    title: 'XSS (Cross-Site Scripting)',
    difficulty: 'intermediate',
    description: 'XSS — уязвимость, когда злоумышленник внедряет вредоносный JavaScript код на страницу. Типы: Reflected (отражается в ответе), Stored (сохраняется на сервере), DOM-based (в браузере). Защита: экранирование HTML (escaping), использование textContent вместо innerHTML, Content Security Policy (CSP), валидация и санитизация входных данных.',
    keyPoints: [
      'XSS: внедрение вредоносного JavaScript кода.',
      'Reflected XSS: код в URL или параметрах, отражается в ответе.',
      'Stored XSS: код сохраняется на сервере (БД, комментарии).',
      'DOM-based XSS: код выполняется в браузере без отправки на сервер.',
      'Защита: экранирование, textContent, CSP, валидация.',
      'Опасность: кража cookies, сессий, перенаправление на фишинговые сайты.'
    ],
    tags: ['security', 'xss', 'browser', 'safety'],
    examples: [
      {
        title: "Reflected XSS пример",
        code: `// Уязвимый код\nconst name = new URLSearchParams(window.location.search).get('name');\ndocument.getElementById('greeting').innerHTML = 'Hello, ' + name;\n\n// Атака: ?name=<script>alert('XSS')</script>\n// Код выполнится\n\n// Защита: экранирование\nfunction escapeHtml(text) {\n  const div = document.createElement('div');\n  div.textContent = text;\n  return div.innerHTML;\n}\n\ndocument.getElementById('greeting').innerHTML = 'Hello, ' + escapeHtml(name);\n\n// Или лучше: textContent\nconst element = document.getElementById('greeting');\nelement.textContent = 'Hello, ' + name;`
      },
      {
        title: "Stored XSS пример",
        code: `// Уязвимый код: комментарии сохраняются в БД\nfunction displayComment(comment) {\n  document.getElementById('comments').innerHTML += comment;\n}\n\n// Атака: комментарий содержит <script>...</script>\n// Код выполнится для всех пользователей\n\n// Защита: санитизация\nfunction sanitizeHtml(html) {\n  const div = document.createElement('div');\n  div.textContent = html;\n  return div.innerHTML;\n}\n\ndisplayComment(sanitizeHtml(comment));`
      },
      {
        title: "DOM-based XSS",
        code: `// Уязвимый код\nconst hash = window.location.hash.slice(1);\neval(hash); // ОПАСНО!\n\n// Атака: #alert('XSS')\n\n// Защита: не использовать eval, опасные функции\neval = null; // отключить eval\n\n// Использовать безопасные методы\nconst data = JSON.parse(hash); // если нужен JSON`
      },
      {
        title: "Content Security Policy (CSP)",
        code: `// В HTTP заголовках или meta теге\n// Content-Security-Policy: default-src 'self'; script-src 'self'\n\n// Запрещает выполнение inline скриптов\n// Запрещает eval()\n// Разрешает загрузку скриптов только с того же домена\n\n// Пример meta тега\n<meta http-equiv="Content-Security-Policy" \n      content="default-src 'self'; script-src 'self'">`
      }
    ],
    relatedTopics: ['dom-api', 'security', 'cookies'],
    nextTopicId: 'same-origin-policy'
  },
  {
    id: 'same-origin-policy',
    title: 'Same-Origin Policy',
    difficulty: 'intermediate',
    description: 'Same-Origin Policy ограничивает доступ скриптов к ресурсам другого домена. Origin определяется протоколом, доменом и портом. Одинаковый origin: протокол + домен + порт совпадают. CORS позволяет обойти это ограничение с разрешения сервера. Используется для защиты от XSS и CSRF атак.',
    keyPoints: [
      'Origin: протокол + домен + порт (например: https://example.com:443).',
      'Same-origin: все три компонента совпадают.',
      'Разные origin: разные протоколы, домены или порты.',
      'Ограничения: чтение cookies, localStorage, выполнение скриптов, AJAX запросы.',
      'CORS: механизм для разрешения cross-origin запросов.',
      'Защита: предотвращает доступ злонамеренных скриптов к данным.'
    ],
    tags: ['security', 'cors', 'browser', 'same-origin'],
    examples: [
      {
        title: "Определение origin",
        code: `// Одинаковый origin\nhttps://example.com/page1\nhttps://example.com/page2\n// ✅ Одинаковый (протокол, домен, порт совпадают)\n\n// Разный origin\nhttps://example.com\nhttp://example.com\n// ❌ Разный (протокол)\n\nhttps://example.com\nhttps://subdomain.example.com\n// ❌ Разный (домен)\n\nhttps://example.com\nhttps://example.com:8080\n// ❌ Разный (порт)`
      },
      {
        title: "Ограничения same-origin",
        code: `// Чтение cookies\n// document.cookie читает только cookies своего домена\n\n// localStorage/sessionStorage\n// Доступ только к своему origin\n\n// AJAX запросы\nfetch('https://other-domain.com/api')\n  .catch(err => {\n    // CORS error если сервер не разрешил\n  });\n\n// Чтение iframe\n// Нельзя читать содержимое iframe другого origin`
      },
      {
        title: "CORS обходит same-origin",
        code: `// Запрос к другому домену\nfetch('https://api.example.com/data', {\n  method: 'GET',\n  headers: {\n    'Content-Type': 'application/json'\n  }\n})\n  .then(res => res.json())\n  .then(console.log);\n\n// Сервер должен вернуть:\n// Access-Control-Allow-Origin: *\n// или\n// Access-Control-Allow-Origin: https://yourdomain.com`
      },
      {
        title: "Проверка origin",
        code: `// Получить текущий origin\nconst origin = window.location.origin;\nconsole.log(origin); // "https://example.com:443"\n\n// Проверить совпадение\nfunction isSameOrigin(url) {\n  const a = document.createElement('a');\n  a.href = url;\n  return a.origin === window.location.origin;\n}\n\nconsole.log(isSameOrigin('https://example.com/page')); // true\nconsole.log(isSameOrigin('https://other.com/page')); // false`
      }
    ],
    relatedTopics: ['fetch-api', 'cors', 'xss', 'csrf'],
    nextTopicId: 'csrf'
  },
  {
    id: 'csrf',
    title: 'CSRF (Cross-Site Request Forgery)',
    difficulty: 'intermediate',
    description: 'CSRF — атака, когда злоумышленник заставляет пользователя выполнить нежелательное действие на сайте, где пользователь аутентифицирован. Защита: CSRF токены (синхронизированные токены), SameSite cookies, проверка Referer/Origin заголовков, двойная отправка cookies.',
    keyPoints: [
      'CSRF: выполнение действий от имени пользователя без его ведома.',
      'Атака: пользователь залогинен на сайте, переходит на вредоносную страницу.',
      'Вредоносная страница отправляет запрос на сайт с cookies пользователя.',
      'Защита: CSRF токены, SameSite cookies, проверка заголовков.',
      'CSRF токен: уникальный токен для каждой сессии, проверяется сервером.'
    ],
    tags: ['security', 'csrf', 'cookies', 'browser'],
    examples: [
      {
        title: "CSRF атака пример",
        code: `// Пользователь залогинен на bank.com\n// Переходит на evil.com, который содержит:\n\n<form action="https://bank.com/transfer" method="POST">\n  <input type="hidden" name="to" value="attacker-account">\n  <input type="hidden" name="amount" value="1000">\n</form>\n<script>document.forms[0].submit();</script>\n\n// Запрос отправляется с cookies пользователя\n// Деньги переводятся без ведома пользователя`
      },
      {
        title: "Защита: CSRF токен",
        code: `// Сервер генерирует токен при загрузке формы\nconst csrfToken = generateToken(); // сохраняется в сессии\n\n// Форма содержит токен\n<form action="/transfer" method="POST">\n  <input type="hidden" name="csrf_token" value="\${csrfToken}">\n  <input type="text" name="to">\n  <input type="number" name="amount">\n</form>\n\n// Сервер проверяет токен\nif (request.body.csrf_token !== session.csrf_token) {\n  return error('Invalid CSRF token');\n}`
      },
      {
        title: "Защита: SameSite cookies",
        code: `// Cookie с флагом SameSite\nSet-Cookie: session=abc123; SameSite=Strict\n\n// Strict: cookie не отправляется в cross-site запросах\n// Lax: отправляется только в GET запросах (безопаснее)\n// None: отправляется всегда (требует Secure флаг)\n\n// Защищает от CSRF, но может сломать некоторые интеграции`
      },
      {
        title: "Защита: проверка заголовков",
        code: `// Проверка Origin или Referer\nfunction checkOrigin(req) {\n  const origin = req.headers.origin;\n  const referer = req.headers.referer;\n  \n  const allowedOrigins = ['https://yourdomain.com'];\n  \n  if (!allowedOrigins.includes(origin)) {\n    throw new Error('Invalid origin');\n  }\n}\n\n// Защищает от простых CSRF атак`
      }
    ],
    relatedTopics: ['fetch-api', 'cors', 'same-origin-policy', 'cookies'],
    nextTopicId: 'cookies'
  },
  {
    id: 'cookies',
    title: 'Cookies',
    difficulty: 'intermediate',
    description: 'Cookies — небольшие данные, хранящиеся в браузере и отправляемые с каждым запросом. Используются для сессий, аутентификации, отслеживания. Управление: document.cookie для чтения/записи, HttpOnly (только HTTP, не доступен из JS), Secure (только HTTPS), SameSite (защита от CSRF), Expires/Max-Age (время жизни).',
    keyPoints: [
      'document.cookie: строка со всеми cookies, чтение и запись.',
      'HttpOnly: cookie недоступен из JavaScript, защита от XSS.',
      'Secure: cookie отправляется только по HTTPS.',
      'SameSite: Strict/Lax/None, защита от CSRF.',
      'Expires/Max-Age: время жизни cookie.',
      'Path и Domain: область действия cookie.'
    ],
    tags: ['cookies', 'storage', 'security', 'browser', 'api'],
    examples: [
      {
        title: "Чтение и запись cookies",
        code: `// Чтение всех cookies\nconst allCookies = document.cookie;\n// "name=value; other=value2"\n\n// Запись cookie\ndocument.cookie = "username=Alice; path=/; max-age=3600";\n\n// Удаление (установка в прошлое)\ndocument.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";\n\n// Функция для удобной работы\nfunction setCookie(name, value, days) {\n  const expires = new Date();\n  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);\n  document.cookie = \`\${name}=\${value};expires=\${expires.toUTCString()};path=/\`;\n}\n\nfunction getCookie(name) {\n  const value = \`; \${document.cookie}\`;\n  const parts = value.split(\`; \${name}=\`);\n  if (parts.length === 2) return parts.pop().split(';').shift();\n}`
      },
      {
        title: "Безопасные cookies",
        code: `// HttpOnly: устанавливается сервером, недоступен из JS\n// Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict\n\n// Secure: только HTTPS\n// Set-Cookie: token=xyz; Secure\n\n// SameSite: защита от CSRF\n// Set-Cookie: session=abc; SameSite=Strict  // не отправляется в cross-site\n// Set-Cookie: session=abc; SameSite=Lax    // только GET в cross-site\n// Set-Cookie: session=abc; SameSite=None; Secure  // всегда (требует Secure)`
      },
      {
        title: "Path и Domain",
        code: `// Path: область действия\n// Set-Cookie: name=value; path=/admin\n// Доступен только на /admin/*\n\n// Domain: поддомены\n// Set-Cookie: name=value; domain=.example.com\n// Доступен на example.com и *.example.com\n\n// Без domain: только текущий домен\n// Set-Cookie: name=value\n// Доступен только на текущем домене`
      },
      {
        title: "Работа с cookies в запросах",
        code: `// Cookies автоматически отправляются с запросами\nfetch('/api/data')\n  .then(res => res.json());\n// Cookies отправляются автоматически\n\n// Отключение отправки cookies\nfetch('/api/data', {\n  credentials: 'omit' // не отправлять cookies\n});\n\n// Включение (для cross-origin)\nfetch('https://api.example.com/data', {\n  credentials: 'include' // отправлять cookies\n});\n// Требует CORS с Access-Control-Allow-Credentials: true`
      }
    ],
    relatedTopics: ['web-storage', 'xss', 'csrf', 'same-origin-policy']
  },
  // Git темы - средний уровень
  {
    id: 'git-conflicts',
    title: 'Git: Разрешение конфликтов',
    difficulty: 'intermediate',
    description: 'Конфликты возникают при merge/rebase, когда в одних и тех же строках есть разные изменения. Git помечает конфликтные участки маркерами <<<<<<, =======, >>>>>>. Нужно вручную выбрать нужные изменения или объединить их. После разрешения нужно добавить файлы и завершить merge/rebase.',
    keyPoints: [
      'Конфликты возникают при слиянии веток с разными изменениями в одних строках.',
      'Git помечает конфликтные участки маркерами: <<<<<<, =======, >>>>>>.',
      'Нужно вручную выбрать изменения или объединить их.',
      'После разрешения: git add, затем git commit (для merge) или git rebase --continue.',
      'Можно отменить merge: git merge --abort, rebase: git rebase --abort.'
    ],
    tags: ['git', 'version-control', 'conflicts', 'merge', 'rebase', 'tools', 'productivity'],
    examples: [
      {
        title: "Типичный конфликт",
        code: `<<<<<<< HEAD
const name = "Alice";
=======
const name = "Bob";
>>>>>>> feature-branch

// Нужно выбрать один вариант или объединить:
const name = "Alice and Bob";`
      },
      {
        title: "Разрешение конфликта",
        code: `# 1. Открыть файл с конфликтом
# 2. Найти маркеры конфликта
# 3. Выбрать нужные изменения
# 4. Удалить маркеры <<<<<<, =======, >>>>>>
# 5. Сохранить файл

# 6. Добавить разрешенный файл
git add file.js

# 7. Завершить merge
git commit

# Или для rebase
git rebase --continue`
      },
      {
        title: "Отмена merge/rebase",
        code: `# Отменить merge
git merge --abort

# Отменить rebase
git rebase --abort

# Вернуться к состоянию до начала операции`
      },
      {
        title: "Использование инструментов для разрешения",
        code: `# Открыть визуальный инструмент
git mergetool

# Настроить инструмент по умолчанию
git config --global merge.tool vimdiff
git config --global merge.tool meld
git config --global merge.tool vscode`
      }
    ],
    relatedTopics: ['git-merge', 'git-rebase'],
    nextTopicId: 'git-rebase'
  },
  {
    id: 'git-rebase',
    title: 'Git: Rebase',
    difficulty: 'intermediate',
    description: 'git rebase переносит коммиты из одной ветки на другую, переписывая историю. Создает линейную историю без merge коммитов. Интерактивный rebase (git rebase -i) позволяет изменять, объединять, удалять коммиты. Опасно для публичных веток — переписывает историю. Используется для очистки истории перед merge.',
    keyPoints: [
      'rebase переносит коммиты, переписывая историю.',
      'Создает линейную историю без merge коммитов.',
      'Интерактивный rebase (-i) позволяет редактировать коммиты.',
      'Опасно для публичных веток — переписывает историю.',
      'Используется для очистки истории перед merge в main.'
    ],
    tags: ['git', 'version-control', 'rebase', 'history', 'tools', 'productivity'],
    examples: [
      {
        title: "Базовый rebase",
        code: `# Переключиться на feature ветку
git checkout feature

# Перебазировать на main
git rebase main

# Если есть конфликты, разрешить их и:
git add .
git rebase --continue

# Отменить rebase при проблемах
git rebase --abort`
      },
      {
        title: "Интерактивный rebase",
        code: `# Редактировать последние 3 коммита
git rebase -i HEAD~3

# Откроется редактор с опциями:
# pick - использовать коммит как есть
# reword - изменить сообщение
# edit - остановиться для редактирования
# squash - объединить с предыдущим
# fixup - как squash, но удалить сообщение
# drop - удалить коммит

# После сохранения Git применит изменения`
      },
      {
        title: "Squash коммитов",
        code: `# Объединить несколько коммитов в один
git rebase -i HEAD~3

# В редакторе изменить:
# pick abc123 Первый коммит
# squash def456 Второй коммит
# squash ghi789 Третий коммит

# После сохранения откроется редактор для нового сообщения`
      },
      {
        title: "Rebase vs Merge",
        code: `# Merge создает merge commit
git checkout main
git merge feature
# История: main -> feature -> merge commit

# Rebase создает линейную историю
git checkout feature
git rebase main
git checkout main
git merge feature
# История: main -> feature (линейно)`
      }
    ],
    relatedTopics: ['git-conflicts', 'git-reset-revert'],
    nextTopicId: 'git-reset-revert'
  },
  {
    id: 'git-reset-revert',
    title: 'Git: Reset и Revert',
    difficulty: 'intermediate',
    description: 'git reset откатывает HEAD и индекс к указанному коммиту. --soft сохраняет изменения в staging, --mixed (по умолчанию) в рабочей директории, --hard удаляет все. git revert создает новый коммит, отменяющий изменения указанного коммита. Reset опасен для публичных веток, revert безопасен.',
    keyPoints: [
      'git reset откатывает HEAD к указанному коммиту.',
      '--soft: сохраняет изменения в staging area.',
      '--mixed: сохраняет изменения в рабочей директории (по умолчанию).',
      '--hard: удаляет все изменения (опасно!).',
      'git revert создает новый коммит, отменяющий изменения.',
      'Reset опасен для публичных веток, revert безопасен.'
    ],
    tags: ['git', 'version-control', 'reset', 'revert', 'undo', 'tools', 'productivity'],
    examples: [
      {
        title: "Reset --soft (сохраняет в staging)",
        code: `# Откатить последний коммит, сохранив изменения в staging
git reset --soft HEAD~1

# Изменения остались в staging area
git status
# Changes to be committed: ...`
      },
      {
        title: "Reset --mixed (сохраняет в рабочей директории)",
        code: `# Откатить последний коммит, сохранив изменения
git reset HEAD~1
# или
git reset --mixed HEAD~1

# Изменения в рабочей директории, не в staging
git status
# Changes not staged for commit: ...`
      },
      {
        title: "Reset --hard (удаляет все)",
        code: `# ОПАСНО! Откатить и удалить все изменения
git reset --hard HEAD~1

# Все изменения потеряны!
# Использовать только если уверен

# Откатить к конкретному коммиту
git reset --hard abc123`
      },
      {
        title: "Revert (безопасный откат)",
        code: `# Создать новый коммит, отменяющий изменения
git revert HEAD

# Отменить конкретный коммит
git revert abc123

# Отменить несколько коммитов
git revert HEAD~3..HEAD

# Revert безопасен для публичных веток
# Не переписывает историю`
      },
      {
        title: "Восстановление после reset",
        code: `# Если случайно сделали reset --hard
# Можно восстановить через reflog
git reflog

# Найти нужный коммит
git reset --hard HEAD@{1}

# Или по хешу
git reset --hard abc123`
      }
    ],
    relatedTopics: ['git-rebase', 'git-history'],
    nextTopicId: 'git-history'
  },
  {
    id: 'git-history',
    title: 'Git: Работа с историей',
    difficulty: 'intermediate',
    description: 'git log показывает историю коммитов с различными опциями форматирования. Можно фильтровать по автору, дате, файлу, сообщению. git show показывает изменения конкретного коммита. git diff сравнивает версии. git blame показывает, кто и когда изменил каждую строку файла.',
    keyPoints: [
      'git log показывает историю с различными опциями форматирования.',
      'Можно фильтровать по автору, дате, файлу, сообщению.',
      'git show показывает изменения конкретного коммита.',
      'git diff сравнивает версии файлов или коммитов.',
      'git blame показывает автора каждой строки файла.'
    ],
    tags: ['git', 'version-control', 'history', 'log', 'blame', 'tools', 'productivity'],
    examples: [
      {
        title: "Просмотр истории",
        code: `# Компактный вид
git log --oneline

# Граф веток
git log --oneline --graph --all

# Последние 10 коммитов
git log -10

# История конкретного файла
git log -- file.js

# История с патчами
git log -p

# История с статистикой
git log --stat`
      },
      {
        title: "Фильтрация по автору и дате",
        code: `# Коммиты конкретного автора
git log --author="John"

# Коммиты за последние 2 недели
git log --since="2 weeks ago"

# Коммиты до определенной даты
git log --until="2023-12-31"

# Коммиты между датами
git log --since="2023-01-01" --until="2023-12-31"`

      },
      {
        title: "Поиск по сообщению",
        code: `# Коммиты с текстом в сообщении
git log --grep="bug fix"

# Коммиты с регулярным выражением
git log --grep="fix|bug" --regexp-ignore-case

# Коммиты, изменяющие код
git log -S "functionName" --source --all`
      },
      {
        title: "Просмотр изменений",
        code: `# Изменения в коммите
git show abc123

# Изменения между коммитами
git diff abc123 def456

# Изменения между ветками
git diff main..feature

# Изменения конкретного файла
git diff HEAD~1 HEAD -- file.js`
      },
      {
        title: "Git blame",
        code: `# Кто изменил каждую строку
git blame file.js

# Blame с игнорированием пробелов
git blame -w file.js

# Blame для диапазона строк
git blame -L 10,20 file.js

# Blame с переименованиями
git blame -M file.js`
      }
    ],
    relatedTopics: ['git-reset-revert', 'git-stash'],
    nextTopicId: 'git-stash'
  },
  {
    id: 'git-stash',
    title: 'Git: Stash',
    difficulty: 'intermediate',
    description: 'git stash временно сохраняет незакоммиченные изменения. Полезно при переключении веток с незавершенной работой. git stash pop восстанавливает изменения. Можно создавать несколько stash, именовать их, применять выборочно. Stash не включает неотслеживаемые файлы по умолчанию (нужен -u).',
    keyPoints: [
      'git stash временно сохраняет незакоммиченные изменения.',
      'Полезно при переключении веток с незавершенной работой.',
      'git stash pop восстанавливает и удаляет stash.',
      'git stash apply восстанавливает, но не удаляет.',
      'Можно создавать именованные stash и применять выборочно.',
      'Stash не включает неотслеживаемые файлы по умолчанию.'
    ],
    tags: ['git', 'version-control', 'stash', 'temporary', 'tools', 'productivity'],
    examples: [
      {
        title: "Базовое использование",
        code: `# Сохранить текущие изменения
git stash

# Или с сообщением
git stash save "WIP: работа над функцией"

# Переключиться на другую ветку
git checkout main

# Вернуться и восстановить
git checkout feature
git stash pop`
      },
      {
        title: "Stash с неотслеживаемыми файлами",
        code: `# Включить неотслеживаемые файлы
git stash -u
# или
git stash --include-untracked

# Включить все, включая игнорируемые
git stash -a
# или
git stash --all`
      },
      {
        title: "Работа с несколькими stash",
        code: `# Список всех stash
git stash list

# Применить конкретный stash (не удаляя)
git stash apply stash@{0}

# Удалить stash
git stash drop stash@{0}

# Очистить все stash
git stash clear`
      },
      {
        title: "Stash pop vs apply",
        code: `# pop: восстановить и удалить
git stash pop
# Если конфликт, stash не удаляется

# apply: восстановить, но оставить stash
git stash apply stash@{0}

# Удалить вручную
git stash drop stash@{0}`
      },
      {
        title: "Создание ветки из stash",
        code: `# Создать новую ветку и применить stash
git stash branch new-feature stash@{0}

# Полезно, если stash конфликтует с текущей веткой`
      }
    ],
    relatedTopics: ['git-history', 'git-remote-advanced'],
    nextTopicId: 'git-remote-advanced'
  },
  {
    id: 'git-remote-advanced',
    title: 'Git: Удаленные репозитории (продвинуто)',
    difficulty: 'intermediate',
    description: 'Работа с несколькими удаленными репозиториями. git fetch получает изменения без слияния. Настройка upstream для веток. Отслеживание удаленных веток. Синхронизация с удаленным репозиторием. Работа с форками: добавление upstream, синхронизация изменений.',
    keyPoints: [
      'git fetch получает изменения без слияния.',
      'Можно работать с несколькими удаленными репозиториями.',
      'Upstream связывает локальную ветку с удаленной.',
      'Удаленные ветки можно отслеживать и переключаться на них.',
      'Форки можно синхронизировать с оригинальным репозиторием.'
    ],
    tags: ['git', 'version-control', 'remote', 'fetch', 'upstream', 'tools', 'productivity'],
    examples: [
      {
        title: "Fetch vs Pull",
        code: `# Fetch: получить изменения без слияния
git fetch origin

# Посмотреть изменения
git log HEAD..origin/main

# Слить вручную
git merge origin/main

# Pull: fetch + merge одной командой
git pull origin main`
      },
      {
        title: "Настройка upstream",
        code: `# Установить upstream при push
git push -u origin feature

# После этого можно просто
git push
git pull

# Изменить upstream
git branch --set-upstream-to=origin/main main`
      },
      {
        title: "Работа с несколькими remote",
        code: `# Добавить несколько remote
git remote add upstream https://github.com/original/repo.git
git remote add fork https://github.com/myuser/repo.git

# Получить изменения из всех remote
git fetch --all

# Push в конкретный remote
git push fork main

# Показать все remote
git remote -v`
      },
      {
        title: "Отслеживание удаленных веток",
        code: `# Показать удаленные ветки
git branch -r

# Переключиться на удаленную ветку
git checkout -b local-branch origin/remote-branch

# Или автоматически
git checkout --track origin/feature

# Удалить удаленную ветку
git push origin --delete branch-name`
      },
      {
        title: "Синхронизация форка",
        code: `# Добавить оригинальный репозиторий как upstream
git remote add upstream https://github.com/original/repo.git

# Получить изменения
git fetch upstream

# Слить в свою ветку
git checkout main
git merge upstream/main

# Отправить обновления
git push origin main`
      }
    ],
    relatedTopics: ['git-stash', 'git-remote'],
    nextTopicId: null
  }
];

