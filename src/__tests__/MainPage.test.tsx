import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import MainPage from '../pages/MainPage/MainPage';
import Card from '../components/Card/Card';

import { store } from '../redux/store';
import * as apiService from '../services/apiService';

import { peopleMock } from '../__mocks__/people';

describe('Main page', () => {
  const user = userEvent.setup();

  const renderComponent = (path: string) => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route path="person" element={<Card />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  const useGetPeopleQueryMock = jest.spyOn(
    apiService,
    'useGetPeopleQuery'
  ) as jest.Mock;
  const useGetPersonByIdQueryMock = jest.spyOn(
    apiService,
    'useGetPersonByIdQuery'
  ) as jest.Mock;

  it('opens a detailed card component after click on people list item and calls API', async () => {
    useGetPeopleQueryMock.mockReturnValue({
      data: { count: 82, results: peopleMock },
      isLoading: false,
    });

    renderComponent('/');

    const cardElements = screen.getAllByTestId('card-list-item');
    const firstCardElement = cardElements[0];

    await user.click(firstCardElement);

    expect(screen.getByText('Chosen person')).toBeInTheDocument();
    expect(useGetPersonByIdQueryMock).toHaveBeenLastCalledWith(1);
  });

  it('closes a detailed card component after click on close icon', async () => {
    renderComponent('/person?details=1');

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
        <MainPage />
      </BrowserRouter>
    );

    const pagination = screen.getByTestId('pagination');
    const pageButtons = pagination.getElementsByTagName('button');

    await user.click(pageButtons[2 - 1]);

    const page = getPageParam();

    expect(page).toBe('2');
  });
});
