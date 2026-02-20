'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export default function FocusSection() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      toast.success(mode === 'work' ? 'Session terminée! Prends une pause.' : 'Pause terminée! Au travail.');
    }
    return () => clearInterval(interval);
  }, [isRunning, time, mode]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTime(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setMode(newMode);
    setIsRunning(false);
    setTime(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold gradient-text">⏱️ Mode Focus</h2>

      <div className="glass rounded-2xl p-12 text-center">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => switchMode('work')}
            className={`px-6 py-2 rounded-xl transition-all ${
              mode === 'work'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            Travail
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`px-6 py-2 rounded-xl transition-all ${
              mode === 'break'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            Pause
          </button>
        </div>

        <div className="text-9xl font-bold mb-8 gradient-text">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={toggleTimer}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center justify-center"
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={resetTimer}
            className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-4xl mb-2">🎯</p>
          <p className="text-2xl font-bold mb-1">12</p>
          <p className="text-sm text-gray-400">Sessions aujourd'hui</p>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-4xl mb-2">⏱️</p>
          <p className="text-2xl font-bold mb-1">6h</p>
          <p className="text-sm text-gray-400">Temps de focus</p>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-4xl mb-2">🔥</p>
          <p className="text-2xl font-bold mb-1">7</p>
          <p className="text-sm text-gray-400">Jours consécutifs</p>
        </div>
      </div>
    </div>
  );
}