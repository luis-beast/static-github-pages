import Navigation from "@/components/Navigation";
import QuoteCard from "@/components/QuoteCard";
import { quotes } from "@/data/quotes";

const Index = () => {
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
        
        <div className="space-y-4">
          {quotes.map((quote) => (
            <QuoteCard
              key={quote.number}
              number={quote.number}
              quote={quote.quote}
              game={quote.game}
              timestamp={quote.timestamp}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
