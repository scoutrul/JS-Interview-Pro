import { findTopicMetaCategory } from '../services/topics.js';

/**
 * Экранирование HTML для Telegram
 * Нужно экранировать только: <, >, &, "
 */
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Обрезать код, если он слишком длинный
 */
function truncateCode(code, maxLength = 1500) {
  if (!code || code.length <= maxLength) return code;
  return code.substring(0, maxLength) + '\n\n... (код обрезан, полная версия на сайте)';
}

/**
 * Форматировать сложность (звезды)
 */
function formatDifficulty(difficulty) {
  const stars = {
    beginner: '⭐',
    intermediate: '⭐⭐',
    advanced: '⭐⭐⭐'
  };
  const labels = {
    beginner: 'Начальный',
    intermediate: 'Средний',
    advanced: 'Продвинутый'
  };
  return `${stars[difficulty] || '⭐'} ${labels[difficulty] || difficulty}`;
}

/**
 * Форматировать статью для Telegram
 */
export function formatArticleForTelegram(topic, frontendBaseUrl) {
  const metaCategoryId = findTopicMetaCategory(topic.id);
  const articleUrl = `${frontendBaseUrl}/${metaCategoryId}/${topic.id}`;
  
  const parts = [];
  
  // Заголовок
  parts.push(`<b>${escapeHtml(topic.title)}</b>`);
  parts.push(`\n${formatDifficulty(topic.difficulty)}`);
  parts.push('');
  
  // Описание
  if (topic.description) {
    parts.push(escapeHtml(topic.description));
    parts.push('');
  }
  
  // FunFact перед KeyPoints (если это первый факт)
  if (topic.funFact) {
    const funFacts = Array.isArray(topic.funFact) ? topic.funFact : [topic.funFact];
    if (funFacts.length > 0) {
      parts.push(`💡 <b>Интересный факт:</b>`);
      parts.push(escapeHtml(funFacts[0]));
      parts.push('');
    }
  }
  
  // KeyPoints
  if (topic.keyPoints && topic.keyPoints.length > 0) {
    parts.push('<b>Ключевые моменты:</b>');
    topic.keyPoints.forEach((point, index) => {
      parts.push(`${index + 1}. ${escapeHtml(point)}`);
    });
    parts.push('');
  }
  
  // FunFact после KeyPoints (если есть второй факт)
  if (topic.funFact && Array.isArray(topic.funFact) && topic.funFact.length > 1) {
    parts.push(`💡 <b>Еще один факт:</b>`);
    parts.push(escapeHtml(topic.funFact[1]));
    parts.push('');
  }
  
  // AdditionalDescription
  if (topic.additionalDescription) {
    parts.push(escapeHtml(topic.additionalDescription));
    parts.push('');
  }
  
  // Examples
  if (topic.examples && topic.examples.length > 0) {
    parts.push('<b>Примеры кода:</b>');
    topic.examples.forEach((example, index) => {
      parts.push(`\n<b>${escapeHtml(example.title)}:</b>`);
      const code = truncateCode(example.code);
      // Для кода используем <pre><code>
      parts.push(`<pre><code>${escapeHtml(code)}</code></pre>`);
    });
    parts.push('');
  }
  
  // Теги
  if (topic.tags && topic.tags.length > 0) {
    const tagsStr = topic.tags.map(tag => {
      const tagName = tag.replace(/\s+/g, '_');
      return `#${escapeHtml(tagName)}`;
    }).join(' ');
    parts.push(tagsStr);
    parts.push('');
  }
  
  // Ссылка на статью
  const linkText = escapeHtml('Читать полную версию на сайте');
  parts.push(`📖 <a href="${articleUrl}">${linkText}</a>`);
  
  // Мета-информация для аудита
  parts.push(`\n#js_interview_pro • id: ${escapeHtml(topic.id)}`);
  
  return parts.join('\n');
}
