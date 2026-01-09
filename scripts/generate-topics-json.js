/**
 * Скрипт для генерации topics.json из всех статей
 * Запускать: npm run generate-topics (или tsx scripts/generate-topics-json.js)
 * Результат: server/topics.json
 */

import { getAllTopics, getAllTopicsWithMeta } from '../core/getAllTopics.ts';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OUTPUT_FILE = join(__dirname, '..', 'server', 'topics.json');

async function generateTopicsJson() {
  try {
    console.log('Generating topics.json...');
    
    const allTopics = getAllTopics();
    const topicsWithMeta = getAllTopicsWithMeta();
    
    // Создаем структуру с мета-информацией
    const topicsData = {
      topics: allTopics,
      topicsWithMeta: topicsWithMeta.map(t => ({
        topicId: t.topic.id,
        metaCategoryId: t.metaCategoryId,
        categoryId: t.category.id
      })),
      totalCount: allTopics.length,
      generatedAt: new Date().toISOString()
    };
    
    await writeFile(OUTPUT_FILE, JSON.stringify(topicsData, null, 2), 'utf-8');
    
    console.log(`✅ Generated ${allTopics.length} topics in ${OUTPUT_FILE}`);
    console.log(`   Meta categories: ${new Set(topicsWithMeta.map(t => t.metaCategoryId)).size}`);
  } catch (error) {
    console.error('Error generating topics.json:', error);
    process.exit(1);
  }
}

generateTopicsJson();
