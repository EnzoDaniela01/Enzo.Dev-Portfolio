import React from 'react';

interface Achievement {
  id: string;
  title: string;
  issuer: string;
  period: string;
  badge: string;
  description: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'cert-bsit',
    title: 'BS Information Technology',
    issuer: 'STI College Fairview',
    period: 'Jul 2026',
    badge: 'Degree',
    description:
      'Completed 4-year BSIT degree with focus on web development, software design, and systems integration.',
  },
  {
    id: 'cert-ibp',
    title: 'OJT Completion — Web Dev & IT Support',
    issuer: 'Integrated Bar of the Philippines (IBP)',
    period: 'Mar — May 2026',
    badge: 'Certificate',
    description:
      'Completed enterprise internship contributing to HRIS, Attendance Monitoring, and internal Ticketing systems.',
  },
  {
    id: 'cert-asean',
    title: 'ASEAN Summit Systems Deployment',
    issuer: 'IBP · Live Production Rollout',
    period: '2026',
    badge: 'Milestone',
    description:
      'Deployed real-time QR Attendance Monitoring System supporting summit delegates with 95% tracking accuracy.',
  },
];

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="section-card py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-accent mb-3 font-semibold">
              05 // CREDENTIALS
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight">Certifications &amp; Milestones.</h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest opacity-55">Verified Academic &amp; Field Track</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((item) => (
            <div key={item.id} className="neu-surface p-6 flex flex-col justify-between gap-5">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="neu-inset px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-mono opacity-55">{item.period}</span>
                </div>
                <h3 className="font-display text-base font-bold leading-snug mb-1.5">{item.title}</h3>
                <p className="text-xs font-mono text-accent/90 mb-3">{item.issuer}</p>
                <p className="text-xs opacity-70 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
