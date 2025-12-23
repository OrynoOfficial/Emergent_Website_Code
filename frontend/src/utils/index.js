import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Create page URL helper
export const createPageUrl = (pageName) => {
  if (!pageName) return '/';
  if (pageName === 'Hero') return '/';
  return `/${pageName.toLowerCase()}`;
};

// Format currency for Cameroon (XAF)
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '';
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format number with K/M suffix
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K+';
  }
  return num.toString();
};
