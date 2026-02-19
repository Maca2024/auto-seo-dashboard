"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Flame,
  Settings,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: FileText, label: "Content", id: "content" },
  { icon: BarChart3, label: "Rankings", id: "rankings" },
  { icon: Search, label: "Keywords", id: "keywords" },
  { icon: Flame, label: "Domination", id: "llm" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function Sidebar({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (id: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen border-r border-border transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[220px]"
      } bg-surface hidden lg:flex flex-col`}
    >
      <div className="flex items-center gap-3 px-5 h-16 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
          <Flame className="w-4 h-4 text-accent" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-sm tracking-tight">
            AutoSEO
          </span>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-foreground hover:bg-surface-hover"
              }`}
            >
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-3 px-3 py-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors text-sm"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Inklappen</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
