import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { Category } from '../types/finance';
import { CATEGORY_DETAILS } from '../constants/CategoryData';
import { useTheme } from '../context/ThemeContext';

interface CategoryIconProps {
  category: Category;
  size?: number;
  iconColor?: string;
  showBackground?: boolean;
  bgSize?: number;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  size = 20,
  iconColor,
  showBackground = true,
  bgSize = 44,
}) => {
  const { colors, isDark } = useTheme();
  const details = CATEGORY_DETAILS[category] || CATEGORY_DETAILS['Other'];
  const iconName = details.icon as keyof typeof Icons;

  const IconComponent = (Icons[iconName] as React.FC<{ size: number; color: string }>) || Icons.HelpCircle;
  const finalColor = iconColor || details.color;

  if (!showBackground) {
    return <IconComponent size={size} color={finalColor} />;
  }

  return (
    <View
      style={[
        styles.container,
        {
          width: bgSize,
          height: bgSize,
          borderRadius: bgSize / 2.5,
          backgroundColor: isDark ? `${details.color}20` : details.bgColor,
        },
      ]}
    >
      <IconComponent size={size} color={finalColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
