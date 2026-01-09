/**
 * PM2 Ecosystem конфигурация для сервера
 * 
 * Использование:
 *   pm2 start ecosystem.config.js
 *   pm2 stop frontstart-server
 *   pm2 restart frontstart-server
 *   pm2 logs frontstart-server
 *   pm2 delete frontstart-server
 * 
 * Файл должен лежать в /var/www/frontstart.ru/server/
 */

module.exports = {
  apps: [{
    name: 'frontstart-server',
    script: 'index.js',
    cwd: '/var/www/frontstart.ru/server',
    interpreter: 'node',
    exec_mode: 'fork', // Один процесс (не cluster, т.к. у нас cron внутри)
    instances: 1,
    autorestart: true,
    watch: false, // Отключить автоперезагрузку при изменениях (для production)
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
