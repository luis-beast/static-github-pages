export const DateTimeConfig = {
  storageTimezone: 'America/Denver',
  mstOffsetHours: -7,
  relativeThresholdHours: 24,
  justNowThresholdSeconds: 60,
} as const;

export function parseMSTDateTime(dateTimeStr: string): Date {
  const [datePart, timePart] = dateTimeStr.split(' ');
  const [month, day, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  const fullYear = 2000 + year;
  return new Date(Date.UTC(fullYear, month - 1, day, hours + 7, minutes));
}

export function parseMSTTime(timeStr: string): Date | null {
  const match = timeStr.match(/(\d+)\s*(AM|PM)/i);
  if (!match) return null;
  
  let hours = parseInt(match[1], 10);
  const isPM = match[2].toUpperCase() === 'PM';
  
  if (isPM && hours !== 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;
  
  const now = new Date();
  return new Date(Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours + 7,
    0
  ));
}

export function getUserTimezoneAbbr(): string {
  const date = new Date();
  const timeZoneStr = date.toLocaleTimeString('en-US', { timeZoneName: 'short' });
  const match = timeZoneStr.match(/[A-Z]{2,5}$/);
  return match ? match[0] : 'Local';
}

export function getUserTimezoneName(): string {
  const date = new Date();
  const timeZoneStr = date.toLocaleTimeString('en-US', { timeZoneName: 'long' });
  const match = timeZoneStr.match(/[A-Z][a-z]+(\s[A-Z][a-z]+)+\s(Time|Standard Time|Daylight Time)$/);
  return match ? match[0] : Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function isUserInDifferentTimezone(): boolean {
  const now = new Date();
  const userOffsetMinutes = now.getTimezoneOffset();
  return userOffsetMinutes !== 420;
}

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

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffSeconds < 0) {
    return formatRelativeTimeFuture(date);
  }
  
  if (diffSeconds < DateTimeConfig.justNowThresholdSeconds) {
    return 'just now';
  }
  
  for (const { max, divisor, unit } of RELATIVE_TIME_UNITS) {
    if (diffSeconds < max) {
      const value = Math.floor(diffSeconds / divisor);
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
      return rtf.format(-value, unit);
    }
  }
  
  return 'long ago';
}

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

export interface DateTimeFormatOptions {
  includeDate?: boolean;
  includeTime?: boolean;
  shortMonth?: boolean;
  includeYear?: boolean;
  includeSeconds?: boolean;
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

export function formatDateOnly(date: Date, includeYear = true): string {
  return formatAbsoluteDateTime(date, {
    includeDate: true,
    includeTime: false,
    includeYear,
    includeTimezone: false,
  });
}

export function formatTimeOnly(date: Date, includeTimezone = true): string {
  return formatAbsoluteDateTime(date, {
    includeDate: false,
    includeTime: true,
    includeTimezone,
  });
}

export interface SmartFormatOptions extends DateTimeFormatOptions {
  relativeThresholdHours?: number;
  forceFormat?: 'relative' | 'absolute';
}

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

export function formatMSTToLocalSmart(mstDateTimeStr: string): string {
  const utcDate = parseMSTDateTime(mstDateTimeStr);
  return formatSmartDateTime(utcDate);
}

export function formatMSTToLocalAbsolute(
  mstDateTimeStr: string,
  options?: DateTimeFormatOptions
): string {
  const utcDate = parseMSTDateTime(mstDateTimeStr);
  return formatAbsoluteDateTime(utcDate, options);
}

export function convertScheduleTimeToLocal(timeStr: string): string {
  const utcDate = parseMSTTime(timeStr);
  if (!utcDate) return timeStr;
  
  const localHours = utcDate.getHours();
  const localPeriod = localHours >= 12 ? 'PM' : 'AM';
  const displayHours = localHours % 12 || 12;
  
  return `${displayHours} ${localPeriod}`;
}

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

export function formatCompact(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMinutes < 60) {
    return diffMinutes <= 1 ? 'now' : `${diffMinutes}m ago`;
  }
  
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }
  
  const sameYear = date.getFullYear() === now.getFullYear();
  return formatDateOnly(date, !sameYear);
}

export function formatMSTCompact(mstDateTimeStr: string): string {
  const utcDate = parseMSTDateTime(mstDateTimeStr);
  return formatCompact(utcDate);
}
