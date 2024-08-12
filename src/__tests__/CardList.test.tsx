import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';

import { store } from '../redux/store';
import CardList from '../components/CardList/CardList';
import { Person } from '../types';

import { peopleMock } from '../__mocks__/people';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('CardList component', () => {
  const user = userEvent.setup();
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });
  });

  const renderComponent = (people: Person[]) => {
    render(
      <Provider store={store}>
        <CardList people={people} progress={false} />
      </Provider>
    );
  };

  it('renders correct number of cards', () => {
    renderComponent(peopleMock);

    const cardElements = screen.getAllByTestId('card-list-item');

    expect(cardElements).toHaveLength(peopleMock.length);
  });

  it('renders correct message if there is no cards', () => {
    renderComponent([]);

    expect(screen.getByText('There is no people found')).toBeInTheDocument();
  });

  it('renders the relevant card data', () => {
    renderComponent(peopleMock);

    const cardElements = screen.getAllByTestId('card-list-item');
    const firstCardElement = cardElements[0];

    expect(firstCardElement.textContent).toContain(peopleMock[0].name);
  });

  it('should show flyout if cards are selected', async () => {
    renderComponent(peopleMock);

    const cardElement = screen.getAllByTestId('card-list-item-checkbox');

    await user.click(cardElement[0]);

    const flyout = screen.getByText('1 items selected');

    expect(flyout).toBeInTheDocument();
  });
});
