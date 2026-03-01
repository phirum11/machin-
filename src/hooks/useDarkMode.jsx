import { useTheme } from '../context/ThemeContext';

export const useDarkMode = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  return { theme, toggleTheme, isDark };
};

export default useDarkMode;
