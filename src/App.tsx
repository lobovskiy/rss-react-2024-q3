import { useContext } from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { store } from './redux/store';
import { ThemeContext } from './context/ThemeContext';

import MainPage from './pageComponents/MainPage/MainPage';
import NotFoundPage from './pageComponents/NotFoundPage/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import Card from './components/Card/Card';

import styles from './App.module.css';

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <div
            className={`${styles.wrapper} ${theme}-theme`}
            data-testid="app-wrapper"
          >
            <Routes>
              <Route path="/" element={<MainPage />}>
                <Route path="person" element={<Card />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
