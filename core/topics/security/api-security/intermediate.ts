import { Topic } from '../../../types';

export const SECURITY_API_SECURITY_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'api-security-rate-limiting',
    title: 'Rate limiting на клиенте (защита от перебора)',
    description: 'Rate limiting на клиенте ограничивает количество запросов к API для защиты от перебора и злоупотребления. Это дополнительная защита на клиенте, но основная защита должна быть на сервере.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'api', 'rate-limiting', 'throttling', 'front-end-essential'],
    keyPoints: [
      'Rate limiting ограничивает количество запросов за период времени.',
      'На клиенте: защита от случайного перебора, улучшение UX.',
      'Основная защита должна быть на сервере (клиентская только для UX).',
      'Использовать debounce/throttle для ограничения запросов.',
      'Обработка ошибок 429 (Too Many Requests).'
    ],
    examples: [
      {
        title: 'Rate limiting на клиенте',
        code: `// Простой rate limiter
class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async check(): Promise<boolean> {
    const now = Date.now();
    this.requests = this.requests.filter(
      time => now - time < this.windowMs
    );

    if (this.requests.length >= this.maxRequests) {
      return false; // Лимит превышен
    }

    this.requests.push(now);
    return true;
  }
}

// Использование
const limiter = new RateLimiter(10, 60000); // 10 запросов в минуту

async function makeRequest() {
  if (!(await limiter.check())) {
    throw new Error('Rate limit exceeded');
  }

  const response = await fetch('/api/data');
  
  if (response.status === 429) {
    // Сервер тоже ограничил
    const retryAfter = response.headers.get('Retry-After');
    await new Promise(resolve => 
      setTimeout(resolve, parseInt(retryAfter || '60') * 1000)
    );
    return makeRequest();
  }

  return response.json();
}

// ⚠️ Важно: это только для UX!
// Реальная защита должна быть на сервере!`
      }
    ],
    relatedTopics: ['api-security-basics', 'api-security-validation']
  },
  {
    id: 'api-security-validation',
    title: 'Валидация данных на клиенте',
    description: 'Валидация данных на клиенте проверяет входные данные перед отправкой на сервер. Это улучшает UX и снижает нагрузку на сервер, но не заменяет валидацию на сервере.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'api', 'validation', 'input-validation', 'front-end-essential'],
    keyPoints: [
      'Валидация на клиенте: проверка формата, типа, длины данных.',
      'Улучшает UX (быстрая обратная связь).',
      'НЕ заменяет валидацию на сервере (можно обойти).',
      'Использовать библиотеки валидации (Yup, Zod, Joi).',
      'Валидация должна быть на клиенте И сервере.'
    ],
    examples: [
      {
        title: 'Валидация на клиенте',
        code: `// Валидация email
function validateEmail(email: string): boolean {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}

// Валидация перед отправкой
async function submitForm(data: FormData) {
  // Валидация на клиенте
  if (!validateEmail(data.email)) {
    showError('Invalid email');
    return;
  }

  if (data.password.length < 8) {
    showError('Password must be at least 8 characters');
    return;
  }

  // Отправка на сервер
  const response = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  // Сервер тоже валидирует!
  if (response.status === 400) {
    const { errors } = await response.json();
    showErrors(errors);
  }
}

// ⚠️ Важно: валидация на клиенте только для UX!
// Сервер ДОЛЖЕН валидировать все данные!`
      }
    ],
    relatedTopics: ['api-security-basics', 'xss-basics']
  },
  {
    id: 'api-security-injections',
    title: 'Защита от инъекций (SQL, NoSQL, Command)',
    description: 'Инъекции — это уязвимости, при которых злоумышленник внедряет вредоносный код (SQL, NoSQL, команды) через входные данные. На клиенте важно валидировать и санитизировать данные перед отправкой.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'api', 'injections', 'sql', 'nosql', 'command', 'front-end-essential'],
    keyPoints: [
      'SQL инъекции: внедрение SQL кода через входные данные.',
      'NoSQL инъекции: внедрение NoSQL кода (MongoDB, etc.).',
      'Command инъекции: внедрение команд операционной системы.',
      'На клиенте: валидация и санитизация данных.',
      'Основная защита на сервере: параметризованные запросы, валидация.'
    ],
    examples: [
      {
        title: 'Защита от инъекций',
        code: `// ❌ Уязвимый код (на сервере):
// const query = \`SELECT * FROM users WHERE id = \${userId}\`;
// Если userId = "1 OR 1=1", выполнится: SELECT * FROM users WHERE id = 1 OR 1=1

// ✅ На клиенте: валидация и санитизация
function sanitizeInput(input: string): string {
  // Удаление опасных символов
  return input.replace(/[;'\"\\\\]/g, '');
}

function validateUserId(userId: string): boolean {
  // Только числа
  return /^\\d+$/.test(userId);
}

const userId = sanitizeInput(userInput);
if (!validateUserId(userId)) {
  showError('Invalid user ID');
  return;
}

// Отправка валидированных данных
fetch(\`/api/user/\${userId}\`);

// ⚠️ Важно: это только дополнительная защита!
// Основная защита должна быть на сервере:
// - Параметризованные запросы
// - Валидация всех входных данных
// - Экранирование специальных символов`
      }
    ],
    relatedTopics: ['api-security-validation', 'owasp-injections']
  },
  {
    id: 'api-security-versioning',
    title: 'API версионирование и безопасность',
    description: 'API версионирование позволяет обновлять API без нарушения совместимости. Важно понимать, как безопасно работать с версионированными API и обрабатывать устаревшие версии.',
    difficulty: 'intermediate',
    tags: ['security', 'api', 'versioning', 'compatibility'],
    keyPoints: [
      'API версионирование: /api/v1/, /api/v2/ и т.д.',
      'Устаревшие версии могут иметь уязвимости.',
      'Использовать актуальные версии API.',
      'Обработка устаревших версий (deprecation warnings).',
      'Миграция на новые версии для безопасности.'
    ],
    examples: [
      {
        title: 'Работа с версионированными API',
        code: `// Использование версионированного API
const API_VERSION = 'v2';
fetch(\`https://api.example.com/\${API_VERSION}/data\`);

// Обработка устаревших версий
fetch('https://api.example.com/v1/data')
  .then(response => {
    if (response.status === 410) {
      // Версия устарела
      console.warn('API version deprecated, please upgrade to v2');
      return fetch('https://api.example.com/v2/data');
    }
    return response;
  });

// ✅ Преимущества версионирования:
// - Обновление API без нарушения совместимости
// - Постепенная миграция клиентов
// - Безопасные обновления (исправление уязвимостей)`
      }
    ],
    relatedTopics: ['api-security-basics']
  },
  {
    id: 'api-security-webhooks',
    title: 'Веб-хуки безопасность',
    description: 'Веб-хуки (webhooks) — это HTTP запросы, которые сервер отправляет клиенту при определенных событиях. Важно проверять подлинность веб-хуков для защиты от подделки.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'api', 'webhooks', 'verification', 'front-end-essential'],
    keyPoints: [
      'Веб-хуки: сервер отправляет HTTP запросы клиенту при событиях.',
      'Проверка подлинности: веб-хуки должны быть подписаны.',
      'Использование секретного ключа для подписи (HMAC).',
      'Проверка подписи на клиенте перед обработкой.',
      'HTTPS обязателен для веб-хуков.'
    ],
    examples: [
      {
        title: 'Безопасная обработка веб-хуков',
        code: `// Сервер отправляет веб-хук с подписью
// X-Webhook-Signature: sha256=abc123...

// На клиенте: проверка подписи
import crypto from 'crypto';

function verifyWebhook(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return signature === expectedSignature;
}

// Обработка веб-хука
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verifyWebhook(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Веб-хук подлинный, обрабатываем
  processWebhook(req.body);
  res.status(200).send();
});

// ✅ Защита от подделки веб-хуков`
      }
    ],
    relatedTopics: ['api-security-basics', 'auth-credentials']
  }
];
