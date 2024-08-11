import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetPeopleQuery } from '../services/apiService';
import useSearchTerm from '../hooks/useSearchTerm';
import MainPage from '../pages/MainPage/MainPage';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { peopleMock } from '../__mocks__/people';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('../services/apiService', () => ({
  useGetPeopleQuery: jest.fn(),
}));

jest.mock('../hooks/useSearchTerm', () => jest.fn());

const mockStore = configureStore([]);
const store = mockStore({
  selectedPeople: { ids: ['1', '2', '3'] },
});

describe('MainPage Component', () => {
  const mockNavigate = jest.fn();
  const mockSetSearchParams = jest.fn();
  const mockUseGetPeopleQuery = useGetPeopleQuery as jest.Mock;
  const mockUseSearchTerm = useSearchTerm as jest.Mock;

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(''),
      mockSetSearchParams,
    ]);
    mockUseSearchTerm.mockReturnValue(['', jest.fn()]);
    mockUseGetPeopleQuery.mockReturnValue({
      data: { results: [], count: 0 },
      isFetching: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Search, CardList, Pagination, and ThemeSelector components', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('There is no people found')).toBeInTheDocument();
  });

  it('navigates to the correct page when handleSetPage is called', () => {
    mockUseGetPeopleQuery.mockReturnValue({
      data: { results: peopleMock, count: 82 },
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    const setPageButton = screen.getByText('2');

    fireEvent.click(setPageButton);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('renders the PersonCard component if provided', () => {
    const PersonCard = () => <div>PersonCard</div>;

    render(
      <Provider store={store}>
        <MainPage PersonCard={PersonCard} />
      </Provider>
    );

    expect(screen.getByText('PersonCard')).toBeInTheDocument();
  });
});
