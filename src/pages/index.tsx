import { GetServerSideProps } from 'next';

import App from '../App';

import { PeopleResponse } from '../services/types';
import { buildUrl } from '../services/utils';

interface AppProps {
  data: PeopleResponse;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const BASE_URL = 'https://swapi.dev/api/people';

  const { page, search } = context.query;
  const url = buildUrl(BASE_URL, page as string, search as string);

  const response = await fetch(url);
  const data = (await response.json()) as PeopleResponse;

  return {
    props: {
      data,
    },
  };
};

const HomePage: React.FC<AppProps> = ({ data }) => {
  return <App data={data} />;
};

export default HomePage;
