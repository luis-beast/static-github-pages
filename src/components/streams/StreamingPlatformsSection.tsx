import { memo } from "react";
import { ExternalLink } from "lucide-react";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";
import { siteConfig } from "@/config/siteConfig";

interface Platform {
  name: string;
  description: string;
  url: string;
  color: string;
  isPrimary?: boolean;
}

const PLATFORMS: Platform[] = [
  {
    name: "Twitch",
    description: "The main stage. Live streams, chat, and community vibes.",
    url: siteConfig.socials.twitch,
    color: "from-[#9146FF] to-[#772CE8]",
    isPrimary: true,
  },
  {
    name: "YouTube",
    description: "VODs, highlights, and occasional uploads.",
    url: siteConfig.socials.youtube,
    color: "from-[#FF0000] to-[#CC0000]",
  },
  {
    name: "Kick",
    description: "Alternative streaming platform. Same vibes, different place.",
    url: siteConfig.socials.kick,
    color: "from-[#53FC18] to-[#3ED614]",
  },
];

interface PlatformCardProps {
  platform: Platform;
  index: number;
}

const PlatformCard = memo(function PlatformCard({ platform, index }: PlatformCardProps) {
  return (
    <ScrollRevealSection delay={0.1 + index * 0.05}>
      <a
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-6 rounded-2xl bg-gradient-to-br from-muted/15 to-transparent border border-border/20 backdrop-blur-sm transition-all duration-300 hover:border-border/40 hover:scale-[1.02]"
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${platform.color} text-white`}>
            {platform.name}
          </div>
          {platform.isPrimary && (
            <span className="text-xs text-primary uppercase tracking-wider">Primary</span>
          )}
        </div>
        <p className="text-muted-foreground mb-4">{platform.description}</p>
        <div className="flex items-center gap-2 text-sm text-primary group-hover:underline">
          <span>Watch now</span>
          <ExternalLink className="w-4 h-4" />
        </div>
      </a>
    </ScrollRevealSection>
  );
});

const StreamingPlatformsSection = memo(function StreamingPlatformsSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <ScrollRevealSection>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-center mb-4 sm:mb-6">
            Where to Watch
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-lg sm:text-xl text-muted-foreground text-center mb-8 sm:mb-12 font-light">
            Catch the streams live on these platforms
          </p>
        </ScrollRevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLATFORMS.map((platform, index) => (
            <PlatformCard key={platform.name} platform={platform} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default StreamingPlatformsSection;
