import { Heart } from "lucide-react";
import ScrollRevealSection from "./ScrollRevealSection";

const FooterSection = () => {
  return (
    <footer className="py-16 px-6 border-t border-border/30">
      <ScrollRevealSection>
        <p className="text-center text-muted-foreground">
          Made with{" "}
          <Heart className="w-4 h-4 inline text-primary mx-1" />
          by The Layman Legion
        </p>
      </ScrollRevealSection>
    </footer>
  );
};

export default FooterSection;
