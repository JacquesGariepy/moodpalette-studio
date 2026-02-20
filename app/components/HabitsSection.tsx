'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function HabitsSection() {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Méditation', streak: 12, completed: true, icon: '🧘' },
    { id: 2, name: 'Lecture', streak: 7, completed: true, icon: '📚' },
    { id: 3, name: 'Sport', streak: 5, completed: false, icon: '💪' },
    { id: 4, name: 'Hydratation', streak: 15, completed: true, icon: '💧' },
  ]);

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
    toast.success('Habitude mise à jour!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold gradient-text">🎯 Habitudes</h2>
        <button
          onClick={() => toast.success('Nouvelle habitude créée!')}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl hover:shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Nouvelle habitude
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {habits.map((habit, idx) => (
          <div
            key={habit.id}
            className="glass rounded-2xl p-6 hover-lift cursor-pointer"
            style={{ animationDelay: `${idx * 100}ms` }}
            onClick={() => toggleHabit(habit.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{habit.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{habit.name}</h3>
                  <p className="text-sm text-gray-400">Streak: {habit.streak} jours 🔥</p>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                habit.completed ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-white/5'
              }`}>
                {habit.completed && '✓'}
              </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{ width: `${(habit.streak / 30) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}