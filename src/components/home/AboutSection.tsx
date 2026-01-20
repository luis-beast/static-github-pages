import { memo } from "react";
import ScrollRevealSection from "./ScrollRevealSection";

const AboutSection = memo(function AboutSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollRevealSection>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">YELLOW, LAYPEOPLE!</h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 font-light">
            I'm here to create a space full of fun moments, good laughs, and a community you can feel comfortable in.
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.2}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
            Whether we're gaming, talking, or just hanging out, the goal is always the same:
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.3}>
          <blockquote className="relative flex items-center justify-center gap-2 mb-20">
            <span className="text-5xl md:text-6xl text-primary font-serif leading-none self-end">
              "Good vibes, good people, and a good time together."
            </span>
          </blockquote>
        </ScrollRevealSection>

        <div className="max-w-3xl mx-auto space-y-12">
          <ScrollRevealSection delay={0.4}>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              I'm LaymanLouie, but I always go by "Layman" or "The Layman". Yet another content creator who found his
              passion in building genuine connections through gaming and community. What started as a hobby turned into
              something I truly care about.
            </p>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.5}>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              I grew up as a gamer at heart, but always drawn to the social side of games. The friendships, the laughs,
              and the shared experiences are what kept me coming back.
            </p>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.6}>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Creating content lets me be myself while bringing people together. There's something special about
              building a space where everyone feels welcome and can just be themselves.
            </p>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.7}>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              I believe in keeping things real and accessible. No gatekeeping, no pretense. Just honest conversations
              and good times with good people.
            </p>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.8}>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              The goal is to build a community that feels like home. A place where people can hang out, laugh, and
              connect with others who share the same energy.
            </p>
          </ScrollRevealSection>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
