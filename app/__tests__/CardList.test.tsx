import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addSelectedPerson,
  clearSelectedPeople,
  removeSelectedPerson,
} from '../redux/selectedPeople/slice';
import CardList from '../components/CardList/CardList';
import { Person } from '../types';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('../redux/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

describe('CardList Component', () => {
  const mockNavigate = jest.fn();
  const mockDispatch = jest.fn();
  const mockUseSelector = useAppSelector as jest.Mock;

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('')]);
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    mockUseSelector.mockReturnValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when progress is true', () => {
    render(<CardList people={[]} progress={true} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders "There is no people found" when people list is empty', () => {
    render(<CardList people={[]} progress={false} />);

    expect(screen.getByText('There is no people found')).toBeInTheDocument();
  });

  it('renders people and handles card click', () => {
    const people = [
      {
        name: 'Luke Skywalker',
        gender: 'male',
        birth_year: '19BBY',
        url: 'https://swapi.dev/api/people/1/',
      },
      {
        name: 'Leia Organa',
        gender: 'female',
        birth_year: '19BBY',
        url: 'https://swapi.dev/api/people/2/',
      },
    ];

    render(<CardList people={people as Person[]} progress={false} />);

    const buttons = screen.getAllByTestId('card-list-item');
    fireEvent.click(buttons[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/person?details=1');
  });

  it('dispatches addSelectedPerson when checkbox is checked', () => {
    const people = [
      {
        name: 'Luke Skywalker',
        gender: 'male',
        birth_year: '19BBY',
        url: 'https://swapi.dev/api/people/1/',
      },
    ];

    render(<CardList people={people as Person[]} progress={false} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith(addSelectedPerson('1'));
  });

  it('dispatches removeSelectedPerson when checkbox is unchecked', () => {
    mockUseSelector.mockReturnValue(['1']);
    const people = [
      {
        name: 'Luke Skywalker',
        gender: 'male',
        birth_year: '19BBY',
        url: 'https://swapi.dev/api/people/1/',
      },
    ];

    render(<CardList people={people as Person[]} progress={false} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith(removeSelectedPerson('1'));
  });

  it('dispatches clearSelectedPeople when "Unselect All" button is clicked', () => {
    mockUseSelector.mockReturnValue(['1', '2']);

    const people = [
      {
        name: 'Luke Skywalker',
        gender: 'male',
        birth_year: '19BBY',
        url: 'https://swapi.dev/api/people/1/',
      },
      {
        name: 'Leia Organa',
        gender: 'female',
        birth_year: '19BBY',
        url: 'https://swapi.dev/api/people/2/',
      },
    ];

    render(<CardList people={people as Person[]} progress={false} />);

    const unselectAllButton = screen.getByText('Unselect All');
    fireEvent.click(unselectAllButton);

    expect(mockDispatch).toHaveBeenCalledWith(clearSelectedPeople());
  });

  it('handles CSV download when "Download" button is clicked', () => {
    mockUseSelector.mockReturnValue(['1']);
    const people = [
      {
        name: 'Luke Skywalker',
        gender: 'male',
        birth_year: '19BBY',
        url: 'https://swapi.dev/api/people/1/',
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(people[0]),
      })
    ) as jest.Mock;

    render(<CardList people={people as Person[]} progress={false} />);

    const downloadButton = screen.getByText('Download');
    fireEvent.click(downloadButton);

    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/1');
  });
});
