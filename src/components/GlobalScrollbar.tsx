import { useState, memo, useCallback, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const MIN_THUMB_HEIGHT = 40;
const SCROLL_HIDE_DELAY = 1000;

const GlobalScrollbar = memo(function GlobalScrollbar() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const scrollTimeoutRef = useRef<number>();

  const thumbHeight = useMotionValue(0);
  const thumbTop = useMotionValue(0);
  const animatedThumbHeight = useSpring(thumbHeight, { stiffness: 300, damping: 30 });
  const animatedThumbTop = useSpring(thumbTop, { stiffness: 300, damping: 30 });

  const updateScrollbarDimensions = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const contentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    );
    const currentScrollPosition = window.scrollY;
    const hasOverflow = contentHeight > viewportHeight + 5;

    setCanScroll(hasOverflow);

    if (hasOverflow) {
      const visibleRatio = viewportHeight / contentHeight;
      const newThumbHeight = Math.max(MIN_THUMB_HEIGHT, viewportHeight * visibleRatio);
      const scrollableDistance = contentHeight - viewportHeight;
      const thumbTrackSpace = viewportHeight - newThumbHeight;
      const scrollProgress = scrollableDistance > 0 ? currentScrollPosition / scrollableDistance : 0;

      thumbHeight.set(newThumbHeight);
      thumbTop.set(scrollProgress * thumbTrackSpace);
    } else {
      thumbHeight.set(0);
      thumbTop.set(0);
    }
  }, [thumbHeight, thumbTop]);

  const handleScroll = useCallback(() => {
    updateScrollbarDimensions();
    setIsScrolling(true);

    if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = window.setTimeout(() => setIsScrolling(false), SCROLL_HIDE_DELAY);
  }, [updateScrollbarDimensions]);

  const handleThumbDrag = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);

      const startY = e.clientY;
      const startScrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const contentHeight = document.documentElement.scrollHeight;
      const currentThumbHeight = thumbHeight.get();

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaY = moveEvent.clientY - startY;
        const thumbTrackSpace = viewportHeight - currentThumbHeight;
        const scrollableDistance = contentHeight - viewportHeight;
        const scrollDelta = (deltaY / thumbTrackSpace) * scrollableDistance;
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
    [thumbHeight]
  );

  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is fully rendered before measuring
    const frameId = requestAnimationFrame(() => {
      updateScrollbarDimensions();
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollbarDimensions);

    const mutationObserver = new MutationObserver(() => {
      requestAnimationFrame(updateScrollbarDimensions);
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollbarDimensions);
      mutationObserver.disconnect();
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, [updateScrollbarDimensions, handleScroll]);

  // Only show scrollbar when there's content to scroll
  if (!canScroll) return null;

  const isThumbVisible = isHovering || isDragging || isScrolling;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-3 z-[9999] pointer-events-none">
      <motion.div
        className={cn(
          "absolute right-0.5 w-2 rounded-full pointer-events-auto cursor-grab active:cursor-grabbing",
          "bg-gradient-to-b from-purple-400 to-purple-600"
        )}
        style={{ height: animatedThumbHeight, top: animatedThumbTop }}
        animate={{
          opacity: isThumbVisible ? 1 : 0.4,
          scale: isDragging ? 1.1 : isHovering ? 1.05 : 1,
        }}
        transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.15 } }}
        onMouseDown={handleThumbDrag}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{ boxShadow: "0 0 12px hsl(270, 100%, 60%)" }}
      />
    </div>
  );
});

export default GlobalScrollbar;
