import Fastify from 'fastify'
import cors from '@fastify/cors'
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env') })

const fastify = Fastify({ 
  logger: false,
  bodyLimit: 1048576, // 1MB
  disableRequestLogging: true
})

// Чтение конфигурации из .env
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const API_SECRET = process.env.API_SECRET // Опционален - нужен только для localhost
const ALLOWED_ORIGINS_STR = process.env.ALLOWED_ORIGINS || ''

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY not found in .env')
}

// API_SECRET опционален - требуется только для localhost запросов
if (!API_SECRET) {
  console.warn('API_SECRET not found in .env - localhost requests will be rejected')
}

// Парсинг разрешенных origin'ов
const allowedOrigins = ALLOWED_ORIGINS_STR
  .split(',')
  .map(origin => origin.trim())
  .filter(origin => origin.length > 0)

// Настройка CORS с проверкой origin
await fastify.register(cors, {
  origin: (origin, callback) => {
    // Разрешаем запросы без origin (например, Postman, curl)
    if (!origin) {
      return callback(null, true)
    }
    
    // Проверяем localhost (любой порт)
    if (origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:')) {
      return callback(null, true)
    }
    
    // Проверяем точное совпадение с разрешенными origin'ами
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    
    callback(new Error('Not allowed by CORS'), false)
  }
})

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
  model: 'gemini-flash-latest'
})

const chatHandler = async (request, reply) => {
  try {
    const {
      systemPrompt = '',
      articleContext = null,
      chatHistory = [],
      userMessage = ''
    } = request.body || {}

    // Format article object to text
    let articleText = ''
    if (articleContext) {
      const article = articleContext
      articleText = `
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
    return `${i + 1}. ${ex.title}`
  }
  return `${i + 1}. ${ex.title}\n${ex.code}`
}).join('\n\n')}` : ''}

${article.tags && article.tags.length > 0 ? `Tags: ${article.tags.join(', ')}` : ''}
`.trim()
    }

    const historyText = chatHistory
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n')

    const prompt = `
${systemPrompt}

Current article:
${articleText}

Chat history:
${historyText}

User: ${userMessage}
Assistant:
`

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    return { answer: response }
  } catch (err) {
    request.log.error(err)
    reply.code(500).send({ error: 'Gemini request failed' })
  }
}

// Проверка секретного ключа (только для localhost)
const checkApiSecret = async (request, reply) => {
  // Получаем origin из заголовков
  const origin = request.headers.origin || request.headers.referer || ''
  
  // Определяем, является ли origin localhost
  const isLocalhost = origin.startsWith('http://localhost:') || 
                      origin.startsWith('https://localhost:')
  
  if (isLocalhost) {
    // Для localhost требуем X-API-Key
    if (!API_SECRET) {
      return reply.code(500).send({ error: 'API_SECRET not configured for localhost' })
    }
    
    const apiKey = request.headers['x-api-key']
    if (!apiKey) {
      return reply.code(401).send({ error: 'X-API-Key header is required for localhost' })
    }
    
    if (apiKey !== API_SECRET) {
      return reply.code(401).send({ error: 'Invalid API secret for localhost' })
    }
  }
  // Для prod (не localhost) просто пропускаем без проверки
}

fastify.post('/api/chat', {
  schema: {
    body: {
      type: 'object',
      properties: {
        systemPrompt: { type: 'string' },
        articleContext: { type: ['object', 'null'] },
        chatHistory: { type: 'array' },
        userMessage: { type: 'string' }
      }
    }
  },
  preHandler: checkApiSecret
}, chatHandler)

fastify.listen({ port: 30024, host: '0.0.0.0' }, err => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log('Server running on http://localhost:30024')
})
