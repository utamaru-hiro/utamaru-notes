import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import GuideProgressBar from '@/components/GuideProgressBar';
import GuideTocDrawer from '@/components/GuideTocDrawer';
import { getGuide, getGuideSlugs } from '@/lib/guides';
import { highlightCode } from '@/lib/highlight';
import { renderMarkdown } from '@/lib/markdown';

type TocHeading = {
  id: string;
  title: string;
};

type TocItem = TocHeading & {
  h4: TocHeading[];
};

type TocSection = TocHeading & {
  num: number;
  h3: TocItem[];
};

function renderCalloutHeader(type: 'warn' | 'output' | 'supplement' | 'info', title?: string) {
  const labelByType = {
    warn: '注意',
    output: '出力',
    supplement: '補足',
    info: '情報',
  } as const;

  const iconByType = {
    warn: '⚠',
    output: '⌘',
    supplement: '✦',
    info: 'ℹ',
  } as const;

  const hideIconForMathCallout =
    type === 'info' && !!title && /^(定理|命題|系)(\s|$)/.test(title);
  const showIcon = !hideIconForMathCallout;

  return (
    <div
      className={`item-callout-head${showIcon ? '' : ' item-callout-head-no-icon'}`}
      aria-label={title ? `${labelByType[type]}: ${title}` : labelByType[type]}
      title={title ? `${labelByType[type]}: ${title}` : labelByType[type]}
    >
      {showIcon ? <span className="item-callout-icon" aria-hidden="true">{iconByType[type]}</span> : null}
      {title ? <span className="item-callout-title">{title}</span> : null}
    </div>
  );
}

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

  const tocSections: TocSection[] = guide.sections.map((section) => ({
    id: section.id,
    num: section.num,
    title: section.title,
    h3: section.items.map((item) => {
      let h4Index = 0;
      const h4: TocHeading[] = [];
      for (const block of item.blocks) {
        if (block.type === 'heading' && block.level === 4) {
          h4Index += 1;
          h4.push({
            id: `${item.id}-h4-${h4Index}`,
            title: block.text,
          });
        }
      }

      return {
        id: item.id,
        title: item.title,
        h4,
      };
    }),
  }));

  return (
    <main className="page-shell guide-page-shell">
      <GuideTocDrawer sections={tocSections} />

      <div className="guide-layout">
        <div className="guide-main">
          <header className="guide-header section-card">
            <div className="guide-kicker">
              <span aria-hidden="true">{guide.heroEmoji}</span>
              <span>{guide.title}</span>
            </div>
            <h1>{guide.title}</h1>
            <p className="hero-lead">{guide.lead}</p>
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
                      <h3 id={item.id}>{item.title}</h3>

                      {(() => {
                        let codeIndex = 0;
                        let h4Index = 0;
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
                              <div key={index} className="item-callout-box item-warn">
                                {renderCalloutHeader('warn', block.title)}
                                <div
                                  className="item-callout-body"
                                  dangerouslySetInnerHTML={{ __html: renderMarkdown(block.text) }}
                                />
                              </div>
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
                              <div key={index} className="item-callout-box item-output">
                                {renderCalloutHeader('output', block.title)}
                                <div className="item-callout-body">{block.text}</div>
                              </div>
                            );
                          }
                          if (block.type === 'supplement') {
                            return (
                              <Fragment key={index}>
                                {renderCalloutHeader('supplement', block.title)}
                                <div
                                  className="item-copy"
                                  dangerouslySetInnerHTML={{ __html: renderMarkdown(block.text) }}
                                />
                              </Fragment>
                            );
                          }
                          if (block.type === 'info') {
                            return (
                              <div key={index} className="item-callout-box item-info">
                                {renderCalloutHeader('info', block.title)}
                                <div
                                  className="item-callout-body"
                                  dangerouslySetInnerHTML={{ __html: renderMarkdown(block.text) }}
                                />
                              </div>
                            );
                          }
                          if (block.type === 'heading') {
                            const Tag = `h${block.level}` as 'h4' | 'h5' | 'h6';
                            const headingId =
                              block.level === 4
                                ? `${item.id}-h4-${++h4Index}`
                                : undefined;
                            return (
                              <Tag
                                key={index}
                                id={headingId}
                                className={`item-subheading-${block.level}`}
                              >
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