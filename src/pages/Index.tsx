import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, Gamepad2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import QuoteCard from "@/components/QuoteCard";
import GameBadge from "@/components/GameBadge";
import { Input } from "@/components/ui/input";
import { quotes } from "@/data/quotes";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import PopoverPicker from "@/components/PopoverPicker";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  // Get all unique games from quotes
  const availableGames = useMemo(() => {
    const games = new Set<string>();
    quotes.forEach(quote => games.add(quote.game));
    return Array.from(games).sort();
  }, []);

  const handleGameToggle = (game: string) => {
    setSelectedGames((prev) =>
      prev.includes(game)
        ? prev.filter((g) => g !== game)
        : [...prev, game]
    );
  };

  const handleClearGames = () => {
    setSelectedGames([]);
  };

  const filteredQuotes = useMemo(() => {
    let result = [...quotes];

    // Filter by selected games
    if (selectedGames.length > 0) {
      result = result.filter((quote) => selectedGames.includes(quote.game));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((quote) =>
        quote.quote.toLowerCase().includes(query) ||
        quote.game.toLowerCase().includes(query) ||
        quote.timestamp.toLowerCase().includes(query) ||
        quote.number.toString().includes(query)
      );
    }

    return result;
  }, [searchQuery, selectedGames]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Stream Quotes
          </h1>
          <p className="text-muted-foreground">
            Memorable moments captured by the community
          </p>
        </header>
        
        <div className="glass-card rounded-lg p-4 mb-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Game Filter - Left */}
            {availableGames.length > 0 && (
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Game Filter
                </label>
                <PopoverPicker
                  items={availableGames}
                  selectedItems={selectedGames}
                  onToggle={handleGameToggle}
                  onClearAll={handleClearGames}
                  renderBadge={(game, isActive, onClick) => (
                    <GameBadge
                      game={game}
                      size="sm"
                      isActive={isActive}
                      onClick={onClick}
                    />
                  )}
                  label="Pick Games"
                  icon={<Gamepad2 className="w-4 h-4" />}
                  maxVisibleSelected={2}
                  clearThreshold={3}
                  size="sm"
                />
              </div>
            )}
            
            {/* Search Bar - Right */}
            <div className="w-full md:w-[280px] flex-shrink-0">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Search
              </label>
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
            Showing {filteredQuotes.length} quote{filteredQuotes.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <LayoutGroup>
          <div className="space-y-4">
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
                      layout: { duration: 0.3, ease: "easeOut" },
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
                  <p className="text-muted-foreground">
                    No quotes match your filters.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </main>
      
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
