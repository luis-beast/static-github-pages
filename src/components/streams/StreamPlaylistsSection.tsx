import { memo } from "react";
import { Music, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

// Placeholder playlist data - will be populated from database later
interface Playlist {
  name: string;
  description: string;
  spotifyUrl: string;
}

const STREAM_PLAYLISTS: Playlist[] = [
  {
    name: "Stream Vibes",
    description: "The main playlist for chill stream sessions",
    spotifyUrl: "#",
  },
  {
    name: "Hype Mode",
    description: "When we need to turn it up",
    spotifyUrl: "#",
  },
  {
    name: "Late Night Chill",
    description: "Relaxed vibes for late streams",
    spotifyUrl: "#",
  },
];

const StreamPlaylistsSection = memo(function StreamPlaylistsSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <ScrollRevealSection>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-center mb-4 sm:mb-6">
            Stream Playlists
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-lg sm:text-xl text-muted-foreground text-center mb-8 sm:mb-12 font-light">
            The music that keeps the streams going
          </p>
        </ScrollRevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {STREAM_PLAYLISTS.map((playlist, index) => (
            <ScrollRevealSection key={playlist.name} delay={0.15 + index * 0.05}>
              <a
                href={playlist.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-2xl bg-gradient-to-br from-muted/15 to-transparent border border-border/20 backdrop-blur-sm transition-all duration-300 hover:border-border/40 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#1DB954]/20 flex items-center justify-center">
                    <Music className="w-5 h-5 text-[#1DB954]" />
                  </div>
                  <h4 className="font-semibold">{playlist.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{playlist.description}</p>
                <div className="flex items-center gap-2 text-sm text-[#1DB954] group-hover:underline">
                  <span>Listen on Spotify</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            </ScrollRevealSection>
          ))}
        </div>

        <ScrollRevealSection delay={0.3}>
          <div className="text-center">
            <Link
              to="/music"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
            >
              <Music className="w-5 h-5" />
              <span>Explore all playlists</span>
            </Link>
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
});

export default StreamPlaylistsSection;
