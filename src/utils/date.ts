import { format, formatDistanceToNow } from 'date-fns';

export function formatDate(date: string | Date, formatString: string = 'MMMM d, yyyy'): string {
  try {
    return format(new Date(date), formatString);
  } catch (e) {
    console.error('Error formatting date:', e);
    return 'Invalid date';
  }
}

export function formatRelativeTime(date: string | Date): string {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch (e) {
    console.error('Error formatting relative date:', e);
    return 'Unknown date';
  }
}