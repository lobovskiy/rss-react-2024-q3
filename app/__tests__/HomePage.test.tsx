import { render, screen } from '@testing-library/react';
import { useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';

import HomePage, { loader } from '../routes/_index';
import App from '../App';
import ThemeProvider from '../context/ThemeContext';
import { buildUrl } from '../services/utils';
import { PeopleResponse } from '../services/types';
import { peopleMock } from '../__mocks__/people';

jest.mock('@remix-run/react', () => ({
  useLoaderData: jest.fn(),
}));

jest.mock('../App', () => jest.fn(() => <div>Mocked App Component</div>));

jest.mock('../context/ThemeContext', () => ({
  __esModule: true,
  default: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('../services/utils', () => ({
  buildUrl: jest.fn(),
}));
const mockData: PeopleResponse = {
  count: 82,
  results: peopleMock,
};

describe('HomePage Component', () => {
  beforeEach(() => {
    (useLoaderData as jest.Mock).mockReturnValue({ data: mockData });
  });

  test('renders the ThemeProvider and App components with data', () => {
    render(<HomePage />);

    expect(screen.getByText('Mocked App Component')).toBeInTheDocument();
    expect(ThemeProvider).toHaveBeenCalled();
    expect(App).toHaveBeenCalledWith({ data: mockData }, {});
  });
});

describe('HomePage loader', () => {
  const mockFetch = jest.fn();

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  afterAll(() => {
    global.fetch = undefined as unknown as typeof fetch;
  });

  it('calls buildUrl with correct parameters and returns data', async () => {
    const request = new Request('https://example.com/?search=Luke&page=1');
    const expectedUrl = 'https://swapi.dev/api/people/?search=Luke&page=1';
    (buildUrl as jest.Mock).mockReturnValue(expectedUrl);

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await loader({ request } as LoaderFunctionArgs);

    expect(buildUrl).toHaveBeenCalledWith(
      'https://swapi.dev/api/people',
      '1',
      'Luke'
    );
    expect(mockFetch).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual({ data: mockData });
  });

  it('throws an error if the fetch fails', async () => {
    const request = new Request('https://example.com/?search=Luke&page=1');
    const expectedUrl = 'https://swapi.dev/api/people/?search=Luke&page=1';
    (buildUrl as jest.Mock).mockReturnValue(expectedUrl);

    mockFetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    await expect(loader({ request } as LoaderFunctionArgs)).rejects.toThrow(
      'Failed to fetch'
    );
  });
});
