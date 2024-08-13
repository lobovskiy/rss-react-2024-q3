import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Theme, ThemeContext } from '../context/ThemeContext';
import { store } from '../redux/store';
import App from '../App';
import { PeopleResponse } from '../services/types';
import { Person } from '../types';
import { peopleMock } from '../__mocks__/people';

jest.mock('../pages/MainPage/MainPage', () => {
  const MainPage = () => <div>MainPage Component</div>;
  MainPage.displayName = 'MainPage';
  return MainPage;
});
jest.mock('../components/ErrorBoundary', () => {
  const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => <div>{children}</div>;
  ErrorBoundary.displayName = 'ErrorBoundary';
  return ErrorBoundary;
});
jest.mock('../clientOnly', () => {
  const ClientOnly: React.FC<{ children: () => React.ReactNode }> = ({
    children,
  }) => <div>{children()}</div>;
  ClientOnly.displayName = 'ClientOnly';
  return { ClientOnly };
});

describe('App Component', () => {
  const mockData: PeopleResponse = {
    count: 82,
    results: peopleMock,
  };

  const renderApp = (
    theme: Theme = 'light',
    cardData?: Person,
    PersonCard?: React.ElementType<{ cardData?: Person }>
  ) => {
    return render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme, setTheme: jest.fn() }}>
          <App data={mockData} cardData={cardData} PersonCard={PersonCard} />
        </ThemeContext.Provider>
      </Provider>
    );
  };

  test('renders App component with light theme by default', () => {
    const { getByTestId } = renderApp();
    const appWrapper = getByTestId('app-wrapper');
    expect(appWrapper).toHaveClass('light-theme');
  });

  test('renders App component with dark theme', () => {
    const { getByTestId } = renderApp('dark');
    const appWrapper = getByTestId('app-wrapper');
    expect(appWrapper).toHaveClass('dark-theme');
  });

  test('renders MainPage component with correct props', () => {
    const { getByText } = renderApp();
    expect(getByText('MainPage Component')).toBeInTheDocument();
  });
});
