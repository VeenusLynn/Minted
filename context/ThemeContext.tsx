import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeColors, lightTheme, darkTheme } from '../constants/theme';

const THEME_STORAGE_KEY = 'minted-theme-preference';

interface ThemeContextValue {
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark' | 'system') => void;
  themeMode: 'light' | 'dark' | 'system';
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: lightTheme,
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
  themeMode: 'system',
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useRNColorScheme();
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('light');
  const [loaded, setLoaded] = useState(false);

  // Load persisted preference on mount
  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setThemeMode(stored);
      }
      setLoaded(true);
    });
  }, []);

  // Persist preference changes
  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(THEME_STORAGE_KEY, themeMode);
    }
  }, [themeMode, loaded]);

  const isDark = useMemo(() => {
    if (themeMode === 'system') {
      return systemScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, systemScheme]);

  const colors = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'light';
      // If system, flip to the opposite of current system value
      return isDark ? 'light' : 'dark';
    });
  };

  const setTheme = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
  };

  const value = useMemo(
    () => ({ colors, isDark, toggleTheme, setTheme, themeMode }),
    [colors, isDark, themeMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme() — Access the current theme colors and toggle function.
 *
 * Usage:
 *   const { colors, isDark, toggleTheme } = useTheme();
 *   <View style={{ backgroundColor: colors.background }}>
 */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
