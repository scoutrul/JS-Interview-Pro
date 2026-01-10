import { generateChatResponse } from '../../services/gemini/client.js';

/**
 * Обработчик запросов чата
 */
export async function chatHandler(request, reply) {
  try {
    const {
      systemPrompt = '',
      articleContext = null,
      chatHistory = [],
      userMessage = ''
    } = request.body || {};

    const answer = await generateChatResponse(
      systemPrompt,
      articleContext,
      chatHistory,
      userMessage
    );

    return { answer };
  } catch (err) {
    request.log.error(err);
    reply.code(500).send({ error: 'Gemini request failed' });
  }
}
