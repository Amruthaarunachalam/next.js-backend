'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-3 py-1.5 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md text-xs font-semibold cursor-pointer border border-gray-300 dark:border-gray-700 hover:opacity-80 transition-opacity"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}