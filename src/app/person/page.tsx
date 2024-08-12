export const dynamic = 'force-dynamic';

import App from '../../App';

import { PeopleResponse } from '../../services/types';
import { buildUrl } from '../../services/utils';
import Card from '../../components/Card/Card';
import { Person } from '../../types';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

const getData = async (
  page: string | undefined,
  search: string | undefined,
  details: string | undefined
) => {
  const BASE_URL = 'https://swapi.dev/api/people';
  const peopleUrl = buildUrl(BASE_URL, page, search);

  const peopleResponse = await fetch(peopleUrl);
  const data = (await peopleResponse.json()) as PeopleResponse;

  const cardResponse = await fetch(`${BASE_URL}/${details}`);
  const cardData = (await cardResponse.json()) as Person;

  return {
    data,
    cardData,
  };
};

const PersonPage: React.FC<PageProps> = async ({ searchParams }) => {
  const page = searchParams.page;
  const search = searchParams.search;
  const details = searchParams.details;

  const { data, cardData } = await getData(page, search, details);

  return <App data={data} cardData={cardData} PersonCard={Card} />;
};

export default PersonPage;
