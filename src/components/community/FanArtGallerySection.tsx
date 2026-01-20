import { memo } from "react";
import { ImageIcon } from "lucide-react";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

// Placeholder for fan art - will be populated from database/storage later
interface FanArt {
  id: string;
  imageUrl: string;
  artist: string;
  title?: string;
}

const FanArtGallerySection = memo(function FanArtGallerySection() {
  // Placeholder state - no fan art yet
  const fanArtItems: FanArt[] = [];

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <ScrollRevealSection>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6">
            Fan Art Gallery
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl text-muted-foreground text-center mb-12 font-light">
            Amazing creations from the community
          </p>
        </ScrollRevealSection>

        {fanArtItems.length === 0 ? (
          <ScrollRevealSection delay={0.2}>
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <ImageIcon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Gallery Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                This is where community fan art will be showcased. Submit your creations in the Discord!
              </p>
            </div>
          </ScrollRevealSection>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fanArtItems.map((art, index) => (
              <ScrollRevealSection key={art.id} delay={0.15 + index * 0.03}>
                <div className="aspect-square rounded-xl overflow-hidden bg-muted/20 border border-border/20">
                  <img
                    src={art.imageUrl}
                    alt={art.title || `Fan art by ${art.artist}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export default FanArtGallerySection;
