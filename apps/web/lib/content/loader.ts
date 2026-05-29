import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import { parseGuideMarkdown } from './parser';
import type { GuideDocument, GuideMeta, LoadGuideOptions } from './types';

export class GuideLoaderError extends Error {
  readonly sourcePath?: string;

  constructor(message: string, sourcePath?: string) {
    super(sourcePath ? `${sourcePath}: ${message}` : message);
    this.name = 'GuideLoaderError';
    this.sourcePath = sourcePath;
  }
}

export async function listGuideSlugs(options: LoadGuideOptions): Promise<string[]> {
  const entries = await readdir(options.guidesDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export async function loadGuideMetaBySlug(
  slug: string,
  options: LoadGuideOptions,
): Promise<GuideMeta> {
  const guideDir = path.join(options.guidesDir, slug);
  const metaPath = path.join(guideDir, 'meta.ts');
  const metaSource = await readFile(metaPath, 'utf8').catch((error: unknown) => {
    throw toLoaderError(error, 'meta.ts を読み込めませんでした', metaPath);
  });

  return parseGuideMetaSource(metaSource, metaPath);
}

export async function loadAllGuideMetas(options: LoadGuideOptions): Promise<GuideMeta[]> {
  const slugs = await listGuideSlugs(options);
  const guides = await Promise.all(slugs.map((slug) => loadGuideMetaBySlug(slug, options)));
  return guides.sort((left, right) => left.title.localeCompare(right.title, 'ja'));
}

export async function loadGuideBySlug(
  slug: string,
  options: LoadGuideOptions,
): Promise<GuideDocument> {
  const guideDir = path.join(options.guidesDir, slug);
  return loadGuideFromDirectory(guideDir);
}

export async function loadGuideFromDirectory(guideDir: string): Promise<GuideDocument> {
  const metaPath = path.join(guideDir, 'meta.ts');
  const markdownPath = path.join(guideDir, 'guide.md');

  const [metaSource, markdown] = await Promise.all([
    readFile(metaPath, 'utf8').catch((error: unknown) => {
      throw toLoaderError(error, 'meta.ts を読み込めませんでした', metaPath);
    }),
    readFile(markdownPath, 'utf8').catch((error: unknown) => {
      throw toLoaderError(error, 'guide.md を読み込めませんでした', markdownPath);
    }),
  ]);

  const meta = parseGuideMetaSource(metaSource, metaPath);
  return parseGuideMarkdown(meta, markdown, { sourcePath: markdownPath });
}

export function parseGuideMetaSource(source: string, sourcePath?: string): GuideMeta {
  const objectMatch = /export\s+const\s+guideMeta\s*=\s*\{([\s\S]*?)\}\s*as\s+const\s*;?/m.exec(source);
  if (!objectMatch) {
    throw new GuideLoaderError('guideMeta オブジェクトを解釈できませんでした', sourcePath);
  }

  const body = objectMatch[1];
  const entries = Array.from(
    body.matchAll(/([A-Za-z_][A-Za-z0-9_]*)\s*:\s*([`'"\[])([\s\S]*?)\2\s*,?/g),
  );

  const values = new Map<string, string>();
  for (const entry of entries) {
    const key = entry[1];
    const rawValue = entry[3];
    values.set(key, normalizeMetaString(rawValue));
  }

  const meta: GuideMeta = {
    slug: requireMetaValue(values, 'slug', sourcePath),
    title: requireMetaValue(values, 'title', sourcePath),
    version: requireMetaValue(values, 'version', sourcePath),
    lead: requireMetaValue(values, 'lead', sourcePath),
    heroEmoji: requireMetaValue(values, 'heroEmoji', sourcePath),
    accent: requireMetaValue(values, 'accent', sourcePath),
    accent2: requireMetaValue(values, 'accent2', sourcePath),
    bgGradientTop: requireMetaValue(values, 'bgGradientTop', sourcePath),
    bgRadialLeft: requireMetaValue(values, 'bgRadialLeft', sourcePath),
    bgRadialRight: requireMetaValue(values, 'bgRadialRight', sourcePath),
    badgeGradient: requireMetaValue(values, 'badgeGradient', sourcePath),
    cardSummary: requireMetaValue(values, 'cardSummary', sourcePath),
  };

  return meta;
}

function requireMetaValue(
  values: Map<string, string>,
  key: keyof GuideMeta,
  sourcePath?: string,
): string {
  const value = values.get(key);
  if (!value) {
    throw new GuideLoaderError(`guideMeta.${key} が不足しています`, sourcePath);
  }

  return value;
}

function normalizeMetaString(value: string): string {
  return value
    .replace(/\\`/g, '`')
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n')
    .trim();
}

function toLoaderError(error: unknown, message: string, sourcePath: string): GuideLoaderError {
  if (error instanceof GuideLoaderError) {
    return error;
  }

  const details = error instanceof Error && error.message ? ` (${error.message})` : '';
  return new GuideLoaderError(`${message}${details}`, sourcePath);
}