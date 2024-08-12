import { render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import App from '../App';
import Card from '../components/Card/Card';
import { peopleMock, personMock } from '../__mocks__/people';
import { Person } from '../types';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../hooks/useSearchTerm', () => jest.fn(() => ['test', jest.fn()]));
jest.mock('../hooks/useLoader', () => jest.fn(() => ({ loading: false })));

jest.mock('../components/Card/Card', () => {
  return function CardMock() {
    return <div>Card Component</div>;
  };
});

describe('App', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });
  });

  const renderComponent = async (
    PersonCard?: React.ElementType<{ cardData?: Person }>
  ) => {
    await waitFor(() => {
      render(
        <App
          data={{ count: 82, results: peopleMock }}
          cardData={personMock}
          PersonCard={PersonCard}
        />
      );
    });
  };

  test('should render the main page by default', async () => {
    await renderComponent();

    expect(screen.getByText('Select theme:')).toBeInTheDocument();
  });

  test('should render the Card component with person card component', async () => {
    await renderComponent(Card);

    expect(screen.getByText('Card Component')).toBeInTheDocument();
  });
});
