import { Topic } from '../../../types';

export const JS_BROWSER_API_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'browser-api-principles',
    title: 'Браузерное API: основы и принципы',
    difficulty: 'beginner',
    description: 'JavaScript — это язык программирования, а браузерное API — это набор интерфейсов, предоставляемых браузером как хост-окружением. Браузер предоставляет доступ к DOM, UI, графике, Web API, хранилищам и безопасности. Понимание различий между языком и окружением критично для архитектуры приложений.',
    keyPoints: [
      'JavaScript — язык: синтаксис, типы, GC, execution model (call stack, job queue), объекты языка (Object, Array, Promise, Map).',
      'Окружение (host environment) — API: глобальный объект, системные API, точки входа во внешний мир.',
      'Глобальный объект: window (браузер), global (Node.js), globalThis (универсальный).',
      'window и document — не часть JavaScript, это API браузера, доступные через глобальный объект.',
      'Браузер предоставляет: DOM/UI, графику (Canvas, WebGL, SVG), Web API (fetch, WebSocket), хранилища (localStorage, IndexedDB), безопасность (sandbox, CORS, CSP).',
      'Node.js предоставляет: файловую систему (fs), сеть (http), процессы (child_process), системный доступ (process.env).',
      'Общее: Promise, async/await, setTimeout/setInterval, fetch (теперь), TextEncoder/Decoder, URL.',
      'Event Loop: в браузере управляется UI с rendering pipeline, в Node.js — libuv с фазами (timers, I/O, poll, check).',
      'Архитектурная важность: разделение бизнес-логики (чистый JS) и адаптеров (DOM/Node API) для clean architecture и isomorphic JS.'
    ],
    tags: ['browser-api', 'runtime', 'environment', 'host', 'window', 'globalThis', 'architecture', 'nodejs-comparison'],
    examples: [
      {
        title: "JavaScript vs Окружение",
        code: `// JavaScript (язык) - работает везде
const arr = [1, 2, 3];
arr.map(x => x * 2); // [2, 4, 6]

// Браузерное API (окружение) - только в браузере
document.querySelector('#app'); // ❌ не работает в Node.js
window.location; // ❌ не работает в Node.js

// Node.js API (окружение) - только в Node.js
require('fs'); // ❌ не работает в браузере
process.env; // ❌ не работает в браузере

// Общее (язык + стандарты)
Promise.resolve(); // ✅ работает везде
fetch('https://api.example.com'); // ✅ работает везде (теперь)`
      },
      {
        title: "Глобальный объект",
        code: `// Браузер
console.log(window === globalThis); // true
console.log(window.document); // document
console.log(window.location); // location

// Node.js
console.log(global === globalThis); // true
console.log(global.process); // process
console.log(global.require); // require

// Универсальный способ
console.log(globalThis); // window (браузер) или global (Node.js)

// ❌ window — не часть JavaScript
// ❌ document — не часть JavaScript
// Это API браузера, доступные через глобальный объект`
      },
      {
        title: "Что есть в браузере, но нет в Node.js",
        code: `// DOM / UI
document.querySelector('.item');
element.addEventListener('click', handler);

// BOM (Browser Object Model)
window.location.href = 'https://example.com';
window.history.pushState({}, '', '/page');
navigator.userAgent;
screen.width;
alert('Hello');
confirm('Delete?');

// Графика
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.fillRect(0, 0, 100, 100);

// Web APIs
fetch('/api/data');
new WebSocket('wss://example.com');

// Хранилища
localStorage.setItem('key', 'value');
indexedDB.open('db');

// Безопасность
// sandbox, same-origin policy, CORS, CSP`
      },
      {
        title: "Что есть в Node.js, но нет в браузере",
        code: `// Файловая система
const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log(data);
});

// Сеть и процессы
const http = require('http');
http.createServer((req, res) => {
  res.end('Hello');
});

const { spawn } = require('child_process');
spawn('ls', ['-la']);

// Системный доступ
process.env.NODE_ENV;
process.cwd();
process.memoryUsage();

// Модули
const module = require('./module');
module.exports = {};

// Глобальные объекты
Buffer.from('hello');
__dirname;
__filename;`
      },
      {
        title: "Общее между браузером и Node.js",
        code: `// Promise, async/await
async function fetchData() {
  const response = await fetch('https://api.example.com');
  return response.json();
}

// setTimeout, setInterval
setTimeout(() => console.log('timeout'), 1000);
setInterval(() => console.log('interval'), 1000);

// TextEncoder / Decoder
const encoder = new TextEncoder();
const decoder = new TextDecoder();

// URL
const url = new URL('https://example.com/path?query=value');
console.log(url.pathname); // '/path'
console.log(url.searchParams.get('query')); // 'value'

// ⚠️ Даже одинаковые API могут иметь разные ограничения
// Например, fetch в Node.js может иметь другие таймауты`
      },
      {
        title: "Event Loop: различия",
        code: `// Браузер: Event Loop управляется UI
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
// Порядок: promise, timeout
// Между фазами может быть рендеринг

// Node.js: Event Loop из libuv
// Фазы: timers → pending callbacks → idle → poll → check → close
process.nextTick(() => console.log('nextTick')); // приоритет выше
setImmediate(() => console.log('setImmediate')); // после poll фазы
setTimeout(() => console.log('timeout'), 0);

// Порядок в Node.js: nextTick, timeout, setImmediate`
      },
      {
        title: "Архитектурная важность",
        code: `// ❌ Плохо: бизнес-логика завязана на DOM
function calculateTotal(items) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('total').textContent = total; // ❌ DOM в бизнес-логике
  return total;
}

// ✅ Хорошо: разделение бизнес-логики и адаптеров
// core/calculator.js (чистый JS, работает везде)
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// adapters/dom-adapter.js (браузерный адаптер)
function updateTotal(total) {
  document.getElementById('total').textContent = total;
}

// adapters/node-adapter.js (Node.js адаптер)
function logTotal(total) {
  console.log('Total:', total);
}

// Использование
const total = calculateTotal(items); // работает везде
if (typeof window !== 'undefined') {
  updateTotal(total); // только в браузере
} else {
  logTotal(total); // только в Node.js
}

// Это основа clean architecture и isomorphic/universal JS`
      }
    ],
    relatedTopics: ['what-is-javascript', 'javascript-runtime', 'dom-api', 'event-loop'],
    funFact: 'window и document не являются частью спецификации JavaScript (ECMAScript). Они определены в отдельных стандартах W3C (DOM, HTML) и доступны только в браузерном окружении. Это одна из причин, почему один и тот же JavaScript-код может работать по-разному в браузере и Node.js.',
    isFrontendEssential: true
  },
{
    id: 'web-storage',
    title: 'Web Storage API',
    difficulty: 'beginner',
    description: 'localStorage и sessionStorage хранят данные в браузере. localStorage сохраняется между сессиями, sessionStorage — только в текущей вкладке. Оба хранят только строки. Методы: setItem(), getItem(), removeItem(), clear(). Ограничение ~5-10MB.',
    keyPoints: [
      'localStorage: сохраняется между сессиями браузера.',
      'sessionStorage: только в текущей вкладке.',
      'Только строки: объекты через JSON.stringify/parse.',
      'setItem(key, value), getItem(key), removeItem(key), clear().',
      'Ограничение: ~5-10MB на домен.'
    ],
    tags: ['storage', 'localStorage', 'sessionStorage', 'browser', 'api'],
    examples: [
      {
        title: "Базовое использование",
        code: `// Сохранение\nlocalStorage.setItem('name', 'Alice');\nlocalStorage.setItem('age', '30');\n\n// Получение\nconst name = localStorage.getItem('name'); // "Alice"\nconst age = localStorage.getItem('age'); // "30"\n\n// Удаление\nlocalStorage.removeItem('age');\n\n// Очистка всего\nlocalStorage.clear();`
      },
      {
        title: "Работа с объектами",
        code: `const user = { name: "Alice", age: 30 };\n\n// Сохранение объекта\nlocalStorage.setItem('user', JSON.stringify(user));\n\n// Получение объекта\nconst saved = localStorage.getItem('user');\nconst userObj = JSON.parse(saved);\n// { name: "Alice", age: 30 }`
      },
      {
        title: "localStorage vs sessionStorage",
        code: `// localStorage - сохраняется после закрытия браузера\nlocalStorage.setItem('persistent', 'data');\n\n// sessionStorage - удаляется при закрытии вкладки\nsessionStorage.setItem('temporary', 'data');\n\n// Оба имеют одинаковый API\nsessionStorage.getItem('temporary');\nsessionStorage.removeItem('temporary');`
      }
    ],
    relatedTopics: ['json-methods', 'objects-basic'],
    isFrontendEssential: true
  },
{
    id: 'dom-api',
    title: 'DOM API',
    difficulty: 'beginner',
    description: 'DOM API позволяет манипулировать HTML элементами. querySelector/querySelectorAll находит элементы по селектору. createElement создает элементы, appendChild/removeChild добавляет/удаляет. innerHTML вставляет HTML (опасно XSS), textContent безопасно вставляет текст. classList управляет классами.',
    keyPoints: [
      'querySelector: первый элемент по селектору, querySelectorAll: все элементы.',
      'createElement: создает элемент, appendChild: добавляет в DOM.',
      'innerHTML: вставляет HTML (риск XSS), textContent: безопасный текст.',
      'classList: add/remove/toggle/contains для управления классами.',
      'getAttribute/setAttribute: работа с атрибутами.'
    ],
    tags: ['dom', 'html', 'elements', 'browser', 'api'],
    examples: [
      {
        title: "Поиск элементов",
        code: `// По ID\nconst element = document.getElementById('myId');\n\n// По селектору\nconst first = document.querySelector('.class');\nconst all = document.querySelectorAll('.class');\n\n// По тегу\nconst divs = document.getElementsByTagName('div');`
      },
      {
        title: "Создание и добавление",
        code: `// Создание элемента\nconst div = document.createElement('div');\ndiv.textContent = 'Hello';\n\n// Добавление в DOM\nconst container = document.querySelector('#container');\ncontainer.appendChild(div);\n\n// Удаление\ncontainer.removeChild(div);\n// или\ndiv.remove();`
      },
      {
        title: "innerHTML vs textContent",
        code: `const div = document.createElement('div');\n\n// innerHTML - вставляет HTML (опасно!)\ndiv.innerHTML = '<script>alert("XSS")</script>';\n\n// textContent - безопасно, только текст\ndiv.textContent = '<script>alert("XSS")</script>';\n// Выведет как текст, не выполнит скрипт`
      },
      {
        title: "classList и атрибуты",
        code: `const element = document.querySelector('.item');\n\n// Управление классами\nelement.classList.add('active');\nelement.classList.remove('hidden');\nelement.classList.toggle('selected');\nelement.classList.contains('active'); // true\n\n// Атрибуты\nelement.setAttribute('data-id', '123');\nelement.getAttribute('data-id'); // "123"`
      }
    ],
    relatedTopics: ['objects-basic', 'strings-methods'],
    isFrontendEssential: true
  },
{
    id: 'fetch-api',
    title: 'Fetch API',
    difficulty: 'beginner',
    description: 'Fetch API для HTTP запросов. fetch(url, options) возвращает Promise с Response. Методы: json(), text(), blob(). Обработка ошибок: проверка response.ok или try/catch. Заголовки через headers, методы GET/POST/PUT/DELETE через method. CORS (Cross-Origin Resource Sharing) ограничивает запросы к другим доменам. Same-origin policy разрешает запросы только к тому же домену, протоколу и порту.',
    keyPoints: [
      'fetch(url, options): возвращает Promise<Response>.',
      'response.json(): парсит JSON, response.text(): текст, response.blob(): бинарные данные.',
      'Ошибки: проверять response.ok или использовать try/catch.',
      'Заголовки: headers: { "Content-Type": "application/json" }.',
      'CORS: браузер блокирует запросы к другим доменам без разрешения сервера.',
      'Same-origin: протокол + домен + порт должны совпадать.',
      'CORS заголовки: Access-Control-Allow-Origin на сервере разрешает запросы.',
      'Preflight: OPTIONS запрос для сложных запросов (не GET/POST).'
    ],
    tags: ['fetch', 'http', 'async', 'api', 'browser', 'security'],
    examples: [
      {
        title: "Базовый GET запрос",
        code: `fetch('https://api.example.com/users')\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error('Error:', error));\n\n// С async/await\nasync function getUsers() {\n  try {\n    const response = await fetch('https://api.example.com/users');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(error);\n  }\n}`
      },
      {
        title: "POST запрос с данными",
        code: `fetch('https://api.example.com/users', {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json',\n  },\n  body: JSON.stringify({\n    name: 'Alice',\n    age: 30\n  })\n})\n  .then(response => response.json())\n  .then(data => console.log(data));`
      },
      {
        title: "Обработка ошибок",
        code: `async function fetchData() {\n  const response = await fetch('/api/data');\n  \n  // Проверка статуса\n  if (!response.ok) {\n    throw new Error(\`HTTP error! status: \${response.status}\`);\n  }\n  \n  const data = await response.json();\n  return data;\n}\n\n// Или через try/catch\ntry {\n  const data = await fetchData();\n} catch (error) {\n  console.error('Failed:', error);\n}`
      },
      {
        title: "CORS - запрос к другому домену",
        code: `// Запрос к другому домену\nfetch('https://api.other-domain.com/data')\n  .then(response => response.json())\n  .catch(error => {\n    // CORS error: блокируется браузером\n    // если сервер не вернул Access-Control-Allow-Origin\n    console.error('CORS error:', error);\n  });\n\n// Сервер должен вернуть:\n// Access-Control-Allow-Origin: *\n// или\n// Access-Control-Allow-Origin: https://yourdomain.com`
      },
      {
        title: "CORS с credentials",
        code: `// Отправка cookies с запросом\nfetch('https://api.example.com/data', {\n  credentials: 'include', // отправляет cookies\n  headers: {\n    'Authorization': 'Bearer token'\n  }\n});\n\n// Сервер должен вернуть:\n// Access-Control-Allow-Credentials: true\n// Access-Control-Allow-Origin: https://yourdomain.com (не *)`
      },
      {
        title: "Preflight запрос",
        code: `// Сложные запросы (не GET/POST) требуют preflight\nfetch('https://api.example.com/data', {\n  method: 'PUT',\n  headers: {\n    'Content-Type': 'application/json',\n    'X-Custom-Header': 'value'\n  },\n  body: JSON.stringify({ data: 'test' })\n});\n\n// Браузер сначала отправляет OPTIONS запрос\n// Сервер должен ответить разрешающими заголовками:\n// Access-Control-Allow-Methods: PUT\n// Access-Control-Allow-Headers: X-Custom-Header`
      }
    ],
    relatedTopics: ['promises', 'async-await', 'json-methods', 'cors', 'same-origin-policy']
  },
{
    id: 'event-api',
    title: 'Event API',
    difficulty: 'beginner',
    description: 'addEventListener подписывается на события, removeEventListener отписывается. Event объект содержит информацию о событии (target, type, preventDefault, stopPropagation). Делегирование событий: слушатель на родителе, проверка target. CustomEvent для кастомных событий.',
    keyPoints: [
      'addEventListener(type, handler, options): подписка на событие.',
      'removeEventListener: отписка (нужна та же функция-ссылка).',
      'Event: target (элемент), type (тип), preventDefault() (отмена действия), stopPropagation() (остановка всплытия).',
      'Делегирование: слушатель на родителе, проверка event.target.',
      'CustomEvent: создание и диспатч кастомных событий.'
    ],
    tags: ['events', 'dom', 'listeners', 'browser', 'api'],
    examples: [
      {
        title: "Базовые события",
        code: `const button = document.querySelector('button');\n\n// Подписка\nfunction handleClick(event) {\n  console.log('Clicked!', event.target);\n}\nbutton.addEventListener('click', handleClick);\n\n// Отписка (нужна та же функция)\nbutton.removeEventListener('click', handleClick);\n\n// Анонимная функция - нельзя отписаться\nbutton.addEventListener('click', () => console.log('click'));`
      },
      {
        title: "Event объект",
        code: `button.addEventListener('click', (event) => {\n  console.log(event.type); // "click"\n  console.log(event.target); // элемент, на который кликнули\n  console.log(event.currentTarget); // элемент с обработчиком\n  \n  event.preventDefault(); // отменить действие по умолчанию\n  event.stopPropagation(); // остановить всплытие\n});`
      },
      {
        title: "Делегирование событий",
        code: `// Вместо слушателя на каждом элементе\nconst list = document.querySelector('ul');\n\nlist.addEventListener('click', (event) => {\n  // Проверяем, что кликнули по элементу списка\n  if (event.target.tagName === 'LI') {\n    console.log('Clicked on:', event.target.textContent);\n  }\n});\n\n// Работает для динамически добавленных элементов!`
      },
      {
        title: "CustomEvent",
        code: `// Создание кастомного события\nconst customEvent = new CustomEvent('myEvent', {\n  detail: { message: 'Hello' }\n});\n\n// Подписка\nbutton.addEventListener('myEvent', (event) => {\n  console.log(event.detail.message); // "Hello"\n});\n\n// Диспатч\nbutton.dispatchEvent(customEvent);`
      }
    ],
    relatedTopics: ['dom-api', 'callbacks', 'functions-types', 'events-advanced']
  },
{
    id: 'history-api',
    title: 'History API',
    difficulty: 'beginner',
    description: 'History API управляет историей браузера без перезагрузки страницы. pushState добавляет запись, replaceState заменяет текущую. popstate срабатывает при навигации назад/вперед. Используется в SPA для роутинга. window.location для работы с URL.',
    keyPoints: [
      'pushState(state, title, url): добавляет запись в историю, меняет URL без перезагрузки.',
      'replaceState: заменяет текущую запись, не добавляет новую.',
      'popstate: событие при навигации назад/вперед, event.state содержит данные.',
      'Используется в SPA для роутинга без перезагрузки страницы.',
      'window.location: текущий URL, можно читать и изменять.'
    ],
    tags: ['history', 'routing', 'spa', 'browser', 'api'],
    examples: [
      {
        title: "pushState и replaceState",
        code: `// Добавить запись в историю\nhistory.pushState({ page: 1 }, 'Page 1', '/page1');\n// URL изменится на /page1, страница не перезагрузится\n\n// Заменить текущую запись\nhistory.replaceState({ page: 2 }, 'Page 2', '/page2');\n// URL изменится, но кнопка "Назад" не вернет на предыдущий URL\n\n// Получить текущее состояние\nconst state = history.state; // { page: 2 }`
      },
      {
        title: "popstate событие",
        code: `// Слушаем навигацию назад/вперед\nwindow.addEventListener('popstate', (event) => {\n  console.log('State:', event.state);\n  // Обновляем контент на основе state\n  if (event.state) {\n    loadPage(event.state.page);\n  }\n});\n\n// При клике на "Назад" сработает popstate`
      },
      {
        title: "Простой роутер",
        code: `function navigate(path) {\n  history.pushState({ path }, '', path);\n  renderPage(path);\n}\n\nwindow.addEventListener('popstate', (event) => {\n  renderPage(event.state?.path || '/');\n});\n\n// Навигация\nnavigate('/about');\n// URL: /about, страница не перезагрузилась`
      }
    ],
    relatedTopics: ['event-api', 'dom-api'],
    isFrontendEssential: true
  },
{
    id: 'file-api',
    title: 'File API',
    difficulty: 'beginner',
    description: 'File API для работы с файлами. FileReader читает файлы асинхронно. Методы: readAsText (текст), readAsDataURL (base64), readAsArrayBuffer (бинарные). События: load (успех), error (ошибка). File объект из input[type="file"], Blob для бинарных данных.',
    keyPoints: [
      'FileReader: асинхронное чтение файлов.',
      'readAsText: текст, readAsDataURL: base64, readAsArrayBuffer: бинарные данные.',
      'События: load (успех), error (ошибка), progress (прогресс).',
      'File: из input[type="file"], содержит name, size, type.',
      'Blob: бинарные данные, можно создать через new Blob([data], {type}).'
    ],
    tags: ['file', 'filereader', 'blob', 'browser', 'api'],
    examples: [
      {
        title: "Чтение текстового файла",
        code: `const input = document.querySelector('input[type="file"]');\n\ninput.addEventListener('change', (event) => {\n  const file = event.target.files[0];\n  \n  const reader = new FileReader();\n  \n  reader.onload = (e) => {\n    console.log(e.target.result); // содержимое файла\n  };\n  \n  reader.onerror = () => {\n    console.error('Error reading file');\n  };\n  \n  reader.readAsText(file);\n});`
      },
      {
        title: "Чтение изображения как base64",
        code: `function readImage(file) {\n  return new Promise((resolve, reject) => {\n    const reader = new FileReader();\n    \n    reader.onload = (e) => resolve(e.target.result);\n    reader.onerror = reject;\n    \n    reader.readAsDataURL(file);\n  });\n}\n\nconst file = input.files[0];\nconst base64 = await readImage(file);\n// "data:image/png;base64,iVBORw0KGgo..."\nimg.src = base64;`
      },
      {
        title: "Информация о файле",
        code: `const file = input.files[0];\n\nconsole.log(file.name); // "document.txt"\nconsole.log(file.size); // размер в байтах\nconsole.log(file.type); // "text/plain"\nconsole.log(file.lastModified); // timestamp\n\n// Проверка типа\nif (file.type.startsWith('image/')) {\n  console.log('Это изображение');\n}`
      }
    ],
    relatedTopics: ['promises', 'async-await', 'dom-api']
  },
{
    id: 'clipboard-api',
    title: 'Clipboard API',
    difficulty: 'beginner',
    description: 'Clipboard API для работы с буфером обмена. navigator.clipboard.writeText() копирует текст, readText() читает. Требует HTTPS и разрешения пользователя. write() для произвольных данных, read() для чтения. Используется для копирования/вставки в веб-приложениях.',
    keyPoints: [
      'navigator.clipboard.writeText(text): копирует текст в буфер.',
      'navigator.clipboard.readText(): читает текст из буфера.',
      'Требует HTTPS (кроме localhost) и разрешения пользователя.',
      'write()/read() для произвольных данных (текст, изображения).',
      'Асинхронные методы, возвращают Promise.'
    ],
    tags: ['clipboard', 'copy', 'paste', 'browser', 'api'],
    examples: [
      {
        title: "Копирование текста",
        code: `async function copyText(text) {\n  try {\n    await navigator.clipboard.writeText(text);\n    console.log('Text copied!');\n  } catch (error) {\n    console.error('Failed to copy:', error);\n  }\n}\n\n// Использование\ncopyText('Hello, World!');\n\n// Или через then\nnavigator.clipboard.writeText('Text')\n  .then(() => console.log('Copied'))\n  .catch(err => console.error(err));`
      },
      {
        title: "Чтение из буфера",
        code: `async function pasteText() {\n  try {\n    const text = await navigator.clipboard.readText();\n    console.log('Pasted:', text);\n    return text;\n  } catch (error) {\n    console.error('Failed to read:', error);\n  }\n}\n\n// Требует разрешения пользователя\npasteText();`
      },
      {
        title: "Копирование в кнопке",
        code: `const button = document.querySelector('#copyBtn');\nconst textToCopy = 'Скопируй меня!';\n\nbutton.addEventListener('click', async () => {\n  try {\n    await navigator.clipboard.writeText(textToCopy);\n    button.textContent = 'Скопировано!';\n    setTimeout(() => {\n      button.textContent = 'Копировать';\n    }, 2000);\n  } catch (error) {\n    alert('Не удалось скопировать');\n  }\n});`
      }
    ],
    relatedTopics: ['async-await', 'promises', 'dom-api'],
    isFrontendEssential: true
  },
  {
    id: 'bom-api',
    title: 'BOM (Browser Object Model)',
    difficulty: 'beginner',
    description: 'BOM (Browser Object Model) — набор объектов для работы с браузером, а не с документом. window.location управляет URL, window.history — историей навигации, navigator предоставляет информацию о браузере, screen — о экране. alert, confirm, prompt — диалоговые окна. BOM не стандартизирован полностью, поведение может отличаться в разных браузерах.',
    keyPoints: [
      'window.location: управление URL (href, pathname, search, hash, reload, replace).',
      'window.history: история навигации (back, forward, go, length).',
      'navigator: информация о браузере (userAgent, platform, language, cookieEnabled, onLine).',
      'screen: информация об экране (width, height, availWidth, availHeight, colorDepth).',
      'alert(message): диалог с сообщением, confirm(message): диалог с подтверждением, prompt(message, default): диалог с вводом.',
      'BOM не стандартизирован полностью, поведение может отличаться в браузерах.'
    ],
    tags: ['bom', 'browser-object-model', 'window', 'location', 'history', 'navigator', 'screen', 'browser', 'api'],
    examples: [
      {
        title: "window.location",
        code: `// Текущий URL
console.log(window.location.href); // "https://example.com/path?query=value#hash"
console.log(window.location.protocol); // "https:"
console.log(window.location.host); // "example.com"
console.log(window.location.pathname); // "/path"
console.log(window.location.search); // "?query=value"
console.log(window.location.hash); // "#hash"

// Изменение URL
window.location.href = 'https://example.com/new-page'; // переход
window.location.pathname = '/new-path'; // изменение пути
window.location.search = '?new=query'; // изменение query параметров
window.location.hash = '#new-hash'; // изменение hash

// Методы
window.location.reload(); // перезагрузка страницы
window.location.replace('https://example.com'); // замена без записи в историю
window.location.assign('https://example.com'); // переход с записью в историю`
      },
      {
        title: "window.history",
        code: `// Навигация по истории
window.history.back(); // назад
window.history.forward(); // вперед
window.history.go(-2); // на 2 шага назад
window.history.go(1); // на 1 шаг вперед
window.history.go(0); // перезагрузка текущей страницы

// Информация
console.log(window.history.length); // количество записей в истории

// Совместно с History API
history.pushState({ page: 1 }, 'Page 1', '/page1');
history.replaceState({ page: 2 }, 'Page 2', '/page2');

window.addEventListener('popstate', (event) => {
  console.log('State:', event.state); // данные из pushState/replaceState
});`
      },
      {
        title: "navigator",
        code: `// Информация о браузере
console.log(navigator.userAgent); // строка User-Agent
console.log(navigator.platform); // платформа (Win32, MacIntel, Linux x86_64)
console.log(navigator.language); // язык (ru, en-US)
console.log(navigator.languages); // массив языков
console.log(navigator.cookieEnabled); // включены ли cookies
console.log(navigator.onLine); // онлайн ли браузер

// Проверка возможностей
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(/* ... */);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

if ('clipboard' in navigator) {
  navigator.clipboard.writeText('text');
}`
      },
      {
        title: "screen",
        code: `// Размеры экрана
console.log(screen.width); // ширина экрана в пикселях
console.log(screen.height); // высота экрана в пикселях
console.log(screen.availWidth); // доступная ширина (без панели задач)
console.log(screen.availHeight); // доступная высота (без панели задач)
console.log(screen.colorDepth); // глубина цвета (24, 32)
console.log(screen.pixelDepth); // глубина пикселя

// Использование для адаптивности
if (screen.width < 768) {
  console.log('Mobile device');
} else if (screen.width < 1024) {
  console.log('Tablet');
} else {
  console.log('Desktop');
}

// Позиционирование окон (если разрешено)
window.open('https://example.com', '_blank', 
  \`width=800,height=600,left=\${screen.width/2 - 400},top=\${screen.height/2 - 300}\`
);`
      },
      {
        title: "Диалоговые окна",
        code: `// alert - простое сообщение
alert('Hello, World!');
// Блокирует выполнение до закрытия

// confirm - подтверждение
const confirmed = confirm('Удалить файл?');
if (confirmed) {
  console.log('Удалено');
} else {
  console.log('Отменено');
}
// Возвращает true или false

// prompt - ввод текста
const name = prompt('Введите ваше имя:', 'Гость');
if (name) {
  console.log('Привет,', name);
} else {
  console.log('Имя не введено');
}
// Возвращает строку или null

// ⚠️ Диалоги блокируют UI и выполнение кода
// Лучше использовать современные модальные окна (HTML/CSS)`
      },
      {
        title: "Практическое использование",
        code: `// Редирект на другую страницу
function redirect(url) {
  window.location.href = url;
}

// Обновление query параметров
function updateQueryParam(key, value) {
  const url = new URL(window.location);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
}

// Определение устройства
function getDeviceType() {
  const width = screen.width;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

// Проверка онлайн/офлайн
window.addEventListener('online', () => {
  console.log('Online');
});

window.addEventListener('offline', () => {
  console.log('Offline');
});

// Проверка языка
const userLang = navigator.language || navigator.userLanguage;
if (userLang.startsWith('ru')) {
  console.log('Russian interface');
}`
      }
    ],
    relatedTopics: ['dom-api', 'history-api', 'browser-api-principles'],
    isFrontendEssential: true
  }
];
