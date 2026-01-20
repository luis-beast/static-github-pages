import { memo } from "react";
import ScrollRevealSection from "./ScrollRevealSection";

interface InfoBlock {
  content: string;
  align: "left" | "center" | "right";
}

const INFO_BLOCKS: InfoBlock[] = [
  {
    content: "I'm Layman, a content creator who found his passion in building genuine connections through gaming and community. What started as a hobby turned into something I truly care about.",
    align: "left",
  },
  {
    content: "I grew up as a gamer at heart, always drawn to the social side of games. The friendships, the laughs, and the shared experiences are what kept me coming back.",
    align: "right",
  },
  {
    content: "Creating content lets me be myself while bringing people together. There's something special about building a space where everyone feels welcome and can just be themselves.",
    align: "center",
  },
  {
    content: "I believe in keeping things real and accessible. No gatekeeping, no pretense. Just honest conversations and good times with good people.",
    align: "left",
  },
  {
    content: "The goal is to build a community that feels like home. A place where people can hang out, laugh, and connect with others who share the same energy.",
    align: "right",
  },
];

const InfoSection = memo(function InfoSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        {INFO_BLOCKS.map((block, index) => (
          <ScrollRevealSection key={index} delay={index * 0.1}>
            <p
              className={`text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-2xl ${
                block.align === "left"
                  ? "text-left mr-auto"
                  : block.align === "right"
                  ? "text-right ml-auto"
                  : "text-center mx-auto"
              }`}
            >
              {block.content}
            </p>
          </ScrollRevealSection>
        ))}
      </div>
    </section>
  );
});

export default InfoSection;
