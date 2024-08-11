import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../redux/store';
import CardList from '../components/CardList/CardList';
import { peopleMock } from '../__mocks__/people';
import { Person } from '../types';

describe('CardList component', () => {
  const renderComponent = (people: Person[]) => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <CardList people={people} progress={false} />
        </MemoryRouter>
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
});
