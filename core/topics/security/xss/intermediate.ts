import { Topic } from '../../../types';

export const SECURITY_XSS_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'xss-escaping',
    title: 'Экранирование HTML (escaping)',
    description: 'Экранирование HTML — это процесс преобразования специальных символов HTML в их безопасные представления (HTML entities), чтобы они отображались как текст, а не интерпретировались браузером как код.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'xss', 'escaping', 'html', 'front-end-essential'],
    keyPoints: [
      'Экранирование преобразует < в &lt;, > в &gt;, & в &amp; и т.д.',
      'textContent автоматически экранирует HTML.',
      'innerHTML требует ручного экранирования или санитизации.',
      'Разные контексты требуют разного экранирования (HTML, атрибуты, JavaScript, CSS).',
      'Использовать готовые библиотеки для экранирования.'
    ],
    examples: [
      {
        title: 'Ручное экранирование HTML',
        code: `// Функция экранирования HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

// ❌ Опасно
const userInput = '<script>alert("XSS")</script>';
element.innerHTML = userInput; // Выполнится!

// ✅ Безопасно
const userInput = '<script>alert("XSS")</script>';
element.innerHTML = escapeHtml(userInput); // Отобразится как текст

// ✅ Еще лучше - использовать textContent
element.textContent = userInput; // Автоматически безопасно`
      },
      {
        title: 'Экранирование в разных контекстах',
        code: `// 1. HTML контекст
const htmlText = '<script>alert("XSS")</script>';
element.innerHTML = escapeHtml(htmlText); // ✅

// 2. Атрибуты HTML
const userClass = '"><script>alert("XSS")</script>';
// ❌ Опасно
element.className = userClass;

// ✅ Безопасно - экранирование атрибутов
function escapeAttribute(value: string): string {
  return value.replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}
element.setAttribute('class', escapeAttribute(userClass));

// 3. JavaScript контекст (внутри <script>)
const userName = '"; alert("XSS"); //';
// ❌ Опасно
const script = \`<script>const name = "\${userName}";</script>\`;

// ✅ Безопасно - JSON.stringify для экранирования
const script = \`<script>const name = \${JSON.stringify(userName)};</script>\`;

// 4. URL контекст
const redirectUrl = 'javascript:alert("XSS")';
// ❌ Опасно
element.href = redirectUrl;

// ✅ Безопасно - проверка протокола
function safeUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return '#';
}`
      },
      {
        title: 'textContent vs innerHTML',
        code: `// textContent - всегда безопасно
const userInput = '<script>alert("XSS")</script><b>Bold</b>';
element.textContent = userInput;
// Отобразится: <script>alert("XSS")</script><b>Bold</b>
// HTML не интерпретируется, только текст

// innerHTML - требует экранирования
element.innerHTML = userInput;
// Выполнится script, <b> отобразится как жирный текст
// ❌ Опасно без санитизации!

// ✅ Если нужен HTML, использовать санитизацию
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
element.innerHTML = clean; // ✅ Безопасно

// Правило: используйте textContent, если не нужен HTML`
      }
    ],
    relatedTopics: ['xss-basics', 'xss-sanitization', 'csp-basics']
  },
  {
    id: 'xss-sanitization',
    title: 'Санитизация входных данных',
    description: 'Санитизация — это процесс очистки пользовательского ввода от потенциально опасных элементов, оставляя только безопасные части. В отличие от экранирования, санитизация позволяет сохранить некоторое форматирование (например, HTML теги для форматирования текста).',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'xss', 'sanitization', 'dompurify', 'front-end-essential'],
    keyPoints: [
      'Санитизация удаляет опасные элементы, оставляя безопасные.',
      'DOMPurify — популярная библиотека для санитизации HTML.',
      'Whitelist подход: разрешать только известные безопасные теги и атрибуты.',
      'Настраивать список разрешенных тегов и атрибутов под конкретные нужды.',
      'Санитизация на клиенте НЕ заменяет валидацию на сервере.'
    ],
    examples: [
      {
        title: 'Использование DOMPurify',
        code: `import DOMPurify from 'dompurify';

// Базовое использование
const dirty = '<img src=x onerror=alert(1)>';
const clean = DOMPurify.sanitize(dirty);
// Результат: <img src="x"> (onerror удален)

// С настройками - разрешить только определенные теги
const config = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
  ALLOWED_ATTR: []
};
const clean2 = DOMPurify.sanitize(dirty, config);
// Результат: только текст (все теги удалены)

// Разрешить атрибуты
const config2 = {
  ALLOWED_TAGS: ['a', 'img'],
  ALLOWED_ATTR: ['href', 'src', 'alt'],
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
};
const link = '<a href="https://example.com">Link</a>';
const cleanLink = DOMPurify.sanitize(link, config2); // ✅`
      },
      {
        title: 'Кастомная санитизация',
        code: `// Простая функция санитизации (для базовых случаев)
function sanitizeHtml(html: string): string {
  // Создаем временный элемент
  const temp = document.createElement('div');
  temp.textContent = html; // Автоматически экранирует
  
  // Если нужен HTML, используем DOMPurify
  return temp.innerHTML; // Или DOMPurify.sanitize(html)
}

// Whitelist подход для атрибутов
function sanitizeAttributes(element: HTMLElement, allowedAttrs: string[]): void {
  const attrs = Array.from(element.attributes);
  attrs.forEach(attr => {
    if (!allowedAttrs.includes(attr.name)) {
      element.removeAttribute(attr.name);
    }
  });
}

// Пример использования
const userContent = '<div onclick="alert(1)" class="user-content">Text</div>';
const temp = document.createElement('div');
temp.innerHTML = userContent;
const element = temp.firstElementChild as HTMLElement;

if (element) {
  sanitizeAttributes(element, ['class']); // Оставить только class
  // onclick удален ✅`
      },
      {
        title: 'Санитизация для разных контекстов',
        code: `// 1. HTML контент (комментарии, посты)
const userPost = '<p>My post with <script>alert("XSS")</script></p>';
const cleanPost = DOMPurify.sanitize(userPost, {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
  ALLOWED_ATTR: ['href']
});

// 2. Имена пользователей (только текст)
const username = '<script>alert("XSS")</script>';
const cleanUsername = DOMPurify.sanitize(username, {
  ALLOWED_TAGS: [] // Никаких тегов
});

// 3. URL (проверка протокола)
function sanitizeUrl(url: string): string {
  const clean = DOMPurify.sanitize(url);
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  return '#';
}

// 4. JSON данные
function sanitizeJson(data: unknown): unknown {
  // Валидация структуры и типов
  if (typeof data === 'string') {
    return DOMPurify.sanitize(data);
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeJson);
  }
  if (typeof data === 'object' && data !== null) {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeJson(value);
    }
    return sanitized;
  }
  return data;
}`
      }
    ],
    relatedTopics: ['xss-escaping', 'xss-textcontent-innerhtml', 'csp-basics']
  },
  {
    id: 'xss-textcontent-innerhtml',
    title: 'textContent vs innerHTML',
    description: 'textContent и innerHTML — два способа установки содержимого элемента, но с критической разницей в безопасности. textContent всегда безопасен, innerHTML требует осторожности и санитизации.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'xss', 'textcontent', 'innerhtml', 'dom', 'front-end-essential'],
    keyPoints: [
      'textContent: устанавливает текстовое содержимое, HTML экранируется автоматически.',
      'innerHTML: устанавливает HTML содержимое, код выполняется.',
      'textContent безопасен по умолчанию, innerHTML опасен без санитизации.',
      'Использовать textContent, если не нужен HTML.',
      'Если нужен HTML, использовать innerHTML только с санитизацией (DOMPurify).'
    ],
    examples: [
      {
        title: 'Сравнение textContent и innerHTML',
        code: `const userInput = '<script>alert("XSS")</script><b>Bold</b>';

// textContent - безопасно
element.textContent = userInput;
// Отображается: <script>alert("XSS")</script><b>Bold</b>
// Весь текст как есть, HTML не интерпретируется ✅

// innerHTML - опасно
element.innerHTML = userInput;
// Выполнится alert("XSS"), <b>Bold</b> отобразится жирным
// ❌ XSS уязвимость!

// innerHTML с санитизацией - безопасно
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
// <script> удален, <b>Bold</b> отобразится жирным ✅`
      },
      {
        title: 'Практика: когда что использовать',
        code: `// ✅ textContent для:
// - Имен пользователей
const username = getUserInput();
element.textContent = username;

// - Комментариев (если не нужен HTML)
const comment = getUserInput();
commentElement.textContent = comment;

// - Любого пользовательского ввода без форматирования
const userData = getUserInput();
dataElement.textContent = userData;

// ✅ innerHTML с санитизацией для:
// - Богатого текста (rich text)
const richText = getUserInput();
element.innerHTML = DOMPurify.sanitize(richText, {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
  ALLOWED_ATTR: ['href']
});

// - Контента из доверенного источника (с проверкой!)
const trustedContent = getTrustedContent();
if (isTrustedSource(trustedContent)) {
  element.innerHTML = DOMPurify.sanitize(trustedContent);
}

// ❌ Никогда innerHTML без санитизации для пользовательского ввода!`
      },
      {
        title: 'Типичный вопрос на собеседовании',
        code: `// Вопрос: "Что будет уязвимо и как исправить?"

// ❌ Уязвимый код
const userComment = "<script>alert('XSS')</script>";
document.getElementById('output').innerHTML = userComment;

// ✅ Исправление 1: textContent
document.getElementById('output').textContent = userComment;

// ✅ Исправление 2: innerHTML с санитизацией
import DOMPurify from 'dompurify';
document.getElementById('output').innerHTML = DOMPurify.sanitize(userComment);

// ✅ Исправление 3: Экранирование
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
document.getElementById('output').innerHTML = escapeHtml(userComment);`
      }
    ],
    relatedTopics: ['xss-basics', 'xss-escaping', 'xss-sanitization']
  },
  {
    id: 'xss-dompurify',
    title: 'DOMPurify и другие библиотеки',
    description: 'DOMPurify — это популярная и надежная библиотека для санитизации HTML. Она использует whitelist подход и защищает от XSS атак, позволяя при этом использовать безопасные HTML теги для форматирования.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'xss', 'dompurify', 'libraries', 'sanitization', 'front-end-essential'],
    keyPoints: [
      'DOMPurify — стандарт де-факто для санитизации HTML на клиенте.',
      'Использует whitelist подход (разрешает только безопасное).',
      'Настраиваемый список разрешенных тегов и атрибутов.',
      'Работает в браузере и Node.js (с jsdom).',
      'Регулярно обновляется и поддерживается.'
    ],
    examples: [
      {
        title: 'Установка и базовое использование',
        code: `// Установка: npm install dompurify
// Для TypeScript: npm install @types/dompurify

import DOMPurify from 'dompurify';

// Базовое использование
const dirty = '<img src=x onerror=alert(1)>';
const clean = DOMPurify.sanitize(dirty);
// Результат: <img src="x"> (onerror удален)

// С настройками
const config = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'a'],
  ALLOWED_ATTR: ['href', 'title'],
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
};

const html = '<a href="https://example.com" onclick="alert(1)">Link</a>';
const cleanHtml = DOMPurify.sanitize(html, config);
// Результат: <a href="https://example.com">Link</a> (onclick удален)`
      },
      {
        title: 'Продвинутые настройки',
        code: `import DOMPurify from 'dompurify';

// Настройка для разных сценариев

// 1. Только текст (никаких тегов)
const textOnly = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: []
});

// 2. Базовое форматирование
const basicFormatting = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
  ALLOWED_ATTR: []
});

// 3. Ссылки разрешены
const withLinks = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: ['a', 'p', 'br'],
  ALLOWED_ATTR: ['href', 'title'],
  ALLOWED_URI_REGEXP: /^https?:\/\//i // Только http/https
});

// 4. Изображения разрешены
const withImages = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: ['img', 'p'],
  ALLOWED_ATTR: ['src', 'alt', 'title'],
  ALLOWED_URI_REGEXP: /^https?:\/\//i
});`
      },
      {
        title: 'Альтернативные библиотеки',
        code: `// 1. DOMPurify (рекомендуется)
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(dirty);

// 2. sanitize-html (для Node.js)
import sanitizeHtml from 'sanitize-html';
const clean2 = sanitizeHtml(dirty, {
  allowedTags: ['b', 'i', 'em', 'strong'],
  allowedAttributes: {}
});

// 3. xss (для Node.js)
import xss from 'xss';
const clean3 = xss(dirty, {
  whiteList: {
    a: ['href', 'title'],
    p: []
  }
});

// Для фронтенда лучше использовать DOMPurify`
      }
    ],
    relatedTopics: ['xss-sanitization', 'xss-textcontent-innerhtml', 'csp-basics']
  },
  {
    id: 'xss-csp-basics',
    title: 'Content Security Policy (CSP) базовые',
    description: 'Content Security Policy (CSP) — это механизм безопасности, который позволяет контролировать, какие ресурсы (скрипты, стили, изображения) могут загружаться и выполняться на странице. CSP является последним уровнем защиты от XSS.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'xss', 'csp', 'content-security-policy', 'front-end-essential'],
    keyPoints: [
      'CSP — это HTTP заголовок, который ограничивает источники ресурсов.',
      'CSP блокирует выполнение inline скриптов и стилей.',
      'script-src \'self\' разрешает скрипты только с того же домена.',
      'CSP работает как последний уровень защиты (defense in depth).',
      'CSP не заменяет санитизацию, а дополняет её.'
    ],
    examples: [
      {
        title: 'Базовые директивы CSP',
        code: `// HTTP заголовок
// Content-Security-Policy: script-src 'self'

// Или в HTML
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self'; style-src 'self' 'unsafe-inline';">

// script-src 'self' - скрипты только с того же домена
// ❌ Блокируется:
<script>alert('XSS')</script> // inline скрипт
<script src="https://evil.com/script.js"></script> // внешний домен

// ✅ Разрешается:
<script src="/js/app.js"></script> // тот же домен

// style-src 'self' 'unsafe-inline' - стили с того же домена + inline
// 'unsafe-inline' нужен для inline стилей (небезопасно, но иногда необходимо)`
      },
      {
        title: 'CSP и XSS защита',
        code: `// Даже если XSS прошел через санитизацию, CSP может заблокировать

// Пример: злоумышленник внедрил скрипт
const malicious = '<script>stealCookies()</script>';
element.innerHTML = DOMPurify.sanitize(malicious); // Удалил <script>

// Но если бы <script> остался:
// CSP: script-src 'self' заблокировал бы выполнение

// CSP также блокирует:
// - eval()
eval('alert("XSS")'); // ❌ Заблокировано CSP

// - inline event handlers
<div onclick="alert('XSS')">Click</div>; // ❌ Заблокировано

// - javascript: URLs
<a href="javascript:alert('XSS')">Link</a>; // ❌ Заблокировано

// Многоуровневая защита:
// 1. Санитизация (DOMPurify)
// 2. Экранирование (textContent)
// 3. CSP (последний уровень)`
      },
      {
        title: 'Практика: "Что будет уязвимо и как исправить?"',
        code: `// ❌ Уязвимый код
const userInput = "<script>alert('XSS')</script>";
document.getElementById('output').innerHTML = userInput;

// ✅ Исправление 1: textContent
document.getElementById('output').textContent = userInput;

// ✅ Исправление 2: Санитизация
import DOMPurify from 'dompurify';
document.getElementById('output').innerHTML = DOMPurify.sanitize(userInput);

// ✅ Исправление 3: CSP заголовок
// Content-Security-Policy: script-src 'self'
// (добавляется на сервере)

// ✅ Полная защита (defense in depth):
// 1. Санитизация на бэкенде
// 2. Экранирование на фронтенде
// 3. CSP заголовок`
      }
    ],
    relatedTopics: ['xss-basics', 'xss-sanitization', 'csp-basics', 'csp-intermediate']
  }
];
