import { Topic } from '../../../types';

export const SECURITY_API_SECURITY_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'api-security-advanced',
    title: 'Продвинутые техники защиты API',
    description: 'Продвинутые техники включают использование OAuth 2.0, JWT с refresh tokens, API gateway, и архитектурные решения для безопасных микросервисов.',
    difficulty: 'advanced',
    tags: ['security', 'api', 'advanced', 'oauth', 'microservices'],
    keyPoints: [
      'OAuth 2.0 для авторизации доступа к API.',
      'JWT с refresh tokens для аутентификации.',
      'API Gateway для централизованной безопасности.',
      'Микросервисы: безопасное взаимодействие между сервисами.',
      'Мониторинг и обнаружение аномалий в API запросах.'
    ],
    examples: [
      {
        title: 'Продвинутые техники',
        code: `// OAuth 2.0 для API доступа
const token = await getOAuthToken();
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});

// API Gateway для централизованной безопасности
// Клиент → API Gateway (аутентификация, rate limiting) → Микросервисы

// Мониторинг аномалий
// - Необычные паттерны запросов
// - Подозрительные источники
// - Аномальная частота запросов`
      }
    ],
    relatedTopics: ['api-security-basics', 'auth-oauth-basics']
  },
  {
    id: 'api-security-graphql',
    title: 'GraphQL безопасность',
    description: 'GraphQL имеет свои особенности безопасности: защита от сложных запросов (query depth, complexity), валидация схемы, и защита от инъекций в GraphQL запросах.',
    difficulty: 'advanced',
    tags: ['security', 'api', 'graphql', 'query-complexity', 'advanced'],
    keyPoints: [
      'Query depth limiting: ограничение глубины вложенных запросов.',
      'Query complexity: ограничение сложности запросов.',
      'Валидация схемы: проверка соответствия запроса схеме.',
      'Защита от инъекций в GraphQL запросах.',
      'Rate limiting для GraphQL запросов.'
    ],
    examples: [
      {
        title: 'GraphQL безопасность',
        code: `// ❌ Опасный GraphQL запрос:
// {
//   user {
//     posts {
//       author {
//         posts {
//           author {
//             posts { ... } // Глубокая вложенность
//           }
//         }
//       }
//     }
//   }
// }

// ✅ Защита: ограничение глубины
const maxDepth = 5;
function validateQueryDepth(query: string, maxDepth: number): boolean {
  // Проверка глубины вложенности
  // ...
}

// ✅ Защита: ограничение сложности
const maxComplexity = 100;
function calculateComplexity(query: string): number {
  // Расчет сложности запроса
  // ...
}

// Валидация перед выполнением
if (validateQueryDepth(query, maxDepth) && 
    calculateComplexity(query) <= maxComplexity) {
  executeQuery(query);
} else {
  throw new Error('Query too complex');
}`
      }
    ],
    relatedTopics: ['api-security-advanced']
  }
];
