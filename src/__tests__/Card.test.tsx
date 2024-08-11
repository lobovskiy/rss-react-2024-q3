import { render, screen } from '@testing-library/react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useGetPersonByIdQuery } from '../services/apiService';
import Card from '../components/Card/Card';

import { personMock } from '../__mocks__/people';

jest.mock('../services/apiService', () => ({
  useGetPersonByIdQuery: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Card', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  const renderComponent = () => {
    const { container } = render(<Card />);

    return container;
  };

  it('returns empty element if there is no person id', () => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('0'),
    });

    const container = renderComponent();

    expect(container).toBeEmptyDOMElement();
  });

  it('does not show details if there is no person', () => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('1'),
    });

    renderComponent();

    let cardNotFound = false;

    try {
      screen.getByTestId('card-details');
    } catch (e) {
      cardNotFound = true;
    }

    expect(cardNotFound).toBeTruthy();
  });

  it('shows loading indicator while data is not loaded', () => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: true,
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('1'),
    });

    renderComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows person details correctly when data is loaded', () => {
    (useGetPersonByIdQuery as jest.Mock).mockReturnValue({
      data: personMock,
      isFetching: false,
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('1'),
    });

    renderComponent();

    const cardDetais = screen.getByTestId('card-details');

    expect(cardDetais).toBeInTheDocument();
    expect(cardDetais).toHaveTextContent(`Name: ${personMock.name}`);
    expect(cardDetais).toHaveTextContent(`Gender: ${personMock.gender}`);
    expect(cardDetais).toHaveTextContent(
      `Skin color: ${personMock.skin_color}`
    );
  });
});
