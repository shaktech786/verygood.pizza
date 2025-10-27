'use client';

const schedule = [
  { day: 'MON', time: '19:00 EST', game: 'RETRO GAMING MARATHON', color: '#0047ab' },
  { day: 'WED', time: '20:00 EST', game: 'BEATBOXING SHOWCASE', color: '#6b21a8' },
  { day: 'FRI', time: '18:00 EST', game: 'COMMUNITY GAME NIGHT', color: '#ff0000' },
  { day: 'SAT', time: '15:00 EST', game: 'NOSTALGIA DEEP DIVE', color: '#0047ab' },
];

export function ScheduleSection() {
  return (
    <section id="schedule" className="py-16 sm:py-20 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-24 lg:mb-28">
          <h2 className="text-[clamp(2rem,10vw,6rem)] font-black leading-[0.95] mb-8 sm:mb-10 md:mb-12">
            STREAM<br />
            <span className="text-[#6b21a8]">SCHEDULE</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl text-gray-300 leading-[1.7]">
            Weekly streams. All times EST. Don&apos;t miss out.
          </p>
        </div>

        {/* Schedule List */}
        <div className="space-y-0 border-t-4 border-white overflow-x-auto">
          {schedule.map((item) => (
            <div
              key={item.day}
              className="border-b-4 border-white py-8 sm:py-10 md:py-14 lg:py-16 hover:bg-[#0047ab] hover:text-white transition-all duration-300 group cursor-pointer min-w-[320px]"
              style={{
                borderLeftWidth: '6px',
                borderLeftColor: item.color,
              }}
            >
              <div className="flex flex-col sm:grid sm:grid-cols-[80px_1fr] md:grid-cols-[100px_140px_1fr] lg:grid-cols-[140px_180px_1fr] gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-start sm:items-center pl-6 sm:pl-8 md:pl-12 lg:pl-14 pr-4 sm:pr-6 md:pr-8">
                <div className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{item.day}</div>
                <div className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#666] group-hover:text-white transition-colors duration-300">{item.time}</div>
                <div className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl uppercase break-words">{item.game}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
