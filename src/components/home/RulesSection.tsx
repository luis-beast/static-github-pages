import { Heart } from "lucide-react";
import ScrollRevealSection from "./ScrollRevealSection";
import { motion } from "framer-motion";

const rules = [
  "Be kind",
  "No hate, spam, or harassment",
  "Keep chats appropriate",
  "No backseat gaming unless I ask",
  "Respect the Layman Legion",
];

const RulesSection = () => {
  return (
    <section className="py-32 px-6 relative">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <ScrollRevealSection>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6">
            Community Rules
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl text-muted-foreground text-center mb-16 font-light">
            We keep things{" "}
            <span className="text-foreground">friendly</span>,{" "}
            <span className="text-foreground">respectful</span>, and{" "}
            <span className="text-foreground">cozy</span> for everyone.
          </p>
        </ScrollRevealSection>

        <div className="grid gap-4 max-w-2xl mx-auto">
          {rules.map((rule, index) => (
            <ScrollRevealSection key={index} delay={0.15 + index * 0.05}>
              <motion.div
                whileHover={{ x: 8, backgroundColor: "hsla(270, 40%, 15%, 0.6)" }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 p-5 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <span className="text-lg font-medium">{rule}</span>
              </motion.div>
            </ScrollRevealSection>
          ))}
        </div>

        <ScrollRevealSection delay={0.5}>
          <p className="text-center text-muted-foreground mt-12">
            We want this world to feel safe and welcoming for{" "}
            <span className="text-primary font-semibold">ALL</span> Laypeople.
          </p>
        </ScrollRevealSection>
      </div>
    </section>
  );
};

export default RulesSection;
