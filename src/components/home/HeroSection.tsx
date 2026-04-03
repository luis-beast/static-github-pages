import { memo, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASING, DURATION } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import avatar from "@/assets/avatar.png";

const IDLE_TIMEOUT = 5000;

const HeroSection = memo(function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const [showArrow, setShowArrow] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timerRef.current = setTimeout(() => setShowArrow(true), IDLE_TIMEOUT);
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v > 0.05) {
        setShowArrow(false);
        clearTimeout(timerRef.current);
      } else if (v <= 0.05) {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setShowArrow(true), IDLE_TIMEOUT);
      }
    });
  }, [scrollYProgress]);

  const scrollToContent = () => {
    const hero = ref.current;
    if (hero) {
      const next = hero.nextElementSibling as HTMLElement | null;
      next?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <motion.div style={{ opacity, scale, y }} className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.reveal, ease: EASING.smooth }}
          className="relative mb-8 inline-block"
        >
          <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl scale-110" aria-hidden="true" />
          <div className="relative w-32 h-32 md:w-44 md:h-44 3xl:w-56 3xl:h-56 rounded-full overflow-hidden ring-2 ring-primary/50">
            <img src={avatar} alt="LaymanLouie avatar" className="w-full h-full object-cover" loading="eager" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
          className="text-5xl md:text-7xl lg:text-8xl 3xl:text-9xl font-bold tracking-tight mb-6"
        >
          <GradientText gradient="layman">Layman</GradientText>
          <GradientText gradient="louie">Louie</GradientText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, delay: 0.4, ease: EASING.smooth }}
          className="text-xl md:text-2xl 3xl:text-3xl text-muted-foreground max-w-xl mx-auto mb-10 font-light"
        >
          Welcome to The Layman's World
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {showArrow && (
          <motion.button
            key="scroll-arrow"
            onClick={scrollToContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7, y: [0, 10, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeOut" },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute bottom-[15vh] z-20 p-3 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
});

export default HeroSection;
