'use client';

import { Twitch } from 'lucide-react';
import { motion } from 'framer-motion';
import { LiveStatus } from '@/components/LiveStatus';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-gray-800 text-white">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 sm:py-20">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-cyan-400 text-sm sm:text-base md:text-lg font-bold tracking-widest uppercase">
            IT&apos;S GAMING. NOT DIGIORNO.
          </h2>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
            very good pizza
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Welcome to the VGP universe, where we serve nostalgia, beats, and gaming feats!
            We&apos;re your one-stop shop for nostalgia-fueled gaming, epic beatboxing sessions,
            and a chill community to vibe with. Grab a slice and join the fun!
          </p>
        </motion.div>

        {/* Live Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <LiveStatus />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-16"
        >
          <a
            href="https://twitch.tv/verygoodpizza"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-4 px-8 sm:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-lg hover:shadow-cyan-400/50"
          >
            Watch Live!
            <Twitch className="w-6 h-6" />
          </a>
        </motion.div>

        {/* Logo/Mascot Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-red-500 to-red-600 rounded-t-[40%] flex items-center justify-center shadow-2xl">
            <div className="text-center">
              <div className="text-white text-4xl font-bold mb-2">🍕</div>
              <h3 className="text-white text-2xl sm:text-3xl font-bold">Very Good</h3>
              <h3 className="text-white text-2xl sm:text-3xl font-bold">Pizza</h3>
              <div className="mt-4 text-6xl">👾</div>
            </div>
          </div>
        </motion.div>

        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center gap-6 sm:gap-8 flex-wrap"
        >
          {[
            { name: 'TikTok', url: 'https://www.tiktok.com/@verygood.pizza', icon: '📱' },
            { name: 'Instagram', url: 'https://www.instagram.com/verygoodpizzaofficial', icon: '📷' },
            { name: 'Facebook', url: 'https://facebook.com/verygoodpizza', icon: '👍' },
            { name: 'Threads', url: 'https://threads.net/@verygoodpizzaofficial', icon: '🧵' },
            { name: 'Bluesky', url: 'https://bsky.app/profile/verygood.pizza', icon: '🦋' },
            { name: 'Twitch', url: 'https://twitch.tv/verygoodpizza', icon: '📺' },
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
              aria-label={social.name}
            >
              <span className="text-3xl sm:text-4xl">{social.icon}</span>
            </a>
          ))}
        </motion.div>
      </main>

      {/* Merch Preview Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-gray-800 text-2xl sm:text-3xl font-bold mb-8">Check Out Our Merch</h3>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <span className="text-6xl">🧢</span>
              </div>
              <p className="text-gray-600 text-sm">Powered by Limitlesswear</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
