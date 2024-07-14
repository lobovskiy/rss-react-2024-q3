const BASE_URL = 'https://swapi.dev/api/';

export const fetchData = async <T>(resource?: string): Promise<T> => {
  const url = resource ? `${BASE_URL}${resource}` : BASE_URL;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return (await response.json()) as T;
};
