import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquareQuote, Terminal, ArrowRight } from "lucide-react";
import ScrollRevealSection from "./ScrollRevealSection";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: typeof Terminal;
  path: string;
  gradient: string;
}

const FEATURES: Feature[] = [
  {
    id: "commands",
    title: "The Commands",
    description: "All the chat commands you need to interact with the stream. From fun to functional.",
    icon: Terminal,
    path: "/commands",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "quotes",
    title: "The Quotes",
    description: "A collection of the most memorable, hilarious, and questionable things said on stream.",
    icon: MessageSquareQuote,
    path: "/quotes",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
];

interface FeatureCardProps {
  feature: Feature;
  index: number;
  isReversed: boolean;
}

const FeatureCard = memo(function FeatureCard({ feature, index, isReversed }: FeatureCardProps) {
  const { title, description, icon: Icon, path, gradient } = feature;

  return (
    <ScrollRevealSection delay={0.1 + index * 0.1}>
      <motion.div
        className={`flex flex-col ${isReversed ? "sm:flex-row-reverse" : "sm:flex-row"} items-center gap-6 sm:gap-8 lg:gap-12`}
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex-shrink-0">
          <div
            className={`w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${gradient} border border-border/20 flex items-center justify-center backdrop-blur-sm`}
          >
            <Icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white/80" />
          </div>
        </div>

        <div
          className={`flex-1 flex flex-col text-center ${isReversed ? "sm:text-right sm:items-end" : "sm:text-left sm:items-start"} items-center`}
        >
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">{title}</h3>
          <p className="text-muted-foreground text-base lg:text-lg mb-4 sm:mb-6 max-w-md">{description}</p>
          <Link
            to={path}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-medium hover:bg-primary/20 hover:border-primary/30 transition-all duration-200 group text-sm sm:text-base"
          >
            Explore
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </ScrollRevealSection>
  );
});

const FeaturesSection = memo(function FeaturesSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollRevealSection>
          <p className="text-xl md:text-2xl text-muted-foreground text-center mb-20 font-light max-w-2xl mx-auto">
            Look around, but check the ones below out!
          </p>
        </ScrollRevealSection>

        <div className="space-y-16 sm:space-y-24 lg:space-y-32">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.path} feature={feature} index={index} isReversed={index % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeaturesSection;
