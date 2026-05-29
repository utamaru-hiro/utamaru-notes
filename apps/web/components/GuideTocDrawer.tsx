'use client';

import { useState } from 'react';

type TocSection = {
  id: string;
  num: number;
  title: string;
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

        <nav>
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} onClick={closeDrawer}>
              {section.num}. {section.title}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}