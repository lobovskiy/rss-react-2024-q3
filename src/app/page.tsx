import App from '../App';

import { PeopleResponse } from '../services/types';
import { buildUrl } from '../services/utils';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

const getData = async (
  page: string | undefined,
  search: string | undefined
) => {
  const BASE_URL = 'https://swapi.dev/api/people';

  const url = buildUrl(BASE_URL, page, search);

  const response = await fetch(url);
  return (await response.json()) as PeopleResponse;
};

const HomePage: React.FC<PageProps> = async ({ searchParams }) => {
  const page = searchParams.page;
  const search = searchParams.search;

  const data = await getData(page, search);

  return <App data={data} />;
};

export default HomePage;
