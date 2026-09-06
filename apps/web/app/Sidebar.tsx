"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Investigation Queue", href: "/projects" },
    { name: "Map Intelligence", href: "/map" },
    { name: "Contractors", href: "/contractors" },
    { name: "Analytics", href: "/analytics" },
    { name: "Rule Engine", href: "/rules" },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          ProjectGuard
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">India Intelligence</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/50"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300">
            A
          </div>
          <div className="text-sm">
            <p className="font-medium text-slate-200">Admin User</p>
            <p className="text-xs text-slate-500">Superadmin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
