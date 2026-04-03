import { useState, memo, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLayout } from "@/contexts/LayoutContext";

const MIN_THUMB_HEIGHT = 40;
const SCROLL_HIDE_DELAY = 1000;

const GlobalScrollbar = memo(function GlobalScrollbar() {
  const { canScroll, scrollY, scrollHeight, viewportHeight } = useLayout();

  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number>();
  const lastScrollY = useRef(scrollY);

  const visibleRatio = scrollHeight > 0 ? viewportHeight / scrollHeight : 1;
  const thumbHeightValue = canScroll ? Math.max(MIN_THUMB_HEIGHT, viewportHeight * visibleRatio) : 0;

  const scrollableDistance = scrollHeight - viewportHeight;
  const thumbTrackSpace = viewportHeight - thumbHeightValue;
  const scrollProgress = scrollableDistance > 0 ? scrollY / scrollableDistance : 0;
  const thumbTopValue = scrollProgress * thumbTrackSpace;

  useEffect(() => {
    if (scrollY !== lastScrollY.current) {
      lastScrollY.current = scrollY;
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, SCROLL_HIDE_DELAY);
    }

    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [scrollY]);

  const handleThumbDrag = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);

      const startY = e.clientY;
      const startScrollTop = window.scrollY;
      const currentThumbHeight = thumbHeightValue;
      const trackSpace = viewportHeight - currentThumbHeight;
      const scrollable = scrollHeight - viewportHeight;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaY = moveEvent.clientY - startY;
        const scrollDelta = trackSpace > 0 ? (deltaY / trackSpace) * scrollable : 0;
        window.scrollTo(0, startScrollTop + scrollDelta);
      };

      const onMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [thumbHeightValue, viewportHeight, scrollHeight],
  );

  const isThumbVisible = isHovering || isDragging || isScrolling;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-3 z-[9999] pointer-events-none" aria-hidden="true">
      <motion.div
        className={cn("absolute right-0.5 w-2 rounded-full pointer-events-auto cursor-grab active:cursor-grabbing")}
        style={{
          height: thumbHeightValue,
          top: thumbTopValue,
          background: "var(--gradient-scrollbar)",
        }}
        initial={{ opacity: 0.4 }}
        animate={{
          opacity: canScroll ? (isThumbVisible ? 1 : 0.4) : 0,
          scale: isDragging ? 1.1 : isHovering ? 1.05 : 1,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.1 } }}
        onMouseDown={handleThumbDrag}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{ boxShadow: "0 0 12px hsl(var(--primary))" }}
      />
    </div>
  );
});

export default GlobalScrollbar;
