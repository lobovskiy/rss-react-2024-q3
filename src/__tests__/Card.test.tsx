import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Card from '../components/Card/Card';

import * as apiService from '../services/apiService';

import { personMock } from '../__mocks__/people';

describe('Card', () => {
  const renderComponent = (path: string) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <Card />
      </MemoryRouter>
    );
  };

  const useGetPersonByIdQueryMock = jest.spyOn(
    apiService,
    'useGetPersonByIdQuery'
  ) as jest.Mock;

  it('shows loading indicator while data is not loaded', () => {
    useGetPersonByIdQueryMock.mockReturnValue({
      data: null,
      isLoading: true,
    });

    renderComponent('/person?details=1');

    const cardDetailsTitle = screen.getByText('Loading...');

    expect(cardDetailsTitle).toBeInTheDocument();
  });

  it('shows person details correctly when data is loaded', () => {
    useGetPersonByIdQueryMock.mockReturnValue({
      data: personMock,
      isLoading: false,
    });

    renderComponent('/person?details=1');

    const cardDetailSkinColor = screen.getByText(
      `Skin color: ${personMock.skin_color}`
    );

    expect(cardDetailSkinColor).toBeInTheDocument();
  });
});
