import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Intelligence Dashboard</h1>
          <p className="text-slate-400 mt-1">Real-time anomaly detection and investigation prioritization.</p>
        </div>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Projects", value: "1,248", color: "text-blue-400" },
          { label: "Critical Risk", value: "42", color: "text-rose-400" },
          { label: "Open Investigations", value: "18", color: "text-amber-400" },
          { label: "Avg Risk Score", value: "34.2", color: "text-indigo-400" }
        ].map((metric, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className={`w-16 h-16 ${metric.color}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg>
            </div>
            <p className="text-sm font-medium text-slate-400">{metric.label}</p>
            <p className={`text-4xl font-bold mt-2 ${metric.color}`}>{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk Queue Snippet */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Top Critical Projects</h2>
            <Link href="/projects" className="text-sm text-blue-400 hover:text-blue-300">View Queue &rarr;</Link>
          </div>
          <div className="space-y-4">
            {[
              { id: "DEMO-HIGH-001", name: "Road Construction in Pune", score: 87, reason: "Financial/Progress Mismatch" },
              { id: "PRJ-00821", name: "Water Supply in Nagpur", score: 81, reason: "Contractor Concentration" },
              { id: "PRJ-00442", name: "Hospital Renovation", score: 78, reason: "Cost Anomaly" },
            ].map((prj, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-400">{prj.id}</span>
                    <span className="font-semibold text-slate-200">{prj.name}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{prj.reason}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-rose-400">{prj.score}</div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-rose-500">Critical</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Alerts Panel */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
           <h2 className="text-xl font-bold mb-6">System Intelligence</h2>
           <div className="space-y-4">
             <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
               <h3 className="font-semibold text-indigo-400 text-sm">Cluster Detected</h3>
               <p className="text-sm text-slate-300 mt-1">3 new suspicious projects clustered in Surat district.</p>
             </div>
             <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
               <h3 className="font-semibold text-amber-400 text-sm">Data Quality Warning</h3>
               <p className="text-sm text-slate-300 mt-1">42 projects are missing spatial coordinates.</p>
             </div>
             <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
               <h3 className="font-semibold text-emerald-400 text-sm">Ingestion Complete</h3>
               <p className="text-sm text-slate-300 mt-1">Successfully synced 1,000 demo records.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
