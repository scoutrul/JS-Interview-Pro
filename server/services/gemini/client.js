import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../../config/env.js';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-flash-latest'
});

/**
 * Форматировать статью в текст для промпта
 */
function formatArticleToText(article) {
  if (!article) return '';
  
  return `
Title: ${article.title || ''}
Difficulty: ${article.difficulty || ''}
Description: ${article.description || ''}
${article.additionalDescription ? `Additional description: ${article.additionalDescription}` : ''}

Key points:
${(article.keyPoints || []).map((point, i) => `${i + 1}. ${point}`).join('\n')}

${article.funFact ? `Fun fact: ${Array.isArray(article.funFact) ? article.funFact.join(' ') : article.funFact}` : ''}

${article.examples && article.examples.length > 0 ? `Code examples:\n${article.examples.map((ex, i) => {
  // Если код не передан (оптимизация токенов), показываем только заголовок
  if (!ex.code || ex.code.trim() === '') {
    return `${i + 1}. ${ex.title}`;
  }
  return `${i + 1}. ${ex.title}\n${ex.code}`;
}).join('\n\n')}` : ''}

${article.tags && article.tags.length > 0 ? `Tags: ${article.tags.join(', ')}` : ''}
`.trim();
}

/**
 * Генерация ответа чата через Gemini
 */
export async function generateChatResponse(systemPrompt, articleContext, chatHistory, userMessage) {
  const articleText = formatArticleToText(articleContext);
  
  const historyText = chatHistory
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');
  
  const prompt = `
${systemPrompt}

Current article:
${articleText}

Chat history:
${historyText}

User: ${userMessage}
Assistant:
`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();
  
  return response;
}
