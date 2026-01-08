import { Topic } from '../../../types';

export const SECURITY_CSP_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'csp-advanced-directives',
    title: 'Продвинутые директивы CSP',
    description: 'Продвинутые директивы CSP включают worker-src, manifest-src, base-uri, form-action и другие, которые контролируют более специфичные аспекты безопасности страницы.',
    difficulty: 'advanced',
    tags: ['security', 'csp', 'advanced', 'directives'],
    keyPoints: [
      'worker-src: источники для Web Workers.',
      'manifest-src: источники для web app manifests.',
      'base-uri: разрешенные значения для <base> тега.',
      'form-action: куда могут отправляться формы.',
      'frame-ancestors: кто может встроить страницу в iframe.'
    ],
    examples: [
      {
        title: 'Продвинутые директивы',
        code: `// Content-Security-Policy:
//   default-src 'self';
//   script-src 'self';
//   worker-src 'self'; // Для Web Workers
//   manifest-src 'self'; // Для web app manifests
//   base-uri 'self'; // Защита от base tag injection
//   form-action 'self'; // Куда могут отправляться формы
//   frame-ancestors 'none'; // Защита от clickjacking (никто не может встроить в iframe)`
      }
    ],
    relatedTopics: ['csp-directives', 'csp-level3']
  },
  {
    id: 'csp-level3',
    title: 'CSP Level 3',
    description: 'CSP Level 3 добавляет новые возможности: strict-dynamic, \'unsafe-hashed-attributes\', и улучшенную поддержку nonce и hash. Эти возможности делают CSP более гибким и безопасным.',
    difficulty: 'advanced',
    tags: ['security', 'csp', 'level3', 'strict-dynamic', 'advanced'],
    keyPoints: [
      'strict-dynamic: разрешает скрипты, загруженные доверенными скриптами.',
      '\'unsafe-hashed-attributes\': разрешает inline event handlers с hash.',
      'Улучшенная поддержка nonce и hash.',
      'CSP Level 3 делает политику более гибкой.',
      'Поддержка зависит от браузера.'
    ],
    examples: [
      {
        title: 'strict-dynamic',
        code: `// strict-dynamic разрешает скрипты, загруженные доверенными скриптами
// Content-Security-Policy: script-src 'nonce-\${nonce}' 'strict-dynamic'

// ✅ Доверенный скрипт с nonce может загружать другие скрипты
<script nonce="\${nonce}" src="/trusted-loader.js"></script>
// trusted-loader.js может динамически загружать другие скрипты

// ❌ Скрипты без nonce заблокированы
<script src="/untrusted.js"></script> // Заблокировано`
      }
    ],
    relatedTopics: ['csp-nonce-hash', 'csp-trusted-types']
  },
  {
    id: 'csp-trusted-types',
    title: 'Trusted Types интеграция',
    description: 'Trusted Types API интегрируется с CSP через директиву require-trusted-types-for. Это позволяет предотвратить DOM-based XSS путем требования явного создания безопасных строк для опасных DOM API.',
    difficulty: 'advanced',
    tags: ['security', 'csp', 'trusted-types', 'dom-api', 'advanced'],
    keyPoints: [
      'require-trusted-types-for \'script\': требует Trusted Types для опасных DOM API.',
      'Trusted Types блокирует прямые присваивания к innerHTML, outerHTML и т.д.',
      'Требует создания политик для санитизации.',
      'Интегрируется с DOMPurify для автоматической санитизации.',
      'Поддерживается в Chrome, Edge, планируется в других браузерах.'
    ],
    examples: [
      {
        title: 'CSP и Trusted Types',
        code: `// CSP с Trusted Types
// Content-Security-Policy: require-trusted-types-for 'script'

// Создание политики
const policy = trustedTypes.createPolicy('default', {
  createHTML: (string) => DOMPurify.sanitize(string)
});

// Использование
const userInput = '<script>alert("XSS")</script>';
element.innerHTML = policy.createHTML(userInput); // ✅ Безопасно

// Прямое присваивание заблокировано
// element.innerHTML = userInput; // ❌ TypeError`
      }
    ],
    relatedTopics: ['xss-trusted-types', 'csp-level3']
  }
];
