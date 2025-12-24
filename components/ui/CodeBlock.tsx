import React, { useMemo, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';

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

