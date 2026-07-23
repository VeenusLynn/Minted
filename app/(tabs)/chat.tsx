import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MessageCircle, Sparkles } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

export default function ChatScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.iconCircle, { backgroundColor: colors.primaryLight }]}>
        <MessageCircle size={48} color={colors.primary} />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>Feature Coming Soon</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        We're building an AI-powered financial assistant that will help you manage your money smarter.
      </Text>
      <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
        <Sparkles size={14} color={colors.primary} />
        <Text style={[styles.badgeText, { color: colors.primary }]}>In Development</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
