import { Calendar } from "lucide-react";
import ScrollRevealSection from "./ScrollRevealSection";
import { motion } from "framer-motion";

const scheduleItems = [
  { day: "One Random Weekday", time: "Starting at 10 pm (CST)" },
  { day: "Friday", time: "Starting at 10 pm (CST)" },
  { day: "Saturday", time: "Starting at 5 pm (CST)" },
  { day: "Sunday", time: "Starting at 10 pm (CST)" },
];

const ScheduleSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollRevealSection>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Stream Schedule
            </h2>
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl text-muted-foreground text-center mb-4 font-light">
            Streams happen <span className="text-foreground font-medium">often</span>. 
            The best way to catch them is to follow and turn on notifications!
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.15}>
          <p className="text-muted-foreground/70 text-center mb-12 italic">
            Times may shift depending on life, work, or when inspiration strikes.
          </p>
        </ScrollRevealSection>

        <div className="grid gap-3">
          {scheduleItems.map((item, index) => (
            <ScrollRevealSection key={index} delay={0.2 + index * 0.05}>
              <motion.div
                whileHover={{ scale: 1.01, x: 4 }}
                className="flex items-center justify-between p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm"
              >
                <span className="font-semibold text-lg">{item.day}</span>
                <span className="text-muted-foreground font-mono text-sm">
                  {item.time}
                </span>
              </motion.div>
            </ScrollRevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
