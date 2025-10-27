'use client';

import Image from 'next/image';

export function Footer() {
  const socials = [
    { name: 'Twitch', url: 'https://twitch.tv/verygoodpizza' },
    { name: 'YouTube', url: 'https://youtube.com/@verygoodpizzaofficial' },
    { name: 'TikTok', url: 'https://tiktok.com/@verygood.pizza' },
    { name: 'Instagram', url: 'https://instagram.com/verygoodpizzaofficial' },
  ];

  return (
    <footer
      className="border-t-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 py-12 md:py-16"
      role="contentinfo"
    >
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.png"
                alt=""
                width={64}
                height={64}
                className="h-16 w-auto"
                aria-hidden="true"
              />
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Very Good Pizza
                </div>
                <div className="text-purple-700 dark:text-purple-400 font-semibold">
                  It&apos;s Gaming. Not DiGiorno.
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
              Nostalgia-fueled gaming, beatboxing, and community vibes. Built for retro lovers and good times.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Follow Us
            </h2>
            <nav className="space-y-3" aria-label="Social media links">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base md:text-lg text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors focus:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red-600 rounded"
                  aria-label={`Follow us on ${social.name} (opens in new tab)`}
                >
                  → {social.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 dark:text-gray-400 text-sm md:text-base">
          <div>
            © {new Date().getFullYear()} Very Good Pizza. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            Made with <span className="text-red-600" aria-label="love">❤️</span> for the community
          </div>
        </div>
      </div>
    </footer>
  );
}
