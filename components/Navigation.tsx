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

  // Close menu on escape key
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

  // Trap focus within menu when open
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

      {/* Navigation */}
      <nav
        className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-700"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red-600 rounded"
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
              />
              <span className="font-bold text-lg md:text-xl text-gray-900 dark:text-gray-100">
                Very Good Pizza
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="https://twitch.tv/verygoodpizza"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-6 py-2 bg-purple-600 text-white font-bold hover:bg-purple-700 rounded-lg transition-colors focus:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red-600"
                aria-label="Watch live on Twitch (opens in new tab)"
              >
                Watch Live
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red-600"
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
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
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
            className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            role="menu"
          >
            <div className="container mx-auto py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="block px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  role="menuitem"
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="https://twitch.tv/verygoodpizza"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 px-4 py-3 bg-purple-600 text-white text-lg font-bold text-center hover:bg-purple-700 rounded-lg transition-colors focus:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red-600"
                aria-label="Watch live on Twitch (opens in new tab)"
                role="menuitem"
              >
                Watch Live on Twitch
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
