import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { ThemeContext } from '../context/ThemeContext';
import App from '../App';
import Card from '../components/Card/Card';
import * as apiService from '../services/apiService';
import { peopleMock, personMock } from '../__mocks__/people';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('../services/apiService', () => ({
  __esModule: true,
  ...jest.requireActual<typeof apiService>('../services/apiService'),
}));

jest.mock('../components/Card/Card', () => {
  return function CardMock() {
    return <div>Card Component</div>;
  };
});

describe('App', () => {
  const pushMock = jest.fn();
  const useGetPeopleQueryMock = jest.spyOn(
    apiService,
    'useGetPeopleQuery'
  ) as jest.Mock;
  const useGetPeopleByIdQueryMock = jest.spyOn(
    apiService,
    'useGetPersonByIdQuery'
  ) as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });
    useGetPeopleQueryMock.mockReturnValue({
      data: { count: 82, results: peopleMock },
      isLoading: false,
    });
    useGetPeopleByIdQueryMock.mockReturnValue({
      data: personMock,
      isLoading: false,
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

    expect(screen.getByText('Card Component')).toBeInTheDocument();
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
