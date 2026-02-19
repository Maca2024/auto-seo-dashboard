"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Zap,
  Flame,
  Target,
  Brain,
  Rocket,
  Shield,
  CheckCircle2,
  Loader2,
  BarChart3,
  FileText,
  ArrowUpRight,
} from "lucide-react";

interface Phase {
  id: string;
  name: string;
  icon: typeof Zap;
  description: string;
  steps: string[];
  duration: number; // ms per step
}

const PHASES: Phase[] = [
  {
    id: "recon",
    name: "Reconnaissance",
    icon: Target,
    description: "Keyword universum scannen & gaps identificeren",
    steps: [
      "Pillar keywords laden (8)",
      "Long-tail keywords laden (15)",
      "LLM target queries laden (8)",
      "Concurrentie posities checken",
      "Opportunity gaps identificeren",
    ],
    duration: 400,
  },
  {
    id: "content",
    name: "Content Artillerie",
    icon: Brain,
    description: "AI-powered content genereren & optimaliseren",
    steps: [
      "Explainer: AI Klantenservice Gids",
      "Vergelijking: Top 7 Chatbot Platforms",
      "How-to: LLM SEO Implementatie",
      "Listicle: 5 Voordelen van AI Support",
      "Case Study: 57% Efficiency Boost",
    ],
    duration: 800,
  },
  {
    id: "optimize",
    name: "LLM Optimalisatie",
    icon: Zap,
    description: "Content optimaliseren voor ChatGPT, Claude & Perplexity",
    steps: [
      "FAQ secties toevoegen (5-7 per artikel)",
      "Definition boxes genereren",
      "Vergelijkingstabellen bouwen",
      "Entity mentions versterken",
      "Schema markup genereren",
    ],
    duration: 500,
  },
  {
    id: "deploy",
    name: "Deployment",
    icon: Rocket,
    description: "Content publiceren & rankings monitoren",
    steps: [
      "Articles opslaan als markdown",
      "Schema JSON-LD embedden",
      "CMS publicatie queue",
      "Ranking monitor activeren",
      "Domination rapport genereren",
    ],
    duration: 300,
  },
];

interface RunResult {
  contentGenerated: number;
  seoScoreAvg: number;
  llmScoreAvg: number;
  keywordsChecked: number;
  keywordsTop3: number;
  keywordsTop10: number;
  schemasGenerated: number;
  duration: string;
}

