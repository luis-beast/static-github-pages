import { memo } from "react";
import ScrollRevealSection from "./ScrollRevealSection";

const MerchSection = memo(function MerchSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollRevealSection delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            The Merch
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.2}>
          <div className="inline-block px-8 py-6 rounded-2xl bg-gradient-to-br from-muted/20 to-transparent border border-border/20 backdrop-blur-sm">
            <p className="text-2xl font-bold text-muted-foreground mb-2">Coming Soon</p>
            <p className="text-muted-foreground/70">Stay tuned for Layman merch...</p>
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
});

export default MerchSection;
