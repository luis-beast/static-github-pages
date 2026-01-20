import { memo } from "react";
import { motion } from "framer-motion";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import ContentSocialsSection from "@/components/content/ContentSocialsSection";
import RulesSection from "@/components/home/RulesSection";
import ScheduleSection from "@/components/home/ScheduleSection";
import SetupSection from "@/components/home/SetupSection";
import GamesSection from "@/components/home/GamesSection";
import PageWrapper from "@/components/PageWrapper";

const Content = memo(function Content() {
  return (
    <PageWrapper>
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

      <ContentSocialsSection />
      <GamesSection />
      <ScheduleSection />
      <RulesSection />
      <SetupSection />
    </PageWrapper>
  );
});

export default Content;
