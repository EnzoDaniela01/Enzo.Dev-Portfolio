import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const HOME_ROUTES = ['/', '/about', '/company', '/projects', '/gallery', '/experience', '/testimonials', '/contact'];

interface NavbarProps {
  activeSection?: string;
  onNavigateSection?: (sectionId: string) => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigateSection,
  onOpenCommandPalette,
}) => {
  const { toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', sectionId: 'about' },
    { label: 'Company', sectionId: 'company' },
    { label: 'Experience', sectionId: 'experience' },
    { label: 'Work', sectionId: 'projects' },
    { label: 'Gallery', sectionId: 'gallery' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  const isHomeRoute = HOME_ROUTES.includes(location.pathname);

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (!isHomeRoute) {
      navigate(`/${sectionId}`);
      return;
    }

    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/${sectionId}`);
      }
    }
  };

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 z-50 neu-surface backdrop-blur-md transition-all duration-300"
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            if (isHomeRoute) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.pushState(null, '', '/');
            } else {
              navigate('/');
            }
          }}
          className="text-xs tracking-widest uppercase font-mono font-semibold text-accent"
        >
          enzo.daniela
        </a>

        <div className="flex items-center gap-3 sm:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.sectionId}
              href={`/${link.sectionId}`}
              onClick={(e) => handleLinkClick(e, link.sectionId)}
              className={`nav-link text-xs tracking-wider uppercase transition-all duration-200 hidden sm:block ${
                activeSection === link.sectionId
                  ? 'text-accent opacity-100 font-semibold'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Command Palette Button */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              title="Search & Commands (Cmd+K / Ctrl+K)"
              aria-label="Open command palette"
              className="neu-btn flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono rounded-lg opacity-80 hover:opacity-100 hover:text-accent"
            >
              <span className="opacity-60 text-[10px]">⌘</span>
              <span className="hidden sm:inline text-[10px]">K</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            id="themeToggle"
            onClick={toggleTheme}
            className="neu-btn relative w-8 h-8 flex items-center justify-center rounded-full group overflow-hidden"
            aria-label="Toggle theme"
          >
            {/* Sun Icon */}
            <svg
              id="sunIcon"
              className="w-3.5 h-3.5 absolute transition-all duration-500 transform rotate-90 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100 group-hover:rotate-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm0 15a5 5 0 100-10 5 5 0 000 10zm7.07-12.07a1 1 0 010 1.41l-.71.71a1 1 0 01-1.41-1.41l.71-.71a1 1 0 011.41 0zM21 11h1a1 1 0 010 2h-1a1 1 0 010-2zM4.93 4.93a1 1 0 011.41 0l.71.71a1 1 0 01-1.41 1.41l-.71-.71a1 1 0 010-1.41zM3 11h1a1 1 0 010 2H3a1 1 0 010-2zm15.36 7.07l-.71-.71a1 1 0 011.41-1.41l.71.71a1 1 0 01-1.41 1.41zM12 20a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zm-7.07-1.93a1 1 0 010-1.41l.71-.71a1 1 0 011.41 1.41l-.71.71a1 1 0 01-1.41 0z" />
            </svg>

            {/* Moon Icon */}
            <svg
              id="moonIcon"
              className="w-3.5 h-3.5 absolute transition-all duration-500 transform rotate-0 scale-100 opacity-100 dark:-rotate-90 dark:scale-0 dark:opacity-0 group-hover:-rotate-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="sm:hidden w-7 h-7 flex flex-col items-center justify-center gap-1 rounded-md border border-ink/20 dark:border-cream/20 hover:border-accent transition-colors"
          >
            <span
              className={`w-3.5 h-0.5 bg-current transition-transform duration-200 ${
                mobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`w-3.5 h-0.5 bg-current transition-opacity duration-200 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-3.5 h-0.5 bg-current transition-transform duration-200 ${
                mobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-ink/10 dark:border-cream/10 px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.sectionId}
              href={`/${link.sectionId}`}
              onClick={(e) => handleLinkClick(e, link.sectionId)}
              className={`text-xs tracking-widest uppercase py-1 transition-colors ${
                activeSection === link.sectionId
                  ? 'text-accent font-semibold'
                  : 'opacity-70 hover:opacity-100 hover:text-accent'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
