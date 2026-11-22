import React, { useEffect, useRef, useState } from 'react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const progressPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? Math.min(Math.max((winScroll / height) * 100, 0), 100) : 0;

      if (progressPathRef.current) {
        progressPathRef.current.setAttribute('stroke-dasharray', `${scrolled}, 100`);
      }
      setVisible((prev) => {
        const next = winScroll > 300;
        return prev === next ? prev : next;
      });
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

  const scrollToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <button
      id="backToTop"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full border border-ink/10 dark:border-cream/10 bg-cream/90 dark:bg-ink/90 backdrop-blur-sm flex items-center justify-center text-ink dark:text-cream shadow-md transition-all duration-300 hover:border-accent hover:text-accent group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg className="w-10 h-10 absolute inset-0 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
        <path
          className="text-ink/5 dark:text-cream/5"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          ref={progressPathRef}
          className="text-accent"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="0, 100"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <span className="text-sm transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true">↑</span>
    </button>
  );
};
