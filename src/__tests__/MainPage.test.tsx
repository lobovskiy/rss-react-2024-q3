import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useRouter, useSearchParams } from 'next/navigation';
import { Provider } from 'react-redux';

import MainPage from '../pageComponents/MainPage/MainPage';
import Card from '../components/Card/Card';

import * as apiService from '../services/apiService';
import { store } from '../redux/store';

import { peopleMock } from '../__mocks__/people';
import { afterAll } from '@jest/globals';

jest.mock('../services/apiService', () => ({
  __esModule: true,
  ...jest.requireActual<typeof apiService>('../services/apiService'),
}));
jest.mock('next/navigation', () => ({
  ...jest.requireActual<typeof import('next/navigation')>('next/navigation'),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Main page', () => {
  const user = userEvent.setup();
  const routerPushMock = jest.fn();
  const useGetPeopleQueryMock = jest.spyOn(
    apiService,
    'useGetPeopleQuery'
  ) as jest.Mock;
  const useGetPeopleByIdQueryMock = jest.spyOn(
    apiService,
    'useGetPersonByIdQuery'
  ) as jest.Mock;
  useGetPeopleByIdQueryMock.mockReturnValue({});

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (PersonCard?: React.ElementType) => {
    render(
      <Provider store={store}>
        <MainPage PersonCard={PersonCard} />
      </Provider>
    );
  };

  it('goes to person page on click on people list item ', async () => {
    useGetPeopleQueryMock.mockReturnValue({
      data: { count: 82, results: peopleMock },
      isLoading: false,
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(1),
    });

    renderComponent();

    const cardElements = screen.getAllByTestId('card-list-item');
    const firstCardElement = cardElements[0];

    await user.click(firstCardElement);

    expect(routerPushMock).toHaveBeenLastCalledWith(
      expect.stringMatching(/\/person(\?)?/)
    );
  });

  it('closes a detailed card component after click on close icon', async () => {
    useGetPeopleQueryMock.mockReturnValue({
      data: { count: 82, results: peopleMock },
      isLoading: false,
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(1),
    });

    renderComponent(Card);

    const cardDetailsCloseButton = screen.getByTestId(
      'card-details-close-button'
    );

    await user.click(cardDetailsCloseButton);
    expect(routerPushMock).toHaveBeenLastCalledWith(
      expect.stringMatching(/\/(\?)?/)
    );
  });

  it('updates URL query parameter when page changes', async () => {
    useGetPeopleQueryMock.mockReturnValue({
      data: { count: 82, results: peopleMock },
      isLoading: false,
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(1),
    });

    renderComponent();

    const pagination = screen.getByTestId('pagination');
    const pageButtons = pagination.getElementsByTagName('button');

    await user.click(pageButtons[2 - 1]);

    expect(routerPushMock).toHaveBeenLastCalledWith('/?page=2');
  });
});
