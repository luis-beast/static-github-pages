import { useRef, useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedCountProps {
  value: number;
  className?: string;
}

const AnimatedCount = memo(function AnimatedCount({ value, className = "" }: AnimatedCountProps) {
  const prevValueRef = useRef(value);
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    if (value > prevValueRef.current) setDirection("up");
    else if (value < prevValueRef.current) setDirection("down");
    prevValueRef.current = value;
  }, [value]);

  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        {value > 0 && (
          <motion.span
            key={value}
            initial={{ y: direction === "up" ? 10 : -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: direction === "up" ? -10 : 10, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="inline-block"
          >
            {value}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
});

export default AnimatedCount;
