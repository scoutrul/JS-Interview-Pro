import { Topic } from '../../../types';

export const SECURITY_COOKIES_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'cookies-basics',
    title: 'Что такое cookies и как они работают',
    description: 'Cookies — это небольшие текстовые данные, которые сервер отправляет браузеру, и браузер сохраняет их и автоматически отправляет обратно с каждым запросом к тому же домену. Cookies используются для хранения состояния сессии, предпочтений пользователя и другой информации.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'cookies', 'basics', 'http', 'front-end-essential'],
    keyPoints: [
      'Cookies отправляются автоматически браузером с каждым запросом к домену.',
      'Сервер устанавливает cookies через заголовок Set-Cookie.',
      'Браузер сохраняет cookies и отправляет их в заголовке Cookie.',
      'Cookies имеют ограничения по размеру (обычно 4KB).',
      'Cookies используются для аутентификации, сессий, отслеживания.'
    ],
    examples: [
      {
        title: 'Как работают cookies',
        code: `// 1. Сервер устанавливает cookie
// HTTP Response:
// Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure

// 2. Браузер сохраняет cookie

// 3. Браузер автоматически отправляет cookie с каждым запросом
// HTTP Request:
// Cookie: sessionId=abc123

// 4. Сервер читает cookie и использует для аутентификации
const sessionId = req.cookies.sessionId;
const user = getUserBySession(sessionId);`
      },
      {
        title: 'Чтение cookies на клиенте',
        code: `// Чтение всех cookies
const allCookies = document.cookie;
// Результат: "sessionId=abc123; theme=dark; lang=ru"

// Парсинг cookies
function getCookie(name: string): string | null {
  const value = \`; \${document.cookie}\`;
  const parts = value.split(\`; \${name}=\`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

const sessionId = getCookie('sessionId'); // "abc123"

// Установка cookie (если не HttpOnly)
document.cookie = 'theme=dark; path=/; max-age=86400';`
      }
    ],
    relatedTopics: ['cookies-attributes', 'cookies-httponly', 'cookies-samesite']
  },
  {
    id: 'cookies-attributes',
    title: 'Базовые атрибуты: Expires, Max-Age, Path, Domain',
    description: 'Cookies имеют несколько атрибутов, которые контролируют их поведение: Expires и Max-Age определяют время жизни, Path ограничивает путь, Domain ограничивает домен. Понимание этих атрибутов критично для безопасности.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'cookies', 'attributes', 'expires', 'path', 'domain', 'front-end-essential'],
    keyPoints: [
      'Expires: абсолютная дата истечения (устаревший способ).',
      'Max-Age: время жизни в секундах (предпочтительно).',
      'Path: путь, для которого cookie действительна (по умолчанию /).',
      'Domain: домен, для которого cookie действительна (по умолчанию текущий домен).',
      'Без Expires/Max-Age cookie является сессионной (удаляется при закрытии браузера).'
    ],
    examples: [
      {
        title: 'Атрибуты cookies',
        code: `// 1. Expires (абсолютная дата)
// Set-Cookie: sessionId=abc123; Expires=Wed, 21 Oct 2025 07:28:00 GMT

// 2. Max-Age (время жизни в секундах)
// Set-Cookie: sessionId=abc123; Max-Age=3600 (1 час)

// 3. Path (путь)
// Set-Cookie: sessionId=abc123; Path=/api
// Cookie отправляется только для запросов к /api/*

// 4. Domain (домен)
// Set-Cookie: sessionId=abc123; Domain=.example.com
// Cookie отправляется для example.com и всех поддоменов (*.example.com)

// Комбинирование:
// Set-Cookie: sessionId=abc123; Path=/; Domain=.example.com; Max-Age=3600

// Сессионная cookie (без Expires/Max-Age):
// Set-Cookie: sessionId=abc123
// Удаляется при закрытии браузера`
      },
      {
        title: 'Практическое использование',
        code: `// Установка cookie на сервере (Express)
res.cookie('sessionId', 'abc123', {
  maxAge: 3600000, // 1 час в миллисекундах
  path: '/',
  domain: '.example.com', // Для всех поддоменов
  httpOnly: true,
  secure: true,
  sameSite: 'lax'
});

// Установка cookie на клиенте (JavaScript)
document.cookie = 'theme=dark; path=/; max-age=86400; secure; samesite=lax';

// Чтение cookie
const theme = document.cookie
  .split('; ')
  .find(row => row.startsWith('theme='))
  ?.split('=')[1];`
      }
    ],
    relatedTopics: ['cookies-basics', 'cookies-httponly', 'cookies-secure']
  }
];
