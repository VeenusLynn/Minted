import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useFinanceStore } from '../../store/useFinanceStore';
import { useTheme } from '../../context/ThemeContext';
import { MonthPicker } from '../../components/MonthPicker';
import { DonutChart } from '../../components/DonutChart';
import { CATEGORY_DETAILS, EXPENSE_CATEGORIES } from '../../constants/CategoryData';
import { Plus } from 'lucide-react-native';
import { CategoryIcon } from '../../components/CategoryIcon';

export default function SpendingScreen() {
  const { colors } = useTheme();
  const { currencySymbol, budgets, getTotalExpenses, getSpentForCategory } = useFinanceStore();

  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const totalBudget = budgets.reduce((acc, b) => acc + b.monthlyLimit, 0);
  const totalExpenses = getTotalExpenses();
  const remaining = Math.max(0, totalBudget - totalExpenses);

  const fmt = (val: number) =>
    `${currencySymbol}${val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  // Build donut data from categories that have spend
  const categoryStats = EXPENSE_CATEGORIES.map((cat) => {
    const spent = getSpentForCategory(cat);
    const details = CATEGORY_DETAILS[cat];
    return { category: cat, spent, color: details.color, pct: totalExpenses > 0 ? Math.round((spent / totalExpenses) * 100) : 0 };
  }).filter((s) => s.spent > 0).sort((a, b) => b.spent - a.spent);

  const donutData: { value: number; color: string; label: string }[] = categoryStats.map((s) => ({
    value: s.spent,
    color: s.color,
    label: s.category,
  }));

  // If no spending, add a placeholder slice
  if (donutData.length === 0) {
    donutData.push({ value: 1, color: colors.border, label: 'None' });
  }

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
      {/* Month Picker */}
      <View style={styles.pickerRow}>
        <MonthPicker month={month} year={year} onPrev={handlePrev} onNext={handleNext} />
      </View>

      {/* Donut Chart */}
      <View style={[styles.chartSection, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <DonutChart
          data={donutData}
          centerLabel="Remaining"
          centerValue={fmt(remaining)}
          radius={90}
          innerRadius={65}
        />
      </View>

      {/* Category Breakdown Circles */}
      <View style={styles.categoryGrid}>
        {categoryStats.map((stat) => (
          <View key={stat.category} style={styles.categoryCircleWrapper}>
            <View style={[styles.categoryCircle, { borderColor: colors.border }]}>
              <View style={[styles.miniRing, { borderColor: stat.color, borderWidth: 3 }]}>
                <Text style={[styles.pctText, { color: colors.text }]}>{stat.pct}%</Text>
              </View>
            </View>
            <Text style={[styles.categoryLabel, { color: colors.textSecondary }]} numberOfLines={1}>
              {stat.category}
            </Text>
          </View>
        ))}

        {/* Add Category Circle */}
        <View style={styles.categoryCircleWrapper}>
          <View style={[styles.categoryCircle, { borderColor: colors.border }]}>
            <View style={[styles.addCircle, { backgroundColor: colors.primaryLight }]}>
              <Plus size={18} color={colors.primary} />
            </View>
          </View>
          <Text style={[styles.categoryLabel, { color: colors.textMuted }]}>Add</Text>
        </View>
      </View>

      {/* Detailed List */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Category Details</Text>
      </View>

      {categoryStats.map((stat) => (
        <View key={stat.category} style={[styles.detailRow, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <CategoryIcon category={stat.category} size={18} bgSize={36} />
          <View style={styles.detailMeta}>
            <Text style={[styles.detailName, { color: colors.text }]}>{stat.category}</Text>
            <Text style={[styles.detailPct, { color: colors.textMuted }]}>{stat.pct}% of total</Text>
          </View>
          <Text style={[styles.detailAmount, { color: colors.text }]}>{fmt(stat.spent)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: 40 },

  pickerRow: { alignItems: 'center', marginTop: 16 },

  chartSection: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    paddingVertical: 8,
    borderWidth: 1,
    alignItems: 'center',
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  categoryCircleWrapper: {
    alignItems: 'center',
    width: 80,
  },
  categoryCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pctText: {
    fontSize: 14,
    fontWeight: '800',
  },
  addCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 6,
    textAlign: 'center',
  },

  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700' },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  detailMeta: { flex: 1, marginLeft: 12 },
  detailName: { fontSize: 14, fontWeight: '600' },
  detailPct: { fontSize: 12, marginTop: 1 },
  detailAmount: { fontSize: 15, fontWeight: '700' },
});
