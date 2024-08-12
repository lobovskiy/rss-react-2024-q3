import React from 'react';
import { render, waitFor } from '@testing-library/react';
import PersonPage from '../app/person/page';
import App from '../App';
import Card from '../components/Card/Card';
import { buildUrl } from '../services/utils';
import { PeopleResponse } from '../services/types';
import { Person } from '../types';

jest.mock('../services/utils', () => ({
  buildUrl: jest.fn(),
}));

jest.mock('../App', () => jest.fn(() => <div>Mocked App Component</div>));
jest.mock('../components/Card/Card', () =>
  jest.fn(() => <div>Mocked Card Component</div>)
);

describe('PersonPage Component', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = mockFetch;
  });

  test('should render App component with fetched data and cardData', async () => {
    const mockData: PeopleResponse = {
      count: 1,
      results: [{ name: 'Luke Skywalker', height: '172' } as Person],
    };

    const mockCardData: Person = {
      url: 'https://swapi.dev/api/people/1',
      name: 'Luke Skywalker',
      height: '172',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };

    mockFetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockData),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockCardData),
      });

    const searchParams = { page: '1', search: 'Luke', details: '1' };

    const peopleUrl = 'https://swapi.dev/api/people/?page=1&search=Luke';
    const cardUrl = 'https://swapi.dev/api/people/1';

    (buildUrl as jest.Mock)
      .mockReturnValueOnce(peopleUrl)
      .mockReturnValueOnce(cardUrl);

    render(await PersonPage({ searchParams }));

    await waitFor(() => expect(App).toHaveBeenCalledTimes(1));

    expect(buildUrl).toHaveBeenCalledWith(
      'https://swapi.dev/api/people',
      '1',
      'Luke'
    );
    expect(buildUrl).toHaveBeenCalledWith(
      'https://swapi.dev/api/people',
      '1',
      'Luke'
    );
    expect(fetch).toHaveBeenCalledWith(peopleUrl);
    expect(fetch).toHaveBeenCalledWith(cardUrl);

    expect(App).toHaveBeenCalledWith(
      { data: mockData, cardData: mockCardData, PersonCard: Card },
      {}
    );
  });

  test('should handle undefined searchParams', async () => {
    const mockData: PeopleResponse = {
      count: 0,
      results: [],
    };

    const mockCardData: Person = {
      url: 'unknown',
      name: 'Unknown',
      height: 'unknown',
      hair_color: 'unknown',
      skin_color: 'unknown',
      eye_color: 'unknown',
      birth_year: 'unknown',
      gender: 'unknown',
    };

    mockFetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockData),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockCardData),
      });

    const searchParams = {};

    const peopleUrl =
      'https://swapi.dev/api/people/?page=undefined&search=undefined';
    const cardUrl = 'https://swapi.dev/api/people/undefined';

    (buildUrl as jest.Mock)
      .mockReturnValueOnce(peopleUrl)
      .mockReturnValueOnce(cardUrl);

    render(await PersonPage({ searchParams }));

    await waitFor(() => expect(App).toHaveBeenCalledTimes(1));

    expect(buildUrl).toHaveBeenCalledWith(
      'https://swapi.dev/api/people',
      undefined,
      undefined
    );

    expect(App).toHaveBeenCalledWith(
      { data: mockData, cardData: mockCardData, PersonCard: Card },
      {}
    );
  });
});
