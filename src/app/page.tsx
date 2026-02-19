"use client";

import { useState } from "react";
import {
  Search,
  TrendingUp,
  FileText,
  Eye,
  Bot,
  Shield,
  ArrowUpRight,
  Activity,
  Flame,
} from "lucide-react";
import Sidebar from "@/components/sidebar";
import MobileNav from "@/components/mobile-nav";
import MetricCard from "@/components/metric-card";
import TrafficChart from "@/components/traffic-chart";
import RankingsTable from "@/components/rankings-table";
import ContentFeed from "@/components/content-feed";
import ScheduleTimeline from "@/components/schedule-timeline";
import GenerateButton from "@/components/generate-button";
import DominationPanel from "@/components/domination-panel";
import { stats } from "@/lib/data";

const PAGE_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  content: "Content",
  rankings: "Rankings",
  keywords: "Keywords",
  llm: "Domination Mode",
  settings: "Settings",
};

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");

  const pageTitle = PAGE_TITLES[activeNav] || "Dashboard";
  const showDomination = activeNav === "llm";
  const showDashboard = activeNav === "dashboard";
  const showContent = activeNav === "content";
  const showRankings = activeNav === "rankings" || activeNav === "keywords";

  return (
    <div className="min-h-screen bg-background">
      <Sidebar active={activeNav} onNavigate={setActiveNav} />
      <MobileNav active={activeNav} onNavigate={setActiveNav} />

      <main className="lg:pl-[220px] pb-24 lg:pb-8">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 lg:px-8 h-16">
            <div className="flex items-center gap-3">
              {showDomination && (
                <Flame className="w-5 h-5 text-accent" />
              )}
              <div>
                <h1 className="text-base font-semibold tracking-tight">
                  {pageTitle}
                </h1>
                <p className="text-[11px] text-muted font-mono">
                  {new Date().toLocaleDateString("nl-NL", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 text-success text-[11px] font-medium">
                <Activity className="w-3 h-3" />
                Systeem actief
              </div>
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-xs font-bold text-accent">S</span>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 lg:px-8 py-6 space-y-6">
          {/* ─── DASHBOARD VIEW ─── */}
          {showDashboard && (
            <>
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                <div className="animate-fade-in stagger-1 opacity-0">
                  <MetricCard
                    label="Organisch Verkeer"
                    value={stats.organicTraffic.toLocaleString()}
                    change={stats.trafficChange}
                    icon={<Eye className="w-5 h-5" />}
                  />
                </div>
                <div className="animate-fade-in stagger-2 opacity-0">
                  <MetricCard
                    label="Top 10 Keywords"
                    value={stats.top10Keywords}
                    change={5}
                    changeLabel=" nieuw"
                    icon={<TrendingUp className="w-5 h-5" />}
                  />
                </div>
                <div className="animate-fade-in stagger-3 opacity-0">
                  <MetricCard
                    label="Content Gegenereerd"
                    value={stats.contentGenerated}
                    icon={<FileText className="w-5 h-5" />}
                  />
                </div>
                <div className="animate-fade-in stagger-4 opacity-0">
                  <MetricCard
                    label="LLM Citaties"
                    value={stats.llmCitations}
                    change={stats.llmCitationChange}
                    icon={<Bot className="w-5 h-5" />}
                  />
                </div>
              </div>

              {/* Quick Stats Bar */}
              <div className="glass rounded-2xl p-4 animate-fade-in stagger-3 opacity-0">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-6 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-muted">Top 3:</span>
                      <span className="font-bold text-accent">
                        {stats.top3Keywords}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-warning" />
                      <span className="text-muted">Gem. Positie:</span>
                      <span className="font-bold">{stats.avgPosition}</span>
                      <span className="text-success text-[10px]">
                        {stats.positionChange}
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#7c3aed]" />
                      <span className="text-muted">SEO Score:</span>
                      <span className="font-bold">{stats.seoScore}/100</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                      <Shield className="w-3 h-3 text-muted" />
                      <span className="text-muted">DA:</span>
                      <span className="font-bold">
                        {stats.domainAuthority}
                      </span>
                      <span className="text-success text-[10px]">
                        +{stats.daChange}
                      </span>
                    </div>
                  </div>
                  <button className="text-[11px] text-accent font-medium flex items-center gap-1 hover:underline">
                    Volledig rapport
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 animate-fade-in stagger-4 opacity-0">
                  <TrafficChart />
                </div>
                <div className="animate-fade-in stagger-5 opacity-0">
                  <ScheduleTimeline />
                </div>
              </div>

              {/* Rankings Table */}
              <div className="animate-fade-in stagger-5 opacity-0">
                <RankingsTable />
              </div>

              {/* Content Feed */}
              <div className="animate-fade-in stagger-6 opacity-0">
                <ContentFeed />
              </div>
            </>
          )}

          {/* ─── DOMINATION VIEW ─── */}
          {showDomination && <DominationPanel />}

          {/* ─── CONTENT VIEW ─── */}
          {showContent && (
            <div className="animate-fade-in opacity-0">
              <ContentFeed />
            </div>
          )}

          {/* ─── RANKINGS VIEW ─── */}
          {showRankings && (
            <div className="animate-fade-in opacity-0">
              <RankingsTable />
            </div>
          )}

          {/* ─── SETTINGS VIEW ─── */}
          {activeNav === "settings" && (
            <div className="glass rounded-2xl p-6 animate-fade-in opacity-0">
              <h2 className="text-sm font-semibold mb-4">Configuratie</h2>
              <div className="space-y-4 text-xs text-muted">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Dagelijkse posts", value: "3" },
                    { label: "Min. woorden", value: "1.200" },
                    { label: "Max. woorden", value: "2.500" },
                    { label: "Auto-publicatie", value: "Uit" },
                    { label: "Ranking check", value: "Elke 6 uur" },
                    { label: "LLM Model", value: "Claude 3.5 Sonnet" },
                    { label: "CMS", value: "WordPress" },
                    { label: "Taal", value: "Nederlands" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-foreground font-medium">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div className="flex items-center justify-between text-[10px] text-muted/50 pt-4">
            <span className="font-mono">AutoSEO Ranker v2.0</span>
            <span>
              <Search className="w-3 h-3 inline mr-1" />
              48 keywords tracked · 3 content/dag · 24/7 monitoring
            </span>
          </div>
        </div>
      </main>

      <GenerateButton />
    </div>
  );
}
