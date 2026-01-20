import { memo } from "react";
import { Video } from "lucide-react";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

// Placeholder for clips - will be populated from database later
interface Clip {
  id: string;
  title: string;
  thumbnailUrl: string;
  clipUrl: string;
  game?: string;
  date: string;
}

const ClipsHighlightsSection = memo(function ClipsHighlightsSection() {
  // Placeholder state - no clips yet
  const clips: Clip[] = [];

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <ScrollRevealSection>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6">
            Clips & Highlights
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl text-muted-foreground text-center mb-12 font-light">
            Best moments from the streams
          </p>
        </ScrollRevealSection>

        {clips.length === 0 ? (
          <ScrollRevealSection delay={0.2}>
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Video className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Clips Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We'll be featuring the best stream moments here. Clip something funny in chat!
              </p>
            </div>
          </ScrollRevealSection>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clips.map((clip, index) => (
              <ScrollRevealSection key={clip.id} delay={0.15 + index * 0.03}>
                <a
                  href={clip.clipUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden bg-muted/20 border border-border/20 transition-all duration-300 hover:border-border/40"
                >
                  <div className="aspect-video relative">
                    <img
                      src={clip.thumbnailUrl}
                      alt={clip.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Video className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold truncate mb-1">{clip.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {clip.game && <span>{clip.game}</span>}
                      <span>•</span>
                      <span>{clip.date}</span>
                    </div>
                  </div>
                </a>
              </ScrollRevealSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export default ClipsHighlightsSection;
