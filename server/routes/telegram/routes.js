import { checkTelegramSecret } from '../../middleware/auth.js';
import { triggerPostingHandler, getLogsHandler } from './handler.js';

/**
 * Регистрация роутов Telegram
 */
export async function registerTelegramRoutes(fastify) {
  // Ручной запуск постинга случайной статьи
  fastify.post('/api/telegram/trigger', {
    preHandler: checkTelegramSecret
  }, triggerPostingHandler);

  // Получение журнала постинга
  fastify.get('/api/telegram/logs', {
    preHandler: checkTelegramSecret
  }, getLogsHandler);
}
