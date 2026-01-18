import { cn } from "@/lib/utils";

interface ParameterBubbleProps {
  value: string;
  className?: string;
}

const ParameterBubble = ({ value, className }: ParameterBubbleProps) => (
  <span
    className={cn(
      "inline-flex items-center px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-sm font-mono",
      className
    )}
  >
    {value}
  </span>
);

export default ParameterBubble;
