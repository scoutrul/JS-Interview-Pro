import React, { useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';

export const CodeBlock: React.FC<{ title: string; code: string }> = ({ title, code }) => {
  // Проверяем, состоит ли код только из комментариев
  const isOnlyComments = useMemo(() => {
    // Убираем все комментарии (однострочные и многострочные) и whitespace
    const withoutComments = code
      .replace(/\/\/.*$/gm, '') // однострочные комментарии
      .replace(/\/\*[\s\S]*?\*\//g, '') // многострочные комментарии
      .replace(/\s+/g, ''); // все пробелы
    return withoutComments.length === 0;
  }, [code]);

  // Если код состоит только из комментариев, убираем маркеры комментариев
  const processedCode = useMemo(() => {
    if (!isOnlyComments) return code;
    
    return code
      .split('\n')
      .map(line => {
        // Убираем // в начале строки
        const singleLineMatch = line.match(/^(\s*)\/\/(.*)$/);
        if (singleLineMatch) {
          return singleLineMatch[1] + singleLineMatch[2];
        }
        
        // Убираем /* и */ для многострочных комментариев
        let processed = line
          .replace(/\/\*/g, '')
          .replace(/\*\//g, '');
        
        return processed;
      })
      .join('\n');
  }, [code, isOnlyComments]);

  const highlighted = useMemo(() => Prism.highlight(processedCode, Prism.languages.javascript, 'javascript'), [processedCode]);

  return (
    <div className="rounded-xl border border-slate-800/80 bg-[#0d1117] overflow-hidden mb-8 shadow-lg">
      <div className="bg-[#364055] px-4 py-2 border-b border-slate-800/60">
        <span className="text-[12px] font-bold text-amber-500 font-mono tracking-widest uppercase">{title}</span>
      </div>
      <div className="px-4 py-6 lg:p-6 overflow-x-auto bg-[#334155]">
        <pre className={`language-javascript text-sm leading-relaxed ${isOnlyComments ? 'code-only-comments' : ''}`} style={{ fontSize: '14px' }}>
          <code style={{ fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    </div>
  );
};

