import { Monitor } from "lucide-react";
import ScrollRevealSection from "./ScrollRevealSection";

const setupSpecs = [
  { label: "CPU", value: "Intel Pentium G6400" },
  { label: "GPU", value: "NVIDIA GeForce GT 710" },
  { label: "Memory", value: "Crucial 4GB DDR4 2133MHz" },
  { label: "Storage", value: "Kingston A400 120GB SATA SSD" },
  { label: "Headset", value: "Logitech H111 Stereo Headset" },
  { label: "Microphone", value: "Logitech H111 Stereo Headset" },
];

const SetupSection = () => {
  return (
    <section className="py-32 px-6 relative">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <ScrollRevealSection>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <Monitor className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              The Setup
            </h2>
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl text-muted-foreground text-center mb-12 font-light">
            Curious about the tech that makes the stream run?
          </p>
        </ScrollRevealSection>

        <div className="grid md:grid-cols-2 gap-4">
          {setupSpecs.map((spec, index) => (
            <ScrollRevealSection key={index} delay={0.15 + index * 0.05}>
              <div className="p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {spec.label}
                </span>
                <p className="text-lg font-medium mt-1">{spec.value}</p>
              </div>
            </ScrollRevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SetupSection;
