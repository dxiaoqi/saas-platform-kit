'use client';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className="h-8 m-2 p-1 rounded border-current">
      {theme === 'light' ? '🌞' : '🌜'}
    </button>
  );
}
