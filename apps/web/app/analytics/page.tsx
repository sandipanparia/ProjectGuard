export default function AnalyticsDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Analytics</h1>
          <p className="text-slate-400 mt-1">Macro-level intelligence, anomaly distributions, and structural risks.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Risk by Category */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Anomalies by Category</h2>
          <div className="space-y-4">
             {[
               { label: "Financial / Cost", count: 342, percentage: "45%" },
               { label: "Progress Mismatch", count: 184, percentage: "24%" },
               { label: "Timeline / Delays", count: 112, percentage: "15%" },
               { label: "Contractor Concentration", count: 86, percentage: "11%" },
               { label: "Geographic / Duplication", count: 38, percentage: "5%" },
             ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="text-slate-400">{item.count}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: item.percentage }}></div>
                  </div>
                </div>
             ))}
          </div>
        </div>

        {/* Risk by State */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">High Risk Concentration (State)</h2>
          <div className="space-y-4">
             {[
               { label: "Maharashtra", count: 145, percentage: "35%" },
               { label: "Karnataka", count: 98, percentage: "25%" },
               { label: "Delhi", count: 64, percentage: "18%" },
               { label: "Tamil Nadu", count: 52, percentage: "12%" },
               { label: "Gujarat", count: 28, percentage: "10%" },
             ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="text-slate-400">{item.count}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500" style={{ width: item.percentage }}></div>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </div>
      
      {/* Missing Evidence Tracking */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
         <h2 className="text-xl font-bold mb-2">Evidence Deficit Tracking</h2>
         <p className="text-sm text-slate-400 mb-6">Percentage of active projects missing mandatory compliance documents.</p>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { doc: "Measurement Book", deficit: "24%", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10" },
              { doc: "Geotagged Photos", deficit: "12%", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10" },
              { doc: "Payment Receipts", deficit: "8%", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10" },
              { doc: "BOQ Line Items", deficit: "41%", color: "text-rose-400", border: "border-rose-500/20", bg: "bg-rose-500/10" },
            ].map((item, i) => (
               <div key={i} className={`p-4 rounded-xl border ${item.border} ${item.bg}`}>
                 <p className="text-sm text-slate-300 mb-1">{item.doc}</p>
                 <p className={`text-3xl font-bold ${item.color}`}>{item.deficit}</p>
                 <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">Missing</p>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
