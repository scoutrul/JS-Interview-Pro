import { API_SECRET, TELEGRAM_SECRET } from '../config/env.js';

/**
 * Проверка секретного ключа (только для localhost)
 */
export async function checkApiSecret(request, reply) {
  // Получаем origin из заголовков
  const origin = request.headers.origin || request.headers.referer || '';
  
  // Определяем, является ли origin localhost
  const isLocalhost = origin.startsWith('http://localhost:') || 
                      origin.startsWith('https://localhost:');
  
  if (isLocalhost) {
    // Для localhost требуем X-API-Key
    if (!API_SECRET) {
      return reply.code(500).send({ error: 'API_SECRET not configured for localhost' });
    }
    
    const apiKey = request.headers['x-api-key'];
    if (!apiKey) {
      return reply.code(401).send({ error: 'X-API-Key header is required for localhost' });
    }
    
    if (apiKey !== API_SECRET) {
      return reply.code(401).send({ error: 'Invalid API secret for localhost' });
    }
  }
  // Для prod (не localhost) просто пропускаем без проверки
}

/**
 * Проверка секретного ключа для Telegram endpoints
 */
export async function checkTelegramSecret(request, reply) {
  const apiKey = request.headers['x-api-key'];
  if (!apiKey || apiKey !== TELEGRAM_SECRET) {
    return reply.code(401).send({ error: 'Invalid API secret' });
  }
}
