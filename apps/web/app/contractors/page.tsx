export default function ContractorAnalysis() {
  const contractors = [
    { name: "ABC Builders Pvt Ltd", totalProjects: 14, totalValue: "₹42,50,00,000", avgRisk: 62, highRiskCount: 3, delayed: 4 },
    { name: "XYZ Infrastructure", totalProjects: 8, totalValue: "₹18,20,00,000", avgRisk: 81, highRiskCount: 5, delayed: 6 },
    { name: "National Roadways Corp", totalProjects: 32, totalValue: "₹140,00,00,000", avgRisk: 24, highRiskCount: 1, delayed: 2 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contractor Analysis</h1>
          <p className="text-slate-400 mt-1">Review entity execution patterns and associated project risks.</p>
        </div>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Search contractors..." 
            className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </header>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400">
            <tr>
              <th className="px-6 py-4 font-medium">Contractor Name</th>
              <th className="px-6 py-4 font-medium">Total Projects</th>
              <th className="px-6 py-4 font-medium">Total Value</th>
              <th className="px-6 py-4 font-medium">Avg Risk Score</th>
              <th className="px-6 py-4 font-medium">High/Critical Risk</th>
              <th className="px-6 py-4 font-medium">Delayed Projects</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {contractors.map((c, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{c.name}</td>
                <td className="px-6 py-4 text-slate-300">{c.totalProjects}</td>
                <td className="px-6 py-4 text-slate-400 font-mono">{c.totalValue}</td>
                <td className="px-6 py-4">
                  <span className={`font-bold ${c.avgRisk >= 75 ? 'text-rose-400' : c.avgRisk >= 50 ? 'text-amber-400' : c.avgRisk >= 25 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                    {c.avgRisk}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-300">
                   {c.highRiskCount > 0 ? (
                      <span className="px-2 py-1 bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/20">{c.highRiskCount} projects</span>
                   ) : (
                      <span className="text-slate-500">None</span>
                   )}
                </td>
                <td className="px-6 py-4 text-slate-300">{c.delayed}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                    View Profile &rarr;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
