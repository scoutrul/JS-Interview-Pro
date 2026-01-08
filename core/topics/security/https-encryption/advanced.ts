import { Topic } from '../../../types';

export const SECURITY_HTTPS_ADVANCED_TOPICS: Topic[] = [
  {
    id: 'https-advanced-encryption',
    title: 'Продвинутые техники шифрования',
    description: 'Продвинутые техники включают использование различных алгоритмов шифрования, perfect forward secrecy, и оптимизацию производительности шифрования.',
    difficulty: 'advanced',
    tags: ['security', 'https', 'encryption', 'advanced', 'algorithms'],
    keyPoints: [
      'Perfect Forward Secrecy: защита прошлых сессий при компрометации ключа.',
      'Различные алгоритмы шифрования: AES, ChaCha20-Poly1305.',
      'Оптимизация производительности шифрования.',
      'Квантово-устойчивое шифрование (для будущего).',
      'Мониторинг и анализ зашифрованного трафика.'
    ],
    examples: [
      {
        title: 'Perfect Forward Secrecy',
        code: `// Perfect Forward Secrecy (PFS):
// Каждая сессия использует уникальный ключ
// Даже если долгосрочный ключ скомпрометирован,
// прошлые сессии остаются защищенными

// TLS с PFS:
// - Каждая сессия генерирует новый ключ
// - Ключ удаляется после сессии
// - Компрометация долгосрочного ключа не влияет на прошлые сессии

// Проверка PFS:
// Современные браузеры требуют TLS 1.3 с PFS
// TLS 1.2 с ECDHE также поддерживает PFS`
      }
    ],
    relatedTopics: ['https-ssl-tls', 'https-certificate-pinning']
  },
  {
    id: 'https-certificate-pinning',
    title: 'Certificate pinning',
    description: 'Certificate pinning — это техника, при которой приложение "привязывается" к конкретному сертификату или публичному ключу. Это защищает от компрометации CA и подделки сертификатов.',
    difficulty: 'advanced',
    tags: ['security', 'https', 'certificate-pinning', 'advanced'],
    keyPoints: [
      'Certificate pinning привязывает приложение к конкретному сертификату.',
      'Защищает от компрометации CA и подделки сертификатов.',
      'Используется в мобильных приложениях (не в веб-браузерах).',
      'Требует обновления при смене сертификата.',
      'Public Key Pinning (HPKP) устарел, не рекомендуется.'
    ],
    examples: [
      {
        title: 'Certificate pinning (концепция)',
        code: `// Certificate pinning:
// Приложение "запоминает" публичный ключ сервера
// При каждом соединении проверяет соответствие

// Пример (концептуальный, не для веб-браузеров):
const expectedPublicKey = 'abc123...';

async function connect() {
  const certificate = await getServerCertificate();
  const publicKey = extractPublicKey(certificate);
  
  if (publicKey !== expectedPublicKey) {
    throw new Error('Certificate pinning failed');
  }
  
  // Соединение безопасно
}

// ⚠️ Важно:
// - Certificate pinning используется в мобильных приложениях
// - В веб-браузерах не используется (браузер управляет сертификатами)
// - Public Key Pinning (HPKP) устарел и не рекомендуется`
      }
    ],
    relatedTopics: ['https-certificates', 'https-advanced-encryption']
  }
];
