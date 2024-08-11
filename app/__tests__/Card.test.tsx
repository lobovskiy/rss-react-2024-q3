import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetPersonByIdQuery } from '../services/apiService';

import Card from '../components/Card/Card';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('../services/apiService', () => ({
  useGetPersonByIdQuery: jest.fn(),
}));

describe('Card Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('details=1'),
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Loading..." when data is fetching', () => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: true,
    });

    render(<Card />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders person details when data is available', () => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: {
        name: 'Luke Skywalker',
        gender: 'male',
        height: '172',
        skin_color: 'fair',
        birth_year: '19BBY',
        eye_color: 'blue',
        hair_color: 'blond',
      },
      isFetching: false,
    });

    render(<Card />);

    expect(screen.getByText('Name: Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Skin color: fair')).toBeInTheDocument();
    expect(screen.getByText('Birth year: 19BBY')).toBeInTheDocument();
    expect(screen.getByText('Eye color: blue')).toBeInTheDocument();
    expect(screen.getByText('Hair color: blond')).toBeInTheDocument();
  });

  it('renders nothing if id is 0 and not fetching', () => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams()]);
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
    });

    const { container } = render(<Card />);

    expect(container.firstChild).toBeNull();
  });

  it('navigates to the home page when the close button is clicked', () => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: {
        name: 'Luke Skywalker',
        gender: 'male',
        height: '172',
        skin_color: 'fair',
        birth_year: '19BBY',
        eye_color: 'blue',
        hair_color: 'blond',
      },
      isFetching: false,
    });

    render(<Card />);

    const closeButton = screen.getByTestId('card-details-close-button');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/?');
  });

  it('renders nothing when there is no person data and not fetching', () => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
    });

    render(<Card />);

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Name:')).not.toBeInTheDocument();
  });
});
