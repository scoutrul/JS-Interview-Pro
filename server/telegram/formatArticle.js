import { findTopicMetaCategory } from '../getAllTopics.js';

/**
 * Экранирование специальных символов для Telegram MarkdownV2
 */
function escapeMarkdownV2(text) {
  if (!text) return '';
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/_/g, '\\_')
    .replace(/\*/g, '\\*')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/~/g, '\\~')
    .replace(/`/g, '\\`')
    .replace(/>/g, '\\>')
    .replace(/#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/-/g, '\\-')
    .replace(/=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}');
}

/**
 * Обрезать код, если он слишком длинный
 */
function truncateCode(code, maxLength = 1500) {
  if (!code || code.length <= maxLength) return code;
  return code.substring(0, maxLength) + '\n\n... (код обрезан, полная версия на сайте)';
}

/**
 * Форматировать сложность
 */
function formatDifficulty(difficulty) {
  const emoji = {
    beginner: '🟢',
    intermediate: '🟡',
    advanced: '🔴'
  };
  const labels = {
    beginner: 'Начальный',
    intermediate: 'Средний',
    advanced: 'Продвинутый'
  };
  return `${emoji[difficulty] || ''} ${labels[difficulty] || difficulty}`;
}

/**
 * Форматировать статью для Telegram
 */
export function formatArticleForTelegram(topic, frontendBaseUrl) {
  const metaCategoryId = findTopicMetaCategory(topic.id);
  const articleUrl = `${frontendBaseUrl}/${metaCategoryId}/${topic.id}`;
  
  const parts = [];
  
  // Заголовок
  parts.push(`*${escapeMarkdownV2(topic.title)}*`);
  parts.push(`\n${formatDifficulty(topic.difficulty)}`);
  parts.push('');
  
  // Описание
  if (topic.description) {
    parts.push(escapeMarkdownV2(topic.description));
    parts.push('');
  }
  
  // FunFact перед KeyPoints (если это первый факт)
  if (topic.funFact) {
    const funFacts = Array.isArray(topic.funFact) ? topic.funFact : [topic.funFact];
    if (funFacts.length > 0) {
      parts.push(`💡 *Интересный факт:*`);
      parts.push(escapeMarkdownV2(funFacts[0]));
      parts.push('');
    }
  }
  
  // KeyPoints
  if (topic.keyPoints && topic.keyPoints.length > 0) {
    parts.push('*Ключевые моменты:*');
    topic.keyPoints.forEach((point, index) => {
      parts.push(`${index + 1}\\. ${escapeMarkdownV2(point)}`);
    });
    parts.push('');
  }
  
  // FunFact после KeyPoints (если есть второй факт)
  if (topic.funFact && Array.isArray(topic.funFact) && topic.funFact.length > 1) {
    parts.push(`💡 *Еще один факт:*`);
    parts.push(escapeMarkdownV2(topic.funFact[1]));
    parts.push('');
  }
  
  // AdditionalDescription
  if (topic.additionalDescription) {
    parts.push(escapeMarkdownV2(topic.additionalDescription));
    parts.push('');
  }
  
  // Examples
  if (topic.examples && topic.examples.length > 0) {
    parts.push('*Примеры кода:*');
    topic.examples.forEach((example, index) => {
      parts.push(`\n*${escapeMarkdownV2(example.title)}:*`);
      const code = truncateCode(example.code);
      // Для кода используем блок кода (внутри блока экранирование не требуется)
      // Но нужно экранировать обратные кавычки вокруг блока
      parts.push(`\`\`\`\n${code}\n\`\`\``);
    });
    parts.push('');
  }
  
  // Теги
  if (topic.tags && topic.tags.length > 0) {
    const tagsStr = topic.tags.map(tag => `#${tag.replace(/\s+/g, '_')}`).join(' ');
    parts.push(tagsStr);
    parts.push('');
  }
  
  // Ссылка на статью (в MarkdownV2 нужно экранировать URL и текст ссылки)
  const linkText = escapeMarkdownV2('Читать полную версию на сайте');
  parts.push(`📖 [${linkText}](${articleUrl})`);
  
  // Мета-информация для аудита
  parts.push(`\n\\#js\\_interview\\_pro • id: ${topic.id}`);
  
  return parts.join('\n');
}
