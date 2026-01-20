import { memo, ReactNode, useEffect } from "react";
import { useLayout } from "@/contexts/LayoutContext";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const PageWrapper = memo(function PageWrapper({ 
  children, 
  className = "" 
}: PageWrapperProps) {
  const { refreshScrollState } = useLayout();

  // Refresh scroll state when page content mounts/changes
  useEffect(() => {
    // Small delay to ensure content is rendered
    const timeoutId = setTimeout(() => {
      refreshScrollState();
    }, 50);
    
    return () => clearTimeout(timeoutId);
  }, [refreshScrollState]);

  return (
    <div className={`flex-1 flex flex-col relative ${className}`}>
      {/* Background glow effect */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[1200px] bg-primary/10 rounded-full blur-[200px]" />
      </div>
      
      {children}
    </div>
  );
});

export default PageWrapper;
