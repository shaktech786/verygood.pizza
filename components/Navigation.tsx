'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          background: 'rgba(13, 17, 23, 0.95)',
          backdropFilter: 'blur(8px)',
          borderColor: 'var(--border)',
        }}
        role="navigation"
        aria-label="Main"
      >
        <div className="container">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2" aria-label="Home">
              <Image
                src="/logo.png"
                alt=""
                width={32}
                height={32}
                style={{ imageRendering: 'pixelated' }}
                aria-hidden="true"
              />
              <span className="font-black text-orange">VGP</span>
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href="https://twitch.tv/verygoodpizza"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-arcade text-sm py-2 px-4"
              >
                <span className="live-dot" />
                Watch Live
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            ref={menuRef}
            className="md:hidden border-t py-4"
            style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
          >
            <div className="container">
              <a
                href="https://twitch.tv/verygoodpizza"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-arcade w-full justify-center"
                onClick={() => setIsOpen(false)}
              >
                Watch Live
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
