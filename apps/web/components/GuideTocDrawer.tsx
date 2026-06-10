'use client';

import Link from 'next/link';
import { useState } from 'react';

type TocSection = {
  id: string;
  num: number;
  title: string;
  h3: {
    id: string;
    title: string;
    h4: {
      id: string;
      title: string;
    }[];
  }[];
};

type GuideTocDrawerProps = {
  sections: TocSection[];
};

export default function GuideTocDrawer({ sections }: GuideTocDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="toc-mobile-trigger-wrap">
        <button
          type="button"
          className="toc-mobile-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="目次を開く"
        >
          <span className="toc-mobile-trigger-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <button
        type="button"
        className={`toc-overlay ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={closeDrawer}
      />

      <aside className={`toc-drawer section-card ${isOpen ? 'is-open' : ''}`}>
        <Link href="/" className="toc-back-link" onClick={closeDrawer}>
          ← 一覧へ戻る
        </Link>

        <div className="toc-drawer-header">
          <p className="guide-sidebar-title">Contents</p>
          <button
            type="button"
            className="toc-close"
            onClick={closeDrawer}
            aria-label="目次を閉じる"
          >
            ×
          </button>
        </div>

        <nav className="toc-nav">
          {sections.map((section) => (
            <div key={section.id} className="toc-group">
              <a className="toc-link toc-link-h2" href={`#${section.id}`} onClick={closeDrawer}>
                {section.title}
              </a>

              {section.h3.map((item) => (
                <div key={item.id} className="toc-subgroup">
                  <a className="toc-link toc-link-h3" href={`#${item.id}`} onClick={closeDrawer}>
                    {item.title}
                  </a>

                  {item.h4.map((heading) => (
                    <a
                      key={heading.id}
                      className="toc-link toc-link-h4"
                      href={`#${heading.id}`}
                      onClick={closeDrawer}
                    >
                      {heading.title}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}