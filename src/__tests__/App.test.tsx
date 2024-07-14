import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import App from '../App';
import * as apiService from '../services/apiService';
import { peopleMock } from '../__mocks__/people';

describe('App', () => {
  const user = userEvent.setup();

  const renderComponent = (path: string) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );
  };

  const fetchDataMock = jest.spyOn(apiService, 'fetchData').mockResolvedValue({
    count: 82,
    results: peopleMock,
  });

  const loadPeople = async () => {
    await waitFor(() => expect(fetchDataMock).toHaveBeenCalled());
  };

  it('opens a detailed card component after click on people list item and calls API', async () => {
    renderComponent('/');

    await loadPeople();

    const cardElements = screen.getAllByTestId('card-list-item');
    const firstCardElement = cardElements[0];

    await user.click(firstCardElement);

    expect(screen.getByText('Chosen person')).toBeInTheDocument();
    expect(fetchDataMock).toHaveBeenLastCalledWith('people/1');
  });

  it('closes a detailed card component after click on close icon', async () => {
    renderComponent('/person?details=1');

    await loadPeople();

    const cardDetailsCloseButton = screen.getByTestId(
      'card-details-close-button'
    );

    await user.click(cardDetailsCloseButton);

    let cardDetailsNotFound = false;

    await screen
      .findByText('Chosen person')
      .catch(() => (cardDetailsNotFound = true));

    expect(cardDetailsNotFound).toBeTruthy();
  });

  it('updates URL query parameter when page changes', async () => {
    const getPageParam = () => {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get('page');
    };

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await loadPeople();

    const pagination = screen.getByTestId('pagination');
    const pageButtons = pagination.getElementsByTagName('button');

    await act(async () => {
      await user.click(pageButtons[2 - 1]);
    });

    const page = getPageParam();

    expect(page).toBe('2');
  });
});
