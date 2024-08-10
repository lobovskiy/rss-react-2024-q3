import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { ThemeContext } from '../context/ThemeContext';
import App from '../App';
import Card from '../components/Card/Card';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('App', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });
  });

  const renderComponent = (PersonCard?: React.ElementType) => {
    render(<App PersonCard={PersonCard} />);
  };

  test('should render the main page by default', () => {
    renderComponent();

    expect(screen.getByText('Select theme:')).toBeInTheDocument();
  });

  test('should render the Card component with person card component', () => {
    renderComponent(Card);

    expect(screen.getByText('Chosen person')).toBeInTheDocument();
  });

  test('should apply the correct theme', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn() }}>
        <App />
      </ThemeContext.Provider>
    );

    expect(screen.getByTestId('app-wrapper')).toHaveClass('dark-theme');
  });
});
