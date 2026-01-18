import { memo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASING, DURATION } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import avatar from "@/assets/avatar.png";

const HeroSection = memo(function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <motion.div style={{ opacity, scale, y }} className="relative z-10 text-center px-6">
        {/* Avatar with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.reveal, ease: EASING.smooth }}
          className="relative mb-8 inline-block"
        >
          <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl scale-110" aria-hidden="true" />
          <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden ring-2 ring-primary/50">
            <img
              src={avatar}
              alt="LaymanLouie avatar"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <GradientText gradient="layman">Layman</GradientText>
          <GradientText gradient="louie">Louie</GradientText>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, delay: 0.4, ease: EASING.smooth }}
          className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto mb-10 font-light"
        >
          Welcome to The Layman's World
        </motion.p>
      </motion.div>
    </section>
  );
});

export default HeroSection;
