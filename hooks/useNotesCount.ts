import { useState, useEffect } from 'react';

const STORAGE_KEY = 'js-interview-pro-notes';

export const useNotesCount = () => {
  const [count, setCount] = useState(0);

  const getNotesCount = () => {
    try {
      const savedNotes = localStorage.getItem(STORAGE_KEY);
      if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        return Array.isArray(notes) ? notes.length : 0;
      }
    } catch (e) {
      console.error('Failed to load notes count:', e);
    }
    return 0;
  };

  useEffect(() => {
    // Инициализация
    setCount(getNotesCount());

    // Слушаем изменения localStorage (для синхронизации между вкладками)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setCount(getNotesCount());
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Слушаем изменения в текущей вкладке через кастомное событие
    const handleCustomStorageChange = () => {
      setCount(getNotesCount());
    };

    window.addEventListener('notesUpdated', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('notesUpdated', handleCustomStorageChange);
    };
  }, []);

  return count;
};

