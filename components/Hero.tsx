'use client';

import { LiveStatus } from './LiveStatus';

export function Hero() {
  return (
    <section className="min-h-screen flex items-start justify-start px-4 sm:px-6 md:px-12 pt-44 pb-16 sm:pt-48 sm:pb-20 md:pt-56 md:pb-32 relative overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#ff0000 1px, transparent 1px), linear-gradient(90deg, #ff0000 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="space-y-12 sm:space-y-16 md:space-y-24 lg:space-y-32">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-[clamp(2.5rem,12vw,10rem)] font-black leading-[0.9] tracking-tighter break-words">
              VERY<br />
              GOOD<br />
              <span className="text-[#ff0000]">PIZZA</span>
            </h1>
          </div>

          {/* Tagline */}
          <div className="border-l-4 border-[#0047ab] pl-6 sm:pl-8 md:pl-12 py-4 md:py-6">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide leading-[1.4]">
              IT&apos;S GAMING.<br />
              NOT DIGIORNO.
            </p>
          </div>

          {/* Description */}
          <div className="max-w-3xl">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.8] text-gray-300">
              Nostalgia-fueled gaming streams, epic beatboxing, and a chill community.
              Watch retro games, hear sick beats, vibe with good people.
            </p>
          </div>

          {/* Live Status */}
          <div className="border-t-2 border-[#6b21a8] pt-10 sm:pt-12 md:pt-16 lg:pt-20">
            <LiveStatus />
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-8 pt-6 md:pt-8">
            <a
              href="https://twitch.tv/verygoodpizza"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-[#ff0000] text-black font-bold text-base sm:text-lg md:text-xl uppercase tracking-wide hover:bg-[#6b21a8] hover:text-white border-4 border-[#ff0000] hover:border-[#6b21a8] transition-all duration-300"
              aria-label="Watch live on Twitch"
            >
              → WATCH LIVE
            </a>
            <a
              href="#schedule"
              className="text-center px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-transparent text-white font-bold text-base sm:text-lg md:text-xl uppercase tracking-wide border-4 border-[#0047ab] hover:bg-[#0047ab] hover:text-white transition-all duration-300"
              aria-label="View stream schedule"
            >
              SCHEDULE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
