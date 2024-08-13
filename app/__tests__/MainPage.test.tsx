import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigation, useSearchParams } from '@remix-run/react';
import { Theme, ThemeContext } from '../context/ThemeContext';
import MainPage from '../pages/MainPage/MainPage';
import { PeopleResponse } from '../services/types';
import useSearchTerm from '../hooks/useSearchTerm';
import { Person } from '../types';
import { personMock } from '../__mocks__/people';

jest.mock('@remix-run/react', () => ({
  useNavigation: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('../hooks/useSearchTerm', () => jest.fn());

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

  const mockCardData: Person = personMock;

  const mockSetSearchParams = jest.fn();

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
    (useNavigation as jest.Mock).mockReturnValue({ state: 'idle' });
    (useSearchTerm as jest.Mock).mockReturnValue(['', jest.fn()]);
  });

  const renderMainPage = (
    theme: Theme = 'light',
    cardData?: Person,
    PersonCard?: React.ElementType<{ cardData?: Person }>
  ) => {
    return render(
      <ThemeContext.Provider value={{ theme, setTheme: jest.fn() }}>
        <MainPage data={mockData} cardData={cardData} PersonCard={PersonCard} />
      </ThemeContext.Provider>
    );
  };

  it('renders MainPage component with light theme by default', () => {
    renderMainPage();
    const wrapper = screen.getByTestId('app-wrapper');
    expect(wrapper).toHaveClass('light-theme');
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByTestId('theme-selector')).toBeInTheDocument();
  });

  it('handles pagination navigation', () => {
    renderMainPage();
    const pagination = screen.getByTestId('pagination');
    const paginationButtons = pagination.getElementsByTagName('button');
    fireEvent.click(paginationButtons[0]);

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams('page=1')
    );
  });

  it('renders PersonCard component when provided', () => {
    const MockPersonCard = ({ cardData }: { cardData?: Person }) => (
      <div>PersonCard: {cardData?.name}</div>
    );

    renderMainPage('light', mockCardData, MockPersonCard);
    expect(
      screen.getByText(`PersonCard: ${personMock.name}`)
    ).toBeInTheDocument();
  });

  it('throws and catches test error', () => {
    renderMainPage();
    const throwErrorButton = screen.getByText('Throw Error');
    expect(() => fireEvent.click(throwErrorButton)).toThrow('Test error');
  });
});
