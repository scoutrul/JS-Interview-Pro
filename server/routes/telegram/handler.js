import { postRandomTopic } from '../../telegram/mvpPosting.js';
import { getLastLogs } from '../../telegram/postingLog.js';

/**
 * Обработчик для ручного запуска постинга случайной статьи
 */
export async function triggerPostingHandler(request, reply) {
  try {
    const result = await postRandomTopic();
    
    if (!result.success) {
      reply.code(500).send(result);
      return;
    }
    
    return result;
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({ 
      error: 'Telegram posting failed', 
      message: error.message 
    });
  }
}

/**
 * Обработчик для получения последних записей журнала
 */
export async function getLogsHandler(request, reply) {
  try {
    const limit = parseInt(request.query?.limit) || 10;
    const logs = await getLastLogs(limit);
    return { logs, count: logs.length };
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({ 
      error: 'Failed to get logs', 
      message: error.message 
    });
  }
}
