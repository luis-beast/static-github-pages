import { memo } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Bell } from "lucide-react";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

const Merch = memo(function Merch() {
  return (
    <div className="overflow-x-hidden relative min-h-screen">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[1200px] bg-primary/10 rounded-full blur-[200px]" />
      </div>

      {/* Hero Header */}
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, ease: EASING.smooth }}
          >
            <GradientText gradient="louie">The Merch</GradientText>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
          >
            Rep the Layman in style
          </motion.p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollRevealSection>
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <ShoppingBag className="w-12 h-12 text-primary" />
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Coming Soon</h2>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.2}>
            <p className="text-lg text-muted-foreground mb-8">
              We're cooking up something special. Apparel, accessories, and more — all designed with the Layman Legion
              in mind.
            </p>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.3}>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-muted/20 to-transparent border border-border/20 backdrop-blur-sm">
              <Bell className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Follow on socials for updates!</span>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </div>
  );
});

export default Merch;
