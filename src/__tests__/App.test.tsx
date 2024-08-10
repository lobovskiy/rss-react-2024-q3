import { render, screen } from '@testing-library/react';

import App from '../App';
import { Theme, ThemeContext } from '../context/ThemeContext';

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui);
};

describe('App', () => {
  test('should render the main page by default', () => {
    renderWithRouter(<App />);

    expect(screen.getByText('Select theme:')).toBeInTheDocument();
  });

  test('should render the Card component when navigating to /person', () => {
    renderWithRouter(<App />, { route: '/person' });

    expect(screen.getByText('Chosen person')).toBeInTheDocument();
  });

  test('should render the not found page for an unknown route', () => {
    renderWithRouter(<App />, { route: '/unknown' });

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  test('should apply the correct theme', () => {
    const customThemeContext = {
      theme: 'dark' as Theme,
      setTheme: jest.fn(),
    };

    renderWithRouter(
      <ThemeContext.Provider value={customThemeContext}>
        <App />
      </ThemeContext.Provider>
    );
    expect(screen.getByTestId('app-wrapper')).toHaveClass('dark-theme');
  });
});
