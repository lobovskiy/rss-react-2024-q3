import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from '../components/ErrorBoundary';
import App from '../App';
import { Theme, ThemeContext, ThemeProvider } from '../context/ThemeContext';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('App', () => {
  test('should render the main page by default', () => {
    renderWithRouter(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Select theme:')).toBeInTheDocument();
  });

  test('should render the Card component when navigating to /person', () => {
    renderWithRouter(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>,
      { route: '/person' }
    );

    expect(screen.getByText('Chosen person')).toBeInTheDocument();
  });

  test('should render the not found page for an unknown route', () => {
    renderWithRouter(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
      { route: '/unknown' }
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  test('should apply the correct theme', () => {
    const customThemeContext = {
      theme: 'dark' as Theme,
      setTheme: jest.fn(),
    };

    renderWithRouter(
      <Provider store={store}>
        <ThemeContext.Provider value={customThemeContext}>
          <App />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByTestId('app-wrapper')).toHaveClass('dark-theme');
  });

  test('should display error boundary fallback UI when an error is thrown', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      console.log('error');
    });

    const ProblematicComponent = () => {
      throw new Error('Test error');
    };

    renderWithRouter(
      <ThemeProvider>
        <ErrorBoundary>
          <ProblematicComponent />
        </ErrorBoundary>
      </ThemeProvider>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
