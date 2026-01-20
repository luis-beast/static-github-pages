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
      <HomeSocialsSection />
      <InfoSection />
      <FeaturesSection />
    </PageWrapper>
  );
};

export default Home;
