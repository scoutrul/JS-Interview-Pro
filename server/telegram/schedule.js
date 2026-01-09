import cron from 'node-cron'
import { runTelegramPosting } from './runPosting.js'

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
export function setupTelegramCron() {
  const CRON_SCHEDULE_1 = process.env.TELEGRAM_CRON_1 || '0 6 * * *'  // 09:00 МСК
  const CRON_SCHEDULE_2 = process.env.TELEGRAM_CRON_2 || '0 15 * * *' // 18:00 МСК

  if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.warn('TELEGRAM_BOT_TOKEN not found - cron jobs disabled')
    return
  }

  // Первый пост в день
  cron.schedule(CRON_SCHEDULE_1, async () => {
    console.log('Cron job 1 triggered: posting first article')
    try {
      const result = await runTelegramPosting(1)
      console.log('Cron job 1 result:', result)
    } catch (error) {
      console.error('Cron job 1 error:', error)
    }
  })

  // Второй пост в день
  cron.schedule(CRON_SCHEDULE_2, async () => {
    console.log('Cron job 2 triggered: posting second article')
    try {
      const result = await runTelegramPosting(1)
      console.log('Cron job 2 result:', result)
    } catch (error) {
      console.error('Cron job 2 error:', error)
    }
  })

  console.log(`Telegram cron jobs scheduled: ${CRON_SCHEDULE_1} and ${CRON_SCHEDULE_2}`)
}

