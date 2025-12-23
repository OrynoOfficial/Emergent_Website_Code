import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Re-export utilities
export { createPageUrl, formatCurrency, formatNumber } from '@/utils';
