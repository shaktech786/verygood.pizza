'use client';

import Image from 'next/image';

const socials = [
  { name: 'Discord', url: '/discord' },
  { name: 'Twitch', url: 'https://twitch.tv/verygoodpizza' },
  { name: 'YouTube', url: 'https://youtube.com/@verygoodpizzaofficial' },
  { name: 'TikTok', url: 'https://tiktok.com/@verygood.pizza' },
  { name: 'Instagram', url: 'https://instagram.com/verygoodpizzaofficial' },
];

export function Footer() {
  return (
    <footer className="border-t-2 py-12 md:py-16" style={{ borderColor: 'var(--border)' }} role="contentinfo">
      <div className="container mx-auto px-4">
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
                style={{ imageRendering: 'pixelated' }}
                aria-hidden="true"
              />
              <div>
                <div className="text-2xl md:text-3xl font-bold">
                  Very Good Pizza
                </div>
                <div className="text-orange font-semibold">
                  It&apos;s Gaming. Not DiGiorno.
                </div>
              </div>
            </div>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              Nostalgia-fueled gaming, beatboxing, and an open community.
              Built for retro lovers and good times.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Follow Us
            </h2>
            <nav className="space-y-3" aria-label="Social media links">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base md:text-lg text-muted hover:text-orange transition-colors focus:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--pizza-orange)] rounded"
                  aria-label={`Follow us on ${social.name} (opens in new tab)`}
                >
                  &rarr; {social.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-muted text-sm md:text-base" style={{ borderColor: 'var(--border)' }}>
          <div>
            &copy; {new Date().getFullYear()} Very Good Pizza. All rights reserved.
          </div>
          <div>
            Made with &hearts; for the community
          </div>
        </div>
      </div>
    </footer>
  );
}
