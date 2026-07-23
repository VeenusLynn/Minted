import { Category } from '../types/finance';
import { CategoryColors } from './theme';

/**
 * Category metadata: icon names (Lucide), colors, and background tints.
 * Category-specific colors are fixed regardless of theme mode (they are distinct identifiers).
 */
export const CATEGORY_DETAILS: Record<Category, { icon: string; color: string; bgColor: string }> = {
  Housing: {
    icon: 'Home',
    color: CategoryColors.housing.main,
    bgColor: CategoryColors.housing.bg,
  },
  Health: {
    icon: 'HeartPulse',
    color: CategoryColors.health.main,
    bgColor: CategoryColors.health.bg,
  },
  Groceries: {
    icon: 'ShoppingCart',
    color: CategoryColors.groceries.main,
    bgColor: CategoryColors.groceries.bg,
  },
  Entertainment: {
    icon: 'Film',
    color: CategoryColors.entertainment.main,
    bgColor: CategoryColors.entertainment.bg,
  },
  Subscriptions: {
    icon: 'CreditCard',
    color: CategoryColors.subscriptions.main,
    bgColor: CategoryColors.subscriptions.bg,
  },
  Transport: {
    icon: 'Car',
    color: CategoryColors.transport.main,
    bgColor: CategoryColors.transport.bg,
  },
  'Food & Dining': {
    icon: 'UtensilsCrossed',
    color: CategoryColors.foodDining.main,
    bgColor: CategoryColors.foodDining.bg,
  },
  Shopping: {
    icon: 'ShoppingBag',
    color: CategoryColors.shopping.main,
    bgColor: CategoryColors.shopping.bg,
  },
  Salary: {
    icon: 'Wallet',
    color: CategoryColors.salary.main,
    bgColor: CategoryColors.salary.bg,
  },
  Freelance: {
    icon: 'Laptop',
    color: CategoryColors.freelance.main,
    bgColor: CategoryColors.freelance.bg,
  },
  Investments: {
    icon: 'TrendingUp',
    color: CategoryColors.investments.main,
    bgColor: CategoryColors.investments.bg,
  },
  Other: {
    icon: 'MoreHorizontal',
    color: CategoryColors.other.main,
    bgColor: CategoryColors.other.bg,
  },
};

export const ALL_CATEGORIES: Category[] = [
  'Housing',
  'Health',
  'Groceries',
  'Entertainment',
  'Subscriptions',
  'Transport',
  'Food & Dining',
  'Shopping',
  'Salary',
  'Freelance',
  'Investments',
  'Other',
];

export const EXPENSE_CATEGORIES: Category[] = [
  'Housing',
  'Health',
  'Groceries',
  'Entertainment',
  'Subscriptions',
  'Transport',
  'Food & Dining',
  'Shopping',
  'Other',
];

export const INCOME_CATEGORIES: Category[] = [
  'Salary',
  'Freelance',
  'Investments',
  'Other',
];
