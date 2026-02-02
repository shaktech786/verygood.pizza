import Image from 'next/image';
import { LiveStatus } from '@/components/LiveStatus';
import { CommonPhrases } from '@/components/CommonPhrases';
import { DiscordIcon } from '@/components/icons';

export default function Home() {
  return (
    <div className="min-h-screen relative z-10">
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
            href="/discord"
            target="_blank"
            rel="noopener noreferrer"
            className="block pizza-box pizza-box-discord p-6 md:p-8 text-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <DiscordIcon className="w-8 h-8 md:w-10 md:h-10" fill="#5865F2" />
              <h2 id="discord-heading" className="heading-chunky text-2xl md:text-3xl m-0">
                Join the Community
              </h2>
            </div>
            <p className="text-muted text-base md:text-lg mb-4">
              Hang out with fellow pizza lovers, chat during streams, and be part of the crew.
            </p>
            <span className="btn-arcade inline-flex" style={{ background: '#5865F2', borderColor: '#4752C4' }}>
              <DiscordIcon className="w-5 h-5" />
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
              { name: 'Discord', url: '/discord', icon: '💬' },
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

        {/* SoundPad Pro */}
        <section className="mb-16 max-w-2xl mx-auto" aria-labelledby="soundpad-heading">
          <p className="text-sm font-bold text-center uppercase tracking-widest mb-4" style={{ color: '#8b5cf6' }}>
            Free Download
          </p>
          <div className="soundpad-card p-6 md:p-8">
            <span className="soundpad-badge">100% Free</span>
            <div className="flex flex-col items-center gap-3 mb-2">
              <div className="soundpad-logo-glow">
                <Image
                  src="/soundpad-pro-icon.png"
                  alt="SoundPad Pro logo"
                  width={80}
                  height={80}
                  className="w-18 h-18 md:w-20 md:h-20 rounded-2xl"
                />
              </div>
              <h2 id="soundpad-heading" className="heading-chunky text-3xl md:text-4xl m-0" style={{ color: '#8b5cf6' }}>
                SoundPad Pro
              </h2>
              <p className="text-sm text-center m-0" style={{ color: '#a78bfa' }}>
                Built by VGP for the FGC community
              </p>
            </div>
            <p className="text-muted text-base md:text-lg text-center mb-6 mt-4 leading-relaxed">
              Turn your leverless or hitbox controller into a full soundboard for streams.
              Map sounds to every button, trigger OBS scene switches, and control LiveSplit —
              all from your fight stick.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: '🎮', label: 'Gamepad Support' },
                { icon: '🔊', label: 'Soundboard' },
                { icon: '📡', label: 'OBS Integration' },
                { icon: '⏱️', label: 'LiveSplit' },
              ].map((feature) => (
                <div key={feature.label} className="soundpad-feature">
                  <span aria-hidden="true">{feature.icon}</span>
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://github.com/shaktech786/soundpad-pro/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-arcade btn-arcade-purple soundpad-btn-glow"
                aria-label="Download SoundPad Pro (opens GitHub releases in new tab)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Free
              </a>
              <a
                href="https://github.com/shaktech786/soundpad-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary btn-secondary-purple"
                aria-label="View SoundPad Pro source code on GitHub (opens in new tab)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Source Code
              </a>
            </div>
            <p className="text-xs text-muted text-center mt-5 mb-0">
              Open source &bull; Windows &bull; v2.11.0
            </p>
          </div>
        </section>

        <div className="divider" />

        {/* Phrases Section */}
        <section aria-labelledby="phrases-heading">
          <CommonPhrases />
        </section>

      </main>
    </div>
  );
}
