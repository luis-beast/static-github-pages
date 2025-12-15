import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import QuoteCard from "@/components/QuoteCard";
import { Input } from "@/components/ui/input";
import { quotes } from "@/data/quotes";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuotes = useMemo(() => {
    if (!searchQuery.trim()) return quotes;
    
    const query = searchQuery.toLowerCase();
    return quotes.filter((quote) =>
      quote.quote.toLowerCase().includes(query) ||
      quote.game.toLowerCase().includes(query) ||
      quote.timestamp.toLowerCase().includes(query) ||
      quote.number.toString().includes(query)
    );
  }, [searchQuery]);

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
        
        <div className="glass-card rounded-lg p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search quotes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            Showing {filteredQuotes.length} quote{filteredQuotes.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredQuotes.length > 0 ? (
            filteredQuotes.map((quote) => (
              <QuoteCard
                key={quote.number}
                number={quote.number}
                quote={quote.quote}
                game={quote.game}
                timestamp={quote.timestamp}
              />
            ))
          ) : (
            <div className="glass-card rounded-lg p-8 text-center">
              <p className="text-muted-foreground">
                No quotes match your search.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
