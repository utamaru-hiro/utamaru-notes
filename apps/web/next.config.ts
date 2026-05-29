import type { NextConfig } from 'next';

// GitHub Actions 環境では basePath を設定（リポジトリ名に合わせる）
const basePath = process.env.GITHUB_ACTIONS === 'true' ? '/utamaru-notes' : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
};

export default nextConfig;