import Link from 'next/link';

import { getGuideCards } from '@/lib/guides';

export default async function HomePage() {
  const guides = await getGuideCards();

  return (
    <main className="page-shell">
      <header className="hero-block">
        <h1 className="hero-title">utamaru-notes</h1>
        <p className="hero-lead">
          Markdown から静的生成する技術ガイド集です。トップページのカード一覧は
          packages/content/guides 配下の meta.ts から自動生成します。
        </p>
      </header>

      <section className="guide-grid">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}/`} className="guide-card">
            <div className="guide-card-emoji" aria-hidden="true">{guide.heroEmoji}</div>
            <h2 className="guide-card-title">{guide.title}</h2>
            <p className="guide-card-summary">{guide.cardSummary}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}