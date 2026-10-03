/**
 * Helper to join class names conditionally.
 * Lightweight clsx alternative — no dependency needed.
 */
export type ClassValue = string | false | null | undefined | 0;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a number as USD currency.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format an ISO date string into a readable format.
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Truncate text to a max length with ellipsis.
 */
export function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) + '…' : text;
}
