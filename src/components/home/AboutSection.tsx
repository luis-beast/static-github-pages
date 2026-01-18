import ScrollRevealSection from "./ScrollRevealSection";

const AboutSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollRevealSection>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            <span>YELLOW, LAYPEOPLE!</span>
          </h2>
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
          <blockquote className="relative flex items-center justify-center gap-2">
            <span className="text-5xl md:text-6xl text-primary/70 font-serif leading-none self-start">"</span>
            <span className="text-5xl md:text-6xl text-primary font-serif leading-none self-end">
              Good vibes, good people, and a good time together.
            </span>
            <span className="text-5xl md:text-6xl text-primary/70 font-serif leading-none self-start">"</span>
          </blockquote>
        </ScrollRevealSection>
      </div>
    </section>
  );
};

export default AboutSection;
