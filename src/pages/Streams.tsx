import { memo } from "react";
import { motion } from "framer-motion";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import PageWrapper from "@/components/PageWrapper";
import usePageTitle from "@/hooks/usePageTitle";
import StreamingPlatformsSection from "@/components/streams/StreamingPlatformsSection";
import EmoteShowcaseSection from "@/components/streams/EmoteShowcaseSection";
import StreamPlaylistsSection from "@/components/streams/StreamPlaylistsSection";
import GamesSection from "@/components/home/GamesSection";
import ScheduleSection from "@/components/home/ScheduleSection";
import RulesSection from "@/components/home/RulesSection";
import SetupSection from "@/components/home/SetupSection";

const Streams = memo(function Streams() {
  usePageTitle("Streams");

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
            <GradientText gradient="louie">The Streams</GradientText>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
          >
            Everything about the streams — where to watch, what we play, and when we go live
          </motion.p>
        </div>
      </section>

      <StreamingPlatformsSection />
      <GamesSection />
      <ScheduleSection />
      <EmoteShowcaseSection />
      <StreamPlaylistsSection />
      <RulesSection />
      <SetupSection />
    </PageWrapper>
  );
});

export default Streams;
