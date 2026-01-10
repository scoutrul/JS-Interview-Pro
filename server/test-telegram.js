// Тестовый скрипт для проверки отправки статьи в Telegram
import { postRandomTopic } from './telegram/mvpPosting.js';
import { testBot } from './telegram/client.js';

async function test() {
  console.log('=== Тест Telegram бота ===\n');

  // 1. Проверяем, что бот работает
  try {
    console.log('1. Проверка бота...');
    const botInfo = await testBot();
    console.log('✅ Бот работает:', botInfo.result.username);
  } catch (error) {
    console.error('❌ Ошибка проверки бота:', error.message);
    console.log('\nПроверьте TELEGRAM_BOT_TOKEN в .env');
    process.exit(1);
  }

  // 2. Пробуем отправить тестовую статью
  try {
    console.log('\n2. Отправка тестовой статьи...');
    const result = await postRandomTopic();
    
    if (result.success) {
      console.log('✅ Статья успешно отправлена!');
      console.log('   Topic ID:', result.topic.id);
      console.log('   Title:', result.topic.title);
      console.log('   Message ID:', result.messageId);
    } else {
      console.error('❌ Ошибка отправки:', result.error);
    }
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    console.log('\nПроверьте:');
    console.log('- TELEGRAM_BOT_TOKEN в .env');
    console.log('- TELEGRAM_CHANNEL_ID в .env');
    console.log('- Бот добавлен в канал/группу');
    console.log('- У бота есть права на отправку сообщений');
    console.log('- topics.json существует');
  }
}

test().catch(console.error);
