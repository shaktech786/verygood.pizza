'use client';

import Image from 'next/image';
import { LiveStatus } from '@/components/LiveStatus';
import { CommonPhrases } from '@/components/CommonPhrases';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-dark via-purple-mid to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-neon-pink rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-neon-cyan rounded-full filter blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-green rounded-full filter blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Scan Lines Effect */}
      <div className="scanlines absolute inset-0 pointer-events-none"></div>

      {/* Hero Section */}
      <main id="main-content" className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Logo with Float Animation */}
        <div className="flex justify-center mb-8 float-animation">
          <div className="relative">
            <div className="absolute inset-0 bg-neon-pink opacity-50 filter blur-2xl rounded-full"></div>
            <Image
              src="/logo.png"
              alt="Very Good Pizza mascot - pixel art character holding pizza"
              width={280}
              height={280}
              className="w-56 h-56 md:w-72 md:h-72 object-contain relative z-10 hover-glow"
              priority
              style={{imageRendering: 'pixelated'}}
            />
          </div>
        </div>

        {/* Main Heading with Neon Glow */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase mb-6 neon-glow" style={{
            color: 'var(--neon-cyan)',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            textShadow: '0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan), 0 0 30px var(--neon-cyan), 0 0 40px var(--neon-pink), 0 0 70px var(--neon-pink)'
          }}>
            VERY GOOD
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase mb-8 neon-glow glitch" style={{
            color: 'var(--neon-pink)',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            textShadow: '0 0 10px var(--neon-pink), 0 0 20px var(--neon-pink), 0 0 30px var(--neon-pink), 0 0 40px var(--neon-cyan), 0 0 70px var(--neon-cyan)'
          }}>
            PIZZA
          </h1>
          <p className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-6 neon-glow" style={{
            color: 'var(--neon-green)',
            textShadow: '0 0 10px var(--neon-green), 0 0 20px var(--neon-green)'
          }}>
            It&apos;s Gaming. Not DiGiorno.
          </p>
        </div>

        {/* Description with Gaming Style */}
        <div className="max-w-3xl mx-auto text-center mb-10 bg-black/40 backdrop-blur-md p-8 rounded-lg neon-border" style={{borderColor: 'var(--neon-cyan)'}}>
          <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium">
            Welcome to the VGP universe! We serve nostalgia-fueled gaming, epic beatboxing sessions,
            and a chill community to vibe with. Grab a slice and join the fun!
          </p>
        </div>

        {/* Live Status */}
        <div className="flex justify-center mb-12">
          <LiveStatus />
        </div>

        {/* CTA Button with Gaming Style */}
        <div className="flex justify-center mb-20">
          <a
            href="https://twitch.tv/verygoodpizza"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 px-12 py-5 text-xl md:text-2xl font-black uppercase overflow-hidden hover-glow pulse-glow"
            style={{
              background: 'linear-gradient(45deg, var(--neon-pink), var(--neon-cyan))',
              color: '#000',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            aria-label="Watch Very Good Pizza live on Twitch (opens in new tab)"
          >
            <span className="relative z-10">WATCH LIVE</span>
            <svg
              className="w-8 h-8 relative z-10 group-hover:animate-bounce"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-yellow to-neon-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>

        {/* Social Links with Gaming Cards */}
        <section
          className="border-t-4 pt-16"
          style={{borderImage: 'linear-gradient(to right, var(--neon-pink), var(--neon-cyan), var(--neon-green)) 1'}}
          aria-labelledby="social-heading"
        >
          <h2 id="social-heading" className="text-4xl md:text-5xl font-black text-center uppercase mb-12 neon-glow" style={{
            color: 'var(--neon-yellow)',
            textShadow: '0 0 10px var(--neon-yellow), 0 0 20px var(--neon-yellow)'
          }}>
            CONNECT WITH US
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'TWITCH', url: 'https://twitch.tv/verygoodpizza', icon: '🎮', color: 'var(--neon-pink)' },
              { name: 'TIKTOK', url: 'https://www.tiktok.com/@verygood.pizza', icon: '📱', color: 'var(--neon-cyan)' },
              { name: 'INSTAGRAM', url: 'https://www.instagram.com/verygoodpizzaofficial', icon: '📷', color: 'var(--neon-green)' },
              { name: 'FACEBOOK', url: 'https://facebook.com/verygoodpizza', icon: '👍', color: 'var(--neon-yellow)' },
              { name: 'THREADS', url: 'https://threads.net/@verygoodpizzaofficial', icon: '🧵', color: 'var(--neon-orange)' },
              { name: 'BLUESKY', url: 'https://bsky.app/profile/verygood.pizza', icon: '🦋', color: 'var(--neon-pink)' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-6 bg-black/60 backdrop-blur-md hover:bg-black/80 transition-all duration-300 hover-glow neon-border"
                style={{borderColor: social.color}}
                aria-label={`Follow Very Good Pizza on ${social.name} (opens in new tab)`}
              >
                <span className="text-5xl group-hover:scale-125 transition-transform duration-300" aria-hidden="true">{social.icon}</span>
                <span className="font-black text-sm uppercase tracking-wider" style={{color: social.color}}>{social.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Common Phrases Section */}
        <section
          className="border-t-4 pt-16 mt-16"
          style={{borderImage: 'linear-gradient(to right, var(--neon-green), var(--neon-pink), var(--neon-cyan)) 1'}}
          aria-labelledby="phrases-heading"
        >
          <CommonPhrases />
        </section>
      </main>

      {/* Merch Section */}
      <section
        className="relative py-20 mt-20 border-t-4"
        style={{
          borderImage: 'linear-gradient(to right, var(--neon-cyan), var(--neon-pink), var(--neon-yellow)) 1',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 50%)'
        }}
        aria-labelledby="merch-heading"
      >
        <div className="container mx-auto px-4 relative z-10">
          <h2 id="merch-heading" className="text-4xl md:text-5xl font-black text-center uppercase mb-12 neon-glow" style={{
            color: 'var(--neon-pink)',
            textShadow: '0 0 10px var(--neon-pink), 0 0 20px var(--neon-pink)'
          }}>
            OFFICIAL MERCH
          </h2>
          <div className="max-w-md mx-auto bg-black/60 backdrop-blur-md p-8 neon-border hover-glow" style={{borderColor: 'var(--neon-cyan)'}}>
            <div className="w-full h-80 bg-gradient-to-br from-purple-mid to-black rounded-lg flex items-center justify-center mb-6 overflow-hidden relative">
              <span className="text-8xl absolute" aria-hidden="true">🧢</span>
              <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/20 to-transparent"></div>
            </div>
            <p className="text-center text-lg font-bold uppercase tracking-wider" style={{color: 'var(--neon-green)'}}>
              Powered by Limitlesswear
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
