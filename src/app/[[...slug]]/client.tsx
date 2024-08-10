'use client';

import dynamic from 'next/dynamic';

const ThemeProvider = dynamic(() => import('../../context/ThemeContext'));
const App = dynamic(() => import('../../App'), { ssr: false });

export function ClientOnly() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
