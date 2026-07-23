/**
 * Minted — Centralized Theme Configuration
 *
 * ALL colors used in the app are defined here.
 * To change any color across the entire app, update only this file.
 *
 * Palette: Mint green primary, with warm neutrals.
 */

// ─── Brand Colors (shared across both themes) ───────────────────────────────

export const MintPalette = {
  mint50: '#F0FDF4',
  mint100: '#DCFCE7',
  mint200: '#BBF7D0',
  mint300: '#86EFAC',
  mint400: '#4ADE80',
  mint500: '#22C55E',
  mint600: '#16A34A',
  mint700: '#15803D',
  mint800: '#166534',
  mint900: '#14532D',
} as const;

export const CategoryColors = {
  housing: { main: '#F59E0B', bg: '#FEF3C7' },
  health: { main: '#EF4444', bg: '#FEE2E2' },
  groceries: { main: '#3B82F6', bg: '#DBEAFE' },
  entertainment: { main: '#8B5CF6', bg: '#EDE9FE' },
  subscriptions: { main: '#6366F1', bg: '#E0E7FF' },
  transport: { main: '#F97316', bg: '#FFF7ED' },
  foodDining: { main: '#EC4899', bg: '#FCE7F3' },
  shopping: { main: '#14B8A6', bg: '#CCFBF1' },
  salary: { main: '#22C55E', bg: '#DCFCE7' },
  freelance: { main: '#10B981', bg: '#D1FAE5' },
  investments: { main: '#0EA5E9', bg: '#E0F2FE' },
  other: { main: '#94A3B8', bg: '#F1F5F9' },
} as const;

// ─── Theme Token Interfaces ─────────────────────────────────────────────────

export interface ThemeColors {
  // Backgrounds
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceSecondary: string;

  // Text
  text: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  // Brand / Primary (Mint)
  primary: string;
  primaryLight: string;
  primaryDark: string;

  // Accent (for CTA buttons like "Add Transaction")
  accent: string;
  accentText: string;

  // Semantic
  danger: string;
  dangerBg: string;
  warning: string;
  warningBg: string;
  success: string;
  successBg: string;
  info: string;
  infoBg: string;

  // UI Chrome
  border: string;
  borderLight: string;
  divider: string;
  shadow: string;

  // Tab Bar
  tabBar: string;
  tabBarBorder: string;
  tabBarActive: string;
  tabBarInactive: string;

  // Inputs
  inputBg: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;

  // Cards
  cardBg: string;
  cardBorder: string;

  // Chart colors (bar chart bars)
  chartIncome: string;
  chartIncomeLight: string;
  chartExpense: string;
  chartExpenseLight: string;

  // Status bar
  statusBarStyle: 'light' | 'dark';
}

// ─── Light Theme ─────────────────────────────────────────────────────────────

export const lightTheme: ThemeColors = {
  // Backgrounds
  background: '#FAFAF9',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceSecondary: '#F5F5F4',

  // Text
  text: '#1C1917',
  textSecondary: '#57534E',
  textMuted: '#A8A29E',
  textInverse: '#FFFFFF',

  // Brand / Primary (Mint)
  primary: MintPalette.mint500,
  primaryLight: MintPalette.mint100,
  primaryDark: MintPalette.mint700,

  // Accent
  accent: '#4F46E5', // Indigo for CTA buttons like "Add Transaction"
  accentText: '#FFFFFF',

  // Semantic
  danger: '#EF4444',
  dangerBg: '#FEE2E2',
  warning: '#F59E0B',
  warningBg: '#FEF3C7',
  success: MintPalette.mint500,
  successBg: MintPalette.mint100,
  info: '#3B82F6',
  infoBg: '#DBEAFE',

  // UI Chrome
  border: '#E7E5E4',
  borderLight: '#F5F5F4',
  divider: '#E7E5E4',
  shadow: '#00000015',

  // Tab Bar
  tabBar: '#FFFFFF',
  tabBarBorder: '#E7E5E4',
  tabBarActive: MintPalette.mint600,
  tabBarInactive: '#A8A29E',

  // Inputs
  inputBg: '#F5F5F4',
  inputBorder: '#E7E5E4',
  inputText: '#1C1917',
  inputPlaceholder: '#A8A29E',

  // Cards
  cardBg: '#FFFFFF',
  cardBorder: '#F5F5F4',

  // Chart
  chartIncome: MintPalette.mint500,
  chartIncomeLight: MintPalette.mint200,
  chartExpense: MintPalette.mint800,
  chartExpenseLight: MintPalette.mint300,

  // Status bar
  statusBarStyle: 'dark',
};

// ─── Dark Theme ──────────────────────────────────────────────────────────────

export const darkTheme: ThemeColors = {
  // Backgrounds
  background: '#0C0A09',
  surface: '#1C1917',
  surfaceElevated: '#292524',
  surfaceSecondary: '#1C1917',

  // Text
  text: '#FAFAF9',
  textSecondary: '#D6D3D1',
  textMuted: '#78716C',
  textInverse: '#1C1917',

  // Brand / Primary (Mint)
  primary: MintPalette.mint400,
  primaryLight: 'rgba(34, 197, 94, 0.15)',
  primaryDark: MintPalette.mint600,

  // Accent
  accent: '#6366F1',
  accentText: '#FFFFFF',

  // Semantic
  danger: '#F87171',
  dangerBg: 'rgba(239, 68, 68, 0.15)',
  warning: '#FBBF24',
  warningBg: 'rgba(245, 158, 11, 0.15)',
  success: MintPalette.mint400,
  successBg: 'rgba(34, 197, 94, 0.15)',
  info: '#60A5FA',
  infoBg: 'rgba(59, 130, 246, 0.15)',

  // UI Chrome
  border: '#292524',
  borderLight: '#1C1917',
  divider: '#292524',
  shadow: '#00000040',

  // Tab Bar
  tabBar: '#1C1917',
  tabBarBorder: '#292524',
  tabBarActive: MintPalette.mint400,
  tabBarInactive: '#78716C',

  // Inputs
  inputBg: '#292524',
  inputBorder: '#44403C',
  inputText: '#FAFAF9',
  inputPlaceholder: '#78716C',

  // Cards
  cardBg: '#1C1917',
  cardBorder: '#292524',

  // Chart
  chartIncome: MintPalette.mint400,
  chartIncomeLight: 'rgba(74, 222, 128, 0.4)',
  chartExpense: MintPalette.mint700,
  chartExpenseLight: 'rgba(21, 128, 61, 0.4)',

  // Status bar
  statusBarStyle: 'light',
};
