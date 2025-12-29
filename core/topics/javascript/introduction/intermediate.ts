import { Topic } from '../../../types';

export const JS_INTRODUCTION_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'garbage-collection',
    title: 'Сборщик мусора и управление памятью',
    difficulty: 'intermediate',
    description: 'JavaScript автоматически выделяет и освобождает память через сборщик мусора (Garbage Collector). Память делится на Stack (примитивы, ссылки) и Heap (объекты). Объекты удаляются когда на них нет ссылок. Утечки памяти возникают при сохранении ссылок на неиспользуемые объекты, особенно в замыканиях, глобальных переменных и забытых слушателях событий.',
    keyPoints: [
      'Автоматическое выделение: память выделяется при создании переменных и объектов.',
      'Автоматическое освобождение: GC удаляет объекты без активных ссылок.',
      'Stack: хранит примитивы и ссылки, быстрый доступ, ограниченный размер.',
      'Heap: хранит объекты, управляется GC, больший размер.',
      'Утечки памяти: глобальные переменные, большие замыкания, забытые таймеры и слушатели.',
      'Влияние замыканий: замыкания удерживают ссылки на внешние переменные.',
      'Связь с объектами: объекты удаляются только когда нет ссылок на них.'
    ],
    tags: ['memory', 'garbage-collection', 'heap', 'stack', 'memory-leaks', 'performance'],
    examples: [
      {
        title: "Автоматическое выделение памяти",
        code: `// Память выделяется автоматически
const obj = { name: "Alice" };
const arr = [1, 2, 3];
const str = "Hello";

// Не нужно вызывать malloc() или new[]`
      },
      {
        title: "Освобождение при отсутствии ссылок",
        code: `function createObject() {
  const obj = { data: "large data" };
  return obj;
}

const reference = createObject();
// Пока есть ссылка, объект не удаляется

reference = null;
// Теперь объект может быть удален GC`
      },
      {
        title: "Утечки памяти через замыкания",
        code: `// Плохо: большие данные в замыкании
function createHandler() {
  const largeData = new Array(1000000).fill(0);
  return function() {
    // largeData удерживается в памяти даже если не используется
    console.log('handler');
  };
}

// Хорошо: не хранить большие данные в замыкании
function createHandler() {
  return function() {
    console.log('handler');
  };
}`
      },
      {
        title: "Утечки через глобальные переменные",
        code: `// Плохо: глобальная переменная никогда не удаляется
window.hugeData = new Array(10000000).fill(0);

// Хорошо: локальная переменная может быть удалена
function processData() {
  const data = new Array(1000000).fill(0);
  // После выхода из функции может быть удалена
}`
      },
      {
        title: "Утечки через забытые слушатели",
        code: `// Плохо: слушатель не удаляется
button.addEventListener('click', handler);
// Если элемент удаляется, handler все еще ссылается на него

// Хорошо: удалять слушатели
button.removeEventListener('click', handler);

// Или использовать AbortController
const controller = new AbortController();
button.addEventListener('click', handler, { signal: controller.signal });
controller.abort(); // удаляет все слушатели`
      }
    ],
    relatedTopics: ['high-level-language', 'memory-management', 'closures-basic', 'weakmap-weakset']
  },
  {
    id: 'multiparadigm',
    title: 'Мультипарадигменность',
    difficulty: 'intermediate',
    description: 'JavaScript поддерживает несколько парадигм программирования одновременно. Императивное программирование: последовательность команд, циклы, условия. Функциональное: чистые функции, высшие функции (map, filter, reduce), неизменяемость. Объектно-ориентированное: классы, прототипы, наследование. Событийно-ориентированное: обработка событий, асинхронные колбэки.',
    keyPoints: [
      'Императивное: последовательность команд, циклы (for, while), условия (if/else).',
      'Функциональное: чистые функции, высшие функции (map, filter, reduce), композиция.',
      'Объектно-ориентированное: классы, прототипы, наследование, инкапсуляция.',
      'Событийно-ориентированное: обработка событий, асинхронные колбэки, Event Loop.',
      'Гибкость: можно комбинировать парадигмы в одном проекте.'
    ],
    tags: ['paradigms', 'imperative', 'functional', 'oop', 'event-driven', 'programming-styles'],
    examples: [
      {
        title: "Императивный стиль",
        code: `// Последовательность команд
const numbers = [1, 2, 3, 4, 5];
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}
// doubled = [2, 4, 6, 8, 10]`
      },
      {
        title: "Функциональный стиль",
        code: `// Чистые функции, высшие функции
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
const evens = numbers.filter(x => x % 2 === 0);
const sum = numbers.reduce((a, b) => a + b, 0);

// Чистая функция
function add(a, b) {
  return a + b; // Нет побочных эффектов
}`
      },
      {
        title: "Объектно-ориентированный стиль",
        code: `// Классы и наследование
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return \`\${this.name} makes a sound\`;
  }
}

class Dog extends Animal {
  speak() {
    return \`\${this.name} barks\`;
  }
}

const dog = new Dog('Rex');
dog.speak(); // "Rex barks"

// В примере показаны принципы ООП:
// - Инкапсуляция: данные (name) и методы (speak) объединены в класс
// - Наследование: класс Dog наследует Animal
// - Полиморфизм: метод speak переопределен в дочернем классе
// - Абстракция: базовый класс описывает общую модель поведения`
      },
      {
        title: "Событийно-ориентированный стиль",
        code: `// Обработка событий
button.addEventListener('click', () => {
  console.log('Button clicked');
});

// Асинхронные колбэки
setTimeout(() => {
  console.log('Delayed execution');
}, 1000);

fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));`
      }
    ],
    relatedTopics: ['higher-order-functions', 'classes', 'prototype-chain', 'promises', 'event-loop']
  },
  {
    id: 'execution-threading',
    title: 'Поточность выполнения',
    difficulty: 'intermediate',
    description: 'JavaScript — однопоточный язык: выполняется один поток кода в один момент времени. Event Loop управляет асинхронностью, обрабатывая очереди задач (микрозадачи и макрозадачи). Асинхронные операции (сетевые запросы, таймеры) выполняются неблокирующе, делегируясь браузеру или Node.js, а результаты обрабатываются через колбэки, промисы или async/await.',
    keyPoints: [
      'Однопоточный: один поток выполнения, нет параллелизма на уровне языка.',
      'Event Loop: управляет очередями задач, обрабатывает асинхронность.',
      'Очереди задач: микрозадачи (Promises) и макрозадачи (setTimeout, события).',
      'Асинхронность: неблокирующий код, операции делегируются браузеру/Node.js.',
      'Callback: функции обратного вызова для асинхронных операций.',
      'Promise: объект для работы с асинхронными операциями.',
      'async/await: синтаксический сахар для работы с промисами.',
      'Web Workers: параллельное выполнение в отдельных потоках (только в браузере).'
    ],
    tags: ['threading', 'single-threaded', 'event-loop', 'async', 'concurrency', 'non-blocking', 'callbacks', 'promises'],
    examples: [
      {
        title: "Однопоточное выполнение",
        code: `console.log(1);
console.log(2);
console.log(3);
// Всегда выполняется последовательно: 1, 2, 3

// Нельзя прервать выполнение из другого потока
// (как в многопоточных языках)`
      },
      {
        title: "Неблокирующая асинхронность",
        code: `console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

fetch('/api/data')
  .then(() => console.log('Fetch done'));

console.log('End');

// Вывод: Start, End, Timeout, Fetch done
// Асинхронные операции не блокируют выполнение`
      },
      {
        title: "Event Loop и очереди",
        code: `// Микрозадачи выполняются перед макрозадачами
Promise.resolve().then(() => console.log('Microtask'));
setTimeout(() => console.log('Macrotask'), 0);

// Вывод: Microtask, Macrotask
// Event Loop сначала обрабатывает все микрозадачи`
      },
      {
        title: "Callback, Promise, async/await",
        code: `// Callback
setTimeout(() => {
  console.log('Callback');
}, 1000);

// Promise
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));

// async/await
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  console.log(data);
}`
      },
      {
        title: "Web Workers для параллелизма",
        code: `// Основной поток
const worker = new Worker('worker.js');
worker.postMessage({ data: [1, 2, 3] });
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

// worker.js (отдельный поток)
self.onmessage = (e) => {
  const result = e.data.data.map(x => x * 2);
  self.postMessage(result);
};`
      }
    ],
    relatedTopics: ['event-loop', 'promises', 'async-await', 'web-workers', 'callbacks']
  },
  {
    id: 'typing-details',
    title: 'Типизация - детали',
    difficulty: 'intermediate',
    description: 'В JavaScript типы делятся на примитивы и ссылочные объекты. Понимание их различий, особенностей null, преобразований типов и truthy/falsy значений помогает избегать логических и скрытых багов.',
    keyPoints: [
      'null — отдельный примитив, typeof null === "object" — исторический баг.',
      'Примитивы копируются по значению (number, string, boolean, null, undefined, symbol, bigint).',
      'Объекты копируются по ссылке (Object, Array, Date, RegExp, Map, Set).',
      'Date / RegExp / Map / Set — это объекты, а значит ссылочные типы.',
      'Изменение объекта через одну переменную влияет на все ссылки на него.',
      'Преобразование типов бывает: явное (Number(), String()) и неявное ("5" + 3 → "53").',
      'В условиях используются truthy / falsy значения.'
    ],
    tags: ['typing', 'null', 'date', 'regexp', 'map', 'set', 'reference-types', 'type-coercion'],
    examples: [
      {
        title: "null — особый случай",
        code: `typeof null; // "object" ❌ (исторический баг)
null instanceof Object; // false
Object.prototype.toString.call(null); // "[object Null]"

// ✔ Правильная проверка:
value === null;`
      },
      {
        title: "Примитив vs объект",
        code: `let a = 5;
let b = a;
b = 10;

console.log(a); // 5 (копия по значению)

const obj1 = { x: 1 };
const obj2 = obj1;
obj2.x = 2;

console.log(obj1.x); // 2 (копия по ссылке)`
      },
      {
        title: "Date — ссылочный тип",
        code: `const date1 = new Date('2023-01-01');
const date2 = date1;

date2.setMonth(5);
console.log(date1.getMonth()); // 5

// Копирование:
const date3 = new Date(date1.getTime());`
      },
      {
        title: "RegExp — объект",
        code: `const regex = /test/g;
regex.test('test'); // true
regex.exec('test'); // ["test"]

// ⚠️ RegExp тоже передаётся по ссылке:
const r1 = /a/g;
const r2 = r1;
r2.lastIndex = 3;

console.log(r1.lastIndex); // 3`
      },
      {
        title: "Map и Set — ссылочные коллекции",
        code: `const map1 = new Map([['a', 1]]);
const map2 = map1;

map2.set('b', 2);
console.log(map1.has('b')); // true

// Копирование:
const map3 = new Map(map1);`
      }
    ],
    funFact: 'В JavaScript примитивы копируются по значению, объекты — по ссылке, а null — особый примитив с историческим багом typeof.',
    relatedTopics: ['typing-system', 'data-types', 'map-set', 'date-api', 'objects-basic']
  },
  {
    id: 'runtime-environments-details',
    title: 'Окружение выполнения - детали',
    difficulty: 'intermediate',
    description: 'JavaScript выполняется в разных окружениях, главное из которых — браузер и Node.js. Окружение определяет доступные глобальные объекты, API, работу с файлами и сетью, а также поведение this.',
    additionalDescription: 'Один и тот же JavaScript-код может вести себя по-разному в зависимости от среды выполнения. Понимание этих различий критично при переходе между фронтендом и бэкендом, а также при написании универсального кода.',
    keyPoints: [
      'Браузерное окружение ориентировано на работу с DOM, пользователем и сетью.',
      'Node.js ориентирован на серверные задачи, файлы, процессы и системные ресурсы.',
      'Глобальный объект: браузер → window, Node.js → global.',
      'Модульные системы: браузер → ES Modules (import / export), Node.js → CommonJS (require / module.exports).',
      'Работа с файлами: браузер — только через пользовательские API (File, Blob), Node.js — прямой доступ через fs.',
      'Асинхронность присутствует в обоих окружениях, но API различаются.',
      'Поведение this зависит от окружения и strict mode.'
    ],
    tags: ['runtime', 'browser', 'nodejs', 'modules', 'global', 'environment', 'this'],
    examples: [
      {
        title: "Глобальные объекты",
        code: `// Браузер
console.log(window);     // глобальный объект
console.log(document);  // DOM
console.log(navigator); // информация о браузере

// Node.js
console.log(global);  // глобальный объект
console.log(process); // информация о процессе
console.log(Buffer);  // бинарные данные`
      },
      {
        title: "Модульные системы",
        code: `// ES Modules (браузер, modern Node)
import { func } from './module.js';
export const value = 1;

// CommonJS (Node.js)
const { func } = require('./module.js');
module.exports = { value: 1 };`
      },
      {
        title: "Работа с файлами",
        code: `// Браузер
// Нет прямого доступа к файловой системе
// Используются File API, input[type="file"], drag & drop

// Node.js
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log(data);
});`
      },
      {
        title: "Поведение this",
        code: `// Браузер (не strict)
function test() {
  console.log(this); // window
}

// Node.js (не strict)
function test() {
  console.log(this); // global
}

// Strict mode — одинаково
"use strict";
function test() {
  console.log(this); // undefined
}`
      }
    ],
    funFact: 'В браузере глобальный объект называется window, но в ES-модулях this на верхнем уровне всегда undefined, даже без "use strict".',
    relatedTopics: ['runtime-environments', 'this-basics', 'dom-api', 'modules']
  },
  {
    id: 'variables-advanced',
    title: 'Переменные - детали',
    difficulty: 'intermediate',
    description: 'На среднем уровне важно понимать не только объявление переменных, но и механизмы инициализации, области видимости и контроля изменяемости объектов. Hoisting, TDZ и дескрипторы свойств напрямую влияют на предсказуемость и безопасность кода.',
    keyPoints: [
      'Hoisting: var поднимается и инициализируется как undefined, function declaration доступна полностью до объявления.',
      'TDZ (Temporal Dead Zone): let и const существуют до объявления, но недоступны — обращение вызывает ReferenceError.',
      'Дескрипторы свойств: writable — можно ли изменять значение, enumerable — участвует ли в переборах, configurable — можно ли удалять свойство и менять дескрипторы.',
      'Object.freeze — полный запрет на изменение структуры и значений объекта.',
      'Object.seal — запрет на добавление и удаление свойств, но разрешено изменение существующих.',
      'Object.defineProperty — точечная настройка поведения отдельных свойств.'
    ],
    tags: ['variables', 'hoisting', 'tdz', 'descriptors', 'freeze', 'seal', 'defineProperty'],
    examples: [
      {
        title: "Hoisting: var и function",
        code: `console.log(x); // undefined (не ошибка)
var x = 5;

sayHi(); // "Hi"
function sayHi() {
  console.log("Hi");
}

// console.log(y); // ReferenceError
let y = 10;`
      },
      {
        title: "TDZ для let и const",
        code: `{
  // console.log(x); // ReferenceError (TDZ)
  let x = 5;
  console.log(x); // 5
}

{
  // console.log(y); // ReferenceError (TDZ)
  const y = 10;
  console.log(y); // 10
}`
      },
      {
        title: "Дескрипторы свойств",
        code: `const obj = {};

Object.defineProperty(obj, 'prop', {
  value: 42,
  writable: false,
  enumerable: true,
  configurable: false
});

obj.prop = 100; // игнорируется
console.log(obj.prop); // 42`
      },
      {
        title: "Object.freeze и Object.seal",
        code: `const obj = { name: "Alice" };

Object.freeze(obj);
obj.name = "Bob"; // игнорируется
obj.age = 30;     // игнорируется
delete obj.name;  // игнорируется

const obj2 = { name: "Alice" };

Object.seal(obj2);
obj2.name = "Bob"; // OK
obj2.age = 30;     // игнорируется
delete obj2.name;  // игнорируется`
      }
    ],
    funFact: 'В strict mode попытка изменить frozen-объект или writable: false свойство выбросит ошибку, а не будет просто проигнорирована.',
    relatedTopics: ['variables-basic', 'hoisting-basic', 'tdz-basic', 'object-methods']
  },
  {
    id: 'functions-overview',
    title: 'Функции',
    difficulty: 'intermediate',
    description: 'Функции в JavaScript бывают разных типов и имеют особенности создания, области видимости и поведения this. Понимание различий между Function Declaration, Function Expression, стрелочными функциями, конструкторами и генераторами важно для правильного построения кода и работы с объектами.',
    keyPoints: [
      'Function Declaration: полностью всплывает, можно вызывать до объявления.',
      'Function Expression: не всплывает, присваивается переменной.',
      'Стрелочные функции: лексический this (берут из внешнего контекста), нет arguments, нет prototype, нельзя использовать с new.',
      'Функции-конструкторы: вызываются с new, создают объекты через prototype.',
      'Генераторы (function*): создают итераторы, позволяют приостанавливать выполнение через yield.'
    ],
    tags: ['functions', 'arrow-functions', 'constructors', 'generators', 'this', 'prototype'],
    examples: [
      {
        title: "Function Declaration vs Function Expression",
        code: `// Declaration - всплывает
sayHi(); // "Hi"
function sayHi() {
  console.log("Hi");
}

// Expression - не всплывает
// sayHello(); // ReferenceError
const sayHello = function() {
  console.log("Hello");
};`
      },
      {
        title: "Стрелочные функции — лексический this",
        code: `const obj = {
  name: "Alice",
  arrow: () => console.log(this.name), // undefined (this из глобального контекста)
  regular: function() { console.log(this.name); } // "Alice"
};

obj.arrow();
obj.regular();`
      },
      {
        title: "Стрелочные функции — нет arguments",
        code: `function regular() {
  console.log(arguments); // объект arguments
}

const arrow = () => {
  // console.log(arguments); // ReferenceError
  const arrow2 = (...args) => console.log(args); // правильно через rest
  arrow2(1, 2, 3); // [1, 2, 3]
};
arrow();`
      },
      {
        title: "Функции-конструкторы",
        code: `function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function() {
  return \`Hi, I'm \${this.name}\`;
};

const person = new Person("Alice");
console.log(person.sayHi()); // "Hi, I'm Alice"`
      },
      {
        title: "Генераторы",
        code: `function* counter() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = counter();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3`
      }
    ],
    funFact: 'Стрелочные функции никогда не могут быть конструкторами: попытка вызвать их с new вызовет TypeError.',
    relatedTopics: ['functions-types', 'arrow-functions', 'constructors', 'generators', 'this-basics']
  },
  {
    id: 'data-types-details',
    title: 'Типы данных - детали',
    difficulty: 'intermediate',
    description: 'JavaScript имеет несколько встроенных типов данных, каждый из которых предназначен для определённых задач: объекты для структурирования данных, массивы для упорядоченных коллекций, функции как объекты первого класса, специализированные типы для работы с датами, регулярными выражениями, коллекциями и бинарными данными. Понимание этих типов позволяет выбирать правильный инструмент для задачи, избегать ошибок и эффективно использовать методы и свойства объектов.',
    additionalDescription: 'Особенно важно различать ссылочные и примитивные типы, знать особенности слабых коллекций (WeakMap, WeakSet) и асинхронные объекты (Promise). TypedArray и ArrayBuffer используются для работы с бинарными данными, Error — для обработки ошибок. Регулярные выражения (RegExp) и Date предоставляют специфичные методы для работы с текстом и временем. Знание этих деталей повышает качество и предсказуемость кода.',
    keyPoints: [
      'Object: базовый тип для объектов, методы Object.keys(), Object.values(), Object.entries().',
      'Array: упорядоченная коллекция, методы map, filter, reduce, slice, splice.',
      'Function: функции — объекты, могут иметь свойства и методы.',
      'Date: работа с датами, методы getTime(), toISOString(), toLocaleString().',
      'RegExp: регулярные выражения, методы test(), exec(), флаги g, i, m.',
      'Map / Set: коллекции с методами set/get, has, delete, size.',
      'WeakMap / WeakSet: слабые ссылки, объекты могут быть удалены сборщиком мусора.',
      'Error: объекты ошибок (Error, TypeError, ReferenceError и др.).',
      'Promise: объекты для асинхронных операций, методы then, catch, finally.',
      'TypedArray / ArrayBuffer: работа с бинарными данными, высокопроизводительные массивы фиксированного типа.'
    ],
    tags: ['types', 'objects', 'arrays', 'collections', 'promises', 'typedarray'],
    examples: [
      {
        title: "Object методы",
        code: `const obj = { a: 1, b: 2, c: 3 };
Object.keys(obj);   // ["a", "b", "c"]
Object.values(obj); // [1, 2, 3]
Object.entries(obj);// [["a",1],["b",2],["c",3]]`
      },
      {
        title: "Array методы",
        code: `const arr = [1, 2, 3];

arr.map(x => x * 2);      // [2, 4, 6]
arr.filter(x => x > 1);   // [2, 3]
arr.reduce((a, b) => a+b); // 6

arr.slice(1);  // [2,3] - не изменяет оригинал
arr.splice(1,1); // [2] - изменяет оригинал`
      },
      {
        title: "Map и Set",
        code: `// Map
const map = new Map();
map.set('a', 1);
map.get('a'); // 1
map.has('a'); // true

// Set
const set = new Set([1,2,3]);
set.add(4);
set.has(3);   // true
set.size;     // 4`
      },
      {
        title: "Promise",
        code: `const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});

promise
  .then(value => console.log(value))
  .catch(error => console.error(error))
  .finally(() => console.log('finally'));`
      }
    ],
    funFact: 'WeakMap и WeakSet не имеют методов перебора и свойства size, потому что элементы могут быть удалены сборщиком мусора в любой момент — это делает их «невидимыми» для инспекции.',
    relatedTopics: ['data-types-overview', 'objects-basic', 'arrays-basic', 'map-set', 'promises']
  },
  {
    id: 'object-copying',
    title: 'Копирование объектов',
    difficulty: 'intermediate',
    description: 'В JavaScript объекты и массивы передаются по ссылке, поэтому копирование требует внимательности. Существует поверхностное копирование, которое дублирует только первый уровень объекта, и глубокое копирование, которое рекурсивно дублирует все вложенные структуры. Понимание различий помогает избежать ошибок при изменении вложенных данных.',
    additionalDescription: 'Поверхностное копирование подходит для простых объектов или массивов без вложенных структур, а глубокое — для сложных объектов с вложенными массивами, объектами или датами. Для глубокого копирования можно использовать современный метод structuredClone, старый JSON-подход или библиотеки вроде lodash.cloneDeep. Кастомные функции дают контроль над всеми типами, включая даты и массивы.',
    keyPoints: [
      'Поверхностная копия: копирует только первый уровень, вложенные объекты остаются ссылками.',
      'Object.assign: поверхностное копирование объектов (Object.assign({}, obj)).',
      'Spread оператор: поверхностное копирование объектов и массивов ({...obj}, [...arr]).',
      'slice: поверхностное копирование массивов (arr.slice()).',
      'Глубокая копия: рекурсивное копирование всех уровней вложенности.',
      'structuredClone: современный способ глубокого копирования (не все типы поддерживаются).',
      'JSON.parse(JSON.stringify()): глубокое копирование через JSON (пропускает функции, undefined, Symbol).',
      'Кастомные функции: рекурсивное копирование с обработкой всех типов.',
      'Библиотеки: lodash.cloneDeep для надежного глубокого копирования.'
    ],
    tags: ['copying', 'shallow-copy', 'deep-copy', 'spread', 'object-assign', 'structured-clone'],
    examples: [
      {
        title: "Поверхностная копия — Object.assign",
        code: `const obj = { a: 1, nested: { b: 2 } };
const copy = Object.assign({}, obj);

copy.a = 10;       // не изменяет оригинал
copy.nested.b = 20; // изменяет оригинал (ссылка)

console.log(obj.a);        // 1
console.log(obj.nested.b); // 20`
      },
      {
        title: "Поверхностная копия — spread",
        code: `const obj = { a: 1, nested: { b: 2 } };
const copy = { ...obj };

const arr = [1, 2, 3];
const arrCopy = [...arr];`
      },
      {
        title: "Глубокая копия — structuredClone",
        code: `const obj = { a: 1, nested: { b: 2 } };
const deepCopy = structuredClone(obj);

deepCopy.nested.b = 20; // не изменяет оригинал

console.log(obj.nested.b);   // 2
console.log(deepCopy.nested.b); // 20`
      },
      {
        title: "Глубокая копия — JSON",
        code: `const obj = { a: 1, nested: { b: 2 } };
const deepCopy = JSON.parse(JSON.stringify(obj));

// Ограничения
const obj2 = {
  func: () => {},   // пропускается
  undef: undefined, // пропускается
  sym: Symbol('id') // пропускается
};
console.log(JSON.parse(JSON.stringify(obj2))); // {}`
      },
      {
        title: "Кастомная функция глубокого копирования",
        code: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (Array.isArray(obj)) return obj.map(item => deepClone(item));
  const copy = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key]);
    }
  }
  return copy;
}`
      }
    ],
    funFact: 'structuredClone умеет копировать Map, Set, Date и ArrayBuffer, чего нельзя сделать с JSON-подходом.',
    relatedTopics: ['data-types-overview', 'objects-basic', 'structured-clone', 'spread']
  }
];

