import { memo, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LegalTextProps {
  children: ReactNode;
  emphasis?: boolean;
  highlight?: boolean;
  className?: string;
}

const LegalText = memo(function LegalText({
  children,
  emphasis = false,
  highlight = false,
  className,
}: LegalTextProps) {
  return (
    <p
      className={cn(
        "leading-relaxed",
        highlight
          ? "text-foreground font-semibold"
          : emphasis
          ? "text-muted-foreground font-medium"
          : "text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
});

export default LegalText;
