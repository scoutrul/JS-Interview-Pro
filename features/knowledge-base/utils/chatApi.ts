import { Topic } from '../../../core/types';
import { ChatMessage } from './chatOptimization';

export interface ChatRequest {
  systemPrompt: string;
  articleContext: Partial<Topic>;
  chatHistory: ChatMessage[];
  userMessage: string;
}

export interface ChatResponse {
  answer: string;
}

export interface ChatError {
  error: string;
  code?: 'network' | 'auth' | 'server' | 'unknown';
}

const API_URL = import.meta.env.VITE_API_URL;
const API_SECRET = import.meta.env.VITE_API_SECRET;

if (!API_URL) {
  console.warn('VITE_API_URL is not set');
}

if (!API_SECRET) {
  console.warn('VITE_API_SECRET is not set');
}

export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  if (!API_URL) {
    throw new Error('API URL is not configured');
  }
  
  if (!API_SECRET) {
    throw new Error('API secret is not configured');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_SECRET
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      if (response.status === 401) {
        const error: ChatError = {
          error: 'Ошибка авторизации. Обновите страницу.',
          code: 'auth'
        };
        throw error;
      }
      
      if (response.status >= 500) {
        const error: ChatError = {
          error: 'Ошибка сервера. Попробуйте позже.',
          code: 'server'
        };
        throw error;
      }
      
      const errorData = await response.json().catch(() => ({}));
      const error: ChatError = {
        error: errorData.error || 'Неизвестная ошибка',
        code: 'unknown'
      };
      throw error;
    }

    const data: ChatResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      const networkError: ChatError = {
        error: 'Ошибка соединения. Проверьте интернет.',
        code: 'network'
      };
      throw networkError;
    }
    
    if (error && typeof error === 'object' && 'code' in error) {
      throw error;
    }
    
    const unknownError: ChatError = {
      error: 'Неизвестная ошибка. Попробуйте позже.',
      code: 'unknown'
    };
    throw unknownError;
  }
}
