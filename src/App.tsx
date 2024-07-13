import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/MainPage/MainPage';
import Card from './components/Card/Card';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './App.css';

const App: React.FC = () => (
  <ErrorBoundary>
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="person" element={<Card />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </ErrorBoundary>
);

export default App;
