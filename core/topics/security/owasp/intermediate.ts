import { Topic } from '../../../types';

export const SECURITY_OWASP_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'owasp-injections',
    title: 'Инъекции (SQL, NoSQL, Command)',
    description: 'Инъекции — это уязвимости, при которых злоумышленник внедряет вредоносный код через входные данные. SQL инъекции наиболее известны, но существуют также NoSQL и Command инъекции.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'owasp', 'injections', 'sql', 'nosql', 'command', 'front-end-essential'],
    keyPoints: [
      'SQL инъекции: внедрение SQL кода через входные данные.',
      'NoSQL инъекции: внедрение NoSQL кода (MongoDB, etc.).',
      'Command инъекции: внедрение команд операционной системы.',
      'На клиенте: валидация и санитизация данных.',
      'Основная защита на сервере: параметризованные запросы.'
    ],
    examples: [
      {
        title: 'Типы инъекций',
        code: `// 1. SQL инъекция
// Уязвимый код: SELECT * FROM users WHERE id = \${userId}
// Если userId = "1 OR 1=1", выполнится: SELECT * FROM users WHERE id = 1 OR 1=1
// Защита: параметризованные запросы

// 2. NoSQL инъекция
// Уязвимый код: db.users.find({ username: req.body.username })
// Если username = { $ne: null }, найдет всех пользователей
// Защита: валидация и санитизация

// 3. Command инъекция
// Уязвимый код: exec(\`ping \${host}\`)
// Если host = "; rm -rf /", выполнится команда удаления
// Защита: валидация, использование безопасных API

// На клиенте: валидация перед отправкой
function validateInput(input: string): boolean {
  // Только разрешенные символы
  return /^[a-zA-Z0-9]+$/.test(input);
}

const userId = sanitizeInput(userInput);
if (!validateInput(userId)) {
  showError('Invalid input');
  return;
}`
      }
    ],
    relatedTopics: ['owasp-basics', 'api-security-injections']
  },
  {
    id: 'owasp-xss-covered',
    title: 'XSS (уже покрыто в отдельной категории)',
    description: 'XSS (Cross-Site Scripting) — это уязвимость, которая позволяет выполнить вредоносный JavaScript код. XSS подробно покрыт в отдельной категории, здесь только краткое упоминание в контексте OWASP Top 10.',
    difficulty: 'intermediate',
    tags: ['security', 'owasp', 'xss', 'cross-site-scripting'],
    keyPoints: [
      'XSS — пункт 7 в OWASP Top 10.',
      'Подробно покрыт в категории XSS.',
      'Основные типы: Reflected, Stored, DOM-based.',
      'Защита: санитизация, экранирование, CSP.',
      'XSS — одна из самых частых тем на собеседованиях.'
    ],
    examples: [
      {
        title: 'XSS в контексте OWASP',
        code: `// XSS — пункт 7 в OWASP Top 10
// Подробно покрыт в категории XSS

// Основные типы:
// - Reflected XSS: вредоносный код отражается от сервера
// - Stored XSS: вредоносный код сохраняется на сервере
// - DOM-based XSS: вредоносный код обрабатывается на клиенте

// Защита:
// - Санитизация (DOMPurify)
// - Экранирование (textContent)
// - CSP (Content Security Policy)

// См. категорию XSS для подробностей`
      }
    ],
    relatedTopics: ['owasp-basics', 'xss-basics']
  },
  {
    id: 'owasp-vulnerable-components',
    title: 'Уязвимые компоненты (dependencies)',
    description: 'Уязвимые компоненты — это использование библиотек и зависимостей с известными уязвимостями. Это пункт 9 в OWASP Top 10. Подробно покрыто в категории Dependencies.',
    difficulty: 'intermediate',
    tags: ['security', 'owasp', 'dependencies', 'vulnerable-components'],
    keyPoints: [
      'Уязвимые компоненты — пункт 9 в OWASP Top 10.',
      'Использование библиотек с известными уязвимостями.',
      'Проверка через npm audit, yarn audit.',
      'Регулярное обновление зависимостей.',
      'Подробно покрыто в категории Dependencies.'
    ],
    examples: [
      {
        title: 'Уязвимые компоненты',
        code: `// Уязвимые компоненты — пункт 9 в OWASP Top 10
// Подробно покрыто в категории Dependencies

// Проверка уязвимостей:
// npm audit
// yarn audit

// Обновление зависимостей:
// npm update
// yarn upgrade

// См. категорию Dependencies для подробностей`
      }
    ],
    relatedTopics: ['owasp-basics', 'dependencies-basics']
  },
  {
    id: 'owasp-protection',
    title: 'Защита от каждой уязвимости',
    description: 'Каждая уязвимость из OWASP Top 10 требует специфичных мер защиты. Понимание способов защиты от каждой уязвимости критично для создания безопасных приложений.',
    difficulty: 'intermediate',
    tags: ['security', 'owasp', 'protection', 'defense'],
    keyPoints: [
      'Каждая уязвимость требует специфичных мер защиты.',
      'Многоуровневая защита (defense in depth).',
      'Регулярное обновление знаний о новых уязвимостях.',
      'Тестирование на уязвимости.',
      'Мониторинг и обнаружение атак.'
    ],
    examples: [
      {
        title: 'Защита от уязвимостей',
        code: `// Защита от каждой уязвимости OWASP Top 10:

// 1. Инъекции: параметризованные запросы, валидация
// 2. Неправильная аутентификация: сильные пароли, MFA, rate limiting
// 3. Раскрытие данных: шифрование, HttpOnly cookies
// 4. XXE: отключение обработки внешних сущностей
// 5. Неправильный контроль доступа: проверка прав на сервере
// 6. Неправильная конфигурация: безопасные настройки по умолчанию
// 7. XSS: санитизация, экранирование, CSP
// 8. Небезопасная десериализация: валидация данных
// 9. Уязвимые компоненты: регулярное обновление, npm audit
// 10. Недостаточное логирование: мониторинг, алерты`
      }
    ],
    relatedTopics: ['owasp-basics', 'owasp-injections', 'xss-basics']
  },
  {
    id: 'owasp-examples',
    title: 'Практические примеры',
    description: 'Практические примеры уязвимостей из OWASP Top 10 и способы их исправления. Это помогает понять, как уязвимости проявляются в реальном коде и как их исправить.',
    difficulty: 'intermediate',
    tags: ['security', 'owasp', 'examples', 'practical'],
    keyPoints: [
      'Практические примеры уязвимостей и их исправления.',
      'Понимание, как уязвимости проявляются в коде.',
      'Способы исправления каждой уязвимости.',
      'Тестирование исправлений.',
      'Применение знаний на практике.'
    ],
    examples: [
      {
        title: 'Практические примеры',
        code: `// Пример 1: XSS
// ❌ Уязвимо:
element.innerHTML = userInput;
// ✅ Исправление:
element.textContent = userInput;
// Или:
element.innerHTML = DOMPurify.sanitize(userInput);

// Пример 2: Неправильное хранение токенов
// ❌ Уязвимо:
localStorage.setItem('token', token);
// ✅ Исправление:
res.cookie('token', token, { httpOnly: true, secure: true });

// Пример 3: Отсутствие валидации
// ❌ Уязвимо:
fetch(\`/api/user/\${userId}\`);
// ✅ Исправление:
if (!/^\\d+$/.test(userId)) {
  throw new Error('Invalid user ID');
}
fetch(\`/api/user/\${userId}\`);`
      }
    ],
    relatedTopics: ['owasp-basics', 'owasp-injections', 'xss-basics']
  }
];
