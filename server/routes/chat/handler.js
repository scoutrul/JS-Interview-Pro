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
    // Fastify с logger: false не пишет request.log в stdout — дублируем в консоль процесса
    console.error('[api/chat] Gemini error:', err?.message || err);
    if (err?.stack) console.error(err.stack);
    if (err?.cause) console.error('[api/chat] cause:', err.cause);

    const payload = { error: 'Gemini request failed' };
    if (process.env.DEBUG_CHAT === '1') {
      payload.details = err?.message || String(err);
    }
    reply.code(500).send(payload);
  }
}
