import React from 'react';

export const IconButton: React.FC<{
  icon: string;
  onClick: () => void;
  active?: boolean;
  className?: string;
  pulse?: boolean;
  disabled?: boolean;
}> = ({ icon, onClick, active, className = "", pulse, disabled }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border ${
      active 
        ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/10' 
        : 'bg-slate-900/40 border-slate-800 text-slate-500 hover:text-white hover:border-slate-600'
    } ${pulse ? 'animate-pulse' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
  >
    <i className={`fa-solid ${icon} text-base`}></i>
  </button>
);

