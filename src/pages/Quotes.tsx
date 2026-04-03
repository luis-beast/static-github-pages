import { useState, useMemo, useCallback, useRef, memo } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import QuoteCard from "@/components/QuoteCard";
import GameBadge from "@/components/GameBadge";
import { Input } from "@/components/ui/input";
import { quotes } from "@/data/quotes";
import FilterPopover from "@/components/FilterPopover";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import PageWrapper from "@/components/PageWrapper";
import usePageTitle from "@/hooks/usePageTitle";

const Quotes = memo(function Quotes() {
  usePageTitle("Quotes");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  const availableGames = useMemo(() => {
    const games = new Set<string>();
    quotes.forEach((quote) => games.add(quote.game));
    return Array.from(games).sort();
  }, []);

  const toggleGame = useCallback(
    (game: string) =>
      setSelectedGames((prev) => (prev.includes(game) ? prev.filter((g) => g !== game) : [...prev, game])),
    [],
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
          quote.number.toString().includes(query),
      );
    }

    return result;
  }, [searchQuery, selectedGames]);

  return (
    <PageWrapper>
      <main className="flex-1 mx-auto w-full max-w-[95vw] px-4 sm:px-6 lg:px-10 xl:px-16 py-12 md:py-20">
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
            <GradientText gradient="louie">The Quotes</GradientText>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-md mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
          >
            Memorable moments captured by Laypeople
          </motion.p>
        </motion.header>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, delay: 0.3, ease: EASING.smooth }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-card/80 rounded-2xl border border-border/50 p-6 shadow-2xl shadow-primary/5 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search quotes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  maxLength={50}
                  className="pl-12 pr-10 h-12 w-full bg-secondary/50 border-0 rounded-xl text-base placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/30 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 pt-2 border-t border-border/30">
                <div className="flex flex-wrap items-center gap-3">
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

                <div className="text-sm text-muted-foreground whitespace-nowrap">
                  {filteredQuotes.length} quote{filteredQuotes.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4 5xl:grid-cols-5 6xl:grid-cols-6 gap-4 items-stretch">
          {filteredQuotes.length > 0 ? (
            filteredQuotes.map((quote) => (
              <div key={quote.number} className="h-full">
                <QuoteCard {...quote} />
              </div>
            ))
          ) : (
            <div className="md:col-span-2 3xl:col-span-3 4xl:col-span-4 5xl:col-span-5 6xl:col-span-6 text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground text-lg">No quotes match your filters.</p>
            </div>
          )}
        </div>
      </main>
    </PageWrapper>
  );
});

export default Quotes;
