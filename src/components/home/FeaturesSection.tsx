import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tv, ShoppingBag, MessageSquareQuote, Terminal, ArrowRight, Radio } from "lucide-react";
import ScrollRevealSection from "./ScrollRevealSection";
import { useFeaturedPages } from "@/hooks/usePageAccess";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: typeof Tv;
  path: string;
  gradient: string;
}

// All possible features - visibility controlled by accessConfig
const ALL_FEATURES: Feature[] = [
  {
    id: "content",
    title: "The Content",
    description: "Check out the socials, clips, and the latest announcements from the stream.",
    icon: Tv,
    path: "/content",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "streams",
    title: "The Streams",
    description: "Everything about the streams — schedule, rules, games, setup, and where to watch.",
    icon: Radio,
    path: "/streams",
    gradient: "from-rose-500/20 to-red-500/20",
  },
  {
    id: "merch",
    title: "The Merch",
    description: "Rep the Layman Legion with official merchandise. Apparel, accessories, and more coming soon.",
    icon: ShoppingBag,
    path: "/merch",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: "quotes",
    title: "The Quotes",
    description: "A collection of the most memorable, hilarious, and questionable things said on stream.",
    icon: MessageSquareQuote,
    path: "/quotes",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: "commands",
    title: "The Commands",
    description: "All the chat commands you need to interact with the stream. From fun to functional.",
    icon: Terminal,
    path: "/commands",
    gradient: "from-green-500/20 to-emerald-500/20",
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
        className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-12`}
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Icon/Visual Side */}
        <div className="flex-shrink-0">
          <div className={`w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br ${gradient} border border-border/20 flex items-center justify-center backdrop-blur-sm`}>
            <Icon className="w-12 h-12 md:w-16 md:h-16 text-white/80" />
          </div>
        </div>

        {/* Content Side */}
        <div className={`flex-1 flex flex-col text-center ${isReversed ? "md:text-right md:items-end" : "md:text-left md:items-start"} items-center`}>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{title}</h3>
          <p className="text-muted-foreground text-lg mb-6 max-w-md">
            {description}
          </p>
          <Link
            to={path}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-medium hover:bg-primary/20 hover:border-primary/30 transition-all duration-200 group"
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
  // Get featured page IDs from access config (respects user role)
  const featuredPageIds = useFeaturedPages();
  
  // Filter features based on access control
  const visibleFeatures = useMemo(() => 
    ALL_FEATURES.filter(feature => featuredPageIds.includes(feature.id)),
    [featuredPageIds]
  );

  if (visibleFeatures.length === 0) return null;

  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollRevealSection>
          <p className="text-xl md:text-2xl text-muted-foreground text-center mb-20 font-light max-w-2xl mx-auto">
            If you want to dive deeper into what we've got going on...
          </p>
        </ScrollRevealSection>

        <div className="space-y-24 md:space-y-32">
          {visibleFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.path}
              feature={feature}
              index={index}
              isReversed={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeaturesSection;
