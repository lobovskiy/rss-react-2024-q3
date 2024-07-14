import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CardList from '../components/CardList/CardList';
import { peopleMock } from '../__mocks__/people';
import { Person } from '../types';

describe('CardList component', () => {
  const renderComponent = (people: Person[]) => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CardList people={people} progress={false} />
      </MemoryRouter>
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
});
