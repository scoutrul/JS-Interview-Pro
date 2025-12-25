import { Topic } from '../types';

export const ADVANCED_TOPICS: Topic[] = [
  {
    id: 'lexical-env',
    title: 'Лексическое окружение',
    difficulty: 'advanced',
    description: 'Лексическое окружение состоит из Environment Record (локальные переменные) и Outer Reference (ссылка на внешнее окружение). Создается при каждом вызове функции. Функция "захватывает" ссылку на окружение места определения. Это основа работы замыканий.',
    keyPoints: [
      'Создается при каждом вызове функции.',
      'Определяет доступный контекст данных.'
    ],
    tags: ['lexical environment', 'internals', 'memory'],
    examples: [
      {
        title: "Захват окружения",
        code: `let x = 1;\nfunction func() {\n  console.log(x);\n}\nx = 2;\nfunc(); // 2 (берет актуальное значение)`
      },
      {
        title: "Независимые окружения",
        code: `function createCounter() {\n  let count = 0;\n  return function() {\n    return ++count;\n  };\n}\n\nconst c1 = createCounter();\nconst c2 = createCounter();\nc1(); // 1\nc1(); // 2\nc2(); // 1 (независимое окружение)`
      },
      {
        title: "Окружение сохраняется",
        code: `function outer() {\n  const x = 10;\n  return function inner() {\n    console.log(x);\n  };\n}\n\nconst innerFunc = outer();\n// outer завершилась, но x доступен\ninnerFunc(); // 10`
      }
    ],
    relatedTopics: ['scope-chain', 'closures-basic'],
    nextTopicId: 'closures-basic'
  },
  {
    id: 'event-loop',
    title: 'Event Loop',
    difficulty: 'advanced',
    description: 'Event Loop управляет асинхронностью в однопоточном JS. Порядок: Call Stack → все Microtasks (Promises, queueMicrotask) → одна Macrotask (setTimeout, события). Микрозадачи имеют приоритет над макрозадачами. Асинхронные операции делегируются браузеру, результат попадает в очереди. В Node.js есть дополнительные фазы (timers, I/O callbacks, idle, poll, check, close callbacks).',
    keyPoints: [
      'Сначала выполняется стек (синхронный код).',
      'Затем все микрозадачи (Promises, queueMicrotask).',
      'Затем одна макрозадача (setTimeout, setInterval, события).',
      'Microtasks: Promise.then/catch/finally, queueMicrotask, MutationObserver.',
      'Macrotasks: setTimeout, setInterval, I/O операции, UI события.',
      'Браузер: Call Stack → Microtasks → Render → Macrotask.',
      'Node.js: 6 фаз (timers → pending callbacks → idle → poll → check → close).'
    ],
    tags: ['event loop', 'async', 'performance', 'runtime'],
    examples: [
      {
        title: "Приоритеты",
        code: `console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n// 1, 4, 3, 2`
      },
      {
        title: "Все микрозадачи перед макрозадачами",
        code: `setTimeout(() => console.log(1), 0);\nPromise.resolve().then(() => console.log(2));\nPromise.resolve().then(() => console.log(3));\nsetTimeout(() => console.log(4), 0);\n// 2, 3, 1, 4`
      },
      {
        title: "Вложенные промисы",
        code: `Promise.resolve().then(() => {\n  console.log(1);\n  Promise.resolve().then(() => console.log(2));\n});\nsetTimeout(() => console.log(3), 0);\n// 1, 2, 3 (все микрозадачи сначала)`
      },
      {
        title: "queueMicrotask vs Promise",
        code: `Promise.resolve().then(() => console.log('Promise'));\nqueueMicrotask(() => console.log('queueMicrotask'));\n// Оба выполняются в одной очереди микрозадач\n// Порядок: queueMicrotask, Promise (порядок добавления)`
      },
      {
        title: "Различия браузер vs Node.js",
        code: `// Браузер: между фазами может быть рендеринг\nsetTimeout(() => console.log('timeout'), 0);\nPromise.resolve().then(() => console.log('promise'));\n// promise, timeout\n\n// Node.js: более сложная модель с фазами\n// Timers → Pending callbacks → Idle → Poll → Check → Close`
      }
    ],
    relatedTopics: ['promises', 'async-await', 'call-stack'],
    nextTopicId: 'promises'
  },
  {
    id: 'generators',
    title: 'Generators',
    difficulty: 'advanced',
    description: 'Генератор — функция с yield, которая приостанавливает выполнение и возвращает значение. При вызове возвращает итератор. next() возобновляет выполнение. Используется для ленивых вычислений, бесконечных последовательностей, сложной асинхронной логики.',
    keyPoints: [
      'Возвращают объект-итератор.',
      'Основа для сложных асинхронных паттернов.'
    ],
    tags: ['generators', 'iterators', 'yield'],
    examples: [
      {
        title: "Простой генератор",
        code: `function* gen() {\n  yield 1;\n  yield 2;\n}\nconst g = gen();\ng.next().value; // 1`
      },
      {
        title: "Генератор с параметрами",
        code: `function* counter(start) {\n  let count = start;\n  while (true) {\n    yield count++;\n  }\n}\nconst c = counter(10);\nc.next().value; // 10\nc.next().value; // 11`
      },
      {
        title: "Передача значений в генератор",
        code: `function* gen() {\n  const x = yield 1;\n  const y = yield x + 2;\n  return y;\n}\nconst g = gen();\ng.next(); // { value: 1, done: false }\ng.next(10); // { value: 12, done: false }\ng.next(20); // { value: 20, done: true }`
      }
    ],
    relatedTopics: ['async-await'],
    nextTopicId: 'proxy-reflect'
  },
  {
    id: 'proxy-reflect',
    title: 'Proxy и Reflect',
    difficulty: 'advanced',
    description: 'Proxy перехватывает операции над объектом (чтение, запись, вызов). Reflect предоставляет методы для тех же операций без перехвата. Используется для валидации, логирования, виртуальных свойств, реактивности. Reflect методы возвращают boolean успеха операции.',
    keyPoints: [
      'Proxy(target, handler): перехватывает операции над объектом.',
      'Reflect: методы для тех же операций, возвращают boolean успеха.',
      'Использование: валидация, логирование, виртуальные свойства.',
      'get/set/has/delete: основные перехватываемые операции.'
    ],
    tags: ['proxy', 'reflect', 'metaprogramming', 'ES6'],
    examples: [
      {
        title: "Базовый Proxy",
        code: `const target = { name: "Alice" };\nconst proxy = new Proxy(target, {\n  get(target, prop) {\n    console.log(\`Reading \${prop}\`);\n    return target[prop];\n  },\n  set(target, prop, value) {\n    console.log(\`Setting \${prop} = \${value}\`);\n    target[prop] = value;\n    return true;\n  }\n});\n\nproxy.name; // "Reading name" -> "Alice"\nproxy.age = 30; // "Setting age = 30"`
      },
      {
        title: "Валидация через Proxy",
        code: `const user = new Proxy({}, {\n  set(target, prop, value) {\n    if (prop === "age" && (value < 0 || value > 150)) {\n      throw new Error("Invalid age");\n    }\n    target[prop] = value;\n    return true;\n  }\n});\n\nuser.age = 25; // OK\nuser.age = 200; // Error`
      },
      {
        title: "Reflect",
        code: `const obj = { x: 1 };\n\n// Вместо obj.prop\nReflect.get(obj, "x"); // 1\n\n// Вместо obj.prop = value\nReflect.set(obj, "y", 2); // true\n\n// Проверка успеха\nif (Reflect.deleteProperty(obj, "x")) {\n  console.log("Deleted");\n}`
      }
    ],
    relatedTopics: ['objects-basic', 'classes'],
    nextTopicId: 'getters-setters'
  },
  {
    id: 'getters-setters',
    title: 'Геттеры и сеттеры',
    difficulty: 'advanced',
    description: 'Геттеры и сеттеры — функции, вызываемые при чтении/записи свойства. Определяются через Object.defineProperty() или в объектах/классах через get/set. Позволяют контролировать доступ к свойствам, валидацию, вычисляемые свойства. В прототипах доступны всем экземплярам.',
    keyPoints: [
      'get prop() {}: вызывается при чтении свойства.',
      'set prop(value) {}: вызывается при записи свойства.',
      'Object.defineProperty(obj, prop, {get, set}): определение геттера/сеттера.',
      'Использование: валидация, вычисляемые свойства, контроль доступа.',
      'В прототипах: геттеры/сеттеры доступны всем экземплярам.'
    ],
    tags: ['getters', 'setters', 'properties', 'prototype', 'oop'],
    examples: [
      {
        title: "Геттеры и сеттеры в объектах",
        code: `const user = {\n  firstName: "John",\n  lastName: "Doe",\n  \n  get fullName() {\n    return \`\${this.firstName} \${this.lastName}\`;\n  },\n  \n  set fullName(value) {\n    [this.firstName, this.lastName] = value.split(" ");\n  }\n};\n\nconsole.log(user.fullName); // "John Doe" (вызван геттер)\nuser.fullName = "Jane Smith"; // вызван сеттер\nconsole.log(user.firstName); // "Jane"`
      },
      {
        title: "Object.defineProperty",
        code: `const obj = {};\nlet _value = 0;\n\nObject.defineProperty(obj, 'count', {\n  get() {\n    return _value;\n  },\n  set(value) {\n    if (value < 0) {\n      throw new Error("Count cannot be negative");\n    }\n    _value = value;\n  },\n  enumerable: true,\n  configurable: true\n});\n\nobj.count = 5;\nconsole.log(obj.count); // 5\nobj.count = -1; // Error`
      },
      {
        title: "В прототипах",
        code: `function User(firstName, lastName) {\n  this.firstName = firstName;\n  this.lastName = lastName;\n}\n\nUser.prototype = {\n  get fullName() {\n    return \`\${this.firstName} \${this.lastName}\`;\n  },\n  set fullName(value) {\n    [this.firstName, this.lastName] = value.split(" ");\n  }\n};\n\nconst user = new User("Alice", "Smith");\nconsole.log(user.fullName); // "Alice Smith"\nuser.fullName = "Bob Johnson";\nconsole.log(user.firstName); // "Bob"`
      },
      {
        title: "В классах",
        code: `class User {\n  constructor(firstName, lastName) {\n    this.firstName = firstName;\n    this.lastName = lastName;\n  }\n  \n  get fullName() {\n    return \`\${this.firstName} \${this.lastName}\`;\n  }\n  \n  set fullName(value) {\n    [this.firstName, this.lastName] = value.split(" ");\n  }\n}\n\nconst user = new User("John", "Doe");\nconsole.log(user.fullName); // "John Doe"`
      }
    ],
    relatedTopics: ['prototype-chain', 'constructors', 'classes'],
    nextTopicId: 'getownpropertynames-keys'
  },
  {
    id: 'getownpropertynames-keys',
    title: 'Object.getOwnPropertyNames vs Object.keys',
    difficulty: 'advanced',
    description: 'Object.keys() возвращает только enumerable собственные свойства. Object.getOwnPropertyNames() возвращает все собственные свойства (включая non-enumerable). Object.getOwnPropertyDescriptors() возвращает дескрипторы всех свойств. Разница важна при работе с прототипами и скрытыми свойствами.',
    keyPoints: [
      'Object.keys(obj): только enumerable собственные свойства.',
      'Object.getOwnPropertyNames(obj): все собственные свойства (включая non-enumerable).',
      'Object.getOwnPropertyDescriptors(obj): дескрипторы всех свойств.',
      'Разница: enumerable vs все свойства, включая скрытые.',
      'Использование: глубокий анализ объектов, работа с прототипами.'
    ],
    tags: ['object.keys', 'getownpropertynames', 'properties', 'prototype', 'oop'],
    examples: [
      {
        title: "Разница keys и getOwnPropertyNames",
        code: `const obj = {};\n\nObject.defineProperty(obj, 'visible', {\n  value: 1,\n  enumerable: true\n});\n\nObject.defineProperty(obj, 'hidden', {\n  value: 2,\n  enumerable: false\n});\n\nconsole.log(Object.keys(obj)); // ["visible"]\nconsole.log(Object.getOwnPropertyNames(obj)); // ["visible", "hidden"]`
      },
      {
        title: "С встроенными объектами",
        code: `const arr = [1, 2, 3];\n\n// Только индексы (enumerable)\nObject.keys(arr); // ["0", "1", "2"]\n\n// Все свойства, включая length\nObject.getOwnPropertyNames(arr); // ["0", "1", "2", "length"]\n\n// length - non-enumerable\narr.propertyIsEnumerable('length'); // false`
      },
      {
        title: "getOwnPropertyDescriptors",
        code: `const obj = {};\n\nObject.defineProperty(obj, 'x', {\n  value: 1,\n  writable: false,\n  enumerable: true,\n  configurable: true\n});\n\nObject.defineProperty(obj, 'y', {\n  get() { return 2; },\n  enumerable: false\n});\n\nconst descriptors = Object.getOwnPropertyDescriptors(obj);\nconsole.log(descriptors);\n// {\n//   x: { value: 1, writable: false, enumerable: true, configurable: true },\n//   y: { get: [Function: get], enumerable: false, configurable: true }\n// }`
      },
      {
        title: "Копирование с дескрипторами",
        code: `const source = {};\nObject.defineProperty(source, 'x', {\n  value: 1,\n  writable: false,\n  enumerable: true\n});\n\n// Обычное копирование теряет дескрипторы\nconst copy1 = { ...source };\nObject.getOwnPropertyDescriptor(copy1, 'x');\n// { value: 1, writable: true, enumerable: true, configurable: true }\n\n// Копирование с дескрипторами\nconst copy2 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(source));\nObject.getOwnPropertyDescriptor(copy2, 'x');\n// { value: 1, writable: false, enumerable: true, configurable: true }`
      }
    ],
    relatedTopics: ['hasownproperty-in', 'prototype-chain'],
    nextTopicId: 'mixins'
  },
  {
    id: 'mixins',
    title: 'Mixins (Множественное наследование)',
    difficulty: 'advanced',
    description: 'Mixins позволяют эмулировать множественное наследование в JavaScript. Объект может наследовать методы от нескольких источников. Реализуется через Object.assign() или копирование методов в прототип. Используется для композиции функциональности без глубокой иерархии классов.',
    keyPoints: [
      'Mixin: объект с методами, которые копируются в другой объект.',
      'Object.assign(target, ...mixins): копирует свойства из mixins в target.',
      'Позволяет комбинировать функциональность из нескольких источников.',
      'Альтернатива глубокой иерархии классов.',
      'Использование: композиция вместо наследования.'
    ],
    tags: ['mixins', 'inheritance', 'composition', 'oop', 'patterns'],
    examples: [
      {
        title: "Базовый mixin",
        code: `const CanFly = {\n  fly() {\n    return "Flying!";\n  }\n};\n\nconst CanSwim = {\n  swim() {\n    return "Swimming!";\n  }\n};\n\n// Применяем mixins\nconst Duck = Object.assign({}, CanFly, CanSwim);\n\nconst duck = Object.create(Duck);\nduck.fly(); // "Flying!"\nduck.swim(); // "Swimming!"`
      },
      {
        title: "Mixin в классы",
        code: `// Mixin функции\nconst CanFly = (Base) => class extends Base {\n  fly() {\n    return "Flying!";\n  }\n};\n\nconst CanSwim = (Base) => class extends Base {\n  swim() {\n    return "Swimming!";\n  }\n};\n\nclass Animal {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\n// Применяем mixins\nclass Duck extends CanFly(CanSwim(Animal)) {\n  speak() {\n    return "Quack!";\n  }\n}\n\nconst duck = new Duck("Donald");\nduck.fly(); // "Flying!"\nduck.swim(); // "Swimming!"\nduck.speak(); // "Quack!"`
      },
      {
        title: "Mixin в прототипы",
        code: `function User(name) {\n  this.name = name;\n}\n\n// Mixin с методами\nconst Loggable = {\n  log() {\n    console.log(\`[\${this.constructor.name}] \${this.name}\`);\n  }\n};\n\nconst Serializable = {\n  serialize() {\n    return JSON.stringify(this);\n  }\n};\n\n// Применяем к прототипу\nObject.assign(User.prototype, Loggable, Serializable);\n\nconst user = new User("Alice");\nuser.log(); // "[User] Alice"\nuser.serialize(); // '{"name":"Alice"}'`
      },
      {
        title: "Утилита для mixins",
        code: `function mixin(...mixins) {\n  return function(Base) {\n    return mixins.reduce((Class, mixin) => mixin(Class), Base);\n  };\n}\n\nconst CanFly = (Base) => class extends Base {\n  fly() { return "Flying!"; }\n};\n\nconst CanSwim = (Base) => class extends Base {\n  swim() { return "Swimming!"; }\n};\n\nclass Animal {}\n\n// Применяем несколько mixins\nclass Duck extends mixin(CanFly, CanSwim)(Animal) {}\n\nconst duck = new Duck();\nduck.fly(); // "Flying!"\nduck.swim(); // "Swimming!"`
      }
    ],
    relatedTopics: ['prototype-chain', 'classes', 'object-create'],
    nextTopicId: 'super-prototypes'
  },
  {
    id: 'super-prototypes',
    title: 'super в прототипах',
    difficulty: 'advanced',
    description: 'super в классах вызывает методы родительского класса. Под капотом использует [[HomeObject]] для определения родителя. В обычных функциях super недоступен. В методах объектов super работает через __proto__. Понимание super важно для работы с наследованием и переопределением методов.',
    keyPoints: [
      'super.method(): вызывает метод родительского класса/прототипа.',
      'super в конструкторе: вызывает родительский конструктор.',
      '[[HomeObject]]: внутреннее свойство, определяющее родителя для super.',
      'В обычных функциях super недоступен, только в методах.',
      'super работает через цепочку прототипов.'
    ],
    tags: ['super', 'inheritance', 'prototype', 'classes', 'oop'],
    examples: [
      {
        title: "super в классах",
        code: `class Animal {\n  speak() {\n    return "Some sound";\n  }\n}\n\nclass Dog extends Animal {\n  speak() {\n    return super.speak() + " - Woof!";\n  }\n}\n\nconst dog = new Dog();\nconsole.log(dog.speak()); // "Some sound - Woof!"`
      },
      {
        title: "super в конструкторе",
        code: `class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name); // вызывает Animal.constructor\n    this.breed = breed;\n  }\n}\n\nconst dog = new Dog("Rex", "Labrador");\nconsole.log(dog.name); // "Rex"\nconsole.log(dog.breed); // "Labrador"`
      },
      {
        title: "super в методах объектов",
        code: `const animal = {\n  speak() {\n    return "Some sound";\n  }\n};\n\nconst dog = {\n  __proto__: animal,\n  speak() {\n    return super.speak() + " - Woof!";\n  }\n};\n\nconsole.log(dog.speak()); // "Some sound - Woof!"\n\n// super работает только в методах, не в функциях\nconst speakFunc = dog.speak;\n// speakFunc(); // ошибка: super недоступен`
      },
      {
        title: "[[HomeObject]]",
        code: `// super использует [[HomeObject]] для определения родителя\nconst animal = {\n  name: "Animal",\n  getName() {\n    return this.name;\n  }\n};\n\nconst dog = {\n  __proto__: animal,\n  name: "Dog",\n  getName() {\n    // super.getName() эквивалентно:\n    // Object.getPrototypeOf(Object.getPrototypeOf(this)).getName.call(this)\n    return super.getName();\n  }\n};\n\nconsole.log(dog.getName()); // "Dog" (this = dog)`
      }
    ],
    relatedTopics: ['prototype-chain', 'classes', 'constructors'],
    nextTopicId: 'prototypes-vs-classes'
  },
  {
    id: 'prototypes-vs-classes',
    title: 'Прототипы vs Классы',
    difficulty: 'advanced',
    description: 'Классы — синтаксический сахар над прототипами. Под капотом классы используют прототипное наследование. Разница: синтаксис, hoisting (классы не всплывают), strict mode (классы всегда в strict). Понимание что классы = прототипы важно для отладки и работы с наследованием.',
    keyPoints: [
      'Классы — синтаксический сахар над прототипами.',
      'class extends использует прототипное наследование.',
      'Разница: синтаксис, hoisting, strict mode.',
      'Под капотом: классы создают функции-конструкторы и прототипы.',
      'Понимание эквивалентности важно для отладки.'
    ],
    tags: ['classes', 'prototypes', 'inheritance', 'oop', 'comparison'],
    examples: [
      {
        title: "Эквивалентность",
        code: `// Класс\nclass User {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return "Hello, " + this.name;\n  }\n}\n\n// Эквивалентный код через прототипы\nfunction User(name) {\n  this.name = name;\n}\nUser.prototype.greet = function() {\n  return "Hello, " + this.name;\n};\n\n// Оба работают одинаково\nconst user1 = new User("Alice");\nconst user2 = new User("Bob");\nconsole.log(user1.greet()); // "Hello, Alice"`
      },
      {
        title: "Наследование",
        code: `// Классы\nclass Animal {\n  speak() { return "Sound"; }\n}\nclass Dog extends Animal {\n  speak() { return "Woof"; }\n}\n\n// Эквивалент через прототипы\nfunction Animal() {}\nAnimal.prototype.speak = function() { return "Sound"; };\n\nfunction Dog() {}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\nDog.prototype.speak = function() { return "Woof"; };\n\n// Проверка\nconst dog1 = new Dog();\nconst dog2 = new Dog();\nconsole.log(dog1.speak()); // "Woof"\nconsole.log(Object.getPrototypeOf(dog1) === Dog.prototype); // true`
      },
      {
        title: "Различия",
        code: `// Hoisting\n// Классы не всплывают\n// new User(); // ReferenceError\nclass User {}\n\n// Функции-конструкторы всплывают\nnew UserFunc(); // OK\nfunction UserFunc() {}\n\n// Strict mode\nclass Test {\n  // Весь код в strict mode\n  method() {\n    x = 1; // ReferenceError\n  }\n}\n\n// Функции-конструкторы - зависит от контекста`
      },
      {
        title: "Что под капотом",
        code: `class User {\n  constructor(name) {\n    this.name = name;\n  }\n  static create() {\n    return new User("Default");\n  }\n}\n\n// Проверяем что создалось\nconsole.log(typeof User); // "function" (класс = функция)\nconsole.log(User.prototype); // { constructor: User, ... }\nconsole.log(User.create); // function (static метод)\n\n// Прототипная цепочка\nconst user = new User("Alice");\nconsole.log(user.__proto__ === User.prototype); // true\nconsole.log(User.prototype.constructor === User); // true`
      }
    ],
    relatedTopics: ['prototype-chain', 'classes', 'constructors'],
    nextTopicId: 'weakmap-weakset'
  },
  {
    id: 'weakmap-weakset',
    title: 'WeakMap и WeakSet',
    difficulty: 'advanced',
    description: 'WeakMap и WeakSet хранят слабые ссылки на объекты. Если объект удаляется, он автоматически удаляется из WeakMap/WeakSet. Ключи только объекты, нет итерации, нет size. Используется для метаданных объектов, приватных данных, кэширования без утечек памяти.',
    keyPoints: [
      'Слабые ссылки: объект удаляется из коллекции при сборке мусора.',
      'Ключи только объекты: примитивы не допускаются.',
      'Нет итерации: нельзя перебрать элементы, нет size.',
      'Использование: метаданные, приватные данные, кэш без утечек.'
    ],
    tags: ['weakmap', 'weakset', 'memory', 'garbage-collection'],
    examples: [
      {
        title: "WeakMap",
        code: `const wm = new WeakMap();\nconst obj1 = {};\nconst obj2 = {};\n\nwm.set(obj1, "data1");\nwm.set(obj2, "data2");\n\nwm.get(obj1); // "data1"\nwm.has(obj2); // true\n\n// obj1 удаляется -> автоматически удаляется из WeakMap`
      },
      {
        title: "Приватные данные",
        code: `const privateData = new WeakMap();\n\nclass User {\n  constructor(name) {\n    privateData.set(this, { name });\n  }\n  getName() {\n    return privateData.get(this).name;\n  }\n}\n\nconst user = new User("Alice");\nuser.getName(); // "Alice"\n// privateData недоступна снаружи`
      },
      {
        title: "WeakSet",
        code: `const ws = new WeakSet();\nconst obj1 = {};\nconst obj2 = {};\n\nws.add(obj1);\nws.add(obj2);\n\nws.has(obj1); // true\nws.delete(obj2);\n\n// Использование: отслеживание посещенных объектов`
      }
    ],
    relatedTopics: ['map-set', 'memory-management'],
    nextTopicId: 'iterators-iterables'
  },
  {
    id: 'iterators-iterables',
    title: 'Iterators и Iterables',
    difficulty: 'advanced',
    description: 'Iterable — объект с методом Symbol.iterator, возвращающим итератор. Iterator — объект с методом next(), возвращающим {value, done}. for...of работает с iterables. Можно создавать кастомные iterables. Генераторы автоматически создают iterators.',
    keyPoints: [
      'Iterable: объект с Symbol.iterator, возвращающим iterator.',
      'Iterator: объект с next(), возвращающим {value, done}.',
      'for...of: работает с любым iterable.',
      'Генераторы: автоматически iterable, создают iterator.'
    ],
    tags: ['iterators', 'iterables', 'symbol', 'generators'],
    examples: [
      {
        title: "Кастомный iterable",
        code: `const range = {\n  start: 1,\n  end: 5,\n  [Symbol.iterator]() {\n    let current = this.start;\n    return {\n      next: () => {\n        if (current <= this.end) {\n          return { value: current++, done: false };\n        }\n        return { done: true };\n      }\n    };\n  }\n};\n\nfor (const num of range) {\n  console.log(num); // 1, 2, 3, 4, 5\n}`
      },
      {
        title: "Итератор вручную",
        code: `const arr = [1, 2, 3];\nconst iterator = arr[Symbol.iterator]();\n\niterator.next(); // { value: 1, done: false }\niterator.next(); // { value: 2, done: false }\niterator.next(); // { value: 3, done: false }\niterator.next(); // { value: undefined, done: true }`
      },
      {
        title: "Генератор как iterable",
        code: `function* countTo(n) {\n  for (let i = 1; i <= n; i++) {\n    yield i;\n  }\n}\n\nfor (const num of countTo(3)) {\n  console.log(num); // 1, 2, 3\n}\n\n// Генератор автоматически iterable\nconst gen = countTo(2);\ngen[Symbol.iterator]() === gen; // true`
      }
    ],
    relatedTopics: ['generators', 'symbol', 'arrays-basic'],
    nextTopicId: 'memory-management'
  },
  {
    id: 'memory-management',
    title: 'Управление памятью',
    difficulty: 'advanced',
    description: 'JavaScript использует автоматическую сборку мусора (Garbage Collector). Память делится на Stack (примитивы, ссылки) и Heap (объекты). Объекты удаляются когда на них нет ссылок. Утечки памяти: глобальные переменные, замыкания с большими данными, забытые таймеры/слушатели событий, циклические ссылки. WeakMap/WeakSet помогают избежать утечек.',
    keyPoints: [
      'Stack: хранит примитивы и ссылки на объекты, быстрый доступ, ограниченный размер.',
      'Heap: хранит объекты, медленнее, больший размер, управляется GC.',
      'Сборка мусора: автоматическая, удаляет объекты без ссылок (mark-and-sweep, generational).',
      'Утечки: глобальные переменные, большие замыкания, таймеры, слушатели событий.',
      'Циклические ссылки: GC справляется, но могут удерживать память дольше.',
      'WeakMap/WeakSet: не препятствуют сборке мусора, слабые ссылки.'
    ],
    tags: ['memory', 'garbage-collection', 'leaks', 'performance', 'stack', 'heap'],
    examples: [
      {
        title: "Stack vs Heap",
        code: `// Stack: примитивы и ссылки\nlet num = 42; // в Stack\nlet str = "hello"; // в Stack\n\n// Heap: объекты\nlet obj = { x: 1 }; // obj (ссылка) в Stack, { x: 1 } в Heap\nlet arr = [1, 2, 3]; // arr (ссылка) в Stack, [1,2,3] в Heap\n\n// Копирование\nlet a = 5; // в Stack\nlet b = a; // копия в Stack\n\nlet obj1 = { x: 1 }; // ссылка в Stack, объект в Heap\nlet obj2 = obj1; // копия ссылки, тот же объект в Heap`
      },
      {
        title: "Сборка мусора",
        code: `function createData() {\n  const largeArray = new Array(1000000).fill(0);\n  return { data: largeArray };\n}\n\nlet obj = createData();\n// obj ссылается на largeArray в Heap\n\nobj = null;\n// largeArray может быть удален сборщиком мусора\n// GC пометит как недоступный и удалит`
      },
      {
        title: "Утечка через замыкание",
        code: `function leak() {\n  const hugeData = new Array(1000000).fill(0);\n  \n  setInterval(() => {\n    // hugeData не удаляется, пока работает интервал\n    // замыкание удерживает ссылку\n    console.log("Still running");\n  }, 1000);\n}\n\n// Решение: очистка интервала\nconst timer = setInterval(() => {}, 1000);\nclearInterval(timer); // освобождает память`
      },
      {
        title: "Утечка через слушатель событий",
        code: `// Плохо: слушатель не удаляется\nfunction bad() {\n  const element = document.getElementById('btn');\n  element.addEventListener('click', () => {\n    // обработчик удерживает ссылку на element\n    console.log('clicked');\n  });\n  // element удален из DOM, но слушатель держит ссылку\n}\n\n// Хорошо: явное удаление\nfunction good() {\n  const element = document.getElementById('btn');\n  const handler = () => console.log('clicked');\n  element.addEventListener('click', handler);\n  \n  // Удаляем при необходимости\n  element.removeEventListener('click', handler);\n}`
      },
      {
        title: "Garbage Collector алгоритмы",
        code: `// Mark-and-Sweep: помечает достижимые объекты, удаляет недостижимые\n// Generational: разделяет на молодые и старые объекты\n// Молодые объекты проверяются чаще (больше шансов быть удаленными)\n\n// Принудительная сборка (не рекомендуется, только для тестов)\nif (global.gc) {\n  global.gc(); // Node.js с флагом --expose-gc\n}`
      },
      {
        title: "Циклические ссылки",
        code: `let obj1 = { name: "A" };\nlet obj2 = { name: "B" };\n\nobj1.ref = obj2;\nobj2.ref = obj1;\n\n// Циклическая ссылка, но сборщик мусора справляется\n// Современный GC (mark-and-sweep) находит циклические ссылки\nobj1 = null;\nobj2 = null;\n// Оба объекта могут быть удалены`
      }
    ],
    relatedTopics: ['weakmap-weakset', 'closures-basic', 'stack-heap'],
    nextTopicId: 'regexp-advanced'
  },
  {
    id: 'regexp-advanced',
    title: 'RegExp (продвинутые)',
    difficulty: 'advanced',
    description: 'Группы захватывают части совпадения, доступны через $1, $2 или match[1], match[2]. Lookahead (?=) и lookbehind (?<=) проверяют контекст без захвата. Флаги: g (глобальный), i (регистр), m (многострочный), s (точка включает \\n), u (Unicode).',
    keyPoints: [
      'Группы: (pattern) захватывает, доступ через $1 или match[1].',
      'Lookahead: (?=pattern) проверяет что следует дальше.',
      'Lookbehind: (?<=pattern) проверяет что было до.',
      'Флаги: g (все совпадения), i (игнор регистра), m (многострочный).'
    ],
    tags: ['regexp', 'regular-expressions', 'patterns'],
    examples: [
      {
        title: "Группы захвата",
        code: `const str = "John Doe";\nconst match = str.match(/(\\w+) (\\w+)/);\nconsole.log(match[1]); // "John"\nconsole.log(match[2]); // "Doe"\n\n// Замена с группами\n"2023-12-25".replace(/(\\d{4})-(\\d{2})-(\\d{2})/, "$3.$2.$1");\n// "25.12.2023"`
      },
      {
        title: "Lookahead и lookbehind",
        code: `// Positive lookahead: число перед "px"\n"100px".match(/\\d+(?=px)/); // "100"\n\n// Negative lookahead: число не перед "px"\n"100em".match(/\\d+(?!px)/); // "100"\n\n// Positive lookbehind: число после "$"\n"$100".match(/(?<=\\$)\\d+/); // "100"\n\n// Negative lookbehind: число не после "$"\n"€100".match(/(?<!\\$)\\d+/); // "100"`
      },
      {
        title: "Флаги",
        code: `const str = "Hello\\nWorld";\n\n// g: все совпадения\nstr.match(/o/g); // ["o", "o"]\n\n// i: игнор регистра\n"Hello".match(/hello/i); // ["Hello"]\n\n// m: многострочный (^ и $ для каждой строки)\nstr.match(/^W/m); // ["W"]\n\n// s: точка включает \\n\nstr.match(/o.W/s); // ["o\\nW"]`
      }
    ],
    relatedTopics: ['strings-methods']
  },
  {
    id: 'currying',
    title: 'Currying и Partial Application',
    difficulty: 'advanced',
    description: 'Currying — преобразование функции с несколькими аргументами в цепочку функций с одним аргументом. Partial Application — фиксация части аргументов функции. Позволяет создавать специализированные функции, улучшает переиспользование кода. Основа функционального программирования.',
    keyPoints: [
      'Currying: f(a, b, c) → f(a)(b)(c).',
      'Partial Application: фиксация части аргументов.',
      'Создает специализированные функции из общих.',
      'Улучшает переиспользование и композицию.',
      'Основа функционального программирования.'
    ],
    tags: ['currying', 'functional', 'partial-application', 'patterns'],
    examples: [
      {
        title: "Currying вручную",
        code: `function add(a) {\n  return function(b) {\n    return function(c) {\n      return a + b + c;\n    };\n  };\n}\n\nadd(1)(2)(3); // 6\n\n// Arrow functions\nconst add = a => b => c => a + b + c;`
      },
      {
        title: "Универсальный curry",
        code: `function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    }\n    return function(...nextArgs) {\n      return curried.apply(this, args.concat(nextArgs));\n    };\n  };\n}\n\nconst multiply = (a, b, c) => a * b * c;\nconst curriedMultiply = curry(multiply);\n\ncurriedMultiply(2)(3)(4); // 24\ncurriedMultiply(2, 3)(4); // 24`
      },
      {
        title: "Partial Application",
        code: `function partial(fn, ...fixedArgs) {\n  return function(...remainingArgs) {\n    return fn(...fixedArgs, ...remainingArgs);\n  };\n}\n\nfunction greet(greeting, name) {\n  return \`\${greeting}, \${name}!\`;\n}\n\nconst sayHello = partial(greet, "Hello");\nsayHello("Alice"); // "Hello, Alice!"\n\nconst sayHi = partial(greet, "Hi");\nsayHi("Bob"); // "Hi, Bob!"`
      }
    ],
    relatedTopics: ['higher-order-functions', 'closures-basic', 'functions-types']
  },
  {
    id: 'memoization',
    title: 'Мемоизация',
    difficulty: 'advanced',
    description: 'Мемоизация — кэширование результатов функции для одинаковых аргументов. При повторном вызове с теми же аргументами возвращается кэшированное значение. Ускоряет вычисления, особенно для рекурсивных функций. Используется в React.memo, useMemo.',
    keyPoints: [
      'Кэширование результатов функции.',
      'Проверка: были ли такие аргументы ранее.',
      'Возврат кэша или вычисление и сохранение.',
      'Ускоряет повторные вычисления.',
      'Используется в React.memo, useMemo.'
    ],
    tags: ['memoization', 'performance', 'optimization', 'caching'],
    examples: [
      {
        title: "Простая мемоизация",
        code: `function memoize(fn) {\n  const cache = {};\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache[key]) {\n      return cache[key];\n    }\n    const result = fn.apply(this, args);\n    cache[key] = result;\n    return result;\n  };\n}\n\nconst expensive = (n) => {\n  console.log("Computing...");\n  return n * 2;\n};\n\nconst memoized = memoize(expensive);\nmemoized(5); // Computing... 10\nmemoized(5); // 10 (из кэша)`
      },
      {
        title: "Мемоизация факториала",
        code: `const memoFactorial = memoize(function(n) {\n  if (n <= 1) return 1;\n  return n * memoFactorial(n - 1);\n});\n\nmemoFactorial(5); // Вычисляет 5, 4, 3, 2, 1\nmemoFactorial(6); // Использует кэш для 5, вычисляет только 6`
      },
      {
        title: "Мемоизация с Map",
        code: `function memoizeMap(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = args.join(',');\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}`
      }
    ],
    relatedTopics: ['recursion', 'higher-order-functions', 'performance']
  },
  {
    id: 'design-patterns',
    title: 'Паттерны проектирования',
    difficulty: 'advanced',
    description: 'Singleton — один экземпляр класса. Factory — создание объектов через фабричную функцию. Observer — подписка на события, уведомление подписчиков. Паттерны решают типичные задачи проектирования, улучшают структуру кода.',
    keyPoints: [
      'Singleton: гарантирует один экземпляр объекта.',
      'Factory: создание объектов через функцию, скрывает детали.',
      'Observer: подписка/отписка, уведомление подписчиков.',
      'Решают типичные задачи проектирования.',
      'Улучшают структуру и переиспользование кода.'
    ],
    tags: ['patterns', 'design', 'singleton', 'factory', 'observer', 'architecture'],
    examples: [
      {
        title: "Singleton",
        code: `class Singleton {\n  constructor() {\n    if (Singleton.instance) {\n      return Singleton.instance;\n    }\n    Singleton.instance = this;\n  }\n}\n\nconst s1 = new Singleton();\nconst s2 = new Singleton();\ns1 === s2; // true\n\n// Или через замыкание\nconst Singleton = (function() {\n  let instance;\n  return function() {\n    if (!instance) instance = this;\n    return instance;\n  };\n})();`
      },
      {
        title: "Factory",
        code: `function createUser(type) {\n  switch(type) {\n    case 'admin':\n      return { role: 'admin', permissions: ['all'] };\n    case 'user':\n      return { role: 'user', permissions: ['read'] };\n    default:\n      throw new Error('Unknown user type');\n  }\n}\n\nconst admin = createUser('admin');\nconst user = createUser('user');`
      },
      {
        title: "Observer",
        code: `class EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n  \n  on(event, callback) {\n    if (!this.events[event]) {\n      this.events[event] = [];\n    }\n    this.events[event].push(callback);\n  }\n  \n  emit(event, data) {\n    if (this.events[event]) {\n      this.events[event].forEach(cb => cb(data));\n    }\n  }\n}\n\nconst emitter = new EventEmitter();\nemitter.on('click', (data) => console.log(data));\nemitter.emit('click', 'Hello'); // "Hello"`
      }
    ],
    relatedTopics: ['classes', 'closures-basic', 'higher-order-functions']
  },
  {
    id: 'performance-optimization',
    title: 'Оптимизация производительности',
    difficulty: 'advanced',
    description: 'Профилирование через Performance API, DevTools. Оптимизация: избегать лишних вычислений, использовать мемоизацию, ленивые вычисления, виртуализацию списков. Оптимизация рендеринга: React.memo, useMemo, useCallback. Избегать утечек памяти, оптимизировать события.',
    keyPoints: [
      'Профилирование: Performance API, Chrome DevTools.',
      'Мемоизация: кэширование результатов вычислений.',
      'Ленивые вычисления: вычислять только при необходимости.',
      'Виртуализация: рендерить только видимые элементы.',
      'Оптимизация рендеринга: React.memo, useMemo, useCallback.'
    ],
    tags: ['performance', 'optimization', 'profiling', 'memory'],
    examples: [
      {
        title: "Performance API",
        code: `// Измерение времени выполнения\nconst start = performance.now();\n\n// Код для измерения\nfor (let i = 0; i < 1000000; i++) {\n  Math.sqrt(i);\n}\n\nconst end = performance.now();\nconsole.log(\`Execution time: \${end - start}ms\`);\n\n// Маркеры\nperformance.mark('start');\n// код\nperformance.mark('end');\nperformance.measure('duration', 'start', 'end');`
      },
      {
        title: "Ленивые вычисления",
        code: `function lazyCompute() {\n  let cached = null;\n  return function() {\n    if (cached === null) {\n      console.log("Computing...");\n      cached = expensiveOperation();\n    }\n    return cached;\n  };\n}\n\nconst getValue = lazyCompute();\ngetValue(); // Computing...\ngetValue(); // Из кэша`
      },
      {
        title: "Оптимизация событий",
        code: `// Плохо: создается новая функция при каждом рендере\n<button onClick={() => handleClick(id)}>Click</button>\n\n// Хорошо: мемоизированный callback\nconst handleClick = useCallback((id) => {\n  // обработка\n}, [dependencies]);\n\n<button onClick={handleClick}>Click</button>`
      }
    ],
    relatedTopics: ['memoization', 'memory-management', 'debounce-throttle']
  },
  {
    id: 'service-workers',
    title: 'Service Workers',
    difficulty: 'advanced',
    description: 'Service Worker — прокси между браузером и сетью. Работает в фоне, может перехватывать запросы, кэшировать ресурсы, работать офлайн. Регистрация через navigator.serviceWorker.register(). События: install (установка), activate (активация), fetch (перехват запросов). Используется для PWA, офлайн-режима.',
    keyPoints: [
      'navigator.serviceWorker.register(script): регистрация воркера.',
      'Работает в отдельном потоке, может работать офлайн.',
      'События: install (кэширование), activate (очистка старого кэша), fetch (перехват запросов).',
      'Cache API: кэширование ресурсов для офлайн-доступа.',
      'Использование: PWA, офлайн-режим, push-уведомления.'
    ],
    tags: ['service-workers', 'pwa', 'offline', 'caching', 'browser', 'api'],
    examples: [
      {
        title: "Регистрация Service Worker",
        code: `// main.js\nif ('serviceWorker' in navigator) {\n  navigator.serviceWorker.register('/sw.js')\n    .then(registration => {\n      console.log('SW registered:', registration);\n    })\n    .catch(error => {\n      console.error('SW registration failed:', error);\n    });\n}\n\n// sw.js\nself.addEventListener('install', (event) => {\n  console.log('Service Worker installing');\n  event.waitUntil(\n    caches.open('v1').then(cache => {\n      return cache.addAll([\n        '/',\n        '/index.html',\n        '/styles.css',\n        '/app.js'\n      ]);\n    })\n  );\n});`
      },
      {
        title: "Кэширование и офлайн",
        code: `// sw.js\nself.addEventListener('fetch', (event) => {\n  event.respondWith(\n    caches.match(event.request)\n      .then(response => {\n        // Возвращаем из кэша или делаем запрос\n        return response || fetch(event.request);\n      })\n  );\n});\n\n// Стратегия: Cache First\nself.addEventListener('fetch', (event) => {\n  event.respondWith(\n    caches.match(event.request)\n      .then(response => response || fetch(event.request))\n  );\n});\n\n// Стратегия: Network First\nself.addEventListener('fetch', (event) => {\n  event.respondWith(\n    fetch(event.request)\n      .then(response => {\n        const clone = response.clone();\n        caches.open('v1').then(cache => cache.put(event.request, clone));\n        return response;\n      })\n      .catch(() => caches.match(event.request))\n  );\n});`
      },
      {
        title: "Активация и обновление",
        code: `// sw.js\nself.addEventListener('activate', (event) => {\n  console.log('Service Worker activating');\n  \n  event.waitUntil(\n    caches.keys().then(cacheNames => {\n      return Promise.all(\n        cacheNames.map(cacheName => {\n          if (cacheName !== 'v2') { // удаляем старые кэши\n            return caches.delete(cacheName);\n          }\n        })\n      );\n    })\n  );\n});`
      }
    ],
    relatedTopics: ['web-workers', 'fetch-api', 'web-storage']
  },
  {
    id: 'websocket-api',
    title: 'WebSocket API',
    difficulty: 'advanced',
    description: 'WebSocket API для двусторонней связи в реальном времени. new WebSocket(url) создает соединение. События: open (соединение установлено), message (получено сообщение), error (ошибка), close (закрыто). send() отправляет данные, close() закрывает. Используется для чатов, игр, стриминга.',
    keyPoints: [
      'new WebSocket(url): создает WebSocket соединение (ws:// или wss://).',
      'События: open, message, error, close.',
      'send(data): отправка данных (текст, Blob, ArrayBuffer).',
      'close(code, reason): закрытие соединения.',
      'Использование: чаты, игры, стриминг, реальное время.'
    ],
    tags: ['websocket', 'realtime', 'networking', 'browser', 'api'],
    examples: [
      {
        title: "Базовое соединение",
        code: `const ws = new WebSocket('wss://echo.websocket.org');\n\nws.onopen = () => {\n  console.log('Connected');\n  ws.send('Hello Server!');\n};\n\nws.onmessage = (event) => {\n  console.log('Received:', event.data);\n};\n\nws.onerror = (error) => {\n  console.error('Error:', error);\n};\n\nws.onclose = () => {\n  console.log('Disconnected');\n};\n\n// Закрытие\nws.close();`
      },
      {
        title: "Чат приложение",
        code: `class ChatClient {\n  constructor(url) {\n    this.ws = new WebSocket(url);\n    this.setupHandlers();\n  }\n  \n  setupHandlers() {\n    this.ws.onopen = () => {\n      console.log('Connected to chat');\n    };\n    \n    this.ws.onmessage = (event) => {\n      const message = JSON.parse(event.data);\n      this.displayMessage(message);\n    };\n    \n    this.ws.onclose = () => {\n      console.log('Disconnected, reconnecting...');\n      setTimeout(() => this.reconnect(), 1000);\n    };\n  }\n  \n  sendMessage(text) {\n    if (this.ws.readyState === WebSocket.OPEN) {\n      this.ws.send(JSON.stringify({ text, timestamp: Date.now() }));\n    }\n  }\n  \n  reconnect() {\n    this.ws = new WebSocket(this.url);\n    this.setupHandlers();\n  }\n}`
      },
      {
        title: "Отправка разных типов данных",
        code: `const ws = new WebSocket('wss://example.com');\n\nws.onopen = () => {\n  // Текст\n  ws.send('Hello');\n  \n  // JSON\n  ws.send(JSON.stringify({ type: 'message', data: 'Hello' }));\n  \n  // Blob\n  const blob = new Blob(['Binary data'], { type: 'text/plain' });\n  ws.send(blob);\n  \n  // ArrayBuffer\n  const buffer = new ArrayBuffer(8);\n  ws.send(buffer);\n};\n\nws.onmessage = (event) => {\n  if (event.data instanceof Blob) {\n    // обработка Blob\n  } else if (typeof event.data === 'string') {\n    // обработка текста\n  }\n};`
      }
    ],
    relatedTopics: ['fetch-api', 'async-await', 'event-api']
  },
  {
    id: 'geolocation-api',
    title: 'Geolocation API',
    difficulty: 'advanced',
    description: 'Geolocation API получает географическое положение устройства. navigator.geolocation.getCurrentPosition() получает позицию один раз, watchPosition() отслеживает изменения. Требует разрешения пользователя. Возвращает координаты (latitude, longitude), точность, высоту. Используется для карт, навигации, геолокации.',
    keyPoints: [
      'navigator.geolocation.getCurrentPosition(success, error, options): получает позицию.',
      'watchPosition(): отслеживает изменения позиции, возвращает ID.',
      'clearWatch(id): останавливает отслеживание.',
      'Требует разрешения пользователя (HTTPS или localhost).',
      'Возвращает: latitude, longitude, accuracy, altitude.'
    ],
    tags: ['geolocation', 'location', 'maps', 'browser', 'api'],
    examples: [
      {
        title: "Получение текущей позиции",
        code: `if ('geolocation' in navigator) {\n  navigator.geolocation.getCurrentPosition(\n    (position) => {\n      const { latitude, longitude, accuracy } = position.coords;\n      console.log(\`Lat: \${latitude}, Lng: \${longitude}\`);\n      console.log(\`Accuracy: \${accuracy} meters\`);\n    },\n    (error) => {\n      console.error('Error:', error.message);\n      // error.code: 1 (PERMISSION_DENIED), 2 (POSITION_UNAVAILABLE), 3 (TIMEOUT)\n    },\n    {\n      enableHighAccuracy: true,\n      timeout: 5000,\n      maximumAge: 0\n    }\n  );\n}`
      },
      {
        title: "Отслеживание позиции",
        code: `let watchId;\n\nfunction startTracking() {\n  watchId = navigator.geolocation.watchPosition(\n    (position) => {\n      const { latitude, longitude } = position.coords;\n      updateMap(latitude, longitude);\n    },\n    (error) => {\n      console.error('Tracking error:', error);\n    },\n    {\n      enableHighAccuracy: true,\n      maximumAge: 1000 // обновлять не чаще раза в секунду\n    }\n  );\n}\n\nfunction stopTracking() {\n  if (watchId) {\n    navigator.geolocation.clearWatch(watchId);\n  }\n}`
      },
      {
        title: "Интеграция с картами",
        code: `async function getLocation() {\n  return new Promise((resolve, reject) => {\n    navigator.geolocation.getCurrentPosition(\n      (position) => {\n        resolve({\n          lat: position.coords.latitude,\n          lng: position.coords.longitude\n        });\n      },\n      reject,\n      { enableHighAccuracy: true }\n    );\n  });\n}\n\n// Использование\nconst location = await getLocation();\n// Отправка на карту или API\nmap.setCenter([location.lat, location.lng]);`
      }
    ],
    relatedTopics: ['async-await', 'promises', 'dom-api']
  },
  {
    id: 'mediadevices-api',
    title: 'MediaDevices API',
    difficulty: 'advanced',
    description: 'MediaDevices API получает доступ к камере и микрофону. navigator.mediaDevices.getUserMedia(constraints) запрашивает доступ. Возвращает MediaStream. video/audio элементы могут отображать поток. Используется для видеозвонков, записи, стриминга. Требует HTTPS и разрешения пользователя.',
    keyPoints: [
      'navigator.mediaDevices.getUserMedia(constraints): запрашивает доступ к медиа.',
      'constraints: { video: true/false, audio: true/false } или объект с настройками.',
      'Возвращает Promise<MediaStream> с треками (video/audio).',
      'getTracks() получает треки, stop() останавливает.',
      'Требует HTTPS (кроме localhost) и разрешения пользователя.'
    ],
    tags: ['mediadevices', 'camera', 'microphone', 'streaming', 'browser', 'api'],
    examples: [
      {
        title: "Доступ к камере",
        code: `async function startCamera() {\n  try {\n    const stream = await navigator.mediaDevices.getUserMedia({\n      video: true,\n      audio: false\n    });\n    \n    const video = document.querySelector('video');\n    video.srcObject = stream;\n    \n    console.log('Camera started');\n  } catch (error) {\n    console.error('Error accessing camera:', error);\n    // error.name: NotAllowedError, NotFoundError, etc.\n  }\n}\n\n// Остановка\nfunction stopCamera(stream) {\n  stream.getTracks().forEach(track => track.stop());\n}`
      },
      {
        title: "Настройки камеры",
        code: `const constraints = {\n  video: {\n    width: { ideal: 1280 },\n    height: { ideal: 720 },\n    facingMode: 'user' // или 'environment' для задней камеры\n  },\n  audio: {\n    echoCancellation: true,\n    noiseSuppression: true\n  }\n};\n\nconst stream = await navigator.mediaDevices.getUserMedia(constraints);`
      },
      {
        title: "Запись видео",
        code: `let mediaRecorder;\nlet recordedChunks = [];\n\nasync function startRecording() {\n  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });\n  \n  mediaRecorder = new MediaRecorder(stream);\n  \n  mediaRecorder.ondataavailable = (event) => {\n    if (event.data.size > 0) {\n      recordedChunks.push(event.data);\n    }\n  };\n  \n  mediaRecorder.onstop = () => {\n    const blob = new Blob(recordedChunks, { type: 'video/webm' });\n    const url = URL.createObjectURL(blob);\n    // Сохранить или отправить\n  };\n  \n  mediaRecorder.start();\n}\n\nfunction stopRecording() {\n  mediaRecorder.stop();\n}`
      }
    ],
    relatedTopics: ['file-api', 'async-await', 'dom-api']
  },
  {
    id: 'page-visibility-api',
    title: 'Page Visibility API',
    difficulty: 'advanced',
    description: 'Page Visibility API определяет видимость страницы. document.visibilityState: "visible" (видима), "hidden" (скрыта). Событие visibilitychange срабатывает при изменении. Используется для оптимизации: пауза видео/анимаций при скрытии, остановка таймеров, экономия ресурсов.',
    keyPoints: [
      'document.visibilityState: "visible" или "hidden".',
      'document.hidden: boolean, true если страница скрыта.',
      'visibilitychange: событие при изменении видимости.',
      'Использование: пауза видео/анимаций, остановка таймеров, экономия ресурсов.',
      'Оптимизация производительности и батареи.'
    ],
    tags: ['page-visibility', 'performance', 'optimization', 'browser', 'api'],
    examples: [
      {
        title: "Базовое использование",
        code: `// Проверка текущего состояния\nif (document.hidden) {\n  console.log('Page is hidden');\n} else {\n  console.log('Page is visible');\n}\n\n// Слушаем изменения\ndocument.addEventListener('visibilitychange', () => {\n  if (document.hidden) {\n    console.log('Page became hidden');\n    pauseVideo();\n    stopAnimations();\n  } else {\n    console.log('Page became visible');\n    resumeVideo();\n    startAnimations();\n  }\n});`
      },
      {
        title: "Оптимизация видео",
        code: `const video = document.querySelector('video');\n\ndocument.addEventListener('visibilitychange', () => {\n  if (document.hidden) {\n    // Пауза при скрытии\n    video.pause();\n  } else {\n    // Возобновление при показе\n    video.play();\n  }\n});`
      },
      {
        title: "Остановка таймеров и запросов",
        code: `let intervalId;\nlet animationFrameId;\n\nfunction startUpdates() {\n  intervalId = setInterval(updateData, 1000);\n  animationFrameId = requestAnimationFrame(animate);\n}\n\nfunction stopUpdates() {\n  clearInterval(intervalId);\n  cancelAnimationFrame(animationFrameId);\n}\n\ndocument.addEventListener('visibilitychange', () => {\n  if (document.hidden) {\n    stopUpdates(); // экономия ресурсов\n  } else {\n    startUpdates(); // возобновление\n  }\n});`
      },
      {
        title: "Отправка аналитики",
        code: `let startTime = Date.now();\n\nfunction trackVisibility() {\n  document.addEventListener('visibilitychange', () => {\n    if (document.hidden) {\n      // Страница скрыта - отправляем время просмотра\n      const viewTime = Date.now() - startTime;\n      sendAnalytics({ viewTime, event: 'page_hidden' });\n    } else {\n      // Страница видна - начинаем отсчет\n      startTime = Date.now();\n      sendAnalytics({ event: 'page_visible' });\n    }\n  });\n}`
      }
    ],
    relatedTopics: ['event-api', 'performance-optimization', 'dom-api']
  },
  {
    id: 'call-stack',
    title: 'Call Stack',
    difficulty: 'advanced',
    description: 'Call Stack (стек вызовов) — структура данных, которая отслеживает вызовы функций. При вызове функции она добавляется в стек, при завершении удаляется. LIFO (Last In First Out) — последняя вызванная функция выполняется первой. Переполнение стека происходит при слишком глубокой рекурсии или бесконечной рекурсии. Связан с Event Loop — синхронный код выполняется в стеке.',
    keyPoints: [
      'Call Stack: структура данных для отслеживания вызовов функций.',
      'LIFO: последняя вызванная функция выполняется первой.',
      'При вызове функции: добавляется в стек (push).',
      'При завершении функции: удаляется из стека (pop).',
      'Stack Overflow: переполнение при слишком глубокой рекурсии (~10000 вызовов).',
      'Связан с Event Loop: синхронный код выполняется в стеке перед асинхронным.'
    ],
    tags: ['call-stack', 'runtime', 'stack', 'functions', 'performance'],
    examples: [
      {
        title: "Как работает Call Stack",
        code: `function first() {\n  console.log('First');\n  second();\n  console.log('First end');\n}\n\nfunction second() {\n  console.log('Second');\n  third();\n  console.log('Second end');\n}\n\nfunction third() {\n  console.log('Third');\n}\n\nfirst();\n// Стек:\n// [third] <- выполняется\n// [second]\n// [first]\n// [global]\n// Вывод: First, Second, Third, Second end, First end`
      },
      {
        title: "Stack Overflow",
        code: `// Переполнение стека\nfunction infinite() {\n  infinite(); // бесконечная рекурсия\n}\n\n// infinite(); // RangeError: Maximum call stack size exceeded\n\n// Глубокая рекурсия\nfunction deep(n) {\n  if (n <= 0) return;\n  deep(n - 1);\n}\n\n// deep(100000); // может вызвать переполнение\n// Обычный лимит: ~10000-50000 вызовов`
      },
      {
        title: "Call Stack и Event Loop",
        code: `console.log('1'); // в стек\n\nsetTimeout(() => {\n  console.log('2'); // макрозадача, после стека\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('3'); // микрозадача, после стека\n});\n\nconsole.log('4'); // в стек\n\n// Порядок выполнения:\n// 1. Стек: 1, 4\n// 2. Микрозадачи: 3\n// 3. Макрозадачи: 2`
      },
      {
        title: "Отладка Call Stack",
        code: `function a() {\n  console.trace('Trace from a');\n  b();\n}\n\nfunction b() {\n  console.trace('Trace from b');\n  c();\n}\n\nfunction c() {\n  console.trace('Trace from c');\n}\n\na();\n// Выводит стек вызовов:\n// Trace from c\n//   at c\n//   at b\n//   at a`
      }
    ],
    relatedTopics: ['event-loop', 'stack-heap', 'recursion'],
    nextTopicId: 'stack-heap'
  },
  {
    id: 'stack-heap',
    title: 'Stack vs Heap',
    difficulty: 'advanced',
    description: 'Stack (стек) и Heap (куча) — две области памяти в JavaScript. Stack хранит примитивы и ссылки на объекты, быстрый доступ, ограниченный размер, управляется автоматически (LIFO). Heap хранит объекты, медленнее, больший размер, управляется Garbage Collector. Примитивы копируются в Stack, объекты создаются в Heap, ссылки хранятся в Stack.',
    keyPoints: [
      'Stack: примитивы и ссылки, быстрый доступ, ограниченный размер, LIFO.',
      'Heap: объекты, медленнее, больший размер, управляется GC.',
      'Примитивы: хранятся в Stack, копируются при присваивании.',
      'Объекты: создаются в Heap, ссылки хранятся в Stack.',
      'Связано с Event Loop: Stack выполняется синхронно, Heap управляется асинхронно.',
      'Производительность: Stack быстрее, Heap требует сборки мусора.'
    ],
    tags: ['stack', 'heap', 'memory', 'runtime', 'performance'],
    examples: [
      {
        title: "Stack: примитивы",
        code: `// Примитивы хранятся в Stack\nlet a = 5; // число в Stack\nlet b = "hello"; // строка в Stack\nlet c = true; // boolean в Stack\n\n// Копирование примитивов\nlet x = 10;\nlet y = x; // копия значения в Stack\ny = 20;\nconsole.log(x); // 10 (не изменилось)\n\n// Быстрый доступ, ограниченный размер\n// Обычно ~1-2MB на поток`
      },
      {
        title: "Heap: объекты",
        code: `// Объекты создаются в Heap\nlet obj = { name: "Alice" }; // объект в Heap\n// obj (ссылка) в Stack, { name: "Alice" } в Heap\n\n// Копирование ссылок\nlet obj1 = { x: 1 };\nlet obj2 = obj1; // копия ссылки, объект тот же\nobj2.x = 2;\nconsole.log(obj1.x); // 2 (изменилось, та же ссылка)\n\n// Медленнее, но больший размер\n// Управляется Garbage Collector`
      },
      {
        title: "Связь Stack и Heap",
        code: `function createObject() {\n  // num в Stack\n  let num = 42;\n  \n  // obj в Heap, ссылка в Stack\n  let obj = { value: num };\n  \n  return obj;\n  // num удаляется из Stack\n  // obj остается в Heap (есть ссылка снаружи)\n}\n\nconst result = createObject();\n// result (ссылка) в Stack\n// { value: 42 } в Heap`
      },
      {
        title: "Stack и Event Loop",
        code: `// Синхронный код выполняется в Stack\nfunction sync() {\n  console.log('Sync'); // в Stack\n}\n\n// Асинхронный код: Stack → Microtasks → Macrotasks\nsetTimeout(() => {\n  console.log('Async'); // после Stack\n}, 0);\n\nsync(); // выполняется в Stack\n\n// Порядок:\n// 1. Stack: sync()\n// 2. Microtasks\n// 3. Macrotasks: setTimeout`
      },
      {
        title: "Производительность",
        code: `// Stack: очень быстро\nlet a = 1;\nlet b = 2;\nlet c = a + b; // мгновенно\n\n// Heap: медленнее (нужна сборка мусора)\nlet obj1 = { x: 1 };\nlet obj2 = { x: 2 };\nlet obj3 = { x: obj1.x + obj2.x }; // медленнее\n\n// GC может приостановить выполнение для очистки Heap`
      }
    ],
    relatedTopics: ['memory-management', 'call-stack', 'event-loop'],
    nextTopicId: 'blocking-non-blocking'
  },
  {
    id: 'blocking-non-blocking',
    title: 'Blocking vs Non-blocking',
    difficulty: 'advanced',
    description: 'Blocking (блокирующий) код останавливает выполнение до завершения операции. Non-blocking (неблокирующий) код не останавливает выполнение, использует колбэки/промисы. JavaScript однопоточный, но неблокирующий через Event Loop. Блокирующие операции (синхронные запросы, тяжелые вычисления) блокируют весь поток. Неблокирующие операции (async/await, промисы) не блокируют.',
    keyPoints: [
      'Blocking: код останавливает выполнение до завершения операции.',
      'Non-blocking: код не останавливает выполнение, использует колбэки/промисы.',
      'JavaScript однопоточный, но неблокирующий через Event Loop.',
      'Блокирующие операции: синхронные запросы, тяжелые вычисления, alert/confirm.',
      'Неблокирующие: async/await, промисы, setTimeout, события.',
      'Web Workers: выполняют код в отдельном потоке, не блокируют основной.'
    ],
    tags: ['blocking', 'non-blocking', 'async', 'performance', 'runtime'],
    examples: [
      {
        title: "Blocking код",
        code: `// Блокирует выполнение\nfunction blocking() {\n  console.log('Start');\n  \n  // Синхронный запрос (не существует в браузере, но пример)\n  // const data = synchronousFetch('/api'); // блокирует\n  \n  // Тяжелое вычисление\n  let sum = 0;\n  for (let i = 0; i < 1000000000; i++) {\n    sum += i; // блокирует UI\n  }\n  \n  console.log('End'); // выполнится только после цикла\n}\n\n// alert/confirm тоже блокируют\n// alert('Blocking'); // блокирует весь браузер`
      },
      {
        title: "Non-blocking код",
        code: `// Не блокирует выполнение\nfunction nonBlocking() {\n  console.log('Start');\n  \n  // Асинхронный запрос\n  fetch('/api')\n    .then(res => res.json())\n    .then(data => {\n      console.log('Data received');\n    });\n  \n  console.log('End'); // выполнится сразу\n  // "Start", "End", затем "Data received"\n}\n\n// async/await тоже неблокирующий\nasync function asyncNonBlocking() {\n  console.log('Start');\n  const data = await fetch('/api'); // не блокирует\n  console.log('End');\n}`
      },
      {
        title: "Event Loop делает код неблокирующим",
        code: `console.log('1');\n\nsetTimeout(() => {\n  console.log('2');\n}, 0);\n\nconsole.log('3');\n\n// Вывод: 1, 3, 2\n// setTimeout не блокирует, выполняется после стека\n\n// Тяжелое вычисление все еще блокирует\nfunction heavy() {\n  for (let i = 0; i < 1000000000; i++) {\n    // блокирует\n  }\n}\n\nheavy(); // блокирует UI`
      },
      {
        title: "Web Workers для неблокирующих вычислений",
        code: `// main.js\nconst worker = new Worker('worker.js');\n\n// Не блокирует основной поток\nworker.postMessage({ numbers: Array.from({length: 1000000}, (_, i) => i) });\n\nworker.onmessage = (e) => {\n  console.log('Result:', e.data);\n};\n\n// worker.js\nself.onmessage = (e) => {\n  const sum = e.data.numbers.reduce((acc, n) => acc + n, 0);\n  self.postMessage(sum);\n};`
      },
      {
        title: "Разделение блокирующего кода",
        code: `// Разбить тяжелое вычисление на части\nfunction processChunk(array, start, end, callback) {\n  let sum = 0;\n  for (let i = start; i < end; i++) {\n    sum += array[i];\n  }\n  callback(sum);\n}\n\nfunction processNonBlocking(array) {\n  const chunkSize = 1000;\n  let index = 0;\n  let total = 0;\n  \n  function processNext() {\n    const end = Math.min(index + chunkSize, array.length);\n    processChunk(array, index, end, (sum) => {\n      total += sum;\n      index = end;\n      \n      if (index < array.length) {\n        setTimeout(processNext, 0); // не блокирует\n      } else {\n        console.log('Total:', total);\n      }\n    });\n  }\n  \n  processNext();\n}`
      }
    ],
    relatedTopics: ['event-loop', 'call-stack', 'web-workers', 'async-await'],
    nextTopicId: 'concurrency-parallelism'
  },
  {
    id: 'concurrency-parallelism',
    title: 'Concurrency vs Parallelism',
    difficulty: 'advanced',
    description: 'Concurrency (параллелизм) — выполнение нескольких задач одновременно через переключение контекста (однопоточный JavaScript). Parallelism (параллельность) — выполнение задач одновременно на разных процессорах/ядрах (Web Workers, Node.js кластер). JavaScript однопоточный, но поддерживает параллелизм через Web Workers. Event Loop обеспечивает конкурентность.',
    keyPoints: [
      'Concurrency: выполнение нескольких задач через переключение контекста (однопоточный).',
      'Parallelism: выполнение задач одновременно на разных процессорах/ядрах.',
      'JavaScript однопоточный: Event Loop обеспечивает конкурентность, не параллельность.',
      'Web Workers: обеспечивают параллельность в браузере (отдельные потоки).',
      'Node.js: однопоточный Event Loop, но может использовать кластер для параллельности.',
      'Concurrency: быстрое переключение между задачами создает иллюзию параллельности.'
    ],
    tags: ['concurrency', 'parallelism', 'async', 'performance', 'runtime'],
    examples: [
      {
        title: "Concurrency в JavaScript",
        code: `// Concurrency: переключение между задачами\nconsole.log('Task 1 start');\n\nsetTimeout(() => {\n  console.log('Task 2');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('Task 3');\n});\n\nconsole.log('Task 1 end');\n\n// Вывод: Task 1 start, Task 1 end, Task 3, Task 2\n// Задачи выполняются конкурентно (переключение), не параллельно`
      },
      {
        title: "Parallelism через Web Workers",
        code: `// Parallelism: выполнение на разных потоках\n// main.js\nconst worker1 = new Worker('worker.js');\nconst worker2 = new Worker('worker.js');\n\n// Параллельное выполнение\nworker1.postMessage({ data: [1, 2, 3, 4, 5] });\nworker2.postMessage({ data: [6, 7, 8, 9, 10] });\n\nworker1.onmessage = (e) => console.log('Worker 1:', e.data);\nworker2.onmessage = (e) => console.log('Worker 2:', e.data);\n\n// worker.js\nself.onmessage = (e) => {\n  const sum = e.data.data.reduce((acc, n) => acc + n, 0);\n  self.postMessage(sum);\n};`
      },
      {
        title: "Разница Concurrency и Parallelism",
        code: `// Concurrency: одна задача в один момент, быстрое переключение\nfunction concurrent() {\n  setTimeout(() => console.log('A'), 0);\n  setTimeout(() => console.log('B'), 0);\n  setTimeout(() => console.log('C'), 0);\n  // A, B, C выполняются конкурентно (переключение)\n}\n\n// Parallelism: несколько задач одновременно\nfunction parallel() {\n  const w1 = new Worker('worker.js');\n  const w2 = new Worker('worker.js');\n  const w3 = new Worker('worker.js');\n  // w1, w2, w3 выполняются параллельно (разные потоки)\n}`
      },
      {
        title: "Event Loop обеспечивает Concurrency",
        code: `// Event Loop переключается между задачами\nconsole.log('1');\n\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nsetTimeout(() => console.log('4'), 0);\n\nconsole.log('5');\n\n// Выполнение:\n// 1. Стек: 1, 5\n// 2. Микрозадачи: 3 (concurrency)\n// 3. Макрозадачи: 2, 4 (concurrency)\n// Все конкурентно, не параллельно`
      },
      {
        title: "Когда нужен Parallelism",
        code: `// Тяжелые вычисления лучше выполнять параллельно\nfunction heavyComputation(data) {\n  // Блокирует основной поток\n  return data.reduce((acc, n) => acc + Math.sqrt(n), 0);\n}\n\n// Решение: Web Worker (parallelism)\nconst worker = new Worker('compute.js');\nworker.postMessage({ data: largeArray });\nworker.onmessage = (e) => {\n  console.log('Result:', e.data);\n  // Не блокирует основной поток\n};`
      }
    ],
    relatedTopics: ['event-loop', 'web-workers', 'blocking-non-blocking', 'call-stack'],
    nextTopicId: 'to-primitive'
  },
  {
    id: 'to-primitive',
    title: 'toString, valueOf, Symbol.toPrimitive',
    difficulty: 'advanced',
    description: 'Преобразование объектов в примитивы происходит через toString(), valueOf() и Symbol.toPrimitive. При математических операциях вызывается valueOf, при строковых — toString. Symbol.toPrimitive имеет приоритет над toString/valueOf и позволяет контролировать преобразование. Порядок вызова зависит от контекста (hint: number, string, default).',
    keyPoints: [
      'toString(): вызывается при преобразовании в строку.',
      'valueOf(): вызывается при преобразовании в число.',
      'Symbol.toPrimitive: имеет приоритет, контролирует преобразование.',
      'Порядок: Symbol.toPrimitive → valueOf → toString (зависит от hint).',
      'Hint: "number" (математика), "string" (строковые операции), "default" (==, +).',
      'Использование: кастомные объекты, перегрузка операторов.'
    ],
    tags: ['to-primitive', 'objects', 'coercion', 'symbol', 'objects-advanced'],
    examples: [
      {
        title: "toString и valueOf",
        code: `const obj = {\n  value: 42,\n  toString() {\n    return 'Object: ' + this.value;\n  },\n  valueOf() {\n    return this.value;\n  }\n};\n\nconsole.log(String(obj)); // "Object: 42" (toString)\nconsole.log(Number(obj)); // 42 (valueOf)\nconsole.log(obj + 10); // 52 (valueOf для +)\nconsole.log(obj + ''); // "Object: 42" (toString для конкатенации)`
      },
      {
        title: "Symbol.toPrimitive",
        code: `const obj = {\n  value: 42,\n  [Symbol.toPrimitive](hint) {\n    if (hint === 'number') {\n      return this.value;\n    }\n    if (hint === 'string') {\n      return \`Value: \${this.value}\`;\n    }\n    return this.value; // default\n  }\n};\n\nconsole.log(Number(obj)); // 42 (hint: 'number')\nconsole.log(String(obj)); // "Value: 42" (hint: 'string')\nconsole.log(obj + 10); // 52 (hint: 'default')\nconsole.log(obj == 42); // true (hint: 'default')`
      },
      {
        title: "Порядок вызова",
        code: `const obj = {\n  toString() {\n    console.log('toString called');\n    return 'string';\n  },\n  valueOf() {\n    console.log('valueOf called');\n    return 42;\n  }\n};\n\n// Математические операции: valueOf\nconsole.log(obj + 10); // valueOf called, 52\n\n// Строковые операции: toString\nconsole.log(String(obj)); // toString called, "string"\n\n// == использует valueOf\nconsole.log(obj == 42); // valueOf called, true`
      },
      {
        title: "Symbol.toPrimitive имеет приоритет",
        code: `const obj = {\n  [Symbol.toPrimitive]() {\n    return 100;\n  },\n  toString() {\n    return 'string';\n  },\n  valueOf() {\n    return 50;\n  }\n};\n\n// Symbol.toPrimitive вызывается первым\nconsole.log(obj + 10); // 110 (Symbol.toPrimitive)\nconsole.log(Number(obj)); // 100 (Symbol.toPrimitive)\n\n// Если Symbol.toPrimitive нет, используется valueOf/toString`
      },
      {
        title: "Практическое использование",
        code: `class Money {\n  constructor(amount, currency = 'USD') {\n    this.amount = amount;\n    this.currency = currency;\n  }\n  \n  [Symbol.toPrimitive](hint) {\n    if (hint === 'string') {\n      return \`\${this.amount} \${this.currency}\`;\n    }\n    return this.amount; // number или default\n  }\n}\n\nconst price = new Money(100, 'USD');\nconsole.log(String(price)); // "100 USD"\nconsole.log(Number(price)); // 100\nconsole.log(price + 50); // 150`
      }
    ],
    relatedTopics: ['type-coercion', 'symbol', 'objects-basic', 'object-comparison'],
  },
  // Git темы - продвинутый уровень
  {
    id: 'git-cherry-pick',
    title: 'Git: Cherry-pick',
    difficulty: 'advanced',
    description: 'git cherry-pick применяет изменения из указанного коммита в текущую ветку. Полезно для выборочного переноса коммитов между ветками. Создает новый коммит с теми же изменениями, но другим хешем. Может вызвать конфликты, которые нужно разрешить. Можно cherry-pick несколько коммитов за раз.',
    keyPoints: [
      'cherry-pick применяет изменения из коммита в текущую ветку.',
      'Создает новый коммит с теми же изменениями, но другим хешем.',
      'Полезно для выборочного переноса коммитов между ветками.',
      'Может вызвать конфликты, которые нужно разрешить.',
      'Можно cherry-pick диапазон коммитов.'
    ],
    tags: ['git', 'version-control', 'cherry-pick', 'advanced', 'tools', 'productivity'],
    examples: [
      {
        title: "Базовый cherry-pick",
        code: `# Применить коммит в текущую ветку
git cherry-pick abc123

# После применения создастся новый коммит
# с теми же изменениями, но другим хешем`
      },
      {
        title: "Cherry-pick диапазона",
        code: `# Применить несколько коммитов
git cherry-pick abc123 def456

# Применить диапазон (не включая начальный)
git cherry-pick abc123..def456

# Применить диапазон (включая начальный)
git cherry-pick abc123^..def456`
      },
      {
        title: "Cherry-pick с конфликтами",
        code: `# Если есть конфликты
git cherry-pick abc123
# CONFLICT (content): Merge conflict in file.js

# Разрешить конфликты
# Затем:
git add file.js
git cherry-pick --continue

# Или отменить
git cherry-pick --abort`
      },
      {
        title: "Cherry-pick без коммита",
        code: `# Применить изменения, но не коммитить
git cherry-pick -n abc123
# или
git cherry-pick --no-commit abc123

# Изменения в staging area
# Можно отредактировать перед коммитом`
      },
      {
        title: "Использование в workflow",
        code: `# Перенести hotfix из main в старую версию
git checkout v1.0
git cherry-pick hotfix-commit

# Перенести несколько коммитов из feature в main
git checkout main
git cherry-pick feature-commit1 feature-commit2`
      }
    ],
    relatedTopics: ['git-rebase', 'git-reflog'],
    nextTopicId: 'git-reflog'
  },
  {
    id: 'git-reflog',
    title: 'Git: Reflog',
    difficulty: 'advanced',
    description: 'reflog хранит историю всех перемещений HEAD и ссылок. Позволяет восстановить "потерянные" коммиты после reset, rebase, удаления веток. reflog локальный, не синхронизируется с удаленным репозиторием. Записи хранятся ограниченное время (по умолчанию 90 дней). Полезен для восстановления после ошибок.',
    keyPoints: [
      'reflog хранит историю всех перемещений HEAD.',
      'Позволяет восстановить "потерянные" коммиты.',
      'Локальный, не синхронизируется с удаленным репозиторием.',
      'Записи хранятся ограниченное время (90 дней по умолчанию).',
      'Полезен для восстановления после reset, rebase, удаления веток.'
    ],
    tags: ['git', 'version-control', 'reflog', 'recovery', 'advanced', 'tools', 'productivity'],
    examples: [
      {
        title: "Просмотр reflog",
        code: `# Показать все записи reflog
git reflog

# Показать последние 10 записей
git reflog -10

# Reflog для конкретной ветки
git reflog show branch-name

# Reflog для всех веток
git reflog show --all`
      },
      {
        title: "Восстановление после reset",
        code: `# Случайно сделали reset --hard
git reset --hard HEAD~3

# Найти потерянный коммит
git reflog
# abc123 HEAD@{0}: reset: moving to HEAD~3
# def456 HEAD@{1}: commit: важные изменения

# Восстановить
git reset --hard def456
# или
git reset --hard HEAD@{1}`
      },
      {
        title: "Восстановление удаленной ветки",
        code: `# Удалили ветку
git branch -D feature

# Найти последний коммит ветки
git reflog | grep feature

# Восстановить ветку
git checkout -b feature abc123
# или
git branch feature HEAD@{5}`
      },
      {
        title: "Восстановление после rebase",
        code: `# Сделали rebase, но нужно вернуться
git reflog

# Найти состояние до rebase
# abc123 HEAD@{10}: checkout: moving from main to feature
# def456 HEAD@{9}: rebase finished: returning to refs/heads/feature

# Вернуться к состоянию до rebase
git reset --hard HEAD@{10}`
      },
      {
        title: "Очистка reflog",
        code: `# Удалить старые записи (старше 90 дней)
git reflog expire --expire=now --all

# Удалить все записи reflog
git reflog expire --expire=now --all
git gc --prune=now

# Осторожно! Это удалит возможность восстановления`
      }
    ],
    relatedTopics: ['git-cherry-pick', 'git-hooks'],
    nextTopicId: 'git-hooks'
  },
  {
    id: 'git-hooks',
    title: 'Git: Hooks',
    difficulty: 'advanced',
    description: 'Hooks — скрипты, автоматически выполняемые при определенных событиях Git. Хранятся в .git/hooks/. Pre-commit выполняется перед коммитом, post-commit после. Можно использовать для проверки кода, запуска тестов, форматирования. Client-side hooks (локальные) и server-side hooks (на сервере). Можно использовать инструменты типа Husky для управления hooks.',
    keyPoints: [
      'Hooks — скрипты, выполняемые при событиях Git.',
      'Хранятся в .git/hooks/ (не коммитятся в репозиторий).',
      'Pre-commit: выполняется перед коммитом, может его отменить.',
      'Post-commit: выполняется после коммита.',
      'Можно использовать для проверки кода, тестов, форматирования.',
      'Husky упрощает управление hooks в проекте.'
    ],
    tags: ['git', 'version-control', 'hooks', 'automation', 'advanced', 'tools', 'productivity'],
    examples: [
      {
        title: "Доступные hooks",
        code: `# Pre-commit: перед коммитом
.git/hooks/pre-commit

# Post-commit: после коммита
.git/hooks/post-commit

# Pre-push: перед push
.git/hooks/pre-push

# Commit-msg: проверка сообщения коммита
.git/hooks/commit-msg

# И другие...`
      },
      {
        title: "Простой pre-commit hook",
        code: `#!/bin/sh
# .git/hooks/pre-commit

# Запустить линтер
npm run lint

# Если линтер вернул ошибку, отменить коммит
if [ $? -ne 0 ]; then
  echo "Линтер нашел ошибки. Коммит отменен."
  exit 1
fi

exit 0`
      },
      {
        title: "Pre-commit с проверкой тестов",
        code: `#!/bin/sh
# .git/hooks/pre-commit

echo "Запуск тестов..."

# Запустить тесты
npm test

if [ $? -ne 0 ]; then
  echo "Тесты не прошли. Коммит отменен."
  exit 1
fi

echo "Тесты прошли успешно!"
exit 0`
      },
      {
        title: "Commit-msg hook",
        code: `#!/bin/sh
# .git/hooks/commit-msg

# Проверить формат сообщения
commit_msg=$(cat "$1")

# Должно начинаться с типа: feat, fix, docs, etc.
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore): "; then
  echo "Ошибка: сообщение должно начинаться с типа (feat, fix, docs, etc.)"
  exit 1
fi

exit 0`
      },
      {
        title: "Использование Husky",
        code: `# Установить Husky
npm install --save-dev husky

# Инициализировать
npx husky install

# Добавить pre-commit hook
npx husky add .husky/pre-commit "npm test"

# Добавить commit-msg hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

# Hooks хранятся в .husky/ и коммитятся в репозиторий`
      }
    ],
    relatedTopics: ['git-reflog', 'git-submodules'],
    nextTopicId: 'git-submodules'
  },
  {
    id: 'git-submodules',
    title: 'Git: Submodules',
    difficulty: 'advanced',
    description: 'Submodules позволяют включать один Git репозиторий как поддиректорию другого. Полезно для зависимостей, библиотек, общих компонентов. git submodule add добавляет submodule. git submodule update обновляет submodules. Работа с вложенными репозиториями требует осторожности. Можно использовать вместо этого monorepo или пакетные менеджеры.',
    keyPoints: [
      'Submodules позволяют включать один репозиторий в другой.',
      'Полезно для зависимостей, библиотек, общих компонентов.',
      'git submodule add добавляет submodule.',
      'git submodule update обновляет submodules.',
      'Работа с вложенными репозиториями требует осторожности.',
      'Альтернативы: monorepo, пакетные менеджеры.'
    ],
    tags: ['git', 'version-control', 'submodules', 'dependencies', 'advanced', 'tools', 'productivity'],
    examples: [
      {
        title: "Добавление submodule",
        code: `# Добавить submodule
git submodule add https://github.com/user/library.git libs/library

# Это создаст:
# - .gitmodules файл с конфигурацией
# - libs/library директорию с репозиторием`
      },
      {
        title: "Клонирование с submodules",
        code: `# Клонировать репозиторий с submodules
git clone --recursive https://github.com/user/project.git

# Или после клонирования
git clone https://github.com/user/project.git
cd project
git submodule init
git submodule update

# Или одной командой
git submodule update --init --recursive`
      },
      {
        title: "Обновление submodules",
        code: `# Обновить все submodules до последней версии
git submodule update --remote

# Обновить конкретный submodule
git submodule update --remote libs/library

# Обновить и закоммитить изменения
git submodule update --remote
git add .gitmodules libs/library
git commit -m "Обновить submodule"`
      },
      {
        title: "Работа с submodule",
        code: `# Перейти в submodule
cd libs/library

# Работать как с обычным репозиторием
git checkout -b feature
# ... изменения ...
git commit -m "Изменения в submodule"
git push origin feature

# Вернуться в основной репозиторий
cd ../..
git add libs/library
git commit -m "Обновить ссылку на submodule"`
      },
      {
        title: "Удаление submodule",
        code: `# 1. Удалить из .gitmodules
git rm --cached libs/library

# 2. Удалить из .git/config
git config -f .git/config --remove-section submodule.libs/library

# 3. Удалить директорию
rm -rf .git/modules/libs/library
rm -rf libs/library

# 4. Закоммитить
git commit -m "Удалить submodule"`
      }
    ],
    relatedTopics: ['git-hooks', 'git-workflow'],
    nextTopicId: 'git-workflow'
  },
  {
    id: 'git-workflow',
    title: 'Git: Workflow в команде',
    difficulty: 'advanced',
    description: 'Популярные workflow: Git Flow (main, develop, feature, release, hotfix ветки), GitHub Flow (простой, main + feature ветки), GitLab Flow (с environment ветками). Code review через Pull Requests. Защита веток, правила слияния. Соглашения о коммитах (Conventional Commits). Работа с большими командами требует четких правил.',
    keyPoints: [
      'Git Flow: сложный workflow с develop, feature, release, hotfix ветками.',
      'GitHub Flow: простой workflow с main и feature ветками.',
      'GitLab Flow: с environment ветками (staging, production).',
      'Code review через Pull Requests обязателен.',
      'Защита веток предотвращает прямые коммиты в main.',
      'Соглашения о коммитах улучшают читаемость истории.'
    ],
    tags: ['git', 'version-control', 'workflow', 'team', 'collaboration', 'advanced', 'tools', 'productivity'],
    examples: [
      {
        title: "Git Flow",
        code: `# Основные ветки
main        # Production код
develop     # Development код

# Вспомогательные ветки
feature/*   # Новая функциональность
release/*   # Подготовка к релизу
hotfix/*    # Срочные исправления

# Workflow:
# 1. feature/xxx -> develop
# 2. develop -> release/1.0
# 3. release/1.0 -> main + develop
# 4. hotfix/xxx -> main + develop`
      },
      {
        title: "GitHub Flow",
        code: `# Простой workflow
main        # Production код

# Workflow:
# 1. Создать feature ветку от main
git checkout -b feature/login

# 2. Работать, коммитить
git commit -m "Добавить форму входа"

# 3. Push и создать Pull Request
git push origin feature/login

# 4. Code review, merge в main
# 5. Удалить feature ветку`
      },
      {
        title: "Conventional Commits",
        code: `# Формат: <type>(<scope>): <subject>

# Типы:
feat: новая функциональность
fix: исправление бага
docs: изменения в документации
style: форматирование (не влияет на код)
refactor: рефакторинг
test: добавление тестов
chore: обновление зависимостей, конфигов

# Примеры:
git commit -m "feat(auth): добавить OAuth2"
git commit -m "fix(api): исправить обработку ошибок"
git commit -m "docs: обновить README"`
      },
      {
        title: "Защита веток",
        code: `# На GitHub/GitLab можно настроить:
# - Требовать Pull Request для merge
# - Требовать code review (минимум N одобрений)
# - Требовать прохождение CI/CD
# - Запретить force push
# - Запретить удаление ветки

# Это предотвращает случайные изменения в main`
      },
      {
        title: "Code Review Best Practices",
        code: `# Pull Request должен:
# - Иметь понятное описание
# - Включать скриншоты (для UI)
# - Проходить все тесты
# - Не иметь конфликтов
# - Следовать стилю кода проекта

# Reviewer должен проверить:
# - Логику изменений
# - Качество кода
# - Тесты
# - Документацию`
      }
    ],
    relatedTopics: ['git-submodules', 'git-remote-advanced'],
    nextTopicId: null
  }
];

