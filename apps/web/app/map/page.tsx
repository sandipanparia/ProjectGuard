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

const colorMap: Record<string, string> = { critical: "#f43f5e", high: "#f97316", moderate: "#eab308", low: "#22c55e" };
const bgMap: Record<string, string> = {
  critical: "bg-rose-500/10 border-rose-500/30 text-rose-400",
  high: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  moderate: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  low: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
};

export default function MapIntelligence() {
  const [selectedProject, setSelectedProject] = useState<typeof mapProjects[0]>(mapProjects[0]);
  const [filter, setFilter] = useState<string>("all");
  const [mobileTab, setMobileTab] = useState<"map" | "list">("map");

  const filtered = filter === "all" ? mapProjects : mapProjects.filter(p => p.status === filter);

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 3.5rem)" }}>
      {/* Header */}
      <header className="p-3 sm:p-5 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold gradient-text-blue">Map Intelligence</h1>
            <p className="text-xs text-slate-400 hidden sm:block mt-0.5">{mapProjects.length} projects · Geographic clustering analysis</p>
          </div>
          {/* Mobile tab switcher */}
          <div className="flex sm:hidden gap-1 bg-slate-800 rounded-lg p-1">
            <button onClick={() => setMobileTab("map")} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${mobileTab === "map" ? "bg-blue-500/20 text-blue-400" : "text-slate-400"}`}>Map</button>
            <button onClick={() => setMobileTab("list")} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${mobileTab === "list" ? "bg-blue-500/20 text-blue-400" : "text-slate-400"}`}>List</button>
          </div>
        </div>
        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["all", "critical", "high", "moderate", "low"].map((level) => (
            <button key={level} onClick={() => setFilter(level)}
              className={`px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-lg border transition-all capitalize whitespace-nowrap ${
                filter === level ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-slate-800 text-slate-400 border-slate-700"
              }`}>
              {level} {level !== "all" && `(${mapProjects.filter(p => p.status === level).length})`}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* MAP AREA — always shown on desktop, tab-controlled on mobile */}
        <div className={`${mobileTab === "map" ? "flex" : "hidden"} sm:flex flex-1 relative bg-slate-900/30 overflow-hidden flex-col`}>
          {/* Grid background */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* India SVG outline */}
          <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] opacity-20" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60,10 L100,5 L140,12 L160,30 L170,55 L165,80 L155,105 L145,120 L150,140 L140,160 L130,175 L120,185 L115,195 L110,205 L105,215 L100,218 L95,210 L90,198 L85,185 L75,170 L60,155 L50,140 L40,125 L35,105 L30,80 L32,55 L40,35 L60,10Z" stroke="#60a5fa" strokeWidth="1" fill="#1e3a5f" fillOpacity="0.3" />
            <path d="M100,5 L130,2 L150,10 L155,20 L140,12Z" stroke="#60a5fa" strokeWidth="0.8" fill="#1e3a5f" fillOpacity="0.2" />
            <path d="M160,30 L185,25 L190,45 L175,55 L165,50 L170,55Z" stroke="#60a5fa" strokeWidth="0.8" fill="#1e3a5f" fillOpacity="0.2" />
          </svg>

          {/* Project dots */}
          {filtered.map((proj) => (
            <button key={proj.id} onClick={() => { setSelectedProject(proj); setMobileTab("list"); }}
              style={{ left: `${proj.x}%`, top: `${proj.y}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group">
              <div className="relative" title={proj.name}>
                {proj.status === "critical" && (
                  <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: colorMap[proj.status], opacity: 0.4 }}></div>
                )}
                <div className="rounded-full border-2 border-slate-900 shadow-lg transition-transform group-hover:scale-125 cursor-pointer"
                  style={{
                    width: proj.score > 70 ? "16px" : proj.score > 50 ? "12px" : "8px",
                    height: proj.score > 70 ? "16px" : proj.score > 50 ? "12px" : "8px",
                    backgroundColor: colorMap[proj.status],
                  }}>
                </div>
                {selectedProject?.id === proj.id && (
                  <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full border-2 border-white/50 animate-pulse"></div>
                )}
              </div>
            </button>
          ))}

          {/* Legend — compact on mobile */}
          <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 bg-slate-900/95 border border-slate-700 p-3 sm:p-4 rounded-xl shadow-2xl backdrop-blur-md">
            <h3 className="text-[10px] sm:text-xs font-bold mb-2 text-slate-300 uppercase tracking-wider">Risk Level</h3>
            <div className="space-y-1.5 text-xs">
              {[
                { label: "Critical", color: "#f43f5e" },
                { label: "High", color: "#f97316" },
                { label: "Moderate", color: "#eab308" },
                { label: "Low", color: "#22c55e" },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }}></div>
                  <span className="text-slate-400 text-[10px] sm:text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cluster badge */}
          <div className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-indigo-500/10 border border-indigo-500/30 px-2 sm:px-3 py-1.5 rounded-lg">
            <p className="text-[10px] sm:text-xs font-semibold text-indigo-400">🔍 3 Clusters Detected</p>
          </div>
        </div>

        {/* RIGHT PANEL / MOBILE LIST */}
        <div className={`${mobileTab === "list" ? "flex" : "hidden"} sm:flex w-full sm:w-72 lg:w-80 border-l border-slate-800 bg-slate-900/70 flex-col overflow-y-auto`}>
          {/* Selected Project Card */}
          {selectedProject && (
            <div className="p-4 sm:p-5 border-b border-slate-800">
              <p className="font-mono text-[10px] text-slate-500 mb-1">{selectedProject.id}</p>
              <h3 className="font-bold text-slate-100 leading-snug text-sm">{selectedProject.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{selectedProject.district}</p>
              <div className="flex items-center justify-between mt-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${bgMap[selectedProject.status]}`}>
                  {selectedProject.status}
                </span>
                <div className="text-right">
                  <span className="text-xl font-bold text-rose-400">{selectedProject.score}</span>
                  <span className="text-xs text-slate-500"> /100</span>
                </div>
              </div>
              <div className="mt-3 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${selectedProject.score}%`, backgroundColor: colorMap[selectedProject.status] }}></div>
              </div>
              <Link href={`/projects/${selectedProject.id}`}
                className="mt-3 block w-full py-2 bg-blue-600 hover:bg-blue-500 text-center rounded-lg text-sm font-semibold transition-colors">
                Open Full Analysis →
              </Link>
            </div>
          )}

          {/* All Projects List */}
          <div className="p-3 sm:p-4 flex-1">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">
              All Projects ({filtered.length})
            </h3>
            <div className="space-y-2">
              {filtered.map((proj) => (
                <button key={proj.id} onClick={() => setSelectedProject(proj)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedProject?.id === proj.id
                      ? "bg-blue-500/10 border-blue-500/20"
                      : "bg-slate-900 border-slate-800 hover:border-slate-700"
                  }`}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-200 truncate pr-2">{proj.name}</p>
                    <span className="text-sm font-bold flex-shrink-0" style={{ color: colorMap[proj.status] }}>{proj.score}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">{proj.district}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
