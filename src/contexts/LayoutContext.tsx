import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode, memo } from "react";

interface LayoutContextValue {
  isScrolled: boolean;
  canScroll: boolean;
  scrollY: number;
  scrollHeight: number;
  viewportHeight: number;
  refreshScrollState: () => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

const SCROLL_THRESHOLD = 20;

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = memo(function LayoutProvider({ children }: LayoutProviderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  const rafRef = useRef<number>();

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY;
    const currentViewportHeight = window.innerHeight;
    const currentScrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    );
    
    const hasOverflow = currentScrollHeight > currentViewportHeight + 5;
    
    setScrollY(currentScrollY);
    setViewportHeight(currentViewportHeight);
    setScrollHeight(currentScrollHeight);
    setIsScrolled(currentScrollY > SCROLL_THRESHOLD);
    setCanScroll(hasOverflow);
  }, []);

  const refreshScrollState = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(updateScrollState);
  }, [updateScrollState]);

  useEffect(() => {
    refreshScrollState();

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateScrollState);
    };

    const handleResize = () => {
      refreshScrollState();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [refreshScrollState, updateScrollState]);

  return (
    <LayoutContext.Provider
      value={{
        isScrolled,
        canScroll,
        scrollY,
        scrollHeight,
        viewportHeight,
        refreshScrollState,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
});

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

export function useIsScrolled() {
  return useLayout().isScrolled;
}

export function useCanScroll() {
  return useLayout().canScroll;
}
