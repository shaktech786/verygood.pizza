'use client';

const socialLinks = [
  { name: 'TWITCH', url: 'https://twitch.tv/verygoodpizza', color: '#6b21a8' },
  { name: 'YOUTUBE', url: 'https://youtube.com/@verygoodpizzaofficial', color: '#ff0000' },
  { name: 'TIKTOK', url: 'https://tiktok.com/@verygood.pizza', color: '#0047ab' },
  { name: 'INSTAGRAM', url: 'https://instagram.com/verygoodpizzaofficial', color: '#6b21a8' },
  { name: 'THREADS', url: 'https://threads.net/@verygoodpizzaofficial', color: '#0047ab' },
  { name: 'BLUESKY', url: 'https://bsky.app/profile/verygood.pizza', color: '#ff0000' },
];

const stats = [
  { value: '2.5K+', label: 'MEMBERS', color: '#0047ab' },
  { value: '15K+', label: 'MESSAGES/DAY', color: '#6b21a8' },
  { value: '350+', label: 'AVG VIEWERS', color: '#ff0000' },
  { value: '180', label: 'DAY STREAK', color: '#0047ab' },
];

export function CommunitySection() {
  return (
    <section id="community" className="py-16 sm:py-20 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto border-t-4 border-[#ff0000] pt-16 sm:pt-20 md:pt-32 lg:pt-40">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-24 lg:mb-28">
          <h2 className="text-[clamp(2rem,10vw,6rem)] font-black leading-[0.95] mb-8 sm:mb-10 md:mb-12">
            JOIN THE<br />
            <span className="text-[#0047ab]">COMMUNITY</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl text-gray-300 leading-[1.7]">
            2,500+ gamers, beatbox fans, and nostalgia lovers. Be part of something real.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-16 sm:mb-20 md:mb-28 lg:mb-36">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-l-4 pl-4 sm:pl-6 md:pl-8 py-4 sm:py-5 md:py-6"
              style={{ borderLeftColor: stat.color }}
            >
              <div className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3">{stat.value}</div>
              <div className="text-xs sm:text-sm md:text-base text-[#666] font-bold uppercase tracking-wider break-words">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-16 sm:mb-20 md:mb-28 lg:mb-36 max-w-lg">
          {socialLinks.slice(0, 4).map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-l-4 pl-6 sm:pl-7 md:pl-8 py-3 sm:py-3.5 md:py-4 hover:bg-[#111] transition-all duration-300 group"
              style={{ borderLeftColor: social.color }}
              aria-label={`Follow us on ${social.name}`}
            >
              <span className="font-bold text-lg sm:text-xl md:text-2xl group-hover:text-[#6b21a8] transition-colors duration-300">→ {social.name}</span>
            </a>
          ))}
        </div>

        {/* Discord CTA */}
        <div className="border-l-4 border-[#6b21a8] pl-6 sm:pl-8 md:pl-10 py-6 sm:py-7 md:py-8">
          <h3 className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-7 md:mb-8">JOIN DISCORD</h3>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-7 md:mb-8 leading-[1.7] max-w-2xl">
            2,500+ members. Live notifications, exclusive events, and good vibes.
          </p>
          <a
            href="https://discord.gg/verygoodpizza"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center px-8 sm:px-9 md:px-10 py-4 sm:py-4.5 md:py-5 bg-[#6b21a8] text-white font-bold text-base sm:text-lg md:text-xl uppercase hover:bg-[#ff0000] transition-all duration-300"
            aria-label="Join our Discord community"
          >
            → JOIN NOW
          </a>
        </div>
      </div>
    </section>
  );
}
