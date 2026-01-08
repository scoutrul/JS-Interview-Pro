import { Topic } from '../../../types';

export const SECURITY_OWASP_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'owasp-basics',
    title: 'Что такое OWASP Top 10',
    description: 'OWASP Top 10 — это стандартизированный документ, который описывает 10 наиболее критичных уязвимостей веб-приложений. Понимание OWASP Top 10 критично для разработчиков и часто спрашивается на собеседованиях.',
    difficulty: 'beginner',
    tags: ['security', 'owasp', 'top10', 'vulnerabilities', 'basics'],
    keyPoints: [
      'OWASP Top 10 обновляется каждые 3-4 года.',
      'Список 10 наиболее критичных уязвимостей веб-приложений.',
      'Первые 3-5 пунктов обычно спрашивают на собеседованиях.',
      'Включает: инъекции, XSS, уязвимые компоненты и т.д.',
      'Понимание OWASP Top 10 помогает создавать безопасные приложения.'
    ],
    examples: [
      {
        title: 'OWASP Top 10 (основные пункты)',
        code: `// OWASP Top 10 включает:
// 1. Инъекции (SQL, NoSQL, Command)
// 2. Неправильная аутентификация
// 3. Раскрытие чувствительных данных
// 4. XML External Entities (XXE)
// 5. Неправильный контроль доступа
// 6. Неправильная конфигурация безопасности
// 7. XSS (Cross-Site Scripting)
// 8. Небезопасная десериализация
// 9. Использование компонентов с известными уязвимостями
// 10. Недостаточное логирование и мониторинг

// Для фронтенда наиболее важны:
// - XSS (пункт 7)
// - Инъекции (пункт 1)
// - Уязвимые компоненты (пункт 9)
// - Неправильная аутентификация (пункт 2)`
      }
    ],
    relatedTopics: ['owasp-injections', 'xss-basics', 'dependencies-basics']
  },
  {
    id: 'owasp-frontend-vulnerabilities',
    title: 'Основные уязвимости для фронтенда',
    description: 'Для фронтенд-разработчиков наиболее критичны XSS, CSRF, уязвимые зависимости, и неправильное хранение данных. Понимание этих уязвимостей критично для создания безопасных приложений.',
    difficulty: 'beginner',
    tags: ['security', 'owasp', 'frontend', 'vulnerabilities', 'basics'],
    keyPoints: [
      'XSS: выполнение вредоносного JavaScript кода.',
      'CSRF: выполнение действий от имени пользователя.',
      'Уязвимые зависимости: использование библиотек с известными уязвимостями.',
      'Неправильное хранение данных: токены в localStorage, пароли в открытом виде.',
      'Первые 3-5 пунктов OWASP Top 10 обычно спрашивают на собеседованиях.'
    ],
    examples: [
      {
        title: 'Основные уязвимости для фронтенда',
        code: `// 1. XSS (Cross-Site Scripting)
element.innerHTML = userInput; // ❌ Уязвимо
element.textContent = userInput; // ✅ Безопасно

// 2. CSRF (Cross-Site Request Forgery)
// Защита: CSRF токены, SameSite cookies

// 3. Уязвимые зависимости
// npm audit, yarn audit для проверки

// 4. Неправильное хранение данных
localStorage.setItem('token', token); // ❌ Уязвимо для XSS
// HttpOnly cookie ✅

// 5. Неправильная аутентификация
// Слабые пароли, отсутствие rate limiting`
      }
    ],
    relatedTopics: ['owasp-basics', 'xss-basics', 'csrf-basics', 'dependencies-basics']
  },
  {
    id: 'owasp-top-5',
    title: 'Первые 3-5 пунктов (обычно спрашивают на собеседованиях)',
    description: 'Первые 3-5 пунктов OWASP Top 10 наиболее критичны и часто спрашиваются на собеседованиях. Понимание этих уязвимостей и способов защиты критично для фронтенд-разработчиков.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'owasp', 'top10', 'interview', 'front-end-essential'],
    keyPoints: [
      'Инъекции (SQL, NoSQL, Command): внедрение вредоносного кода.',
      'Неправильная аутентификация: слабые пароли, отсутствие защиты.',
      'Раскрытие чувствительных данных: неправильное хранение токенов, паролей.',
      'XSS: выполнение вредоносного JavaScript.',
      'Уязвимые компоненты: использование библиотек с известными уязвимостями.'
    ],
    examples: [
      {
        title: 'Первые 5 пунктов OWASP Top 10',
        code: `// 1. Инъекции
// SQL: SELECT * FROM users WHERE id = \${userId}
// Защита: параметризованные запросы, валидация

// 2. Неправильная аутентификация
// Слабые пароли, отсутствие rate limiting
// Защита: сильные пароли, MFA, rate limiting

// 3. Раскрытие чувствительных данных
localStorage.setItem('token', token); // ❌
// Защита: HttpOnly cookies, шифрование

// 4. XML External Entities (XXE)
// Меньше актуально для фронтенда

// 5. Неправильный контроль доступа
// Проверка прав на клиенте без проверки на сервере
// Защита: проверка на сервере`
      }
    ],
    relatedTopics: ['owasp-basics', 'owasp-injections', 'xss-basics']
  }
];
