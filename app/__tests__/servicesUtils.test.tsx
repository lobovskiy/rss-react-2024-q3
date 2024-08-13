import { buildUrl } from '../services/utils';

describe('buildUrl', () => {
  const baseUrl = 'https://swapi.dev/api/people';

  it('should return the base URL when no page and search parameters are provided', () => {
    const result = buildUrl(baseUrl);
    expect(result).toBe(baseUrl);
  });

  it('should return the URL with the page parameter when only page is provided', () => {
    const result = buildUrl(baseUrl, '2');
    expect(result).toBe(`${baseUrl}?page=2`);
  });

  it('should return the URL with the search parameter when only search is provided', () => {
    const result = buildUrl(baseUrl, undefined, 'Luke');
    expect(result).toBe(`${baseUrl}?search=Luke`);
  });

  it('should return the URL with both page and search parameters when both are provided', () => {
    const result = buildUrl(baseUrl, '2', 'Luke');
    expect(result).toBe(`${baseUrl}?page=2&search=Luke`);
  });

  it('should return the URL with only the page parameter if search is an empty string', () => {
    const result = buildUrl(baseUrl, '2', '');
    expect(result).toBe(`${baseUrl}?page=2`);
  });

  it('should return the URL with only the search parameter if page is an empty string', () => {
    const result = buildUrl(baseUrl, '', 'Luke');
    expect(result).toBe(`${baseUrl}?search=Luke`);
  });

  it('should return the base URL if both page and search are empty strings', () => {
    const result = buildUrl(baseUrl, '', '');
    expect(result).toBe(baseUrl);
  });

  it('should not duplicate the search parameter', () => {
    const result = buildUrl(baseUrl, '2', 'Leia');
    expect(result).toBe(`${baseUrl}?page=2&search=Leia`);
  });
});
