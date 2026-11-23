import Image from 'next/image';
import { Footer } from '@/components/Footer';
import { GameList } from '@/components/GameList';
import { Killfeed } from '@/components/Killfeed';
import { Prelive } from '@/components/Prelive';
import { ServerBrowser } from '@/components/ServerBrowser';
import { TopBar } from '@/components/TopBar';
import { CLIPS } from '@/content/clips';
import { LINKS } from '@/content/links';
import { getChannelStatus } from '@/lib/twitch';
import styles from './page.module.css';

export const revalidate = 60;

export default async function Home() {
  const status = await getChannelStatus({
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
  });
  const now = new Date();

  return (
    <>
      <TopBar status={status} />
      <main id="main">
        <section className={`wrap ${styles.hero}`} aria-labelledby="hero-title">
          <div className={styles.intro}>
            <h1 id="hero-title" className={styles.wordmark}>
              Very Good Pizza
            </h1>
            <p className={styles.lede}>
              Shak’s gaming stream. Shooters, sandbox, card games and retro nights, and at my best when friends are in the call.
            </p>
          </div>
          <div className={styles.server}>
            <ServerBrowser status={status} now={now} />
          </div>
          <Image
            src="/shak-pixel.png"
            alt=""
            width={571}
            height={550}
            className={styles.mascot}
            priority
          />
        </section>

        <div className={`wrap ${styles.section}`}>
          <GameList clips={CLIPS} />
        </div>

        <section className={`wrap ${styles.section}`} aria-labelledby="killfeed-title">
          <div className={styles.sectionHead}>
            <h2 id="killfeed-title">Killfeed</h2>
            <p>My own clips from stream. Tap one to play it right here.</p>
          </div>
          <Killfeed clips={CLIPS} />
          <a className={styles.youtube} href={LINKS.youtubeSubscribe} target="_blank" rel="noopener noreferrer">
            Subscribe on YouTube for new clips
          </a>
        </section>

        <div className={`wrap ${styles.section}`}>
          <Prelive />
        </div>

        <section className={`wrap ${styles.section}`} aria-labelledby="motd-title">
          <div className={`panel ${styles.motd}`}>
            <h2 id="motd-title" className={styles.motdTitle}>
              Message of the day
            </h2>
            <div className={`sunken ${styles.motdBody}`}>
              <p>
                I’m Shak. I play a bit of everything: Minecraft, PEAK, Slay the Spire 2, retro games, and GTA VI once it’s on PC. Counter-Strike 1.6 is still my best game; I’ve
                played it since 2007. The best nights are the ones with friends in the call: PEAK climbs that fall apart, golf rounds we never finish.
              </p>
              <p>
                I stream on Twitch, usually late, and the best moments end up on YouTube. Come say hi in chat. Type{' '}
                <code>connect</code> in the console if you want to do it the old way.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
