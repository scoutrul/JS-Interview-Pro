import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/95 border-t border-slate-800/80 py-4 px-4 lg:px-6 mt-auto">
      <div className="max-w-[min(90vw,80rem)] mx-auto">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-slate-400 text-xs leading-relaxed">
            Front Start — обучающий проект для фронтенд-разработчиков. Повторение, закрепление и систематизация знаний для подготовки к техническим интервью.
          </p>
          <p className="text-slate-500 text-xs">
            <a href="https://t.me/frontstart_ru" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors"><i className="fa-brands fa-telegram"></i> Telegram канал</a>
          </p>
          <p className="text-slate-500 text-xs">
            © {currentYear} www.frontstart.online / <a href="https://www.antongolova.ru" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">antongolova.ru</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
