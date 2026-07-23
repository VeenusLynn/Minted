import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction, BudgetGoal, SavingsGoal, Category, DailyBreakdown } from '../types/finance';

// ─── Sample Data ─────────────────────────────────────────────────────────────

const now = new Date();
const thisYear = now.getFullYear();
const thisMonth = now.getMonth();

function dateInMonth(day: number, hour = 12): string {
  return new Date(thisYear, thisMonth, day, hour).toISOString();
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'tx-01', title: 'Monthly Salary', amount: 10000, type: 'income', category: 'Salary', date: dateInMonth(1, 9), notes: 'Direct deposit' },
  { id: 'tx-02', title: 'Rent Payment', amount: 1800, type: 'expense', category: 'Housing', date: dateInMonth(1, 10) },
  { id: 'tx-03', title: 'Electricity Bill', amount: 120, type: 'expense', category: 'Housing', date: dateInMonth(2, 14) },
  { id: 'tx-04', title: 'Grocery Run', amount: 95.50, type: 'expense', category: 'Groceries', date: dateInMonth(3, 11) },
  { id: 'tx-05', title: 'Netflix & Spotify', amount: 27.99, type: 'expense', category: 'Subscriptions', date: dateInMonth(3, 8) },
  { id: 'tx-06', title: 'Uber to Office', amount: 18.50, type: 'expense', category: 'Transport', date: dateInMonth(4, 9) },
  { id: 'tx-07', title: 'Doctor Visit', amount: 85, type: 'expense', category: 'Health', date: dateInMonth(5, 15) },
  { id: 'tx-08', title: 'Freelance Project', amount: 1500, type: 'income', category: 'Freelance', date: dateInMonth(5, 17), notes: 'Website redesign' },
  { id: 'tx-09', title: 'Movie Night', amount: 42, type: 'expense', category: 'Entertainment', date: dateInMonth(6, 20) },
  { id: 'tx-10', title: 'Weekly Groceries', amount: 110, type: 'expense', category: 'Groceries', date: dateInMonth(7, 10) },
  { id: 'tx-11', title: 'Gas Station', amount: 55, type: 'expense', category: 'Transport', date: dateInMonth(8, 7) },
  { id: 'tx-12', title: 'Pharmacy', amount: 32, type: 'expense', category: 'Health', date: dateInMonth(9, 12) },
  { id: 'tx-13', title: 'Online Shopping', amount: 189, type: 'expense', category: 'Shopping', date: dateInMonth(10, 16) },
  { id: 'tx-14', title: 'Dividend Income', amount: 350, type: 'income', category: 'Investments', date: dateInMonth(10, 9) },
  { id: 'tx-15', title: 'Restaurant Dinner', amount: 68, type: 'expense', category: 'Food & Dining', date: dateInMonth(11, 19) },
];

const INITIAL_BUDGETS: BudgetGoal[] = [
  { id: 'b-1', category: 'Housing', monthlyLimit: 2000 },
  { id: 'b-2', category: 'Health', monthlyLimit: 200 },
  { id: 'b-3', category: 'Groceries', monthlyLimit: 400 },
  { id: 'b-4', category: 'Entertainment', monthlyLimit: 150 },
  { id: 'b-5', category: 'Transport', monthlyLimit: 200 },
  { id: 'b-6', category: 'Shopping', monthlyLimit: 300 },
  { id: 'b-7', category: 'Subscriptions', monthlyLimit: 50 },
];

const INITIAL_SAVINGS: SavingsGoal[] = [
  { id: 's-1', title: 'Emergency Fund', targetAmount: 10000, currentAmount: 6400, iconName: 'ShieldCheck' },
  { id: 's-2', title: 'Japan Trip', targetAmount: 3500, currentAmount: 1850, iconName: 'Plane' },
  { id: 's-3', title: 'New Laptop', targetAmount: 2000, currentAmount: 750, iconName: 'Laptop' },
];

// ─── Store Interface ─────────────────────────────────────────────────────────

interface FinanceState {
  transactions: Transaction[];
  budgets: BudgetGoal[];
  savingsGoals: SavingsGoal[];
  currencySymbol: string;
  monthlySavingsTarget: number;

  // Actions
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setBudgetLimit: (category: Category, limit: number) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => void;
  updateSavingsProgress: (id: string, addedAmount: number) => void;
  deleteSavingsGoal: (id: string) => void;
  setMonthlySavingsTarget: (amount: number) => void;
  setCurrencySymbol: (symbol: string) => void;
  resetToSampleData: () => void;

