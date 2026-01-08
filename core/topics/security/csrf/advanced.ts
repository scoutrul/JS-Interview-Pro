import { Topic } from '../../../types';

export const SECURITY_CSRF_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'csrf-advanced-techniques',
    title: 'Продвинутые техники защиты',
    description: 'Продвинутые техники защиты от CSRF включают использование кастомных заголовков, идемпотентности запросов, и комбинирование различных методов для создания многоуровневой защиты.',
    difficulty: 'advanced',
    tags: ['security', 'csrf', 'advanced', 'protection', 'techniques'],
    keyPoints: [
      'Кастомные заголовки: браузер не отправляет их автоматически с кросс-сайтовых запросов.',
      'Идемпотентность: повторные запросы не должны наносить вред.',
      'Комбинирование методов: CSRF токены + SameSite + проверка Origin.',
      'Защита для SPA и API: использование заголовков вместо форм.',
      'Мониторинг и обнаружение CSRF атак.'
    ],
    examples: [
      {
        title: 'Кастомные заголовки для защиты',
        code: `// Браузер НЕ отправляет кастомные заголовки автоматически
// Это можно использовать для защиты

// Клиент всегда отправляет кастомный заголовок
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-Requested-With': 'XMLHttpRequest', // Кастомный заголовок
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify({ to: 'recipient', amount: 1000 })
});

// Сервер проверяет наличие заголовка
app.post('/transfer', (req, res) => {
  // Если заголовка нет, это может быть CSRF
  if (!req.headers['x-requested-with']) {
    return res.status(403).json({ error: 'Missing custom header' });
  }
  
  // Дополнительная проверка CSRF токена
  if (req.headers['x-csrf-token'] !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  
  processTransfer(req.body);
});

// ⚠️ Не полагаться только на кастомные заголовки
// Они могут быть обойдены в некоторых случаях
// Использовать вместе с CSRF токенами`
      },
      {
        title: 'Идемпотентность запросов',
        code: `// Идемпотентность: повторный запрос = тот же результат
// Это не защита от CSRF, но снижает ущерб

// ❌ Не идемпотентный (опасно при CSRF)
app.post('/transfer', (req, res) => {
  // Каждый запрос выполняет новый перевод
  transferMoney(req.body.to, req.body.amount);
  // Если CSRF выполнится 10 раз, будет 10 переводов! ❌
});

// ✅ Идемпотентный (меньше ущерба)
app.post('/transfer', (req, res) => {
  const transferId = generateId();
  const existing = findTransfer(transferId);
  
  if (existing) {
    // Перевод уже выполнен, возвращаем тот же результат
    return res.json(existing);
  }
  
  // Выполняем перевод только один раз
  const transfer = createTransfer(transferId, req.body);
  res.json(transfer);
});

// Или использовать PUT для обновления (идемпотентный по определению)
app.put('/transfer/:id', (req, res) => {
  // PUT идемпотентный по HTTP спецификации
  updateTransfer(req.params.id, req.body);
});`
      },
      {
        title: 'Защита для SPA и API',
        code: `// SPA часто используют API без форм
// Защита через заголовки и токены

// 1. Получение CSRF токена при загрузке приложения
async function getCSRFToken(): Promise<string> {
  const response = await fetch('/api/csrf-token', {
    credentials: 'include'
  });
  const { token } = await response.json();
  return token;
}

// 2. Хранение токена (в памяти, не в localStorage!)
let csrfToken: string | null = null;

// 3. Использование токена в запросах
async function transferMoney(to: string, amount: number) {
  if (!csrfToken) {
    csrfToken = await getCSRFToken();
  }
  
  const response = await fetch('/api/transfer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
      'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'include',
    body: JSON.stringify({ to, amount })
  });
  
  // Если токен истек, обновить
  if (response.status === 403) {
    csrfToken = await getCSRFToken();
    // Повторить запрос
    return transferMoney(to, amount);
  }
  
  return response.json();
}

// 4. Серверная проверка
app.post('/api/transfer', (req, res) => {
  // Проверка кастомного заголовка
  if (req.headers['x-requested-with'] !== 'XMLHttpRequest') {
    return res.status(403).json({ error: 'Invalid request' });
  }
  
  // Проверка CSRF токена
  if (req.headers['x-csrf-token'] !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  
  processTransfer(req.body);
});`
      },
      {
        title: 'Многоуровневая защита',
        code: `// ✅ Полная защита от CSRF

// Уровень 1: SameSite cookies
// Set-Cookie: sessionId=abc; SameSite=Lax; HttpOnly; Secure
// Блокирует автоматическую отправку cookies с кросс-сайтовых POST запросов

// Уровень 2: CSRF токены
// Уникальный токен для каждой сессии, проверяется на сервере

// Уровень 3: Проверка Origin/Referer
// Запрос должен прийти с ожидаемого домена

// Уровень 4: Кастомные заголовки
// X-Requested-With, X-CSRF-Token и т.д.

// Уровень 5: Идемпотентность
// Повторные запросы не наносят дополнительный ущерб

// Реализация на сервере
app.post('/api/transfer', (req, res) => {
  // Проверка 1: Origin
  const origin = req.headers.origin;
  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Invalid origin' });
  }
  
  // Проверка 2: Кастомный заголовок
  if (!req.headers['x-requested-with']) {
    return res.status(403).json({ error: 'Missing header' });
  }
  
  // Проверка 3: CSRF токен
  if (req.headers['x-csrf-token'] !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  
  // Проверка 4: Идемпотентность (через transfer ID)
  const transferId = req.body.transfer_id;
  if (transferId && findTransfer(transferId)) {
    return res.json({ message: 'Transfer already processed' });
  }
  
  // Все проверки пройдены ✅
  processTransfer(req.body);
});`
      }
    ],
    relatedTopics: ['csrf-tokens', 'csrf-samesite', 'csrf-origin-referer']
  },
  {
    id: 'csrf-custom-headers',
    title: 'Custom заголовки для защиты',
    description: 'Использование кастомных HTTP заголовков — это дополнительный метод защиты от CSRF. Браузер не отправляет кастомные заголовки автоматически с кросс-сайтовых запросов, что можно использовать для проверки легитимности запроса.',
    difficulty: 'advanced',
    tags: ['security', 'csrf', 'headers', 'custom-headers', 'advanced'],
    keyPoints: [
      'Браузер не отправляет кастомные заголовки автоматически.',
      'X-Requested-With — популярный заголовок для AJAX запросов.',
      'Кастомные заголовки — дополнительная защита, не основная.',
      'Могут быть обойдены в некоторых случаях (не полагаться только на них).',
      'Использовать вместе с CSRF токенами и другими методами.'
    ],
    examples: [
      {
        title: 'Использование X-Requested-With',
        code: `// Клиент всегда отправляет заголовок
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-Requested-With': 'XMLHttpRequest' // Кастомный заголовок
  },
  body: JSON.stringify({ to: 'recipient', amount: 1000 })
});

// Сервер проверяет наличие заголовка
app.post('/transfer', (req, res) => {
  if (req.headers['x-requested-with'] !== 'XMLHttpRequest') {
    // Заголовка нет - возможно CSRF атака
    return res.status(403).json({ error: 'Invalid request' });
  }
  
  // Дополнительные проверки...
  processTransfer(req.body);
});

// ⚠️ Не полагаться только на этот заголовок
// Некоторые браузеры/расширения могут его добавлять
// Использовать вместе с CSRF токенами`
      },
      {
        title: 'Комбинирование кастомных заголовков',
        code: `// Использование нескольких кастомных заголовков

// Клиент
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': csrfToken,
    'X-Client-Version': '1.0.0',
    'X-Request-ID': generateRequestId()
  },
  body: JSON.stringify({ to: 'recipient', amount: 1000 })
});

// Сервер проверяет все заголовки
app.post('/transfer', (req, res) => {
  // Проверка 1: X-Requested-With
  if (req.headers['x-requested-with'] !== 'XMLHttpRequest') {
    return res.status(403).json({ error: 'Missing X-Requested-With' });
  }
  
  // Проверка 2: X-CSRF-Token
  if (req.headers['x-csrf-token'] !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  
  // Проверка 3: X-Client-Version (опционально)
  const clientVersion = req.headers['x-client-version'];
  if (clientVersion && !allowedVersions.includes(clientVersion)) {
    return res.status(403).json({ error: 'Invalid client version' });
  }
  
  // Все проверки пройдены
  processTransfer(req.body);
});`
      }
    ],
    relatedTopics: ['csrf-advanced-techniques', 'csrf-tokens']
  },
  {
    id: 'csrf-idempotency',
    title: 'Идемпотентность запросов',
    description: 'Идемпотентность — это свойство операции, при котором повторное выполнение дает тот же результат. Хотя идемпотентность не защищает от CSRF напрямую, она снижает ущерб от успешной CSRF атаки, так как повторные запросы не наносят дополнительного вреда.',
    difficulty: 'advanced',
    tags: ['security', 'csrf', 'idempotency', 'http', 'advanced'],
    keyPoints: [
      'Идемпотентность: повторный запрос = тот же результат.',
      'GET, PUT, DELETE должны быть идемпотентными по HTTP спецификации.',
      'POST не обязательно идемпотентный (но можно сделать).',
      'Использование уникальных ID для операций (transfer_id, order_id).',
      'Идемпотентность снижает ущерб, но не заменяет CSRF защиту.'
    ],
    examples: [
      {
        title: 'Идемпотентные операции',
        code: `// ✅ Идемпотентный: повторный запрос безопасен
app.post('/transfer', (req, res) => {
  const transferId = req.body.transfer_id || generateId();
  
  // Проверяем, не выполнен ли уже перевод
  const existing = findTransfer(transferId);
  if (existing) {
    // Перевод уже выполнен, возвращаем тот же результат
    return res.json({
      id: transferId,
      status: 'completed',
      ...existing
    });
  }
  
  // Выполняем перевод только если еще не выполнен
  const transfer = createTransfer(transferId, req.body);
  res.json(transfer);
});

// Теперь даже если CSRF выполнится 10 раз:
// - Первый запрос выполнит перевод
// - Остальные 9 вернут тот же результат
// - Ущерб только от одного перевода ✅

// ❌ Не идемпотентный (опасно)
app.post('/transfer', (req, res) => {
  // Каждый запрос выполняет новый перевод
  transferMoney(req.body.to, req.body.amount);
  // 10 CSRF запросов = 10 переводов! ❌
});`
      },
      {
        title: 'Использование HTTP методов правильно',
        code: `// GET - идемпотентный по определению
app.get('/user/:id', (req, res) => {
  // Всегда возвращает те же данные
  res.json(getUser(req.params.id));
});

// PUT - идемпотентный по определению
app.put('/user/:id', (req, res) => {
  // Повторный запрос дает тот же результат
  updateUser(req.params.id, req.body);
  res.json(getUser(req.params.id));
});

// DELETE - идемпотентный по определению
app.delete('/user/:id', (req, res) => {
  // Повторное удаление безопасно
  deleteUser(req.params.id);
  res.status(204).send();
});

// POST - не обязательно идемпотентный
// Но можно сделать идемпотентным через ID
app.post('/transfer', (req, res) => {
  const transferId = req.body.transfer_id || generateId();
  // Делаем идемпотентным через проверку ID
  const existing = findTransfer(transferId);
  if (existing) return res.json(existing);
  
  createTransfer(transferId, req.body);
  res.json(getTransfer(transferId));
});`
      }
    ],
    relatedTopics: ['csrf-advanced-techniques', 'csrf-get-requests']
  }
];
