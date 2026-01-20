/**
 * Timezone Utility
 * 
 * All times are stored in MST (Mountain Standard Time, UTC-7).
 * This utility converts stored MST times to the user's local timezone for display.
 */

// MST offset in minutes (UTC-7 = -420 minutes)
const MST_OFFSET_MINUTES = -7 * 60;

/**
 * Parse a date string in "MM/DD/YY HH:mm" format (stored in MST)
 * and return a Date object in UTC
 */
export function parseMSTDateTime(dateTimeStr: string): Date {
  // Parse "MM/DD/YY HH:mm" format
  const [datePart, timePart] = dateTimeStr.split(' ');
  const [month, day, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  
  // Convert 2-digit year to 4-digit (assumes 2000s)
  const fullYear = 2000 + year;
  
  // Create date as if it's in MST, then adjust to UTC
  // MST is UTC-7, so we add 7 hours to get UTC
  const utcDate = new Date(Date.UTC(fullYear, month - 1, day, hours + 7, minutes));
  
  return utcDate;
}

/**
 * Parse a time string like "10 PM" or "5 PM" in MST
 * and return the hour in the user's local timezone
 */
export function convertScheduleTimeToLocal(timeStr: string): string {
  // Parse "10 PM" or "5 PM" format
  const match = timeStr.match(/(\d+)\s*(AM|PM)/i);
  if (!match) return timeStr;
  
  let hours = parseInt(match[1], 10);
  const isPM = match[2].toUpperCase() === 'PM';
  
  // Convert to 24-hour format
  if (isPM && hours !== 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;
  
  // Create a date object for today with this time in MST
  const now = new Date();
  const mstDate = new Date(Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours + 7, // MST is UTC-7, add 7 to get UTC
    0
  ));
  
  // Format in user's local timezone
  const localHours = mstDate.getHours();
  const localPeriod = localHours >= 12 ? 'PM' : 'AM';
  const displayHours = localHours % 12 || 12;
  
  return `${displayHours} ${localPeriod}`;
}

/**
 * Get the user's timezone abbreviation
 */
export function getUserTimezoneAbbr(): string {
  const date = new Date();
  const timeZoneStr = date.toLocaleTimeString('en-US', { timeZoneName: 'short' });
  const match = timeZoneStr.match(/[A-Z]{2,5}$/);
  return match ? match[0] : 'Local';
}

/**
 * Format a UTC Date object to the user's local timezone
 * Returns format: "MM/DD/YY HH:mm"
 */
export function formatToLocalDateTime(utcDate: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  
  return utcDate.toLocaleString('en-US', options).replace(',', '');
}

/**
 * Format a stored MST datetime string to user's local timezone
 * Input: "MM/DD/YY HH:mm" in MST
 * Output: "MM/DD/YY HH:mm" in user's local timezone
 */
export function formatMSTToLocal(mstDateTimeStr: string): string {
  const utcDate = parseMSTDateTime(mstDateTimeStr);
  
  const month = String(utcDate.toLocaleString('en-US', { month: '2-digit' })).padStart(2, '0');
  const day = String(utcDate.toLocaleString('en-US', { day: '2-digit' })).padStart(2, '0');
  const year = utcDate.toLocaleString('en-US', { year: '2-digit' });
  const hours = String(utcDate.getHours()).padStart(2, '0');
  const minutes = String(utcDate.getMinutes()).padStart(2, '0');
  
  return `${month}/${day}/${year} ${hours}:${minutes}`;
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
