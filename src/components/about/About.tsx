import React, { useState } from 'react';
import { PortfolioConfig } from '../../types';

interface AboutProps {
  config: PortfolioConfig;
  onImageClick: (src: string, alt: string) => void;
}

const ACCENT_PRESETS = [
  { name: 'Terracotta', rgb: '200 82 42', hex: '#C8522A' },
  { name: 'Cobalt', rgb: '37 99 235', hex: '#2563EB' },
  { name: 'Emerald', rgb: '5 150 105', hex: '#059669' },
  { name: 'Violet', rgb: '124 58 237', hex: '#7C3AED' },
];

export const About: React.FC<AboutProps> = ({ config, onImageClick }) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [activeAccent, setActiveAccent] = useState<string>('Terracotta');

  const handleAccentChange = (preset: (typeof ACCENT_PRESETS)[number]) => {
    setActiveAccent(preset.name);
    document.documentElement.style.setProperty('--accent-rgb', preset.rgb);
  };

  const techStack = {
    frontend: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Material UI', 'JavaScript', 'HTML5 / CSS3'],
    tools: ['Antigravity', 'Codex', 'Claude', 'GitHub Copilot', 'Git / GitHub', 'Docker'],
    backend: ['Node.js', 'Express.js', 'SQL', 'MySQL', 'Supabase', 'Firebase'],
  };

  const renderTechPill = (tech: string) => {
    const isHighlighted = hoveredTech === tech.toLowerCase();
    return (
      <span
        key={tech}
        onMouseEnter={() => setHoveredTech(tech.toLowerCase())}
        onMouseLeave={() => setHoveredTech(null)}
        className={`tech-pill px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-default select-none ${
          isHighlighted ? 'neu-inset text-accent font-semibold' : 'neu-surface-sm'
        }`}
      >
        {tech}
      </span>
    );
  };

  return (
    <section id="about" className="section-card py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Column: Photo & Education Stats */}
          <div>
            <div className="relative inline-block group">
              <img
                src={config.profileImg || '/image/gradpic.jpg'}
                alt="Enzo P. Daniela"
                loading="lazy"
                decoding="async"
                onClick={() =>
                  onImageClick(config.profileImg || '/image/gradpic.jpg', 'Enzo P. Daniela')
                }
                className="previewable-img w-full max-w-xs grayscale hover:grayscale-0 transition-all duration-500 border border-ink/10 dark:border-cream/10 cursor-zoom-in"
              />
              <div className="absolute bottom-3 right-3 sm:-bottom-4 sm:-right-4 bg-accent text-white px-4 py-2 rounded-lg shadow-md">
                <p className="text-xs font-mono tracking-widest uppercase">{config.badgeText || 'Frontend Dev'}</p>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-4 py-3 border-t border-ink/10 dark:border-cream/10">
                <span className="text-xs tracking-widest uppercase opacity-40 w-20 flex-shrink-0">School</span>
                <span className="text-sm">{config.school || 'STI College Fairview'}</span>
              </div>
              <div className="flex items-center gap-4 py-3 border-t border-ink/10 dark:border-cream/10">
                <span className="text-xs tracking-widest uppercase opacity-40 w-20 flex-shrink-0">Course</span>
                <span className="text-sm">{config.course || 'BS Information Technology'}</span>
              </div>
              <div className="flex items-center gap-4 py-3 border-t border-ink/10 dark:border-cream/10">
                <span className="text-xs tracking-widest uppercase opacity-40 w-20 flex-shrink-0">Graduated</span>
                <span className="text-sm">{config.graduated || 'July 17, 2026'}</span>
              </div>
              <div className="flex items-center gap-4 py-3 border-t border-b border-ink/10 dark:border-cream/10">
                <span className="text-xs tracking-widest uppercase opacity-40 w-20 flex-shrink-0">Location</span>
                <span className="text-sm">{config.location || 'Caloocan City, PH'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Tech Stack & Simulation */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6 font-semibold">01 // ABOUT</p>
            <h2 className="font-display text-2xl leading-relaxed mb-6 font-normal">
              {config.aboutTitle || 'Backend-first developer who actually cares about how the data moves.'}
            </h2>
            <p className="text-sm leading-relaxed opacity-70 mb-4">
              {config.aboutText1 ||
                'BS Information Technology graduate with hands-on experience in web development through internship, academic, and personal projects. Focused on building robust server-side logic, RESTful APIs, and database operations.'}
            </p>
            <p className="text-sm leading-relaxed opacity-70 mb-12">
              {config.aboutText2 ||
                'Comfortable working on both solo and team-based projects. Uses AI-assisted tools like Claude and GitHub Copilot to accelerate development and support frontend implementation.'}
            </p>

            {/* Tech Stack */}
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-accent mb-6 font-semibold">Tech Stack</p>
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest opacity-55 mb-2.5">
                  Frontend &amp; UI Libraries
                </p>
                <div className="flex flex-wrap gap-2.5">{techStack.frontend.map(renderTechPill)}</div>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest opacity-55 mb-2.5">
                  AI &amp; Engineering Tools
                </p>
                <div className="flex flex-wrap gap-2.5">{techStack.tools.map(renderTechPill)}</div>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest opacity-55 mb-2.5">
                  Backend &amp; Data (Secondary)
                </p>
                <div className="flex flex-wrap gap-2.5">{techStack.backend.map(renderTechPill)}</div>
              </div>
            </div>

            {/* Interactive UI Accent Playground */}
            <div className="neu-inset p-5 mt-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-semibold">
                    Live UI Playground
                  </p>
                  <p className="text-xs opacity-65 mt-0.5">Test the portfolio&apos;s live Neumorphic accent token.</p>
                </div>
                <div className="flex items-center gap-2.5" role="group" aria-label="Accent color presets">
                  {ACCENT_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleAccentChange(preset)}
                      aria-label={`Switch accent to ${preset.name}`}
                      aria-pressed={activeAccent === preset.name}
                      title={preset.name}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                        activeAccent === preset.name ? 'neu-inset scale-110' : 'neu-btn hover:scale-105'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: preset.hex }}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
