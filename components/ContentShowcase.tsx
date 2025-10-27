'use client';

const contentTypes = [
  { title: 'GAMING', description: 'Retro + Modern', color: '#0047ab' },
  { title: 'BEATBOX', description: 'Live Performances', color: '#6b21a8' },
  { title: 'TOURNAMENTS', description: 'Community Events', color: '#ff0000' },
  { title: 'SPECIALS', description: 'Collabs & Charity', color: '#0047ab' },
];

export function ContentShowcase() {
  return (
    <section id="content" className="py-16 sm:py-20 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto border-t-4 border-[#6b21a8] pt-16 sm:pt-20 md:pt-32 lg:pt-40">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-24 lg:mb-28">
          <h2 className="text-[clamp(2rem,10vw,6rem)] font-black leading-[0.95] mb-6 sm:mb-8">
            WHAT WE<br />
            <span className="text-[#ff0000]">STREAM</span>
          </h2>
        </div>

        {/* Content Types */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-16 sm:mb-20 md:mb-28 lg:mb-36">
          {contentTypes.map((content) => (
            <div
              key={content.title}
              className="border-l-4 pl-6 sm:pl-8 md:pl-10 py-4 sm:py-5 md:py-6 hover:bg-[#111] transition-all duration-300 cursor-pointer group"
              style={{ borderLeftColor: content.color }}
            >
              <h3 className="font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 sm:mb-3">
                {content.title}
              </h3>
              <p className="text-[#666] font-medium text-sm sm:text-base md:text-lg lg:text-xl">
                {content.description}
              </p>
            </div>
          ))}
        </div>

        {/* YouTube CTA */}
        <div className="border-l-4 border-[#ff0000] pl-6 sm:pl-8 md:pl-10 py-6 sm:py-7 md:py-8">
          <h3 className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-7 md:mb-8">WATCH HIGHLIGHTS</h3>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-7 md:mb-8 leading-[1.7]">
            Full VODs and clips on YouTube
          </p>
          <a
            href="https://youtube.com/@verygoodpizzaofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center px-8 sm:px-9 md:px-10 py-4 sm:py-4.5 md:py-5 bg-[#ff0000] text-black font-bold text-base sm:text-lg md:text-xl uppercase hover:bg-[#0047ab] hover:text-white transition-all duration-300"
            aria-label="View highlights on YouTube"
          >
            → YOUTUBE
          </a>
        </div>
      </div>
    </section>
  );
}
