import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProjectGuard India",
  description: "Investigation Prioritization & Anomaly Detection Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen antialiased`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-slate-950">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
