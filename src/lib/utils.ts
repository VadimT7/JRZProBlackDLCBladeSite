import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = '₽') {
  return new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + ' ' + currency;
}

export function formatCurrency(price: number) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateIdempotenceKey() {
  return crypto.randomUUID();
}

// Convert millimeter blade size to European shoe size
export function mmToEuropeanShoeSize(mmSize: string): string {
  const sizeMap: { [key: string]: string } = {
    '221': '36',
    '230': '37', 
    '238': '38',
    '246': '39',
    '254': '41',
    '259': '41', // New size 41
    '263': '42',
    '272': '43',
    '280': '44',
    '281': '44', // Close to 280
    '288': '45',
    '290': '45', // Close to 288
    '296': '46',
    '299': '46', // Close to 296
    '308': '47',
    '317': '48',
  };
  
  return sizeMap[mmSize] || mmSize; // Fallback to original if not found
}
