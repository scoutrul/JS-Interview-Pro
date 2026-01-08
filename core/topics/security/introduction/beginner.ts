import { Topic } from '../../../types';

export const SECURITY_INTRODUCTION_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'security-intro',
    title: 'Что такое веб-безопасность и зачем она нужна',
    description: 'Веб-безопасность — это практика защиты веб-приложений от различных угроз и атак. Для фронтенд-разработчиков критически важно понимать основные уязвимости и способы защиты, так как клиентская часть часто является первой линией защиты и точкой входа для атак.',
    difficulty: 'beginner',
    tags: ['security', 'basics', 'introduction', 'web-security'],
    keyPoints: [
      'Веб-безопасность защищает приложения от несанкционированного доступа, утечки данных и атак.',
      'Фронтенд уязвим для XSS, CSRF, кликджекинга и других атак.',
      'Безопасность — это не только бэкенд, но и клиентская часть приложения.',
      'Защита должна быть многоуровневой (defense in depth).',
      'Понимание безопасности критично для технических собеседований.'
    ],
    examples: [
      {
        title: 'Примеры угроз для фронтенда',
        code: `// XSS - выполнение вредоносного кода
const userInput = "<script>alert('XSS')</script>";
document.getElementById('output').innerHTML = userInput; // ❌ Опасно!

// CSRF - выполнение действий от имени пользователя
// Злоумышленник может заставить пользователя выполнить действие без ведома

// Утечка данных через localStorage
localStorage.setItem('token', 'secret-token'); // ❌ Уязвимо для XSS`
      }
    ],
    relatedTopics: ['xss-basics', 'csrf-basics', 'cors-basics']
  },
  {
    id: 'security-threats',
    title: 'Основные угрозы для фронтенд-приложений',
    description: 'Фронтенд-приложения подвержены множеству угроз: от межсайтового скриптинга (XSS) до подделки межсайтовых запросов (CSRF). Понимание этих угроз — первый шаг к созданию безопасных приложений.',
    difficulty: 'beginner',
    tags: ['security', 'threats', 'xss', 'csrf', 'basics'],
    keyPoints: [
      'XSS (Cross-Site Scripting): выполнение вредоносного JavaScript кода.',
      'CSRF (Cross-Site Request Forgery): выполнение действий от имени пользователя.',
      'CORS ошибки: проблемы с кросс-доменными запросами.',
      'Утечка данных: неправильное хранение токенов и паролей.',
      'Clickjacking: обман пользователя для клика по скрытому элементу.'
    ],
    examples: [
      {
        title: 'Основные категории угроз',
        code: `// 1. XSS - межсайтовый скриптинг
// Пользовательский ввод выполняется как код
element.innerHTML = userComment; // ❌

// 2. CSRF - подделка запросов
// Запрос отправляется с другого сайта
fetch('https://bank.com/transfer', {
  method: 'POST',
  body: JSON.stringify({ to: 'attacker', amount: 1000 })
}); // ❌ Без защиты

// 3. Утечка данных
localStorage.setItem('password', userPassword); // ❌ Никогда!`
      }
    ],
    relatedTopics: ['xss-basics', 'csrf-basics', 'data-storage-basics']
  },
  {
    id: 'security-principles',
    title: 'Принцип наименьших привилегий',
    description: 'Принцип наименьших привилегий означает, что пользователи и компоненты системы должны иметь только минимально необходимые права доступа для выполнения своих задач. Это снижает риск ущерба в случае компрометации.',
    difficulty: 'beginner',
    tags: ['security', 'principles', 'access-control', 'basics'],
    keyPoints: [
      'Предоставлять минимально необходимые права доступа.',
      'Не хранить больше данных, чем необходимо.',
      'Ограничивать доступ к API и ресурсам.',
      'Использовать роли и права доступа.',
      'Регулярно пересматривать и ограничивать права.'
    ],
    examples: [
      {
        title: 'Применение принципа',
        code: `// ❌ Плохо: слишком много прав
const adminToken = getToken(); // Полный доступ
localStorage.setItem('token', adminToken);

// ✅ Хорошо: минимальные права
const readOnlyToken = getReadOnlyToken(); // Только чтение
sessionStorage.setItem('token', readOnlyToken);

// ❌ Плохо: хранение лишних данных
localStorage.setItem('user', JSON.stringify({
  id, name, email, password, creditCard // ❌
}));

// ✅ Хорошо: только необходимое
localStorage.setItem('user', JSON.stringify({
  id, name // ✅
}));`
      }
    ],
    relatedTopics: ['authentication-basics', 'data-storage-basics']
  },
  {
    id: 'defense-in-depth',
    title: 'Defense in depth (защита в глубину)',
    description: 'Defense in depth — это стратегия безопасности, при которой используется несколько уровней защиты. Если один уровень защиты провалится, другие уровни продолжат защищать систему.',
    difficulty: 'beginner',
    tags: ['security', 'principles', 'defense-in-depth', 'basics'],
    keyPoints: [
      'Многоуровневая защита: несколько независимых механизмов защиты.',
      'Не полагаться на один метод защиты.',
      'Пример: санитизация + экранирование + CSP для защиты от XSS.',
      'Защита на разных уровнях: клиент, сервер, сеть.',
      'Регулярный аудит и обновление защиты.'
    ],
    examples: [
      {
        title: 'Многоуровневая защита от XSS',
        code: `// Уровень 1: Санитизация на бэкенде
function sanitizeInput(input: string): string {
  return input.replace(/<script[^>]*>.*?<\/script>/gi, '');
}

// Уровень 2: Экранирование на фронтенде
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Уровень 3: Content Security Policy
// Content-Security-Policy: script-src 'self'

// ✅ Использование всех уровней
const userInput = getUserInput();
const sanitized = sanitizeInput(userInput); // Уровень 1
const escaped = escapeHtml(sanitized); // Уровень 2
element.textContent = escaped; // Безопасно + CSP (Уровень 3)`
      },
      {
        title: 'Защита от CSRF',
        code: `// Уровень 1: CSRF токен
const csrfToken = getCSRFToken();
formData.append('csrf_token', csrfToken);

// Уровень 2: SameSite cookies
// Set-Cookie: sessionId=abc; SameSite=Strict

// Уровень 3: Проверка Origin header
if (request.headers.origin !== 'https://trusted-domain.com') {
  return reject();
}

// ✅ Все три уровня работают вместе`
      }
    ],
    relatedTopics: ['xss-intermediate', 'csrf-intermediate', 'csp-basics']
  }
];
