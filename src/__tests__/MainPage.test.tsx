import { render, screen, fireEvent } from '@testing-library/react';
import {
  useRouter as useNavigationRouter,
  useSearchParams,
} from 'next/navigation';
import { useRouter } from 'next/router';
import { ThemeContext } from '../context/ThemeContext';
import MainPage from '../pageComponents/MainPage/MainPage';
import { PeopleResponse } from '../services/types';
import * as React from 'react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  useNavigationRouter: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../hooks/useSearchTerm', () => jest.fn(() => ['test', jest.fn()]));
jest.mock('../hooks/useLoader', () => jest.fn(() => ({ loading: false })));

jest.mock('../components/ThemeSelector/ThemeSelector', () =>
  jest.fn(() => <div data-testid="theme-selector" />)
);
jest.mock('../components/CardList/CardList', () =>
  jest.fn(() => <div data-testid="card-list" />)
);

describe('MainPage', () => {
  const mockData: PeopleResponse = {
    results: [],
    count: 1,
  };

  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      query: {},
    });

    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    (useNavigationRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders MainPage component with all sub-components', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'light', setTheme: jest.fn() }}>
        <MainPage data={mockData} />
      </ThemeContext.Provider>
    );

    expect(screen.getByTestId('app-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('theme-selector')).toBeInTheDocument();
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('handles search term change and navigation correctly', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'light', setTheme: jest.fn() }}>
        <MainPage data={mockData} />
      </ThemeContext.Provider>
    );

    const searchComponent = screen.getByTestId('search-input');
    fireEvent.change(searchComponent, { target: { value: 'Luke' } });

    fireEvent.click(screen.getByTestId('search-button'));
    expect(mockPush).toHaveBeenCalledWith('/?search=Luke');
  });

  it('handles page change correctly', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'light', setTheme: jest.fn() }}>
        <MainPage data={mockData} />
      </ThemeContext.Provider>
    );

    const paginationComponent = screen.getByTestId('pagination');
    const paginationButtons =
      paginationComponent.getElementsByTagName('button')[0];
    fireEvent.click(paginationButtons);

    expect(mockPush).toHaveBeenCalledWith('/?page=1');
  });

  test('should apply the correct theme', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn() }}>
        <MainPage data={mockData} />
      </ThemeContext.Provider>
    );

    expect(screen.getByTestId('app-wrapper')).toHaveClass('dark-theme');
  });
});
