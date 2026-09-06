"use client";
import { useState } from "react";
import Link from "next/link";

const mapProjects = [
  { id: "DEMO-HIGH-001", x: 42, y: 58, name: "Road Construction, Pune", score: 87, status: "critical", district: "Pune, MH" },
  { id: "PRJ-00821", x: 48, y: 45, name: "Water Supply, Nagpur", score: 81, status: "critical", district: "Nagpur, MH" },
  { id: "PRJ-00442", x: 50, y: 72, name: "Health Centre, Bellary", score: 78, status: "high", district: "Bellary, KA" },
  { id: "PRJ-01105", x: 38, y: 52, name: "Village Road, Nashik", score: 72, status: "high", district: "Nashik, MH" },
  { id: "PRJ-02234", x: 30, y: 42, name: "School Building, Surat", score: 65, status: "high", district: "Surat, GJ" },
  { id: "PRJ-00118", x: 60, y: 55, name: "Canal Work, Hyderabad", score: 58, status: "moderate", district: "Hyd, TS" },
  { id: "PRJ-00330", x: 45, y: 82, name: "Road Repair, Mysuru", score: 52, status: "moderate", district: "Mysuru, KA" },
  { id: "PRJ-00511", x: 68, y: 82, name: "Drainage, Chennai", score: 44, status: "moderate", district: "Chennai, TN" },
  { id: "PRJ-00654", x: 25, y: 30, name: "Dam Work, Jaipur", score: 38, status: "low", district: "Jaipur, RJ" },
  { id: "PRJ-00777", x: 55, y: 28, name: "Park Dev, Agra", score: 22, status: "low", district: "Agra, UP" },
  { id: "PRJ-00899", x: 65, y: 20, name: "Bridge, Patna", score: 18, status: "low", district: "Patna, BR" },
  { id: "PRJ-01001", x: 35, y: 62, name: "Electrification, Aurangabad", score: 71, status: "high", district: "Aurangabad, MH" },
  { id: "PRJ-01200", x: 54, y: 47, name: "Irrigation, Nanded", score: 67, status: "high", district: "Nanded, MH" },
];

const stateStats = [
  { name: "Maharashtra", projects: 312, critical: 14, high: 42, color: "#f43f5e" },
  { name: "Karnataka", projects: 198, critical: 8, high: 28, color: "#f97316" },
  { name: "Gujarat", projects: 145, critical: 5, high: 19, color: "#eab308" },
  { name: "Tamil Nadu", projects: 132, critical: 4, high: 15, color: "#3b82f6" },
  { name: "Telangana", projects: 118, critical: 3, high: 11, color: "#8b5cf6" },
  { name: "Rajasthan", projects: 97, critical: 2, high: 9, color: "#06b6d4" },
  { name: "Uttar Pradesh", projects: 162, critical: 5, high: 22, color: "#10b981" },
  { name: "Bihar", projects: 84, critical: 1, high: 6, color: "#64748b" },
];

const colorMap: Record<string, string> = {
  critical: "#f43f5e",
  high: "#f97316",
  moderate: "#eab308",
  low: "#22c55e",
};

const bgMap: Record<string, string> = {
  critical: "bg-rose-500/10 border-rose-500/30 text-rose-400",
  high: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  moderate: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  low: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
};

