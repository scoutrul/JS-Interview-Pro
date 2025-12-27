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
dog.speak(); // "Rex barks"`
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
    description: 'Детали типизации JavaScript: особенности работы с null (исторический баг typeof null === "object"), ссылочные типы (Date, RegExp, Map, Set), преобразование типов, truthy/falsy значения. Понимание различий между примитивами и объектами критично для работы с данными и избежания ошибок.',
    keyPoints: [
      'null: typeof null === "object" (исторический баг), но null не является объектом.',
      'Date: объект для работы с датами, преобразуется в строку при JSON.stringify.',
      'RegExp: объект для регулярных выражений, имеет методы test() и exec().',
      'Map/Set: коллекции с методами для работы с ключами и значениями.',
      'Ссылочные типы: все объекты передаются по ссылке, изменения влияют на оригинал.',
      'Преобразование: явное (Number(), String()) и неявное ("5" + 3 = "53").'
    ],
    tags: ['typing', 'null', 'date', 'regexp', 'map', 'set', 'reference-types', 'type-coercion'],
    examples: [
      {
        title: "Особенности null",
        code: `typeof null; // "object" (баг!)
null instanceof Object; // false (null не объект)
Object.prototype.toString.call(null); // "[object Null]"

// Проверка на null
value === null; // правильная проверка
typeof value === "object" && value !== null; // проверка на объект`
      },
      {
        title: "Date - ссылочный тип",
        code: `const date1 = new Date('2023-01-01');
const date2 = date1; // копируется ссылка
date2.setMonth(5); // изменяет date1 тоже
console.log(date1.getMonth()); // 5

// Копирование Date
const date3 = new Date(date1.getTime()); // копия`
      },
      {
        title: "RegExp - объект",
        code: `const regex = /pattern/gi;
regex.test('text'); // true/false
regex.exec('text'); // массив совпадений

// RegExp передается по ссылке
const regex1 = /test/;
const regex2 = regex1;
regex2.lastIndex = 5; // изменяет regex1 тоже`
      },
      {
        title: "Map и Set - ссылочные типы",
        code: `const map1 = new Map([['a', 1]]);
const map2 = map1; // копируется ссылка
map2.set('b', 2); // изменяет map1 тоже
console.log(map1.has('b')); // true

// Копирование Map
const map3 = new Map(map1); // копия`
      }
    ],
    relatedTopics: ['typing-system', 'data-types', 'map-set', 'date-api', 'objects-basic']
  },
  {
    id: 'runtime-environments-details',
    title: 'Окружение выполнения - детали',
    difficulty: 'intermediate',
    description: 'Детальное сравнение браузерного и Node.js окружений: различия в глобальных объектах, API, модульных системах, работе с файлами и сетью. Влияние окружения на поведение this, работу с асинхронностью, доступные встроенные объекты и возможности.',
    keyPoints: [
      'Браузер: window, document, navigator, location, localStorage, sessionStorage.',
      'Node.js: global, process, Buffer, __dirname, __filename, require, module.exports.',
      'Модули: ES6 modules (import/export) vs CommonJS (require/module.exports).',
      'Файлы: браузер не имеет прямого доступа, Node.js имеет fs модуль.',
      'Сеть: браузер имеет fetch, XMLHttpRequest, Node.js имеет http/https модули.',
      'Влияние на this: разное поведение в глобальном контексте.'
    ],
    tags: ['runtime', 'browser', 'nodejs', 'modules', 'global', 'environment', 'this'],
    examples: [
      {
        title: "Различия в глобальных объектах",
        code: `// Браузер
console.log(window); // глобальный объект
console.log(document); // DOM
console.log(navigator); // информация о браузере

// Node.js
console.log(global); // глобальный объект
console.log(process); // информация о процессе
console.log(Buffer); // работа с бинарными данными`
      },
      {
        title: "Модульные системы",
        code: `// Браузер - ES6 modules
import { func } from './module.js';
export const value = 1;

// Node.js - CommonJS
const { func } = require('./module.js');
module.exports = { value: 1 };`
      },
      {
        title: "Работа с файлами",
        code: `// Браузер - нет прямого доступа
// Используется File API через input или drag&drop

// Node.js - fs модуль
const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log(data);
});`
      },
      {
        title: "Влияние на this",
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
    relatedTopics: ['runtime-environments', 'this-basics', 'dom-api', 'modules']
  },
  {
    id: 'variables-advanced',
    title: 'Переменные - детали',
    difficulty: 'intermediate',
    description: 'Hoisting (всплытие): var и function declarations всплывают, var = undefined до присваивания, function доступна полностью. TDZ (Temporal Dead Zone): let/const недоступны до объявления. Дескрипторы объектов: writable, enumerable, configurable. Object.freeze, Object.seal, Object.defineProperty для контроля изменяемости объектов.',
    keyPoints: [
      'Hoisting: var всплывает с undefined, function declaration всплывает полностью.',
      'TDZ: let/const недоступны до объявления, вызов вызывает ReferenceError.',
      'Дескрипторы: writable (можно изменять), enumerable (видно в переборах), configurable (можно удалять/изменять).',
      'Object.freeze: полная блокировка объекта (нельзя изменять/добавлять/удалять свойства).',
      'Object.seal: нельзя добавлять/удалять, но можно изменять существующие свойства.',
      'Object.defineProperty: настройка дескрипторов для конкретного свойства.'
    ],
    tags: ['variables', 'hoisting', 'tdz', 'descriptors', 'freeze', 'seal', 'defineProperty'],
    examples: [
      {
        title: "Hoisting var и function",
        code: `console.log(x); // undefined (не ошибка!)
var x = 5;

sayHi(); // "Hi" (работает!)
function sayHi() {
  console.log("Hi");
}

// console.log(y); // ReferenceError
let y = 10;`
      },
      {
        title: "TDZ для let/const",
        code: `{
  // console.log(x); // ReferenceError (TDZ)
  let x = 5;
  console.log(x); // 5 (OK)
}

{
  // console.log(y); // ReferenceError (TDZ)
  const y = 10;
  console.log(y); // 10 (OK)
}`
      },
      {
        title: "Дескрипторы объектов",
        code: `const obj = {};

Object.defineProperty(obj, 'prop', {
  value: 42,
  writable: false, // нельзя изменять
  enumerable: true, // видно в переборах
  configurable: false // нельзя удалять/изменять дескрипторы
});

obj.prop = 100; // игнорируется (writable: false)
console.log(obj.prop); // 42`
      },
      {
        title: "Object.freeze, Object.seal",
        code: `const obj = { name: "Alice" };

// Object.freeze - полная блокировка
Object.freeze(obj);
obj.name = "Bob"; // игнорируется
obj.age = 30; // игнорируется
delete obj.name; // игнорируется

// Object.seal - можно изменять, нельзя добавлять/удалять
const obj2 = { name: "Alice" };
Object.seal(obj2);
obj2.name = "Bob"; // OK
obj2.age = 30; // игнорируется
delete obj2.name; // игнорируется`
      }
    ],
    relatedTopics: ['variables-basic', 'hoisting-basic', 'tdz-basic', 'object-methods']
  },
  {
    id: 'functions-overview',
    title: 'Функции',
    difficulty: 'intermediate',
    description: 'Function Declaration всплывает полностью, Function Expression не всплывает. Стрелочные функции: лексический this (берут из окружающего контекста), нет arguments и prototype, нельзя использовать как конструктор. Функции-конструкторы: используются с new, создают объекты через prototype. Генераторы: function* с yield, создают итераторы.',
    keyPoints: [
      'Function Declaration: всплывает полностью, можно вызывать до объявления.',
      'Function Expression: не всплывает, присваивается переменной.',
      'Стрелочные функции: лексический this, нет arguments, нет prototype, нельзя new.',
      'Конструкторы: функции, вызываемые с new, используют prototype для создания объектов.',
      'Генераторы: function* с yield, создают итераторы, можно приостанавливать выполнение.'
    ],
    tags: ['functions', 'arrow-functions', 'constructors', 'generators', 'this', 'prototype'],
    examples: [
      {
        title: "Function Declaration vs Expression",
        code: `// Declaration - всплывает
sayHi(); // работает
function sayHi() {
  console.log("Hi");
}

// Expression - не всплывает
// sayHello(); // ошибка
const sayHello = function() {
  console.log("Hello");
};`
      },
      {
        title: "Стрелочные функции - лексический this",
        code: `const obj = {
  name: "Alice",
  arrow: () => {
    console.log(this.name); // undefined (this из глобального контекста)
  },
  regular: function() {
    console.log(this.name); // "Alice"
  }
};

obj.arrow();
obj.regular();`
      },
      {
        title: "Стрелочные функции - нет arguments",
        code: `function regular() {
  console.log(arguments); // объект arguments
}

const arrow = () => {
  // console.log(arguments); // ReferenceError
  // Используй rest параметры
  const arrow2 = (...args) => {
    console.log(args); // массив
  };
};`
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
person.sayHi(); // "Hi, I'm Alice"`
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
    relatedTopics: ['functions-types', 'arrow-functions', 'constructors', 'generators', 'this-basics']
  },
  {
    id: 'data-types-details',
    title: 'Типы данных - детали',
    difficulty: 'intermediate',
    description: 'Детали работы с встроенными типами данных: особенности Object, Array, Function, Date, RegExp, Map/WeakMap, Set/WeakSet, Error, Promise, TypedArray/ArrayBuffer. Понимание когда использовать каждый тип, их различия, методы и особенности работы с ними.',
    keyPoints: [
      'Object: базовый тип для объектов, методы Object.keys(), Object.values(), Object.entries().',
      'Array: упорядоченная коллекция, методы map, filter, reduce, slice, splice.',
      'Function: функции являются объектами, могут иметь свойства и методы.',
      'Date: работа с датами, методы getTime(), toISOString(), toLocaleString().',
      'RegExp: регулярные выражения, методы test(), exec(), флаги g, i, m.',
      'Map/Set: коллекции с методами set/get, has, delete, size.',
      'WeakMap/WeakSet: слабые ссылки, не препятствуют сборке мусора.',
      'Error: объекты ошибок, типы Error, TypeError, ReferenceError и др.',
      'Promise: объекты для асинхронных операций, методы then, catch, finally.',
      'TypedArray/ArrayBuffer: работа с бинарными данными.'
    ],
    tags: ['types', 'objects', 'arrays', 'collections', 'promises', 'typedarray'],
    examples: [
      {
        title: "Object методы",
        code: `const obj = { a: 1, b: 2, c: 3 };
Object.keys(obj); // ["a", "b", "c"]
Object.values(obj); // [1, 2, 3]
Object.entries(obj); // [["a", 1], ["b", 2], ["c", 3]]`
      },
      {
        title: "Array методы",
        code: `const arr = [1, 2, 3];
arr.map(x => x * 2); // [2, 4, 6]
arr.filter(x => x > 1); // [2, 3]
arr.reduce((a, b) => a + b); // 6
arr.slice(1); // [2, 3] (не изменяет оригинал)
arr.splice(1, 1); // [2] (изменяет оригинал)`
      },
      {
        title: "Map и Set",
        code: `// Map - ключ-значение
const map = new Map();
map.set('a', 1);
map.get('a'); // 1
map.has('a'); // true

// Set - уникальные значения
const set = new Set([1, 2, 3]);
set.add(4);
set.has(3); // true
set.size; // 4`
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
    relatedTopics: ['data-types-overview', 'objects-basic', 'arrays-basic', 'map-set', 'promises']
  },
  {
    id: 'object-copying',
    title: 'Копирование объектов',
    difficulty: 'intermediate',
    description: 'Поверхностная копия (shallow copy): копирует только первый уровень, вложенные объекты остаются ссылками. Методы: Object.assign, spread оператор, slice для массивов. Глубокая копия (deep copy): рекурсивно копирует все уровни. Методы: structuredClone (современный), JSON.parse(JSON.stringify()) (ограничения), кастомные функции или библиотеки (lodash.cloneDeep).',
    keyPoints: [
      'Поверхностная копия: копирует только первый уровень, вложенные объекты - ссылки.',
      'Object.assign: поверхностное копирование, Object.assign({}, obj).',
      'Spread оператор: поверхностное копирование, {...obj}, [...arr].',
      'slice: поверхностное копирование массивов, arr.slice().',
      'Глубокая копия: рекурсивно копирует все уровни.',
      'structuredClone: современный способ глубокого копирования (не все типы поддерживаются).',
      'JSON.parse(JSON.stringify()): глубокое копирование через JSON (пропускает функции, undefined, Symbol).',
      'Кастомные функции: рекурсивное копирование с обработкой всех типов.',
      'Библиотеки: lodash.cloneDeep для надежного глубокого копирования.'
    ],
    tags: ['copying', 'shallow-copy', 'deep-copy', 'spread', 'object-assign', 'structured-clone'],
    examples: [
      {
        title: "Поверхностная копия - Object.assign",
        code: `const obj = { a: 1, nested: { b: 2 } };
const copy = Object.assign({}, obj);
copy.a = 10; // не изменяет оригинал
copy.nested.b = 20; // изменяет оригинал! (ссылка)

console.log(obj.a); // 1
console.log(obj.nested.b); // 20`
      },
      {
        title: "Поверхностная копия - spread",
        code: `const obj = { a: 1, nested: { b: 2 } };
const copy = { ...obj };

const arr = [1, 2, 3];
const arrCopy = [...arr];`
      },
      {
        title: "Глубокая копия - structuredClone",
        code: `const obj = { a: 1, nested: { b: 2 } };
const deepCopy = structuredClone(obj);
deepCopy.nested.b = 20; // не изменяет оригинал

console.log(obj.nested.b); // 2
console.log(deepCopy.nested.b); // 20`
      },
      {
        title: "Глубокая копия - JSON",
        code: `const obj = { a: 1, nested: { b: 2 } };
const deepCopy = JSON.parse(JSON.stringify(obj));

// Ограничения:
const obj2 = {
  func: () => {}, // пропускается
  undef: undefined, // пропускается
  sym: Symbol('id') // пропускается
};
JSON.parse(JSON.stringify(obj2)); // {}`
      },
      {
        title: "Кастомная функция глубокого копирования",
        code: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const copy = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepClone(obj[key]);
      }
    }
    return copy;
  }
}`
      }
    ],
    relatedTopics: ['data-types-overview', 'objects-basic', 'structured-clone', 'spread']
  }
];

