import { render } from '@testing-library/react';

import type { AppProps } from 'next/app';

import SwApp from '../pages/_app';

const ComponentMock = ({ text }: { text: string }) => <div>{text}</div>;

describe('SwApp Component', () => {
  it('renders the component passed to it', () => {
    const props = {
      Component: ComponentMock,
      pageProps: { text: 'Hello, World!' },
    } as AppProps;

    const { getByText } = render(<SwApp {...props} />);

    expect(getByText('Hello, World!')).toBeInTheDocument();
  });

  it('passes pageProps correctly to the component', () => {
    const props = {
      Component: ComponentMock,
      pageProps: { text: 'Next.js Testing' },
    } as AppProps;

    const { getByText } = render(<SwApp {...props} />);

    expect(getByText('Next.js Testing')).toBeInTheDocument();
  });
});
