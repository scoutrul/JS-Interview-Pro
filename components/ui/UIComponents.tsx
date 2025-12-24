
import React, { useMemo, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import { Difficulty } from '../../core/types';

// --- Atoms ---

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
    advanced: "bg-rose-500/5 text-rose-500 border-rose-500/20",
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

export const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;
  const parseInlines = (str: string) => str
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code class="bg-slate-800/40 px-1.5 py-0.5 rounded text-emerald-400 text-[0.9em] font-mono">$1</code>');

  const nodes = text.split('\n').map((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      return <li key={index} className="ml-4 text-slate-300 mb-2 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: parseInlines(trimmed.substring(2)) }} />;
    }
    if (trimmed === '') return <div key={index} className="h-2" />;
    return <p key={index} className="text-slate-400 leading-relaxed mb-4 text-sm" dangerouslySetInnerHTML={{ __html: parseInlines(line) }} />;
  });

  return <div className="prose-custom">{nodes}</div>;
};

export const CodeBlock: React.FC<{ title: string; code: string }> = ({ title, code }) => {
  const [copied, setCopied] = useState(false);
  const highlighted = useMemo(() => Prism.highlight(code, Prism.languages.javascript, 'javascript'), [code]);

  return (
    <div className="rounded-xl border border-slate-800/80 bg-[#0d1117] overflow-hidden mb-8 shadow-lg">
      <div className="p-6 overflow-x-auto bg-[#0d1117]">
        <pre className="language-javascript text-[13px] leading-relaxed">
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
      <div className="bg-[#1e293b]/10 px-5 py-3 border-t border-slate-800/60 flex justify-between items-center">
        <span className="text-[9px] font-bold text-slate-600 font-mono tracking-widest uppercase">{title}</span>
        <button 
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }} 
          className="text-[9px] text-slate-500 hover:text-emerald-400 uppercase font-black tracking-widest transition-colors"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
};
