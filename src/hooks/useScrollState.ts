import { useState, useEffect, useCallback } from "react";
import { SCROLL_THRESHOLD } from "@/lib/constants";

interface UseScrollStateOptions {
  threshold?: number;
}

/**
 * Custom hook for tracking scroll position state
 * Optimized with passive event listener and cleanup
 */
export function useScrollState(options: UseScrollStateOptions = {}) {
  const { threshold = SCROLL_THRESHOLD } = options;
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    // Check initial state
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return isScrolled;
}
