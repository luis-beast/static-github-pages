import { memo } from "react";
import { Heart } from "lucide-react";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

// Music preferences/vibes - will be editable via admin later
const MUSIC_VIBES = {
  genres: ["Lo-fi", "Indie", "Electronic", "Hip-Hop", "R&B", "Chillwave"],
  description: "Music on stream ranges from chill lo-fi beats to hype electronic tracks, depending on the game and the mood. The goal is always good vibes that don't distract from the content.",
  favoriteArtists: [], // Can be populated later
};

const MusicVibesSection = memo(function MusicVibesSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <ScrollRevealSection>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6">
            The Vibes
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl text-muted-foreground text-center mb-12 font-light">
            What kind of music you'll hear on stream
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.15}>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-muted/15 to-transparent border border-border/20 backdrop-blur-sm mb-8">
            <p className="text-lg text-center leading-relaxed text-muted-foreground">
              {MUSIC_VIBES.description}
            </p>
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3">
            {MUSIC_VIBES.genres.map((genre, index) => (
              <span
                key={genre}
                className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
        </ScrollRevealSection>

        {MUSIC_VIBES.favoriteArtists.length > 0 && (
          <ScrollRevealSection delay={0.25}>
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 text-muted-foreground mb-4">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-medium">Favorite Artists</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {MUSIC_VIBES.favoriteArtists.map((artist) => (
                  <span key={artist} className="text-muted-foreground">
                    {artist}
                  </span>
                ))}
              </div>
            </div>
          </ScrollRevealSection>
        )}
      </div>
    </section>
  );
});

export default MusicVibesSection;
