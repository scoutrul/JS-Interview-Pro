import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Файл журнала находится в корне server/
const LOG_FILE = join(__dirname, '..', 'posting-log.json');

/**
 * Загрузить журнал постинга
 */
async function loadLog() {
  try {
    if (!existsSync(LOG_FILE)) {
      return [];
    }
    
    const content = await readFile(LOG_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error loading posting log:', error);
    return [];
  }
}

/**
 * Сохранить журнал постинга
 */
async function saveLog(log) {
  try {
    await writeFile(LOG_FILE, JSON.stringify(log, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving posting log:', error);
    throw error;
  }
}

/**
 * Добавить запись в журнал
 */
export async function addLogEntry(entry) {
  const log = await loadLog();
  
  const logEntry = {
    timestamp: new Date().toISOString(),
    topicId: entry.topicId,
    status: entry.status, // 'success' | 'error'
    messageId: entry.messageId || null,
    error: entry.error || null
  };
  
  log.push(logEntry);
  await saveLog(log);
  
  return logEntry;
}

/**
 * Получить все записи журнала
 */
export async function getLogs() {
  return await loadLog();
}

/**
 * Получить последние N записей журнала
 */
export async function getLastLogs(limit = 10) {
  const log = await loadLog();
  return log.slice(-limit);
}
