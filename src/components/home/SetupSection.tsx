import { memo } from "react";
import ScrollRevealSection from "./ScrollRevealSection";

// Setup specifications
interface SetupSpec {
  label: string;
  value: string;
}

const SETUP_SPECS: SetupSpec[] = [
  { label: "CPU", value: "Intel Pentium G6400" },
  { label: "GPU", value: "NVIDIA GeForce GT 710" },
  { label: "Memory", value: "Crucial 4GB DDR4 2133MHz" },
  { label: "Storage", value: "Kingston A400 120GB SATA SSD" },
  { label: "Headset", value: "Logitech H111 Stereo Headset" },
  { label: "Microphone", value: "Logitech H111 Stereo Headset" },
] as const;

// Spec card component
interface SpecCardProps {
  spec: SetupSpec;
  index: number;
}

const SpecCard = memo(function SpecCard({ spec, index }: SpecCardProps) {
  return (
    <ScrollRevealSection delay={0.15 + index * 0.05}>
      <div className="p-6 rounded-2xl bg-gradient-to-br from-muted/15 to-transparent border border-border/20 backdrop-blur-sm transition-all duration-300 hover:border-border/40">
        <dt className="text-sm text-muted-foreground uppercase tracking-wider">
          {spec.label}
        </dt>
        <dd className="text-lg font-medium mt-1">{spec.value}</dd>
      </div>
    </ScrollRevealSection>
  );
});

const SetupSection = memo(function SetupSection() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto relative">
        <ScrollRevealSection>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-center mb-4 sm:mb-6">
            The Setup
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-lg sm:text-xl text-muted-foreground text-center mb-8 sm:mb-12 font-light">
            Curious about what I use to make the streams run?
          </p>
        </ScrollRevealSection>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SETUP_SPECS.map((spec, index) => (
            <SpecCard key={spec.label} spec={spec} index={index} />
          ))}
        </dl>
      </div>
    </section>
  );
});

export default SetupSection;
