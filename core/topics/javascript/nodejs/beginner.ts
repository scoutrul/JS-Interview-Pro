import { Topic } from '../../../types';

export const JS_NODEJS_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'nodejs-introduction',
    title: 'Введение в Node.js',
    difficulty: 'beginner',
    description: 'Node.js — среда исполнения JavaScript вне браузера, основанная на движке V8. Позволяет использовать JavaScript для серверной разработки, инструментов командной строки, автоматизации. Предоставляет доступ к файловой системе, сети, процессам. Использует Event Loop из libuv для асинхронного I/O. Один язык для фронтенда и бэкенда.',
    keyPoints: [
      'Node.js — среда исполнения JavaScript на основе V8 (движок Chrome).',
      'Позволяет использовать JavaScript вне браузера: сервер, CLI, автоматизация.',
      'Предоставляет API: файловая система (fs), сеть (http, https), процессы (child_process).',
      'Event Loop из libuv для асинхронного I/O (неблокирующие операции).',
      'Один язык для фронтенда и бэкенда: shared code, isomorphic JS.',
      'Модульная система: CommonJS (require/module.exports) и ES Modules (import/export).',
      'NPM — менеджер пакетов, крупнейший реестр пакетов.',
      'Использование: веб-серверы, API, микросервисы, инструменты разработки, автоматизация.'
    ],
    tags: ['nodejs', 'runtime', 'server', 'backend', 'v8', 'javascript', 'environment'],
    examples: [
      {
        title: "Что такое Node.js",
        code: `// Node.js позволяет запускать JavaScript вне браузера

// Серверный код
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node.js!');
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// Тот же JavaScript, но в другой среде
// Нет window, document, но есть process, require, fs`
      },
      {
        title: "Почему Node.js",
        code: `// 1. Один язык для фронтенда и бэкенда
// Можно использовать общий код

// shared/utils.js
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Используется и на фронте, и на бэке

// 2. Асинхронный I/O
// Неблокирующие операции, высокая производительность

// 3. Большая экосистема
// NPM — крупнейший реестр пакетов

// 4. Быстрая разработка
// JavaScript знаком фронтенд-разработчикам`
      },
      {
        title: "Установка и запуск",
        code: `// Установка Node.js с официального сайта
// Или через менеджер пакетов (nvm, brew, apt)

// Проверка версии
node --version
// v18.0.0

// Запуск файла
node app.js

// REPL (интерактивная консоль)
node
> console.log('Hello');
Hello
> process.version
'v18.0.0'
> .exit`
      },
      {
        title: "Первая программа",
        code: `// app.js
console.log('Hello, Node.js!');

// Запуск: node app.js
// Вывод: Hello, Node.js!

// Работа с файловой системой
const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(data);
});

// HTTP сервер
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello, Node.js!</h1>');
}).listen(3000);`
      },
      {
        title: "Отличия от браузера",
        code: `// Браузер
console.log(window); // объект window
console.log(document); // объект document
fetch('/api/data'); // Fetch API

// Node.js
console.log(global); // глобальный объект (не window)
// console.log(document); // ❌ undefined
const http = require('http'); // модули
process.env.NODE_ENV; // переменные окружения

// Общее
console.log('Hello'); // ✅ работает везде
setTimeout(() => {}, 1000); // ✅ работает везде
Promise.resolve(); // ✅ работает везде`
      }
    ],
    relatedTopics: ['browser-api-principles', 'javascript-runtime', 'event-loop'],
    funFact: 'Node.js был создан Райаном Далем в 2009 году. Изначально он хотел создать способ для JavaScript работать на сервере, используя неблокирующий I/O. Первая версия использовала Google V8 и libuv для асинхронных операций. Сейчас Node.js используется миллионами разработчиков по всему миру.',
    isFrontendEssential: false
  },
  {
    id: 'nodejs-globals',
    title: 'Глобальные объекты Node.js',
    difficulty: 'beginner',
    description: 'Node.js предоставляет глобальные объекты, доступные везде без require. process — информация о процессе и окружении. Buffer — работа с бинарными данными. global — глобальный объект (аналог window). __dirname и __filename — путь к текущему модулю. console — вывод в консоль. setTimeout, setInterval, setImmediate — таймеры.',
    keyPoints: [
      'process: информация о процессе (env, argv, cwd, exit), переменные окружения (process.env).',
      'Buffer: работа с бинарными данными, создание через Buffer.from(), Buffer.alloc().',
      'global: глобальный объект (аналог window в браузере), но лучше использовать globalThis.',
      '__dirname: абсолютный путь к директории текущего модуля.',
      '__filename: абсолютный путь к текущему файлу.',
      'console: вывод в консоль (log, error, warn, info, debug).',
      'setTimeout, setInterval, setImmediate: таймеры (setImmediate — специфичен для Node.js).',
      'require, module, exports: модульная система CommonJS.'
    ],
    tags: ['nodejs', 'globals', 'process', 'buffer', 'dirname', 'filename', 'commonjs'],
    examples: [
      {
        title: "process",
        code: `// Информация о процессе
console.log(process.version); // версия Node.js
console.log(process.platform); // платформа (win32, darwin, linux)
console.log(process.arch); // архитектура (x64, arm64)

// Аргументы командной строки
console.log(process.argv);
// ['node', 'app.js', 'arg1', 'arg2']

// Текущая рабочая директория
console.log(process.cwd()); // /path/to/project

// Переменные окружения
console.log(process.env.NODE_ENV); // development, production
console.log(process.env.PATH);

// Завершение процесса
process.exit(0); // успешное завершение
process.exit(1); // ошибка

// События процесса
process.on('exit', (code) => {
  console.log('Process exiting with code:', code);
});`
      },
      {
        title: "Buffer",
        code: `// Buffer — работа с бинарными данными
// Аналог ArrayBuffer в браузере, но более удобный

// Создание из строки
const buf1 = Buffer.from('Hello');
console.log(buf1); // <Buffer 48 65 6c 6c 6f>

// Создание из массива
const buf2 = Buffer.from([72, 101, 108, 108, 111]);

// Создание пустого буфера
const buf3 = Buffer.alloc(10); // 10 байт, заполнены нулями
const buf4 = Buffer.allocUnsafe(10); // быстрее, но не инициализирован

// Преобразование в строку
console.log(buf1.toString()); // "Hello"
console.log(buf1.toString('base64')); // "SGVsbG8="

// Работа с данными
buf1[0] = 72; // изменение байта
console.log(buf1.toString()); // "Hello"

// Конкатенация
const buf5 = Buffer.concat([buf1, Buffer.from(' World')]);
console.log(buf5.toString()); // "Hello World"`
      },
      {
        title: "global",
        code: `// global — глобальный объект (аналог window)
console.log(global === globalThis); // true (в Node.js)

// Глобальные переменные
global.myVar = 'value';
console.log(myVar); // "value" (без var/let/const)

// Но лучше использовать globalThis для кроссплатформенности
globalThis.myVar = 'value';

// Встроенные глобальные объекты
console.log(global.console); // console
console.log(global.process); // process
console.log(global.Buffer); // Buffer
console.log(global.setTimeout); // setTimeout

// ❌ В Node.js нет window и document`
      },
      {
        title: "__dirname и __filename",
        code: `// __dirname — путь к директории текущего модуля
console.log(__dirname);
// /path/to/project/src

// __filename — путь к текущему файлу
console.log(__filename);
// /path/to/project/src/app.js

// Использование
const fs = require('fs');
const path = require('path');

// Чтение файла в той же директории
const data = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf8');

// Импорт модуля из той же директории
const utils = require(path.join(__dirname, 'utils.js'));

// ⚠️ В ES Modules (import/export) нет __dirname и __filename
// Используйте import.meta.url:
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);`
      },
      {
        title: "console",
        code: `// console — вывод в консоль
console.log('Info:', 'message');
console.error('Error:', 'error message');
console.warn('Warning:', 'warning message');
console.info('Info:', 'info message');
console.debug('Debug:', 'debug message');

// Форматирование
console.log('User: %s, Age: %d', 'Alice', 30);
// User: Alice, Age: 30

// Объекты
const obj = { name: 'Alice', age: 30 };
console.log(obj);
// { name: 'Alice', age: 30 }

// Таблица
console.table([
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
]);

// Время выполнения
console.time('operation');
// код
console.timeEnd('operation');
// operation: 123.456ms

// Трассировка стека
console.trace('Trace message');`
      },
      {
        title: "Таймеры",
        code: `// setTimeout — выполнить через N мс
const timeoutId = setTimeout(() => {
  console.log('Delayed');
}, 1000);
clearTimeout(timeoutId);

// setInterval — выполнять каждые N мс
const intervalId = setInterval(() => {
  console.log('Repeating');
}, 1000);
clearInterval(intervalId);

// setImmediate — выполнить в следующей итерации Event Loop
setImmediate(() => {
  console.log('Immediate');
});

// process.nextTick — выполнить перед следующей фазой Event Loop (высший приоритет)
process.nextTick(() => {
  console.log('Next tick');
});

// Порядок выполнения:
// 1. process.nextTick
// 2. setImmediate / setTimeout
// 3. setInterval`
      }
    ],
    relatedTopics: ['nodejs-introduction', 'javascript-runtime', 'event-loop'],
    funFact: 'Buffer был введен в Node.js до того, как TypedArray стал стандартом JavaScript. Это одна из причин, почему Node.js имеет свой собственный API для работы с бинарными данными, хотя сейчас можно использовать и стандартные TypedArray.',
    isFrontendEssential: false
  }
];
