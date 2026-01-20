import { memo } from "react";
import { Sparkles } from "lucide-react";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

// Placeholder emote data - will be populated from database later
interface EmoteCategory {
  name: string;
  description: string;
  emotes: string[];
}

const EMOTE_CATEGORIES: EmoteCategory[] = [
  {
    name: "7TV",
    description: "Custom emotes for maximum expression",
    emotes: [], // Will be populated later
  },
  {
    name: "BTTV",
    description: "BetterTTV classics",
    emotes: [],
  },
  {
    name: "FFZ",
    description: "FrankerFaceZ favorites",
    emotes: [],
  },
];

const EmoteShowcaseSection = memo(function EmoteShowcaseSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <ScrollRevealSection>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-center mb-4 sm:mb-6">
            The Emotes
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-lg sm:text-xl text-muted-foreground text-center mb-8 sm:mb-12 font-light">
            Express yourself with these channel emotes
          </p>
        </ScrollRevealSection>

        {/* Coming Soon State */}
        <ScrollRevealSection delay={0.2}>
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Emote Showcase Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're working on displaying all the channel emotes from 7TV, BTTV, and FFZ right here. Stay tuned!
            </p>
          </div>
        </ScrollRevealSection>

        {/* Category cards for future use */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {EMOTE_CATEGORIES.map((category, index) => (
            <ScrollRevealSection key={category.name} delay={0.25 + index * 0.05}>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-muted/15 to-transparent border border-border/20 backdrop-blur-sm text-center">
                <h4 className="text-lg font-semibold mb-2">{category.name}</h4>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </ScrollRevealSection>
          ))}
        </div>
      </div>
    </section>
  );
});

export default EmoteShowcaseSection;
