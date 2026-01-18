import { useState, memo, useCallback, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const MIN_THUMB_HEIGHT = 40;
const SCROLL_HIDE_DELAY = 1000;

const GlobalScrollbar = memo(function GlobalScrollbar() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number>();
  const trackRef = useRef<HTMLDivElement>(null);

  const thumbHeight = useMotionValue(0);
  const thumbTop = useMotionValue(0);
  const animatedThumbHeight = useSpring(thumbHeight, { stiffness: 300, damping: 30 });
  const animatedThumbTop = useSpring(thumbTop, { stiffness: 300, damping: 30 });

  const updateScrollbarDimensions = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const contentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;
    const canScroll = contentHeight > viewportHeight + 1;

    if (canScroll) {
      const visibleRatio = viewportHeight / contentHeight;
      const newThumbHeight = Math.max(MIN_THUMB_HEIGHT, viewportHeight * visibleRatio);
      const scrollableDistance = contentHeight - viewportHeight;
      const thumbTrackSpace = viewportHeight - newThumbHeight;
      const scrollProgress = scrollableDistance > 0 ? scrollPosition / scrollableDistance : 0;

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

  const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).dataset.thumb) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const viewportHeight = window.innerHeight;
    const contentHeight = document.documentElement.scrollHeight;
    const scrollableDistance = contentHeight - viewportHeight;
    const targetScrollRatio = clickY / viewportHeight;

    window.scrollTo({ top: targetScrollRatio * scrollableDistance, behavior: "smooth" });
  }, []);

  useEffect(() => {
    updateScrollbarDimensions();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollbarDimensions);

    const mutationObserver = new MutationObserver(updateScrollbarDimensions);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    document.documentElement.style.scrollbarWidth = "none";
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";

    const styleElement = document.createElement("style");
    styleElement.id = "hide-native-scrollbar";
    styleElement.textContent = `
      ::-webkit-scrollbar { display: none !important; }
      html, body { scrollbar-width: none !important; }
    `;
    document.head.appendChild(styleElement);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollbarDimensions);
      mutationObserver.disconnect();
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
      document.getElementById("hide-native-scrollbar")?.remove();
    };
  }, [updateScrollbarDimensions, handleScroll]);

  const isThumbVisible = isHovering || isDragging || isScrolling;

  return (
    <div
      ref={trackRef}
      className="fixed right-0 top-0 bottom-0 w-4 z-[9999]"
      onClick={handleTrackClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        data-thumb="true"
        className={cn(
          "absolute right-1 w-2 rounded-full cursor-pointer",
          "bg-gradient-to-b from-purple-400 to-purple-600"
        )}
        style={{ height: animatedThumbHeight, top: animatedThumbTop }}
        animate={{
          opacity: isThumbVisible ? 1 : 0.3,
          scale: isDragging ? 1.15 : isHovering ? 1.05 : 1,
          width: isDragging ? 10 : 8,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.15 }, width: { duration: 0.15 } }}
        onMouseDown={handleThumbDrag}
        whileHover={{ boxShadow: "0 0 12px hsl(270, 100%, 60%)" }}
      />
    </div>
  );
});

export default GlobalScrollbar;
