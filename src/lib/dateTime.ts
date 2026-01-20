/**
 * Enhanced Date/Time Utility
 * 
 * All times are stored in MST (Mountain Standard Time, UTC-7).
 * This utility provides smart hybrid formatting that shows:
 * - Relative time for recent dates (e.g., "5 min ago", "2 hours ago")
 * - Absolute time for older dates (e.g., "Jan 20, 2026 at 3:45 PM")
 */

// ============================================================================
// Configuration
// ============================================================================

export const DateTimeConfig = {
  /** All stored times are in MST (Mountain Standard Time) */
  storageTimezone: 'America/Denver',
  /** MST offset in hours from UTC */
  mstOffsetHours: -7,
  /** Show relative time for dates within this many hours */
  relativeThresholdHours: 24,
  /** Show "just now" for dates within this many seconds */
  justNowThresholdSeconds: 60,
} as const;

// ============================================================================
// MST Parsing Utilities
// ============================================================================

/**
 * Parse a date string in "MM/DD/YY HH:mm" format (stored in MST)
 * and return a Date object in UTC
 */
export function parseMSTDateTime(dateTimeStr: string): Date {
  const [datePart, timePart] = dateTimeStr.split(' ');
  const [month, day, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  
  // Convert 2-digit year to 4-digit (assumes 2000s)
  const fullYear = 2000 + year;
  
  // Create date as if it's in MST, then adjust to UTC
  // MST is UTC-7, so we add 7 hours to get UTC
  return new Date(Date.UTC(fullYear, month - 1, day, hours + 7, minutes));
}

/**
 * Parse a time string like "10 PM" or "5 PM" in MST
 * and return a Date object for today with that time in UTC
 */
export function parseMSTTime(timeStr: string): Date | null {
  const match = timeStr.match(/(\d+)\s*(AM|PM)/i);
  if (!match) return null;
  
  let hours = parseInt(match[1], 10);
  const isPM = match[2].toUpperCase() === 'PM';
  
  // Convert to 24-hour format
  if (isPM && hours !== 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;
  
  // Create a date object for today with this time in MST
  const now = new Date();
  return new Date(Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours + 7, // MST is UTC-7, add 7 to get UTC
    0
  ));
}

// ============================================================================
// Timezone Utilities
// ============================================================================

/**
 * Get the user's timezone abbreviation (e.g., "MST", "EST", "GMT")
 */
export function getUserTimezoneAbbr(): string {
  const date = new Date();
  const timeZoneStr = date.toLocaleTimeString('en-US', { timeZoneName: 'short' });
  const match = timeZoneStr.match(/[A-Z]{2,5}$/);
  return match ? match[0] : 'Local';
}

/**
 * Get the user's full timezone name (e.g., "Mountain Standard Time")
 */
export function getUserTimezoneName(): string {
  const date = new Date();
  const timeZoneStr = date.toLocaleTimeString('en-US', { timeZoneName: 'long' });
  const match = timeZoneStr.match(/[A-Z][a-z]+(\s[A-Z][a-z]+)+\s(Time|Standard Time|Daylight Time)$/);
  return match ? match[0] : Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Check if user is in a different timezone than MST
 */
export function isUserInDifferentTimezone(): boolean {
  const now = new Date();
  const userOffsetMinutes = now.getTimezoneOffset();
  // MST is UTC-7 = +420 offset (getTimezoneOffset returns opposite sign)
  return userOffsetMinutes !== 420;
}

// ============================================================================
// Relative Time Formatting
// ============================================================================

interface RelativeTimeUnit {
  max: number;
  divisor: number;
  unit: Intl.RelativeTimeFormatUnit;
}

const RELATIVE_TIME_UNITS: RelativeTimeUnit[] = [
  { max: 60, divisor: 1, unit: 'second' },
  { max: 3600, divisor: 60, unit: 'minute' },
  { max: 86400, divisor: 3600, unit: 'hour' },
  { max: 604800, divisor: 86400, unit: 'day' },
  { max: 2592000, divisor: 604800, unit: 'week' },
  { max: 31536000, divisor: 2592000, unit: 'month' },
  { max: Infinity, divisor: 31536000, unit: 'year' },
];

/**
 * Format a date as relative time (e.g., "5 min ago", "2 hours ago")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Handle future dates
  if (diffSeconds < 0) {
    return formatRelativeTimeFuture(date);
  }
  
  // Just now
  if (diffSeconds < DateTimeConfig.justNowThresholdSeconds) {
    return 'just now';
  }
  
  // Find appropriate unit
  for (const { max, divisor, unit } of RELATIVE_TIME_UNITS) {
    if (diffSeconds < max) {
      const value = Math.floor(diffSeconds / divisor);
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
      return rtf.format(-value, unit);
    }
  }
  
  return 'long ago';
}

/**
 * Format a future date as relative time (e.g., "in 5 minutes", "in 2 hours")
 */
function formatRelativeTimeFuture(date: Date): string {
  const now = new Date();
  const diffSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
  
  if (diffSeconds < DateTimeConfig.justNowThresholdSeconds) {
    return 'soon';
  }
  
  for (const { max, divisor, unit } of RELATIVE_TIME_UNITS) {
    if (diffSeconds < max) {
      const value = Math.floor(diffSeconds / divisor);
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
      return rtf.format(value, unit);
    }
  }
  
  return 'in the future';
}

// ============================================================================
// Absolute Time Formatting
// ============================================================================

export interface DateTimeFormatOptions {
  /** Include the date portion */
  includeDate?: boolean;
  /** Include the time portion */
  includeTime?: boolean;
  /** Use short month names (Jan vs January) */
  shortMonth?: boolean;
  /** Include the year */
  includeYear?: boolean;
  /** Include seconds */
  includeSeconds?: boolean;
  /** Include timezone abbreviation */
  includeTimezone?: boolean;
}

const DEFAULT_FORMAT_OPTIONS: DateTimeFormatOptions = {
  includeDate: true,
  includeTime: true,
  shortMonth: true,
  includeYear: true,
  includeSeconds: false,
  includeTimezone: true,
};

/**
 * Format a date as absolute time in user's local timezone
 * Example: "Jan 20, 2026 at 3:45 PM MST"
 */
export function formatAbsoluteDateTime(
  date: Date,
  options: DateTimeFormatOptions = {}
): string {
  const opts = { ...DEFAULT_FORMAT_OPTIONS, ...options };
  const parts: string[] = [];
  
  if (opts.includeDate) {
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: opts.shortMonth ? 'short' : 'long',
      day: 'numeric',
    };
    if (opts.includeYear) {
      dateOptions.year = 'numeric';
    }
    parts.push(date.toLocaleDateString('en-US', dateOptions));
  }
  
  if (opts.includeTime) {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    if (opts.includeSeconds) {
      timeOptions.second = '2-digit';
    }
    const timeStr = date.toLocaleTimeString('en-US', timeOptions);
    
    if (opts.includeDate) {
      parts.push('at');
    }
    parts.push(timeStr);
  }
  
  if (opts.includeTimezone) {
    parts.push(getUserTimezoneAbbr());
  }
  
  return parts.join(' ');
}

/**
 * Format only the date portion
 * Example: "Jan 20, 2026"
 */
export function formatDateOnly(date: Date, includeYear = true): string {
  return formatAbsoluteDateTime(date, {
    includeDate: true,
    includeTime: false,
    includeYear,
    includeTimezone: false,
  });
}

/**
 * Format only the time portion
 * Example: "3:45 PM MST"
 */
export function formatTimeOnly(date: Date, includeTimezone = true): string {
  return formatAbsoluteDateTime(date, {
    includeDate: false,
    includeTime: true,
    includeTimezone,
  });
}

// ============================================================================
// Smart Hybrid Formatting
// ============================================================================

export interface SmartFormatOptions extends DateTimeFormatOptions {
  /** Override the relative threshold in hours */
  relativeThresholdHours?: number;
  /** Force relative or absolute format */
  forceFormat?: 'relative' | 'absolute';
}

/**
 * Smart format that shows relative time for recent dates and absolute for older
 * - Under 24 hours: "5 min ago", "2 hours ago"
 * - Over 24 hours: "Jan 20, 2026 at 3:45 PM MST"
 */
export function formatSmartDateTime(
  date: Date,
  options: SmartFormatOptions = {}
): string {
  const threshold = options.relativeThresholdHours ?? DateTimeConfig.relativeThresholdHours;
  
  if (options.forceFormat === 'relative') {
    return formatRelativeTime(date);
  }
  
  if (options.forceFormat === 'absolute') {
    return formatAbsoluteDateTime(date, options);
  }
  
  const now = new Date();
  const diffHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffHours < threshold) {
    return formatRelativeTime(date);
  }
  
  return formatAbsoluteDateTime(date, options);
}

