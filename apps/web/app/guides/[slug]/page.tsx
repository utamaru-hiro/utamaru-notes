import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import GuideProgressBar from '@/components/GuideProgressBar';
import GuideTocDrawer from '@/components/GuideTocDrawer';
import { getGuide, getGuideSlugs } from '@/lib/guides';
import { highlightCode } from '@/lib/highlight';

export async function generateStaticParams() {
  const slugs = await getGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const guide = await getGuide(slug);
    return {
      title: `${guide.title} | utamaru-notes`,
      description: guide.cardSummary,
    };
  } catch {
    return { title: 'Not Found | utamaru-notes' };
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let guide;
  try {
    guide = await getGuide(slug);
  } catch {
    notFound();
  }

  // Pre-render all code blocks with Shiki at build time
  const highlightedBlocks: Map<string, string> = new Map();
  for (const section of guide.sections) {
    for (const item of section.items) {
      for (let i = 0; i < item.codeBlocks.length; i++) {
        const { code, lang } = item.codeBlocks[i];
        const key = `${item.id}-${i}`;
        highlightedBlocks.set(key, await highlightCode(code, lang));
      }
    }
  }

  return (
    <main className="page-shell guide-page-shell">
      <GuideTocDrawer sections={guide.sections} />

      <div className="guide-layout">
        <div className="guide-main">
          <header className="guide-header section-card">
            <div className="guide-kicker">
              <span aria-hidden="true">{guide.heroEmoji}</span>
              <span>{guide.title}</span>
            </div>
            <h1>{guide.title}</h1>
            <p className="hero-lead">{guide.lead}</p>
            <div className="guide-version">{guide.version}</div>
          </header>

          <div className="section-list">
            {guide.sections.map((section) => (
              <section key={section.id} id={section.id} className="section-card">
                <div className="section-head">
                  <div className="section-num">Section {String(section.num).padStart(2, '0')}</div>
                  <h2>{section.title}</h2>
                  {section.lead ? <p className="section-lead">{section.lead}</p> : null}
                </div>

                <div className="item-list">
                  {section.items.map((item) => (
                    <article key={item.id} className="item-card">
                      <h3>{item.title}</h3>

                      {item.description ? (
                        <div className="item-copy">
                          {item.description.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      ) : null}

                      {item.warn ? (
                        <>
                          <div className="item-label">注意</div>
                          <div className="item-warn">{item.warn}</div>
                        </>
                      ) : null}

                      {item.codeBlocks.length > 0 ? (
                        <>
                          <div className="item-label">コード</div>
                          {item.codeBlocks.map((_, index) => {
                            const key = `${item.id}-${index}`;
                            const html = highlightedBlocks.get(key) ?? '';
                            return (
                              <div
                                key={index}
                                className="code-block-wrap"
                                dangerouslySetInnerHTML={{ __html: html }}
                              />
                            );
                          })}
                        </>
                      ) : null}

                      {item.output ? (
                        <>
                          <div className="item-label">出力</div>
                          <div className="item-output">{item.output}</div>
                        </>
                      ) : null}

                      {item.supplement ? (
                        <>
                          <div className="item-label">補足</div>
                          <div className="item-copy">
                            {item.supplement.split('\n\n').map((paragraph, index) => (
                              <p key={index}>{paragraph}</p>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
      <GuideProgressBar slug={slug} />
    </main>
  );
}