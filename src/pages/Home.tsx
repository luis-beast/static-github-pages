import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import RulesSection from "@/components/home/RulesSection";
import SocialsSection from "@/components/home/SocialsSection";
import ScheduleSection from "@/components/home/ScheduleSection";
import SetupSection from "@/components/home/SetupSection";
import MerchSection from "@/components/home/MerchSection";

const Home = () => {
  return (
    <div className="overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[1200px] bg-primary/10 rounded-full blur-[200px]" />
      </div>
      <HeroSection />
      <AboutSection />
      <RulesSection />
      <SocialsSection />
      <ScheduleSection />
      <SetupSection />
      <MerchSection />
    </div>
  );
};

export default Home;
