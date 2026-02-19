"use client";

import { CheckCircle2, Loader2, Circle } from "lucide-react";
import { scheduleToday } from "@/lib/data";

const statusConfig = {
  done: {
    icon: CheckCircle2,
    color: "text-success",
    line: "bg-success/30",
    dot: "bg-success",
    animate: false,
  },
  active: {
    icon: Loader2,
    color: "text-accent",
    line: "bg-accent/30",
    dot: "bg-accent",
    animate: true,
  },
  pending: {
    icon: Circle,
    color: "text-muted/40",
    line: "bg-border",
    dot: "bg-muted/40",
    animate: false,
  },
};

export default function ScheduleTimeline() {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold">Vandaag&apos;s Schema</h3>
          <p className="text-xs text-muted mt-0.5">Automatische planning</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative w-2 h-2 rounded-full bg-accent live-dot" />
          <span className="text-[10px] text-accent font-medium">Live</span>
        </div>
      </div>

      <div className="space-y-0">
        {scheduleToday.map((item, i) => {
          const cfg = statusConfig[item.status];
          const StatusIcon = cfg.icon;
          const isLast = i === scheduleToday.length - 1;

          return (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${cfg.color}`}
                >
                  <StatusIcon
                    className={`w-3.5 h-3.5 ${
                      cfg.animate ? "animate-spin" : ""
                    }`}
                  />
                </div>
                {!isLast && (
                  <div className={`w-px flex-1 min-h-[24px] ${cfg.line}`} />
                )}
              </div>

              <div className="pb-5">
                <p className="text-xs font-medium leading-6">{item.task}</p>
                <p className="text-[10px] text-muted font-mono">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
