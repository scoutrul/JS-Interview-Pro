import { Topic } from '../../../types';

export const SECURITY_AUTHENTICATION_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'auth-authn-vs-authz',
    title: 'Разница между аутентификацией и авторизацией',
    description: 'Аутентификация (authentication) — это процесс проверки личности пользователя (кто вы?), авторизация (authorization) — это процесс проверки прав доступа (что вы можете делать?). Понимание разницы критично для безопасности.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'authentication', 'authorization', 'basics', 'front-end-essential'],
    keyPoints: [
      'Аутентификация: проверка личности (логин, пароль, токен).',
      'Авторизация: проверка прав доступа (роли, разрешения).',
      'Сначала аутентификация, потом авторизация.',
      'Аутентификация отвечает на вопрос "кто?", авторизация — "что можно?".',
      'На фронтенде обычно проверяется аутентификация, авторизация на бэкенде.'
    ],
    examples: [
      {
        title: 'Разница на практике',
        code: `// Аутентификация: "Кто вы?"
const user = await login(username, password);
// Проверка: правильный ли пароль?
// Результат: пользователь аутентифицирован

// Авторизация: "Что вы можете делать?"
if (user.role === 'admin') {
  // Пользователь авторизован для админских действий
  showAdminPanel();
} else {
  // Пользователь НЕ авторизован
  showError('Access denied');
}

// На фронтенде:
// - Проверяем аутентификацию (есть ли токен?)
const isAuthenticated = !!localStorage.getItem('token');

// - Проверяем авторизацию (есть ли права?)
const isAuthorized = user.role === 'admin';

// ⚠️ Важно: авторизация на фронтенде только для UX
// Реальная проверка должна быть на бэкенде!`
      }
    ],
    relatedTopics: ['auth-sessions-tokens', 'auth-jwt-basics']
  },
  {
    id: 'auth-sessions-tokens',
    title: 'Базовые методы: сессии, токены',
    description: 'Существует два основных метода аутентификации: сессии (server-side) и токены (client-side). Сессии хранятся на сервере, токены хранятся на клиенте. Каждый метод имеет свои преимущества и недостатки.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'authentication', 'sessions', 'tokens', 'basics', 'front-end-essential'],
    keyPoints: [
      'Сессии: хранятся на сервере, идентифицируются через cookie с sessionId.',
      'Токены: хранятся на клиенте (JWT, OAuth tokens), содержат информацию о пользователе.',
      'Сессии: сервер контролирует сессию, можно отозвать.',
      'Токены: клиент хранит токен, сервер не может отозвать (до истечения срока).',
      'Выбор зависит от архитектуры приложения.'
    ],
    examples: [
      {
        title: 'Сессии',
        code: `// 1. Пользователь логинится
const response = await fetch('/api/login', {
  method: 'POST',
  body: JSON.stringify({ username, password })
});

// 2. Сервер создает сессию и отправляет cookie
// Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Lax

// 3. Браузер автоматически отправляет cookie с каждым запросом
fetch('/api/data', {
  credentials: 'include' // Отправляет cookie
});

// 4. Сервер проверяет сессию
const sessionId = req.cookies.sessionId;
const session = getSession(sessionId);
if (!session || session.expired) {
  return res.status(401).json({ error: 'Unauthorized' });
}

// ✅ Преимущества:
// - Сервер контролирует сессию
// - Можно отозвать сессию
// - Безопаснее (не хранится на клиенте)

// ❌ Недостатки:
// - Требует хранилище на сервере
// - Не масштабируется для микросервисов`
      },
      {
        title: 'Токены (JWT)',
        code: `// 1. Пользователь логинится
const response = await fetch('/api/login', {
  method: 'POST',
  body: JSON.stringify({ username, password })
});
const { token } = await response.json();

// 2. Клиент сохраняет токен
localStorage.setItem('token', token); // ❌ Уязвимо для XSS
// Лучше: HttpOnly cookie

// 3. Клиент отправляет токен с каждым запросом
fetch('/api/data', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});

// 4. Сервер проверяет токен
const token = req.headers.authorization?.split(' ')[1];
const decoded = verifyJWT(token);
if (!decoded || decoded.exp < Date.now()) {
  return res.status(401).json({ error: 'Unauthorized' });
}

// ✅ Преимущества:
// - Не требует хранилища на сервере
// - Масштабируется для микросервисов
// - Содержит информацию о пользователе

// ❌ Недостатки:
// - Нельзя отозвать (до истечения срока)
// - Хранится на клиенте (уязвимо для XSS)`
      }
    ],
    relatedTopics: ['auth-authn-vs-authz', 'auth-jwt-basics', 'cookies-token-storage']
  },
  {
    id: 'auth-jwt-basics',
    title: 'JWT (JSON Web Tokens) основы',
    description: 'JWT (JSON Web Token) — это стандарт для создания токенов доступа, который позволяет передавать информацию о пользователе в закодированном виде. JWT состоит из трех частей: header, payload, signature.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'authentication', 'jwt', 'tokens', 'basics', 'front-end-essential'],
    keyPoints: [
      'JWT состоит из трех частей: header.payload.signature.',
      'Header: тип токена и алгоритм подписи.',
      'Payload: данные о пользователе (claims).',
      'Signature: подпись для проверки целостности.',
      'JWT не зашифрован, только подписан (можно прочитать, но нельзя изменить).'
    ],
    examples: [
      {
        title: 'Структура JWT',
        code: `// JWT состоит из трех частей, разделенных точками:
// header.payload.signature

// 1. Header (base64url encoded)
{
  "alg": "HS256",
  "typ": "JWT"
}

// 2. Payload (base64url encoded)
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622
}

// 3. Signature
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)

// Полный JWT:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
      },
      {
        title: 'Использование JWT',
        code: `// Создание JWT на сервере
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { userId: 123, role: 'user' },
  'secret-key',
  { expiresIn: '1h' }
);

// Отправка клиенту
res.json({ token });

// Проверка JWT на сервере
const decoded = jwt.verify(token, 'secret-key');
// { userId: 123, role: 'user', iat: ..., exp: ... }

// Использование на клиенте
fetch('/api/data', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});

// ⚠️ Важно: JWT не зашифрован!
// Можно прочитать содержимое (base64 decode)
// Но нельзя изменить (signature проверяется)`
      }
    ],
    relatedTopics: ['auth-sessions-tokens', 'auth-jwt-structure', 'cookies-token-storage']
  }
];
