import { Topic } from '../../../types';

export const SECURITY_PRODUCTION_BEGINNER_TOPICS: Topic[] = [
  {
    id: 'production-env-vars',
    title: 'Environment variables',
    description: 'Environment variables используются для хранения конфигурации и секретов, которые различаются между окружениями (development, staging, production). Важно не коммитить секреты в репозиторий.',
    difficulty: 'beginner',
    tags: ['security', 'production', 'environment-variables', 'secrets', 'basics'],
    keyPoints: [
      'Environment variables хранят конфигурацию и секреты.',
      'Разные значения для разных окружений (dev, staging, prod).',
      'Не коммитить секреты в репозиторий.',
      'Использовать .env файлы (не коммитить .env в репозиторий!).',
      'Проверка .gitignore для исключения .env файлов.'
    ],
    examples: [
      {
        title: 'Использование environment variables',
        code: `// .env (не коммитить!)
API_KEY=sk_live_abc123...
DATABASE_URL=postgres://...
SECRET_KEY=secret123...

// .env.example (коммитить как пример)
API_KEY=your_api_key_here
DATABASE_URL=your_database_url_here
SECRET_KEY=your_secret_key_here

// .gitignore
.env
.env.local
.env.*.local

// Использование в коде:
const apiKey = import.meta.env.VITE_API_KEY;
const dbUrl = process.env.DATABASE_URL;

// ⚠️ Важно:
// - Не коммитить .env файлы
// - Использовать .env.example как шаблон
// - Проверять .gitignore`
      }
    ],
    relatedTopics: ['production-secrets', 'production-git-secrets']
  },
  {
    id: 'production-secrets',
    title: 'Секреты и их хранение',
    description: 'Секреты (API ключи, пароли, токены) должны храниться безопасно. Никогда не коммитить секреты в репозиторий. Использовать environment variables или специализированные сервисы для хранения секретов.',
    difficulty: 'beginner',
    tags: ['security', 'production', 'secrets', 'api-keys', 'basics'],
    keyPoints: [
      'Секреты: API ключи, пароли, токены, приватные ключи.',
      'Никогда не коммитить секреты в репозиторий.',
      'Использовать environment variables для секретов.',
      'Проверка истории Git на наличие секретов.',
      'Ротация секретов при компрометации.'
    ],
    examples: [
      {
        title: 'Безопасное хранение секретов',
        code: `// ❌ НЕПРАВИЛЬНО: секреты в коде
const API_KEY = 'sk_live_abc123...';
const SECRET = 'secret123...';

// ✅ ПРАВИЛЬНО: секреты в environment variables
const API_KEY = process.env.API_KEY;
const SECRET = process.env.SECRET;

// Проверка наличия секретов:
if (!API_KEY) {
  throw new Error('API_KEY is not set');
}

// Для фронтенда (Vite):
// Только переменные с префиксом VITE_ доступны на клиенте
// VITE_API_URL=https://api.example.com ✅
// SECRET_KEY=secret ❌ (не доступна на клиенте!)

// На клиенте:
const apiUrl = import.meta.env.VITE_API_URL; // ✅
// const secret = import.meta.env.SECRET_KEY; // ❌ undefined`
      }
    ],
    relatedTopics: ['production-env-vars', 'production-git-secrets']
  },
  {
    id: 'production-git-secrets',
    title: 'Не коммитить секреты в Git',
    description: 'Секреты, попавшие в Git, остаются в истории навсегда, даже после удаления. Важно проверять код перед коммитом и использовать инструменты для обнаружения секретов.',
    difficulty: 'beginner',
    tags: ['security', 'production', 'git', 'secrets', 'basics'],
    keyPoints: [
      'Секреты в Git остаются в истории навсегда.',
      'Даже после удаления секреты остаются в истории коммитов.',
      'Проверка кода перед коммитом на наличие секретов.',
      'Использование инструментов: git-secrets, truffleHog.',
      'Ротация секретов, если они попали в репозиторий.'
    ],
    examples: [
      {
        title: 'Защита от коммита секретов',
        code: `// ❌ НЕПРАВИЛЬНО: секрет в коде
const API_KEY = 'sk_live_abc123...';
// Коммит → секрет в истории Git навсегда!

// ✅ ПРАВИЛЬНО: секрет в .env
// .env
API_KEY=sk_live_abc123...

// .gitignore
.env

// Проверка перед коммитом:
// git-secrets для обнаружения секретов
// git secrets --install
// git secrets --register-aws

// Проверка истории:
// git log --all --full-history --source -S "sk_live"

// Если секрет попал в репозиторий:
// 1. Немедленно ротировать секрет
// 2. Удалить из кода
// 3. Очистить историю (git filter-branch) - сложно!
// 4. Уведомить команду`
      }
    ],
    relatedTopics: ['production-secrets', 'production-env-vars']
  }
];
