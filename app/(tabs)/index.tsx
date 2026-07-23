import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useFinanceStore } from '../../store/useFinanceStore';
import { TransactionItem } from '../../components/TransactionItem';
import { useTheme } from '../../context/ThemeContext';
import { Plus, ArrowDownLeft, ArrowUpRight, TrendingUp } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const {
    transactions,
    currencySymbol,
    getTotalBalance,
    getTotalIncome,
    getTotalExpenses,
    deleteTransaction,
  } = useFinanceStore();

  const balance = getTotalBalance();
  const income = getTotalIncome();
  const expenses = getTotalExpenses();
  const recentTransactions = transactions.slice(0, 5);

  const fmt = (val: number) =>
    `${currencySymbol}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>{fmt(balance)}</Text>

          <View style={styles.balanceRow}>
            <View style={styles.balanceStat}>
              <View style={[styles.statIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <ArrowDownLeft size={14} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.statLabel}>Income</Text>
                <Text style={styles.statValue}>+{fmt(income)}</Text>
              </View>
            </View>

            <View style={styles.balanceDivider} />

            <View style={styles.balanceStat}>
              <View style={[styles.statIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <ArrowUpRight size={14} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.statLabel}>Expenses</Text>
                <Text style={styles.statValue}>-{fmt(expenses)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Add Button */}
        <Pressable
          style={[styles.quickAddBtn, { backgroundColor: colors.accent }]}
          onPress={() => router.push('/add-transaction')}
        >
          <Plus size={20} color={colors.accentText} />
          <Text style={[styles.quickAddText, { color: colors.accentText }]}>
            Log Transaction
          </Text>
        </Pressable>

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent Activity
          </Text>
          <Pressable onPress={() => router.push('/(tabs)/budget')}>
            <Text style={[styles.viewAll, { color: colors.primary }]}>View All</Text>
          </Pressable>
        </View>

        {recentTransactions.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <TrendingUp size={32} color={colors.textMuted} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No transactions yet</Text>
            <Text style={[styles.emptySub, { color: colors.textMuted }]}>
              Tap "Log Transaction" to add your first entry.
            </Text>
          </View>
        ) : (
          recentTransactions.map((tx) => (
            <TransactionItem
              key={tx.id}
              transaction={tx}
              currencySymbol={currencySymbol}
              onDelete={deleteTransaction}
            />
          ))
        )}
      </ScrollView>

      {/* FAB */}
      <Pressable
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => router.push('/add-transaction')}
      >
        <Plus size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: 80 },

  // Balance Card
  balanceCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 24,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: -0.5,
  },
  balanceRow: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  balanceStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '500',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 1,
  },
  balanceDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 12,
  },

  // Quick Add
  quickAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  quickAddText: {
    fontSize: 15,
    fontWeight: '700',
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '600',
  },

  // Empty
  emptyCard: {
    marginHorizontal: 16,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    gap: 8,
  },
  emptyTitle: { fontSize: 16, fontWeight: '700' },
  emptySub: { fontSize: 13, textAlign: 'center' },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
