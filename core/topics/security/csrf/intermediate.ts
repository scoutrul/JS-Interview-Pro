import { Topic } from '../../../types';

export const SECURITY_CSRF_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'csrf-tokens',
    title: 'CSRF токены (синхронизированные токены) — как работают',
    description: 'CSRF токены — это основной механизм защиты от CSRF атак. Сервер генерирует уникальный токен для каждой сессии, клиент включает его в запросы, и сервер проверяет его валидность. Злоумышленник не может узнать токен из-за Same-Origin Policy.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'csrf', 'tokens', 'protection', 'front-end-essential'],
    keyPoints: [
      'Сервер генерирует уникальный CSRF токен для каждой сессии.',
      'Токен включается в формы и AJAX запросы.',
      'Сервер проверяет токен при каждом запросе, изменяющем состояние.',
      'Злоумышленник не может узнать токен (Same-Origin Policy).',
      'Токен должен быть криптографически случайным и привязан к сессии.'
    ],
    examples: [
      {
        title: 'Базовая реализация CSRF токена',
        code: `// 1. Сервер генерирует токен при создании сессии
const csrfToken = crypto.randomBytes(32).toString('hex');
req.session.csrfToken = csrfToken;

// 2. Сервер отправляет токен клиенту (в форме или через API)
// В HTML форме:
<form action="/transfer" method="POST">
  <input type="hidden" name="csrf_token" value="\${csrfToken}">
  <input type="text" name="to" placeholder="Recipient">
  <input type="number" name="amount" placeholder="Amount">
  <button type="submit">Transfer</button>
</form>

// 3. Клиент отправляет токен с запросом
// (автоматически в форме, или вручную в fetch)

// 4. Сервер проверяет токен
app.post('/transfer', (req, res) => {
  const token = req.body.csrf_token;
  if (token !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  // Токен валиден, выполняем действие
  processTransfer(req.body);
});`
      },
      {
        title: 'CSRF токен в AJAX запросах',
        code: `// Получение токена при загрузке страницы
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

// Или через API
const response = await fetch('/api/csrf-token');
const { token } = await response.json();

// Использование в fetch запросах
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken // В заголовке
  },
  credentials: 'include', // Для отправки cookies
  body: JSON.stringify({
    to: 'recipient',
    amount: 1000
  })
});

// Или в теле запроса
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  body: JSON.stringify({
    csrf_token: csrfToken, // В теле
    to: 'recipient',
    amount: 1000
  })
});`
      },
      {
        title: 'Практика: "Как защитить форму перевода денег от CSRF?"',
        code: `// ✅ Полная защита от CSRF

// 1. CSRF токен в форме
<form action="/transfer" method="POST">
  <input type="hidden" name="csrf_token" value="\${csrfToken}">
  <!-- остальные поля -->
</form>

// 2. SameSite=Strict cookies (дополнительная защита)
// Set-Cookie: sessionId=abc; SameSite=Strict; HttpOnly; Secure

// 3. Проверка Origin header на сервере
app.post('/transfer', (req, res) => {
  const origin = req.headers.origin;
  const allowedOrigins = ['https://trusted-domain.com'];
  
  if (!allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Invalid origin' });
  }
  
  // Проверка CSRF токена
  if (req.body.csrf_token !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  
  // Все проверки пройдены ✅
  processTransfer(req.body);
});

// Многоуровневая защита:
// 1. CSRF токен (основная защита)
// 2. SameSite cookies (дополнительная)
// 3. Проверка Origin (дополнительная)`
      }
    ],
    relatedTopics: ['csrf-basics', 'csrf-samesite', 'cookies-samesite']
  },
  {
    id: 'csrf-samesite',
    title: 'SameSite cookies (Strict, Lax, None)',
    description: 'SameSite атрибут cookies контролирует, когда cookies отправляются с кросс-сайтовыми запросами. SameSite=Strict полностью блокирует отправку cookies с кросс-сайтовых запросов, что защищает от CSRF атак.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'csrf', 'samesite', 'cookies', 'front-end-essential'],
    keyPoints: [
      'SameSite=Strict: cookies НЕ отправляются с кросс-сайтовых запросов (максимальная защита).',
      'SameSite=Lax: cookies отправляются только с GET запросами при навигации (компромисс).',
      'SameSite=None: cookies всегда отправляются (требует Secure флаг).',
      'SameSite=Strict защищает от CSRF, но может ломать функциональность.',
      'SameSite=Lax — хороший компромисс между безопасностью и UX.'
    ],
    examples: [
      {
        title: 'SameSite значения',
        code: `// SameSite=Strict - максимальная защита
// Set-Cookie: sessionId=abc; SameSite=Strict; HttpOnly; Secure

// Cookies НЕ отправляются с кросс-сайтовых запросов
// Защита от CSRF ✅
// Но может ломать функциональность (OAuth redirects, внешние ссылки)

// SameSite=Lax - компромисс (рекомендуется)
// Set-Cookie: sessionId=abc; SameSite=Lax; HttpOnly; Secure

// Cookies отправляются:
// ✅ При навигации (переход по ссылке)
// ✅ С GET запросами при навигации
// ❌ НЕ отправляются с POST/PUT/DELETE кросс-сайтовых запросов
// ❌ НЕ отправляются с AJAX запросами с других доменов

// Защита от CSRF для POST/PUT/DELETE ✅
// Сохранение функциональности для навигации ✅

// SameSite=None - cookies всегда отправляются
// Set-Cookie: sessionId=abc; SameSite=None; Secure; HttpOnly

// Требует Secure флаг (только HTTPS)
// Используется для iframe, внешних виджетов
// НЕ защищает от CSRF ❌`
      },
      {
        title: 'Практическое использование',
        code: `// ✅ Рекомендуемая конфигурация для большинства случаев
// Set-Cookie: sessionId=abc; SameSite=Lax; HttpOnly; Secure

// Защита от CSRF для POST/PUT/DELETE ✅
// Работают внешние ссылки ✅
// Работают OAuth redirects ✅

// Для API, которые используются из iframe
// Set-Cookie: sessionId=abc; SameSite=None; Secure; HttpOnly

// Для максимальной защиты (если не нужны внешние ссылки)
// Set-Cookie: sessionId=abc; SameSite=Strict; HttpOnly; Secure

// Пример настройки в Express
app.use(session({
  cookie: {
    sameSite: 'lax', // или 'strict', 'none'
    secure: true,    // обязательно для SameSite=None и рекомендуется для других
    httpOnly: true
  }
}));`
      },
      {
        title: 'SameSite и CSRF защита',
        code: `// SameSite=Lax защищает от CSRF для POST/PUT/DELETE

// Пример CSRF атаки с SameSite=Lax:
// evil.com пытается отправить POST запрос на bank.com

fetch('https://bank.com/transfer', {
  method: 'POST',
  credentials: 'include', // Пытается отправить cookies
  body: JSON.stringify({ to: 'attacker', amount: 1000 })
});

// ❌ Cookies НЕ отправляются (SameSite=Lax блокирует)
// Сервер не видит сессию, запрос отклоняется ✅

// Но GET запросы при навигации работают:
// <a href="https://bank.com/profile">Link</a>
// ✅ Cookies отправляются (это нормально, GET безопасен)

// Для полной защиты комбинировать:
// 1. SameSite=Lax (или Strict)
// 2. CSRF токены (для дополнительной защиты)
// 3. Проверка Origin header`
      }
    ],
    relatedTopics: ['csrf-tokens', 'cookies-samesite', 'cookies-basics']
  },
  {
    id: 'csrf-origin-referer',
    title: 'Проверка Origin/Referer заголовков',
    description: 'Проверка Origin и Referer заголовков — это дополнительный уровень защиты от CSRF. Сервер проверяет, что запрос пришел с ожидаемого домена. Это не основная защита, но хорошее дополнение к CSRF токенам.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'csrf', 'origin', 'referer', 'headers', 'front-end-essential'],
    keyPoints: [
      'Origin заголовок указывает домен, с которого отправлен запрос.',
      'Referer заголовок указывает полный URL источника запроса.',
      'Сервер проверяет, что Origin/Referer соответствует ожидаемому домену.',
      'Origin более надежен (не может быть изменен браузером).',
      'Проверка заголовков — дополнительная защита, не заменяет CSRF токены.'
    ],
    examples: [
      {
        title: 'Проверка Origin заголовка',
        code: `// На сервере
app.post('/transfer', (req, res) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://trusted-domain.com',
    'https://www.trusted-domain.com'
  ];
  
  // Проверка Origin
  if (!origin || !allowedOrigins.includes(origin)) {
    return res.status(403).json({ 
      error: 'Invalid origin',
      received: origin 
    });
  }
  
  // Origin валиден, продолжаем обработку
  processTransfer(req.body);
});

// ❌ Запрос с evil.com будет отклонен
// fetch('https://bank.com/transfer', { ... })
// Origin: https://evil.com
// Сервер вернет 403 ✅

// ✅ Запрос с trusted-domain.com пройдет
// fetch('https://bank.com/transfer', { ... })
// Origin: https://trusted-domain.com
// Сервер обработает запрос ✅`
      },
      {
        title: 'Проверка Referer заголовка',
        code: `// Referer содержит полный URL источника
// Referer: https://trusted-domain.com/page

app.post('/transfer', (req, res) => {
  const referer = req.headers.referer;
  
  if (!referer) {
    // Referer может отсутствовать (privacy settings, HTTPS->HTTP)
    // Не полагаться только на Referer
    return res.status(403).json({ error: 'Missing referer' });
  }
  
  const refererUrl = new URL(referer);
  const allowedDomains = ['trusted-domain.com', 'www.trusted-domain.com'];
  
  if (!allowedDomains.includes(refererUrl.hostname)) {
    return res.status(403).json({ error: 'Invalid referer' });
  }
  
  // Referer валиден
  processTransfer(req.body);
});

// ⚠️ Referer может отсутствовать:
// - При переходе с HTTPS на HTTP
// - При privacy settings браузера
// - При некоторых redirects
// Поэтому не полагаться только на Referer`
      },
      {
        title: 'Комбинирование проверок',
        code: `// ✅ Полная защита от CSRF

app.post('/transfer', (req, res) => {
  // 1. Проверка Origin (предпочтительно)
  const origin = req.headers.origin;
  const allowedOrigins = ['https://trusted-domain.com'];
  
  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Invalid origin' });
  }
  
  // 2. Проверка Referer (fallback, если Origin отсутствует)
  if (!origin) {
    const referer = req.headers.referer;
    if (referer) {
      const refererUrl = new URL(referer);
      if (!allowedOrigins.some(allowed => 
        refererUrl.hostname === new URL(allowed).hostname
      )) {
        return res.status(403).json({ error: 'Invalid referer' });
      }
    }
  }
  
  // 3. Проверка CSRF токена (основная защита)
  if (req.body.csrf_token !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  
  // Все проверки пройдены ✅
  processTransfer(req.body);
});

// Многоуровневая защита:
// 1. CSRF токен (основная)
// 2. SameSite cookies (дополнительная)
// 3. Проверка Origin/Referer (дополнительная)`
      }
    ],
    relatedTopics: ['csrf-tokens', 'csrf-samesite', 'cors-basics']
  },
  {
    id: 'csrf-double-submit',
    title: 'Double Submit Cookie pattern',
    description: 'Double Submit Cookie — это альтернативный метод защиты от CSRF, при котором CSRF токен хранится и в cookie, и в теле запроса (или заголовке). Сервер сравнивает значения — если они совпадают, запрос легитимный.',
    difficulty: 'intermediate',
    tags: ['security', 'csrf', 'double-submit', 'cookies', 'pattern'],
    keyPoints: [
      'Токен хранится в cookie (HttpOnly не нужен, так как JS должен читать).',
      'Токен также отправляется в теле запроса или заголовке.',
      'Сервер сравнивает значения из cookie и запроса.',
      'Злоумышленник не может прочитать cookie (Same-Origin Policy).',
      'Менее надежен, чем синхронизированные токены, но проще в реализации.'
    ],
    examples: [
      {
        title: 'Реализация Double Submit Cookie',
        code: `// 1. Сервер устанавливает cookie с токеном
// Set-Cookie: csrf-token=abc123; SameSite=Lax; Secure

// 2. Клиент читает токен из cookie
function getCookie(name: string): string | null {
  const value = \`; \${document.cookie}\`;
  const parts = value.split(\`; \${name}=\`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

const csrfToken = getCookie('csrf-token');

// 3. Клиент отправляет токен в заголовке
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken // Тот же токен из cookie
  },
  credentials: 'include', // Отправляет cookie
  body: JSON.stringify({ to: 'recipient', amount: 1000 })
});

// 4. Сервер сравнивает значения
app.post('/transfer', (req, res) => {
  const cookieToken = req.cookies['csrf-token'];
  const headerToken = req.headers['x-csrf-token'];
  
  if (!cookieToken || cookieToken !== headerToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  
  // Токены совпадают ✅
  processTransfer(req.body);
});`
      },
      {
        title: 'Сравнение с синхронизированными токенами',
        code: `// Синхронизированные токены (более надежно):
// - Токен хранится на сервере в сессии
// - Токен привязан к конкретной сессии
// - Злоумышленник не может подделать токен

// Double Submit Cookie (проще, но менее надежно):
// - Токен в cookie (может быть прочитан, если нет HttpOnly)
// - Токен не привязан к сессии на сервере
// - Если злоумышленник может установить cookie, может подделать

// ✅ Рекомендуется: синхронизированные токены
// ⚠️ Double Submit Cookie: только если синхронизированные токены невозможны`
      }
    ],
    relatedTopics: ['csrf-tokens', 'csrf-samesite', 'cookies-basics']
  }
];
