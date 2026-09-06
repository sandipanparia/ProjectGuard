"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function InvestigationQueue() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const allProjects = [
    { id: "DEMO-HIGH-001", name: "Road Construction in Pune", amount: "₹45,00,000", score: 87, level: "CRITICAL", completeness: "72%", status: "UNREVIEWED" },
    { id: "PRJ-00821", name: "Water Supply in Nagpur", amount: "₹82,50,000", score: 81, level: "CRITICAL", completeness: "85%", status: "IN_REVIEW" },
    { id: "PRJ-00442", name: "Hospital Renovation", amount: "₹1,20,00,000", score: 78, level: "CRITICAL", completeness: "90%", status: "EVIDENCE_REQUESTED" },
    { id: "DEMO-MISSING-001", name: "School Building", amount: "UNKNOWN", score: 56, level: "HIGH", completeness: "40%", status: "UNREVIEWED" },
    { id: "PRJ-00912", name: "Street Lighting", amount: "₹12,00,000", score: 48, level: "MODERATE", completeness: "95%", status: "UNREVIEWED" },
    { id: "DEMO-CLEAN-001", name: "Water Supply in Surat", amount: "₹35,00,000", score: 12, level: "LOW", completeness: "100%", status: "UNREVIEWED" },
  ];

  const projects = allProjects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investigation Queue</h1>
          <p className="text-slate-400 mt-1">Review and prioritize flagged projects based on AI-assisted risk scoring.</p>
        </div>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
            Filters
          </button>
        </div>
      </header>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400">
            <tr>
              <th className="px-6 py-4 font-medium">Project ID</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Sanction Amount</th>
              <th className="px-6 py-4 font-medium">Data Completeness</th>
              <th className="px-6 py-4 font-medium">Investigation Risk</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {projects.map((p, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-slate-300">{p.id}</td>
                <td className="px-6 py-4 font-medium text-slate-200">{p.name}</td>
                <td className="px-6 py-4 text-slate-400">{p.amount}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: p.completeness }}></div>
                    </div>
                    <span className="text-xs text-slate-400">{p.completeness}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${p.score >= 75 ? 'text-rose-400' : p.score >= 50 ? 'text-amber-400' : p.score >= 25 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                      {p.score}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider ${
                      p.level === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      p.level === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      p.level === 'MODERATE' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {p.level}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">{p.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/projects/${p.id}`} className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                    Review &rarr;
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
