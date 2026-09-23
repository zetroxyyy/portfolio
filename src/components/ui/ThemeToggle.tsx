'use client';

import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  // still needed so a change in another tab is reflected here
  window.addEventListener('storage', callback);
  return () => {
    observer.disconnect();
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function getServerSnapshot(): 'light' | 'dark' {
  return 'light';
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      suppressHydrationWarning
    >
      <span
        className="theme-toggle__icon"
        aria-hidden="true"
        suppressHydrationWarning
      >
        {theme === 'dark' ? '☀' : '☾'}
      </span>
      <span className="theme-toggle__label" suppressHydrationWarning>
        {theme === 'dark' ? 'LIGHT' : 'DARK'}
      </span>
    </button>
  );
}
