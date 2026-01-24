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

export type DateTimeFormat = 'smart' | 'absolute' | 'relative' | 'compact';

export interface DateTimeProps {
  date: Date | string;
  format?: DateTimeFormat;
  isMST?: boolean;
  showTimezone?: boolean;
  options?: SmartFormatOptions;
  showTooltip?: boolean;
  autoUpdate?: boolean;
  updateInterval?: number;
  className?: string;
  timezoneClassName?: string;
}

function parseDate(date: Date | string, isMST: boolean): Date {
  if (date instanceof Date) {
    return date;
  }
  
  if (isMST) {
    return parseMSTDateTime(date);
  }
  
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
  const parsedDate = useMemo(() => parseDate(date, isMST), [date, isMST]);
  const [, setTick] = useState(0);
  
  useEffect(() => {
    if (!autoUpdate) return;
    
    const usesRelative = format === 'relative' || format === 'smart' || format === 'compact';
    if (!usesRelative) return;
    
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, updateInterval);
    
    return () => clearInterval(interval);
  }, [autoUpdate, updateInterval, format]);
  
  const formattedDate = useMemo(
    () => formatDate(parsedDate, format, showTimezone, options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parsedDate, format, showTimezone, options, autoUpdate && format]
  );
  
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
  
  const timezoneAbbr = useMemo(() => {
    if (!showTimezone) return null;
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

export const DateTimeCompact = memo(function DateTimeCompact(
  props: Omit<DateTimeProps, 'format'>
) {
  return <DateTime {...props} format="compact" />;
});

export const DateTimeRelative = memo(function DateTimeRelative(
  props: Omit<DateTimeProps, 'format'>
) {
  return <DateTime {...props} format="relative" showTimezone={false} />;
});

export const DateTimeAbsolute = memo(function DateTimeAbsolute(
  props: Omit<DateTimeProps, 'format'>
) {
  return <DateTime {...props} format="absolute" />;
});
