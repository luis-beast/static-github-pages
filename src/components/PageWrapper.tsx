import { memo, ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const PageWrapper = memo(function PageWrapper({ 
  children, 
  className = "" 
}: PageWrapperProps) {
  return (
    <div className={`flex-1 flex flex-col overflow-x-hidden relative ${className}`}>
      {/* Background glow effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[1200px] bg-primary/10 rounded-full blur-[200px]" />
      </div>
      
      {children}
    </div>
  );
});

export default PageWrapper;
