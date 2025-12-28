
import React, { useState, useEffect } from 'react';

interface Note {
  id: string;
  text: string;
  createdAt: number;
}

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'js-interview-pro-notes';

const NotesModal: React.FC<NotesModalProps> = ({ isOpen, onClose }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  // Загрузка заметок из localStorage
  useEffect(() => {
    if (isOpen) {
      const savedNotes = localStorage.getItem(STORAGE_KEY);
      if (savedNotes) {
        try {
          setNotes(JSON.parse(savedNotes));
        } catch (e) {
          console.error('Failed to load notes:', e);
          setNotes([]);
        }
      }
    }
  }, [isOpen]);

  // Сохранение заметок в localStorage
  const saveNotes = (updatedNotes: Note[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    // Отправляем кастомное событие для обновления счетчика в других компонентах
    window.dispatchEvent(new Event('notesUpdated'));
  };

  // Добавление новой заметки
  const handleAddNote = () => {
    if (!newNote.trim()) {
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      text: newNote.trim(),
      createdAt: Date.now()
    };

    const updatedNotes = [note, ...notes];
    saveNotes(updatedNotes);
    setNewNote('');
  };

  // Удаление заметки
  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
  };

  // Форматирование даты
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-[#1e293b] border border-slate-800/80 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800/60 flex items-center justify-between">
            <h2 className="text-2xl font-black text-white">Заметки</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-300 hover:bg-slate-800/50 rounded-lg transition-colors"
              title="Закрыть"
            >
              <i className="fa-solid fa-times text-sm"></i>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Форма добавления заметки */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-300">
                Новая заметка
              </label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    handleAddNote();
                  }
                }}
                placeholder="Введите текст заметки... (Ctrl+Enter для добавления)"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-sm text-slate-300 placeholder:text-slate-600 outline-none focus:border-emerald-500/50 resize-none transition-colors"
                rows={4}
              />
              <button
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="w-full bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-lg py-2 px-4 text-sm font-bold"
              >
                <i className="fa-solid fa-plus mr-2"></i>
                Добавить заметку
              </button>
            </div>

            {/* Список заметок */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide">
                Мои заметки ({notes.length})
              </h3>
              
              {notes.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">
                  <i className="fa-solid fa-sticky-note text-3xl mb-3 opacity-30"></i>
                  <p>Нет заметок. Добавьте первую заметку выше.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 group hover:border-slate-600/50 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <span className="text-xs text-slate-500">
                          {formatDate(note.createdAt)}
                        </span>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all opacity-0 group-hover:opacity-100"
                          title="Удалить заметку"
                        >
                          <i className="fa-solid fa-trash text-xs"></i>
                        </button>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {note.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesModal;

