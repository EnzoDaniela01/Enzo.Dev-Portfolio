import React, { useState } from 'react';
import { PortfolioConfig } from '../../types';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

interface ContactProps {
  config: PortfolioConfig;
}

export const Contact: React.FC<ContactProps> = ({ config }) => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'fallback'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      showToast('Please fill out all fields.', 'error');
      return;
    }

    setStatus('sending');

    const success = await api.sendContactMessage({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });

    if (success) {
      setStatus('success');
      showToast('Message sent successfully!', 'success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      // Fallback to mailto
      setStatus('fallback');
      showToast('Opening mail client...', 'info');
      setTimeout(() => {
        window.location.href = `mailto:${config.email || 'parane.enzo@gmail.com'}?subject=Inquiry from ${encodeURIComponent(
          trimmedName
        )}&body=${encodeURIComponent(trimmedMessage)}%0A%0AReply to: ${encodeURIComponent(trimmedEmail)}`;
        setName('');
        setEmail('');
        setMessage('');
        setStatus('idle');
      }, 1000);
    }
  };

  return (
    <section id="contact" className="section-card py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Headline & Minimalist Contact Form */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6 font-semibold">06 // LET'S TALK</p>
            <h2 className="font-display text-5xl font-normal mb-6 leading-tight">
              Open for
              <br />
              <span className="italic text-accent">work.</span>
            </h2>
            <p className="text-sm opacity-60 leading-relaxed mb-8 max-w-sm">
              {config.contactText ||
                "I am open for software development inquiries, systems integration, and full-stack collaborations. Feel free to reach out!"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mt-8 relative">
              <div className="relative">
                <input
                  type="text"
                  aria-label="Your Name"
                  autoComplete="name"
                  maxLength={100}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="neu-inset w-full px-4 py-3 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all duration-300 placeholder-ink/40 dark:placeholder-cream/40 text-ink dark:text-cream"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  aria-label="Your Email"
                  autoComplete="email"
                  maxLength={160}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="neu-inset w-full px-4 py-3 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all duration-300 placeholder-ink/40 dark:placeholder-cream/40 text-ink dark:text-cream"
                />
              </div>
              <div className="relative">
                <textarea
                  aria-label="Your Message"
                  maxLength={2000}
                  placeholder="Message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="neu-inset w-full px-4 py-3 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all duration-300 placeholder-ink/40 dark:placeholder-cream/40 resize-none text-ink dark:text-cream"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  status === 'success'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : status === 'sending' || status === 'fallback'
                    ? 'bg-accent text-white opacity-90 shadow-md'
                    : 'bg-accent text-white shadow-md hover:opacity-90 active:scale-[0.98]'
                }`}
              >
                <span>
                  {status === 'sending'
                    ? 'Sending...'
                    : status === 'success'
                    ? 'Message Saved!'
                    : status === 'fallback'
                    ? 'Opening Mail Client...'
                    : 'Send Message'}
                </span>
              </button>
            </form>
          </div>

          {/* Right: Direct Links & Resume CV Downloads */}
          <div className="space-y-0">
            <div className="flex flex-wrap items-center justify-between gap-2 py-5 border-t border-ink/10 dark:border-cream/10 group">
              <span className="text-xs uppercase tracking-widest opacity-40">Email</span>
              <div className="flex flex-wrap items-center gap-2.5 min-w-0">
                <a
                  href={`mailto:${config.email || 'parane.enzo@gmail.com'}`}
                  className="text-xs sm:text-sm group-hover:text-accent transition-colors break-all"
                >
                  {config.email || 'parane.enzo@gmail.com'} ↗
                </a>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(config.email || 'parane.enzo@gmail.com');
                    showToast('Email address copied!', 'success');
                  }}
                  title="Copy email to clipboard"
                  className="neu-btn text-[10px] uppercase font-mono px-2.5 py-1 rounded-md opacity-75 hover:opacity-100 hover:text-accent"
                >
                  Copy
                </button>
              </div>
            </div>

            <a
              href="https://www.linkedin.com/in/enzo-daniela-685374324/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-5 border-t border-ink/10 dark:border-cream/10 group"
            >
              <span className="text-xs uppercase tracking-widest opacity-40">LinkedIn</span>
              <span className="text-sm group-hover:text-accent transition-colors">Enzo Daniela ↗</span>
            </a>

            <a
              href="https://github.com/EnzoDaniela01"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-5 border-t border-ink/10 dark:border-cream/10 group"
            >
              <span className="text-xs uppercase tracking-widest opacity-40">GitHub</span>
              <span className="text-sm group-hover:text-accent transition-colors">EnzoDaniela01 ↗</span>
            </a>

            <a
              href="https://www.facebook.com/enzo.daniela.31/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-5 border-t border-b border-ink/10 dark:border-cream/10 group"
            >
              <span className="text-xs uppercase tracking-widest opacity-40">Facebook</span>
              <span className="text-sm group-hover:text-accent transition-colors">Enzo Daniela ↗</span>
            </a>

            <div className="pt-6">
              <div className="flex flex-wrap gap-3">
                <a
                  href="/doc/Enzo%20Daniela%20Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-btn px-5 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase hover:text-accent"
                >
                  View PDF
                </a>
                <a
                  href="/doc/Enzo%20Daniela%20Resume.pdf"
                  download="Enzo Daniela Resume.pdf"
                  className="neu-btn px-5 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase hover:text-accent"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
