import { memo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ScrollRevealSection from "./ScrollRevealSection";

interface SocialPlatform {
  name: string;
  href: string;
  description: string;
  gradient: string;
  icon: ReactNode;
}

const SOCIALS: SocialPlatform[] = [
  {
    name: "Twitch",
    href: "https://www.twitch.tv/laymanlouie",
    description:
      "The main stage. This is where I stream all the time! If you want to see how much The Layman really doesn't know, this is the spot.",
    gradient: "from-purple-500/20 to-violet-500/20",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@LaymanLouie",
    description:
      "The goal is to make this the spot for highlights and shortened VOD's. Perfect for catching up on streams you missed or watching the best moments the Layman RARELY has.",
    gradient: "from-red-500/20 to-rose-500/20",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@laymanlouie",
    description:
      "The goal is to make this the spot for quick clips that show how AMAZING or... funny The Layman can be in bite-sized form. Perfect for a quick laugh or sharing.",
    gradient: "from-cyan-500/20 to-pink-500/20",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/laymanlouie/",
    description:
      "The goal is to make this the spot for the behind the scenes, quick personal updates, and a more casual look at life outside of streaming.",
    gradient: "from-orange-500/20 via-pink-500/20 to-purple-500/20",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "https://discord.gg/PAy62ZZNzy",
    description:
      "The place where ALL Laypeople live. This is where the entire community hangs out, chats, shares memes, and connects with one another. If there's a place where to grow within the community, it's here.",
    gradient: "from-indigo-500/20 to-blue-500/20",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
      </svg>
    ),
  },
];

interface SocialRowProps {
  social: SocialPlatform;
  index: number;
  isReversed: boolean;
}

const SocialRow = memo(function SocialRow({ social, index, isReversed }: SocialRowProps) {
  const { name, href, description, gradient, icon } = social;

  return (
    <ScrollRevealSection delay={0.1 + index * 0.1}>
      <motion.div
        className={`flex flex-col ${isReversed ? "sm:flex-row-reverse" : "sm:flex-row"} items-center gap-6 sm:gap-8 lg:gap-12`}
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex-shrink-0">
          <div
            className={`w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 3xl:w-48 3xl:h-48 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${gradient} border border-border/20 flex items-center justify-center`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 3xl:w-20 3xl:h-20 text-white/80">{icon}</div>
          </div>
        </div>

        <div
          className={`flex-1 flex flex-col text-center ${isReversed ? "sm:text-right sm:items-end" : "sm:text-left sm:items-start"} items-center`}
        >
          <h3 className="text-xl sm:text-2xl lg:text-3xl 3xl:text-4xl font-bold mb-2 sm:mb-3">{name}</h3>
          <p
            className={`text-muted-foreground text-base lg:text-lg 3xl:text-xl mb-4 sm:mb-6 max-w-md 3xl:max-w-lg ${isReversed ? "sm:text-right" : "sm:text-left"}`}
          >
            {description}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-medium hover:bg-primary/20 hover:border-primary/30 transition-all duration-200 group text-sm sm:text-base"
          >
            Visit {name}
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </motion.div>
    </ScrollRevealSection>
  );
});

const HomeSocialsSection = memo(function HomeSocialsSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl 3xl:max-w-6xl 5xl:max-w-7xl mx-auto">
        <ScrollRevealSection>
          <p className="text-xl md:text-2xl 3xl:text-3xl text-muted-foreground text-center mb-20 font-light max-w-2xl 3xl:max-w-3xl mx-auto">
            You can find me in a few places across the interwebs!
          </p>
        </ScrollRevealSection>

        <div className="space-y-16 sm:space-y-24 lg:space-y-32">
          {SOCIALS.map((social, index) => (
            <SocialRow key={social.name} social={social} index={index} isReversed={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default HomeSocialsSection;
