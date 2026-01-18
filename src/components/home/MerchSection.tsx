import { ShoppingBag } from "lucide-react";
import ScrollRevealSection from "./ScrollRevealSection";

const MerchSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollRevealSection>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-rose-500/10 mb-8">
            <ShoppingBag className="w-10 h-10 text-rose-400" />
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">The Merch</h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.2}>
          <div className="inline-block px-8 py-4 rounded-2xl border border-dashed border-border/50 bg-card/20">
            <p className="text-2xl font-bold text-muted-foreground mb-2">Coming Soon</p>
            <p className="text-muted-foreground/70">Stay tuned for Layman merch...</p>
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
};

export default MerchSection;
