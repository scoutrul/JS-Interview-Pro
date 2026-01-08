import { Topic } from '../../../types';

export const SECURITY_COOKIES_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'cookies-prefixes',
    title: 'Cookie prefixes (__Secure-, __Host-)',
    description: 'Cookie prefixes — это специальные префиксы для имен cookies, которые накладывают дополнительные ограничения безопасности. __Secure- требует Secure флаг, __Host- требует Secure и запрещает Domain/Path атрибуты.',
    difficulty: 'advanced',
    tags: ['security', 'cookies', 'prefixes', 'secure', 'host', 'advanced'],
    keyPoints: [
      '__Secure-: требует Secure флаг (только HTTPS).',
      '__Host-: требует Secure и запрещает Domain/Path (только текущий домен).',
      'Префиксы обеспечивают дополнительную защиту от подделки cookies.',
      'Браузер отклоняет cookies с префиксами, но без требуемых атрибутов.',
      'Используются для критически важных cookies (сессии, токены).'
    ],
    examples: [
      {
        title: 'Использование префиксов',
        code: `// 1. __Secure- префикс
// Требует Secure флаг
// Set-Cookie: __Secure-sessionId=abc123; Secure

// ✅ Работает:
// Set-Cookie: __Secure-sessionId=abc123; Secure; HttpOnly

// ❌ Не работает (браузер отклонит):
// Set-Cookie: __Secure-sessionId=abc123 (без Secure)
// Set-Cookie: __Secure-sessionId=abc123; Secure (но по HTTP, не HTTPS)

// 2. __Host- префикс
// Требует Secure и запрещает Domain/Path
// Set-Cookie: __Host-sessionId=abc123; Secure; Path=/

// ✅ Работает:
// Set-Cookie: __Host-sessionId=abc123; Secure; Path=/

// ❌ Не работает:
// Set-Cookie: __Host-sessionId=abc123; Secure; Domain=.example.com
// Set-Cookie: __Host-sessionId=abc123; Secure; Path=/api

// Использование на сервере:
res.cookie('__Host-sessionId', 'abc123', {
  secure: true,
  httpOnly: true,
  sameSite: 'lax',
  path: '/' // Обязательно, но только /
  // domain не указывается (запрещен)
});`
      }
    ],
    relatedTopics: ['cookies-secure', 'cookies-httponly']
  },
  {
    id: 'cookies-advanced-patterns',
    title: 'Продвинутые паттерны работы с cookies',
    description: 'Продвинутые паттерны включают использование нескольких cookies для разных целей, ротацию токенов, разделение access и refresh токенов, и оптимизацию безопасности через комбинирование различных техник.',
    difficulty: 'advanced',
    tags: ['security', 'cookies', 'patterns', 'tokens', 'advanced'],
    keyPoints: [
      'Разделение access и refresh токенов в разных cookies.',
      'Ротация токенов для снижения ущерба от компрометации.',
      'Использование разных cookies для разных уровней доступа.',
      'Оптимизация размера и количества cookies.',
      'Мониторинг и обнаружение подозрительной активности.'
    ],
    examples: [
      {
        title: 'Разделение access и refresh токенов',
        code: `// Access token (короткоживущий, в HttpOnly cookie)
res.cookie('__Host-accessToken', accessToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/',
  maxAge: 900000 // 15 минут
});

// Refresh token (долгоживущий, в HttpOnly cookie)
res.cookie('__Host-refreshToken', refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict', // Строже для refresh token
  path: '/api/refresh',
  maxAge: 604800000 // 7 дней
});

// При истечении access token:
// 1. Клиент отправляет refresh token
// 2. Сервер проверяет и выдает новый access token
// 3. Опционально: ротация refresh token`
      }
    ],
    relatedTopics: ['cookies-token-storage', 'authentication-refresh-tokens']
  },
  {
    id: 'cookies-vs-localstorage',
    title: 'Cookies vs localStorage для токенов (детальное сравнение)',
    description: 'Детальное сравнение cookies и localStorage для хранения токенов, включая все аспекты безопасности, функциональности и практического использования. HttpOnly cookies предпочтительны для токенов.',
    difficulty: 'advanced',
    tags: ['security', 'cookies', 'localstorage', 'tokens', 'comparison', 'advanced'],
    keyPoints: [
      'HttpOnly cookies безопаснее localStorage из-за защиты от XSS.',
      'localStorage уязвим для XSS: "безопасен, если нет XSS" — циклическая зависимость.',
      'Cookies автоматически отправляются, localStorage требует ручного добавления.',
      'Cookies имеют ограничения по размеру (4KB), localStorage больше (5-10MB).',
      'Для токенов рекомендуется HttpOnly cookies, для других данных — по ситуации.'
    ],
    examples: [
      {
        title: 'Детальное сравнение',
        code: `// Безопасность:
// ✅ Cookies (HttpOnly): Защищены от XSS
// ❌ localStorage: Уязвимы для XSS

// Доступ через JavaScript:
// ❌ Cookies (HttpOnly): Недоступны
// ✅ localStorage: Доступны

// Автоматическая отправка:
// ✅ Cookies: Автоматически с каждым запросом
// ❌ localStorage: Нужно вручную добавлять в заголовки

// Размер:
// ❌ Cookies: Ограничение ~4KB
// ✅ localStorage: 5-10MB

// Срок жизни:
// ✅ Cookies: Контролируется сервером (Expires, Max-Age)
// ✅ localStorage: До явного удаления

// Защита атрибутами:
// ✅ Cookies: Secure, SameSite, HttpOnly
// ❌ localStorage: Нет встроенной защиты

// Вывод: Для токенов используйте HttpOnly cookies!`
      }
    ],
    relatedTopics: ['cookies-token-storage', 'data-storage-basics']
  }
];
