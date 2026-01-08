import React, { useState, useRef, useEffect } from 'react';
import { Topic } from '../../../core/types';
import { useChatHistory } from '../hooks/useChatHistory';
import { sendChatMessage, ChatError } from '../utils/chatApi';
import { getSystemPrompt, ChatIntent } from '../utils/systemPrompts';
import { limitChatHistory, prepareArticleContext, ChatMessage } from '../utils/chatOptimization';

// Безопасный рендеринг markdown с экранированием HTML тегов
function renderMarkdown(text: string): string {
  // Сначала экранируем HTML теги (но не markdown синтаксис)
  let result = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // Затем парсим markdown (после экранирования HTML)
  // Жирный текст **text**
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Курсив *text* (но не ** и не в начале строки)
  result = result.replace(/(?<!\*)\*([^*\n<]+?)\*(?!\*)/g, '<em>$1</em>');
  // Inline код `code`
  result = result.replace(/`([^`]+?)`/g, '<code class="bg-slate-800/40 px-1 py-0.5 rounded text-emerald-400 text-[0.9em] font-mono">$1</code>');
  
  // Обрабатываем переносы строк (сохраняем их)
  result = result.replace(/\n/g, '<br/>');
  
  return result;
}

interface ChatAssistantProps {
  topic: Topic;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ topic }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIntent, setCurrentIntent] = useState<ChatIntent>('question');
  const [placeholder, setPlaceholder] = useState('Задай вопрос по статье...');
  
  const { history, addMessage, clearHistory, setHistory } = useChatHistory(topic.id);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Загружаем историю при монтировании
  useEffect(() => {
    setMessages(history);
  }, [history]);

  // Автоскролл к последнему сообщению пользователя после ответа ассистента
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      // Если последнее сообщение от ассистента, скроллим к последнему сообщению пользователя
      if (lastMessage.role === 'assistant' && lastUserMessageRef.current) {
        setTimeout(() => {
          lastUserMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [messages]);

  // Фиксированная высота textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '48px';
    }
  }, []);

  const handleIntentClick = (intent: ChatIntent) => {
    setCurrentIntent(intent);
    setError(null);
    
    const placeholders = {
      question: 'Задай вопрос по статье...',
      quiz: 'Ответь на вопрос ассистента...',
      exercise: 'Напиши решение задачи...',
      'deep-dive': 'Задай вопрос для углубления...'
    };
    setPlaceholder(placeholders[intent]);

    // Если это quiz или exercise, отправляем автоматический запрос
    if (intent === 'quiz' || intent === 'exercise') {
      handleSend('', intent);
    } else {
      textareaRef.current?.focus();
    }
  };

  const handleSend = async (messageText?: string, intentOverride?: ChatIntent) => {
    const userMessage = messageText || input.trim();
    if (!userMessage && !intentOverride) return;

    const intent = intentOverride || currentIntent;
    setError(null);
    setLoading(true);

    // Добавляем сообщение пользователя (если есть)
    let newMessages = [...messages];
    if (userMessage) {
      const userMsg: ChatMessage = { role: 'user', content: userMessage };
      newMessages.push(userMsg);
      setMessages(newMessages);
      addMessage(userMsg);
      setInput('');
    }

    try {
      // Подготавливаем данные
      const systemPrompt = getSystemPrompt(intent, topic);
      const articleContext = prepareArticleContext(topic);
      const limitedHistory = limitChatHistory(newMessages.map(m => ({
        role: m.role,
        content: m.content
      })));

      // Отправляем запрос
      const response = await sendChatMessage({
        systemPrompt,
        articleContext,
        chatHistory: limitedHistory,
        userMessage: userMessage || (intent === 'quiz' ? 'Задай мне вопросы по теме' : 'Дай задачу на закрепление')
      });

      // Добавляем ответ ассистента
      const assistantMsg: ChatMessage = { 
        role: 'assistant', 
        content: response.answer 
      };
      const updatedMessages = [...newMessages, assistantMsg];
      setMessages(updatedMessages);
      addMessage(assistantMsg);
      setHistory(updatedMessages);
    } catch (err) {
      const chatError = err as ChatError;
      setError(chatError.error || 'Произошла ошибка');
      
      // Убираем последнее сообщение пользователя при ошибке
      if (userMessage) {
        setMessages(newMessages.slice(0, -1));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    clearHistory();
    setMessages([]);
    setError(null);
    setCurrentIntent('question');
    setPlaceholder('Задай вопрос по статье...');
  };

  const scenarioButtons = [
    { icon: '🧠', label: 'Спроси меня по теме', intent: 'quiz' as ChatIntent },
    { icon: '✍️', label: 'Дай задачу на закрепление', intent: 'exercise' as ChatIntent },
    { icon: '🔍', label: 'Раскрой тему глубже', intent: 'deep-dive' as ChatIntent },
    { icon: '💬', label: 'Задать свой вопрос', intent: 'question' as ChatIntent }
  ];

  return (
    <section className="mt-16 mb-10 bg-slate-800 border border-slate-700 rounded-xl p-6 lg:p-8 shadow-xl">
      {/* Заголовок */}
      <div className="mb-4">
        <h2 className="text-white text-lg font-black mb-1">AI-ассистент по этой теме</h2>
        <p className="text-slate-400 text-xs">Задай вопрос, проверь себя или закрепи материал</p>
      </div>

      {/* Чат */}
      <div className="mb-4 min-h-[200px] space-y-3">
        {/* Приветственное сообщение от бота */}
        {messages.length === 0 && !loading && (
          <div className="flex justify-start animate-fade-in">
            <div className="max-w-[85%] bg-slate-700/30 border border-slate-600/50 rounded-lg px-3 py-2">
              <div className="text-xs leading-relaxed text-slate-300">
                <p className="mb-3">
                  Здравствуйте! Я ваш учебный ассистент по материалу <strong>"{topic.title}"</strong>. 
                  Чем я могу помочь вам разобраться в теме?
                </p>
                <p className="mb-2 text-slate-400">Я могу:</p>
                <div className="space-y-1.5">
                  {scenarioButtons.map((btn) => (
                    <button
                      key={btn.intent}
                      onClick={() => handleIntentClick(btn.intent)}
                      disabled={loading}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs leading-relaxed transition-all ${
                        currentIntent === btn.intent
                          ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500/50'
                          : 'text-slate-300 hover:bg-slate-600/30 hover:text-slate-200'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <span className="mr-1.5">{btn.icon}</span>
                      <span>{btn.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {messages.map((msg, idx) => {
          const isLastUserMessage = msg.role === 'user' && idx === messages.length - 1;
          const isLastUserMessageInHistory = msg.role === 'user' && 
            messages.slice(idx + 1).every(m => m.role === 'assistant');
          
          return (
            <div
              key={idx}
              ref={isLastUserMessageInHistory ? lastUserMessageRef : null}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 ${
                  msg.role === 'user'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-slate-200'
                    : 'bg-slate-700/30 border border-slate-600/50 text-slate-300'
                }`}
              >
                <div 
                  className="text-xs leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                />
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span>Ассистент думает...</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-red-400 text-xs">
            <i className="fa-solid fa-exclamation-circle mr-1.5"></i>
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Форма ввода */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              if (e.target.value.length <= 1000) {
                setInput(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={loading}
            rows={1}
            className="w-full h-[48px] bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-3 text-slate-300 text-xs resize-none focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {input.length > 0 && (
            <div className="absolute bottom-1.5 right-2 text-[10px] text-slate-500">
              {input.length}/1000
            </div>
          )}
        </div>
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="h-[48px] px-4 py-3 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 rounded-lg font-medium hover:bg-emerald-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 text-xs"
        >
          <i className="fa-solid fa-paper-plane text-xs"></i>
          <span className="hidden sm:inline">Отправить</span>
        </button>
        {messages.length > 0 && (
          <button
            onClick={handleClear}
            disabled={loading}
            className="h-[48px] px-3 py-3 bg-slate-700/30 border border-slate-600/50 text-slate-400 rounded-lg hover:bg-slate-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Очистить чат"
          >
            <i className="fa-solid fa-trash text-xs"></i>
          </button>
        )}
      </div>
    </section>
  );
};

export default ChatAssistant;
