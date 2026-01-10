import cors from '@fastify/cors';
import { allowedOrigins } from './env.js';

/**
 * Настройка CORS для Fastify
 */
export async function setupCors(fastify) {
  await fastify.register(cors, {
    origin: (origin, callback) => {
      // Разрешаем запросы без origin (например, Postman, curl)
      if (!origin) {
        return callback(null, true);
      }
      
      // Проверяем localhost (любой порт)
      if (origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:')) {
        return callback(null, true);
      }
      
      // Проверяем точное совпадение с разрешенными origin'ами
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      callback(new Error('Not allowed by CORS'), false);
    }
  });
}
