import { memo } from "react";
import ScrollRevealSection from "./ScrollRevealSection";

const AboutSection = memo(function AboutSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl 3xl:max-w-6xl 5xl:max-w-7xl mx-auto text-center">
        <ScrollRevealSection>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl 3xl:text-7xl font-bold tracking-tight mb-6 sm:mb-8">YELLOW, LAYPEOPLE!</h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-lg sm:text-xl lg:text-2xl 3xl:text-3xl text-muted-foreground leading-relaxed mb-6 sm:mb-8 font-light">
            I'm LaymanLouie, but I always introduce myself and, NORMALLY, go by "Layman" or "The Layman". I'm here to
            create a space full of fun moments, good laughs, and a community you can feel comfortable in.
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.2}>
          <p className="text-base sm:text-lg lg:text-xl 3xl:text-2xl text-muted-foreground leading-relaxed mb-8 sm:mb-12">
            Whether we're gaming, talking, or just hanging out, the goal is always the same:
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.3}>
          <blockquote className="relative flex items-center justify-center gap-2 mb-12 sm:mb-16 lg:mb-20">
            <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 3xl:text-7xl text-primary font-serif leading-tight sm:leading-none">
              "Good vibes, good people, and a good time together."
            </span>
          </blockquote>
        </ScrollRevealSection>
      </div>
    </section>
  );
});

export default AboutSection;
