'use client';

import dynamic from 'next/dynamic';

import App from '../App';
import Card from '../components/Card/Card';

const ThemeProvider = dynamic(() => import('../context/ThemeContext'), {
  ssr: false,
});

const Person: React.FC = () => {
  return (
    <ThemeProvider>
      <App PersonCard={Card} />
    </ThemeProvider>
  );
};

export default Person;
