import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigation, useSearchParams } from '@remix-run/react';
import Card from '../components/Card/Card';
import { Person } from '../types';
import { personMock } from '../__mocks__/people';

jest.mock('@remix-run/react', () => ({
  useNavigation: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Card Component', () => {
  const mockSetSearchParams = jest.fn();

  const mockPerson: Person = personMock;

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('details=1'),
      mockSetSearchParams,
    ]);
    (useNavigation as jest.Mock).mockReturnValue({ state: 'idle' });
  });

  const renderCard = (person?: Person) => {
    return render(<Card cardData={person} />);
  };

  it('renders Card component with person details', () => {
    renderCard(mockPerson);

    expect(screen.getByText(`Name: ${personMock.name}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Gender: ${personMock.gender}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Height: ${personMock.height}`)
    ).toBeInTheDocument();
  });

  it('renders loading state when navigation is in progress', () => {
    (useNavigation as jest.Mock).mockReturnValue({ state: 'loading' });
    renderCard();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('does not render Card component if no details are selected and not loading', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
    const { container } = renderCard();
    expect(container.firstChild).toBeNull();
  });

  it('renders "Chosen person" title', () => {
    renderCard(mockPerson);
    expect(screen.getByText('Chosen person')).toBeInTheDocument();
  });

  it('closes the card and removes details from searchParams on close button click', () => {
    renderCard(mockPerson);
    const closeButton = screen.getByTestId('card-details-close-button');
    fireEvent.click(closeButton);
    expect(mockSetSearchParams).toHaveBeenCalledWith(new URLSearchParams());
  });

  it('does not render person details if person data is not provided', () => {
    renderCard();
    expect(screen.queryByTestId('card-details')).not.toBeInTheDocument();
  });
});
