import type { AppProps } from 'next/app';

import '../index.css';

const SwApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default SwApp;
