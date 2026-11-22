import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let posX = -100;
    let posY = -100;
    let animFrameId: number | null = null;
    let isVisible = false;

    const animate = () => {
      posX += (mouseX - posX) * 0.15;
      posY += (mouseY - posY) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;
      }
      if (Math.abs(mouseX - posX) > 0.2 || Math.abs(mouseY - posY) > 0.2) {
        animFrameId = requestAnimationFrame(animate);
      } else {
        animFrameId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        posX = mouseX;
        posY = mouseY;
        cursorRef.current?.classList.remove('opacity-0');
        dotRef.current?.classList.remove('opacity-0');
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (animFrameId === null) {
        animFrameId = requestAnimationFrame(animate);
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      cursorRef.current?.classList.add('opacity-0');
      dotRef.current?.classList.add('opacity-0');
    };

    const hoverSelector = 'a, button, input, textarea, .previewable-img, .filter-btn, #themeToggle, .tech-pill, .interactive-card';

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(hoverSelector);
      if (target && cursorRef.current) {
        cursorRef.current.classList.add('w-12', 'h-12', 'bg-accent/10');
        cursorRef.current.classList.remove('w-8', 'h-8');
        if (target.classList.contains('previewable-img') || target.id === 'themeToggle') {
          cursorRef.current.classList.add('border-dashed');
        } else {
          cursorRef.current.classList.remove('border-dashed');
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(hoverSelector);
      if (target && cursorRef.current) {
        cursorRef.current.classList.remove('w-12', 'h-12', 'bg-accent/10', 'border-dashed');
        cursorRef.current.classList.add('w-8', 'h-8');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[100] opacity-0 transition-[width,height,opacity,background-color] duration-200 ease-out will-change-transform"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[100] opacity-0 transition-opacity duration-200 will-change-transform"
      />
    </>
  );
};
