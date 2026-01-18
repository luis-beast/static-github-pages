import { memo } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import ScrollRevealSection from "./ScrollRevealSection";

const RULES = [
  "Be kind",
  "No hate, spam, or harassment",
  "Keep chats appropriate",
  "No backseat gaming unless I ask",
  "Respect the Layman Legion",
] as const;

const RulesSection = memo(function RulesSection() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto relative">
        <ScrollRevealSection>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6">
            The Rules
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl text-muted-foreground text-center mb-16 font-light">
            We keep things <span className="text-foreground">friendly</span>,{" "}
            <span className="text-foreground">respectful</span>, and{" "}
            <span className="text-foreground">cozy</span> for everyone.
          </p>
        </ScrollRevealSection>

        <ul className="grid gap-4 max-w-2xl mx-auto" role="list">
          {RULES.map((rule, index) => (
            <ScrollRevealSection key={rule} delay={0.15 + index * 0.05}>
              <motion.li
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 p-5 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10" aria-hidden="true">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <span className="text-lg font-medium">{rule}</span>
              </motion.li>
            </ScrollRevealSection>
          ))}
        </ul>

        <ScrollRevealSection delay={0.5}>
          <p className="text-center text-muted-foreground mt-12">
            We want this world to feel safe and welcoming for{" "}
            <span className="text-primary font-semibold">ALL</span> Laypeople.
          </p>
        </ScrollRevealSection>
      </div>
    </section>
  );
});

export default RulesSection;
