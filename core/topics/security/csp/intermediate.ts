import { Topic } from '../../../types';

export const SECURITY_CSP_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'csp-nonce-hash',
    title: 'Nonce и hash для inline скриптов',
    description: 'Nonce и hash позволяют разрешить выполнение конкретных inline скриптов и стилей, не используя небезопасный \'unsafe-inline\'. Nonce — одноразовое значение, hash — SHA-256/384/512 хеш содержимого скрипта.',
    difficulty: 'intermediate',
    tags: ['security', 'csp', 'nonce', 'hash', 'inline-scripts'],
    keyPoints: [
      'Nonce: одноразовое значение, генерируется на сервере для каждого запроса.',
      'Hash: SHA-256/384/512 хеш содержимого скрипта/стиля.',
      'Nonce и hash позволяют разрешить конкретные inline скрипты без \'unsafe-inline\'.',
      'Nonce удобнее для динамических скриптов, hash для статических.',
      'Использование nonce/hash безопаснее, чем \'unsafe-inline\'.'
    ],
    examples: [
      {
        title: 'Использование nonce',
        code: `// Сервер генерирует nonce
const nonce = crypto.randomBytes(16).toString('base64');

// CSP заголовок
// Content-Security-Policy: script-src 'nonce-\${nonce}'

// В HTML
<script nonce="\${nonce}">
  console.log('Safe script');
</script>

// ❌ Скрипт без nonce заблокирован
<script>
  alert('XSS'); // Заблокировано
</script>`
      },
      {
        title: 'Использование hash',
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
</script>`
      }
    ],
    relatedTopics: ['csp-directives', 'csp-frameworks', 'xss-csp-advanced']
  },
  {
    id: 'csp-report-uri',
    title: 'report-uri для мониторинга',
    description: 'report-uri позволяет отправлять отчеты о нарушениях CSP на сервер для мониторинга и анализа. Это помогает обнаружить попытки XSS атак и настроить CSP правильно.',
    difficulty: 'intermediate',
    tags: ['security', 'csp', 'report-uri', 'monitoring'],
    keyPoints: [
      'report-uri отправляет POST запрос при нарушении CSP.',
      'Отчет содержит информацию о заблокированном ресурсе.',
      'report-to (новый API) заменяет report-uri.',
      'Мониторинг CSP нарушений помогает обнаружить атаки.',
      'В production важно настроить мониторинг CSP.'
    ],
    examples: [
      {
        title: 'Настройка report-uri',
        code: `// CSP с report-uri
// Content-Security-Policy: 
//   script-src 'self';
//   report-uri /api/csp-report;

// Браузер отправит POST запрос при нарушении:
// POST /api/csp-report
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
  console.warn('CSP violation:', report);
  // Логирование, алерты, анализ
  res.status(204).send();
});`
      }
    ],
    relatedTopics: ['csp-basics', 'csp-frameworks']
  },
  {
    id: 'csp-frameworks',
    title: 'CSP и фреймворки (React, Angular, Vue)',
    description: 'Настройка CSP для современных SPA фреймворков требует учета особенностей каждого фреймворка: inline стили в CSS-in-JS, динамическая загрузка модулей, и другие специфичные требования.',
    difficulty: 'intermediate',
    tags: ['security', 'csp', 'react', 'angular', 'vue', 'frameworks'],
    keyPoints: [
      'React: может потребоваться \'unsafe-inline\' для style-src (CSS-in-JS).',
      'Angular: использует nonce для inline скриптов.',
      'Vue: похожие требования к React.',
      'Для production лучше использовать nonce вместо \'unsafe-inline\'.',
      'Тестирование CSP с фреймворками критично.'
    ],
    examples: [
      {
        title: 'CSP для React приложения',
        code: `// CSP конфигурация для React

// Content-Security-Policy: 
//   default-src 'self';
//   script-src 'self' 'nonce-\${nonce}';
//   style-src 'self' 'unsafe-inline'; // Для CSS-in-JS (styled-components, emotion)
//   img-src 'self' data: https:;
//   connect-src 'self' https://api.example.com;
//   font-src 'self' data:;

// Для production лучше использовать nonce для стилей:
// style-src 'self' 'nonce-\${nonce}';

// В React с nonce:
// index.html
<script nonce="\${nonce}" src="/static/js/bundle.js"></script>

// Для CSS-in-JS может потребоваться 'unsafe-inline'
// или использование nonce для style тегов`
      }
    ],
    relatedTopics: ['csp-nonce-hash', 'csp-advanced']
  }
];
