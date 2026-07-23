import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart as GiftedBarChart } from 'react-native-gifted-charts';
import { useTheme } from '../context/ThemeContext';
import { DailyBreakdown } from '../types/finance';

interface BarChartProps {
  data: DailyBreakdown[];
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({ data, height = 200 }) => {
  const { colors } = useTheme();

  // Transform DailyBreakdown into grouped bar data
  const barData = data.flatMap((d) => [
    {
      value: d.expense,
      label: d.day,
      spacing: 4,
      frontColor: colors.chartExpense,
      labelTextStyle: { color: colors.textMuted, fontSize: 11 },
    },
    {
      value: d.income,
      frontColor: colors.chartIncome,
    },
  ]);

  const maxValue = Math.max(
    ...data.map((d) => Math.max(d.income, d.expense)),
    100
  );

  return (
    <View style={styles.container}>
      <GiftedBarChart
        data={barData}
        barWidth={16}
        spacing={14}
        roundedTop
        roundedBottom
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: colors.textMuted, fontSize: 11 }}
        noOfSections={4}
        maxValue={Math.ceil(maxValue / 100) * 100}
        height={height}
        barBorderRadius={4}
        isAnimated
        animationDuration={600}
        backgroundColor={'transparent'}
        rulesColor={colors.divider}
        rulesType="solid"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    alignItems: 'center',
  },
});
