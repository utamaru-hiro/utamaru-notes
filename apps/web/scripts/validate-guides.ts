import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { listGuideSlugs, loadGuideBySlug } from '../lib/content';

async function main() {
  const scriptPath = fileURLToPath(import.meta.url);
  const scriptDir = path.dirname(scriptPath);
  const guidesDir = path.resolve(scriptDir, '../../../packages/content/guides');

  const slugs = await listGuideSlugs({ guidesDir });
  for (const slug of slugs) {
    await loadGuideBySlug(slug, { guidesDir });
  }

  console.log(`validated ${slugs.length} guide(s)`);
}

main().catch((error) => {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }
  process.exit(1);
});