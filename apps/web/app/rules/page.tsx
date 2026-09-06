"use client";
import { useState } from 'react';

const initialRules = [
  { code: "FIN-001", name: "Expenditure exceeds sanctioned amount", category: "FINANCIAL", weight: 15.0, enabled: true },
  { code: "FIN-002", name: "Project cost significantly above peer median", category: "FINANCIAL", weight: 18.0, enabled: true },
  { code: "FIN-005", name: "Financial progress greater than physical", category: "PROGRESS", weight: 16.0, enabled: true },
  { code: "TIME-002", name: "Project delayed significantly beyond expected", category: "TIMELINE", weight: 12.0, enabled: true },
  { code: "CON-001", name: "Unusual contractor concentration in district", category: "CONTRACTOR", weight: 14.0, enabled: true },
  { code: "GEO-001", name: "Multiple similar projects within small radius", category: "GEOGRAPHIC", weight: 12.0, enabled: true },
  { code: "EVI-001", name: "Missing Measurement Book", category: "EVIDENCE", weight: 8.0, enabled: true },
  { code: "EVI-002", name: "Missing geotagged site photos", category: "EVIDENCE", weight: 6.0, enabled: false },
];

const categoryColor: Record<string, string> = {
  FINANCIAL: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  PROGRESS: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  TIMELINE: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  CONTRACTOR: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  GEOGRAPHIC: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  EVIDENCE: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export default function RuleManagement() {
  const [rules, setRules] = useState(initialRules);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const toggleRule = (index: number) => {
    const newRules = [...rules];
    newRules[index].enabled = !newRules[index].enabled;
    setRules(newRules);
  };

  const categories = ["ALL", ...Array.from(new Set(initialRules.map(r => r.category)))];
  const filtered = activeFilter === "ALL" ? rules : rules.filter(r => r.category === activeFilter);
  const enabledCount = rules.filter(r => r.enabled).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Risk Rule Engine</h1>
          <p className="text-slate-400 mt-1 text-sm hidden sm:block">Manage anomaly detection rules, thresholds, and score weights.</p>
          <p className="text-xs text-slate-500 mt-1">
            <span className="text-emerald-400 font-semibold">{enabledCount}</span> of {rules.length} rules active
          </p>
        </div>
        <button className="self-start sm:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors whitespace-nowrap">
          + Create Rule
        </button>
      </header>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg border whitespace-nowrap transition-all capitalize ${
              activeFilter === cat
                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                : "bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Rule Cards Grid — 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {filtered.map((rule, i) => {
          const catClass = categoryColor[rule.category] || "bg-slate-500/10 text-slate-400 border-slate-500/20";
          return (
            <div key={i} className={`bg-slate-900/40 border rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all ${rule.enabled ? "border-slate-800" : "border-slate-800/40 opacity-60"}`}>
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${catClass}`}>
                  {rule.category}
                </span>
                {/* Toggle Switch */}
                <button
                  onClick={() => toggleRule(rules.indexOf(rule))}
                  className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${rule.enabled ? "bg-emerald-500/30 border border-emerald-500/50" : "bg-slate-700"}`}
                  aria-label={rule.enabled ? "Disable rule" : "Enable rule"}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${rule.enabled ? "bg-emerald-400 left-5" : "bg-slate-400 left-0.5"}`}></div>
                </button>
              </div>

              <div className="mb-3 sm:mb-4">
                <span className="font-mono text-[10px] text-slate-500 block mb-1">{rule.code}</span>
                <h3 className="font-semibold text-slate-200 text-sm leading-snug">{rule.name}</h3>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Score Weight</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono font-bold text-slate-200">{rule.weight.toFixed(1)}</span>
                    <span className="text-[10px] text-slate-500">pts</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-semibold ${rule.enabled ? "text-emerald-400" : "text-slate-500"}`}>
                    {rule.enabled ? "ACTIVE" : "DISABLED"}
                  </span>
                  <button className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded bg-slate-800 hover:bg-slate-700">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Footer */}
      <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/15 flex items-start gap-3">
        <span className="text-lg">ℹ️</span>
        <p className="text-xs text-slate-400">
          Score weights determine how much each rule contributes to the final composite risk score (0–100). Disabling a rule removes it from all future scoring runs but preserves historical data.
        </p>
      </div>
    </div>
  );
}