export default function MapIntelligence() {
  const [selectedProject, setSelectedProject] = useState<typeof mapProjects[0] | null>(mapProjects[0]);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? mapProjects : mapProjects.filter(p => p.status === filter);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="p-5 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm z-10 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold gradient-text-blue">Map Intelligence</h1>
          <p className="text-xs text-slate-400 mt-0.5">Geospatial clustering · {mapProjects.length} projects visualized</p>
        </div>
        <div className="flex gap-2">
          {["all", "critical", "high", "moderate", "low"].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all capitalize ${
                filter === level
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Map Area */}
        <div className="flex-1 relative bg-slate-900/30 overflow-hidden">
          {/* Grid background */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* India SVG outline (simplified) */}
          <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] opacity-20" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M60,10 L100,5 L140,12 L160,30 L170,55 L165,80 L155,105 L145,120 L150,140 L140,160 L130,175 L120,185 L115,195 L110,205 L105,215 L100,218 L95,210 L90,198 L85,185 L75,170 L60,155 L50,140 L40,125 L35,105 L30,80 L32,55 L40,35 L60,10Z"
              stroke="#60a5fa"
              strokeWidth="1"
              fill="#1e3a5f"
              fillOpacity="0.3"
            />
            {/* Kashmir approximation */}
            <path d="M100,5 L130,2 L150,10 L155,20 L140,12Z" stroke="#60a5fa" strokeWidth="0.8" fill="#1e3a5f" fillOpacity="0.2" />
            {/* Northeast */}
            <path d="M160,30 L185,25 L190,45 L175,55 L165,50 L170,55Z" stroke="#60a5fa" strokeWidth="0.8" fill="#1e3a5f" fillOpacity="0.2" />
          </svg>

          {/* Project dots */}
          {filtered.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              style={{ left: `${proj.x}%`, top: `${proj.y}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group"
            >
              <div
                className="relative"
                title={proj.name}
              >
                {proj.status === "critical" && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ backgroundColor: colorMap[proj.status], opacity: 0.4 }}
                  ></div>
                )}
                <div
                  className="rounded-full border-2 border-slate-900 shadow-lg transition-transform group-hover:scale-125 cursor-pointer"
                  style={{
                    width: proj.score > 70 ? "16px" : proj.score > 50 ? "12px" : "8px",
                    height: proj.score > 70 ? "16px" : proj.score > 50 ? "12px" : "8px",
                    backgroundColor: colorMap[proj.status],
                  }}
                ></div>
                {selectedProject?.id === proj.id && (
                  <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full border-2 border-white/50 animate-pulse"></div>
                )}
              </div>
            </button>
          ))}

          {/* Legend */}
          <div className="absolute bottom-6 right-6 bg-slate-900/95 border border-slate-700 p-4 rounded-xl shadow-2xl backdrop-blur-md">
            <h3 className="text-xs font-bold mb-3 text-slate-300 uppercase tracking-wider">Risk Level</h3>
            <div className="space-y-2 text-xs">
              {[
                { label: "Critical", color: "#f43f5e", count: mapProjects.filter(p=>p.status==="critical").length },
                { label: "High", color: "#f97316", count: mapProjects.filter(p=>p.status==="high").length },
                { label: "Moderate", color: "#eab308", count: mapProjects.filter(p=>p.status==="moderate").length },
                { label: "Low", color: "#22c55e", count: mapProjects.filter(p=>p.status==="low").length },
              ].map(({ label, color, count }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }}></div>
                  <span className="text-slate-400">{label}</span>
                  <span className="ml-auto text-slate-500 font-medium">({count})</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-700">
              <p className="text-[10px] text-slate-500">Dot size ∝ risk score</p>
            </div>
          </div>

          {/* Cluster indicator */}
          <div className="absolute top-6 right-6 bg-indigo-500/10 border border-indigo-500/30 px-3 py-2 rounded-lg">
            <p className="text-xs font-semibold text-indigo-400">🔍 3 Geographic Clusters Detected</p>
          </div>
        </div>

        {/* Right Panel - Selected Project + State Stats */}
        <div className="w-80 border-l border-slate-800 bg-slate-900/70 flex flex-col overflow-y-auto">
          {/* Selected Project Card */}
          {selectedProject && (
            <div className="p-5 border-b border-slate-800">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-mono text-xs text-slate-500 mb-1">{selectedProject.id}</p>
                  <h3 className="font-bold text-slate-100 leading-snug">{selectedProject.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{selectedProject.district}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-rose-400 tabular-nums">{selectedProject.score}</div>
                  <div className="text-[10px] text-slate-500">Risk Score</div>
                </div>
              </div>

              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${bgMap[selectedProject.status]}`}>
                {selectedProject.status}
              </span>

              <div className="mt-4">
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${selectedProject.score}%`,
                      backgroundColor: colorMap[selectedProject.status],
                    }}
                  ></div>
                </div>
              </div>

              <Link
                href={`/projects/${selectedProject.id}`}
                className="mt-4 block w-full py-2 bg-blue-600 hover:bg-blue-500 text-center rounded-lg text-sm font-semibold transition-colors"
              >
                Open Full Analysis →
              </Link>
            </div>
          )}

          {/* State-wise Stats */}
          <div className="p-5 flex-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">High-Risk by State</h3>
            <div className="space-y-3">
              {stateStats.map((state) => (
                <div key={state.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">{state.name}</span>
                    <span className="text-slate-500">{state.critical} critical</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${((state.critical + state.high) / state.projects) * 100 * 3}%`,
                        backgroundColor: state.color,
                      }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-600 mt-0.5">{state.projects} total projects</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
