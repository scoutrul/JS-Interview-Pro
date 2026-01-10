import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID } from '../config/env.js';

if (!TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN not found in .env');
}

if (!TELEGRAM_CHANNEL_ID) {
  throw new Error('TELEGRAM_CHANNEL_ID not found in .env');
}

const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

/**
 * Отправить сообщение в Telegram канал
 */
export async function sendMessage(text, options = {}) {
  const {
    parse_mode = 'HTML', // Используем HTML вместо MarkdownV2 - проще экранировать
    disable_web_page_preview = false,
    disable_notification = false
  } = options;

  try {
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHANNEL_ID,
        text,
        parse_mode,
        disable_web_page_preview,
        disable_notification,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Telegram API error: ${data.description || response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    throw error;
  }
}

/**
 * Проверить, что бот работает
 */
export async function testBot() {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/getMe`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Telegram API error: ${data.description || response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error testing Telegram bot:', error);
    throw error;
  }
}
