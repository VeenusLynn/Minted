import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  height?: number;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color,
  height = 8,
  showLabel = false,
}) => {
  const { colors } = useTheme();
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const percentage = Math.round(clampedProgress * 100);
  const barColor = color || colors.primary;

  return (
    <View style={styles.container}>
      <View style={[styles.track, { backgroundColor: colors.borderLight, height, borderRadius: height / 2 }]}>
        <View
          style={{
            width: `${percentage}%`,
            backgroundColor: barColor,
            height,
            borderRadius: height / 2,
          }}
        />
      </View>
      {showLabel && (
        <Text style={[styles.percentageText, { color: colors.textMuted }]}>
          {percentage}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'right',
  },
});
