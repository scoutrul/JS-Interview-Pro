import React, { useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';

export const CodeBlock: React.FC<{ title: string; code: string }> = ({ title, code }) => {
  const highlighted = useMemo(() => Prism.highlight(code, Prism.languages.javascript, 'javascript'), [code]);

  return (
    <div className="rounded-xl border border-slate-800/80 bg-[#0d1117] overflow-hidden mb-8 shadow-lg">
      <div className="bg-[#1e293b]/10 px-4 py-2 border-b border-slate-800/60">
        <span className="text-[9px] font-bold text-slate-600 font-mono tracking-widest uppercase">{title}</span>
      </div>
      <div className="p-6 overflow-x-auto bg-[#0d1117]">
        <pre className="language-javascript text-[13px] leading-relaxed">
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    </div>
  );
};

