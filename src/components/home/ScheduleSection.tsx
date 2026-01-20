import { memo } from "react";
import { motion } from "framer-motion";
import ScrollRevealSection from "./ScrollRevealSection";

// Schedule configuration
interface ScheduleDay {
  day: string;
  fullDay: string;
  stream: string | null;
  isRandom: boolean;
}

const SCHEDULE: ScheduleDay[] = [
  { day: "Sun", fullDay: "Sunday", stream: "10 PM", isRandom: false },
  { day: "Mon", fullDay: "Monday", stream: null, isRandom: true },
  { day: "Tue", fullDay: "Tuesday", stream: null, isRandom: true },
  { day: "Wed", fullDay: "Wednesday", stream: null, isRandom: true },
  { day: "Thu", fullDay: "Thursday", stream: null, isRandom: true },
  { day: "Fri", fullDay: "Friday", stream: "10 PM", isRandom: false },
  { day: "Sat", fullDay: "Saturday", stream: "5 PM", isRandom: false },
] as const;

// Day card component
interface DayCardProps {
  item: ScheduleDay;
  index: number;
}

const DayCard = memo(function DayCard({ item, index }: DayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 + index * 0.05 }}
      className={`relative flex flex-col items-center p-3 md:p-5 rounded-xl md:rounded-2xl backdrop-blur-sm transition-all duration-300 ${
        item.stream
          ? "bg-gradient-to-b from-primary/15 to-primary/5 border border-primary/20"
          : item.isRandom
            ? "bg-gradient-to-b from-muted/20 to-transparent border border-border/20"
            : "bg-muted/10 border border-border/10"
      }`}
    >
      {/* Day header */}
      <span className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 md:mb-4">
        {item.day}
      </span>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60px] md:min-h-[80px]">
        {item.stream ? (
          <>
            <span className="text-lg md:text-2xl font-bold text-primary">{item.stream}</span>
            <span className="text-[10px] md:text-xs text-muted-foreground mt-1">CST</span>
          </>
        ) : item.isRandom ? (
          <div className="text-center">
            <span className="text-2xl md:text-3xl text-muted-foreground/50" aria-label="Maybe streaming">?</span>
            <p className="text-[9px] md:text-[10px] text-muted-foreground/60 mt-1 leading-tight">
              Maybe!
            </p>
          </div>
        ) : (
          <span className="text-muted-foreground/40 text-xs" aria-label="No stream">-</span>
        )}
      </div>

      {/* Stream indicator dot */}
      {item.stream && (
        <div
          className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"
          aria-label="Scheduled stream"
        />
      )}
    </motion.div>
  );
});

const ScheduleSection = memo(function ScheduleSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollRevealSection>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6">
            The Schedule
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl text-muted-foreground text-center mb-4 font-light">
            Streams happen <span className="text-foreground font-medium">often</span>. The best way
            to catch them is to follow and turn on notifications!
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.15}>
          <p className="text-muted-foreground/70 text-center mb-12 italic">
            Times may shift depending on life, work, or when inspiration strikes. All times are in
            CST.
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.2}>
          <div className="grid grid-cols-7 gap-2 md:gap-3" role="list" aria-label="Weekly stream schedule">
            {SCHEDULE.map((item, index) => (
              <DayCard key={item.day} item={item} index={index} />
            ))}
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.5}>
          <p className="text-center text-muted-foreground/60 mt-8 text-sm">
            <span className="text-primary">?</span> = One random weekday stream each week!
          </p>
        </ScrollRevealSection>
      </div>
    </section>
  );
});

export default ScheduleSection;
