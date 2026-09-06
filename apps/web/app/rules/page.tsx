"use client";
import { useState } from 'react';

export default function RuleManagement() {
  const [rules, setRules] = useState([
    { code: "FIN-001", name: "Expenditure exceeds sanctioned amount", category: "FINANCIAL", weight: 15.0, enabled: true },
    { code: "FIN-002", name: "Project cost significantly above peer median", category: "FINANCIAL", weight: 18.0, enabled: true },
    { code: "FIN-005", name: "Financial progress greater than physical", category: "PROGRESS", weight: 16.0, enabled: true },
    { code: "TIME-002", name: "Project delayed significantly beyond expected", category: "TIMELINE", weight: 12.0, enabled: true },
    { code: "CON-001", name: "Unusual contractor concentration in district", category: "CONTRACTOR", weight: 14.0, enabled: true },
    { code: "GEO-001", name: "Multiple similar projects within small radius", category: "GEOGRAPHIC", weight: 12.0, enabled: true },
  ]);

  const toggleRule = (index: number) => {
    const newRules = [...rules];
    newRules[index].enabled = !newRules[index].enabled;
    setRules(newRules);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Rule Engine</h1>
          <p className="text-slate-400 mt-1">Manage anomaly detection rules, thresholds, and score weights.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
          + Create Custom Rule
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rules.map((rule, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 relative group">
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-blue-400 rounded border border-blue-500/20">
                {rule.category}
              </span>
              <div className="flex items-center">
                <div 
                  onClick={() => toggleRule(i)}
                  className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors ${rule.enabled ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-slate-700'}`}>
                  <div className={`w-3 h-3 rounded-full transition-transform ${rule.enabled ? 'bg-emerald-400 translate-x-5' : 'bg-slate-400'}`}></div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="font-mono text-xs text-slate-500 block mb-1">{rule.code}</span>
              <h3 className="font-semibold text-slate-200 leading-snug">{rule.name}</h3>
            </div>
            
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <div>
                 <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Weight</span>
                 <p className="font-mono text-slate-300">{rule.weight.toFixed(1)}</p>
              </div>
              <button className="text-sm text-slate-400 hover:text-white transition-colors">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