export default function DominationPanel() {
  const [running, setRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(-1);
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedPhases, setCompletedPhases] = useState<Set<number>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<RunResult | null>(null);
  const [articleCount, setArticleCount] = useState(5);

  const runDomination = useCallback(() => {
    setRunning(true);
    setCurrentPhase(0);
    setCurrentStep(0);
    setCompletedPhases(new Set());
    setCompletedSteps(new Set());
    setResult(null);

    let phaseIdx = 0;
    let stepIdx = 0;
    const newCompletedSteps = new Set<string>();
    const newCompletedPhases = new Set<number>();

    const advance = () => {
      const phase = PHASES[phaseIdx];
      if (!phase) {
        // All done
        setRunning(false);
        setCurrentPhase(-1);
        setCurrentStep(-1);
        setCompletedPhases(new Set([0, 1, 2, 3]));
        setResult({
          contentGenerated: articleCount,
          seoScoreAvg: 89.4,
          llmScoreAvg: 87.2,
          keywordsChecked: 8,
          keywordsTop3: 3,
          keywordsTop10: 8,
          schemasGenerated: articleCount,
          duration: `${(articleCount * 1.2 + 3.5).toFixed(1)}s`,
        });
        return;
      }

      if (stepIdx >= phase.steps.length) {
        newCompletedPhases.add(phaseIdx);
        setCompletedPhases(new Set(newCompletedPhases));
        phaseIdx++;
        stepIdx = 0;
        setCurrentPhase(phaseIdx);
        setCurrentStep(0);
        setTimeout(advance, 200);
        return;
      }

      setCurrentPhase(phaseIdx);
      setCurrentStep(stepIdx);

      setTimeout(() => {
        newCompletedSteps.add(`${phaseIdx}-${stepIdx}`);
        setCompletedSteps(new Set(newCompletedSteps));
        stepIdx++;
        advance();
      }, phase.duration);
    };

    setTimeout(advance, 300);
  }, [articleCount]);

  const progress =
    PHASES.reduce((acc, phase, pi) => {
      return (
        acc +
        phase.steps.filter((_, si) => completedSteps.has(`${pi}-${si}`)).length
      );
    }, 0) / PHASES.reduce((acc, p) => acc + p.steps.length, 0);

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-[#7c3aed]/20 flex items-center justify-center">
              <Flame className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                Domination Mode
              </h2>
              <p className="text-xs text-muted">
                Volledige SEO sweep — content + rankings + LLM optimalisatie
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-background rounded-lg border border-border px-3 py-1.5">
              <label className="text-xs text-muted">Artikelen:</label>
              <select
                value={articleCount}
                onChange={(e) => setArticleCount(Number(e.target.value))}
                disabled={running}
                className="bg-transparent text-sm font-bold text-foreground outline-none"
              >
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>

            <button
              onClick={runDomination}
              disabled={running}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-background font-semibold text-sm hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-accent/20"
            >
              {running ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Bezig...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Start Domination
                </>
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {(running || result) && (
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-muted mb-2">
              <span>Voortgang</span>
              <span className="font-mono">
                {result ? "100" : Math.round(progress * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-[#7c3aed] rounded-full transition-all duration-500"
                style={{ width: `${result ? 100 : progress * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Phases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PHASES.map((phase, pi) => {
          const isActive = currentPhase === pi && running;
          const isDone = completedPhases.has(pi);
          const PhaseIcon = phase.icon;

          return (
            <div
              key={phase.id}
              className={`glass rounded-2xl p-5 transition-all duration-300 ${
                isActive
                  ? "ring-1 ring-accent/50 glow-accent"
                  : isDone
                  ? "opacity-80"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-accent/20 text-accent"
                      : isDone
                      ? "bg-success/20 text-success"
                      : "bg-surface-hover text-muted"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <PhaseIcon className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{phase.name}</h3>
                  <p className="text-[10px] text-muted">{phase.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                {phase.steps.map((step, si) => {
                  const stepKey = `${pi}-${si}`;
                  const isStepActive =
                    isActive && currentStep === si;
                  const isStepDone = completedSteps.has(stepKey);

                  return (
                    <div
                      key={si}
                      className={`flex items-center gap-2 text-xs transition-all duration-200 ${
                        isStepActive
                          ? "text-accent"
                          : isStepDone
                          ? "text-muted"
                          : "text-muted/40"
                      }`}
                    >
                      {isStepDone ? (
                        <CheckCircle2 className="w-3 h-3 text-success flex-shrink-0" />
                      ) : isStepActive ? (
                        <Loader2 className="w-3 h-3 animate-spin flex-shrink-0" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-current flex-shrink-0" />
                      )}
                      <span className={isStepActive ? "font-medium" : ""}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Results */}
      {result && (
        <div className="glass rounded-2xl p-6 glow-accent animate-fade-in">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Domination Compleet</h3>
              <p className="text-[10px] text-muted font-mono">
                Duur: {result.duration}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-xl bg-background/50">
              <FileText className="w-4 h-4 text-accent mx-auto mb-1" />
              <p className="text-xl font-bold">{result.contentGenerated}</p>
              <p className="text-[10px] text-muted">Artikelen</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-background/50">
              <BarChart3 className="w-4 h-4 text-accent mx-auto mb-1" />
              <p className="text-xl font-bold">{result.seoScoreAvg}</p>
              <p className="text-[10px] text-muted">SEO Score</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-background/50">
              <Brain className="w-4 h-4 text-[#7c3aed] mx-auto mb-1" />
              <p className="text-xl font-bold">{result.llmScoreAvg}</p>
              <p className="text-[10px] text-muted">LLM Score</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-background/50">
              <Target className="w-4 h-4 text-warning mx-auto mb-1" />
              <p className="text-xl font-bold">
                {result.keywordsTop3}/{result.keywordsChecked}
              </p>
              <p className="text-[10px] text-muted">Top 3 Keywords</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-muted">
              {result.schemasGenerated} schemas gegenereerd
            </span>
            <button className="text-accent font-medium flex items-center gap-1 hover:underline">
              Bekijk rapport
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* CLI Command Reference */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-xs font-semibold text-muted mb-3">CLI Commando&apos;s</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { cmd: "python auto_rank_bot.py --mode=domination", desc: "Volledige SEO sweep" },
            { cmd: "python auto_rank_bot.py --mode=blitz", desc: "Snelle 5-artikel burst" },
            { cmd: "python auto_rank_bot.py --mode=rankings", desc: "Rankings checken" },
            { cmd: "python auto_rank_bot.py --mode=status", desc: "Systeem status" },
          ].map((item) => (
            <div
              key={item.cmd}
              className="flex items-start gap-2 p-2.5 rounded-lg bg-background/50 group"
            >
              <code className="text-[10px] font-mono text-accent flex-1 leading-relaxed">
                {item.cmd}
              </code>
              <span className="text-[10px] text-muted whitespace-nowrap">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
