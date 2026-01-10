import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Загружаем .env из папки server
dotenv.config({ path: join(__dirname, '..', '.env') });

// Чтение конфигурации из .env
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const API_SECRET = process.env.API_SECRET; // Опционален - нужен только для localhost
export const ALLOWED_ORIGINS_STR = process.env.ALLOWED_ORIGINS || '';
export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// Автоматически добавляем @ для username каналов (если не начинается с @ и не числовой ID)
const rawChannelId = process.env.TELEGRAM_CHANNEL_ID;
export const TELEGRAM_CHANNEL_ID = rawChannelId 
  ? (rawChannelId.startsWith('@') || /^-?\d+$/.test(rawChannelId) 
      ? rawChannelId 
      : `@${rawChannelId}`)
  : undefined;
export const TELEGRAM_SECRET = process.env.TELEGRAM_SECRET || API_SECRET;
export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || 'https://frontstart.ru';
export const TELEGRAM_CRON_1 = process.env.TELEGRAM_CRON_1 || '0 6 * * *'; // 09:00 МСК
export const TELEGRAM_CRON_2 = process.env.TELEGRAM_CRON_2 || '0 15 * * *'; // 18:00 МСК

// Валидация обязательных переменных
if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY not found in .env');
}

// API_SECRET опционален - требуется только для localhost запросов
if (!API_SECRET) {
  console.warn('API_SECRET not found in .env - localhost requests will be rejected');
}

// Парсинг разрешенных origin'ов
export const allowedOrigins = ALLOWED_ORIGINS_STR
  .split(',')
  .map(origin => origin.trim())
  .filter(origin => origin.length > 0);
