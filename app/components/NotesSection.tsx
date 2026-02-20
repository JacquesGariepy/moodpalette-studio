'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';

export default function NotesSection() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Idées projet', content: 'Nouvelles fonctionnalités à développer...', date: 'Aujourd\'hui' },
    { id: 2, title: 'Meeting notes', content: 'Points importants de la réunion...', date: 'Hier' },
    { id: 3, title: 'To-do semaine', content: 'Liste des tâches prioritaires...', date: 'Il y a 2 jours' },
  ]);

  const addNote = () => {
    toast.success('Nouvelle note créée!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold gradient-text">📝 Notes</h2>
        <button
          onClick={addNote}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl hover:shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Nouvelle note
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher dans vos notes..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500/50 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, idx) => (
          <div
            key={note.id}
            className="glass rounded-2xl p-6 hover-lift cursor-pointer"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{note.content}</p>
            <p className="text-xs text-gray-500">{note.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}