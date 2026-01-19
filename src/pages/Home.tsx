import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import SocialsSection from "@/components/home/SocialsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import InfoSection from "@/components/home/InfoSection";
import PageWrapper from "@/components/PageWrapper";

const Home = () => {
  return (
    <PageWrapper>
      <HeroSection />
      <AboutSection />
      <SocialsSection />
      <InfoSection />
      <FeaturesSection />
    </PageWrapper>
  );
};

export default Home;
