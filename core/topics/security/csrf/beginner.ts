import { Topic } from '../../../types';

export const SECURITY_CSRF_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'csrf-basics',
    title: 'Что такое CSRF и как работает атака',
    description: 'CSRF (Cross-Site Request Forgery) — это атака, при которой злоумышленник заставляет пользователя выполнить нежелательное действие на веб-сайте, где пользователь аутентифицирован. Атака использует доверие браузера к cookies и сессиям.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'csrf', 'basics', 'vulnerability', 'front-end-essential'],
    keyPoints: [
      'CSRF использует автоматическую отправку cookies браузером.',
      'Атака работает, когда пользователь аутентифицирован на целевом сайте.',
      'Злоумышленник создает запрос, который выполняется от имени жертвы.',
      'CSRF опасен для действий, изменяющих состояние (переводы, изменение данных).',
      'GET запросы не должны изменять состояние (идиома REST).'
    ],
    examples: [
      {
        title: 'Базовый пример CSRF атаки',
        code: `// Пользователь залогинен на bank.com
// Злоумышленник создает страницу на evil.com

// evil.com/index.html
<form action="https://bank.com/transfer" method="POST" id="csrf-form">
  <input type="hidden" name="to" value="attacker-account">
  <input type="hidden" name="amount" value="1000">
</form>
<script>
  document.getElementById('csrf-form').submit();
</script>

// Когда пользователь заходит на evil.com, форма автоматически отправляется
// Браузер отправляет cookies с bank.com вместе с запросом
// Перевод выполняется от имени пользователя без его ведома!`
      },
      {
        title: 'CSRF через изображение',
        code: `// Еще проще - через <img> тег
// GET запрос выполняется автоматически при загрузке изображения

// evil.com/index.html
<img src="https://bank.com/transfer?to=attacker&amount=1000">

// Когда пользователь заходит на evil.com, браузер пытается загрузить "изображение"
// Выполняется GET запрос на bank.com с cookies пользователя
// Перевод выполняется! ❌

// Поэтому GET запросы НЕ должны изменять состояние`
      },
      {
        title: 'CSRF через fetch/XMLHttpRequest',
        code: `// Современный способ - через JavaScript
// evil.com/index.html
fetch('https://bank.com/transfer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include', // Отправляет cookies
  body: JSON.stringify({
    to: 'attacker-account',
    amount: 1000
  })
});

// ❌ Запрос выполнится с cookies пользователя
// Но CORS может заблокировать (если настроен правильно)`
      }
    ],
    relatedTopics: ['csrf-mechanism', 'csrf-prevention', 'cookies-samesite']
  },
  {
    id: 'csrf-mechanism',
    title: 'Механизм атаки (заставить пользователя выполнить действие без ведома)',
    description: 'Механизм CSRF атаки основан на том, что браузер автоматически отправляет cookies при каждом запросе к домену. Злоумышленник создает запрос, который выглядит легитимным для сервера, но выполняется без ведома пользователя.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'csrf', 'mechanism', 'cookies', 'front-end-essential'],
    keyPoints: [
      'Браузер автоматически отправляет cookies при запросах к домену.',
      'Злоумышленник не может прочитать cookies (защита Same-Origin Policy).',
      'Но может заставить браузер отправить запрос с этими cookies.',
      'Сервер видит валидные cookies и считает запрос легитимным.',
      'Пользователь не знает, что действие выполняется.'
    ],
    examples: [
      {
        title: 'Как работает механизм',
        code: `// 1. Пользователь залогинен на example.com
// Браузер сохранил cookie: sessionId=abc123

// 2. Пользователь заходит на evil.com (не закрывая example.com)

// 3. evil.com содержит:
<form action="https://example.com/change-email" method="POST">
  <input type="hidden" name="email" value="attacker@evil.com">
</form>
<script>document.forms[0].submit();</script>

// 4. Браузер отправляет POST запрос на example.com
// Автоматически включает cookie: sessionId=abc123

// 5. Сервер example.com видит валидную сессию
// Считает запрос легитимным и меняет email

// 6. Пользователь ничего не знает! ❌`
      },
      {
        title: 'Условия для CSRF атаки',
        code: `// CSRF возможен, если выполняются ВСЕ условия:

// 1. Пользователь аутентифицирован на целевом сайте
// ✅ Есть валидная сессия/cookie

// 2. Целевой сайт использует cookies для аутентификации
// ✅ sessionId в cookie

// 3. Запрос изменяет состояние (не идемпотентный)
// ✅ POST /transfer, POST /change-email

// 4. Нет защиты от CSRF
// ❌ Нет CSRF токена, нет проверки Origin

// Если хотя бы одно условие не выполняется, CSRF невозможен`
      },
      {
        title: 'Почему CORS не защищает от CSRF',
        code: `// Важно понимать: CORS НЕ защищает от CSRF!

// CORS контролирует только чтение ответа
// Но запрос все равно отправляется!

// Пример:
// evil.com отправляет POST запрос на api.example.com
fetch('https://api.example.com/transfer', {
  method: 'POST',
  body: JSON.stringify({ to: 'attacker', amount: 1000 })
});

// CORS может заблокировать чтение ответа
// Но запрос УЖЕ выполнен на сервере! ❌

// Cookies отправляются автоматически (если SameSite=None)
// Сервер обрабатывает запрос, даже если ответ не прочитан

// Защита от CSRF нужна отдельно!`
      }
    ],
    relatedTopics: ['csrf-basics', 'csrf-prevention', 'cors-basics']
  },
  {
    id: 'csrf-get-requests',
    title: 'Почему GET запросы не должны изменять состояние',
    description: 'GET запросы по идиоме REST должны быть идемпотентными и безопасными — они не должны изменять состояние сервера. Это не только хорошая практика, но и защита от CSRF атак, так как GET запросы могут выполняться автоматически (изображения, ссылки).',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'csrf', 'get', 'rest', 'http', 'front-end-essential'],
    keyPoints: [
      'GET запросы должны быть идемпотентными (повторный запрос = тот же результат).',
      'GET запросы должны быть безопасными (не изменяют состояние).',
      'GET запросы могут выполняться автоматически (изображения, prefetch, ссылки).',
      'CSRF через GET: <img src="https://site.com/delete?id=123"> выполнится автоматически.',
      'Использовать POST/PUT/DELETE для действий, изменяющих состояние.'
    ],
    examples: [
      {
        title: 'Почему GET опасен для изменения состояния',
        code: `// ❌ ОПАСНО: GET запрос изменяет состояние
// GET /api/transfer?to=attacker&amount=1000

// Злоумышленник может использовать:
<img src="https://bank.com/api/transfer?to=attacker&amount=1000">

// Или ссылку:
<a href="https://bank.com/api/transfer?to=attacker&amount=1000">
  Click here for free money!
</a>

// Или prefetch:
<link rel="prefetch" href="https://bank.com/api/transfer?to=attacker&amount=1000">

// Все эти способы выполнят GET запрос автоматически!
// Перевод выполнится без ведома пользователя ❌

// ✅ ПРАВИЛЬНО: POST для изменения состояния
// POST /api/transfer
// Body: { to: 'attacker', amount: 1000 }

// Теперь нужна форма или fetch, которые можно защитить CSRF токеном`
      },
      {
        title: 'Идемпотентность и безопасность',
        code: `// Идемпотентность: повторный запрос = тот же результат
// GET /api/user/123 - всегда возвращает одни и те же данные ✅

// Безопасность: запрос не изменяет состояние
// GET /api/users - только читает данные ✅

// ❌ НЕ идемпотентный и небезопасный:
// GET /api/transfer?to=attacker&amount=1000
// Каждый запрос выполняет новый перевод!

// ✅ Правильные HTTP методы:
// GET - чтение (безопасный, идемпотентный)
// POST - создание (небезопасный, не идемпотентный)
// PUT - обновление (небезопасный, идемпотентный)
// DELETE - удаление (небезопасный, идемпотентный)

// Для CSRF защиты важно: только GET безопасен автоматически`
      },
      {
        title: 'Практика: правильное использование методов',
        code: `// ✅ Чтение данных - GET
fetch('/api/users'); // GET по умолчанию

// ✅ Создание - POST
fetch('/api/users', {
  method: 'POST',
  body: JSON.stringify({ name: 'John' })
});

// ✅ Обновление - PUT
fetch('/api/users/123', {
  method: 'PUT',
  body: JSON.stringify({ name: 'Jane' })
});

// ✅ Удаление - DELETE
fetch('/api/users/123', {
  method: 'DELETE'
});

// ❌ НИКОГДА не изменять состояние через GET
// GET /api/users/123/delete ❌
// GET /api/transfer?to=attacker&amount=1000 ❌`
      }
    ],
    relatedTopics: ['csrf-basics', 'csrf-mechanism', 'api-security-basics']
  }
];
