import { useTheme } from '../context/ThemeContext';

/**
 * Convenience hook for accessing dark-mode state and toggle.
 *
 * @returns {{ isDark: boolean, isLight: boolean, toggleTheme: Function, theme: string }}
 */
const useDarkMode = () => {
  const { theme, toggleTheme, isDark, isLight } = useTheme();
  return { theme, toggleTheme, isDark, isLight };
};

export default useDarkMode;
