import { IconMoon, IconSun } from './Icons';
import { toggleTheme, useTheme } from '../store/theme';

export function ThemeToggle() {
  const theme = useTheme();
  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
      title={theme === 'light' ? 'Dark theme' : 'Light theme'}
    >
      {theme === 'light' ? <IconMoon /> : <IconSun />}
    </button>
  );
}
