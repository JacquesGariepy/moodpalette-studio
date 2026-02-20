'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import CalendarSection from './components/CalendarSection';
import NotesSection from './components/NotesSection';
import HabitsSection from './components/HabitsSection';
import FinanceSection from './components/FinanceSection';
import MoodSection from './components/MoodSection';
import FocusSection from './components/FocusSection';

export default function Home() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'calendar':
        return <CalendarSection />;
      case 'notes':
        return <NotesSection />;
      case 'habits':
        return <HabitsSection />;
      case 'finance':
        return <FinanceSection />;
      case 'mood':
        return <MoodSection />;
      case 'focus':
        return <FocusSection />;
      default:
        return <DashboardOverview setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0f2e] to-[#0a0a0f]">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

function DashboardOverview({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const quickStats = [
    { label: 'Tâches complétées', value: '24', change: '+12%', color: 'from-indigo-500 to-purple-500' },
    { label: 'Streak actuel', value: '7j', change: 'Record!', color: 'from-purple-500 to-pink-500' },
    { label: 'Économies', value: '2.4k€', change: '+8%', color: 'from-cyan-500 to-blue-500' },
    { label: 'Humeur moyenne', value: '4.2/5', change: '+0.3', color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold gradient-text mb-2">Bienvenue sur Aether</h1>
        <p className="text-gray-400">Votre dashboard personnel ultra-premium</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, idx) => (
          <div
            key={idx}
            className="glass rounded-2xl p-6 hover-lift cursor-pointer"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <span className="text-2xl">✨</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-green-400 text-sm">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6 hover-lift cursor-pointer" onClick={() => setActiveSection('calendar')}>
          <h3 className="text-xl font-semibold mb-4">📅 Prochains événements</h3>
          <div className="space-y-3">
            {['Réunion équipe', 'Appel client', 'Session sport'].map((event, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span>{event}</span>
                <span className="ml-auto text-sm text-gray-400">{14 + idx}:00</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6 hover-lift cursor-pointer" onClick={() => setActiveSection('habits')}>
          <h3 className="text-xl font-semibold mb-4">🎯 Habitudes du jour</h3>
          <div className="space-y-3">
            {['Méditation', 'Lecture', 'Sport'].map((habit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  ✓
                </div>
                <span className="flex-1">{habit}</span>
                <div className="text-sm text-gray-400">7 jours</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}