import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSearchParams, useNavigate } from '@remix-run/react';
import fileSaverPkg from 'file-saver';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addSelectedPerson,
  clearSelectedPeople,
} from '../redux/selectedPeople/slice';
import CardList from '../components/CardList/CardList';
import { Person } from '../types';
import { peopleMock, personMock } from '../__mocks__/people';

jest.mock('@remix-run/react', () => ({
  useSearchParams: jest.fn(),
  useNavigate: jest.fn(),
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

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('details=1'),
      jest.fn(),
    ]);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue([]);
  });

  const renderCardList = (people: Person[] = [], progress = false) => {
    return render(<CardList people={people} progress={progress} />);
  };

  it('renders loading state when progress is true', () => {
    renderCardList([], true);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders message when no people are found', () => {
    renderCardList([]);
    expect(screen.getByText('There is no people found')).toBeInTheDocument();
  });

  it('renders list of people', () => {
    renderCardList(peopleMock);
    expect(screen.getByText(`Name: ${peopleMock[0].name}`)).toBeInTheDocument();
    expect(screen.getByText(`Name: ${peopleMock[1].name}`)).toBeInTheDocument();
  });

  it('navigates to person details when button is clicked', () => {
    renderCardList(peopleMock);
    const buttons = screen.getAllByTestId('card-list-item');
    fireEvent.click(buttons[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/person?details=1');
  });

  it('handles selecting and unselecting a person', () => {
    renderCardList(peopleMock);
    const checkboxes = screen.getAllByTestId('card-list-item-checkbox');

    fireEvent.click(checkboxes[0]);
    expect(mockDispatch).toHaveBeenCalledWith(addSelectedPerson('1'));
  });

  it('unselects all people when "Unselect All" is clicked', () => {
    (useAppSelector as jest.Mock).mockReturnValue(['1']);
    renderCardList(peopleMock);

    fireEvent.click(screen.getByText('Unselect All'));
    expect(mockDispatch).toHaveBeenCalledWith(clearSelectedPeople());
  });

  it('downloads selected people as CSV when "Download" is clicked', async () => {
    (useAppSelector as jest.Mock).mockReturnValue(['1']);
    renderCardList(peopleMock);

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(personMock),
    });

    fireEvent.click(screen.getByText('Download'));

    await waitFor(() => {
      expect(fileSaverPkg.saveAs).toHaveBeenCalledWith(
        expect.any(Blob),
        '1_people.csv'
      );
    });
  });

  it('does not render the flyout when no people are selected', () => {
    renderCardList(peopleMock);
    expect(screen.queryByText('Unselect All')).not.toBeInTheDocument();
    expect(screen.queryByText('Download')).not.toBeInTheDocument();
  });

  it('renders the flyout when people are selected', () => {
    (useAppSelector as jest.Mock).mockReturnValue(['1']);
    renderCardList(peopleMock);
    expect(screen.getByText('1 items selected')).toBeInTheDocument();
  });
});
