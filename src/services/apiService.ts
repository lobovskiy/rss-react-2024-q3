import { IPerson } from '../types.ts';

interface IApiResult {
  count: number;
  results: IPerson[];
}

export const fetchResults = async (searchTerm: string) => {
  const API_URl = searchTerm
    ? `https://swapi.dev/api/people/?search=${searchTerm}`
    : 'https://swapi.dev/api/people';

  const response = await fetch(API_URl);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = (await response.json()) as IApiResult;

  return data.results;
};
