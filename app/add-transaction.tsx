import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFinanceStore } from '../store/useFinanceStore';
import { useTheme } from '../context/ThemeContext';
import { Category, TransactionType } from '../types/finance';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, CATEGORY_DETAILS } from '../constants/CategoryData';
import { CategoryIcon } from '../components/CategoryIcon';
import { CustomNumpad } from '../components/CustomNumpad';
import { Check, X, Calendar, AlertTriangle } from 'lucide-react-native';

export default function AddTransactionScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { addTransaction, currencySymbol, getBudgetSpentPercentage } = useFinanceStore();

  const [type, setType] = useState<TransactionType>('expense');
  const [amountStr, setAmountStr] = useState('0');
  const [category, setCategory] = useState<Category>('Groceries');
  const [errorMsg, setErrorMsg] = useState('');

  const budgetPct = getBudgetSpentPercentage();
  const showAlert = budgetPct > 50;

  const currentCategories = type === 'expense' ? EXPENSE_CATEGORIES : type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    if (newType === 'expense') setCategory('Groceries');
    else if (newType === 'income') setCategory('Salary');
    else setCategory('Other');
  };

  const handleKeyPress = (key: string) => {
    setErrorMsg('');
    setAmountStr((prev) => {
      if (prev === '0' && key !== '.') return key;
      if (key === '.' && prev.includes('.')) return prev;
      if (prev.includes('.') && prev.split('.')[1].length >= 2) return prev;
      return prev + key;
    });
  };

  const handleBackspace = () => {
    setAmountStr((prev) => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const displayAmount = useMemo(() => {
    const num = parseFloat(amountStr);
    if (isNaN(num)) return `${currencySymbol}0.00`;
    // If user is still typing decimal part, show raw string
    if (amountStr.includes('.')) return `${currencySymbol}${amountStr}`;
    return `${currencySymbol}${num.toLocaleString('en-US')}`;
  }, [amountStr, currencySymbol]);

  const today = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amountStr);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMsg('Enter a valid amount');
      return;
    }

    addTransaction({
      title: `${category}`,
      amount: parsedAmount,
      type,
      category,
      date: new Date().toISOString(),
    });

    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Type Switcher */}
        <View style={[styles.typeSwitcher, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
          {(['income', 'expense', 'transfer'] as TransactionType[]).map((t) => {
            const isActive = type === t;
            return (
              <Pressable
                key={t}
                style={[
                  styles.typeBtn,
                  isActive && { backgroundColor: t === 'expense' ? colors.danger : t === 'income' ? colors.success : colors.info },
                ]}
                onPress={() => handleTypeChange(t)}
              >
                <Text
                  style={[
                    styles.typeText,
                    { color: isActive ? '#FFFFFF' : colors.textSecondary },
                  ]}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Budget Alert */}
        {showAlert && type === 'expense' && (
          <View style={[styles.alertBanner, { backgroundColor: colors.warningBg }]}>
            <View style={styles.alertContent}>
              <AlertTriangle size={16} color={colors.warning} />
              <View style={styles.alertText}>
                <Text style={[styles.alertTitle, { color: colors.text }]}>Budget Alert</Text>
                <Text style={[styles.alertSub, { color: colors.textSecondary }]}>
                  You've spent {Math.round(budgetPct)}% of your monthly budget
                </Text>
              </View>
            </View>
            <Pressable><X size={16} color={colors.textMuted} /></Pressable>
          </View>
        )}

        {/* Amount Display */}
        <View style={styles.amountSection}>
          <Text style={[styles.amountLabel, { color: colors.textMuted }]}>Amount</Text>
          <Text style={[styles.amountDisplay, { color: colors.text }]}>{displayAmount}</Text>
        </View>

        {errorMsg ? (
          <Text style={[styles.errorText, { color: colors.danger }]}>{errorMsg}</Text>
        ) : null}

        {/* Category + Date Pills */}
        <View style={styles.pillRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillScroll}>
            {currentCategories.map((cat) => {
              const isActive = category === cat;
              const details = CATEGORY_DETAILS[cat];
              return (
                <Pressable
                  key={cat}
                  style={[
                    styles.pill,
                    {
                      backgroundColor: isActive ? colors.primaryLight : colors.surfaceSecondary,
                      borderColor: isActive ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <CategoryIcon category={cat} size={14} bgSize={24} showBackground={false} />
                  <Text
                    style={[
                      styles.pillText,
                      { color: isActive ? colors.primary : colors.textSecondary },
                    ]}
                  >
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.datePillRow}>
          <View style={[styles.datePill, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
            <Calendar size={14} color={colors.textSecondary} />
            <Text style={[styles.pillText, { color: colors.textSecondary }]}>{today}</Text>
          </View>
        </View>

        {/* Numpad */}
        <View style={styles.numpadSection}>
          <CustomNumpad onKeyPress={handleKeyPress} onBackspace={handleBackspace} />
        </View>

        {/* Submit Button */}
        <Pressable style={[styles.submitBtn, { backgroundColor: colors.accent }]} onPress={handleSubmit}>
          <Text style={[styles.submitText, { color: colors.accentText }]}>Add Transaction</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 40 },

  typeSwitcher: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  typeText: { fontSize: 14, fontWeight: '600' },

  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
  },
  alertContent: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  alertText: { flex: 1 },
  alertTitle: { fontSize: 14, fontWeight: '700' },
  alertSub: { fontSize: 12, marginTop: 1 },

  amountSection: { alignItems: 'center', marginTop: 24, marginBottom: 8 },
  amountLabel: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  amountDisplay: { fontSize: 42, fontWeight: '900', letterSpacing: -1 },
  errorText: { fontSize: 13, fontWeight: '600', textAlign: 'center', marginBottom: 8 },

  pillRow: { marginTop: 16 },
  pillScroll: { gap: 8, paddingHorizontal: 4 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: { fontSize: 13, fontWeight: '500' },

  datePillRow: { flexDirection: 'row', marginTop: 12, paddingHorizontal: 4 },
  datePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },

  numpadSection: { marginTop: 24 },

  submitBtn: {
    marginTop: 20,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: { fontSize: 16, fontWeight: '700' },
});
