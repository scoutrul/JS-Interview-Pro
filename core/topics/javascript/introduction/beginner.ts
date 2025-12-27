import { Topic } from '../../../types';

export const JS_INTRODUCTION_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'what-is-javascript',
    title: 'Что такое JavaScript',
    difficulty: 'beginner',
    description: 'JavaScript — высокоуровневый, интерпретируемый язык программирования для создания интерактивных веб-страниц. Многофункциональный и встраиваемый: работает в браузерах (DOM, BOM), на сервере (Node.js), в мобильных приложениях. Однопоточный язык с динамической и слабой типизацией. Имеет встроенные типы данных, объекты, методы и обширную стандартную библиотеку для работы с данными, асинхронностью и API.',
    keyPoints: [
      'Высокоуровневый язык: абстракция от железа, автоматическое управление памятью.',
      'Многофункциональный: веб-разработка, серверная разработка, мобильные приложения.',
      'Встраиваемый: работает в браузерах, Node.js, различных средах выполнения.',
      'Однопоточный: один поток выполнения, асинхронность через Event Loop.',
      'Динамически и слабо типизированный: типы определяются во время выполнения, автоматическое преобразование.',
      'Встроенные возможности: типы данных, объекты, методы, стандартная библиотека.'
    ],
    tags: ['javascript', 'basics', 'introduction', 'language', 'runtime', 'single-threaded', 'dynamic-typing'],
    examples: [
      {
        title: "JavaScript в браузере",
        code: `// Интерактивность на веб-странице
document.getElementById('button').addEventListener('click', () => {
  alert('Hello from JavaScript!');
});`
      },
      {
        title: "JavaScript в Node.js",
        code: `// Серверная разработка
const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log(data);
});`
      },
      {
        title: "Встроенные возможности",
        code: `// Типы данных
const num = 42;
const str = "Hello";
const arr = [1, 2, 3];

// Встроенные методы
arr.map(x => x * 2); // [2, 4, 6]
str.toUpperCase(); // "HELLO"
Math.max(1, 2, 3); // 3`
      }
    ],
    relatedTopics: ['high-level-language', 'runtime-environments', 'typing-system', 'execution-threading']
  },
  {
    id: 'high-level-language',
    title: 'Высокоуровневость языка',
    difficulty: 'beginner',
    description: 'JavaScript — высокоуровневый язык, который абстрагирует программиста от деталей работы с памятью и железом. Предоставляет готовые функции, методы и стандартную библиотеку для типичных задач. Автоматически управляет памятью через сборщик мусора, освобождая разработчика от ручного управления ресурсами.',
    keyPoints: [
      'Абстракция от железа: не нужно управлять памятью, указателями, регистрами.',
      'Готовые функции: встроенные методы массивов, строк, объектов, Math, Date.',
      'Стандартная библиотека: обширный набор API для работы с данными, сетью, файлами.',
      'Автоматическое управление памятью: сборщик мусора освобождает неиспользуемую память.',
      'Интерпретация: код выполняется напрямую без компиляции в машинный код.'
    ],
    tags: ['high-level', 'abstraction', 'memory-management', 'standard-library', 'garbage-collection'],
    examples: [
      {
        title: "Абстракция от железа",
        code: `// Не нужно управлять памятью вручную
const arr = [1, 2, 3];
arr.push(4); // Память выделяется автоматически

// В низкоуровневых языках нужно было бы:
// - Выделить память
// - Проверить переполнение
// - Освободить память`
      },
      {
        title: "Готовые функции и методы",
        code: `// Встроенные методы массивов
[1, 2, 3].map(x => x * 2); // [2, 4, 6]
[1, 2, 3].filter(x => x > 1); // [2, 3]
[1, 2, 3].reduce((a, b) => a + b); // 6

// Встроенные методы строк
"hello".toUpperCase(); // "HELLO"
"hello".includes("ell"); // true

// Стандартная библиотека
Math.max(1, 2, 3); // 3
JSON.parse('{"x": 1}'); // { x: 1 }`
      },
      {
        title: "Автоматическое управление памятью",
        code: `function createData() {
  const largeArray = new Array(1000000).fill(0);
  return largeArray;
}

const data = createData();
// После выхода из функции память может быть освобождена GC
// Не нужно вызывать free() или delete[]`
      }
    ],
    relatedTopics: ['what-is-javascript', 'garbage-collection', 'memory-management']
  },
  {
    id: 'typing-system',
    title: 'Типизация',
    difficulty: 'beginner',
    description: 'JavaScript имеет слабую и динамическую типизацию. Типы определяются во время выполнения, переменные могут менять тип. Примитивы (string, number, boolean, null, undefined, symbol, bigint) передаются по значению, объекты — по ссылке. null имеет тип "object" (исторический баг). Особенности: автоматическое преобразование типов, truthy/falsy значения.',
    keyPoints: [
      'Слабая типизация: автоматическое преобразование типов при операциях.',
      'Динамическая типизация: тип определяется во время выполнения, переменные могут менять тип.',
      'Примитивы: передаются по значению, иммутабельны (string, number, boolean, null, undefined, symbol, bigint).',
      'Объекты: передаются по ссылке, мутабельны (Object, Array, Function, Date и др.).',
      'Особенности: null имеет тип "object", typeof может возвращать неожиданные значения.',
      'Преобразование: явное (Number(), String()) и неявное ("5" + 3 = "53").'
    ],
    tags: ['typing', 'dynamic-typing', 'weak-typing', 'primitives', 'objects', 'type-coercion'],
    examples: [
      {
        title: "Динамическая типизация",
        code: `let value = 42; // number
value = "hello"; // string (тип изменился)
value = true; // boolean (тип изменился)
value = {}; // object (тип изменился)

// В статически типизированных языках это невозможно`
      },
      {
        title: "Слабая типизация - автоматическое преобразование",
        code: `"5" + 3; // "53" (конкатенация)
"5" - 3; // 2 (преобразование в число)
"5" * "2"; // 10
!0; // true (преобразование в boolean)

// В строго типизированных языках это вызвало бы ошибку`
      },
      {
        title: "Примитивы vs объекты",
        code: `// Примитивы - по значению
let a = 5;
let b = a;
b = 10;
console.log(a); // 5 (не изменилось)

// Объекты - по ссылке
let obj1 = { x: 1 };
let obj2 = obj1;
obj2.x = 2;
console.log(obj1.x); // 2 (изменилось!)`
      },
      {
        title: "Особенности typeof",
        code: `typeof 42; // "number"
typeof "hello"; // "string"
typeof null; // "object" (баг языка!)
typeof undefined; // "undefined"
typeof []; // "object"
typeof {}; // "object"
typeof function() {}; // "function"`
      }
    ],
    relatedTopics: ['data-types', 'type-coercion', 'comparison', 'objects-basic', 'data-types-overview']
  },
  {
    id: 'runtime-environments',
    title: 'Окружение выполнения',
    difficulty: 'beginner',
    description: 'JavaScript выполняется в разных окружениях, каждое предоставляет свои API и глобальные объекты. Браузерное окружение: DOM (Document Object Model — объектная модель документа для работы с HTML), BOM (Browser Object Model — объектная модель браузера: window, navigator, location), события. Node.js: global, fs (файловая система), process, модули. Окружение влияет на глобальный объект (window vs global) и доступные API, а также на поведение ключевого слова this.',
    keyPoints: [
      'Браузерное: DOM (Document Object Model — document, работа с HTML-элементами), BOM (Browser Object Model — window, navigator, location), события, fetch API.',
      'Node.js: global, fs (файлы), process, модули (require), Buffer, __dirname, __filename.',
      'Глобальный объект: window (браузер) vs global (Node.js) vs globalThis (универсальный).',
      'Влияние на this: в браузере this в глобальном контексте = window, в Node.js = global.',
      'API различаются: браузер имеет DOM/BOM, Node.js имеет файловую систему и процессы.'
    ],
    tags: ['runtime', 'browser', 'nodejs', 'dom', 'bom', 'global', 'environment'],
    examples: [
      {
        title: "Браузерное окружение",
        code: `// DOM API
document.getElementById('button');
document.querySelector('.class');

// BOM API
window.location.href;
window.navigator.userAgent;
window.localStorage.setItem('key', 'value');

// События
button.addEventListener('click', handler);

// Fetch API
fetch('/api/data').then(r => r.json());`
      },
      {
        title: "Node.js окружение",
        code: `// Файловая система
const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log(data);
});

// Process
process.env.NODE_ENV;
process.argv;

// Модули
const module = require('./module.js');
module.exports = {};

// Buffer
const buf = Buffer.from('hello');`
      },
      {
        title: "Глобальный объект",
        code: `// Браузер
console.log(this === window); // true (в глобальном контексте)

// Node.js
console.log(this === global); // true (в глобальном контексте)

// Универсальный способ
console.log(globalThis); // window или global`
      },
      {
        title: "Различия в this",
        code: `// Браузер
function test() {
  console.log(this); // window (не strict mode)
}

// Node.js
function test() {
  console.log(this); // global (не strict mode)
}

// В strict mode везде undefined
"use strict";
function test() {
  console.log(this); // undefined
}`
      }
    ],
    relatedTopics: ['what-is-javascript', 'this-basics', 'dom-api', 'modules']
  },
  {
    id: 'strict-mode',
    title: 'Строгий и нестрогий режимы',
    difficulty: 'beginner',
    description: "'use strict' включает строгий режим, который делает код более безопасным и предсказуемым. Запрещает неявное создание глобальных переменных, дублирование параметров, использование зарезервированных слов. this в функциях становится undefined вместо window. Современные фреймворки и инструменты используют строгий режим по умолчанию.",
    keyPoints: [
      "'use strict': включается в начале файла или функции.",
      'Запрещает неявные глобальные переменные (без var/let/const).',
      'Запрещает дублирование параметров функции.',
      'this в функциях = undefined (не window).',
      'Современные фреймворки используют строгий режим по умолчанию.',
      'Улучшает производительность и помогает находить ошибки.'
    ],
    tags: ['strict-mode', 'best-practices', 'errors', 'performance', 'this'],
    examples: [
      {
        title: "Включение strict mode",
        code: `"use strict";

// Файл целиком в strict mode
function test() {
  "use strict";
  // Только функция в strict mode
}`
      },
      {
        title: "Запрет неявных глобальных",
        code: `"use strict";

// Ошибка: переменная не объявлена
x = 10; // ReferenceError

// В обычном режиме создалась бы глобальная переменная
// В strict mode - ошибка`
      },
      {
        title: "this в strict mode",
        code: `"use strict";

function test() {
  console.log(this); // undefined
}

test();

// В обычном режиме this = window (в браузере)
// В strict mode this = undefined`
      },
      {
        title: "Современные инструменты",
        code: `// ES6 модули автоматически в strict mode
export const x = 1;

// Webpack, Babel, TypeScript используют strict mode
// Классы автоматически в strict mode
class MyClass {
  constructor() {
    // this = undefined в обычных функциях
  }
}`
      }
    ],
    relatedTopics: ['var-let-const', 'this-basics', 'functions-types', 'modules']
  },
  {
    id: 'variables-basic',
    title: 'Переменные',
    difficulty: 'beginner',
    description: 'var имеет функциональную область видимости и всплывает с undefined. let и const имеют блочную область видимости и не всплывают. const запрещает переприсваивание ссылки, но не делает объект неизменяемым. Scope: глобальная (вне функций), функциональная (var), блочная (let/const).',
    keyPoints: [
      'var: функциональная область видимости, допускает повторное объявление, всплывает (hoisting).',
      'let/const: блочная область видимости, не допускают повторного объявления.',
      'const требует инициализации и запрещает переопределение ссылки.',
      'Scope: глобальная (вне функций), функциональная (var), блочная (let/const).',
      'const не запрещает изменение объектов: можно изменять свойства, но не переприсваивать ссылку.'
    ],
    tags: ['variables', 'scope', 'let', 'const', 'var', 'ES6'],
    examples: [
      {
        title: "Разница областей видимости",
        code: `if (true) {
  var x = 5; // функциональная область
  let y = 10; // блочная область
}
console.log(x); // 5
// console.log(y); // ReferenceError`
      },
      {
        title: "Повторное объявление",
        code: `var a = 1;
var a = 2; // OK

let b = 1;
// let b = 2; // SyntaxError

const c = 1;
// c = 2; // TypeError`
      },
      {
        title: "const и объекты",
        code: `const obj = { x: 1 };
obj.x = 2; // OK (изменение свойства)
obj.y = 3; // OK (добавление свойства)
// obj = {}; // TypeError (переприсваивание)`
      },
      {
        title: "Типы scope",
        code: `// Глобальная область
const global = "global";

function test() {
  // Функциональная область (var)
  var funcVar = "func";
  
  if (true) {
    // Блочная область (let/const)
    let blockVar = "block";
    const blockConst = "block";
  }
}`
      }
    ],
    relatedTopics: ['hoisting-basic', 'tdz-basic', 'scope-chain', 'strict-mode']
  },
  {
    id: 'data-types-overview',
    title: 'Типы данных и объекты',
    difficulty: 'beginner',
    description: 'JavaScript имеет 8 типов: 7 примитивов (string, number, boolean, null, undefined, symbol, bigint) и объекты. Примитивы иммутабельны и передаются по значению. Объекты мутабельны и передаются по ссылке. Встроенные объекты: Object, Array, Function, Date, RegExp, Map/WeakMap, Set/WeakSet, Error, Promise, TypedArray/ArrayBuffer. Все кроме примитивов — объекты, включая массивы и функции.',
    keyPoints: [
      'Примитивы: string, number, boolean, null, undefined, symbol, bigint (7 типов).',
      'Объекты: все остальное (Object, Array, Function, Date, RegExp и др.).',
      'Встроенные объекты: Object, Array, Function, Date, RegExp, Map, Set, WeakMap, WeakSet, Error, Promise, TypedArray, ArrayBuffer.',
      'Примитивы: иммутабельны, передаются по значению, копируются при присваивании.',
      'Объекты: мутабельны, передаются по ссылке, изменения влияют на оригинал.',
      'Массивы и функции: это объекты, могут иметь свойства и методы.',
      'null имеет тип "object" — историческая особенность языка.'
    ],
    tags: ['types', 'primitives', 'objects', 'data-types', 'collections', 'built-in-objects'],
    examples: [
      {
        title: "Примитивные типы",
        code: `typeof "hello"; // "string"
typeof 42; // "number"
typeof true; // "boolean"
typeof null; // "object" (баг!)
typeof undefined; // "undefined"
typeof Symbol('id'); // "symbol"
typeof 123n; // "bigint"`
      },
      {
        title: "Встроенные объекты",
        code: `// Object
const obj = { name: "Alice" };

// Array
const arr = [1, 2, 3];

// Function
function fn() {}

// Date
const date = new Date();

// RegExp
const regex = /pattern/;

// Map и Set
const map = new Map();
const set = new Set();

// Promise
const promise = Promise.resolve();

// Error
const error = new Error('message');`
      },
      {
        title: "Массивы и функции - это объекты",
        code: `const arr = [1, 2, 3];
arr.prop = "test";
console.log(arr.prop); // "test"

function fn() {}
fn.prop = "test";
console.log(fn.prop); // "test"

// Можно использовать методы объектов
Object.keys(arr); // ["0", "1", "2", "prop"]`
      },
      {
        title: "Примитивы vs объекты - поведение",
        code: `// Примитивы - по значению
let a = 5;
let b = a;
b = 10;
console.log(a); // 5

// Объекты - по ссылке
let obj1 = { x: 1 };
let obj2 = obj1;
obj2.x = 2;
console.log(obj1.x); // 2`
      }
    ],
    relatedTopics: ['data-types', 'objects-basic', 'arrays-basic', 'map-set', 'weakmap-weakset', 'typing-system']
  }
];
