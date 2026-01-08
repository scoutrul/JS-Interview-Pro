import { Topic } from '../../../types';

export const SECURITY_DATA_STORAGE_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'data-storage-advanced-techniques',
    title: 'Продвинутые техники защиты данных',
    description: 'Продвинутые техники включают использование Web Crypto API для шифрования, secure storage patterns, и комбинирование различных методов для создания многоуровневой защиты данных.',
    difficulty: 'advanced',
    tags: ['security', 'data-storage', 'encryption', 'web-crypto', 'advanced'],
    keyPoints: [
      'Web Crypto API: нативное шифрование в браузере.',
      'Secure storage patterns: комбинирование методов защиты.',
      'Key management: безопасное управление ключами шифрования.',
      'Data at rest encryption: шифрование данных в хранилище.',
      'Мониторинг и обнаружение утечек данных.'
    ],
    examples: [
      {
        title: 'Web Crypto API для шифрования',
        code: `// Генерация ключа
const key = await crypto.subtle.generateKey(
  {
    name: 'AES-GCM',
    length: 256
  },
  true,
  ['encrypt', 'decrypt']
);

// Шифрование данных
const data = new TextEncoder().encode('sensitive data');
const iv = crypto.getRandomValues(new Uint8Array(12));

const encrypted = await crypto.subtle.encrypt(
  {
    name: 'AES-GCM',
    iv: iv
  },
  key,
  data
);

// Сохранение зашифрованных данных
localStorage.setItem('encrypted', JSON.stringify({
  data: Array.from(new Uint8Array(encrypted)),
  iv: Array.from(iv)
}));

// Расшифровка
const stored = JSON.parse(localStorage.getItem('encrypted') || '{}');
const encryptedData = new Uint8Array(stored.data);
const storedIv = new Uint8Array(stored.iv);

const decrypted = await crypto.subtle.decrypt(
  {
    name: 'AES-GCM',
    iv: storedIv
  },
  key,
  encryptedData
);

const decryptedText = new TextDecoder().decode(decrypted);`
      }
    ],
    relatedTopics: ['data-storage-encryption', 'data-storage-secure-patterns']
  },
  {
    id: 'data-storage-secure-patterns',
    title: 'Secure storage patterns',
    description: 'Secure storage patterns — это архитектурные паттерны для безопасного хранения данных на клиенте, включая разделение данных по уровню чувствительности, использование разных хранилищ для разных типов данных, и комбинирование методов защиты.',
    difficulty: 'advanced',
    tags: ['security', 'data-storage', 'patterns', 'architecture', 'advanced'],
    keyPoints: [
      'Разделение данных по уровню чувствительности.',
      'Использование разных хранилищ для разных типов данных.',
      'Комбинирование методов защиты (шифрование + HttpOnly cookies).',
      'Минимизация хранимых данных (хранить только необходимое).',
      'Регулярная очистка устаревших данных.'
    ],
    examples: [
      {
        title: 'Secure storage pattern',
        code: `// Разделение данных по уровню чувствительности

// 1. Критичные данные (токены) → HttpOnly cookies
res.cookie('accessToken', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax'
});

// 2. Настройки UI → localStorage
localStorage.setItem('theme', 'dark');
localStorage.setItem('language', 'ru');

// 3. Временные данные → sessionStorage
sessionStorage.setItem('tempData', 'value');

// 4. Зашифрованные чувствительные данные → IndexedDB
const encrypted = await encryptData(sensitiveData);
await saveToIndexedDB('encryptedData', encrypted);

// 5. Ничего критичного в URL!
// Использовать POST для чувствительных данных

// Комбинирование методов:
// - HttpOnly cookies для токенов
// - localStorage для настроек
// - Шифрование для чувствительных данных
// - Минимизация хранимых данных`
      }
    ],
    relatedTopics: ['data-storage-advanced-techniques', 'cookies-token-storage']
  }
];
