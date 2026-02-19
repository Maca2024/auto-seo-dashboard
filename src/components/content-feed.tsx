"use client";

import {
  FileText,
  GitCompare,
  BookOpen,
  Trophy,
  List,
  Clock,
  CheckCircle2,
  CircleDot,
} from "lucide-react";
import { contentItems } from "@/lib/data";

const typeIcons = {
  comparison: GitCompare,
  howto: BookOpen,
  explainer: FileText,
  casestudy: Trophy,
  listicle: List,
};

const typeLabels = {
  comparison: "Vergelijking",
  howto: "How-to",
  explainer: "Explainer",
  casestudy: "Case Study",
  listicle: "Listicle",
};

const statusConfig = {
  published: { icon: CheckCircle2, label: "Gepubliceerd", color: "text-success" },
  scheduled: { icon: Clock, label: "Gepland", color: "text-warning" },
  draft: { icon: CircleDot, label: "Concept", color: "text-muted" },
};

function ScoreRing({ score, size = 36 }: { score: number; size?: number }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 90 ? "#00e599" : score >= 75 ? "#ffb224" : "#ff4d6a";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1e2733"
          strokeWidth={3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-[10px] font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

export default function ContentFeed() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-sm font-semibold">Recente Content</h3>
        <p className="text-xs text-muted mt-0.5">
          {contentItems.length} artikelen deze week
        </p>
      </div>

      <div className="divide-y divide-border/50">
        {contentItems.map((item) => {
          const TypeIcon = typeIcons[item.type];
          const statusCfg = statusConfig[item.status];
          const StatusIcon = statusCfg.icon;

          return (
            <div
              key={item.id}
              className="px-6 py-4 hover:bg-surface-hover transition-colors group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TypeIcon className="w-4 h-4 text-accent" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-snug line-clamp-1 group-hover:text-accent transition-colors">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] font-medium text-muted bg-surface-hover px-1.5 py-0.5 rounded">
                      {typeLabels[item.type]}
                    </span>
                    <span
                      className={`flex items-center gap-1 text-[10px] ${statusCfg.color}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusCfg.label}
                    </span>
                    <span className="text-[10px] text-muted font-mono">
                      {item.wordCount.toLocaleString()} woorden
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-center">
                    <ScoreRing score={item.seoScore} />
                    <p className="text-[8px] text-muted mt-0.5">SEO</p>
                  </div>
                  <div className="text-center">
                    <ScoreRing score={item.llmScore} />
                    <p className="text-[8px] text-muted mt-0.5">LLM</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
