import React, { useState } from 'react';
import { PortfolioConfig } from '../../types';
import { useToast } from '../../context/ToastContext';

interface HeroProps {
  config: PortfolioConfig;
  liveProjectCount?: number;
}

export const Hero: React.FC<HeroProps> = ({ config, liveProjectCount }) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    const email = config.email || 'parane.enzo@gmail.com';
    navigator.clipboard.writeText(email);
    setCopied(true);
    showToast(`Copied ${email} to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      window.history.pushState(null, '', `/${id}`);
    }
  };

  return (
    <section className="section-card section-card--hero halftone-bg min-h-screen flex flex-col justify-center pt-28 pb-0 px-6">
      <div className="max-w-5xl mx-auto w-full">
        {/* Live Availability Status Pill & Label */}
        <div className="animate-fade-up stagger-1 flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] tracking-wider uppercase rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>Frontend Developer @ Great Sierra Dev Corp · Open for select collaborations</span>
          </div>
          <span className="text-xs opacity-40 font-mono hidden sm:inline">•</span>
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-semibold">
            {config.heroLabel || 'Portfolio — 2026'}
          </p>
        </div>

        {/* Big editorial headline (immediately visible for optimal LCP) */}
        <div>
          <h1 className="font-display text-[clamp(3rem,10vw,8rem)] leading-none font-normal tracking-tight mb-2">
            <span>{config.heroName1 || 'Enzo'}</span>
            <br />
            <span className="italic text-accent">{config.heroName2 || 'Daniela.'}</span>
          </h1>
        </div>

        {/* Divider + inline-pill bio + CTA row */}
        <div className="animate-fade-up stagger-3 flex flex-col sm:flex-row sm:items-end gap-6 mt-8 pb-8">
          <div className="max-w-lg space-y-4">
            <p className="text-sm sm:text-base leading-relaxed opacity-85">
              Frontend Developer &amp; UI/UX Engineer at{' '}
              <button
                type="button"
                onClick={() => scrollToSection('company')}
                className="neu-btn inline-flex items-center px-2.5 py-0.5 mx-0.5 rounded-full text-accent text-xs font-semibold"
              >
                GSDC
              </button>{' '}
              building modern{' '}
              <span className="neu-surface-sm inline-flex items-center px-2.5 py-0.5 mx-0.5 rounded-full text-xs font-mono">
                React
              </span>{' '}
              &amp;{' '}
              <span className="neu-surface-sm inline-flex items-center px-2.5 py-0.5 mx-0.5 rounded-full text-xs font-mono">
                TypeScript
              </span>{' '}
              interfaces with{' '}
              <span className="neu-surface-sm inline-flex items-center px-2.5 py-0.5 mx-0.5 rounded-full text-xs font-mono">
                shadcn/ui
              </span>
              ,{' '}
              <span className="neu-surface-sm inline-flex items-center px-2.5 py-0.5 mx-0.5 rounded-full text-xs font-mono">
                Material UI
              </span>
              , and AI tools like{' '}
              <span className="neu-surface-sm inline-flex items-center px-2.5 py-0.5 mx-0.5 rounded-full text-xs font-mono">
                Antigravity
              </span>{' '}
              &amp;{' '}
              <span className="neu-surface-sm inline-flex items-center px-2.5 py-0.5 mx-0.5 rounded-full text-xs font-mono">
                Codex
              </span>
              .
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono uppercase tracking-widest opacity-65">
              <a
                href="https://github.com/EnzoDaniela01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent hover:opacity-100 transition-colors"
              >
                github ↗
              </a>
              <a
                href="https://www.linkedin.com/in/enzo-daniela-685374324/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent hover:opacity-100 transition-colors"
              >
                linkedin ↗
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="hover:text-accent hover:opacity-100 transition-colors uppercase"
              >
                contact ↓
              </button>
            </div>
          </div>

          <div className="sm:ml-auto flex flex-wrap gap-3">
            <button
              onClick={handleCopyEmail}
              className="px-5 py-3 rounded-xl bg-accent text-white text-xs font-mono tracking-widest uppercase shadow-md hover:opacity-90 active:scale-[0.98] transition-all inline-flex items-center gap-2"
            >
              <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
            </button>
            <a
              href="/doc/Enzo%20Daniela%20Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="neu-btn px-5 py-3 rounded-xl text-xs font-mono tracking-widest uppercase hover:text-accent"
            >
              Resume PDF ↗
            </a>
          </div>
        </div>

        {/* Interactive Neumorphic Quick Stats row */}
        <div className="animate-fade-up stagger-4 grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8">
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="neu-btn group text-left p-5 rounded-2xl"
          >
            <p className="font-display text-3xl sm:text-4xl font-bold text-accent group-hover:translate-x-0.5 transition-transform">
              {liveProjectCount ? `${liveProjectCount}+` : '5+'}
            </p>
            <p className="text-[11px] font-mono uppercase tracking-widest opacity-60 group-hover:opacity-100 mt-1">
              Live Systems ↗
            </p>
          </button>
          <div className="neu-inset p-5 rounded-2xl">
            <p className="font-display text-3xl sm:text-4xl font-bold text-accent">4+yr</p>
            <p className="text-[11px] font-mono uppercase tracking-widest opacity-60 mt-1">Coding</p>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection('company')}
            className="neu-btn group text-left p-5 rounded-2xl"
          >
            <p className="font-display text-3xl sm:text-4xl font-bold text-accent group-hover:translate-x-0.5 transition-transform">
              GSDC
            </p>
            <p className="text-[11px] font-mono uppercase tracking-widest opacity-60 group-hover:opacity-100 mt-1">
              Frontend Dev ↗
            </p>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('experience')}
            className="neu-btn group text-left p-5 rounded-2xl"
          >
            <p className="font-display text-3xl sm:text-4xl font-bold text-accent group-hover:translate-x-0.5 transition-transform">
              BS
            </p>
            <p className="text-[11px] font-mono uppercase tracking-widest opacity-60 group-hover:opacity-100 mt-1">
              IT Degree ↗
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};
