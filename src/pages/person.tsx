import { GetServerSideProps } from 'next';

import App from '../App';

import { PeopleResponse } from '../services/types';
import { buildUrl } from '../services/utils';
import Card from '../components/Card/Card';
import { Person } from '../types';

interface AppProps {
  data: PeopleResponse;
  cardData: Person;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const BASE_URL = 'https://swapi.dev/api/people';

  const { page, search, details } = context.query;
  const peopleUrl = buildUrl(BASE_URL, page as string, search as string);

  const peopleResponse = await fetch(peopleUrl);
  const data = (await peopleResponse.json()) as PeopleResponse;

  const cardResponse = await fetch(`${BASE_URL}/${details as string}`);
  const cardData = (await cardResponse.json()) as Person;

  return {
    props: {
      data,
      cardData,
    },
  };
};

const HomePage: React.FC<AppProps> = ({ data, cardData }) => {
  return <App data={data} cardData={cardData} PersonCard={Card} />;
};

export default HomePage;
