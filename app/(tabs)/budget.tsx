import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useFinanceStore } from '../../store/useFinanceStore';
import { useTheme } from '../../context/ThemeContext';
import { MonthPicker } from '../../components/MonthPicker';
import { BarChart } from '../../components/BarChart';
import { ChevronRight, Lightbulb } from 'lucide-react-native';

export default function BudgetScreen() {
  const { colors } = useTheme();
  const {
    currencySymbol,
    getTotalIncome,
    getTotalExpenses,
    getLeftForSaving,
    getDailyBreakdown,
  } = useFinanceStore();

  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const income = getTotalIncome();
  const expenses = getTotalExpenses();
  const leftForSaving = getLeftForSaving();
  const dailyData = getDailyBreakdown(year, month);

  const fmt = (val: number) =>
    `${currencySymbol}${val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  const handlePrev = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const handleNext = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.scroll}>
      {/* Month Picker + Legend */}
      <View style={styles.topRow}>
        <MonthPicker month={month} year={year} onPrev={handlePrev} onNext={handleNext} />
      </View>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.chartIncome }]} />
          <Text style={[styles.legendText, { color: colors.textSecondary }]}>Income</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.chartExpense }]} />
          <Text style={[styles.legendText, { color: colors.textSecondary }]}>Expense</Text>
        </View>
      </View>

      {/* Bar Chart */}
      <View style={[styles.chartCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <BarChart data={dailyData} height={180} />
      </View>

      {/* Summary Card */}
      <View style={[styles.summaryCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <SummaryRow
          dotColor={colors.success}
          label="Income"
          value={fmt(income)}
          textColor={colors.text}
          secondaryColor={colors.textMuted}
        />
        <View style={[styles.divider, { backgroundColor: colors.divider }]} />
        <SummaryRow
          dotColor={colors.danger}
          label="Expense"
          value={fmt(expenses)}
          textColor={colors.text}
          secondaryColor={colors.textMuted}
        />
        <View style={[styles.divider, { backgroundColor: colors.divider }]} />
        <SummaryRow
          dotColor={colors.textSecondary}
          label="Left for Saving"
          value={fmt(leftForSaving)}
          textColor={colors.text}
          secondaryColor={colors.textMuted}
        />
      </View>

      {/* Insight Banner */}
      <View style={[styles.insightCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <View style={styles.insightHeader}>
          <Lightbulb size={18} color={colors.primary} />
          <Text style={[styles.insightTitle, { color: colors.text }]}>Insight</Text>
        </View>
        <Text style={[styles.insightBody, { color: colors.textSecondary }]}>
          {leftForSaving > 0
            ? `Great work! You have ${fmt(leftForSaving)} available for savings this period.`
            : `You're spending more than you earn this period. Review your expenses.`}
        </Text>
      </View>
    </ScrollView>
  );
}

function SummaryRow({
  dotColor,
  label,
  value,
  textColor,
  secondaryColor,
}: {
  dotColor: string;
  label: string;
  value: string;
  textColor: string;
  secondaryColor: string;
}) {
  return (
    <Pressable style={styles.summaryRow}>
      <View style={styles.summaryLeft}>
        <View style={[styles.summaryDot, { backgroundColor: dotColor }]} />
        <Text style={[styles.summaryLabel, { color: textColor }]}>{label}</Text>
      </View>
      <View style={styles.summaryRight}>
        <Text style={[styles.summaryValue, { color: textColor }]}>{value}</Text>
        <ChevronRight size={16} color={secondaryColor} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: 40 },

  topRow: {
    alignItems: 'center',
    marginTop: 16,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 12,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, fontWeight: '500' },

  chartCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
  },

  summaryCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  summaryLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  summaryDot: { width: 10, height: 10, borderRadius: 5 },
  summaryLabel: { fontSize: 15, fontWeight: '600' },
  summaryRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  summaryValue: { fontSize: 16, fontWeight: '700' },
  divider: { height: 1, marginHorizontal: 20 },

  insightCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
  },
  insightHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  insightTitle: { fontSize: 16, fontWeight: '700' },
  insightBody: { fontSize: 14, lineHeight: 20 },
});
