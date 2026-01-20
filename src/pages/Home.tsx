import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import HomeSocialsSection from "@/components/home/HomeSocialsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import InfoSection from "@/components/home/InfoSection";
import PageWrapper from "@/components/PageWrapper";

const Home = () => {
  return (
    <PageWrapper>
      <HeroSection />
      <AboutSection />
      <InfoSection />
      <HomeSocialsSection />
      <FeaturesSection />
    </PageWrapper>
  );
};

export default Home;
