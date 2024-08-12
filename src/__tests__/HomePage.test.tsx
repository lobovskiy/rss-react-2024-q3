import HomePage from '../app/page';
import { render, waitFor } from '@testing-library/react';
import App from '../App';
import { buildUrl } from '../services/utils';
import { PeopleResponse } from '../services/types';
import { Person } from '../types';

jest.mock('../services/utils', () => ({
  buildUrl: jest.fn(),
}));

jest.mock('../App', () => jest.fn());

describe('HomePage Component', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = mockFetch;
  });

  test('should render App component with fetched data', async () => {
    const mockData: PeopleResponse = {
      count: 1,
      results: [{ name: 'Luke Skywalker', height: '172' } as Person],
    };

    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const searchParams = { page: '1', search: 'Luke' };

    const mockUrl = 'https://swapi.dev/api/people/?page=1&search=Luke';
    (buildUrl as jest.Mock).mockReturnValue(mockUrl);

    render(await HomePage({ searchParams }));

    await waitFor(() => expect(App).toHaveBeenCalledTimes(1));

    expect(App).toHaveBeenCalledWith({ data: mockData }, {});
  });

  test('should call getData with undefined when no searchParams are provided', async () => {
    const mockData: PeopleResponse = {
      count: 0,
      results: [],
    };

    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const searchParams = {};

    const mockUrl =
      'https://swapi.dev/api/people/?page=undefined&search=undefined';
    (buildUrl as jest.Mock).mockReturnValue(mockUrl);

    render(await HomePage({ searchParams }));

    await waitFor(() => expect(App).toHaveBeenCalledTimes(1));

    expect(App).toHaveBeenCalledWith({ data: mockData }, {});
  });
});
