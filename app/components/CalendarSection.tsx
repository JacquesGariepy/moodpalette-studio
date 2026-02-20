'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function CalendarSection() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Réunion équipe', time: '09:00', color: 'indigo' },
    { id: 2, title: 'Appel client', time: '14:00', color: 'purple' },
    { id: 3, title: 'Session sport', time: '18:00', color: 'cyan' },
  ]);

  const addEvent = () => {
    toast.success('Événement ajouté avec succès!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold gradient-text">📅 Calendrier</h2>
        <button
          onClick={addEvent}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl hover:shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Nouvel événement
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
              <div key={day} className="text-center text-sm text-gray-400 font-medium">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => (
              <button
                key={i}
                className={`aspect-square rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center ${
                  i === 15 ? 'bg-gradient-to-br from-indigo-500 to-purple-500 font-bold' : 'text-gray-400'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Aujourd'hui</h3>
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-lg bg-gradient-to-r from-${event.color}-500/10 to-${event.color}-500/5 border border-${event.color}-500/20 hover-lift cursor-pointer`}
              >
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-400">{event.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}