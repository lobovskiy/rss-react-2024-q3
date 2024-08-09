import { Provider } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { store } from './redux/store';
import { ThemeProvider } from './context/ThemeContext';

import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import Card from './components/Card/Card';

import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<MainPage />}>
                <Route path="person" element={<Card />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
