export interface GuideMeta {
  slug: string;
  title: string;
  version: string;
  lead: string;
  heroEmoji: string;
  accent: string;
  accent2: string;
  bgGradientTop: string;
  bgRadialLeft: string;
  bgRadialRight: string;
  badgeGradient: string;
  cardSummary: string;
}

export interface GuideCodeBlock {
  lang: string;
  code: string;
}

export interface GuideItem {
  id: string;
  title: string;
  description?: string;
  warn?: string;
  output?: string;
  supplement?: string;
  codeBlocks: GuideCodeBlock[];
  searchText: string;
}

export interface GuideSection {
  id: string;
  num: number;
  title: string;
  lead?: string;
  items: GuideItem[];
}

export interface GuideDocument extends GuideMeta {
  sections: GuideSection[];
}

export interface ParseGuideMarkdownOptions {
  sourcePath?: string;
}

export interface LoadGuideOptions {
  guidesDir: string;
}