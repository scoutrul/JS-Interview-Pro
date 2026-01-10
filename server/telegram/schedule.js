import cron from 'node-cron'
import { postRandomTopic } from './mvpPosting.js'
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CRON_1, TELEGRAM_CRON_2 } from '../config/env.js'

/**
 * Инициализация cron-задач для автопостинга в Telegram
 *
 * По умолчанию:
 *  - 09:00 МСК (06:00 UTC)
 *  - 18:00 МСК (15:00 UTC)
 *
 * Можно переопределить через переменные окружения:
 *  - TELEGRAM_CRON_1
 *  - TELEGRAM_CRON_2
 */
/**
 * Инициализация cron-задач для автопостинга в Telegram (MVP версия)
 *
 * По умолчанию:
 *  - 09:00 МСК (06:00 UTC)
 *  - 18:00 МСК (15:00 UTC)
 */
export function setupTelegramCron() {
  if (!TELEGRAM_BOT_TOKEN) {
    console.warn('TELEGRAM_BOT_TOKEN not found - cron jobs disabled')
    return
  }

  // Первый пост в день
  cron.schedule(TELEGRAM_CRON_1, async () => {
    console.log('Cron job 1 triggered: posting random article')
    try {
      const result = await postRandomTopic()
      console.log('Cron job 1 result:', result)
    } catch (error) {
      console.error('Cron job 1 error:', error)
    }
  })

  // Второй пост в день
  cron.schedule(TELEGRAM_CRON_2, async () => {
    console.log('Cron job 2 triggered: posting random article')
    try {
      const result = await postRandomTopic()
      console.log('Cron job 2 result:', result)
    } catch (error) {
      console.error('Cron job 2 error:', error)
    }
  })

  console.log(`Telegram cron jobs scheduled: ${TELEGRAM_CRON_1} and ${TELEGRAM_CRON_2}`)
}

