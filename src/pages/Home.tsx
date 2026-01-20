import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import HomeSocialsSection from "@/components/home/HomeSocialsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import PageWrapper from "@/components/PageWrapper";

const Home = () => {
  return (
    <PageWrapper>
      <HeroSection />
      <AboutSection />
      <HomeSocialsSection />
      <FeaturesSection />
    </PageWrapper>
  );
};

export default Home;
