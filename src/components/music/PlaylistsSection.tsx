import { memo } from "react";
import { Music, ExternalLink, Headphones } from "lucide-react";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

// Placeholder playlist data - will be populated from database later
interface Playlist {
  id: string;
  name: string;
  description: string;
  spotifyUrl: string;
  coverImage?: string;
  trackCount?: number;
}

const PLAYLISTS: Playlist[] = [
  {
    id: "stream-vibes",
    name: "Stream Vibes",
    description: "The main playlist for chill stream sessions. Lo-fi, indie, and good vibes.",
    spotifyUrl: "#",
  },
  {
    id: "hype-mode",
    name: "Hype Mode",
    description: "When we need to turn it up. Energetic tracks for intense gaming moments.",
    spotifyUrl: "#",
  },
  {
    id: "late-night",
    name: "Late Night Chill",
    description: "Relaxed vibes for late night streams. Perfect for winding down.",
    spotifyUrl: "#",
  },
  {
    id: "focus-time",
    name: "Focus Time",
    description: "Background music for when concentration is key.",
    spotifyUrl: "#",
  },
];

interface PlaylistCardProps {
  playlist: Playlist;
  index: number;
}

const PlaylistCard = memo(function PlaylistCard({ playlist, index }: PlaylistCardProps) {
  return (
    <ScrollRevealSection delay={0.15 + index * 0.05}>
      <a
        href={playlist.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-6 rounded-2xl bg-gradient-to-br from-muted/15 to-transparent border border-border/20 backdrop-blur-sm transition-all duration-300 hover:border-border/40 hover:scale-[1.02]"
      >
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-[#1DB954]/20 flex items-center justify-center flex-shrink-0">
            <Music className="w-8 h-8 text-[#1DB954]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-1 truncate">{playlist.name}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{playlist.description}</p>
            <div className="flex items-center gap-2 text-sm text-[#1DB954] group-hover:underline">
              <span>Listen on Spotify</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </a>
    </ScrollRevealSection>
  );
});

const PlaylistsSection = memo(function PlaylistsSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <ScrollRevealSection>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6">
            The Playlists
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl text-muted-foreground text-center mb-12 font-light">
            Curated playlists for every mood
          </p>
        </ScrollRevealSection>

        {PLAYLISTS.length === 0 ? (
          <ScrollRevealSection delay={0.2}>
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Headphones className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Playlists Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're putting together some curated playlists for you to enjoy.
              </p>
            </div>
          </ScrollRevealSection>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {PLAYLISTS.map((playlist, index) => (
              <PlaylistCard key={playlist.id} playlist={playlist} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export default PlaylistsSection;
