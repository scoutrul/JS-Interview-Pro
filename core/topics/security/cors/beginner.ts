import { Topic } from '../../../types';

export const SECURITY_CORS_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'cors-basics',
    title: 'Что такое CORS и зачем нужен',
    description: 'CORS (Cross-Origin Resource Sharing) — это механизм браузера, который позволяет веб-странице запрашивать ресурсы с другого домена. CORS не является защитой от атак, а механизмом контроля кросс-доменных запросов. Сервер должен сам проверять Origin и решать, разрешать ли запрос.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'cors', 'basics', 'cross-origin', 'front-end-essential'],
    keyPoints: [
      'CORS — это механизм браузера для контроля кросс-доменных запросов.',
      'CORS НЕ является защитой от атак — это только контроль доступа.',
      'Сервер ДОЛЖЕН сам проверять Origin и решать, разрешать ли запрос.',
      'Same-Origin Policy блокирует кросс-доменные запросы по умолчанию.',
      'CORS позволяет серверу явно разрешить запросы с определенных доменов.'
    ],
    examples: [
      {
        title: 'Базовое понимание CORS',
        code: `// example.com пытается запросить api.example.com
fetch('https://api.example.com/data')
  .then(r => r.json())
  .then(data => console.log(data));

// ❌ Браузер блокирует запрос (CORS error)
// Access to fetch at 'https://api.example.com/data' from origin 'https://example.com' 
// has been blocked by CORS policy

// ✅ Сервер должен отправить заголовок:
// Access-Control-Allow-Origin: https://example.com

// Тогда браузер разрешит запрос`
      },
      {
        title: 'Важно: CORS — это НЕ защита!',
        code: `// ❌ НЕПРАВИЛЬНОЕ понимание:
// "CORS защищает от атак"

// ✅ ПРАВИЛЬНОЕ понимание:
// CORS — это механизм контроля доступа
// Сервер ДОЛЖЕН сам проверять Origin

// Пример:
// evil.com отправляет запрос на api.example.com
fetch('https://api.example.com/transfer', {
  method: 'POST',
  body: JSON.stringify({ to: 'attacker', amount: 1000 })
});

// Если сервер НЕ проверяет Origin:
// - CORS может заблокировать чтение ответа
// - НО запрос УЖЕ выполнен на сервере! ❌
// - Перевод выполнен, даже если ответ не прочитан

// ✅ Сервер ДОЛЖЕН проверять:
if (req.headers.origin !== 'https://trusted-domain.com') {
  return res.status(403).json({ error: 'Invalid origin' });
}`
      }
    ],
    relatedTopics: ['cors-same-origin', 'cors-preflight', 'csrf-basics']
  },
  {
    id: 'cors-same-origin',
    title: 'Same-Origin Policy (базовое понимание)',
    description: 'Same-Origin Policy — это механизм безопасности браузера, который ограничивает взаимодействие между ресурсами с разных источников (origins). Два URL имеют одинаковый origin, если у них одинаковые протокол, домен и порт.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'cors', 'same-origin', 'policy', 'front-end-essential'],
    keyPoints: [
      'Origin состоит из протокола, домена и порта: https://example.com:443.',
      'Разные поддомены — разные origins: example.com ≠ api.example.com.',
      'Разные протоколы — разные origins: http ≠ https.',
      'Разные порты — разные origins: :80 ≠ :3000.',
      'Same-Origin Policy блокирует кросс-доменные запросы по умолчанию.'
    ],
    examples: [
      {
        title: 'Что такое Same Origin',
        code: `// ✅ Same Origin (одинаковый):
// https://example.com/page1
// https://example.com/page2
// - Протокол: https ✅
// - Домен: example.com ✅
// - Порт: 443 (по умолчанию для HTTPS) ✅

// ❌ Different Origin (разный):
// https://example.com/page1
// http://example.com/page2
// - Протокол: https ≠ http ❌

// https://example.com/page1
// https://api.example.com/page2
// - Домен: example.com ≠ api.example.com ❌

// https://example.com/page1
// https://example.com:3000/page2
// - Порт: 443 ≠ 3000 ❌

// https://example.com/page1
// https://evil.com/page2
// - Домен: example.com ≠ evil.com ❌`
      },
      {
        title: 'Когда возникает CORS ошибка',
        code: `// CORS ошибка возникает когда:
// 1. Запрос идет с другого origin
// 2. Сервер не отправил правильные CORS заголовки

// Пример:
// Страница: https://example.com
// API: https://api.example.com

fetch('https://api.example.com/data')
  .then(r => r.json())
  .catch(err => console.error(err));

// ❌ CORS error:
// Access to fetch at 'https://api.example.com/data' 
// from origin 'https://example.com' has been blocked by CORS policy

// ✅ Решение: сервер должен отправить:
// Access-Control-Allow-Origin: https://example.com`
      }
    ],
    relatedTopics: ['cors-basics', 'cors-preflight', 'cors-headers']
  },
  {
    id: 'cors-when-error',
    title: 'Когда возникает CORS ошибка',
    description: 'CORS ошибка возникает, когда браузер блокирует кросс-доменный запрос из-за отсутствия правильных CORS заголовков от сервера. Важно понимать, что ошибка возникает на стороне клиента, но решение — на стороне сервера.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'cors', 'errors', 'troubleshooting', 'front-end-essential'],
    keyPoints: [
      'CORS ошибка возникает, когда запрос идет с другого origin.',
      'Сервер не отправил заголовок Access-Control-Allow-Origin.',
      'Или заголовок не содержит текущий origin клиента.',
      'Ошибка видна только в консоли браузера (на клиенте).',
      'Решение — настроить CORS на сервере.'
    ],
    examples: [
      {
        title: 'Типичная CORS ошибка',
        code: `// Клиент: https://example.com
// API: https://api.example.com

fetch('https://api.example.com/data')
  .then(r => r.json())
  .catch(err => console.error(err));

// ❌ Ошибка в консоли:
// Access to fetch at 'https://api.example.com/data' 
// from origin 'https://example.com' has been blocked by CORS policy: 
// No 'Access-Control-Allow-Origin' header is present on the requested resource.

// Проблема: сервер не отправил заголовок Access-Control-Allow-Origin

// ✅ Решение на сервере:
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com');
  next();
});`
      },
      {
        title: 'Разные поддомены — разные origins',
        code: `// Вопрос: "Почему возникает CORS ошибка при запросе на api.example.com с сайта example.com?"

// Ответ: Разные subdomains → разные origins → нужен правильный CORS header

// example.com и api.example.com — это РАЗНЫЕ origins
// Браузер считает их разными доменами

// ✅ Решение на сервере:
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Разрешить запросы с example.com и его поддоменов
  if (origin && (origin === 'https://example.com' || origin.endsWith('.example.com'))) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  next();
});

// Или разрешить все поддомены:
res.header('Access-Control-Allow-Origin', 'https://*.example.com'); // ❌ Не работает!
// Нужно проверять конкретный origin`
      }
    ],
    relatedTopics: ['cors-basics', 'cors-same-origin', 'cors-headers']
  }
];
