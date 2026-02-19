export interface KeywordRanking {
  keyword: string;
  position: number;
  previousPosition: number;
  volume: number;
  difficulty: "low" | "medium" | "high";
  url: string;
  trend: number[];
}

export interface ContentItem {
  id: string;
  title: string;
  type: "comparison" | "howto" | "explainer" | "casestudy" | "listicle";
  status: "draft" | "published" | "scheduled";
  seoScore: number;
  llmScore: number;
  wordCount: number;
  publishedAt: string;
  keywords: string[];
}

export interface DailyMetric {
  date: string;
  organic: number;
  llmReferral: number;
  contentGenerated: number;
}

export const keywords: KeywordRanking[] = [
  {
    keyword: "AI klantenservice",
    position: 4,
    previousPosition: 12,
    volume: 1200,
    difficulty: "medium",
    url: "/blog/ai-klantenservice-gids",
    trend: [45, 32, 18, 12, 8, 4],
  },
  {
    keyword: "chatbot voor webshop",
    position: 2,
    previousPosition: 7,
    volume: 880,
    difficulty: "medium",
    url: "/blog/chatbot-webshop-implementatie",
    trend: [38, 25, 15, 9, 5, 2],
  },
  {
    keyword: "AI customer service Nederland",
    position: 1,
    previousPosition: 3,
    volume: 720,
    difficulty: "low",
    url: "/blog/ai-customer-service-nl",
    trend: [28, 18, 9, 5, 3, 1],
  },
  {
    keyword: "automatische klantenservice",
    position: 6,
    previousPosition: 19,
    volume: 590,
    difficulty: "high",
    url: "/blog/automatische-klantenservice",
    trend: [52, 40, 28, 22, 13, 6],
  },
  {
    keyword: "LLM optimalisatie SEO",
    position: 3,
    previousPosition: 8,
    volume: 320,
    difficulty: "low",
    url: "/blog/llm-seo-optimalisatie",
    trend: [35, 22, 14, 10, 5, 3],
  },
  {
    keyword: "AI content generatie tools",
    position: 7,
    previousPosition: 15,
    volume: 480,
    difficulty: "medium",
    url: "/blog/ai-content-tools-vergelijking",
    trend: [42, 35, 22, 18, 11, 7],
  },
  {
    keyword: "schema markup generator",
    position: 5,
    previousPosition: 11,
    volume: 410,
    difficulty: "low",
    url: "/tools/schema-generator",
    trend: [30, 24, 16, 13, 8, 5],
  },
  {
    keyword: "SEO automatisering",
    position: 8,
    previousPosition: 25,
    volume: 350,
    difficulty: "high",
    url: "/blog/seo-automatisering-gids",
    trend: [58, 42, 35, 28, 17, 8],
  },
];

export const contentItems: ContentItem[] = [
  {
    id: "1",
    title: "Complete Gids: AI Klantenservice Implementeren in 2026",
    type: "howto",
    status: "published",
    seoScore: 94,
    llmScore: 88,
    wordCount: 2340,
    publishedAt: "2026-02-19T09:00:00",
    keywords: ["AI klantenservice", "implementatie", "chatbot"],
  },
  {
    id: "2",
    title: "Top 7 AI Chatbot Platforms Vergeleken",
    type: "comparison",
    status: "published",
    seoScore: 91,
    llmScore: 92,
    wordCount: 1980,
    publishedAt: "2026-02-19T13:00:00",
    keywords: ["chatbot platforms", "vergelijking", "AI tools"],
  },
  {
    id: "3",
    title: "Hoe LLM SEO Jouw Rankings Kan Boosten",
    type: "explainer",
    status: "scheduled",
    seoScore: 87,
    llmScore: 95,
    wordCount: 1650,
    publishedAt: "2026-02-20T09:00:00",
    keywords: ["LLM SEO", "optimalisatie", "AI search"],
  },
  {
    id: "4",
    title: "Case Study: 57% Meer Efficiency met AI Support",
    type: "casestudy",
    status: "draft",
    seoScore: 82,
    llmScore: 79,
    wordCount: 2100,
    publishedAt: "",
    keywords: ["case study", "AI support", "efficiency"],
  },
  {
    id: "5",
    title: "Schema Markup: Alles Wat Je Moet Weten",
    type: "explainer",
    status: "published",
    seoScore: 96,
    llmScore: 90,
    wordCount: 1870,
    publishedAt: "2026-02-18T17:00:00",
    keywords: ["schema markup", "structured data", "rich snippets"],
  },
  {
    id: "6",
    title: "5 Manieren om AI Content te Optimaliseren",
    type: "listicle",
    status: "scheduled",
    seoScore: 89,
    llmScore: 86,
    wordCount: 1420,
    publishedAt: "2026-02-20T13:00:00",
    keywords: ["AI content", "optimalisatie", "content marketing"],
  },
];

export const dailyMetrics: DailyMetric[] = [
  { date: "13 Feb", organic: 120, llmReferral: 15, contentGenerated: 3 },
  { date: "14 Feb", organic: 145, llmReferral: 22, contentGenerated: 3 },
  { date: "15 Feb", organic: 132, llmReferral: 28, contentGenerated: 3 },
  { date: "16 Feb", organic: 168, llmReferral: 35, contentGenerated: 2 },
  { date: "17 Feb", organic: 195, llmReferral: 42, contentGenerated: 3 },
  { date: "18 Feb", organic: 210, llmReferral: 55, contentGenerated: 3 },
  { date: "19 Feb", organic: 248, llmReferral: 68, contentGenerated: 3 },
];

export const stats = {
  totalKeywords: 48,
  top10Keywords: 12,
  top3Keywords: 5,
  avgPosition: 8.4,
  positionChange: -3.2,
  organicTraffic: 1218,
  trafficChange: 34,
  contentGenerated: 87,
  llmCitations: 23,
  llmCitationChange: 156,
  seoScore: 92,
  domainAuthority: 28,
  daChange: 6,
};

export const scheduleToday = [
  { time: "09:00", task: "Explainer artikel gegenereerd", status: "done" as const },
  { time: "13:00", task: "Comparison artikel genereren", status: "active" as const },
  { time: "15:00", task: "Rankings checken", status: "pending" as const },
  { time: "17:00", task: "How-to guide genereren", status: "pending" as const },
  { time: "21:00", task: "Dagelijkse optimalisatie", status: "pending" as const },
];
