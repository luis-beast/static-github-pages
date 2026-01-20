import { memo } from "react";
import { Star } from "lucide-react";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

// Placeholder for community spotlights - will be populated from database later
interface Spotlight {
  id: string;
  username: string;
  avatarUrl?: string;
  reason: string;
  date: string;
}

const CommunitySpotlightsSection = memo(function CommunitySpotlightsSection() {
  // Placeholder state - no spotlights yet
  const spotlights: Spotlight[] = [];

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <ScrollRevealSection>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6">
            Community Spotlights
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl text-muted-foreground text-center mb-12 font-light">
            Highlighting amazing members of the community
          </p>
        </ScrollRevealSection>

        {spotlights.length === 0 ? (
          <ScrollRevealSection delay={0.2}>
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Star className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Spotlights Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We'll be featuring outstanding community members here. Be active in chat and Discord to get noticed!
              </p>
            </div>
          </ScrollRevealSection>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {spotlights.map((spotlight, index) => (
              <ScrollRevealSection key={spotlight.id} delay={0.15 + index * 0.05}>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-muted/15 to-transparent border border-border/20 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-4">
                    {spotlight.avatarUrl ? (
                      <img
                        src={spotlight.avatarUrl}
                        alt={spotlight.username}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">
                          {spotlight.username[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold">{spotlight.username}</h4>
                      <p className="text-sm text-muted-foreground">{spotlight.date}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{spotlight.reason}</p>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export default CommunitySpotlightsSection;
