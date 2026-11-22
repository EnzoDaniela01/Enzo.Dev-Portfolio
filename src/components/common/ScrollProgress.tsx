import React, { useEffect, useRef } from 'react';

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const ratio = height > 0 ? Math.min(Math.max(winScroll / height, 0), 1) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${ratio})`;
      }
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={barRef}
      id="scrollProgress"
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-[3px] bg-accent z-[60] origin-left will-change-transform"
      style={{ transform: 'scaleX(0)' }}
    />
  );
};
