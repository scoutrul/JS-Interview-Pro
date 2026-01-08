import { Topic } from '../../../types';

export const SECURITY_API_SECURITY_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'api-security-basics',
    title: 'Базовые принципы безопасности API',
    description: 'Безопасность API включает аутентификацию, авторизацию, валидацию данных, rate limiting и другие меры защиты. На клиенте важно понимать, как безопасно взаимодействовать с API.',
    difficulty: 'beginner',
    tags: ['security', 'api', 'basics', 'authentication', 'authorization'],
    keyPoints: [
      'Аутентификация: проверка личности (токены, API ключи).',
      'Авторизация: проверка прав доступа (роли, разрешения).',
      'Валидация данных: проверка входных данных на клиенте и сервере.',
      'Rate limiting: ограничение количества запросов.',
      'HTTPS: все API запросы должны быть по HTTPS.'
    ],
    examples: [
      {
        title: 'Базовые принципы',
        code: `// ✅ Безопасный API запрос:
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token, // Аутентификация
  },
  body: JSON.stringify({
    // Валидированные данные
    name: sanitizeInput(name),
    email: validateEmail(email)
  })
});

// ❌ Небезопасный API запрос:
fetch('http://api.example.com/data', { // HTTP вместо HTTPS
  method: 'POST',
  body: JSON.stringify({
    // Невалидированные данные
    name: userInput, // Может содержать вредоносный код
    password: password // Пароль в теле запроса
  })
});`
      }
    ],
    relatedTopics: ['api-security-keys', 'api-security-rate-limiting']
  },
  {
    id: 'api-security-keys',
    title: 'API ключи и их использование',
    description: 'API ключи используются для аутентификации клиентов при доступе к API. Важно понимать, как безопасно хранить и использовать API ключи на клиенте.',
    difficulty: 'beginner',
    tags: ['security', 'api', 'api-keys', 'authentication', 'basics'],
    keyPoints: [
      'API ключи идентифицируют клиента при доступе к API.',
      'API ключи не должны быть в коде или публичных репозиториях.',
      'На клиенте API ключи уязвимы (можно извлечь из кода).',
      'Использовать environment variables для хранения ключей.',
      'Ограничивать права API ключей (только необходимые разрешения).'
    ],
    examples: [
      {
        title: 'Безопасное использование API ключей',
        code: `// ❌ НЕПРАВИЛЬНО: ключ в коде
const API_KEY = 'sk_live_abc123...';
fetch('https://api.example.com/data', {
  headers: {
    'X-API-Key': API_KEY // Ключ виден в коде!
  }
});

// ✅ ПРАВИЛЬНО: ключ в environment variable
const API_KEY = import.meta.env.VITE_API_KEY;
fetch('https://api.example.com/data', {
  headers: {
    'X-API-Key': API_KEY
  }
});

// ⚠️ Важно: на клиенте ключ все равно виден!
// Лучше использовать серверный прокси:
// Клиент → Сервер (с ключом) → API

// На сервере:
app.post('/api/proxy', async (req, res) => {
  const response = await fetch('https://external-api.com/data', {
    headers: {
      'X-API-Key': process.env.API_KEY // Ключ на сервере, безопасно
    }
  });
  res.json(await response.json());
});`
      }
    ],
    relatedTopics: ['api-security-basics', 'production-security-env']
  }
];
