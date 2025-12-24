import React from 'react';

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

