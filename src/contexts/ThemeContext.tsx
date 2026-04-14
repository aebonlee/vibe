import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
  colorTheme: string;
  setColorTheme: React.Dispatch<React.SetStateAction<string>>;
  COLORS: string[];
  searchOpen: boolean;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const COLORS: string[] = ['blue', 'purple', 'red', 'green', 'orange'];

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): React.ReactElement {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('vibe-theme');
    if (saved) return saved === 'dark';
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  });

  const [colorTheme, setColorTheme] = useState<string>(() => {
    return localStorage.getItem('vibe-colorTheme') || 'blue';
  });

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('vibe-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    document.documentElement.setAttribute('data-color', colorTheme);
    localStorage.setItem('vibe-colorTheme', colorTheme);
  }, [colorTheme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = (): void => setIsDark(prev => !prev);

  const value: ThemeContextValue = {
    isDark,
    toggleTheme,
    colorTheme,
    setColorTheme,
    COLORS,
    searchOpen,
    setSearchOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
