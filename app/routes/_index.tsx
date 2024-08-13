import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import App from '../App';

import { PeopleResponse } from '../services/types';

import ThemeProvider from '../context/ThemeContext';

import { buildUrl } from '../services/utils';

const BASE_URL = 'https://swapi.dev/api/people';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const search = searchParams.get('search');
  const page = searchParams.get('page');
  const fetchUrl = buildUrl(BASE_URL, page, search);

  const response = await fetch(fetchUrl);
  const data = (await response.json()) as PeopleResponse;

  return { data };
}

const HomePage: React.FC = () => {
  const { data } = useLoaderData<typeof loader>();

  return (
    <ThemeProvider>
      <App data={data} />
    </ThemeProvider>
  );
};

export default HomePage;
