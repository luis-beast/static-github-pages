import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

const routeOrder: Record<string, number> = {
  "/": 0,
  "/quotes": 1,
  "/commands": 2,
};

interface AnimatedPageWrapperProps {
  children: React.ReactNode;
}

const AnimatedPageWrapper = ({ children }: AnimatedPageWrapperProps) => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const [direction, setDirection] = useState<"left" | "right" | "fade">("fade");

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = location.pathname;

    if (prevPath === currentPath) return;

    // Going to or from home = fade
    if (currentPath === "/" || prevPath === "/") {
      setDirection("fade");
    } else {
      // Between quotes and commands
      const prevOrder = routeOrder[prevPath] ?? 0;
      const currentOrder = routeOrder[currentPath] ?? 0;
      setDirection(currentOrder > prevOrder ? "left" : "right");
    }

    prevPathRef.current = currentPath;
  }, [location.pathname]);

  const variants = {
    initial: (dir: "left" | "right" | "fade") => ({
      opacity: 0,
      x: dir === "fade" ? 0 : dir === "left" ? 100 : -100,
    }),
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: "left" | "right" | "fade") => ({
      opacity: 0,
      x: dir === "fade" ? 0 : dir === "left" ? -100 : 100,
    }),
  };

  return (
    <motion.div
      key={location.pathname}
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPageWrapper;