// ============================================================================
// MST-Specific Formatting (for stored dates)
// ============================================================================

/**
 * Format a stored MST datetime string to user's local timezone using smart formatting
 * Input: "MM/DD/YY HH:mm" in MST
 * Output: Smart formatted string in user's local timezone
 */
export function formatMSTToLocalSmart(mstDateTimeStr: string): string {
  const utcDate = parseMSTDateTime(mstDateTimeStr);
  return formatSmartDateTime(utcDate);
}

/**
 * Format a stored MST datetime string to absolute local time
 * Input: "MM/DD/YY HH:mm" in MST
 * Output: "Jan 20, 2026 at 3:45 PM MST"
 */
export function formatMSTToLocalAbsolute(
  mstDateTimeStr: string,
  options?: DateTimeFormatOptions
): string {
  const utcDate = parseMSTDateTime(mstDateTimeStr);
  return formatAbsoluteDateTime(utcDate, options);
}

/**
 * Convert a schedule time string from MST to user's local timezone
 * Input: "10 PM" in MST
 * Output: "8 PM" (or whatever the local equivalent is)
 */
export function convertScheduleTimeToLocal(timeStr: string): string {
  const utcDate = parseMSTTime(timeStr);
  if (!utcDate) return timeStr;
  
  const localHours = utcDate.getHours();
  const localPeriod = localHours >= 12 ? 'PM' : 'AM';
  const displayHours = localHours % 12 || 12;
  
  return `${displayHours} ${localPeriod}`;
}

