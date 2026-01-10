import Fastify from 'fastify';

/**
 * Создание и конфигурация Fastify инстанса
 */
export function createServer() {
  const fastify = Fastify({ 
    logger: false,
    bodyLimit: 1048576, // 1MB
    disableRequestLogging: true
  });

  return fastify;
}
