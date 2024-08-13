import { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import ThemeProvider, { ThemeContext } from '../context/ThemeContext';

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should provide the default theme', () => {
    const TestComponent = () => {
      const { theme } = useContext(ThemeContext);
      return <div>{theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('light')).toBeInTheDocument();
  });

  test('should update the theme when setTheme is called', () => {
    const TestComponent = () => {
      const { theme, setTheme } = useContext(ThemeContext);
      return (
        <div>
          <div>{theme}</div>
          <button onClick={() => setTheme('dark')}>Set Dark Theme</button>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Set Dark Theme'));

    expect(screen.getByText('dark')).toBeInTheDocument();
  });
});
