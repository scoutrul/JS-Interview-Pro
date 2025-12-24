import React from 'react';
import { Difficulty } from '../../core/types';

export const Badge: React.FC<{ 
  variant: Difficulty | 'tag' | 'active-tag' | 'status'; 
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ variant, children, onClick, className = "" }) => {
  const base = "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all duration-300 select-none flex-shrink-0 inline-flex items-center justify-center min-w-[32px]";
  
  const styles: Record<string, string> = {
    beginner: "bg-emerald-500/5 text-emerald-500 border-emerald-500/20",
    intermediate: "bg-amber-500/5 text-amber-500 border-amber-500/20",
    advanced: "bg-purple-500/5 text-purple-500 border-purple-500/20",
    tag: "bg-slate-800/40 text-slate-500 border-slate-700/30 hover:border-slate-500 hover:text-slate-300 cursor-pointer",
    "active-tag": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)] cursor-pointer",
    status: "bg-slate-900/60 text-slate-500 border-slate-800"
  };

  const renderStars = (count: number) => (
    <div className="flex gap-0.5 items-center">
      {[...Array(count)].map((_, i) => (
        <i key={i} className="fa-solid fa-star text-[7px]"></i>
      ))}
    </div>
  );

  return (
    <span onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {variant === 'beginner' && renderStars(1)}
      {variant === 'intermediate' && renderStars(2)}
      {variant === 'advanced' && renderStars(3)}
      {variant !== 'beginner' && variant !== 'intermediate' && variant !== 'advanced' && children}
    </span>
  );
};

