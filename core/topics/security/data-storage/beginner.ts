import { Topic } from '../../../types';

export const SECURITY_DATA_STORAGE_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'data-storage-localstorage-sessionstorage',
    title: 'localStorage vs sessionStorage',
    description: 'localStorage и sessionStorage — это два механизма хранения данных на клиенте. localStorage сохраняет данные до явного удаления, sessionStorage — только на время сессии (до закрытия вкладки).',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'data-storage', 'localstorage', 'sessionstorage', 'basics', 'front-end-essential'],
    keyPoints: [
      'localStorage: данные сохраняются до явного удаления (переживают перезагрузку).',
      'sessionStorage: данные удаляются при закрытии вкладки.',
      'Оба хранилища доступны только для того же origin (Same-Origin Policy).',
      'Оба уязвимы для XSS (доступны через JavaScript).',
      'Размер ограничен (обычно 5-10MB).'
    ],
    examples: [
      {
        title: 'Сравнение localStorage и sessionStorage',
        code: `// localStorage - сохраняется до явного удаления
localStorage.setItem('theme', 'dark');
// Данные сохраняются после перезагрузки страницы ✅

// sessionStorage - удаляется при закрытии вкладки
sessionStorage.setItem('tempData', 'value');
// Данные удаляются при закрытии вкладки ✅

// Чтение
const theme = localStorage.getItem('theme');
const tempData = sessionStorage.getItem('tempData');

// Удаление
localStorage.removeItem('theme');
sessionStorage.clear(); // Удаляет все

// ⚠️ Оба уязвимы для XSS:
// Злоумышленник может прочитать:
const stolen = localStorage.getItem('token'); // ❌`
      }
    ],
    relatedTopics: ['data-storage-what-store', 'data-storage-security', 'cookies-token-storage']
  },
  {
    id: 'data-storage-what-store',
    title: 'Что можно хранить, что нельзя',
    description: 'Важно понимать, что можно безопасно хранить в localStorage/sessionStorage, а что нельзя. Токены, пароли, персональные данные не должны храниться в этих хранилищах из-за уязвимости к XSS.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'data-storage', 'what-store', 'basics', 'front-end-essential'],
    keyPoints: [
      '✅ Можно хранить: настройки UI, кэш данных, неперсональные данные.',
      '❌ Нельзя хранить: токены, пароли, персональные данные, секреты.',
      'Токены должны быть в HttpOnly cookies, не в localStorage.',
      'Пароли никогда не должны храниться на клиенте.',
      'Персональные данные только с согласия и шифрованием.'
    ],
    examples: [
      {
        title: 'Что можно и нельзя хранить',
        code: `// ✅ МОЖНО хранить:
localStorage.setItem('theme', 'dark'); // Настройки UI
localStorage.setItem('language', 'ru'); // Предпочтения
localStorage.setItem('cache', JSON.stringify(data)); // Кэш данных

// ❌ НЕЛЬЗЯ хранить:
localStorage.setItem('token', jwtToken); // Токены ❌
localStorage.setItem('password', password); // Пароли ❌
localStorage.setItem('creditCard', cardNumber); // Персональные данные ❌
localStorage.setItem('apiKey', apiKey); // Секреты ❌

// ✅ Правильно для токенов:
// HttpOnly cookie (не localStorage!)
res.cookie('token', jwtToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax'
});

// ✅ Правильно для паролей:
// НИГДЕ на клиенте! Только на сервере (хешированные)`
      }
    ],
    relatedTopics: ['data-storage-localstorage-sessionstorage', 'data-storage-security', 'cookies-token-storage']
  },
  {
    id: 'data-storage-limits',
    title: 'Ограничения и квоты',
    description: 'localStorage и sessionStorage имеют ограничения по размеру (обычно 5-10MB на домен). Превышение лимита приводит к ошибке QuotaExceededError. Важно обрабатывать эту ошибку и оптимизировать хранимые данные.',
    difficulty: 'beginner',
    isFrontendEssential: true,
    tags: ['security', 'data-storage', 'limits', 'quota', 'basics', 'front-end-essential'],
    keyPoints: [
      'Лимит обычно 5-10MB на домен (зависит от браузера).',
      'Превышение лимита вызывает QuotaExceededError.',
      'Нужно обрабатывать ошибку и очищать старые данные.',
      'Оптимизация: сжатие данных, удаление устаревших записей.',
      'Проверка доступного места перед сохранением.'
    ],
    examples: [
      {
        title: 'Обработка ограничений',
        code: `// Проверка доступного места
function getStorageSize(storage: Storage): number {
  let total = 0;
  for (const key in storage) {
    if (storage.hasOwnProperty(key)) {
      total += storage[key].length + key.length;
    }
  }
  return total;
}

// Сохранение с обработкой ошибок
try {
  localStorage.setItem('largeData', JSON.stringify(largeObject));
} catch (e) {
  if (e instanceof DOMException && e.name === 'QuotaExceededError') {
    // Очистка старых данных
    clearOldCache();
    // Повторная попытка
    localStorage.setItem('largeData', JSON.stringify(largeObject));
  } else {
    throw e;
  }
}

// Очистка устаревших данных
function clearOldCache() {
  const keys = Object.keys(localStorage);
  const now = Date.now();
  
  keys.forEach(key => {
    if (key.startsWith('cache_')) {
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      if (data.expires && data.expires < now) {
        localStorage.removeItem(key);
      }
    }
  });
}`
      }
    ],
    relatedTopics: ['data-storage-localstorage-sessionstorage', 'data-storage-security']
  }
];
