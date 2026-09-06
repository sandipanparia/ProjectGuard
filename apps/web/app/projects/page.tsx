"use client";
import { useState } from 'react';
import Link from 'next/link';

const allProjects = [
  { id: "DEMO-HIGH-001", name: "Road Construction in Pune", district: "Pune, MH", amount: "₹45,00,000", score: 87, level: "CRITICAL", completeness: "72%", status: "UNREVIEWED" },
  { id: "PRJ-00821", name: "Water Supply in Nagpur", district: "Nagpur, MH", amount: "₹82,50,000", score: 81, level: "CRITICAL", completeness: "85%", status: "IN_REVIEW" },
  { id: "PRJ-00442", name: "Hospital Renovation", district: "Bellary, KA", amount: "₹1,20,00,000", score: 78, level: "CRITICAL", completeness: "90%", status: "EVIDENCE_REQUESTED" },
  { id: "DEMO-MISSING-001", name: "School Building", district: "Nashik, MH", amount: "UNKNOWN", score: 56, level: "HIGH", completeness: "40%", status: "UNREVIEWED" },
  { id: "PRJ-00912", name: "Street Lighting", district: "Surat, GJ", amount: "₹12,00,000", score: 48, level: "MODERATE", completeness: "95%", status: "UNREVIEWED" },
  { id: "DEMO-CLEAN-001", name: "Water Supply in Surat", district: "Surat, GJ", amount: "₹35,00,000", score: 12, level: "LOW", completeness: "100%", status: "UNREVIEWED" },
];

const levelColors: Record<string, string> = {
  CRITICAL: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  HIGH: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  MODERATE: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  LOW: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};
const scoreColor = (s: number) => s >= 75 ? "text-rose-400" : s >= 50 ? "text-amber-400" : s >= 25 ? "text-yellow-400" : "text-emerald-400";

export default function InvestigationQueue() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("ALL");

  const projects = allProjects.filter(p =>
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     p.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterLevel === "ALL" || p.level === filterLevel)
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Investigation Queue</h1>
        <p className="text-slate-400 mt-1 text-sm hidden sm:block">Review and prioritize flagged projects based on AI-assisted risk scoring.</p>
      </header>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search projects or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-blue-500 placeholder-slate-500"
        />
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "CRITICAL", "HIGH", "MODERATE", "LOW"].map(lvl => (
            <button key={lvl} onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-2 text-xs font-bold rounded-lg border whitespace-nowrap transition-all ${
                filterLevel === lvl
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200"
              }`}>
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* DESKTOP TABLE — hidden on mobile */}
      <div className="hidden md:block bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400">
            <tr>
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Completeness</th>
              <th className="px-6 py-4 font-medium">Risk</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {projects.map((p, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-mono text-xs text-slate-500 mb-0.5">{p.id}</p>
                  <p className="font-medium text-slate-200">{p.name}</p>
                </td>
                <td className="px-6 py-4 text-slate-400 text-sm">{p.district}</td>
                <td className="px-6 py-4 text-slate-400 font-mono text-sm">{p.amount}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: p.completeness }}></div>
                    </div>
                    <span className="text-xs text-slate-400">{p.completeness}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${scoreColor(p.score)}`}>{p.score}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider border ${levelColors[p.level]}`}>
                      {p.level}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded whitespace-nowrap">{p.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/projects/${p.id}`} className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                    Review →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS — shown only on mobile */}
      <div className="md:hidden space-y-3">
        {projects.map((p, i) => (
          <Link key={i} href={`/projects/${p.id}`}
            className="block bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all active:scale-[0.99]">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0">
                <p className="font-mono text-[10px] text-slate-500 mb-0.5">{p.id}</p>
                <p className="font-semibold text-slate-100 text-sm leading-snug">{p.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{p.district}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-2xl font-bold tabular-nums ${scoreColor(p.score)}`}>{p.score}</p>
                <p className="text-[10px] text-slate-500">/100</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
              <div className="flex gap-2 flex-wrap">
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${levelColors[p.level]}`}>
                  {p.level}
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{p.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: p.completeness }}></div>
                </div>
                <span className="text-[10px] text-slate-500">{p.completeness}</span>
              </div>
            </div>
          </Link>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p className="text-lg">No projects found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-600 text-center">{projects.length} project{projects.length !== 1 ? "s" : ""} shown</p>
    </div>
  );
}
