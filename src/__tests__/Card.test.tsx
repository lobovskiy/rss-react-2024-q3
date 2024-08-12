import { render, screen } from '@testing-library/react';

import { useRouter, useSearchParams } from 'next/navigation';

import useLoader from '../hooks/useLoader';
import Card from '../components/Card/Card';

import { Person } from '../types';

import { personMock } from '../__mocks__/people';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../hooks/useSearchTerm', () => jest.fn(() => ['test', jest.fn()]));
jest.mock('../hooks/useLoader', () => jest.fn(() => ({ loading: false })));

describe('Card', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  const renderComponent = (cardData?: Person) => {
    const { container } = render(<Card cardData={cardData} />);

    return container;
  };

  it('does not show details if there is no person', () => {
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

  it('shows person details correctly when data is loaded', () => {
    (useLoader as jest.Mock).mockReturnValue({ loading: false });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('1'),
    });

    renderComponent(personMock);

    const cardDetails = screen.getByTestId('card-details');

    expect(cardDetails).toBeInTheDocument();
    expect(cardDetails).toHaveTextContent(`Name: ${personMock.name}`);
    expect(cardDetails).toHaveTextContent(`Gender: ${personMock.gender}`);
    expect(cardDetails).toHaveTextContent(
      `Skin color: ${personMock.skin_color}`
    );
  });
});
