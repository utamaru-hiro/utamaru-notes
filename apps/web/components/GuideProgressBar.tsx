'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  slug: string;
};

export default function GuideProgressBar({ slug }: Props) {
  const storageKey = `guide-scroll-${slug}`;
  const [progress, setProgress] = useState(0);
  const [savedY, setSavedY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState(0);
  const throttleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 初回マウント: localStorage から前回位置を復元
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw !== null) {
      const y = parseInt(raw, 10);
      if (!Number.isNaN(y) && y > 200) {
        setSavedY(y);
        // 少し遅らせてページ描画後にスムーズスクロール
        const timer = setTimeout(() => {
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [storageKey]);

  const calcProgress = useCallback(() => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return 0;
    return Math.min(100, (window.scrollY / scrollable) * 100);
  }, []);

  // スクロールイベント: 進捗更新 + localStorage 保存（150ms throttle）
  useEffect(() => {
    const handler = () => {
      setCurrentY(window.scrollY);
      if (throttleRef.current) return;
      throttleRef.current = setTimeout(() => {
        setProgress(calcProgress());
        localStorage.setItem(storageKey, String(Math.round(window.scrollY)));
        throttleRef.current = null;
      }, 150);
    };

    // 初期 progress
    setProgress(calcProgress());
    setCurrentY(window.scrollY);

    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      if (throttleRef.current) clearTimeout(throttleRef.current);
    };
  }, [calcProgress, storageKey]);

  const handleResume = () => {
    if (savedY !== null) {
      window.scrollTo({ top: savedY, behavior: 'smooth' });
    }
  };

  // 前回位置より大幅に手前にいるときだけ「続きから読む」を表示
  const showResumeBtn = savedY !== null && savedY - currentY > 200;

  return (
    <div className="guide-progress-bar">
      <div className="guide-progress-track">
        <div className="guide-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="guide-progress-footer">
        {showResumeBtn && (
          <button
            type="button"
            className="guide-resume-btn"
            onClick={handleResume}
          >
            続きから読む
          </button>
        )}
        <span className="guide-progress-pct">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
