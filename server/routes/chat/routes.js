import { checkApiSecret } from '../../middleware/auth.js';
import { chatHandler } from './handler.js';

/**
 * Регистрация роутов чата
 */
export async function registerChatRoutes(fastify) {
  fastify.post('/api/chat', {
    schema: {
      body: {
        type: 'object',
        properties: {
          systemPrompt: { type: 'string' },
          articleContext: { type: ['object', 'null'] },
          chatHistory: { type: 'array' },
          userMessage: { type: 'string' }
        }
      }
    },
    preHandler: checkApiSecret
  }, chatHandler);
}
