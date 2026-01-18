import { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search } from "lucide-react";
import QuoteCard from "@/components/QuoteCard";
import GameBadge from "@/components/GameBadge";
import { Input } from "@/components/ui/input";
import { quotes } from "@/data/quotes";
import FilterPopover from "@/components/FilterPopover";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION.reveal,
      ease: EASING.smooth,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -10,
    transition: {
      duration: 0.2,
      ease: EASING.smooth,
    },
  },
};

const Quotes = memo(function Quotes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  const availableGames = useMemo(() => {
    const games = new Set<string>();
    quotes.forEach((quote) => games.add(quote.game));
    return Array.from(games).sort();
  }, []);

  const toggleGame = useCallback(
    (game: string) =>
      setSelectedGames((prev) => (prev.includes(game) ? prev.filter((g) => g !== game) : [...prev, game])),
    []
  );

  const clearGames = useCallback(() => setSelectedGames([]), []);

  const filteredQuotes = useMemo(() => {
    let result = [...quotes];

    if (selectedGames.length > 0) {
      result = result.filter((quote) => selectedGames.includes(quote.game));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (quote) =>
          quote.quote.toLowerCase().includes(query) ||
          quote.game.toLowerCase().includes(query) ||
          quote.timestamp.toLowerCase().includes(query) ||
          quote.number.toString().includes(query)
      );
    }

    return result;
  }, [searchQuery, selectedGames]);

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, ease: EASING.smooth }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.1, ease: EASING.smooth }}
          >
            <GradientText gradient="louie">Quotes</GradientText>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
          >
            Memorable moments captured by Laypeople
          </motion.p>
        </motion.header>

        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, delay: 0.3, ease: EASING.smooth }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-card/40 backdrop-blur-xl rounded-2xl border border-border/50 p-6 shadow-2xl shadow-primary/5">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search quotes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    maxLength={50}
                    className="pl-12 h-12 bg-secondary/50 border-0 rounded-xl text-base placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>
                
                {availableGames.length > 0 && (
                  <FilterPopover
                    triggerLabel="Games"
                    sections={[
                      {
                        label: "Filter by Game",
                        items: availableGames,
                        selectedItems: selectedGames,
                        onToggle: toggleGame,
                        onClearAll: clearGames,
                        renderBadge: (game, isActive, onClick) => (
                          <GameBadge game={game} size="sm" isActive={isActive} onClick={onClick} />
                        ),
                        clearThreshold: 3,
                      },
                    ]}
                  />
                )}
              </div>
              
              <motion.div
                className="mt-4 text-sm text-muted-foreground text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {filteredQuotes.length} quote{filteredQuotes.length !== 1 ? "s" : ""}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <LayoutGroup>
          <motion.div
            className="max-w-3xl mx-auto space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((quote, index) => (
                  <motion.div
                    key={quote.number}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                  >
                    <QuoteCard {...quote} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                    <Search className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground text-lg">No quotes match your filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </main>
    </div>
  );
});

export default Quotes;
