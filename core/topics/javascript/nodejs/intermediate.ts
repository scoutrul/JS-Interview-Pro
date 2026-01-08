import { Topic } from '../../../types';

export const JS_NODEJS_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'nodejs-fs',
    title: 'Файловая система (fs)',
    difficulty: 'intermediate',
    description: 'Модуль fs предоставляет работу с файловой системой. Асинхронные методы (callback): readFile, writeFile, readdir, mkdir. Синхронные методы (Sync): readFileSync, writeFileSync. Promise-based API (fs.promises): readFile, writeFile возвращают Promise. path — работа с путями (join, resolve, basename, dirname). os — информация об ОС.',
    keyPoints: [
      'fs.readFile(path, encoding, callback): асинхронное чтение файла.',
      'fs.writeFile(path, data, callback): асинхронная запись файла.',
      'fs.readdir(path, callback): чтение директории, возвращает массив имен файлов.',
      'fs.mkdir(path, callback): создание директории.',
      'Синхронные методы (Sync): блокируют выполнение, использовать осторожно.',
      'fs.promises: Promise-based API, удобнее для async/await.',
      'path.join(), path.resolve(): работа с путями, кроссплатформенность.',
      'os.platform(), os.arch(), os.cpus(): информация об операционной системе.'
    ],
    tags: ['nodejs', 'fs', 'filesystem', 'path', 'os', 'async', 'promises'],
    examples: [
      {
        title: "Асинхронное чтение файла",
        code: `const fs = require('fs');

// Callback-based API
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(data);
});

// Чтение бинарного файла
fs.readFile('image.png', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  // data — Buffer
  console.log(data.length); // размер в байтах
});`
      },
      {
        title: "Запись файла",
        code: `const fs = require('fs');

// Запись текста
fs.writeFile('output.txt', 'Hello, Node.js!', 'utf8', (err) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('File written');
});

// Запись бинарных данных
const buffer = Buffer.from('Hello');
fs.writeFile('binary.bin', buffer, (err) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Binary file written');
});

// Добавление в файл (append)
fs.appendFile('log.txt', 'New line\\n', 'utf8', (err) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Appended');
});`
      },
      {
        title: "Promise-based API",
        code: `const fs = require('fs').promises;
// или
const { readFile, writeFile } = require('fs').promises;

// С async/await
async function readData() {
  try {
    const data = await fs.readFile('data.txt', 'utf8');
    console.log(data);
    return data;
  } catch (err) {
    console.error('Error:', err);
  }
}

// Запись
async function writeData() {
  try {
    await fs.writeFile('output.txt', 'Hello', 'utf8');
    console.log('Written');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Использование
readData();
writeData();`
      },
      {
        title: "Работа с директориями",
        code: `const fs = require('fs');
const path = require('path');

// Чтение директории
fs.readdir('.', (err, files) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Files:', files);
  // ['app.js', 'package.json', 'node_modules', ...]
});

// Создание директории
fs.mkdir('new-folder', (err) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Directory created');
});

// Рекурсивное создание
fs.mkdir('parent/child/grandchild', { recursive: true }, (err) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Directories created');
});

// Удаление файла
fs.unlink('file.txt', (err) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('File deleted');
});

// Удаление директории
fs.rmdir('folder', (err) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Directory deleted');
});`
      },
      {
        title: "Модуль path",
        code: `const path = require('path');

// Объединение путей (кроссплатформенное)
const fullPath = path.join('src', 'components', 'App.js');
// Windows: src\\components\\App.js
// Unix: src/components/App.js

// Абсолютный путь
const absolute = path.resolve('src', 'app.js');
// /absolute/path/to/project/src/app.js

// Имя файла
path.basename('/path/to/file.txt'); // 'file.txt'
path.basename('/path/to/file.txt', '.txt'); // 'file'

// Директория
path.dirname('/path/to/file.txt'); // '/path/to'

// Расширение
path.extname('file.txt'); // '.txt'

// Парсинг пути
path.parse('/path/to/file.txt');
// {
//   root: '/',
//   dir: '/path/to',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }`
      },
      {
        title: "Модуль os",
        code: `const os = require('os');

// Платформа
console.log(os.platform()); // 'win32', 'darwin', 'linux'

// Архитектура
console.log(os.arch()); // 'x64', 'arm64'

// Информация о CPU
console.log(os.cpus()); // массив информации о каждом ядре
console.log(os.cpus().length); // количество ядер

// Память
console.log(os.totalmem()); // общая память в байтах
console.log(os.freemem()); // свободная память в байтах

// Домашняя директория
console.log(os.homedir()); // /Users/username или C:\\Users\\username

// Временная директория
console.log(os.tmpdir()); // /tmp или C:\\Users\\username\\AppData\\Local\\Temp

// Hostname
console.log(os.hostname()); // имя компьютера

// Сетевые интерфейсы
console.log(os.networkInterfaces()); // информация о сетевых интерфейсах`
      },
      {
        title: "Синхронные методы",
        code: `const fs = require('fs');

// ⚠️ Синхронные методы блокируют выполнение
// Использовать только когда необходимо

// Синхронное чтение
try {
  const data = fs.readFileSync('data.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error('Error:', err);
}

// Синхронная запись
try {
  fs.writeFileSync('output.txt', 'Hello', 'utf8');
  console.log('Written');
} catch (err) {
  console.error('Error:', err);
}

// Проверка существования
if (fs.existsSync('file.txt')) {
  console.log('File exists');
}

// Статистика файла
const stats = fs.statSync('file.txt');
console.log(stats.isFile()); // true
console.log(stats.isDirectory()); // false
console.log(stats.size); // размер в байтах
console.log(stats.mtime); // время модификации`
      }
    ],
    relatedTopics: ['nodejs-introduction', 'nodejs-modules', 'async-await'],
    isFrontendEssential: false
  },
  {
    id: 'nodejs-modules',
    title: 'Модули в Node.js',
    difficulty: 'intermediate',
    description: 'Node.js поддерживает две системы модулей: CommonJS (require/module.exports) и ES Modules (import/export). CommonJS — традиционная система, синхронная загрузка. ES Modules — стандарт JavaScript, асинхронная загрузка. В package.json можно указать "type": "module" для использования ES Modules по умолчанию. require и import можно использовать вместе с осторожностью.',
    keyPoints: [
      'CommonJS: require() для импорта, module.exports / exports для экспорта.',
      'ES Modules: import для импорта, export для экспорта.',
      'CommonJS: синхронная загрузка, работает везде в Node.js.',
      'ES Modules: асинхронная загрузка, требует "type": "module" в package.json или расширение .mjs.',
      'module.exports vs exports: module.exports — полная замена, exports — ссылка на module.exports.',
      'require.cache: кэш модулей, можно очистить для перезагрузки.',
      'Циклические зависимости: возможны в обеих системах, но работают по-разному.',
      'Использование вместе: require может импортировать ES модули через динамический import().'
    ],
    tags: ['nodejs', 'modules', 'commonjs', 'es-modules', 'require', 'import', 'export'],
    examples: [
      {
        title: "CommonJS: экспорт",
        code: `// utils.js

// Способ 1: module.exports
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// Способ 2: exports (сокращение)
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;

// Способ 3: один экспорт
module.exports = function greet(name) {
  return \`Hello, \${name}!\`;
};

// Способ 4: класс
class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}
module.exports = Calculator;`
      },
      {
        title: "CommonJS: импорт",
        code: `// app.js

// Импорт объекта
const utils = require('./utils');
console.log(utils.add(2, 3)); // 5
console.log(utils.subtract(5, 2)); // 3

// Деструктуризация
const { add, subtract } = require('./utils');
console.log(add(2, 3)); // 5

// Импорт функции
const greet = require('./greet');
console.log(greet('Alice')); // "Hello, Alice!"

// Импорт класса
const Calculator = require('./calculator');
const calc = new Calculator();
console.log(calc.add(2, 3)); // 5

// Встроенные модули
const fs = require('fs');
const path = require('path');
const http = require('http');

// Модули из node_modules
const express = require('express');
const lodash = require('lodash');`
      },
      {
        title: "ES Modules: экспорт",
        code: `// utils.mjs или utils.js (с "type": "module")

// Именованный экспорт
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Экспорт константы
export const PI = 3.14159;

// Экспорт по умолчанию
export default class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}

// Или
export default function greet(name) {
  return \`Hello, \${name}!\`;
}

// Реэкспорт
export { add, subtract } from './math';
export * from './math'; // все экспорты`
      },
      {
        title: "ES Modules: импорт",
        code: `// app.mjs или app.js (с "type": "module")

// Именованный импорт
import { add, subtract } from './utils.js';
console.log(add(2, 3)); // 5

// Импорт всех именованных экспортов
import * as utils from './utils.js';
console.log(utils.add(2, 3)); // 5

// Импорт по умолчанию
import Calculator from './calculator.js';
const calc = new Calculator();

// Или
import greet from './greet.js';
console.log(greet('Alice')); // "Hello, Alice!"

// Комбинированный импорт
import Calculator, { add, subtract } from './utils.js';

// Динамический импорт
const utils = await import('./utils.js');
console.log(utils.add(2, 3)); // 5

// ⚠️ В ES Modules нужно указывать расширение .js`
      },
      {
        title: "Настройка ES Modules",
        code: `// package.json
{
  "name": "my-app",
  "type": "module", // включает ES Modules по умолчанию
  "main": "app.js"
}

// Теперь все .js файлы используют ES Modules
// Для CommonJS используйте расширение .cjs

// Или используйте расширение .mjs для ES Modules
// app.mjs — всегда ES Module, даже без "type": "module"`

      },
      {
        title: "Различия CommonJS и ES Modules",
        code: `// CommonJS
// - Синхронная загрузка
// - require() доступен везде
// - module.exports / exports
// - Работает везде в Node.js

// ES Modules
// - Асинхронная загрузка
// - import/export только на верхнем уровне (кроме динамического)
// - Топ-уровневый await доступен
// - Требует "type": "module" или .mjs

// CommonJS
const data = require('./data.json'); // синхронно

// ES Modules
import data from './data.json' assert { type: 'json' }; // асинхронно

// Циклические зависимости
// CommonJS: частично загруженные модули
// ES Modules: ссылки на неинициализированные биндинги`
      },
      {
        title: "Использование вместе",
        code: `// CommonJS модуль может импортировать ES Module через динамический import

// commonjs-module.js
async function loadESModule() {
  const esModule = await import('./es-module.js');
  console.log(esModule.default); // default export
  console.log(esModule.namedExport); // named export
}

// ES Module может импортировать CommonJS

// es-module.mjs
import commonjsModule from './commonjs-module.cjs';
// CommonJS модуль становится default export

// Но лучше использовать одну систему модулей в проекте`
      }
    ],
    relatedTopics: ['nodejs-introduction', 'nodejs-fs', 'javascript-runtime'],
    funFact: 'CommonJS был создан специально для Node.js и не является частью стандарта JavaScript. ES Modules — это стандарт ECMAScript, который теперь поддерживается и в браузерах, и в Node.js. Это позволяет использовать один и тот же синтаксис модулей на фронтенде и бэкенде.',
    isFrontendEssential: false
  },
  {
    id: 'nodejs-http',
    title: 'Сеть: http и https',
    difficulty: 'intermediate',
    description: 'Модули http и https предоставляют создание HTTP серверов и клиентов. http.createServer() создает сервер, принимает callback с req (запрос) и res (ответ). req — информация о запросе (method, url, headers), res — методы для ответа (writeHead, write, end). http.get() и http.request() для клиентских запросов. https — то же самое, но с SSL/TLS.',
    keyPoints: [
      'http.createServer((req, res) => {}): создание HTTP сервера.',
      'req.method: метод запроса (GET, POST), req.url: URL, req.headers: заголовки.',
      'res.writeHead(status, headers): установка статуса и заголовков.',
      'res.write(data): отправка данных, res.end(): завершение ответа.',
      'http.get(url, callback): простой GET запрос, возвращает IncomingMessage.',
      'http.request(options, callback): более гибкий запрос, можно использовать POST, PUT и т.д.',
      'https: то же самое, но с SSL/TLS шифрованием.',
      'Парсинг URL через url.parse() или конструктор URL.'
    ],
    tags: ['nodejs', 'http', 'https', 'server', 'client', 'network', 'api'],
    examples: [
      {
        title: "Создание HTTP сервера",
        code: `const http = require('http');

const server = http.createServer((req, res) => {
  // Установка заголовков
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
  });
  
  // Отправка ответа
  res.end('Hello, Node.js!');
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// Обработка ошибок
server.on('error', (err) => {
  console.error('Server error:', err);
});`
      },
      {
        title: "Обработка запросов",
        code: `const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // Метод и URL
  console.log('Method:', req.method); // GET, POST, etc.
  console.log('URL:', req.url); // /path?query=value
  
  // Парсинг URL
  const parsedUrl = url.parse(req.url, true);
  console.log('Path:', parsedUrl.pathname); // /path
  console.log('Query:', parsedUrl.query); // { query: 'value' }
  
  // Заголовки
  console.log('Headers:', req.headers);
  console.log('User-Agent:', req.headers['user-agent']);
  
  // Роутинг
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home</h1>');
  } else if (req.url === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000);`
      },
      {
        title: "Чтение тела запроса",
        code: `const http = require('http');

const server = http.createServer((req, res) => {
  // Чтение данных POST запроса
  if (req.method === 'POST') {
    let body = '';
    
    // Собираем данные по частям
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    
    // Когда все данные получены
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('Received:', data);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON');
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method not allowed');
  }
});

server.listen(3000);`
      },
      {
        title: "HTTP клиент: GET запрос",
        code: `const http = require('http');

// Простой GET запрос
http.get('http://api.example.com/data', (res) => {
  let data = '';
  
  // Собираем данные
  res.on('data', (chunk) => {
    data += chunk.toString();
  });
  
  // Когда все получено
  res.on('end', () => {
    console.log('Response:', data);
    try {
      const json = JSON.parse(data);
      console.log('Parsed:', json);
    } catch (err) {
      console.error('Parse error:', err);
    }
  });
}).on('error', (err) => {
  console.error('Request error:', err);
});

// С опциями
const options = {
  hostname: 'api.example.com',
  port: 80,
  path: '/data',
  method: 'GET',
  headers: {
    'User-Agent': 'Node.js'
  }
};

http.get(options, (res) => {
  // обработка ответа
});`
      },
      {
        title: "HTTP клиент: POST запрос",
        code: `const http = require('http');

const postData = JSON.stringify({
  name: 'Alice',
  age: 30
});

const options = {
  hostname: 'api.example.com',
  port: 80,
  path: '/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk.toString();
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (err) => {
  console.error('Request error:', err);
});

// Отправка данных
req.write(postData);
req.end();`
      },
      {
        title: "HTTPS сервер",
        code: `const https = require('https');
const fs = require('fs');

// SSL сертификаты
const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, HTTPS!');
});

server.listen(443, () => {
  console.log('HTTPS server running on https://localhost:443');
});

// HTTPS клиент
https.get('https://api.example.com/data', (res) => {
  // обработка ответа
});`
      }
    ],
    relatedTopics: ['nodejs-introduction', 'fetch-api', 'async-await'],
    isFrontendEssential: false
  }
];
