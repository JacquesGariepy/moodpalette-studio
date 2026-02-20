'use client';

import { Calendar, FileText, Target, TrendingUp, Cloud, Timer } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
  { id: 'calendar', icon: Calendar, label: 'Calendrier' },
  { id: 'notes', icon: FileText, label: 'Notes' },
  { id: 'habits', icon: Target, label: 'Habitudes' },
  { id: 'finance', icon: TrendingUp, label: 'Finances' },
  { id: 'mood', icon: Cloud, label: 'Humeur' },
  { id: 'focus', icon: Timer, label: 'Focus' },
];

export default function Sidebar({ activeSection, setActiveSection }: any) {
  return (
    <aside className="w-64 glass border-r border-white/10 p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold gradient-text">Aether</h1>
        <p className="text-xs text-gray-400 mt-1">Premium Dashboard</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = typeof item.icon === 'string' ? null : item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {Icon ? <Icon size={20} /> : <span className="text-xl">{item.icon}</span>}
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <span className="text-sm font-bold">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-400">Premium</p>
          </div>
        </div>
      </div>
    </aside>
  );
}