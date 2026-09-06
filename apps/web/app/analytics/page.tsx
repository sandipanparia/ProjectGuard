export default function AnalyticsDashboard() {
  const categories = [
    { label: "Financial / Cost", count: 342, percentage: 45, color: "bg-rose-500" },
    { label: "Progress Mismatch", count: 184, percentage: 24, color: "bg-amber-500" },
    { label: "Timeline / Delays", count: 112, percentage: 15, color: "bg-yellow-500" },
    { label: "Contractor Concentration", count: 86, percentage: 11, color: "bg-blue-500" },
    { label: "Geographic / Duplication", count: 38, percentage: 5, color: "bg-indigo-500" },
  ];

  const states = [
    { label: "Maharashtra", count: 145, percentage: 35, color: "bg-rose-500" },
    { label: "Karnataka", count: 98, percentage: 25, color: "bg-amber-500" },
    { label: "Delhi", count: 64, percentage: 18, color: "bg-yellow-500" },
    { label: "Tamil Nadu", count: 52, percentage: 12, color: "bg-blue-500" },
    { label: "Gujarat", count: 28, percentage: 10, color: "bg-indigo-500" },
  ];

  const evidence = [
    { doc: "BOQ Line Items", deficit: "41%", color: "text-rose-400", border: "border-rose-500/20", bg: "bg-rose-500/10" },
    { doc: "Measurement Book", deficit: "24%", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10" },
    { doc: "Geotagged Photos", deficit: "12%", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10" },
    { doc: "Payment Receipts", deficit: "8%", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10" },
  ];

  const summaryStats = [
    { label: "Total Projects", value: "1,248", color: "text-blue-400" },
    { label: "Critical Risk", value: "42", color: "text-rose-400" },
    { label: "States Covered", value: "28", color: "text-indigo-400" },
    { label: "Avg Risk Score", value: "34.2", color: "text-amber-400" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">System Analytics</h1>
        <p className="text-slate-400 mt-1 text-sm hidden sm:block">Macro-level intelligence, anomaly distributions, and structural risks.</p>
      </header>

      {/* Summary Stats — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {summaryStats.map((s, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 sm:p-4 text-center">
            <p className={`text-2xl sm:text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row — stacks on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Anomalies by Category */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">Anomalies by Category</h2>
          <div className="space-y-3 sm:space-y-4">
            {categories.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span className="text-slate-300 truncate pr-2">{item.label}</span>
                  <span className="text-slate-400 flex-shrink-0 font-medium">{item.count}</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${item.percentage}%` }}></div>
                </div>
                <p className="text-[10px] text-slate-600 mt-0.5 text-right">{item.percentage}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk by State */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">High Risk by State</h2>
          <div className="space-y-3 sm:space-y-4">
            {states.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="text-slate-400 font-medium">{item.count} flagged</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${item.percentage * 2.5}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Evidence Deficit */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h2 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">Evidence Deficit Tracking</h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6">Percentage of active projects missing mandatory compliance documents.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          {evidence.map((item, i) => (
            <div key={i} className={`p-3 sm:p-4 rounded-xl border ${item.border} ${item.bg}`}>
              <p className="text-xs sm:text-sm text-slate-300 mb-1 leading-tight">{item.doc}</p>
              <p className={`text-2xl sm:text-3xl font-bold ${item.color}`}>{item.deficit}</p>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">Missing</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Trend Note */}
      <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
        <div className="flex items-start gap-3">
          <span className="text-xl">📊</span>
          <div>
            <h3 className="font-semibold text-indigo-400 text-sm">Platform Insight</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Maharashtra accounts for the highest anomaly density — primarily driven by contractor concentration in the Pune-Nashik corridor. Cross-district deduplication analysis suggests up to 12% project duplication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
