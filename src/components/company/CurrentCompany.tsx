import React from 'react';

export const CurrentCompany: React.FC = () => {
  const focusAreas = [
    {
      label: 'Responsive Web Interfaces',
      detail: 'Building clean, responsive React & TypeScript UIs tailored for internal business and logistics tools.',
    },
    {
      label: 'Component Architecture',
      detail: 'Creating reusable, maintainable frontend components and design-system patterns for faster delivery.',
    },
    {
      label: 'API & Workflow Integration',
      detail: 'Connecting frontend dashboards to REST APIs, optimizing UX performance, and collaborating with stakeholders.',
    },
  ];

  const techTags = ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'REST APIs'];

  return (
    <section id="company" className="section-card py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3 font-semibold">
              02 // CURRENT COMPANY
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-normal leading-tight">
              Great Sierra Development <span className="italic text-accent">Corp.</span>
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] tracking-widest uppercase rounded-full self-start md:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>Full-Time · Jul 2026 — Present</span>
          </div>
        </div>

        {/* Main Company Showcase Card (Neumorphic) */}
        <div className="neu-surface overflow-hidden">
          {/* Top Identity Row */}
          <div className="p-6 sm:p-8 border-b border-ink/10 dark:border-cream/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-5">
              <img
                src="/image/gsdc.jpg"
                alt="Great Sierra Development Corporation Logo"
                loading="lazy"
                decoding="async"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-white p-2 rounded-md border border-ink/10 dark:border-cream/15 flex-shrink-0"
              />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold mb-1">
                  Frontend Developer
                </p>
                <h3 className="text-lg sm:text-xl font-semibold">Great Sierra Development Corporation (GSDC)</h3>
                <p className="text-xs opacity-65 mt-1 leading-relaxed max-w-xl">
                  Bulk trading &amp; distribution of construction materials (wholesale cement, gravel, and sand) with
                  transport and logistics operations across Metro Manila, Bulacan, and Valenzuela.
                </p>
              </div>
            </div>

            <a
              href="https://www.linkedin.com/company/great-sierra-development-corporation/"
              target="_blank"
              rel="noopener noreferrer"
              className="neu-btn px-5 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase hover:text-accent self-start md:self-center flex-shrink-0"
            >
              View on LinkedIn ↗
            </a>
          </div>

          {/* Company Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-ink/10 dark:border-cream/10 divide-y sm:divide-y-0 sm:divide-x divide-ink/10 dark:divide-cream/10">
            <div className="p-5">
              <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Industry</p>
              <p className="text-xs sm:text-sm font-medium">Construction Trading &amp; Logistics</p>
            </div>
            <div className="p-5">
              <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Headquarters</p>
              <p className="text-xs sm:text-sm font-medium">Araneta Center, Quezon City, PH</p>
            </div>
            <div className="p-5">
              <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Role Focus</p>
              <p className="text-xs sm:text-sm font-medium">Frontend Engineering &amp; UI/UX</p>
            </div>
          </div>

          {/* What I Build Here */}
          <div className="p-6 sm:p-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold mb-4">
              What I Build &amp; Maintain at GSDC
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {focusAreas.map((area) => (
                <div key={area.label} className="neu-inset p-4">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-accent mb-2">
                    {area.label}
                  </h4>
                  <p className="text-xs opacity-75 leading-relaxed">{area.detail}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-ink/10 dark:border-cream/10">
              {techTags.map((tag) => (
                <span
                  key={tag}
                  className="tech-pill px-2.5 py-1 border border-ink/15 dark:border-cream/15 text-[11px] rounded font-mono opacity-80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
