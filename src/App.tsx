import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/MainPage/MainPage';
import Card from './components/Card/Card';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './App.css';
import { ThemeContext } from './context/ThemeContext';

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
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
  );
};

export default App;
