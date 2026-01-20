import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLayout } from "@/contexts/LayoutContext";

const VISIBILITY_THRESHOLD = 400;

const ScrollToTopButton = memo(function ScrollToTopButton() {
  const { scrollY, canScroll } = useLayout();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(canScroll && scrollY > VISIBILITY_THRESHOLD);
  }, [scrollY, canScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ArrowUp className="w-5 h-5 text-primary" />
        </motion.button>
      )}
    </AnimatePresence>
  );
});

export default ScrollToTopButton;
