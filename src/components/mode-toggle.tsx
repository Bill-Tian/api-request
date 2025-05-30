'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
