import { IPerson } from '../types.ts';

interface IApiResult {
  count: number;
  results: IPerson[];
}

interface IApiServiceOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export const fetchResults = async (
  searchTerm: string,
  options: IApiServiceOptions
) => {
  const API_URl = searchTerm
    ? `https://swapi.dev/api/people/?search=${searchTerm}`
    : 'https://swapi.dev/api/people';
  const { onSuccess, onError } = options;

  const response = await fetch(API_URl);

  if (!response.ok) {
    if (onError) {
      onError();
    }

    throw new Error('Network response was not ok');
  }

  const data = (await response.json()) as IApiResult;

  if (onSuccess) {
    onSuccess();
  }

  return data.results;
};
