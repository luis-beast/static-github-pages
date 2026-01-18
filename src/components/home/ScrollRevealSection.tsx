import { motion, useInView } from "framer-motion";
import { useRef, memo, useState, useEffect, type ReactNode } from "react";
import { DURATION, EASING } from "@/lib/constants";

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollRevealSection = memo(function ScrollRevealSection({
  children,
  className = "",
  delay = 0,
}: ScrollRevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  // Trigger reveal when scrolling down into view
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  // Reset only when scrolled far above the element (300px above viewport)
  const isAboveReset = useInView(ref, { once: false, margin: "300px 0px -100% 0px" });

  useEffect(() => {
    if (isInView && !hasRevealed) {
      setHasRevealed(true);
    }
    // Reset when scrolled far above (element is no longer in the "above reset" zone)
    if (!isAboveReset && hasRevealed) {
      setHasRevealed(false);
    }
  }, [isInView, isAboveReset, hasRevealed]);

  const shouldShow = hasRevealed || isInView;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: DURATION.reveal, delay: shouldShow ? delay : 0, ease: EASING.smooth }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

export default ScrollRevealSection;
