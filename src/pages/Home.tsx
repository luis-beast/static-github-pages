import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import SocialsSection from "@/components/home/SocialsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import InfoSection from "@/components/home/InfoSection";

const Home = () => {
  return (
    <div className="overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[1200px] bg-primary/10 rounded-full blur-[200px]" />
      </div>
      <HeroSection />
      <AboutSection />
      <SocialsSection />
      <FeaturesSection />
      <InfoSection />
    </div>
  );
};

export default Home;
