'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

export default function FinanceSection() {
  const transactions = [
    { id: 1, name: 'Salaire', amount: 3500, type: 'income', date: '01 Jan' },
    { id: 2, name: 'Loyer', amount: -800, type: 'expense', date: '05 Jan' },
    { id: 3, name: 'Courses', amount: -150, type: 'expense', date: '10 Jan' },
    { id: 4, name: 'Freelance', amount: 500, type: 'income', date: '15 Jan' },
  ];

  const categories = [
    { name: 'Logement', amount: 800, color: 'indigo', percent: 40 },
    { name: 'Alimentation', amount: 350, color: 'purple', percent: 17 },
    { name: 'Transport', amount: 200, color: 'cyan', percent: 10 },
    { name: 'Loisirs', amount: 300, color: 'pink', percent: 15 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold gradient-text">💰 Finances</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-6">
          <p className="text-gray-400 mb-2">Solde total</p>
          <p className="text-4xl font-bold mb-1">2,450€</p>
          <p className="text-green-400 text-sm flex items-center gap-1">
            <TrendingUp size={16} />
            +8% ce mois
          </p>
        </div>
        <div className="glass rounded-2xl p-6">
          <p className="text-gray-400 mb-2">Revenus</p>
          <p className="text-4xl font-bold mb-1">4,000€</p>
          <p className="text-green-400 text-sm">Ce mois</p>
        </div>
        <div className="glass rounded-2xl p-6">
          <p className="text-gray-400 mb-2">Dépenses</p>
          <p className="text-4xl font-bold mb-1">1,550€</p>
          <p className="text-red-400 text-sm flex items-center gap-1">
            <TrendingDown size={16} />
            -3% ce mois
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Dépenses par catégorie</h3>
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between mb-2">
                  <span>{cat.name}</span>
                  <span className="font-semibold">{cat.amount}€</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-${cat.color}-500 to-${cat.color}-600`}
                    style={{ width: `${cat.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Transactions récentes</h3>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover-lift cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    tx.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {tx.type === 'income' ? <TrendingUp size={20} className="text-green-400" /> : <TrendingDown size={20} className="text-red-400" />}
                  </div>
                  <div>
                    <p className="font-medium">{tx.name}</p>
                    <p className="text-sm text-gray-400">{tx.date}</p>
                  </div>
                </div>
                <p className={`font-semibold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount}€
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}