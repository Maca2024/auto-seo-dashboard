"use client";

import { useState } from "react";
import { Sparkles, X, FileText, GitCompare, BookOpen, List, Trophy, Loader2 } from "lucide-react";

const contentTypes = [
  { id: "explainer", label: "Explainer", icon: FileText, desc: "Uitleg artikel" },
  { id: "comparison", label: "Vergelijking", icon: GitCompare, desc: "Productvergelijking" },
  { id: "howto", label: "How-to", icon: BookOpen, desc: "Stappenplan" },
  { id: "listicle", label: "Listicle", icon: List, desc: "Top X lijst" },
  { id: "casestudy", label: "Case Study", icon: Trophy, desc: "Klantcase" },
];

export default function GenerateButton() {
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [topic, setTopic] = useState("");
  const [selectedType, setSelectedType] = useState("explainer");
  const [done, setDone] = useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setDone(true);
      setTimeout(() => {
        setDone(false);
        setOpen(false);
        setTopic("");
      }, 2000);
    }, 3000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 lg:bottom-8 lg:right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-background font-semibold text-sm shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-105 transition-all duration-200"
      >
        <Sparkles className="w-4 h-4" />
        Genereer
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !generating && setOpen(false)}
          />
          <div className="relative w-full max-w-md bg-surface border border-border rounded-2xl p-6 animate-fade-in">
            <button
              onClick={() => !generating && setOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-semibold mb-1">Content Genereren</h2>
            <p className="text-xs text-muted mb-5">
              AI genereert een SEO-geoptimaliseerd artikel
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted mb-1.5 block">
                  Onderwerp
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Bijv. AI klantenservice voor e-commerce"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  disabled={generating}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted mb-1.5 block">
                  Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      disabled={generating}
                      className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-xs transition-all ${
                        selectedType === type.id
                          ? "border-accent/50 bg-accent/10 text-accent"
                          : "border-border hover:border-border hover:bg-surface-hover text-muted"
                      }`}
                    >
                      <type.icon className="w-4 h-4" />
                      <span className="font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating || !topic.trim()}
                className="w-full py-3 rounded-xl bg-accent text-background font-semibold text-sm flex items-center justify-center gap-2 hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Genereren...
                  </>
                ) : done ? (
                  "Artikel aangemaakt!"
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Genereer Artikel
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