// ============================================================================
// Tooltip Helpers
// ============================================================================

/**
 * Get a full datetime string suitable for tooltips
 * Shows both MST original and local converted time
 */
export function getTooltipDateTime(mstDateTimeStr: string): string {
  const utcDate = parseMSTDateTime(mstDateTimeStr);
  const localFormatted = formatAbsoluteDateTime(utcDate, {
    includeDate: true,
    includeTime: true,
    includeYear: true,
    includeTimezone: true,
  });
  
  if (isUserInDifferentTimezone()) {
    return `${localFormatted} (Original: ${mstDateTimeStr} MST)`;
  }
  
  return localFormatted;
}

// ============================================================================
// Compact Formatting (for cards, lists)
// ============================================================================

/**
 * Format in a compact style suitable for cards
 * Recent: "5m ago" | "2h ago" | "3d ago"
 * Older: "Jan 20" | "Jan 20, 2025"
 */
export function formatCompact(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  // Within the last hour
  if (diffMinutes < 60) {
    return diffMinutes <= 1 ? 'now' : `${diffMinutes}m ago`;
  }
  
  // Within the last 24 hours
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  
  // Within the last 7 days
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }
  
  // Same year - don't show year
  const sameYear = date.getFullYear() === now.getFullYear();
  return formatDateOnly(date, !sameYear);
}

/**
 * Format an MST datetime string in compact format
 */
export function formatMSTCompact(mstDateTimeStr: string): string {
  const utcDate = parseMSTDateTime(mstDateTimeStr);
  return formatCompact(utcDate);
}
