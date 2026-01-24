import { memo } from "react";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import HomeSocialsSection from "@/components/home/HomeSocialsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import PageWrapper from "@/components/PageWrapper";
import usePageTitle from "@/hooks/usePageTitle";

const Home = memo(function Home() {
  usePageTitle();

  return (
    <PageWrapper>
      <HeroSection />
      <AboutSection />
      <HomeSocialsSection />
      <FeaturesSection />
    </PageWrapper>
  );
});

export default Home;
