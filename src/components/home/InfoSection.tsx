import { memo } from "react";
import ScrollRevealSection from "./ScrollRevealSection";

const INFO_CONTENT = [
  "I'm Layman, a content creator who found his passion in building genuine connections through gaming and community. What started as a hobby turned into something I truly care about.",
  "I grew up as a gamer at heart, always drawn to the social side of games. The friendships, the laughs, and the shared experiences are what kept me coming back.",
  "Creating content lets me be myself while bringing people together. There's something special about building a space where everyone feels welcome and can just be themselves.",
  "I believe in keeping things real and accessible. No gatekeeping, no pretense. Just honest conversations and good times with good people.",
  "The goal is to build a community that feels like home. A place where people can hang out, laugh, and connect with others who share the same energy.",
];

const InfoSection = memo(function InfoSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        {INFO_CONTENT.map((paragraph, index) => (
          <ScrollRevealSection key={index} delay={index * 0.1}>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light text-center">
              {paragraph}
            </p>
          </ScrollRevealSection>
        ))}
      </div>
    </section>
  );
});

export default InfoSection;
