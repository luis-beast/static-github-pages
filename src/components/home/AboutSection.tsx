import ScrollRevealSection from "./ScrollRevealSection";

const AboutSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollRevealSection>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            <span>YELLOW, LAYPEOPLE</span>
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 font-light">
            I'm here to create a space full of fun moments, good laughs, and a community you can feel comfortable in.
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.2}>
          <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed mb-12">
            Whether we're gaming, talking, or just hanging out, the goal is always the same:
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.3}>
          <blockquote className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl text-primary/20 font-serif">
              "
              <p className="text-2xl md:text-3xl font-medium text-foreground italic">
                Good vibes, good people, and a good time together.
              </p>
              "
            </div>
          </blockquote>
        </ScrollRevealSection>
      </div>
    </section>
  );
};

export default AboutSection;
