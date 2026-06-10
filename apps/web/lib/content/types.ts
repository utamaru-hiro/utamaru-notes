export interface GuideMeta {
  slug: string;
  title: string;
  lead: string;
  heroEmoji: string;
  cardSummary: string;
}

export type GuideItemBlock =
  | { type: 'description' | 'warn' | 'output' | 'supplement' | 'info'; text: string; title?: string }
  | { type: 'code'; lang: string; code: string }
  | { type: 'heading'; level: 4 | 5 | 6; text: string };

export interface GuideItem {
  id: string;
  title: string;
  blocks: GuideItemBlock[];
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