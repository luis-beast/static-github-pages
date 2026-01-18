import { useState, useEffect, useCallback } from "react";
import { SCROLL_THRESHOLD } from "@/lib/constants";

interface UseScrollStateOptions {
  threshold?: number;
}

export const useScrollState = (options: UseScrollStateOptions = {}) => {
  const { threshold = SCROLL_THRESHOLD } = options;
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return isScrolled;
};
