const BASE_URL = 'https://swapi.dev/api/';

export const fetchData = async <T>(path?: string): Promise<T> => {
  const url = `${BASE_URL}${path}`;
  // ? `https://swapi.dev/api/people/?search=${searchTerm}`

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return (await response.json()) as T;
};
