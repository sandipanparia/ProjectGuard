"use client";
import { useState } from 'react';

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex items-start justify-between bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 text-xs font-mono bg-slate-800 text-slate-300 rounded border border-slate-700">PROJECT</span>
            <span className="font-mono text-slate-400">{params.id}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Road Construction in Pune</h1>
          <p className="text-slate-400 flex items-center gap-2">
            <span>District: Pune</span>
            <span className="text-slate-600">•</span>
            <span>State: Maharashtra</span>
            <span className="text-slate-600">•</span>
            <span>Agency: PWD</span>
          </p>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-1">Data Completeness</p>
            <p className="text-2xl font-bold text-slate-300">72%</p>
          </div>
          <div className="w-px h-12 bg-slate-800"></div>
          <div>
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-1">Investigation Risk</p>
            <div className="flex items-end gap-2 justify-end">
              <span className="text-4xl font-bold text-rose-400 leading-none">87</span>
              <span className="text-slate-500 font-medium">/ 100</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-rose-500 mt-1">Critical</p>
          </div>
        </div>
      </header>

      {/* Tabs Placeholder */}
      <div className="flex border-b border-slate-800 overflow-x-auto">
        {['Overview', 'Financials', 'Progress', 'Timeline', 'Evidence', 'Location', 'Contractor'].map((tab, i) => (
          <button 
            key={i} 
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Risk Signals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Why was this project flagged?</h2>
            
            <div className="space-y-4">
              {[
                { score: "+18", title: "Cost significantly above comparable projects", desc: "Project cost is 63% above contextual peers (Median: ₹41,00,000).", type: "FINANCIAL", color: "rose" },
                { score: "+16", title: "Financial progress ahead of physical progress", desc: "Financial progress (80%) is significantly ahead of physical progress (40%).", type: "PROGRESS", color: "amber" },
                { score: "+14", title: "Unusual contractor concentration", desc: "Contractor holds 42% of projects in this district.", type: "CONTRACTOR", color: "yellow" },
              ].map((signal, i) => (
                <div key={i} className={`p-5 rounded-xl border bg-${signal.color}-950/10 border-${signal.color}-500/20 flex gap-4 items-start cursor-pointer hover:bg-slate-800/50 transition-colors`}>
                  <div className={`font-bold text-xl text-${signal.color}-400 w-12 pt-1`}>{signal.score}</div>
                  <div>
                    <h3 className="font-semibold text-slate-200 text-lg">{signal.title}</h3>
                    <p className="text-slate-400 mt-1">{signal.desc}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-${signal.color}-500/20 text-${signal.color}-400`}>
                        {signal.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Financial Summary */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Financial Overview</h2>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                 <p className="text-sm text-slate-400 mb-1">Sanctioned Amount</p>
                 <p className="text-2xl font-bold">₹67,00,000</p>
               </div>
               <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                 <p className="text-sm text-slate-400 mb-1">Total Expenditure</p>
                 <p className="text-2xl font-bold text-amber-400">₹53,60,000</p>
               </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Financial Progress</span>
                  <span className="font-medium text-amber-400">80%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Physical Progress</span>
                  <span className="font-medium text-blue-400">40%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Next Steps */}
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
              Recommended Verification
            </h2>
            <ul className="space-y-3">
              {[
                "Verify Measurement Book (MB)",
                "Review BOQ for cost anomalies",
                "Verify physical execution on site",
                "Review payment records"
              ].map((task, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300 bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
                  <div className="w-5 h-5 rounded border border-slate-600 flex-shrink-0"></div>
                  {task}
                </li>
              ))}
            </ul>
            <button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors">
              Create Investigation Workspace
            </button>
          </div>
          
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
             <h2 className="text-lg font-bold mb-4">Evidence Status</h2>
             <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Payment Records</span>
                  <span className="text-emerald-400 font-medium">Available (3)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Measurement Book</span>
                  <span className="text-rose-400 font-medium">Missing</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Geo-tagged Photos</span>
                  <span className="text-emerald-400 font-medium">Available (12)</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">BOQ</span>
                  <span className="text-rose-400 font-medium">Missing</span>
                </div>
             </div>
             <button className="w-full mt-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm font-medium transition-colors">
              Request Missing Evidence
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
