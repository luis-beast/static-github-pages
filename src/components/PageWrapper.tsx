import { memo, ReactNode, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useLayout } from "@/contexts/LayoutContext";
import { DURATION, EASING } from "@/lib/constants";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const PageWrapper = memo(function PageWrapper({ 
  children, 
  className = "" 
}: PageWrapperProps) {
  const { refreshScrollState } = useLayout();

  // Scroll to top BEFORE paint - this runs after old page has exited
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Refresh scroll state when page content mounts/changes
  useEffect(() => {
    // Small delay to ensure content is rendered
    const timeoutId = setTimeout(() => {
      refreshScrollState();
    }, 50);
    
    return () => clearTimeout(timeoutId);
  }, [refreshScrollState]);

  return (
    <motion.div
      className={`flex-1 flex flex-col relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.fast, ease: EASING.smooth }}
    >
      {/* Background glow effect */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[1200px] bg-primary/10 rounded-full blur-[200px]" />
      </div>
      
      {children}
    </motion.div>
  );
});

export default PageWrapper;
