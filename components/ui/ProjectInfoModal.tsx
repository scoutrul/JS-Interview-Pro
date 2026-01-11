import React from 'react';

interface ProjectInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectInfoModal: React.FC<ProjectInfoModalProps> = ({ isOpen, onClose }) => {
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
          className="bg-[#1e293b] border border-slate-800/80 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white">О проекте</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-300 hover:bg-slate-800/50 rounded-lg transition-colors"
                title="Закрыть"
              >
                <i className="fa-solid fa-times text-sm"></i>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6 text-slate-300">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Front Start</h3>
                <p className="text-sm leading-relaxed mb-3">
                  Front Start — это обучающий проект для фронтенд-разработчиков, созданный для повторения, 
                  закрепления и систематизации теоретических знаний, чтобы повысить успешность прохождения 
                  технических интервью.
                </p>
                <p className="text-sm leading-relaxed text-slate-400 mb-3">
                  Проект ориентирован на разработчиков, которые хотят быстро освежить знания, закрыть пробелы 
                  и иметь удобную интерактивную шпаргалку для подготовки к собеседованию.
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  Следите за обновлениями и новыми материалами в нашем{' '}
                  <a href="https://t.me/frontstart_ru" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors underline"><i className="fa-brands fa-telegram"></i> Telegram канале</a>.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-wide">
                  Структура и содержание
                </h4>
                <ul className="text-sm space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span><strong>Мета-категории:</strong> JavaScript, TypeScript, браузерные API, инструменты, оптимизация, архитектура и другие</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span><strong>Уровни сложности:</strong> начинающий, средний, продвинутый</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span><strong>Содержание темы:</strong> краткая информация, ключевые моменты, практические примеры</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span><strong>Теги:</strong> каждая тема связана с другими для релевантной навигации</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-wide">
                  Навигация и поиск
                </h4>
                <ul className="text-sm space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span><strong>Система поиска:</strong> двойной клик по слову автоматически запускает поиск по всем темам</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span><strong>Фильтры:</strong> по тегам, по сложности</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span><strong>Переключение между разделами:</strong> удобное и логичное</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span><strong>Каждая тема имеет собственный URL:</strong> можно открыть напрямую</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-wide">
                  Обучение и прогресс
                </h4>
                <ul className="text-sm space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span><strong>Отметка тем как пройденных:</strong> прогресс считается автоматически</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span><strong>Система заметок:</strong> сохраняется в Local Storage, можно продолжать обучение на том же устройстве</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span><strong>Метрики прогресса:</strong> визуальное отображение изученного материала в разделе</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-wide">
                  Техническая реализация
                </h4>
                <ul className="text-sm space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>SPA на React.js с клиентским роутингом</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Навигация вперед/назад через историю браузера</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Динамическая подгрузка контента и возможность прямых ссылок на темы</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-wide">
                  Технологический стек
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['React 19', 'TypeScript', 'Vite', 'Zustand', 'Tailwind CSS', 'Prism.js'].map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs font-medium text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/60">
                <p className="text-xs text-slate-500 text-center mb-2">
                  Front Start — каламбур на «frontend» и «start», лёгкая шутка для посвящённых.
                </p>
                <p className="text-xs text-slate-500 text-center">
                  Проект некоммерческий, создаётся для образовательных целей и удобства разработчиков.
                </p>
                <p className="text-xs text-slate-500 text-center mt-2">
                  <a href="https://t.me/frontstart_ru" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Telegram канал</a> • © {new Date().getFullYear()} Front Start by <a href="https://www.antongolova.ru" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">antongolova.ru</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectInfoModal;

