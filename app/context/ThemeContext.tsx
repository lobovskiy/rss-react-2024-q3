import { createContext, useState } from 'react';

export type Theme = 'light' | 'dark';

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
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
