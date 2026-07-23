import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Calendar, ChevronDown } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface MonthPickerProps {
  month: number; // 0-indexed
  year: number;
  onPrev: () => void;
  onNext: () => void;
  onPress?: () => void;
}

export const MonthPicker: React.FC<MonthPickerProps> = ({
  month,
  year,
  onPrev,
  onNext,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}
      onPress={onPress}
    >
      <Calendar size={16} color={colors.textSecondary} />
      <Text style={[styles.label, { color: colors.text }]}>
        {MONTH_NAMES[month]} {year}
      </Text>
      <ChevronDown size={16} color={colors.textSecondary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
});
