import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search } from "lucide-react";
import QuoteCard from "@/components/QuoteCard";
import GameBadge from "@/components/GameBadge";
import { Input } from "@/components/ui/input";
import { quotes } from "@/data/quotes";
import FilterPopover from "@/components/FilterPopover";

const Quotes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  const availableGames = useMemo(() => {
    const games = new Set<string>();
    quotes.forEach((quote) => games.add(quote.game));
    return Array.from(games).sort();
  }, []);

  const toggleGame = (game: string) => {
    setSelectedGames((prev) => (prev.includes(game) ? prev.filter((g) => g !== game) : [...prev, game]));
  };

  const clearGames = () => setSelectedGames([]);

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
          quote.number.toString().includes(query),
      );
    }

    return result;
  }, [searchQuery, selectedGames]);

  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">Layman's Quotes</h1>
          <p className="text-muted-foreground">Memorable moments captured by Laypeople</p>
        </motion.header>

        <motion.div
          className="glass-card rounded-lg p-4 mb-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {availableGames.length > 0 && (
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground mb-2 block">Game Filter</label>
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
              </div>
            )}

            <div className="w-full md:w-[280px] flex-shrink-0">
              <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search quotes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  maxLength={50}
                  className="pl-10 bg-secondary border-border"
                />
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredQuotes.length} quote
            {filteredQuotes.length !== 1 ? "s" : ""}
          </div>
        </motion.div>

        <LayoutGroup>
          <motion.div className="space-y-4" layout transition={{ layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}>
            <AnimatePresence mode="popLayout">
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((quote) => (
                  <motion.div
                    key={quote.number}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.2 },
                      y: { duration: 0.2 },
                    }}
                  >
                    <QuoteCard
                      number={quote.number}
                      quote={quote.quote}
                      game={quote.game}
                      timestamp={quote.timestamp}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-lg p-8 text-center"
                >
                  <p className="text-muted-foreground">No quotes match your filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </main>
    </div>
  );
};

export default Quotes;
