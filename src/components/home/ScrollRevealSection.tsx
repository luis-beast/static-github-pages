import { motion, useInView } from "framer-motion";
import { useRef, memo, type ReactNode } from "react";
import { DURATION, EASING } from "@/lib/constants";

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Scroll-triggered reveal animation component
 * Animates in/out as elements enter/exit the viewport
 */
const ScrollRevealSection = memo(function ScrollRevealSection({
  children,
  className = "",
  delay = 0,
}: ScrollRevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: DURATION.reveal,
        delay: isInView ? delay : 0,
        ease: EASING.smooth,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

export default ScrollRevealSection;
