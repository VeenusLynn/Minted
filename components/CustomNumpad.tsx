import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Delete } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

interface CustomNumpadProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
}

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'del'],
];

export const CustomNumpad: React.FC<CustomNumpadProps> = ({ onKeyPress, onBackspace }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {KEYS.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => {
            const isDel = key === 'del';
            return (
              <Pressable
                key={key}
                style={({ pressed }) => [
                  styles.key,
                  {
                    backgroundColor: pressed
                      ? colors.border
                      : colors.surfaceSecondary,
                  },
                ]}
                onPress={() => {
                  if (isDel) {
                    onBackspace();
                  } else {
                    onKeyPress(key);
                  }
                }}
              >
                {isDel ? (
                  <Delete size={24} color={colors.text} />
                ) : (
                  <Text style={[styles.keyText, { color: colors.text }]}>
                    {key}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  key: {
    flex: 1,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 110,
  },
  keyText: {
    fontSize: 22,
    fontWeight: '600',
  },
});
