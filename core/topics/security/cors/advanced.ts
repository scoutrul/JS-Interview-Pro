import { Topic } from '../../../types';

export const SECURITY_CORS_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'cors-advanced-config',
    title: 'Продвинутые настройки CORS',
    description: 'Продвинутые настройки CORS включают динамическую проверку origins, кэширование preflight запросов, обработку сложных сценариев с множественными доменами и поддоменами.',
    difficulty: 'advanced',
    tags: ['security', 'cors', 'advanced', 'configuration'],
    keyPoints: [
      'Динамическая проверка origins на основе whitelist.',
      'Поддержка поддоменов через регулярные выражения.',
      'Кэширование preflight через Access-Control-Max-Age.',
      'Обработка сложных сценариев (множественные API, микросервисы).',
      'Мониторинг и логирование CORS нарушений.'
    ],
    examples: [
      {
        title: 'Динамическая проверка origins',
        code: `// Проверка origins из базы данных или конфигурации
async function isAllowedOrigin(origin: string): Promise<boolean> {
  const allowedOrigins = await getAllowedOriginsFromDB();
  return allowedOrigins.includes(origin);
}

app.use(async (req, res, next) => {
  const origin = req.headers.origin;
  
  if (origin && await isAllowedOrigin(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Max-Age', '86400');
      return res.status(204).send();
    }
  }
  
  next();
});`
      }
    ],
    relatedTopics: ['cors-headers', 'cors-preflight']
  },
  {
    id: 'cors-security',
    title: 'CORS и безопасность',
    description: 'Важно понимать, что CORS не является защитой от атак, а только механизмом контроля доступа. Сервер должен дополнительно проверять Origin и использовать другие методы защиты (CSRF токены, проверка заголовков).',
    difficulty: 'advanced',
    tags: ['security', 'cors', 'security', 'protection'],
    keyPoints: [
      'CORS не защищает от CSRF — запрос может быть отправлен.',
      'CORS не защищает от XSS — вредоносный код может отправлять запросы.',
      'Сервер должен проверять Origin, даже если CORS разрешен.',
      'Использовать CORS вместе с CSRF токенами и другими методами защиты.',
      'Мониторинг подозрительных CORS запросов.'
    ],
    examples: [
      {
        title: 'CORS не защищает от CSRF',
        code: `// ⚠️ Важно понимать: CORS не защищает от CSRF!

// evil.com отправляет POST запрос на api.example.com
fetch('https://api.example.com/transfer', {
  method: 'POST',
  body: JSON.stringify({ to: 'attacker', amount: 1000 })
});

// Если CORS не настроен:
// - Браузер блокирует чтение ответа
// - НО запрос УЖЕ выполнен на сервере! ❌
// - Перевод выполнен, даже если ответ не прочитан

// ✅ Защита от CSRF нужна отдельно:
// 1. CSRF токены
// 2. Проверка Origin на сервере
// 3. SameSite cookies

// CORS только контролирует доступ к ответу`
      }
    ],
    relatedTopics: ['cors-basics', 'csrf-basics', 'cors-server-client']
  },
  {
    id: 'cors-wildcard-credentials',
    title: 'Wildcard и credentials',
    description: 'Access-Control-Allow-Origin: * (wildcard) не может использоваться вместе с Access-Control-Allow-Credentials: true. Браузер блокирует такие запросы. Для credentials нужно указывать конкретный origin.',
    difficulty: 'advanced',
    tags: ['security', 'cors', 'wildcard', 'credentials'],
    keyPoints: [
      'Access-Control-Allow-Origin: * не работает с credentials.',
      'Для credentials нужно указывать конкретный origin.',
      'Браузер явно блокирует комбинацию * и credentials.',
      'Для множественных origins нужно проверять и устанавливать конкретный origin.',
      'Это ограничение безопасности браузера.'
    ],
    examples: [
      {
        title: 'Проблема wildcard и credentials',
        code: `// ❌ НЕ РАБОТАЕТ:
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Credentials', 'true');

// Браузер отклонит запрос с ошибкой:
// "The value of the 'Access-Control-Allow-Credentials' header 
//  in the response is 'true' which must be 'false' when the 
//  request's credentials mode is 'include'."

// ✅ ПРАВИЛЬНО: конкретный origin
const origin = req.headers.origin;
if (origin === 'https://example.com') {
  res.header('Access-Control-Allow-Origin', origin); // Конкретный origin
  res.header('Access-Control-Allow-Credentials', 'true');
}

// ✅ Для множественных origins:
const allowedOrigins = ['https://example.com', 'https://app.example.com'];
const origin = req.headers.origin;

if (origin && allowedOrigins.includes(origin)) {
  res.header('Access-Control-Allow-Origin', origin); // Конкретный origin
  res.header('Access-Control-Allow-Credentials', 'true');
}`
      }
    ],
    relatedTopics: ['cors-headers', 'cors-credentials']
  }
];
