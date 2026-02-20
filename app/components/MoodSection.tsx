'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function MoodSection() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  
  const moods = [
    { emoji: '😢', label: 'Triste', value: 1, color: 'blue' },
    { emoji: '😐', label: 'Neutre', value: 2, color: 'gray' },
    { emoji: '🙂', label: 'Bien', value: 3, color: 'green' },
    { emoji: '😊', label: 'Heureux', value: 4, color: 'yellow' },
    { emoji: '🤩', label: 'Excellent', value: 5, color: 'purple' },
  ];

  const moodHistory = [
    { date: 'Lun', value: 4 },
    { date: 'Mar', value: 3 },
    { date: 'Mer', value: 5 },
    { date: 'Jeu', value: 4 },
    { date: 'Ven', value: 4 },
    { date: 'Sam', value: 5 },
    { date: 'Dim', value: 3 },
  ];

  const saveMood = (value: number) => {
    setSelectedMood(value);
    toast.success('Humeur enregistrée!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold gradient-text">☁️ Journal d'humeur</h2>

      <div className="glass rounded-2xl p-8">
        <h3 className="text-xl font-semibold mb-6 text-center">Comment te sens-tu aujourd'hui ?</h3>
        <div className="flex justify-center gap-4">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => saveMood(mood.value)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover-lift ${
                selectedMood === mood.value
                  ? 'bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border-2 border-indigo-500'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <span className="text-4xl">{mood.emoji}</span>
              <span className="text-sm">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Tendance de la semaine</h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {moodHistory.map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${(day.value / 5) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-400">{day.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Statistiques</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Moyenne cette semaine</span>
              <span className="text-2xl font-bold">4.1/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Meilleur jour</span>
              <span className="text-lg font-semibold">Mercredi 🤩</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Streak positif</span>
              <span className="text-lg font-semibold">7 jours 🔥</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}