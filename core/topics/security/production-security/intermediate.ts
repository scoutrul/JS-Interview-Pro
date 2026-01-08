import { Topic } from '../../../types';

export const SECURITY_PRODUCTION_INTERMEDIATE_TOPICS: Topic[] = [
  {
    id: 'production-config',
    title: 'Безопасная конфигурация',
    description: 'Безопасная конфигурация production окружения включает правильные настройки безопасности, отключение debug режима, и использование безопасных значений по умолчанию.',
    difficulty: 'intermediate',
    tags: ['security', 'production', 'configuration', 'settings'],
    keyPoints: [
      'Отключение debug режима в production.',
      'Использование безопасных значений по умолчанию.',
      'Правильная настройка CORS, CSP, security headers.',
      'Отключение детальной информации об ошибках.',
      'Использование production-ready конфигураций.'
    ],
    examples: [
      {
        title: 'Безопасная конфигурация',
        code: `// Проверка окружения:
const isProduction = process.env.NODE_ENV === 'production';

// Отключение debug в production:
if (!isProduction) {
  console.log('Debug info');
}

// Безопасные настройки по умолчанию:
const config = {
  debug: !isProduction,
  showErrors: !isProduction, // Не показывать детальные ошибки в production
  cors: {
    origin: isProduction 
      ? ['https://trusted-domain.com'] 
      : ['http://localhost:3000']
  },
  rateLimit: isProduction ? 100 : 1000 // Строже в production
};

// Security headers:
app.use((req, res, next) => {
  if (isProduction) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
  }
  next();
});`
      }
    ],
    relatedTopics: ['production-security-headers', 'production-monitoring']
  },
  {
    id: 'production-monitoring',
    title: 'Мониторинг безопасности',
    description: 'Мониторинг безопасности включает отслеживание подозрительной активности, логирование событий безопасности, и настройку алертов при обнаружении аномалий.',
    difficulty: 'intermediate',
    tags: ['security', 'production', 'monitoring', 'logging'],
    keyPoints: [
      'Логирование событий безопасности (логины, ошибки, подозрительная активность).',
      'Мониторинг аномальной активности (множественные неудачные логины).',
      'Алерты при обнаружении подозрительных событий.',
      'Анализ логов для обнаружения атак.',
      'Интеграция с системами мониторинга (Sentry, LogRocket).'
    ],
    examples: [
      {
        title: 'Мониторинг безопасности',
        code: `// Логирование событий безопасности:
function logSecurityEvent(event: string, details: object) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    event,
    ...details
  }));
}

// Логирование неудачных попыток входа:
app.post('/api/login', async (req, res) => {
  try {
    const user = await authenticate(req.body);
    logSecurityEvent('login_success', { userId: user.id });
    res.json({ token: generateToken(user) });
  } catch (error) {
    logSecurityEvent('login_failure', { 
      username: req.body.username,
      ip: req.ip 
    });
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Мониторинг аномалий:
// - Множественные неудачные логины
// - Необычные паттерны запросов
// - Подозрительные источники`
      }
    ],
    relatedTopics: ['production-config', 'production-logging']
  },
  {
    id: 'production-logging',
    title: 'Логирование и безопасность',
    description: 'Логирование должно быть безопасным: не логировать секреты, пароли, токены. Логи должны содержать достаточно информации для отладки, но не раскрывать чувствительные данные.',
    difficulty: 'intermediate',
    tags: ['security', 'production', 'logging', 'secrets'],
    keyPoints: [
      'Не логировать секреты, пароли, токены.',
      'Логировать события безопасности (логины, ошибки).',
      'Маскирование чувствительных данных в логах.',
      'Ротация и архивирование логов.',
      'Защита доступа к логам.'
    ],
    examples: [
      {
        title: 'Безопасное логирование',
        code: `// ❌ НЕПРАВИЛЬНО: логирование секретов
console.log('API Key:', apiKey); // Секрет в логах!
console.log('Password:', password); // Пароль в логах!

// ✅ ПРАВИЛЬНО: маскирование секретов
function maskSecret(secret: string): string {
  if (!secret) return '';
  if (secret.length <= 4) return '****';
  return secret.substring(0, 2) + '****' + secret.substring(secret.length - 2);
}

console.log('API Key:', maskSecret(apiKey)); // sk_****23
console.log('User logged in:', { userId: user.id }); // Без пароля

// Логирование событий безопасности:
logSecurityEvent('api_request', {
  endpoint: '/api/data',
  userId: user.id,
  ip: req.ip,
  // Без секретов!
});

// Ротация логов:
// - Ограничение размера логов
// - Архивирование старых логов
// - Удаление логов после определенного периода`
      }
    ],
    relatedTopics: ['production-monitoring', 'production-secrets']
  },
  {
    id: 'production-security-headers',
    title: 'Security headers: X-Content-Type-Options, X-Frame-Options (защита от clickjacking), X-XSS-Protection, Referrer-Policy и др.',
    description: 'Security headers — это HTTP заголовки, которые обеспечивают дополнительную защиту приложения. Правильная настройка security headers критична для безопасности production приложений.',
    difficulty: 'intermediate',
    isFrontendEssential: true,
    tags: ['security', 'production', 'security-headers', 'x-frame-options', 'x-content-type-options', 'front-end-essential'],
    keyPoints: [
      'X-Content-Type-Options: nosniff — предотвращает MIME type sniffing.',
      'X-Frame-Options: DENY/SAMEORIGIN — защита от clickjacking.',
      'X-XSS-Protection: 1; mode=block — включение XSS фильтра браузера.',
      'Referrer-Policy: контроль информации в Referer заголовке.',
      'Content-Security-Policy: контроль ресурсов (уже покрыто в CSP).'
    ],
    examples: [
      {
        title: 'Security headers',
        code: `// Настройка security headers на сервере:
app.use((req, res, next) => {
  // X-Content-Type-Options: предотвращает MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // X-Frame-Options: защита от clickjacking
  res.setHeader('X-Frame-Options', 'DENY'); // Или 'SAMEORIGIN'
  
  // X-XSS-Protection: включение XSS фильтра (устарел, но все еще используется)
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer-Policy: контроль информации в Referer
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions-Policy: контроль доступа к API браузера
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Strict-Transport-Security: HSTS (уже покрыто в HTTPS)
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  next();
});

// Проверка headers:
// Можно проверить через браузер DevTools → Network → Headers
// Или через онлайн инструменты: securityheaders.com`
      },
      {
        title: 'Значение каждого header',
        code: `// X-Content-Type-Options: nosniff
// Предотвращает MIME type sniffing
// Браузер не будет пытаться определить тип файла
// Защищает от атак через неправильный Content-Type

// X-Frame-Options: DENY
// Защита от clickjacking
// Страница не может быть встроена в iframe
// Защищает от обмана пользователя для клика

// X-Frame-Options: SAMEORIGIN
// Страница может быть встроена только с того же домена

// X-XSS-Protection: 1; mode=block
// Включает встроенный XSS фильтр браузера
// ⚠️ Устарел, лучше использовать CSP

// Referrer-Policy: strict-origin-when-cross-origin
// Контролирует, какая информация отправляется в Referer
// Защищает от утечки информации через referer`
      }
    ],
    relatedTopics: ['production-config', 'csp-basics', 'https-hsts']
  }
];
