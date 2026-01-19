import { memo } from "react";
import { motion } from "framer-motion";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import RulesSection from "@/components/home/RulesSection";
import ScheduleSection from "@/components/home/ScheduleSection";
import SetupSection from "@/components/home/SetupSection";
import GamesSection from "@/components/home/GamesSection";

const Content = memo(function Content() {
  return (
    <div className="overflow-x-hidden relative">
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
            <GradientText gradient="louie">The Content</GradientText>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
          >
            Everything about the streams, socials, and what makes The Layman such a Layman
          </motion.p>
        </div>
      </section>

      <GamesSection />
      <ScheduleSection />
      <RulesSection />
      <SetupSection />
    </div>
  );
});

export default Content;
