"use client";

import { ArrowUp, ArrowDown, Minus, ExternalLink } from "lucide-react";
import { keywords } from "@/lib/data";

function PositionBadge({ position }: { position: number }) {
  let color = "text-muted bg-muted/10";
  if (position <= 3) color = "text-success bg-success/10";
  else if (position <= 10) color = "text-accent bg-accent/10";
  else if (position <= 20) color = "text-warning bg-warning/10";

  return (
    <span
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${color}`}
    >
      {position}
    </span>
  );
}

function MiniTrend({ trend }: { trend: number[] }) {
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-[2px] h-5">
      {trend.map((val, i) => {
        const height = ((val - min) / range) * 100;
        const isLast = i === trend.length - 1;
        return (
          <div
            key={i}
            className={`w-1 rounded-full transition-all ${
              isLast ? "bg-accent" : "bg-muted/30"
            }`}
            style={{ height: `${Math.max(15, height)}%` }}
          />
        );
      })}
    </div>
  );
}

export default function RankingsTable() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Keyword Rankings</h3>
          <p className="text-xs text-muted mt-0.5">Live positie tracking</p>
        </div>
        <span className="text-[10px] text-muted font-mono bg-surface-hover px-2 py-1 rounded-md">
          Bijgewerkt 2 min geleden
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-muted border-b border-border">
              <th className="text-left font-medium px-6 py-3">Keyword</th>
              <th className="text-center font-medium px-3 py-3">Positie</th>
              <th className="text-center font-medium px-3 py-3">Wijziging</th>
              <th className="text-center font-medium px-3 py-3">Volume</th>
              <th className="text-center font-medium px-3 py-3">Trend</th>
              <th className="text-right font-medium px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((kw) => {
              const change = kw.previousPosition - kw.position;
              return (
                <tr
                  key={kw.keyword}
                  className="border-b border-border/50 hover:bg-surface-hover transition-colors group"
                >
                  <td className="px-6 py-3.5">
                    <span className="text-sm font-medium">{kw.keyword}</span>
                    <span className="block text-[10px] text-muted font-mono mt-0.5 truncate max-w-[200px]">
                      {kw.url}
                    </span>
                  </td>
                  <td className="text-center px-3">
                    <PositionBadge position={kw.position} />
                  </td>
                  <td className="text-center px-3">
                    <span
                      className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                        change > 0
                          ? "text-success"
                          : change < 0
                          ? "text-danger"
                          : "text-muted"
                      }`}
                    >
                      {change > 0 ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : change < 0 ? (
                        <ArrowDown className="w-3 h-3" />
                      ) : (
                        <Minus className="w-3 h-3" />
                      )}
                      {Math.abs(change)}
                    </span>
                  </td>
                  <td className="text-center px-3">
                    <span className="text-xs text-muted font-mono">
                      {kw.volume.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-3">
                    <div className="flex justify-center">
                      <MiniTrend trend={kw.trend} />
                    </div>
                  </td>
                  <td className="text-right px-6">
                    <ExternalLink className="w-3.5 h-3.5 text-muted opacity-0 group-hover:opacity-100 transition-opacity inline-block" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
