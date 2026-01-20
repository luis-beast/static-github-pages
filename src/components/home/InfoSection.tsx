import { memo } from "react";
import ScrollRevealSection from "./ScrollRevealSection";

interface InfoItem {
  title: string;
  content: string;
}

const INFO_ITEMS: InfoItem[] = [
  {
    title: "Who Am I?",
    content: "I'm Louie, a content creator who found his passion in building genuine connections through gaming and community. What started as a hobby turned into something I truly care about.",
  },
  {
    title: "Where I Come From",
    content: "I grew up as a gamer at heart, always drawn to the social side of games. The friendships, the laughs, and the shared experiences are what kept me coming back.",
  },
  {
    title: "Why I Do This",
    content: "Creating content lets me be myself while bringing people together. There's something special about building a space where everyone feels welcome and can just be themselves.",
  },
  {
    title: "What Drives Me",
    content: "I believe in keeping things real and accessible. No gatekeeping, no pretense. Just honest conversations and good times with good people.",
  },
  {
    title: "The Goal",
    content: "To build a community that feels like home. A place where people can hang out, laugh, and connect with others who share the same energy.",
  },
];

const InfoSection = memo(function InfoSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollRevealSection>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6">
            Good to Know
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl text-muted-foreground text-center mb-16 font-light">
            A little more about me and what this is all about.
          </p>
        </ScrollRevealSection>

        <div className="space-y-6">
          {INFO_ITEMS.map((item, index) => (
            <ScrollRevealSection key={index} delay={0.15 + index * 0.08}>
              <div className="p-6 rounded-2xl bg-gradient-to-r from-muted/10 to-transparent backdrop-blur-sm border border-border/10">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {item.content}
                </p>
              </div>
            </ScrollRevealSection>
          ))}
        </div>
      </div>
    </section>
  );
});

export default InfoSection;
