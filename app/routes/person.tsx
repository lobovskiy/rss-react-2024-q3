import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { PeopleResponse } from '../services/types';
import { Person } from '../types';

import ThemeProvider from '../context/ThemeContext';

import App from '../App';
import Card from '../components/Card/Card';

import { buildUrl } from '../services/utils';

interface AppProps {
  data: PeopleResponse;
  cardData: Person;
}

const BASE_URL = 'https://swapi.dev/api/people';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const search = searchParams.get('search');
  const page = searchParams.get('page');
  const details = searchParams.get('details');
  const peopleUrl = buildUrl(BASE_URL, page, search);

  const peopleResponse = await fetch(peopleUrl);
  const data = (await peopleResponse.json()) as PeopleResponse;

  const cardResponse = await fetch(`${BASE_URL}/${details}`);
  const cardData = (await cardResponse.json()) as Person;

  return { data, cardData };
}

const PersonPage: React.FC<AppProps> = () => {
  const { data, cardData } = useLoaderData<typeof loader>();

  return (
    <ThemeProvider>
      <App data={data} cardData={cardData} PersonCard={Card} />
    </ThemeProvider>
  );
};

export default PersonPage;
