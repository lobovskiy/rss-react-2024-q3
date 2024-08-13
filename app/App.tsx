import { useContext } from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { ThemeContext } from './context/ThemeContext';

import { PeopleResponse } from './services/types';
import { Person } from './types';

import { ClientOnly } from './clientOnly';
import MainPage from './pages/MainPage/MainPage';
import ErrorBoundary from './components/ErrorBoundary';

import './index.css';
import './App.css';

interface Props {
  data: PeopleResponse;
  cardData?: Person;
  PersonCard?: React.ElementType<{ cardData?: Person }>;
}

const App: React.FC<Props> = ({ data, cardData, PersonCard }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div className={`wrapper ${theme}-theme`} data-testid="app-wrapper">
          <ClientOnly fallback={<div />}>
            {() => (
              <MainPage
                data={data}
                cardData={cardData}
                PersonCard={PersonCard}
              />
            )}
          </ClientOnly>
        </div>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
