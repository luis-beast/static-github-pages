import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import RulesSection from "@/components/home/RulesSection";
import SocialsSection from "@/components/home/SocialsSection";
import DiscordSection from "@/components/home/DiscordSection";
import ScheduleSection from "@/components/home/ScheduleSection";
import SetupSection from "@/components/home/SetupSection";
import MerchSection from "@/components/home/MerchSection";
import FooterSection from "@/components/home/FooterSection";

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <RulesSection />
      <SocialsSection />
      <DiscordSection />
      <ScheduleSection />
      <SetupSection />
      <MerchSection />
      <FooterSection />
    </div>
  );
};

export default Home;
