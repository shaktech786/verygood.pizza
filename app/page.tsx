'use client';

import Image from 'next/image';
import { LiveStatus } from '@/components/LiveStatus';
import { CommonPhrases } from '@/components/CommonPhrases';

export default function Home() {
  return (
    <div className="min-h-screen relative z-10">
      {/* Hero */}
      <main id="main-content" className="container pt-8 pb-20">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo.png"
            alt="Very Good Pizza mascot"
            width={180}
            height={180}
            className="w-36 h-36 md:w-44 md:h-44 mb-4"
            priority
            style={{ imageRendering: 'pixelated' }}
          />

          <h1 className="heading-chunky heading-shadow text-5xl md:text-7xl text-center mb-2">
            Very Good Pizza
          </h1>

          <p className="text-lg md:text-xl text-muted text-center">
            It&apos;s Gaming. Not DiGiorno.
          </p>
        </div>

        {/* Live Status */}
        <div className="flex justify-center mb-8">
          <LiveStatus />
        </div>

        {/* Main CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="https://twitch.tv/verygoodpizza"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-arcade"
            aria-label="Watch on Twitch (opens in new tab)"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
            </svg>
            Watch Live
          </a>
        </div>

        {/* About Box */}
        <div className="pizza-box p-6 md:p-8 max-w-2xl mx-auto mb-16">
          <p className="text-base md:text-lg text-center leading-relaxed text-muted m-0">
            Welcome to the VGP universe! Nostalgia-fueled gaming, epic beatboxing,
            and an open community. Grab a slice and hang out.
          </p>
        </div>

        {/* Discord Community Banner */}
        <section className="mb-16 max-w-2xl mx-auto" aria-labelledby="discord-heading">
          <a
            href="https://discord.verygood.pizza"
            target="_blank"
            rel="noopener noreferrer"
            className="block pizza-box p-6 md:p-8 text-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ borderTopColor: '#5865F2' }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="#5865F2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <h2 id="discord-heading" className="heading-chunky text-2xl md:text-3xl m-0">
                Join the Community
              </h2>
            </div>
            <p className="text-muted text-base md:text-lg mb-4">
              Hang out with fellow pizza lovers, chat during streams, and be part of the crew.
            </p>
            <span className="btn-arcade inline-flex" style={{ background: '#5865F2', borderColor: '#4752C4' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join Discord
            </span>
          </a>
        </section>

        {/* Social Grid */}
        <section className="mb-16" aria-labelledby="social-heading">
          <h2 id="social-heading" className="text-xl font-bold text-center mb-6">
            Find Us Everywhere
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 max-w-3xl mx-auto">
            {[
              { name: 'Twitch', url: 'https://twitch.tv/verygoodpizza', icon: '🎮' },
              { name: 'Discord', url: 'https://discord.verygood.pizza', icon: '💬' },
              { name: 'TikTok', url: 'https://www.tiktok.com/@verygood.pizza', icon: '📱' },
              { name: 'Instagram', url: 'https://www.instagram.com/verygoodpizzaofficial', icon: '📸' },
              { name: 'Facebook', url: 'https://facebook.com/verygoodpizza', icon: '👍' },
              { name: 'Threads', url: 'https://threads.net/@verygoodpizzaofficial', icon: '🧵' },
              { name: 'Bluesky', url: 'https://bsky.app/profile/verygood.pizza', icon: '🦋' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={`${social.name} (opens in new tab)`}
              >
                <span aria-hidden="true">{social.icon}</span>
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* Phrases Section */}
        <section aria-labelledby="phrases-heading">
          <CommonPhrases />
        </section>

        <div className="divider" />

        {/* Merch */}
        <section className="text-center" aria-labelledby="merch-heading">
          <h2 id="merch-heading" className="text-xl font-bold mb-6">
            Official Merch
          </h2>
          <div className="pizza-box inline-block p-6">
            <div className="w-32 h-32 flex items-center justify-center mb-3">
              <span className="text-6xl">🧢</span>
            </div>
            <p className="text-sm text-muted m-0">
              Coming soon via Limitlesswear
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8">
        <div className="container text-center">
          <p className="text-sm text-muted m-0">
            © {new Date().getFullYear()} Very Good Pizza · Made with 🍕
          </p>
        </div>
      </footer>
    </div>
  );
}
