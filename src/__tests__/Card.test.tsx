import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import * as apiService from '../services/apiService';
import { personMock } from '../__mocks__/people';
import Card from '../components/Card/Card';

describe('Card', () => {
  // const user = userEvent.setup();

  const renderComponent = (path: string) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <Card />
      </MemoryRouter>
    );
  };

  const fetchDataMock = jest.spyOn(apiService, 'fetchData').mockResolvedValue({
    personMock,
  });

  const loadPerson = async () => {
    await waitFor(() => expect(fetchDataMock).toHaveBeenCalled());
  };

  it('shows loading indicator while data is not loaded', () => {
    renderComponent('/person?details=1');
    const cardDetailsTitle = screen.getByText('Loading...');

    expect(cardDetailsTitle).toBeInTheDocument();
  });

  it('shows person details correctly when data is loaded', async () => {
    renderComponent('/person?details=1');
    await loadPerson();

    const cardDetailSkinColor = screen.getByText(`Skin color:`);

    expect(cardDetailSkinColor).toBeInTheDocument();
  });
});
