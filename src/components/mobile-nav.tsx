"use client";

import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Search,
  Flame,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Home", id: "dashboard" },
  { icon: FileText, label: "Content", id: "content" },
  { icon: BarChart3, label: "Rankings", id: "rankings" },
  { icon: Search, label: "Keywords", id: "keywords" },
  { icon: Flame, label: "Dominate", id: "llm" },
];

export default function MobileNav({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-border bg-surface/90 backdrop-blur-xl">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                isActive
                  ? "text-accent"
                  : "text-muted"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
