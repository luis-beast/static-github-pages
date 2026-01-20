import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, History, Sparkles, Heart } from "lucide-react";
import ScrollRevealSection from "./ScrollRevealSection";
import GameBadge from "@/components/GameBadge";

type GameCategory = "current" | "played" | "wishlist" | "favorites";

interface GameItem {
  name: string;
}

const GAME_CATEGORIES: Record<GameCategory, { label: string; icon: typeof Gamepad2; games: GameItem[] }> = {
  current: {
    label: "Currently Playing",
    icon: Gamepad2,
    games: [
      { name: "League of Legends" },
      { name: "Teamfight Tactics" },
      { name: "Valorant" },
    ],
  },
  played: {
    label: "Games I've Played",
    icon: History,
    games: [
      { name: "Minecraft" },
      { name: "Overwatch 2" },
      { name: "Lethal Company" },
      { name: "Phasmophobia" },
      { name: "It Takes Two" },
    ],
  },
  wishlist: {
    label: "Want to Play",
    icon: Sparkles,
    games: [
      { name: "Other" },
    ],
  },
  favorites: {
    label: "All-Time Favorites",
    icon: Heart,
    games: [
      { name: "League of Legends" },
      { name: "Minecraft" },
      { name: "It Takes Two" },
    ],
  },
};

const CATEGORY_ORDER: GameCategory[] = ["current", "played", "wishlist", "favorites"];

const GamesSection = memo(function GamesSection() {
  const [activeCategory, setActiveCategory] = useState<GameCategory>("current");

  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollRevealSection>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-center mb-4 sm:mb-6">
            The Games
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-lg sm:text-xl text-muted-foreground text-center mb-8 sm:mb-12 font-light">
            What I play, what I've played, and what I want to play.
          </p>
        </ScrollRevealSection>

        {/* Category Tabs */}
        <ScrollRevealSection delay={0.15}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORY_ORDER.map((category) => {
              const { label, icon: Icon } = GAME_CATEGORIES[category];
              const isActive = activeCategory === category;
              // Short labels for narrow screens
              const shortLabel = category === "current" ? "Now" 
                : category === "played" ? "Past" 
                : category === "wishlist" ? "Next" 
                : "Faves";

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                    isActive
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-muted/20 text-muted-foreground border border-border/20 hover:border-border/40 hover:bg-muted/30"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="sm:hidden">{shortLabel}</span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              );
            })}
          </div>
        </ScrollRevealSection>

        {/* Games Grid */}
        <ScrollRevealSection delay={0.2}>
          <div className="min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap justify-center gap-3"
              >
                {GAME_CATEGORIES[activeCategory].games.map((game, index) => (
                  <motion.div
                    key={game.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-muted/20 to-transparent border border-border/20 backdrop-blur-sm"
                  >
                    <GameBadge game={game.name} size="md" isActive />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollRevealSection>

        {/* Category Description */}
        <ScrollRevealSection delay={0.25}>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-muted-foreground/60 mt-8 text-sm"
            >
              {activeCategory === "current" && "These are the games in my current rotation!"}
              {activeCategory === "played" && "Games I've streamed or played in the past."}
              {activeCategory === "wishlist" && "Games I'm excited to try out soon!"}
              {activeCategory === "favorites" && "The games that hold a special place in my heart."}
            </motion.p>
          </AnimatePresence>
        </ScrollRevealSection>
      </div>
    </section>
  );
});

export default GamesSection;
