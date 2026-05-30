import { cp, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function main() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const guidesDir = path.resolve(scriptDir, '../../../packages/content/guides');
  const publicDir = path.resolve(scriptDir, '../public/guides');

  const slugs = (await readdir(guidesDir, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  for (const slug of slugs) {
    const imagesDir = path.join(guidesDir, slug, 'images');
    const destDir = path.join(publicDir, slug);

    let entries;
    try {
      entries = await readdir(imagesDir, { withFileTypes: true });
    } catch {
      // images ディレクトリが存在しないガイドはスキップ
      continue;
    }

    await mkdir(destDir, { recursive: true });

    for (const entry of entries) {
      if (!entry.isFile()) continue;
      await cp(path.join(imagesDir, entry.name), path.join(destDir, entry.name));
    }

    console.log(`[copy-content-images] ${slug}: ${entries.length} file(s) copied`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
