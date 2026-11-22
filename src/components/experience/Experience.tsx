import React, { useState } from 'react';
import { Experience as ExperienceType } from '../../types';

interface ExperienceProps {
  experiences: ExperienceType[];
  onImageClick: (src: string, alt: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ experiences, onImageClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };
  const getRoleSkills = (company: string): string[] => {
    if (company.includes('Great Sierra')) {
      return ['React', 'TypeScript', 'Python', 'SQL', 'Google Apps Script', 'REST APIs'];
    }
    if (company.includes('Integrated Bar')) {
      return ['HRIS System', 'AMS System', 'Ticketing API', 'IT Support'];
    }
    if (company.includes('Gym Facility')) {
      return ['Node.js', 'Express.js', 'MySQL', 'Firebase', 'Team Lead'];
    }
    if (company.includes('STI')) {
      return ['Software Engineering', 'DBMS', 'Web Development', 'Systems Integration'];
    }
    return [];
  };

  return (
    <section id="experience" className="section-card py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left: Title & Intro */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4 font-semibold">02 // HISTORY</p>
            <h2 className="font-display text-4xl font-normal mb-6">Experience.</h2>
            <p className="text-sm opacity-60 leading-relaxed">
              Full-time software engineering at Great Sierra Development Corporation, complemented by enterprise internship at IBP and academic foundation at STI College.
            </p>
          </div>

          {/* Right: Accordion Timeline Entries */}
          <div className="md:col-span-2 space-y-3">
            {experiences.map((exp, idx) => {
              let bullets: string[] = [];
              try {
                bullets = Array.isArray(exp.bullets) ? exp.bullets : JSON.parse(exp.bullets || '[]');
              } catch (_) {
                bullets = [];
              }

              const isOpen = openIndex === idx;
              const roleSkills = getRoleSkills(exp.company);

              return (
                <div
                  key={exp.id || idx}
                  className={`transition-all duration-200 overflow-hidden ${
                    isOpen ? 'neu-surface' : 'neu-surface-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleIndex(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`exp-panel-${idx}`}
                    className="w-full p-5 flex items-center gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                  >
                    {exp.logoUrl ? (
                      <img
                        src={exp.logoUrl}
                        alt={`${exp.company} Logo`}
                        loading="lazy"
                        decoding="async"
                        className="w-11 h-11 object-contain bg-white dark:bg-transparent p-1 rounded border border-ink/10 dark:border-cream/10 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 bg-accent/10 flex items-center justify-center text-accent font-semibold rounded text-sm border border-accent/20 flex-shrink-0">
                        {exp.company.substring(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <h3 className="text-sm sm:text-lg font-semibold text-accent leading-snug">{exp.company}</h3>
                        <span className="text-[11px] sm:text-xs opacity-55 font-mono flex-shrink-0">{exp.period}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold opacity-80 mt-0.5">{exp.role}</p>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`w-7 h-7 rounded-full border border-ink/15 dark:border-cream/15 flex items-center justify-center text-xs flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 border-accent text-accent' : 'opacity-60'
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`exp-panel-${idx}`}
                      className="px-5 pb-6 pt-2 border-t border-ink/10 dark:border-cream/10"
                    >
                      {/* Bullet points */}
                      <ul className="space-y-3 mb-4 mt-2">
                        {bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-3 text-sm opacity-75 leading-relaxed">
                            <span className="text-accent mt-1.5 w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Role Skills Tags */}
                      {roleSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4 mb-2">
                          {roleSkills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 border border-ink/15 dark:border-cream/15 text-[10px] opacity-75 rounded-sm font-mono"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Images showcase (if available) */}
                      {exp.images && exp.images.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                          {exp.images.map((img, iIdx) => (
                            <div
                              key={iIdx}
                              className="overflow-hidden border border-ink/10 dark:border-cream/10 group/img"
                            >
                              <div className="overflow-hidden h-40">
                                <img
                                  src={img.url}
                                  alt={img.caption}
                                  loading="lazy"
                                  decoding="async"
                                  onClick={() => onImageClick(img.url, img.caption)}
                                  className="previewable-img w-full h-full object-cover grayscale group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-500 cursor-zoom-in"
                                />
                              </div>
                              <div className="p-3 bg-ink/5 dark:bg-cream/5 border-t border-ink/10 dark:border-cream/10">
                                <p className="text-[10px] uppercase tracking-wider opacity-60 font-semibold mb-0.5">
                                  {img.caption}
                                </p>
                                <p className="text-[10px] opacity-40 leading-normal">{img.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
