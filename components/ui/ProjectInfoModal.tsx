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
                <h3 className="text-lg font-bold text-white mb-2">Frontender Pro</h3>
                <p className="text-sm leading-relaxed">
                  Интерактивное приложение для изучения JavaScript и Frontend технологий. 
                  Проект содержит структурированную базу знаний с примерами кода, объяснениями 
                  и визуализаторами для лучшего понимания концепций.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-wide">
                  Текущее состояние
                </h4>
                <ul className="text-sm space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Полное покрытие Browser API: DOM, Fetch, Events, Storage, Web Workers, Service Workers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Интерактивные визуализаторы для сложных концепций (Scope Chain и др.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Структурированные темы от базового до продвинутого уровня</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Подсветка синтаксиса кода с помощью Prism.js</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Адаптивный интерфейс с поддержкой мобильных устройств</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-wide">
                  В планах
                </h4>
                <ul className="text-sm space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Reactive frameworks и libraries: React, Vue, Angular</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>CSS-layer: Grid, Flexbox, Custom Properties, Animations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Архитектурные паттерны: MVC, MVP, MVVM, Flux, Redux, Clean Architecture</span>
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
                <p className="text-xs text-slate-500 text-center">
                  Frontender Pro © 2025
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

