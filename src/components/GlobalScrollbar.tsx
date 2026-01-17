import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const GlobalScrollbar = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const trackRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth animations
  const thumbHeight = useMotionValue(100);
  const thumbTop = useMotionValue(0);
  
  // Spring animations for smooth transitions
  const springThumbHeight = useSpring(thumbHeight, { stiffness: 300, damping: 30 });
  const springThumbTop = useSpring(thumbTop, { stiffness: 300, damping: 30 });

  const calculateScrollbar = useCallback(() => {
    const containerHeight = window.innerHeight;
    const contentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    // Check if scrollbar is needed
    setShowScrollbar(contentHeight > containerHeight);

    // Calculate thumb size (minimum 40px)
    const ratio = containerHeight / contentHeight;
    const newThumbHeight = Math.max(40, containerHeight * ratio);
    
    // Calculate thumb position
    const scrollableHeight = contentHeight - containerHeight;
    const thumbTrackHeight = containerHeight - newThumbHeight;
    const scrollRatio = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
    const newThumbTop = scrollRatio * thumbTrackHeight;

    thumbHeight.set(newThumbHeight);
    thumbTop.set(newThumbTop);
  }, [thumbHeight, thumbTop]);

  // Update scrollbar on scroll
  const handleScroll = useCallback(() => {
    calculateScrollbar();
    setIsScrolling(true);
    
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }, [calculateScrollbar]);

  // Handle thumb drag
  const handleThumbDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    const startY = e.clientY;
    const startScrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const contentHeight = document.documentElement.scrollHeight;
    const currentThumbHeight = thumbHeight.get();

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const thumbTrackHeight = containerHeight - currentThumbHeight;
      const scrollableHeight = contentHeight - containerHeight;
      const scrollDelta = (deltaY / thumbTrackHeight) * scrollableHeight;
      window.scrollTo(0, startScrollTop + scrollDelta);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [thumbHeight]);

  // Handle track click
  const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Ignore if clicking on the thumb
    if ((e.target as HTMLElement).dataset.thumb) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const containerHeight = window.innerHeight;
    const contentHeight = document.documentElement.scrollHeight;
    
    const scrollableHeight = contentHeight - containerHeight;
    const targetScrollRatio = clickY / containerHeight;
    
    window.scrollTo({
      top: targetScrollRatio * scrollableHeight,
      behavior: "smooth"
    });
  }, []);

  // Set up event listeners
  useEffect(() => {
    // Initial calculation
    calculateScrollbar();

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Listen to resize events
    window.addEventListener("resize", calculateScrollbar);

    // MutationObserver to watch for content changes
    const observer = new MutationObserver(() => {
      calculateScrollbar();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });

    // Hide native scrollbar
    document.documentElement.style.scrollbarWidth = "none";
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    
    // Add style to hide webkit scrollbar
    const style = document.createElement("style");
    style.id = "hide-native-scrollbar";
    style.textContent = `
      ::-webkit-scrollbar { display: none !important; }
      html, body { scrollbar-width: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateScrollbar);
      observer.disconnect();
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      // Remove the style element
      const styleEl = document.getElementById("hide-native-scrollbar");
      if (styleEl) styleEl.remove();
    };
  }, [calculateScrollbar, handleScroll]);

  const shouldShowThumb = showScrollbar && (isHovering || isDragging || isScrolling);

  if (!showScrollbar) return null;

  return (
    <div
      ref={trackRef}
      className="fixed right-0 top-0 bottom-0 w-4 z-[9999]"
      onClick={handleTrackClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Scrollbar thumb - always visible with varying opacity */}
      <motion.div
        data-thumb="true"
        className={cn(
          "absolute right-1 w-2 rounded-full cursor-pointer",
          "bg-gradient-to-b from-purple-400 to-purple-600"
        )}
        style={{
          height: springThumbHeight,
          top: springThumbTop,
        }}
        animate={{ 
          opacity: shouldShowThumb ? 1 : 0.3,
          scale: isDragging ? 1.15 : isHovering ? 1.05 : 1,
          width: isDragging ? 10 : 8,
        }}
        transition={{ 
          opacity: { duration: 0.2 }, 
          scale: { duration: 0.15 },
          width: { duration: 0.15 }
        }}
        onMouseDown={handleThumbDrag}
        whileHover={{ 
          boxShadow: "0 0 12px hsl(270, 100%, 60%)",
        }}
      />
    </div>
  );
};

export default GlobalScrollbar;
