import { Topic } from '../../../core/types';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

/**
 * Ограничивает историю чата до последних N сообщений
 */
export function limitChatHistory(history: ChatMessage[], maxMessages: number = 8): ChatMessage[] {
  if (history.length <= maxMessages) {
    return history;
  }
  return history.slice(-maxMessages);
}

/**
 * Подготавливает сжатый контекст статьи для отправки на сервер
 * Включает только структурированные данные, без полного markdown
 */
export function prepareArticleContext(topic: Topic): Partial<Topic> {
  return {
    id: topic.id,
    title: topic.title,
    description: topic.description,
    difficulty: topic.difficulty,
    keyPoints: topic.keyPoints.slice(0, 10), // Первые 10 ключевых моментов
    tags: topic.tags,
    examples: topic.examples?.map(ex => ({
      title: ex.title,
      code: '' // Не отправляем полный код, только заголовки
    })),
    funFact: topic.funFact,
    additionalDescription: topic.additionalDescription
  };
}
