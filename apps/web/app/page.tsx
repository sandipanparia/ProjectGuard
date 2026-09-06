"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const metrics = [
  { label: "Total Projects", value: "1,248", delta: "+12 this week", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/5",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
  { label: "Critical Risk", value: "42", delta: "+3 since yesterday", color: "text-rose-400", border: "border-rose-500/20", bg: "bg-rose-500/5",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
  { label: "Open Investigations", value: "18", delta: "4 pending review", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/5",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
  { label: "Avg Risk Score", value: "34.2", delta: "↓ 1.8 improved", color: "text-indigo-400", border: "border-indigo-500/20", bg: "bg-indigo-500/5",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
];

const criticalProjects = [
  { id: "DEMO-HIGH-001", name: "Road Construction in Pune", district: "Pune, Maharashtra", score: 87, status: "CRITICAL", flags: ["Financial Mismatch", "Cluster"], amount: "₹45,00,000" },
  { id: "PRJ-00821", name: "Water Supply Pipeline Nagpur", district: "Nagpur, Maharashtra", score: 81, status: "CRITICAL", flags: ["Contractor Concentration"], amount: "₹1,20,00,000" },
  { id: "PRJ-00442", name: "Primary Health Centre Renovation", district: "Bellary, Karnataka", score: 78, status: "HIGH", flags: ["Cost Anomaly", "Delayed"], amount: "₹38,00,000" },
  { id: "PRJ-01105", name: "Village Road Paving - Phase II", district: "Nashik, Maharashtra", score: 72, status: "HIGH", flags: ["Geo Cluster"], amount: "₹22,50,000" },
];

const alerts = [
  { type: "cluster", title: "Cluster Detected", message: "3 new suspicious projects clustered within 2km in Surat district.", time: "Just now" },
  { type: "warning", title: "Data Quality Warning", message: "42 projects are missing spatial coordinates.", time: "8 min ago" },
  { type: "success", title: "Ingestion Complete", message: "Successfully synced 1,000 demo MPLADS records.", time: "1 hr ago" },
];

const ruleActivity = [
  { rule: "Financial Progress Mismatch", triggered: 342, severity: "high" },
  { rule: "Suspicious Contractor Cluster", triggered: 128, severity: "critical" },
  { rule: "Timeline Overrun > 6 Months", triggered: 94, severity: "medium" },
  { rule: "Abnormal Unit Cost", triggered: 76, severity: "high" },
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const scoreColors: Record<string, string> = { CRITICAL: "text-rose-400", HIGH: "text-amber-400" };
  const statusBg: Record<string, string> = {
    CRITICAL: "bg-rose-500/10 border-rose-500/30 text-rose-400",
    HIGH: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  };
  const alertConfig: Record<string, { border: string; dot: string }> = {
    cluster: { border: "border-indigo-500/20", dot: "bg-indigo-400" },
    warning: { border: "border-amber-500/20", dot: "bg-amber-400" },
    success: { border: "border-emerald-500/20", dot: "bg-emerald-400" },
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-8">
      {/* Header */}
      <header className={`transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 relative">
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></div>
              </div>
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-widest">Live · Updated just now</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight gradient-text-blue">Intelligence Dashboard</h1>
            <p className="text-slate-400 mt-1 text-sm hidden sm:block">Real-time anomaly detection and investigation prioritization for Indian public development projects.</p>
          </div>
          <Link href="/projects" className="self-start sm:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg text-sm font-semibold whitespace-nowrap">
            Open Queue →
          </Link>
        </div>
      </header>

      {/* Metrics Row — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {metrics.map((metric, i) => (
          <div key={i} className={`card-hover bg-slate-900/50 border ${metric.border} ${metric.bg} rounded-xl sm:rounded-2xl p-3 sm:p-5 backdrop-blur-sm`}>
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${metric.bg} ${metric.color} border ${metric.border} flex items-center justify-center mb-3`}>
              {metric.icon}
            </div>
            <p className="text-xs font-medium text-slate-400">{metric.label}</p>
            <p className={`text-2xl sm:text-4xl font-bold mt-1 ${metric.color} tabular-nums`}>{metric.value}</p>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-1 sm:mt-2">{metric.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Critical Projects Queue */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl sm:rounded-2xl overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold">Top Critical Projects</h2>
              <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">Ranked by composite risk score</p>
            </div>
            <Link href="/projects" className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors whitespace-nowrap">
              View All →
            </Link>
          </div>
          <div className="divide-y divide-slate-800/50">
            {criticalProjects.map((prj, i) => (
              <Link key={i} href={`/projects/${prj.id}`}
                className="flex items-center justify-between p-3 sm:p-5 hover:bg-slate-800/30 transition-colors group">
                <div className="flex-1 min-w-0 pr-3">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-[10px] sm:text-xs text-slate-500 hidden sm:inline">{prj.id}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border ${statusBg[prj.status]}`}>
                      {prj.status}
                    </span>
                  </div>
                  <p className="font-semibold text-sm sm:text-base text-slate-100 group-hover:text-white transition-colors truncate">{prj.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{prj.district}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {prj.flags.map((flag, fi) => (
                      <span key={fi} className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {flag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-xl sm:text-2xl font-bold tabular-nums ${scoreColors[prj.status]}`}>{prj.score}</div>
                  <div className="text-[10px] text-slate-500">/ 100</div>
                  <div className="text-xs text-slate-400 mt-0.5 font-medium hidden sm:block">{prj.amount}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Alerts Panel */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-5">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 sm:mb-4">System Intelligence</h2>
            <div className="space-y-2 sm:space-y-3">
              {alerts.map((alert, i) => {
                const cfg = alertConfig[alert.type];
                return (
                  <div key={i} className={`p-3 rounded-xl bg-slate-900 border ${cfg.border}`}>
                    <div className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${cfg.dot}`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <h3 className="font-semibold text-xs text-slate-200">{alert.title}</h3>
                          <span className="text-[10px] text-slate-600 flex-shrink-0">{alert.time}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{alert.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rule Activity */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-5">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 sm:mb-4">Top Triggered Rules</h2>
            <div className="space-y-3">
              {ruleActivity.map((r, i) => {
                const max = ruleActivity[0].triggered;
                const pct = Math.round((r.triggered / max) * 100);
                const barColor = r.severity === "critical" ? "bg-rose-500" : r.severity === "high" ? "bg-amber-500" : "bg-blue-500";
                return (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 truncate pr-2">{r.rule}</span>
                      <span className="text-slate-500 flex-shrink-0">{r.triggered}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${barColor} rounded-full progress-bar`} style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "GIS Map View", desc: "Geospatial clusters", href: "/map", icon: "🗺️" },
          { label: "Contractors DB", desc: "Entity relationships", href: "/contractors", icon: "🏢" },
          { label: "Analytics", desc: "System-wide insights", href: "/analytics", icon: "📊" },
          { label: "Rule Engine", desc: "Manage detection rules", href: "/rules", icon: "⚙️" },
        ].map((action, i) => (
          <Link key={i} href={action.href}
            className="card-hover flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-all group">
            <span className="text-xl sm:text-2xl">{action.icon}</span>
            <div className="min-w-0">
              <p className="font-semibold text-xs sm:text-sm text-slate-200 group-hover:text-white truncate">{action.label}</p>
              <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
