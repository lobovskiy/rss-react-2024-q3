import { useContext } from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { ThemeContext } from './context/ThemeContext';

import MainPage from './pageComponents/MainPage/MainPage';
import ErrorBoundary from './components/ErrorBoundary';

import styles from './App.module.css';

interface Props {
  PersonCard?: React.ElementType;
}

const App: React.FC<Props> = ({ PersonCard }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div
          className={`${styles.wrapper} ${theme}-theme`}
          data-testid="app-wrapper"
        >
          <MainPage PersonCard={PersonCard} />
        </div>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
