
import React, { useState } from 'react';
import { askInterviewer } from '../../../services/gemini';
import { IconButton, MarkdownRenderer, Badge } from '../../../components/ui/UIComponents';

interface MentorProps {
  topicTitle: string;
}

const Mentor: React.FC<MentorProps> = ({ topicTitle }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    const res = await askInterviewer(topicTitle, answer);
    setFeedback(res || null);
    setLoading(false);
  };

  return (
    <section className="bg-[#1e293b]/20 border border-slate-800/60 rounded-xl p-8 mb-12 shadow-lg relative overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <i className="fa-solid fa-robot text-emerald-500 text-sm"></i>
        <h4 className="text-white text-sm font-bold">Проверка знаний</h4>
      </div>
      <p className="text-slate-500 text-[10px] mb-6 font-medium">Напишите объяснение темы, как на реальном собеседовании.</p>
      
      <div className="relative group mb-4">
        <textarea 
          value={answer} 
          onChange={(e) => setAnswer(e.target.value)} 
          placeholder="Ваш ответ..." 
          className="w-full bg-[#0d1117] border border-slate-800/80 rounded-lg p-5 text-sm text-slate-300 outline-none min-h-[160px] focus:border-emerald-500/30 transition-all resize-none placeholder:text-slate-700"
        />
      </div>

      <button 
        onClick={handleCheck} 
        disabled={loading || !answer.trim()}
        className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 font-bold py-3 rounded-lg transition-all text-xs uppercase tracking-widest disabled:opacity-30"
      >
        {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : "Получить фидбек"}
      </button>

      {feedback && (
        <div className="mt-8 bg-[#0d1117] p-6 rounded-lg border border-slate-800/80 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="status">Mentor Feedback</Badge>
          </div>
          <MarkdownRenderer text={feedback} />
        </div>
      )}
    </section>
  );
};

export default Mentor;
