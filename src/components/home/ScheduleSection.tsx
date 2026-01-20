import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import ScrollRevealSection from "./ScrollRevealSection";
import { convertScheduleTimeToLocal, getUserTimezoneAbbr } from "@/lib/timezone";

// Schedule configuration - times stored in MST
interface ScheduleDay {
  day: string;
  fullDay: string;
  streamMST: string | null; // Time in MST
  isRandom: boolean;
}

const SCHEDULE_MST: ScheduleDay[] = [
  { day: "Sun", fullDay: "Sunday", streamMST: "10 PM", isRandom: false },
  { day: "Mon", fullDay: "Monday", streamMST: null, isRandom: true },
  { day: "Tue", fullDay: "Tuesday", streamMST: null, isRandom: true },
  { day: "Wed", fullDay: "Wednesday", streamMST: null, isRandom: true },
  { day: "Thu", fullDay: "Thursday", streamMST: null, isRandom: true },
  { day: "Fri", fullDay: "Friday", streamMST: "10 PM", isRandom: false },
  { day: "Sat", fullDay: "Saturday", streamMST: "5 PM", isRandom: false },
] as const;

// Day card component
interface DayCardProps {
  item: ScheduleDay;
  index: number;
  localTime: string | null;
  timezoneAbbr: string;
}

const DayCard = memo(function DayCard({ item, index, localTime, timezoneAbbr }: DayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 + index * 0.05 }}
      className={`relative flex flex-col items-center p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl backdrop-blur-sm transition-all duration-300 ${
        localTime
          ? "bg-gradient-to-b from-primary/15 to-primary/5 border border-primary/20"
          : item.isRandom
            ? "bg-gradient-to-b from-muted/20 to-transparent border border-border/20"
            : "bg-muted/10 border border-border/10"
      }`}
    >
      {/* Day header - responsive abbreviation */}
      <span className="text-[10px] sm:text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3 lg:mb-4">
        <span className="sm:hidden">{item.day.charAt(0)}</span>
        <span className="hidden sm:inline">{item.day}</span>
      </span>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[50px] sm:min-h-[60px] lg:min-h-[80px]">
        {localTime ? (
          <>
            <span className="text-sm sm:text-lg lg:text-2xl font-bold text-primary whitespace-nowrap">{localTime}</span>
            <span className="text-[9px] sm:text-[10px] lg:text-xs text-muted-foreground mt-1">{timezoneAbbr}</span>
          </>
        ) : item.isRandom ? (
          <div className="text-center">
            <span className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground/50" aria-label="Maybe streaming">?</span>
            <p className="text-[8px] sm:text-[9px] lg:text-[10px] text-muted-foreground/60 mt-1 leading-tight hidden sm:block">
              Maybe!
            </p>
          </div>
        ) : (
          <span className="text-muted-foreground/40 text-xs" aria-label="No stream">-</span>
        )}
      </div>

      {/* Stream indicator dot */}
      {localTime && (
        <div
          className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-pulse"
          aria-label="Scheduled stream"
        />
      )}
    </motion.div>
  );
});

const ScheduleSection = memo(function ScheduleSection() {
  // Convert all schedule times to user's local timezone
  const { schedule, timezoneAbbr } = useMemo(() => {
    const abbr = getUserTimezoneAbbr();
    const converted = SCHEDULE_MST.map(item => ({
      ...item,
      localTime: item.streamMST ? convertScheduleTimeToLocal(item.streamMST) : null,
    }));
    return { schedule: converted, timezoneAbbr: abbr };
  }, []);

  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollRevealSection>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-center mb-4 sm:mb-6">
            The Schedule
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-lg sm:text-xl text-muted-foreground text-center mb-3 sm:mb-4 font-light">
            Streams happen <span className="text-foreground font-medium">often</span>. The best way
            to catch them is to follow and turn on notifications!
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.15}>
          <p className="text-sm sm:text-base text-muted-foreground/70 text-center mb-8 sm:mb-10 lg:mb-12 italic">
            Times may shift depending on life, work, or when inspiration strikes. All times shown in
            your local timezone ({timezoneAbbr}).
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.2}>
          <div className="grid grid-cols-7 gap-1 sm:gap-2 lg:gap-3" role="list" aria-label="Weekly stream schedule">
            {schedule.map((item, index) => (
              <DayCard 
                key={item.day} 
                item={item} 
                index={index} 
                localTime={item.localTime}
                timezoneAbbr={timezoneAbbr}
              />
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
