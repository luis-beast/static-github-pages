import { memo } from "react";
import { motion } from "framer-motion";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import PageWrapper from "@/components/PageWrapper";
import usePageTitle from "@/hooks/usePageTitle";
import { siteConfig } from "@/config/siteConfig";
import FanArtGallerySection from "@/components/community/FanArtGallerySection";
import CommunitySpotlightsSection from "@/components/community/CommunitySpotlightsSection";
import JoinCommunitySection from "@/components/community/JoinCommunitySection";

const Laypeople = memo(function Laypeople() {
  usePageTitle("The Laypeople");

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
            <GradientText gradient="louie">{siteConfig.streamer.communityName}</GradientText>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
          >
            The community that makes this all worth it. From fan art to inside jokes, 
            this is where the Laypeople shine.
          </motion.p>
        </div>
      </section>

      <FanArtGallerySection />
      <CommunitySpotlightsSection />
      <JoinCommunitySection />
    </PageWrapper>
  );
});

export default Laypeople;
