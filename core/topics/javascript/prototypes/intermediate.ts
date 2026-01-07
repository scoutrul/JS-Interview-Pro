import { Topic } from '../../../types';

export const JS_PROTOTYPES_INTERMEDIATE_TOPICS: Topic[] = [
{
    id: 'prototype-chain',
    title: 'Прототипы',
    difficulty: 'intermediate',
    description: 'Прототип (prototype) — конкретный объект, на который ссылается [[Prototype]] другого объекта. Например, Array.prototype — это прототип для всех массивов. Цепочка прототипов (prototype chain) — последовательность прототипов, по которой движок JavaScript ищет свойства: начинается с самого объекта, затем переходит к его [[Prototype]], затем к [[Prototype]] прототипа, и так далее до Object.prototype (у которого [[Prototype]] === null). Каждый объект имеет скрытую ссылку [[Prototype]] (доступно через Object.getPrototypeOf(obj)).',
    keyPoints: [
      'Прототип — это один конкретный объект (например, Array.prototype).',
      'Цепочка прототипов — это последовательность прототипов для поиска свойств.',
      'Метод или свойство ищется по цепочке прототипов: объект → его прототип → прототип прототипа → ... → Object.prototype → null.',
      'Все массивы, объекты и функции наследуются от своих прототипов (Array.prototype, Object.prototype, Function.prototype).',
      'Классы — это просто удобный синтаксис для работы с прототипами.',
      'Object.getPrototypeOf(obj) — современный способ получить прототип.',
      'Object.prototype — вершина цепочки, у которого [[Prototype]] === null.'
    ],
    funFact: 'Прототипное наследование — уникальная особенность JavaScript. В отличие от классического наследования, объекты унаследуют напрямую от других объектов, что делает систему гибкой и динамичной.',
    tags: ['prototype', 'inheritance', 'oop', 'object-create', 'constructors'],
    examples: [
      {
        title: "Прототип vs Цепочка прототипов",
        code: `const arr = [1, 2, 3];

// ПРОТОТИП — это один объект
const prototype = Object.getPrototypeOf(arr);
console.log(prototype === Array.prototype); // true
// Array.prototype — это конкретный объект-прототип

// ЦЕПОЧКА ПРОТОТИПОВ — это последовательность для поиска
// arr → Array.prototype → Object.prototype → null
// Это путь, по которому движок ищет свойства

// Поиск toString по цепочке:
// 1. Ищет в arr — нет
// 2. Ищет в Array.prototype (прототип arr) — нет
// 3. Ищет в Object.prototype (прототип Array.prototype) — есть! ✅
arr.toString(); // "1,2,3"

// Проверка цепочки:
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null`
      },
      {
        title: "Пример цепочки прототипов",
        code: `const arr = [1, 2, 3];

// Где метод fill?
console.log(arr.fill); // function fill() {...}

// Проверка прототипов:
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null

// Объяснение:
// arr — объект, созданный через Array
// Метод fill берётся из Array.prototype
// Если свойства нет в Array.prototype, ищем дальше в Object.prototype
// Конец цепочки — null`
      },
      {
        title: "Связь с классами",
        code: `class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(\`Hello, \${this.name}\`);
  }
}

const p = new Person('Alice');
p.greet(); // Hello, Alice
console.log(Object.getPrototypeOf(p) === Person.prototype); // true

// Методы класса (greet) на самом деле лежат в Person.prototype`
      },
      {
        title: "Object.create() для наследования",
        code: `const parent = { hello: () => console.log('Hello') };
const child = Object.create(parent);
child.hello(); // Hello

// child не имеет свойства hello, но берёт его из parent через прототип
console.log(Object.getPrototypeOf(child) === parent); // true`
      },
      {
        title: "Поиск по цепочке",
        code: `const grandparent = { a: 1 };
const parent = { b: 2 };
parent.__proto__ = grandparent;
const child = { c: 3 };
child.__proto__ = parent;

console.log(child.a); // 1 (из grandparent)
console.log(child.b); // 2 (из parent)
console.log(child.c); // 3 (свое)`
      }
    ],
    relatedTopics: ['this-basics'],
  },
{
    id: 'constructors',
    title: 'Функции-конструкторы',
    difficulty: 'intermediate',
    description: 'Функция-конструктор вызывается с new и создает объект. При вызове с new: создается пустой объект, this ссылается на него, выполняется функция, возвращается объект.',
    keyPoints: [
      'new Constructor(): создает объект, this = новый объект.',
      'Если нет return, возвращается this (новый объект).',
      'constructor property: ссылается на функцию-конструктор.',
      'Constructor.prototype: общий прототип для всех экземпляров.',
      'Методы в prototype доступны всем экземплярам.'
    ],
    funFact: 'Функции-конструкторы были основным способом создания объектов до появления классов в ES6. Классы в JavaScript — это синтаксический сахар над функциями-конструкторами и прототипами.',
    tags: ['constructors', 'new', 'prototype', 'oop', 'prototype-chain', 'this-basics'],
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
  },
{
    id: 'object-create',
    title: 'Object.create()',
    difficulty: 'intermediate',
    description: 'Object.create(proto) создает объект с указанным прототипом. Более явный способ создания объектов с прототипом чем __proto__. Второй параметр - дескрипторы свойств.',
    keyPoints: [
      'Object.create(proto): создает объект с прототипом proto.',
      'Object.create(null): создает объект без прототипа (чистый словарь).',
      'Второй параметр: дескрипторы свойств {prop: {value, writable, enumerable}}.',
      'Более явный способ чем __proto__ или new Constructor().',
      'Используется для прототипного наследования без конструкторов.'
    ],
    funFact: 'Object.create() был добавлен в ES5 и стал предпочтительным способом создания объектов с прототипом. Object.create(null) создает "чистый" объект без прототипа, что полезно для словарей.',
    tags: ['object.create', 'prototype', 'inheritance', 'oop', 'prototype-chain', 'constructors'],
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
  },
{
    id: 'hasownproperty-in',
    title: 'hasOwnProperty vs in',
    difficulty: 'intermediate',
    description: 'hasOwnProperty(prop) проверяет собственное свойство объекта (не из прототипа). prop in obj проверяет наличие свойства в объекте или прототипе. Object.hasOwn() — современная безопасная альтернатива.',
    keyPoints: [
      'obj.hasOwnProperty(prop): true только для собственных свойств.',
      'prop in obj: true если свойство есть в объекте или прототипе.',
      'Object.hasOwn(obj, prop): современная безопасная альтернатива.',
      'for...in перебирает и собственные, и унаследованные свойства.',
      'Object.keys() возвращает только собственные свойства.'
    ],
    funFact: 'hasOwnProperty может быть переопределен или объект может не иметь этого метода (Object.create(null)). Object.hasOwn() был добавлен в ES2022 как безопасная альтернатива, которая работает даже с такими объектами.',
    tags: ['hasownproperty', 'in', 'properties', 'prototype', 'oop', 'object-methods', 'prototype-chain'],
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
  },
{
    id: 'instanceof',
    title: 'instanceof',
    difficulty: 'intermediate',
    description: 'obj instanceof Constructor проверяет, есть ли Constructor.prototype в цепочке прототипов obj. Проверяет всю цепочку, не только прямой прототип.',
    keyPoints: [
      'obj instanceof Constructor: проверяет цепочку прототипов.',
      'Проверяет: есть ли Constructor.prototype в [[Prototype]] цепочке.',
      'Работает с классами и функциями-конструкторами.',
      'Symbol.hasInstance: кастомная логика проверки.',
      'Можно обмануть, изменив Constructor.prototype.'
    ],
    funFact: 'instanceof проверяет всю цепочку прототипов, поэтому [] instanceof Object возвращает true. Это может быть неожиданным, но логично, так как массивы наследуют от Object через Array.prototype.',
    tags: ['instanceof', 'prototype', 'inheritance', 'oop', 'prototype-chain', 'constructors'],
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
  }
];
