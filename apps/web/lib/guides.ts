import {
  listGuideSlugs,
  loadAllGuideMetas,
  loadGuideBySlug,
} from '@/lib/content';

const guidesDir = '../../packages/content/guides';

export function getGuideLoadOptions() {
  return { guidesDir };
}

export async function getGuideSlugs() {
  return listGuideSlugs(getGuideLoadOptions());
}

export async function getGuideCards() {
  return loadAllGuideMetas(getGuideLoadOptions());
}

export async function getGuide(slug: string) {
  return loadGuideBySlug(slug, getGuideLoadOptions());
}