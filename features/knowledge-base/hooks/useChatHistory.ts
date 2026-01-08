import { useState, useEffect, useCallback } from 'react';
import { ChatMessage } from '../utils/chatOptimization';

const STORAGE_PREFIX = 'chat-history-';

function getStorageKey(topicId: string): string {
  return `${STORAGE_PREFIX}${topicId}`;
}

export function useChatHistory(topicId: string) {
  const [history, setHistory] = useState<ChatMessage[]>([]);

  // Загрузка истории при монтировании или смене темы
  useEffect(() => {
    try {
      const storageKey = getStorageKey(topicId);
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as ChatMessage[];
        setHistory(parsed);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
      setHistory([]);
    }
  }, [topicId]);

  // Сохранение истории в localStorage
  const saveHistory = useCallback((newHistory: ChatMessage[]) => {
    try {
      const storageKey = getStorageKey(topicId);
      localStorage.setItem(storageKey, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  }, [topicId]);

  // Добавление сообщения
  const addMessage = useCallback((message: ChatMessage) => {
    const newHistory = [...history, { ...message, timestamp: Date.now() }];
    saveHistory(newHistory);
  }, [history, saveHistory]);

  // Очистка истории
  const clearHistory = useCallback(() => {
    try {
      const storageKey = getStorageKey(topicId);
      localStorage.removeItem(storageKey);
      setHistory([]);
    } catch (error) {
      console.error('Failed to clear chat history:', error);
    }
  }, [topicId]);

  return {
    history,
    addMessage,
    clearHistory,
    setHistory: saveHistory
  };
}
