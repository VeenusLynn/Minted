import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

interface SummaryCardProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  currencySymbol?: string;
  onAddTransaction?: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  totalBalance,
  totalIncome,
  totalExpenses,
  currencySymbol = '$',
  onAddTransaction,
}) => {
  const formatCurrency = (val: number) => {
    return `${currencySymbol}${val.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <View style={styles.cardContainer}>
      {/* Main Net Balance Header */}
      <View style={styles.topSection}>
        <View>
          <Text style={styles.label}>Total Net Balance</Text>
          <Text style={styles.balanceText}>{formatCurrency(totalBalance)}</Text>
        </View>

        {onAddTransaction && (
          <Pressable style={styles.quickAddBtn} onPress={onAddTransaction}>
            <Text style={styles.quickAddText}>+ Log Cash</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.divider} />

      {/* Income & Expense Breakdown Row */}
      <View style={styles.statsRow}>
        {/* Income Card */}
        <View style={styles.statBox}>
          <View style={[styles.iconBadge, { backgroundColor: 'rgba(46, 204, 113, 0.15)' }]}>
            <ArrowDownLeft size={16} color="#2ECC71" />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statLabel}>Total Income</Text>
            <Text style={[styles.statValue, { color: '#2ECC71' }]}>
              +{formatCurrency(totalIncome)}
            </Text>
          </View>
        </View>

        <View style={styles.verticalDivider} />

        {/* Expense Card */}
        <View style={styles.statBox}>
          <View style={[styles.iconBadge, { backgroundColor: 'rgba(255, 107, 107, 0.15)' }]}>
            <ArrowUpRight size={16} color="#FF6B6B" />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statLabel}>Total Spent</Text>
            <Text style={[styles.statValue, { color: '#FF6B6B' }]}>
              -{formatCurrency(totalExpenses)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  balanceText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: -0.5,
  },
  quickAddBtn: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickAddText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  verticalDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginHorizontal: 12,
  },
});
