import { createServer } from './config/server.js';
import { setupCors } from './config/cors.js';
import { registerChatRoutes } from './routes/chat/routes.js';
import { registerTelegramRoutes } from './routes/telegram/routes.js';
import { setupTelegramCron } from './telegram/schedule.js';

/**
 * Инициализация и запуск сервера
 */
async function start() {
  // Создаем Fastify инстанс
  const fastify = createServer();

  // Настраиваем CORS
  await setupCors(fastify);

  // Регистрируем роуты
  await registerChatRoutes(fastify);
  await registerTelegramRoutes(fastify);

  // Настройка cron для автоматического постинга (опционально)
  // setupTelegramCron();

  // Запускаем сервер
  fastify.listen({ port: 30024, host: '0.0.0.0' }, err => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log('Server running on http://localhost:30024');
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
