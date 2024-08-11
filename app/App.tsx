import { useContext } from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { ThemeContext } from './context/ThemeContext';

import { ClientOnly } from './clientOnly';
import MainPage from './pages/MainPage/MainPage';
import ErrorBoundary from './components/ErrorBoundary';

import './App.css';
import './index.css';

interface Props {
  PersonCard?: React.ElementType;
}

const App: React.FC<Props> = ({ PersonCard }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div className={`wrapper ${theme}-theme`} data-testid="app-wrapper">
          <ClientOnly fallback={<div />}>
            {() => <MainPage PersonCard={PersonCard} />}
          </ClientOnly>
        </div>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
