"use client";
import { useState } from 'react';

export default function MapIntelligence() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // In a real app, this would use react-map-gl with maplibre-gl
  return (
    <div className="h-screen flex flex-col">
      <header className="p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm z-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Map Intelligence</h1>
          <p className="text-sm text-slate-400 mt-1">Geospatial analysis of infrastructure projects and risk clusters.</p>
        </div>
        <div className="flex gap-4">
          <select className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none">
            <option>All States</option>
            <option>Maharashtra</option>
            <option>Karnataka</option>
          </select>
          <select className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none">
            <option>All Risk Levels</option>
            <option>Critical</option>
            <option>High</option>
          </select>
        </div>
      </header>

      <div className="flex-1 relative bg-slate-800/20">
        {/* Placeholder for MapLibre Canvas */}
        <div className="absolute inset-0 flex items-center justify-center text-slate-500 flex-col">
          <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <p>MapLibre GL Canvas Initialization Area</p>
          <p className="text-xs mt-2">Displaying 1,248 project points.</p>
        </div>

        {/* Floating Legend */}
        <div className="absolute bottom-8 right-8 bg-slate-900/90 border border-slate-700 p-4 rounded-xl shadow-xl backdrop-blur-md">
          <h3 className="text-sm font-bold mb-3">Risk Level</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500"></div>Critical (42)</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div>High (156)</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div>Moderate (402)</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div>Low (648)</div>
          </div>
        </div>

        {/* Demo Selected Project Popup */}
        <div className="absolute top-8 left-8 bg-slate-900/95 border border-slate-700 rounded-xl shadow-2xl p-6 w-80 backdrop-blur-md">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-lg leading-tight">Road Construction in Pune</h3>
            <button className="text-slate-500 hover:text-slate-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Project ID</span>
              <span className="font-mono text-slate-200">DEMO-HIGH-001</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Risk Score</span>
              <span className="font-bold text-rose-400">87 (Critical)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Sanctioned</span>
              <span className="font-medium text-slate-200">₹45,00,000</span>
            </div>
          </div>
          
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg mb-6">
             <p className="text-xs text-rose-400 font-medium">Flagged for nearby cluster duplication and significant cost anomaly.</p>
          </div>

          <a href="/projects/DEMO-HIGH-001" className="block w-full py-2 bg-blue-600 hover:bg-blue-500 text-center rounded-lg text-sm font-medium transition-colors">
            Open Full Analysis
          </a>
        </div>
      </div>
    </div>
  );
}
