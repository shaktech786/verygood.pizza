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
    </div>
  );
}
