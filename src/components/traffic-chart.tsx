"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dailyMetrics } from "@/lib/data";

export default function TrafficChart() {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold">Traffic Overview</h3>
          <p className="text-xs text-muted mt-1">Afgelopen 7 dagen</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Organic
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7c3aed]" />
            LLM Referral
          </span>
        </div>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dailyMetrics}>
            <defs>
              <linearGradient id="organicGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00e599" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00e599" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="llmGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e2733"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7a8d", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7a8d", fontSize: 11 }}
              width={35}
            />
            <Tooltip
              contentStyle={{
                background: "#0d1117",
                border: "1px solid #1e2733",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#f0f2f5",
              }}
            />
            <Area
              type="monotone"
              dataKey="organic"
              stroke="#00e599"
              strokeWidth={2}
              fill="url(#organicGrad)"
            />
            <Area
              type="monotone"
              dataKey="llmReferral"
              stroke="#7c3aed"
              strokeWidth={2}
              fill="url(#llmGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
