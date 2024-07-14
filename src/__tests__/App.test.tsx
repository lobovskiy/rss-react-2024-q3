import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import App from '../App';
import * as apiService from '../services/apiService';
import { peopleMock } from '../__mocks__/people';

describe('App', () => {
  const user = userEvent.setup();

  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
  };

  const fetchDataMock = jest.spyOn(apiService, 'fetchData').mockResolvedValue({
    count: 82,
    results: peopleMock,
  });

  it('opens a detailed card component after click on people list item', async () => {
    renderComponent();

    await waitFor(() => expect(fetchDataMock).toHaveBeenCalledTimes(1));

    const cardElements = screen.getAllByTestId('card-list-item');
    const firstCardElement = cardElements[0];

    await user.click(firstCardElement);

    expect(screen.getByText('Chosen person')).toBeInTheDocument();
    expect(fetchDataMock).toHaveBeenLastCalledWith('people/1');
  });
});
