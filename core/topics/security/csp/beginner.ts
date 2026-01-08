import { Topic } from '../../../types';

export const SECURITY_CSP_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'csp-basics',
    title: 'Что такое CSP и зачем нужен',
    description: 'Content Security Policy (CSP) — это механизм безопасности, который позволяет контролировать, какие ресурсы (скрипты, стили, изображения) могут загружаться и выполняться на странице. CSP является последним уровнем защиты от XSS атак.',
    difficulty: 'beginner',
    tags: ['security', 'csp', 'content-security-policy', 'xss', 'basics'],
    keyPoints: [
      'CSP контролирует источники скриптов, стилей, изображений и других ресурсов.',
      'CSP блокирует выполнение inline скриптов и стилей.',
      'CSP работает как последний уровень защиты (defense in depth).',
      'CSP не заменяет санитизацию, а дополняет её.',
      'CSP настраивается через HTTP заголовок или meta тег.'
    ],
    examples: [
      {
        title: 'Базовое использование CSP',
        code: `// HTTP заголовок:
// Content-Security-Policy: script-src 'self'

// Или в HTML:
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self'">

// script-src 'self' - скрипты только с того же домена
// ❌ Блокируется:
<script>alert('XSS')</script> // inline скрипт
<script src="https://evil.com/script.js"></script> // внешний домен

// ✅ Разрешается:
<script src="/js/app.js"></script> // тот же домен`
      }
    ],
    relatedTopics: ['xss-csp-basics', 'csp-directives', 'csp-nonce-hash']
  },
  {
    id: 'csp-directives',
    title: 'Базовые директивы: default-src, script-src, style-src',
    description: 'CSP директивы определяют, какие источники разрешены для разных типов ресурсов. default-src устанавливает политику по умолчанию, script-src для скриптов, style-src для стилей.',
    difficulty: 'beginner',
    tags: ['security', 'csp', 'directives', 'script-src', 'style-src', 'basics'],
    keyPoints: [
      'default-src: политика по умолчанию для всех ресурсов.',
      'script-src: источники для JavaScript скриптов.',
      'style-src: источники для CSS стилей.',
      '\'self\': разрешает ресурсы с того же origin.',
      '\'unsafe-inline\': разрешает inline скрипты/стили (небезопасно!).'
    ],
    examples: [
      {
        title: 'Базовые директивы',
        code: `// default-src - политика по умолчанию
// Content-Security-Policy: default-src 'self'

// Разрешает все ресурсы с того же домена
// Блокирует внешние ресурсы

// script-src - для скриптов
// Content-Security-Policy: script-src 'self'

// ✅ Разрешает: <script src="/js/app.js"></script>
// ❌ Блокирует: <script src="https://cdn.com/lib.js"></script>
// ❌ Блокирует: <script>alert('XSS')</script>

// style-src - для стилей
// Content-Security-Policy: style-src 'self' 'unsafe-inline'

// ✅ Разрешает: <link rel="stylesheet" href="/css/style.css">
// ✅ Разрешает: <style>body { color: red; }</style> (с 'unsafe-inline')
// ❌ Блокирует: <link rel="stylesheet" href="https://cdn.com/style.css"> (без разрешения)

// Комбинирование:
// Content-Security-Policy: 
//   default-src 'self';
//   script-src 'self' https://trusted-cdn.com;
//   style-src 'self' 'unsafe-inline'`
      }
    ],
    relatedTopics: ['csp-basics', 'csp-nonce-hash', 'csp-frameworks']
  }
];
