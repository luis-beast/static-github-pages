import { memo, useMemo, useEffect, useState } from "react";
import {
  formatSmartDateTime,
  formatAbsoluteDateTime,
  formatCompact,
  formatRelativeTime,
  parseMSTDateTime,
  getUserTimezoneAbbr,
  getTooltipDateTime,
  type SmartFormatOptions,
} from "@/lib/dateTime";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export type DateTimeFormat = 'smart' | 'absolute' | 'relative' | 'compact';

export interface DateTimeProps {
  /** 
   * The date to display. Can be:
   * - A Date object
   * - An MST datetime string in "MM/DD/YY HH:mm" format
   * - An ISO date string
   */
  date: Date | string;
  
  /** 
   * The format to use for display
   * - 'smart': Relative for recent, absolute for older (default)
   * - 'absolute': Always show full date/time
   * - 'relative': Always show relative time
   * - 'compact': Short format for cards/lists
   */
  format?: DateTimeFormat;
  
  /** 
   * If true, the input string is in MST format "MM/DD/YY HH:mm"
   * If false, the input is treated as a standard date string or Date object
   */
  isMST?: boolean;
  
  /** Show timezone abbreviation after the time */
  showTimezone?: boolean;
  
  /** Additional options for formatting */
  options?: SmartFormatOptions;
  
  /** Show tooltip with full date on hover */
  showTooltip?: boolean;
  
  /** 
   * Auto-update relative times in real-time
   * Only applies to 'smart', 'relative', and 'compact' formats
   */
  autoUpdate?: boolean;
  
  /** Update interval in milliseconds (default: 60000 = 1 minute) */
  updateInterval?: number;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Custom styling for the timezone abbreviation */
  timezoneClassName?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

function parseDate(date: Date | string, isMST: boolean): Date {
  if (date instanceof Date) {
    return date;
  }
  
  if (isMST) {
    return parseMSTDateTime(date);
  }
  
  // Try to parse as ISO or standard date string
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    console.warn(`Invalid date string: ${date}`);
    return new Date();
  }
  return parsed;
}

function formatDate(
  date: Date,
  format: DateTimeFormat,
  showTimezone: boolean,
  options?: SmartFormatOptions
): string {
  const opts = { ...options, includeTimezone: showTimezone };
  
  switch (format) {
    case 'smart':
      return formatSmartDateTime(date, opts);
    case 'absolute':
      return formatAbsoluteDateTime(date, opts);
    case 'relative':
      return formatRelativeTime(date);
    case 'compact':
      return formatCompact(date);
    default:
      return formatSmartDateTime(date, opts);
  }
}

// ============================================================================
// Component
// ============================================================================

/**
 * A reusable date/time display component with smart formatting.
 * 
 * Features:
 * - Smart hybrid formatting (relative for recent, absolute for older)
 * - Automatic timezone conversion from MST to user's local time
 * - Tooltip with full date/time on hover
 * - Auto-updating relative times
 * - Compact format for cards and lists
 * 
 * @example
 * // Smart format (default) - shows "5 min ago" or "Jan 20, 2026 at 3:45 PM MST"
 * <DateTime date="01/20/26 15:45" isMST />
 * 
 * @example
 * // Compact format for cards
 * <DateTime date={new Date()} format="compact" />
 * 
 * @example
 * // Always relative with auto-update
 * <DateTime date={new Date()} format="relative" autoUpdate />
 */
const DateTime = memo(function DateTime({
  date,
  format = 'smart',
  isMST = false,
  showTimezone = true,
  options,
  showTooltip = true,
  autoUpdate = false,
  updateInterval = 60000,
  className,
  timezoneClassName,
}: DateTimeProps) {
  // Parse the date once
  const parsedDate = useMemo(() => parseDate(date, isMST), [date, isMST]);
  
  // State for auto-updating
  const [, setTick] = useState(0);
  
  // Auto-update effect
  useEffect(() => {
    if (!autoUpdate) return;
    
    // Only auto-update for formats that use relative time
    const usesRelative = format === 'relative' || format === 'smart' || format === 'compact';
    if (!usesRelative) return;
    
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, updateInterval);
    
    return () => clearInterval(interval);
  }, [autoUpdate, updateInterval, format]);
  
  // Format the date
  const formattedDate = useMemo(
    () => formatDate(parsedDate, format, showTimezone, options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parsedDate, format, showTimezone, options, autoUpdate && format]
  );
  
  // Tooltip content
  const tooltipContent = useMemo(() => {
    if (!showTooltip) return null;
    
    if (isMST && typeof date === 'string') {
      return getTooltipDateTime(date);
    }
    
    return formatAbsoluteDateTime(parsedDate, {
      includeDate: true,
      includeTime: true,
      includeYear: true,
      includeTimezone: true,
    });
  }, [showTooltip, isMST, date, parsedDate]);
  
  // Timezone abbreviation
  const timezoneAbbr = useMemo(() => {
    if (!showTimezone) return null;
    // For compact and relative formats, we append timezone separately
    if (format === 'compact' || format === 'relative') {
      return getUserTimezoneAbbr();
    }
    return null;
  }, [showTimezone, format]);
  
  const content = (
    <time 
      dateTime={parsedDate.toISOString()} 
      className={cn("text-muted-foreground", className)}
    >
      {formattedDate}
      {timezoneAbbr && (
        <span className={cn("text-muted-foreground/60 text-sm ml-1", timezoneClassName)}>
          {timezoneAbbr}
        </span>
      )}
    </time>
  );
  
  if (!showTooltip || !tooltipContent) {
    return content;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

export default DateTime;

// ============================================================================
// Specialized Variants
// ============================================================================

/**
 * Compact date display for cards and lists
 * Shows: "5m ago" | "2h ago" | "Jan 20"
 */
export const DateTimeCompact = memo(function DateTimeCompact(
  props: Omit<DateTimeProps, 'format'>
) {
  return <DateTime {...props} format="compact" />;
});

/**
 * Always shows relative time
 * Shows: "5 minutes ago" | "2 hours ago" | "3 days ago"
 */
export const DateTimeRelative = memo(function DateTimeRelative(
  props: Omit<DateTimeProps, 'format'>
) {
  return <DateTime {...props} format="relative" showTimezone={false} />;
});

/**
 * Always shows absolute date/time
 * Shows: "Jan 20, 2026 at 3:45 PM MST"
 */
export const DateTimeAbsolute = memo(function DateTimeAbsolute(
  props: Omit<DateTimeProps, 'format'>
) {
  return <DateTime {...props} format="absolute" />;
});
