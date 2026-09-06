"use client";
import { useState } from 'react';
import Link from "next/link";

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Financials', 'Evidence', 'Contractor'];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Card */}
      <div className="m-4 sm:m-6 lg:m-8 bg-slate-900/40 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2 py-1 text-[10px] font-mono bg-slate-800 text-slate-300 rounded border border-slate-700">PROJECT</span>
              <span className="font-mono text-slate-400 text-sm">{params.id}</span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded border bg-rose-500/10 text-rose-400 border-rose-500/20">Critical</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-white mb-2">Road Construction in Pune</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
              <span>📍 Pune, Maharashtra</span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span>🏛️ PWD Maharashtra</span>
            </div>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 sm:border-0">
            <div className="text-center">
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mb-0.5">Risk Score</p>
              <div className="flex items-end gap-1 justify-center">
                <span className="text-4xl sm:text-5xl font-bold text-rose-400 leading-none">87</span>
                <span className="text-slate-500 font-medium text-sm mb-1">/ 100</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mb-0.5">Data Complete</p>
              <p className="text-xl font-bold text-slate-300">72%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs — scrollable on mobile */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-slate-800 overflow-x-auto gap-0">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8">
          {/* Left Column: Risk Signals */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h2 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">Why was this project flagged?</h2>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { score: "+18", title: "Cost above comparable projects", desc: "Project cost is 63% above contextual peers (Median: ₹41,00,000).", type: "FINANCIAL", color: "rose" },
                  { score: "+16", title: "Financial ahead of physical progress", desc: "Financial progress (80%) is significantly ahead of physical (40%).", type: "PROGRESS", color: "amber" },
                  { score: "+14", title: "Unusual contractor concentration", desc: "Contractor holds 42% of projects in this district.", type: "CONTRACTOR", color: "yellow" },
                ].map((signal, i) => (
                  <div key={i} className={`p-3 sm:p-5 rounded-xl border flex gap-3 sm:gap-4 items-start
                    ${signal.color === 'rose' ? 'bg-rose-950/10 border-rose-500/20' : signal.color === 'amber' ? 'bg-amber-950/10 border-amber-500/20' : 'bg-yellow-950/10 border-yellow-500/20'}`}>
                    <div className={`font-bold text-lg sm:text-xl w-10 sm:w-12 flex-shrink-0 pt-0.5
                      ${signal.color === 'rose' ? 'text-rose-400' : signal.color === 'amber' ? 'text-amber-400' : 'text-yellow-400'}`}>
                      {signal.score}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-200 text-sm sm:text-lg leading-snug">{signal.title}</h3>
                      <p className="text-slate-400 mt-1 text-xs sm:text-base">{signal.desc}</p>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mt-2 inline-block
                        ${signal.color === 'rose' ? 'bg-rose-500/20 text-rose-400' : signal.color === 'amber' ? 'bg-amber-500/20 text-amber-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {signal.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h2 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">Financial Overview</h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <p className="text-xs sm:text-sm text-slate-400 mb-1">Sanctioned Amount</p>
                  <p className="text-lg sm:text-2xl font-bold">₹67,00,000</p>
                </div>
                <div className="p-3 sm:p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <p className="text-xs sm:text-sm text-slate-400 mb-1">Total Expenditure</p>
                  <p className="text-lg sm:text-2xl font-bold text-amber-400">₹53,60,000</p>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: "Financial Progress", pct: 80, color: "bg-amber-400", textColor: "text-amber-400" },
                  { label: "Physical Progress", pct: 40, color: "bg-blue-500", textColor: "text-blue-400" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                      <span className="text-slate-400">{item.label}</span>
                      <span className={`font-medium ${item.textColor}`}>{item.pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Verification Checklist */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h2 className="text-sm sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                </svg>
                Recommended Actions
              </h2>
              <ul className="space-y-2">
                {["Verify Measurement Book (MB)", "Review BOQ for cost anomalies", "Verify physical execution on site", "Review payment records"].map((task, i) => (
                  <li key={i} className="flex gap-3 text-xs sm:text-sm text-slate-300 bg-slate-800/30 p-2.5 sm:p-3 rounded-lg border border-slate-700/50">
                    <div className="w-4 h-4 rounded border border-slate-600 flex-shrink-0 mt-0.5"></div>
                    {task}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-4 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors">
                Create Investigation Workspace
              </button>
            </div>

            {/* Evidence Status */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h2 className="text-sm sm:text-lg font-bold mb-3 sm:mb-4">Evidence Status</h2>
              <div className="space-y-0 divide-y divide-slate-800">
                {[
                  { label: "Payment Records", value: "Available (3)", ok: true },
                  { label: "Measurement Book", value: "Missing", ok: false },
                  { label: "Geo-tagged Photos", value: "Available (12)", ok: true },
                  { label: "BOQ", value: "Missing", ok: false },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-2.5 text-xs sm:text-sm">
                    <span className="text-slate-400">{item.label}</span>
                    <span className={`font-medium ${item.ok ? "text-emerald-400" : "text-rose-400"}`}>{item.value}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                Request Missing Evidence
              </button>
            </div>

            {/* Back Button */}
            <Link href="/projects" className="block text-center py-2.5 border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-slate-200 rounded-lg text-sm transition-colors">
              ← Back to Queue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
