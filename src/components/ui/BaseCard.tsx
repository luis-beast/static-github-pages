import { memo, forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface BaseCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  /** Whether this card is interactive/clickable */
  interactive?: boolean;
  /** Whether this card is currently in an active/focused state */
  isActive?: boolean;
  /** Additional className for the outer wrapper */
  wrapperClassName?: string;
  /** Additional className for the inner card container */
  className?: string;
}

/**
 * BaseCard - A consistent card component used throughout the app
 * 
 * - Interactive cards have borders and hover effects
 * - Non-interactive cards have no border, just shadow
 */
const BaseCard = memo(forwardRef<HTMLDivElement, BaseCardProps>(function BaseCard(
  { 
    children, 
    interactive = false, 
    isActive = false, 
    wrapperClassName,
    className,
    ...motionProps 
  }, 
  ref
) {
  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative h-full",
        interactive && "cursor-pointer",
        wrapperClassName
      )}
      whileHover={{ scale: isActive ? 1 : interactive ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      {...motionProps}
    >
      {/* Glow effect - only for interactive cards */}
      {interactive && (
        <div 
          className={cn(
            "absolute inset-0 bg-primary/5 rounded-2xl blur-xl transition-opacity duration-500",
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )} 
        />
      )}

      <div 
        className={cn(
          "relative bg-card/60 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col border border-border/30",
          interactive
            ? isActive 
              ? "border-primary/60 shadow-2xl shadow-primary/25" 
              : "border-primary/30 shadow-xl shadow-primary/10 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/20"
            : "shadow-xl shadow-black/30",
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}));

export default BaseCard;
