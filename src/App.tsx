import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/MainPage';
import './App.css';

const App: React.FC = () => (
  <ErrorBoundary>
    <MainPage />
  </ErrorBoundary>
);

export default App;
