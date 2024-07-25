import { createContext, useState } from 'react';
import { LS_KEYS } from '../constants';

type Theme = 'light' | 'dark';

interface Props {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<Props>({
  theme: 'light',
  setTheme: (theme: Theme) => {
    console.log(`${theme} theme is set`);
  },
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(
    (localStorage.getItem(LS_KEYS.Theme) as Theme) || 'light'
  );
  const setTheme = (theme: Theme) => {
    setThemeState(theme);
    localStorage.setItem(LS_KEYS.Theme, theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
