import { Topic } from '../../../types';

export const SECURITY_XSS_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'xss-advanced-techniques',
    title: 'Продвинутые техники защиты',
    description: 'Продвинутые техники защиты от XSS включают использование Trusted Types, Subresource Integrity (SRI), и комбинирование различных механизмов защиты для создания многоуровневой системы безопасности.',
    difficulty: 'advanced',
    tags: ['security', 'xss', 'advanced', 'trusted-types', 'sri'],
    keyPoints: [
      'Trusted Types API: браузерный API для предотвращения DOM-based XSS.',
      'Subresource Integrity (SRI): проверка целостности внешних скриптов и стилей.',
      'Комбинирование техник: санитизация + CSP + Trusted Types.',
      'Автоматическое тестирование на XSS уязвимости.',
      'Мониторинг и обнаружение XSS атак в production.'
    ],
    examples: [
      {
        title: 'Trusted Types API',
        code: `// Trusted Types требует явного создания безопасных строк

// Включение Trusted Types через CSP
// Content-Security-Policy: require-trusted-types-for 'script'

// Создание политики
const policy = trustedTypes.createPolicy('default', {
  createHTML: (string) => {
    // Санитизация HTML
    return DOMPurify.sanitize(string);
  },
  createScript: (string) => {
    // Валидация скриптов
    if (string.includes('<script')) {
      throw new Error('Invalid script');
    }
    return string;
  }
});

// Использование
const userInput = '<script>alert("XSS")</script>';
// ❌ Без Trusted Types это было бы опасно
element.innerHTML = policy.createHTML(userInput); // ✅ Безопасно

// Прямое присваивание заблокировано
// element.innerHTML = userInput; // ❌ Trusted Types заблокирует`
      },
      {
        title: 'Subresource Integrity (SRI)',
        code: `// SRI проверяет целостность внешних ресурсов

// Генерация hash для скрипта
// openssl dgst -sha384 -binary script.js | openssl base64 -A

// Использование в HTML
<script 
  src="https://cdn.example.com/library.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous">
</script>

// Если скрипт изменен, браузер не загрузит его
// Защита от компрометации CDN

// Для стилей
<link 
  rel="stylesheet"
  href="https://cdn.example.com/style.css"
  integrity="sha384-..."
  crossorigin="anonymous">`
      },
      {
        title: 'Комбинирование техник защиты',
        code: `// Многоуровневая защита от XSS

// Уровень 1: Валидация на сервере
function validateInput(input: string): boolean {
  // Проверка структуры, длины, формата
  return /^[a-zA-Z0-9\\s.,!?]+$/.test(input);
}

// Уровень 2: Санитизация на сервере
function sanitizeServer(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

// Уровень 3: Санитизация на клиенте
import DOMPurify from 'dompurify';
function sanitizeClient(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
    ALLOWED_ATTR: []
  });
}

// Уровень 4: Использование textContent (если возможно)
function renderSafe(element: HTMLElement, content: string): void {
  element.textContent = content; // Предпочтительно
}

// Уровень 5: CSP
// Content-Security-Policy: script-src 'self'; require-trusted-types-for 'script'

// Уровень 6: Trusted Types (если поддерживается)
if (window.trustedTypes) {
  const policy = trustedTypes.createPolicy('default', {
    createHTML: DOMPurify.sanitize
  });
}`
      }
    ],
    relatedTopics: ['xss-intermediate', 'csp-advanced', 'trusted-types']
  },
  {
    id: 'xss-csp-advanced',
    title: 'CSP продвинутые настройки',
    description: 'Продвинутые настройки CSP включают использование nonce и hash для inline скриптов, настройку директив для разных типов ресурсов, и интеграцию с современными фреймворками.',
    difficulty: 'advanced',
    tags: ['security', 'xss', 'csp', 'nonce', 'hash', 'advanced'],
    keyPoints: [
      'Nonce: одноразовые значения для разрешения конкретных inline скриптов.',
      'Hash: SHA-256/384/512 хеши для разрешения конкретных inline скриптов.',
      'Директивы для разных типов ресурсов: script-src, style-src, img-src и т.д.',
      'Интеграция CSP с React, Angular, Vue.',
      'Report-uri для мониторинга нарушений CSP.'
    ],
    examples: [
      {
        title: 'Nonce для inline скриптов',
        code: `// Генерация nonce на сервере
const nonce = crypto.randomBytes(16).toString('base64');

// CSP заголовок
// Content-Security-Policy: script-src 'nonce-\${nonce}'

// В HTML
<script nonce="\${nonce}">
  // Этот скрипт выполнится
  console.log('Safe script');
</script>

<script>
  // Этот скрипт НЕ выполнится (нет nonce)
  console.log('Blocked script');
</script>

// ❌ Злоумышленник не может угадать nonce
<script nonce="wrong-nonce">
  alert('XSS'); // Заблокировано
</script>`
      },
      {
        title: 'Hash для inline скриптов',
        code: `// Генерация hash для скрипта
// echo -n "console.log('Hello');" | openssl dgst -sha256 -binary | openssl base64

// CSP заголовок
// Content-Security-Policy: script-src 'sha256-abc123...'

// В HTML
<script>
  console.log('Hello'); // ✅ Выполнится (hash совпадает)
</script>

<script>
  console.log('Different'); // ❌ Заблокировано (hash не совпадает)
</script>

// Полезно для статических inline скриптов`
      },
      {
        title: 'CSP для React приложения',
        code: `// CSP конфигурация для React

// Content-Security-Policy: 
//   default-src 'self';
//   script-src 'self' 'unsafe-inline' 'unsafe-eval'; // Для dev режима
//   style-src 'self' 'unsafe-inline'; // Для CSS-in-JS
//   img-src 'self' data: https:;
//   connect-src 'self' https://api.example.com;
//   font-src 'self' data:;

// Для production лучше использовать nonce
// Content-Security-Policy: 
//   script-src 'self' 'nonce-\${nonce}';
//   style-src 'self' 'nonce-\${nonce}';

// В React с nonce
// index.html
<script nonce="\${nonce}" src="/static/js/bundle.js"></script>

// Для CSS-in-JS (styled-components, emotion)
// Может потребоваться 'unsafe-inline' для style-src
// Или использовать nonce для style тегов`
      },
      {
        title: 'Report-uri для мониторинга',
        code: `// CSP с report-uri для отправки нарушений
// Content-Security-Policy: 
//   script-src 'self';
//   report-uri /api/csp-report;

// Браузер отправит POST запрос при нарушении
// {
//   "csp-report": {
//     "document-uri": "https://example.com/page",
//     "violated-directive": "script-src",
//     "blocked-uri": "https://evil.com/script.js",
//     "source-file": "https://example.com/page",
//     "line-number": 42
//   }
// }

// Обработка на сервере
app.post('/api/csp-report', (req, res) => {
  const report = req.body['csp-report'];
  // Логирование, алерты, анализ
  console.warn('CSP violation:', report);
  res.status(204).send();
});

// report-to (новый API, заменяет report-uri)
// Content-Security-Policy: script-src 'self'; report-to csp-endpoint
// Report-To: {"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"/api/csp-report"}]}`
      }
    ],
    relatedTopics: ['xss-csp-basics', 'csp-intermediate', 'csp-advanced']
  },
  {
    id: 'xss-sri',
    title: 'Subresource Integrity (SRI)',
    description: 'Subresource Integrity (SRI) — это механизм безопасности, который позволяет браузеру проверять целостность загружаемых ресурсов (скриптов, стилей) путем сравнения их хеша с ожидаемым значением.',
    difficulty: 'advanced',
    tags: ['security', 'xss', 'sri', 'integrity', 'advanced'],
    keyPoints: [
      'SRI проверяет, что ресурс не был изменен после публикации.',
      'Защищает от компрометации CDN и подмены ресурсов.',
      'Использует SHA-256, SHA-384 или SHA-512 хеши.',
      'Генерация hash: openssl dgst -sha384 -binary file.js | openssl base64 -A.',
      'SRI работает только для внешних ресурсов (cross-origin).'
    ],
    examples: [
      {
        title: 'Генерация и использование SRI hash',
        code: `// Генерация hash для скрипта
// openssl dgst -sha384 -binary library.js | openssl base64 -A

// Использование в HTML
<script 
  src="https://cdn.example.com/library.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous">
</script>

// Если файл изменен, браузер не загрузит его
// В консоли будет ошибка: "Failed to find a valid digest"

// Для стилей
<link 
  rel="stylesheet"
  href="https://cdn.example.com/style.css"
  integrity="sha384-abc123..."
  crossorigin="anonymous">

// Несколько hash (fallback)
<script 
  src="https://cdn.example.com/library.js"
  integrity="sha384-hash1 sha256-hash2"
  crossorigin="anonymous">
</script>`
      },
      {
        title: 'Автоматическая генерация SRI',
        code: `// Использование webpack-subresource-integrity plugin
// npm install webpack-subresource-integrity

// webpack.config.js
const SubresourceIntegrityPlugin = require('webpack-subresource-integrity');

module.exports = {
  output: {
    crossOriginLoading: 'anonymous'
  },
  plugins: [
    new SubresourceIntegrityPlugin({
      hashFuncNames: ['sha384']
    })
  ]
};

// Автоматически добавит integrity атрибуты к chunk файлам

// Или через HTMLWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new SubresourceIntegrityPlugin()
  ]
};`
      },
      {
        title: 'SRI и CORS',
        code: `// SRI требует CORS заголовки для cross-origin ресурсов

// Ресурс должен отдавать:
// Access-Control-Allow-Origin: *

// Или конкретный домен
// Access-Control-Allow-Origin: https://example.com

// crossorigin="anonymous" обязателен для SRI
<script 
  src="https://cdn.example.com/script.js"
  integrity="sha384-..."
  crossorigin="anonymous"> // ✅ Обязательно
</script>

// Без crossorigin SRI не будет работать
<script 
  src="https://cdn.example.com/script.js"
  integrity="sha384-...">
  // ❌ SRI не сработает
</script>

// Для same-origin ресурсов crossorigin не нужен
<script 
  src="/js/app.js"
  integrity="sha384-...">
  // ✅ Работает без crossorigin
</script>`
      }
    ],
    relatedTopics: ['xss-advanced-techniques', 'cors-intermediate']
  },
  {
    id: 'xss-trusted-types',
    title: 'Trusted Types',
    description: 'Trusted Types — это браузерный API, который предотвращает DOM-based XSS путем требования явного создания безопасных строк для опасных DOM API (innerHTML, outerHTML, insertAdjacentHTML и т.д.).',
    difficulty: 'advanced',
    tags: ['security', 'xss', 'trusted-types', 'dom-api', 'advanced'],
    keyPoints: [
      'Trusted Types блокирует прямые присваивания к опасным DOM API.',
      'Требует создания политик (policies) для санитизации.',
      'Включается через CSP: require-trusted-types-for \'script\'.',
      'Поддерживается в Chrome, Edge, планируется в других браузерах.',
      'Работает как дополнительный уровень защиты от DOM-based XSS.'
    ],
    examples: [
      {
        title: 'Включение и базовое использование',
        code: `// Включение через CSP
// Content-Security-Policy: require-trusted-types-for 'script'

// Создание политики
const policy = trustedTypes.createPolicy('default', {
  createHTML: (string) => {
    // Санитизация HTML
    return DOMPurify.sanitize(string);
  },
  createScript: (string) => {
    // Валидация скриптов (обычно запрещено)
    throw new Error('Inline scripts not allowed');
  },
  createScriptURL: (string) => {
    // Валидация URL для скриптов
    if (!string.startsWith('https://trusted-cdn.com/')) {
      throw new Error('Untrusted script source');
    }
    return string;
  }
});

// Использование
const userInput = '<script>alert("XSS")</script>';
// ❌ Без Trusted Types это было бы опасно
element.innerHTML = policy.createHTML(userInput); // ✅ Безопасно

// Прямое присваивание заблокировано
// element.innerHTML = userInput; // ❌ TypeError: Failed to set the 'innerHTML' property`
      },
      {
        title: 'Интеграция с DOMPurify',
        code: `import DOMPurify from 'dompurify';

// Создание политики с DOMPurify
const sanitizePolicy = trustedTypes.createPolicy('sanitize', {
  createHTML: (input) => {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
      ALLOWED_ATTR: ['href']
    });
  }
});

// Использование
function renderUserContent(element: HTMLElement, content: string): void {
  // Trusted Types автоматически использует политику
  element.innerHTML = content; // ✅ Автоматически санитизируется через политику
}

// Если политика не создана, будет ошибка
// element.innerHTML = content; // ❌ TypeError`
      },
      {
        title: 'Множественные политики',
        code: `// Разные политики для разных случаев

// Политика для пользовательского контента
const userContentPolicy = trustedTypes.createPolicy('user-content', {
  createHTML: (input) => DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em']
  })
});

// Политика для администраторского контента (больше разрешений)
const adminContentPolicy = trustedTypes.createPolicy('admin-content', {
  createHTML: (input) => DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a', 'img', 'table'],
    ALLOWED_ATTR: ['href', 'src', 'alt']
  })
});

// Использование
if (user.isAdmin) {
  element.innerHTML = adminContentPolicy.createHTML(content);
} else {
  element.innerHTML = userContentPolicy.createHTML(content);
}`
      },
      {
        title: 'Fallback для браузеров без поддержки',
        code: `// Проверка поддержки и fallback

if (window.trustedTypes && window.trustedTypes.createPolicy) {
  // Браузер поддерживает Trusted Types
  const policy = trustedTypes.createPolicy('default', {
    createHTML: (input) => DOMPurify.sanitize(input)
  });
  
  // Использование политики
  element.innerHTML = policy.createHTML(userInput);
} else {
  // Fallback: прямая санитизация
  element.innerHTML = DOMPurify.sanitize(userInput);
}

// Или использовать полифилл
// npm install trusted-types

import 'trusted-types/lib';
// Теперь Trusted Types доступен во всех браузерах`
      }
    ],
    relatedTopics: ['xss-advanced-techniques', 'xss-csp-advanced', 'csp-advanced']
  }
];
