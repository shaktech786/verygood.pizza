'use client';

import Image from 'next/image';
import { LiveStatus } from '@/components/LiveStatus';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <main id="main-content" className="container mx-auto px-4 py-12 md:py-20">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Very Good Pizza mascot - pixel art character holding pizza"
            width={240}
            height={240}
            className="w-48 h-48 md:w-60 md:h-60 object-contain"
            priority
          />
        </div>

        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Very Good Pizza
          </h1>
          <p className="text-xl md:text-2xl text-purple-700 dark:text-purple-400 font-semibold mb-6">
            It&apos;s Gaming. Not DiGiorno.
          </p>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Welcome to the VGP universe! We serve nostalgia-fueled gaming, epic beatboxing sessions,
            and a chill community to vibe with. Grab a slice and join the fun!
          </p>
        </div>

        {/* Live Status */}
        <div className="flex justify-center mb-8">
          <LiveStatus />
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-16">
          <a
            href="https://twitch.tv/verygoodpizza"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 text-white text-lg font-bold rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red-600"
            aria-label="Watch Very Good Pizza live on Twitch (opens in new tab)"
          >
            <span>Watch Live on Twitch</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
            </svg>
          </a>
        </div>

        {/* Social Links */}
        <section
          className="border-t-2 border-gray-200 dark:border-gray-700 pt-12"
          aria-labelledby="social-heading"
        >
          <h2 id="social-heading" className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Connect With Us
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { name: 'Twitch', url: 'https://twitch.tv/verygoodpizza', icon: '🎮' },
              { name: 'TikTok', url: 'https://www.tiktok.com/@verygood.pizza', icon: '📱' },
              { name: 'Instagram', url: 'https://www.instagram.com/verygoodpizzaofficial', icon: '📷' },
              { name: 'Facebook', url: 'https://facebook.com/verygoodpizza', icon: '👍' },
              { name: 'Threads', url: 'https://threads.net/@verygoodpizzaofficial', icon: '🧵' },
              { name: 'Bluesky', url: 'https://bsky.app/profile/verygood.pizza', icon: '🦋' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-600 dark:hover:border-purple-400 transition-colors focus:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red-600"
                aria-label={`Follow Very Good Pizza on ${social.name} (opens in new tab)`}
              >
                <span className="text-3xl" aria-hidden="true">{social.icon}</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{social.name}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Merch Section */}
      <section
        className="bg-gray-100 dark:bg-gray-900 py-16 mt-16"
        aria-labelledby="merch-heading"
      >
        <div className="container mx-auto px-4">
          <h2 id="merch-heading" className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Official Merchandise
          </h2>
          <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <span className="text-6xl" aria-hidden="true">🧢</span>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Merch powered by Limitlesswear
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
