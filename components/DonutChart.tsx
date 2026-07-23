import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { useTheme } from '../context/ThemeContext';

interface DonutSlice {
  value: number;
  color: string;
  label?: string;
}

interface DonutChartProps {
  data: DonutSlice[];
  centerLabel?: string;
  centerValue?: string;
  radius?: number;
  innerRadius?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  centerLabel,
  centerValue,
  radius = 100,
  innerRadius = 70,
}) => {
  const { colors } = useTheme();

  const pieData = data.map((d) => ({
    value: d.value,
    color: d.color,
    text: d.label || '',
    textColor: colors.text,
    textSize: 12,
  }));

  return (
    <View style={styles.container}>
      <PieChart
        data={pieData}
        donut
        radius={radius}
        innerRadius={innerRadius}
        innerCircleColor={colors.surface}
        centerLabelComponent={() => (
          <View style={styles.centerContent}>
            {centerLabel ? (
              <Text style={[styles.centerLabel, { color: colors.textMuted }]}>
                {centerLabel}
              </Text>
            ) : null}
            {centerValue ? (
              <Text style={[styles.centerValue, { color: colors.text }]}>
                {centerValue}
              </Text>
            ) : null}
          </View>
        )}
        isAnimated
        animationDuration={600}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  centerValue: {
    fontSize: 26,
    fontWeight: '800',
    marginTop: 2,
  },
});
