export type TransactionType = 'expense' | 'income' | 'transfer';

export type Category =
  | 'Housing'
  | 'Health'
  | 'Groceries'
  | 'Entertainment'
  | 'Subscriptions'
  | 'Transport'
  | 'Food & Dining'
  | 'Shopping'
  | 'Salary'
  | 'Freelance'
  | 'Investments'
  | 'Other';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string; // ISO 8601 string
  notes?: string;
}

export interface BudgetGoal {
  id: string;
  category: Category;
  monthlyLimit: number;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  iconName?: string;
}

export interface MonthlySavingsTarget {
  amount: number;
  month: number; // 0-indexed (0 = Jan)
  year: number;
}

export interface CategoryInfo {
  name: Category;
  icon: string; // Lucide icon name
  color: string;
  bgColor: string;
}

export interface DailyBreakdown {
  day: string; // "Mon", "Tue", etc. or date label
  income: number;
  expense: number;
}