  // Selectors
  getTotalBalance: () => number;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getSpentForCategory: (category: Category) => number;
  getTransactionsForMonth: (year: number, month: number) => Transaction[];
  getDailyBreakdown: (year: number, month: number) => DailyBreakdown[];
  getLeftForSaving: () => number;
  getBudgetSpentPercentage: () => number;
}

// ─── Store Implementation ────────────────────────────────────────────────────

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: INITIAL_TRANSACTIONS,
      budgets: INITIAL_BUDGETS,
      savingsGoals: INITIAL_SAVINGS,
      currencySymbol: '$',
      monthlySavingsTarget: 2000,

      addTransaction: (newTx) => {
        const tx: Transaction = {
          ...newTx,
          id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        };
        set((state) => ({ transactions: [tx, ...state.transactions] }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      setBudgetLimit: (category, limit) => {
        set((state) => {
          const existing = state.budgets.find((b) => b.category === category);
          if (existing) {
            return {
              budgets: state.budgets.map((b) =>
                b.category === category ? { ...b, monthlyLimit: limit } : b
              ),
            };
          }
          return {
            budgets: [...state.budgets, { id: `b-${Date.now()}`, category, monthlyLimit: limit }],
          };
        });
      },

      addSavingsGoal: (newGoal) => {
        const goal: SavingsGoal = { ...newGoal, id: `s-${Date.now()}`, currentAmount: 0 };
        set((state) => ({ savingsGoals: [...state.savingsGoals, goal] }));
      },

      updateSavingsProgress: (id, addedAmount) => {
        set((state) => ({
          savingsGoals: state.savingsGoals.map((g) =>
            g.id === id ? { ...g, currentAmount: Math.max(0, g.currentAmount + addedAmount) } : g
          ),
        }));
      },

      deleteSavingsGoal: (id) => {
        set((state) => ({
          savingsGoals: state.savingsGoals.filter((g) => g.id !== id),
        }));
      },

      setMonthlySavingsTarget: (amount) => {
        set({ monthlySavingsTarget: amount });
      },

      setCurrencySymbol: (symbol) => {
        set({ currencySymbol: symbol });
      },

      resetToSampleData: () => {
        set({
          transactions: INITIAL_TRANSACTIONS,
          budgets: INITIAL_BUDGETS,
          savingsGoals: INITIAL_SAVINGS,
          monthlySavingsTarget: 2000,
        });
      },

      getTotalBalance: () => {
        return get().transactions.reduce((acc, tx) => {
          if (tx.type === 'income') return acc + tx.amount;
          if (tx.type === 'expense') return acc - tx.amount;
          return acc; // transfers don't affect balance
        }, 0);
      },

      getTotalIncome: () => {
        return get()
          .transactions.filter((tx) => tx.type === 'income')
          .reduce((acc, tx) => acc + tx.amount, 0);
      },

      getTotalExpenses: () => {
        return get()
          .transactions.filter((tx) => tx.type === 'expense')
          .reduce((acc, tx) => acc + tx.amount, 0);
      },

      getSpentForCategory: (category) => {
        return get()
          .transactions.filter((tx) => tx.category === category && tx.type === 'expense')
          .reduce((acc, tx) => acc + tx.amount, 0);
      },

      getTransactionsForMonth: (year, month) => {
        return get().transactions.filter((tx) => {
          const d = new Date(tx.date);
          return d.getFullYear() === year && d.getMonth() === month;
        });
      },

      getDailyBreakdown: (year, month) => {
        const txs = get().getTransactionsForMonth(year, month);
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // Group by day-of-week
        const dayMap: Record<string, { income: number; expense: number }> = {};
        for (const d of days) {
          dayMap[d] = { income: 0, expense: 0 };
        }

        for (const tx of txs) {
          const dayName = days[new Date(tx.date).getDay()];
          if (tx.type === 'income') dayMap[dayName].income += tx.amount;
          if (tx.type === 'expense') dayMap[dayName].expense += tx.amount;
        }

        // Return Mon-Sun order
        const ordered = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return ordered.map((day) => ({
          day,
          income: dayMap[day].income,
          expense: dayMap[day].expense,
        }));
      },

      getLeftForSaving: () => {
        const income = get().getTotalIncome();
        const expenses = get().getTotalExpenses();
        return income - expenses;
      },

      getBudgetSpentPercentage: () => {
        const totalBudget = get().budgets.reduce((acc, b) => acc + b.monthlyLimit, 0);
        const totalSpent = get().getTotalExpenses();
        return totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
      },
    }),
    {
      name: 'minted-finance-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
