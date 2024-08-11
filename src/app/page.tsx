'use client';

import dynamic from 'next/dynamic';

import App from '../App';

const ThemeProvider = dynamic(() => import('../context/ThemeContext'), {
  ssr: false,
});

const HomePage: React.FC = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default HomePage;
