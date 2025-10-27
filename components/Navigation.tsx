'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { name: 'Schedule', href: '#schedule' },
  { name: 'Content', href: '#content' },
  { name: 'Community', href: '#community' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    const focusableElements = menu.querySelectorAll(
      'a[href], button:not([disabled])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    menu.addEventListener('keydown', handleTab);
    return () => menu.removeEventListener('keydown', handleTab as EventListener);
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Skip Navigation Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation with Gaming Style */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md neon-border"
        style={{borderColor: 'var(--neon-cyan)', borderWidth: '0 0 2px 0'}}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-20 px-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 hover-glow"
              aria-label="Very Good Pizza - Home"
            >
              <Image
                src="/logo.png"
                alt=""
                width={48}
                height={48}
                className="h-10 w-auto md:h-12"
                priority
                aria-hidden="true"
                style={{imageRendering: 'pixelated'}}
              />
              <span className="font-black text-lg md:text-xl uppercase tracking-wider neon-glow" style={{
                color: 'var(--neon-pink)',
                textShadow: '0 0 10px var(--neon-pink)'
              }}>
                VGP
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-6 py-2 font-bold text-sm uppercase tracking-wider hover-glow transition-all duration-300"
                  style={{
                    color: 'var(--neon-cyan)',
                    textShadow: '0 0 5px var(--neon-cyan)'
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="https://twitch.tv/verygoodpizza"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-6 py-2 font-black text-sm uppercase tracking-wider pulse-glow"
                style={{
                  background: 'linear-gradient(45deg, var(--neon-pink), var(--neon-cyan))',
                  color: '#000',
                  borderRadius: '0.25rem'
                }}
                aria-label="Watch live on Twitch (opens in new tab)"
              >
                LIVE
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover-glow transition-all duration-300 neon-border"
              style={{borderColor: 'var(--neon-pink)'}}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{color: 'var(--neon-cyan)'}}
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            ref={menuRef}
            id="mobile-menu"
            className="md:hidden border-t-2 bg-black/95 backdrop-blur-md"
            style={{borderColor: 'var(--neon-pink)'}}
            role="menu"
          >
            <div className="container mx-auto py-4 space-y-2 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="block px-6 py-4 text-lg font-bold uppercase tracking-wider hover-glow transition-all duration-300 neon-border"
                  style={{
                    color: 'var(--neon-cyan)',
                    borderColor: 'var(--neon-cyan)',
                    borderWidth: '2px 0'
                  }}
                  role="menuitem"
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="https://twitch.tv/verygoodpizza"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 px-6 py-4 text-lg font-black text-center uppercase tracking-wider pulse-glow"
                style={{
                  background: 'linear-gradient(45deg, var(--neon-pink), var(--neon-cyan))',
                  color: '#000',
                  borderRadius: '0.5rem'
                }}
                aria-label="Watch live on Twitch (opens in new tab)"
                role="menuitem"
              >
                WATCH LIVE
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to account for fixed nav */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}
