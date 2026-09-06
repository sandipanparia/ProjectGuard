export default function ContractorAnalysis() {
  const contractors = [
    { name: "M/S BuildFast India", reg: "MH-2018-CON-00421", totalProjects: 12, totalValue: "₹4,85,00,000", avgRisk: 74, highRiskCount: 5, delayed: 3, states: 3 },
    { name: "ABC Builders Pvt Ltd", reg: "MH-2016-CON-00218", totalProjects: 14, totalValue: "₹42,50,00,000", avgRisk: 62, highRiskCount: 3, delayed: 4, states: 2 },
    { name: "XYZ Infrastructure", reg: "KA-2015-CON-00345", totalProjects: 8, totalValue: "₹18,20,00,000", avgRisk: 81, highRiskCount: 5, delayed: 6, states: 1 },
    { name: "National Roadways Corp", reg: "DL-2012-CON-00112", totalProjects: 32, totalValue: "₹140,00,00,000", avgRisk: 24, highRiskCount: 1, delayed: 2, states: 5 },
    { name: "Surat Construction Group", reg: "GJ-2017-CON-00887", totalProjects: 7, totalValue: "₹3,28,00,000", avgRisk: 58, highRiskCount: 2, delayed: 1, states: 1 },
  ];

  const riskColor = (r: number) => r >= 75 ? "text-rose-400" : r >= 50 ? "text-amber-400" : r >= 25 ? "text-yellow-400" : "text-emerald-400";
  const riskBg = (r: number) => r >= 75 ? "bg-rose-500/10 border-rose-500/20" : r >= 50 ? "bg-amber-500/10 border-amber-500/20" : r >= 25 ? "bg-yellow-500/10 border-yellow-500/20" : "bg-emerald-500/10 border-emerald-500/20";

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Contractor Analysis</h1>
          <p className="text-slate-400 mt-1 text-sm hidden sm:block">Review entity execution patterns and associated project risks.</p>
        </div>
        <input
          type="text"
          placeholder="Search contractors..."
          className="sm:w-64 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-blue-500 placeholder-slate-500"
        />
      </header>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Total Contractors", value: contractors.length, color: "text-blue-400" },
          { label: "High Risk Entities", value: contractors.filter(c => c.avgRisk >= 50).length, color: "text-rose-400" },
          { label: "Total Projects", value: contractors.reduce((a, c) => a + c.totalProjects, 0), color: "text-amber-400" },
        ].map((s, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 sm:p-4 text-center">
            <p className={`text-xl sm:text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400">
            <tr>
              <th className="px-6 py-4 font-medium">Contractor</th>
              <th className="px-6 py-4 font-medium">Projects</th>
              <th className="px-6 py-4 font-medium">Total Value</th>
              <th className="px-6 py-4 font-medium">Avg Risk</th>
              <th className="px-6 py-4 font-medium">High/Critical</th>
              <th className="px-6 py-4 font-medium">Delayed</th>
              <th className="px-6 py-4 font-medium">States</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {contractors.map((c, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-200">{c.name}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{c.reg}</p>
                </td>
                <td className="px-6 py-4 text-slate-300">{c.totalProjects}</td>
                <td className="px-6 py-4 text-slate-400 font-mono text-xs">{c.totalValue}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-lg ${riskColor(c.avgRisk)}`}>{c.avgRisk}</span>
                    <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${c.avgRisk >= 75 ? "bg-rose-500" : c.avgRisk >= 50 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${c.avgRisk}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {c.highRiskCount > 0 ? (
                    <span className="px-2 py-1 bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/20 text-xs font-medium">{c.highRiskCount} projects</span>
                  ) : (
                    <span className="text-slate-500 text-sm">None</span>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-300">{c.delayed}</td>
                <td className="px-6 py-4 text-slate-300">{c.states}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-400 hover:text-blue-300 font-medium text-sm">View →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE + TABLET CARDS */}
      <div className="lg:hidden space-y-3">
        {contractors.map((c, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <p className="font-semibold text-slate-100 truncate">{c.name}</p>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{c.reg}</p>
              </div>
              <div className={`flex-shrink-0 text-center px-3 py-1.5 rounded-lg border ${riskBg(c.avgRisk)}`}>
                <p className={`text-xl font-bold ${riskColor(c.avgRisk)}`}>{c.avgRisk}</p>
                <p className="text-[10px] text-slate-500">Avg Risk</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800">
              <div className="text-center">
                <p className="text-base font-bold text-slate-200">{c.totalProjects}</p>
                <p className="text-[10px] text-slate-500">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-rose-400">{c.highRiskCount}</p>
                <p className="text-[10px] text-slate-500">High Risk</p>
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-amber-400">{c.delayed}</p>
                <p className="text-[10px] text-slate-500">Delayed</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">{c.totalValue}</span>
              <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">View Profile →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
