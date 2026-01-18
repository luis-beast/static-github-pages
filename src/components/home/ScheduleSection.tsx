import ScrollRevealSection from "./ScrollRevealSection";
import { motion } from "framer-motion";

const schedule = [
  { day: "Mon", fullDay: "Monday", stream: null, isRandom: true },
  { day: "Tue", fullDay: "Tuesday", stream: null, isRandom: true },
  { day: "Wed", fullDay: "Wednesday", stream: null, isRandom: true },
  { day: "Thu", fullDay: "Thursday", stream: null, isRandom: true },
  { day: "Fri", fullDay: "Friday", stream: "10 PM", isRandom: false },
  { day: "Sat", fullDay: "Saturday", stream: "5 PM", isRandom: false },
  { day: "Sun", fullDay: "Sunday", stream: "10 PM", isRandom: false },
];

const ScheduleSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollRevealSection>
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">The Schedule</h2>
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl text-muted-foreground text-center mb-4 font-light">
            Streams happen <span className="text-foreground font-medium">often</span>. The best way to catch them is to
            follow and turn on notifications!
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.15}>
          <p className="text-muted-foreground/70 text-center mb-12 italic">
            Times may shift depending on life, work, or when inspiration strikes. All times are in CST.
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.2}>
          <div className="grid grid-cols-7 gap-2 md:gap-3">
            {schedule.map((item, index) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
                whileHover={{ scale: 1.03, y: -2 }}
                className={`
                  relative flex flex-col items-center p-3 md:p-5 rounded-xl md:rounded-2xl border backdrop-blur-sm
                  ${item.stream 
                    ? 'border-primary/50 bg-primary/10' 
                    : item.isRandom 
                      ? 'border-border/50 bg-card/30' 
                      : 'border-border/30 bg-card/20'
                  }
                `}
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
                      <span className="text-2xl md:text-3xl text-muted-foreground/50">?</span>
                      <p className="text-[9px] md:text-[10px] text-muted-foreground/60 mt-1 leading-tight">
                        Maybe!
                      </p>
                    </div>
                  ) : (
                    <span className="text-muted-foreground/40 text-xs">—</span>
                  )}
                </div>

                {/* Stream indicator dot */}
                {item.stream && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                )}
              </motion.div>
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
};

export default ScheduleSection;
