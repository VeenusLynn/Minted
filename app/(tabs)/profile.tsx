import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useFinanceStore } from '../../store/useFinanceStore';
import {
  Sun, Moon, Monitor, DollarSign, Tag, Download, RotateCcw, Info, ChevronRight,
} from 'lucide-react-native';
import { MintPalette } from '../../constants/theme';

const CURRENCIES = ['$', '€', '£', '¥', 'د.إ'];

export default function ProfileScreen() {
  const { colors, isDark, toggleTheme, setTheme, themeMode } = useTheme();
  const { currencySymbol, setCurrencySymbol, resetToSampleData } = useFinanceStore();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.scroll}>
      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>M</Text>
        </View>
        <Text style={[styles.userName, { color: colors.text }]}>Minted User</Text>
        <Text style={[styles.userSub, { color: colors.textSecondary }]}>Personal Finance Tracker</Text>
      </View>

      {/* Appearance */}
      <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>APPEARANCE</Text>
      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <Pressable
          style={styles.settingRow}
          onPress={() => setTheme('light')}
        >
          <View style={styles.settingLeft}>
            <Sun size={20} color={themeMode === 'light' ? colors.primary : colors.textMuted} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Light Mode</Text>
          </View>
          <View style={[styles.radio, themeMode === 'light' && { backgroundColor: colors.primary, borderColor: colors.primary }]} />
        </Pressable>

        <View style={[styles.rowDivider, { backgroundColor: colors.divider }]} />

        <Pressable
          style={styles.settingRow}
          onPress={() => setTheme('dark')}
        >
          <View style={styles.settingLeft}>
            <Moon size={20} color={themeMode === 'dark' ? colors.primary : colors.textMuted} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
          </View>
          <View style={[styles.radio, themeMode === 'dark' && { backgroundColor: colors.primary, borderColor: colors.primary }]} />
        </Pressable>

        <View style={[styles.rowDivider, { backgroundColor: colors.divider }]} />

        <Pressable
          style={styles.settingRow}
          onPress={() => setTheme('system')}
        >
          <View style={styles.settingLeft}>
            <Monitor size={20} color={themeMode === 'system' ? colors.primary : colors.textMuted} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>System Default</Text>
          </View>
          <View style={[styles.radio, themeMode === 'system' && { backgroundColor: colors.primary, borderColor: colors.primary }]} />
        </Pressable>
      </View>

      {/* Currency */}
      <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>CURRENCY</Text>
      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <View style={styles.currencyRow}>
          {CURRENCIES.map((c) => (
            <Pressable
              key={c}
              style={[
                styles.currencyBtn,
                {
                  backgroundColor: currencySymbol === c ? colors.primary : colors.surfaceSecondary,
                  borderColor: currencySymbol === c ? colors.primary : colors.border,
                },
              ]}
              onPress={() => setCurrencySymbol(c)}
            >
              <Text
                style={[
                  styles.currencyText,
                  { color: currencySymbol === c ? '#FFFFFF' : colors.text },
                ]}
              >
                {c}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Data Management */}
      <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>DATA</Text>
      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <Pressable style={styles.settingRow} onPress={resetToSampleData}>
          <View style={styles.settingLeft}>
            <RotateCcw size={20} color={colors.warning} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Reset to Sample Data</Text>
          </View>
          <ChevronRight size={16} color={colors.textMuted} />
        </Pressable>
      </View>

      {/* App Info */}
      <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>ABOUT</Text>
      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Info size={20} color={colors.textMuted} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Version</Text>
          </View>
          <Text style={[styles.settingValue, { color: colors.textMuted }]}>1.0.0</Text>
        </View>
      </View>

      <Text style={[styles.footer, { color: colors.textMuted }]}>
        Made with 🌿 by Minted
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: 40 },

  avatarSection: { alignItems: 'center', paddingTop: 24, paddingBottom: 24 },
  avatar: { width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  userName: { fontSize: 20, fontWeight: '700', marginTop: 12 },
  userSub: { fontSize: 13, marginTop: 2 },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
  },

  card: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },

  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingLabel: { fontSize: 15, fontWeight: '500' },
  settingValue: { fontSize: 14, fontWeight: '500' },
  rowDivider: { height: 1, marginHorizontal: 16 },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A8A29E',
  },

  currencyRow: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    justifyContent: 'center',
  },
  currencyBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  currencyText: { fontSize: 18, fontWeight: '700' },

  footer: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 13,
  },
});
