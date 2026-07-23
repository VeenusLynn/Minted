import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { Transaction } from '../types/finance';
import { CategoryIcon } from './CategoryIcon';
import { useTheme } from '../context/ThemeContext';

interface TransactionItemProps {
  transaction: Transaction;
  currencySymbol?: string;
  onDelete?: (id: string) => void;
  onPress?: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  currencySymbol = '$',
  onDelete,
  onPress,
}) => {
  const { colors } = useTheme();
  const isIncome = transaction.type === 'income';

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
      onPress={onPress}
    >
      <CategoryIcon category={transaction.category} size={20} bgSize={44} />

      <View style={styles.details}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {transaction.title}
        </Text>
        <View style={styles.meta}>
          <Text style={[styles.category, { color: colors.textSecondary }]}>
            {transaction.category}
          </Text>
          <Text style={[styles.dot, { color: colors.textMuted }]}>•</Text>
          <Text style={[styles.date, { color: colors.textMuted }]}>
            {formatDate(transaction.date)}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text
          style={[
            styles.amount,
            { color: isIncome ? colors.success : colors.danger },
          ]}
        >
          {isIncome ? '+' : '-'}
          {currencySymbol}
          {transaction.amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
        {onDelete && (
          <Pressable
            style={({ pressed }) => [styles.deleteBtn, pressed && { opacity: 0.5 }]}
            onPress={() => onDelete(transaction.id)}
            hitSlop={8}
          >
            <Trash2 size={14} color={colors.textMuted} />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  category: {
    fontSize: 12,
    fontWeight: '500',
  },
  dot: {
    fontSize: 12,
    marginHorizontal: 4,
  },
  date: {
    fontSize: 12,
  },
  right: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
  },
  deleteBtn: {
    marginTop: 4,
    padding: 4,
  },
});
