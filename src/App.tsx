'use client';

import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';

import { PeopleResponse } from './services/types';

import { store } from './redux/store';
const ThemeProvider = dynamic(() => import('./context/ThemeContext'), {
  ssr: false,
});

import MainPage from './pageComponents/MainPage/MainPage';
import ErrorBoundary from './components/ErrorBoundary';
import { Person } from './types';

interface Props {
  data: PeopleResponse;
  cardData?: Person;
  PersonCard?: React.ElementType<{ cardData: Person }>;
}

const App: React.FC<Props> = ({ data, cardData, PersonCard }) => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <MainPage data={data} cardData={cardData} PersonCard={PersonCard} />
        </ErrorBoundary>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
