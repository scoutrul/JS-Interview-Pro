import { Topic } from '../../../types';

export const SECURITY_CORS_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'cors-why-blocks',
    title: 'Почему браузер блокирует запросы на другой домен',
    description: 'Браузер блокирует кросс-доменные запросы из-за Same-Origin Policy — механизма безопасности, который предотвращает доступ к ресурсам с других доменов. Это защищает пользователей от утечки данных и несанкционированного доступа.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'cors', 'same-origin-policy', 'browser', 'front-end-essential'],
    keyPoints: [
      'Same-Origin Policy защищает от утечки данных между разными сайтами.',
      'Без CORS злоумышленник не может прочитать ответ от другого домена.',
      'Но запрос все равно может быть отправлен (CSRF).',
      'CORS позволяет серверу явно разрешить чтение ответа.',
      'Сервер должен проверять Origin, даже если CORS разрешен.'
    ],
    examples: [
      {
        title: 'Как работает блокировка',
        code: `// example.com пытается запросить api.example.com
fetch('https://api.example.com/data')
  .then(r => r.json())
  .then(data => console.log(data));

// 1. Браузер отправляет запрос на api.example.com
// 2. Сервер обрабатывает запрос и отправляет ответ
// 3. Браузер проверяет CORS заголовки
// 4. Если заголовков нет или origin не разрешен:
//    - Браузер блокирует чтение ответа
//    - Ошибка в консоли
//    - Но запрос УЖЕ выполнен на сервере!

// ⚠️ Важно: блокируется только ЧТЕНИЕ ответа
// Запрос может быть выполнен (если это POST/PUT/DELETE)`
      }
    ],
    relatedTopics: ['cors-basics', 'cors-same-origin', 'csrf-basics']
  },
  {
    id: 'cors-simple-preflight',
    title: 'Разница между простыми (simple) и сложными (preflight) запросами',
    description: 'Простые запросы (simple requests) выполняются сразу, без предварительного OPTIONS запроса. Сложные запросы (preflight requests) требуют предварительного OPTIONS запроса для проверки разрешений. Браузер автоматически определяет тип запроса.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'cors', 'simple', 'preflight', 'requests', 'front-end-essential'],
    keyPoints: [
      'Простые запросы: GET, HEAD, POST (с простыми заголовками и Content-Type).',
      'Сложные запросы: требуют предварительного OPTIONS запроса (preflight).',
      'Preflight выполняется автоматически браузером перед основным запросом.',
      'Сложные запросы: кастомные заголовки, PUT/DELETE, сложный Content-Type.',
      'Понимание разницы критично для настройки CORS на сервере.'
    ],
    examples: [
      {
        title: 'Простые запросы',
        code: `// ✅ Простые запросы (без preflight):
// 1. GET запрос
fetch('https://api.example.com/data');

// 2. HEAD запрос
fetch('https://api.example.com/data', { method: 'HEAD' });

// 3. POST с простым Content-Type
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'key=value'
});

// Эти запросы выполняются сразу, без OPTIONS`
      },
      {
        title: 'Сложные запросы (preflight)',
        code: `// ❌ Сложные запросы (требуют preflight):

// 1. Кастомные заголовки
fetch('https://api.example.com/data', {
  headers: {
    'X-Custom-Header': 'value' // Кастомный заголовок
  }
});

// 2. PUT/DELETE методы
fetch('https://api.example.com/data', {
  method: 'PUT'
});

// 3. Сложный Content-Type
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json' // Сложный Content-Type
  },
  body: JSON.stringify({ key: 'value' })
});

// Браузер сначала отправляет OPTIONS запрос (preflight):
// OPTIONS /data
// Origin: https://example.com
// Access-Control-Request-Method: PUT
// Access-Control-Request-Headers: X-Custom-Header

// Сервер должен ответить:
// Access-Control-Allow-Origin: https://example.com
// Access-Control-Allow-Methods: PUT
// Access-Control-Allow-Headers: X-Custom-Header

// Только после этого выполняется основной запрос`
      }
    ],
    relatedTopics: ['cors-preflight', 'cors-headers', 'cors-credentials']
  },
  {
    id: 'cors-preflight',
    title: 'Preflight запросы (OPTIONS)',
    description: 'Preflight запрос — это автоматический OPTIONS запрос, который браузер отправляет перед сложными кросс-доменными запросами. Сервер должен ответить правильными CORS заголовками, чтобы браузер разрешил основной запрос.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'cors', 'preflight', 'options', 'front-end-essential'],
    keyPoints: [
      'Preflight — это автоматический OPTIONS запрос перед сложным запросом.',
      'Браузер отправляет Access-Control-Request-Method и Access-Control-Request-Headers.',
      'Сервер должен ответить Access-Control-Allow-Methods и Access-Control-Allow-Headers.',
      'Если preflight не прошел, основной запрос не выполняется.',
      'Preflight кэшируется браузером (Access-Control-Max-Age).'
    ],
    examples: [
      {
        title: 'Как работает preflight',
        code: `// Клиент отправляет сложный запрос
fetch('https://api.example.com/data', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'value'
  },
  body: JSON.stringify({ key: 'value' })
});

// 1. Браузер автоматически отправляет OPTIONS (preflight):
// OPTIONS /data HTTP/1.1
// Origin: https://example.com
// Access-Control-Request-Method: PUT
// Access-Control-Request-Headers: content-type, x-custom-header

// 2. Сервер должен ответить:
// HTTP/1.1 200 OK
// Access-Control-Allow-Origin: https://example.com
// Access-Control-Allow-Methods: PUT
// Access-Control-Allow-Headers: content-type, x-custom-header
// Access-Control-Max-Age: 86400

// 3. Если preflight успешен, браузер отправляет основной запрос:
// PUT /data HTTP/1.1
// Origin: https://example.com
// Content-Type: application/json
// X-Custom-Header: value

// 4. Сервер обрабатывает запрос и отвечает:
// Access-Control-Allow-Origin: https://example.com`
      },
      {
        title: 'Обработка preflight на сервере',
        code: `// Express middleware для CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Разрешенные origins
  const allowedOrigins = ['https://example.com', 'https://app.example.com'];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Обработка preflight
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Custom-Header');
      res.header('Access-Control-Max-Age', '86400'); // Кэш на 24 часа
      return res.status(204).send(); // Пустой ответ для OPTIONS
    }
  }
  
  next();
});

// Или использовать готовую библиотеку:
const cors = require('cors');
app.use(cors({
  origin: ['https://example.com', 'https://app.example.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header']
}));`
      }
    ],
    relatedTopics: ['cors-simple-preflight', 'cors-headers', 'cors-credentials']
  },
  {
    id: 'cors-headers',
    title: 'Заголовки CORS: Access-Control-Allow-Origin, Access-Control-Allow-Methods',
    description: 'CORS заголовки позволяют серверу контролировать, какие origins, методы и заголовки разрешены для кросс-доменных запросов. Основные заголовки: Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'cors', 'headers', 'access-control', 'front-end-essential'],
    keyPoints: [
      'Access-Control-Allow-Origin: разрешенный origin (или * для всех).',
      'Access-Control-Allow-Methods: разрешенные HTTP методы (для preflight).',
      'Access-Control-Allow-Headers: разрешенные заголовки (для preflight).',
      'Access-Control-Allow-Credentials: разрешает отправку cookies (требует конкретный origin, не *).',
      'Access-Control-Max-Age: время кэширования preflight ответа.'
    ],
    examples: [
      {
        title: 'Основные CORS заголовки',
        code: `// 1. Access-Control-Allow-Origin
// Разрешает конкретный origin
res.header('Access-Control-Allow-Origin', 'https://example.com');

// Или все origins (небезопасно, не использовать с credentials!)
res.header('Access-Control-Allow-Origin', '*');

// 2. Access-Control-Allow-Methods
// Для preflight запросов
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

// 3. Access-Control-Allow-Headers
// Для preflight запросов
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

// 4. Access-Control-Allow-Credentials
// Разрешает отправку cookies (требует конкретный origin!)
res.header('Access-Control-Allow-Credentials', 'true');
// НЕ работает с Access-Control-Allow-Origin: *

// 5. Access-Control-Max-Age
// Кэширование preflight (в секундах)
res.header('Access-Control-Max-Age', '86400'); // 24 часа`
      },
      {
        title: 'Правильная настройка CORS',
        code: `// ✅ Правильная настройка CORS

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = ['https://example.com', 'https://app.example.com'];
  
  if (origin && allowedOrigins.includes(origin)) {
    // Конкретный origin (обязательно для credentials)
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Для preflight
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Max-Age', '86400');
      return res.status(204).send();
    }
  }
  
  next();
});

// ❌ НЕПРАВИЛЬНО:
// res.header('Access-Control-Allow-Origin', '*');
// res.header('Access-Control-Allow-Credentials', 'true');
// Нельзя использовать * с credentials!`
      }
    ],
    relatedTopics: ['cors-preflight', 'cors-credentials', 'cors-simple-preflight']
  },
  {
    id: 'cors-credentials',
    title: 'Credentials и withCredentials (когда нужны)',
    description: 'Credentials (cookies, authorization headers) отправляются с кросс-доменными запросами только если сервер явно разрешил это через Access-Control-Allow-Credentials: true. На клиенте нужно указать credentials: \'include\' в fetch или withCredentials: true в XMLHttpRequest.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'cors', 'credentials', 'cookies', 'front-end-essential'],
    keyPoints: [
      'Credentials включают cookies, authorization headers, TLS client certificates.',
      'Сервер должен отправить Access-Control-Allow-Credentials: true.',
      'С credentials нельзя использовать Access-Control-Allow-Origin: *.',
      'На клиенте: credentials: \'include\' в fetch или withCredentials: true в XHR.',
      'Credentials критичны для аутентификации через cookies.'
    ],
    examples: [
      {
        title: 'Использование credentials',
        code: `// Клиент: отправка cookies с запросом
fetch('https://api.example.com/data', {
  credentials: 'include' // Отправляет cookies
})
  .then(r => r.json())
  .then(data => console.log(data));

// Или в XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.withCredentials = true; // Отправляет cookies
xhr.open('GET', 'https://api.example.com/data');
xhr.send();

// Сервер ДОЛЖЕН разрешить:
// Access-Control-Allow-Origin: https://example.com (конкретный origin!)
// Access-Control-Allow-Credentials: true

// ❌ НЕ работает:
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Credentials: true
// Браузер отклонит запрос!`
      },
      {
        title: 'Практика: "Когда нужны credentials?"',
        code: `// ✅ Credentials нужны когда:
// 1. Используется аутентификация через cookies
fetch('/api/user', {
  credentials: 'include' // Отправляет session cookie
});

// 2. Нужны authorization headers
fetch('/api/data', {
  credentials: 'include',
  headers: {
    'Authorization': 'Bearer token' // Отправляется с credentials
  }
});

// ❌ Credentials НЕ нужны когда:
// 1. Используется токен в заголовке (не cookie)
fetch('/api/data', {
  headers: {
    'Authorization': 'Bearer token' // Не требует credentials
  }
});

// 2. Публичные API без аутентификации
fetch('/api/public-data'); // Без credentials`
      }
    ],
    relatedTopics: ['cors-headers', 'cors-preflight', 'cookies-basics']
  },
  {
    id: 'cors-server-client',
    title: 'CORS на сервере vs клиенте',
    description: 'CORS настраивается на сервере через HTTP заголовки. Клиент не может обойти CORS ограничения — это механизм безопасности браузера. Клиент может только отправлять запросы и обрабатывать ответы, но не может изменить CORS политику.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'cors', 'server', 'client', 'configuration', 'front-end-essential'],
    keyPoints: [
      'CORS настраивается ТОЛЬКО на сервере через HTTP заголовки.',
      'Клиент не может обойти CORS — это защита браузера.',
      'Клиент может только отправлять запросы и обрабатывать ответы.',
      'Сервер должен проверять Origin, даже если CORS разрешен.',
      'CORS не защищает от атак, только контролирует доступ.'
    ],
    examples: [
      {
        title: 'Настройка CORS на сервере',
        code: `// ✅ На сервере (Node.js/Express)
const express = require('express');
const app = express();

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = ['https://example.com'];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return res.status(204).send();
    }
  }
  
  next();
});

// Или готовый middleware
const cors = require('cors');
app.use(cors({
  origin: 'https://example.com',
  credentials: true
}));`
      },
      {
        title: 'Что может клиент',
        code: `// ✅ Клиент может:
// 1. Отправлять запросы
fetch('https://api.example.com/data', {
  credentials: 'include'
});

// 2. Обрабатывать ответы
fetch('https://api.example.com/data')
  .then(r => r.json())
  .then(data => console.log(data));

// ❌ Клиент НЕ может:
// 1. Обойти CORS (браузер блокирует)
// 2. Изменить CORS заголовки
// 3. Заставить сервер разрешить запрос

// Если CORS не настроен на сервере:
// - Запрос может быть отправлен
// - Но ответ будет заблокирован браузером
// - Ошибка в консоли`
      },
      {
        title: 'Важно: сервер ДОЛЖЕН проверять Origin',
        code: `// ⚠️ CORS заголовки — это только контроль доступа
// Сервер ДОЛЖЕН сам проверять Origin!

// ❌ НЕПРАВИЛЬНО: только CORS заголовки
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Разрешает все
  next();
});

// Запросы с любых доменов будут разрешены!
// Злоумышленник может отправить запрос

// ✅ ПРАВИЛЬНО: CORS + проверка Origin
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = ['https://example.com'];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  // Дополнительная проверка на сервере
  if (!origin || !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Invalid origin' });
  }
  
  next();
});`
      }
    ],
    relatedTopics: ['cors-basics', 'cors-headers', 'csrf-basics']
  }
];
