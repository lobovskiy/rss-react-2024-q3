import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';

import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import Card from './components/Card/Card';

import './App.css';
import './index.css';

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <div className={`wrapper ${theme}-theme`} data-testid="app-wrapper">
            <Routes>
              <Route path="/" element={<MainPage />}>
                <Route path="person" element={<Card />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
