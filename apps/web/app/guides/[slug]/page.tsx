import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import GuideProgressBar from '@/components/GuideProgressBar';
import GuideTocDrawer from '@/components/GuideTocDrawer';
import { getGuide, getGuideSlugs } from '@/lib/guides';
import { highlightCode } from '@/lib/highlight';
import { renderMarkdown } from '@/lib/markdown';

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
      let codeIndex = 0;
      for (const block of item.blocks) {
        if (block.type === 'code') {
          const key = `${item.id}-code-${codeIndex}`;
          highlightedBlocks.set(key, await highlightCode(block.code, block.lang));
          codeIndex++;
        }
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

                      {(() => {
                        let codeIndex = 0;
                        return item.blocks.map((block, index) => {
                          if (block.type === 'description') {
                            return (
                              <div
                                key={index}
                                className="item-copy"
                                dangerouslySetInnerHTML={{ __html: renderMarkdown(block.text) }}
                              />
                            );
                          }
                          if (block.type === 'warn') {
                            return (
                              <Fragment key={index}>
                                <div className="item-label">注意</div>
                                <div
                                  className="item-warn"
                                  dangerouslySetInnerHTML={{ __html: renderMarkdown(block.text) }}
                                />
                              </Fragment>
                            );
                          }
                          if (block.type === 'code') {
                            const key = `${item.id}-code-${codeIndex}`;
                            const html = highlightedBlocks.get(key) ?? '';
                            codeIndex++;
                            return (
                              <Fragment key={index}>
                                <div className="item-label">コード</div>
                                <div
                                  className="code-block-wrap"
                                  dangerouslySetInnerHTML={{ __html: html }}
                                />
                              </Fragment>
                            );
                          }
                          if (block.type === 'output') {
                            return (
                              <Fragment key={index}>
                                <div className="item-label">出力</div>
                                <div className="item-output">{block.text}</div>
                              </Fragment>
                            );
                          }
                          if (block.type === 'supplement') {
                            return (
                              <Fragment key={index}>
                                <div className="item-label">補足</div>
                                <div
                                  className="item-copy"
                                  dangerouslySetInnerHTML={{ __html: renderMarkdown(block.text) }}
                                />
                              </Fragment>
                            );
                          }
                          if (block.type === 'heading') {
                            const Tag = `h${block.level}` as 'h4' | 'h5' | 'h6';
                            return (
                              <Tag key={index} className={`item-subheading-${block.level}`}>
                                {block.text}
                              </Tag>
                            );
                          }
                          return null;
                        });
                      })()}
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