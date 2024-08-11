import { render } from '@testing-library/react';

import HomePage from '../app/page';
import PersonPage from '../app/person/page';

jest.mock('next/dynamic', () => {
  return jest.fn(() => {
    const ComponentMock = (props: { children: React.ReactNode }) => (
      <div>{props.children}</div>
    );
    ComponentMock.displayName = 'ComponentMock';

    return ComponentMock;
  });
});

jest.mock('../App', () => {
  return function AppMock() {
    return <div>App Component</div>;
  };
});

describe('Home Page', () => {
  it('renders the App component within the ThemeProvider', () => {
    const { getByText } = render(<HomePage />);

    expect(getByText('App Component')).toBeInTheDocument();
  });
});

describe('Person Page', () => {
  it('renders the App component within the ThemeProvider', () => {
    const { getByText } = render(<PersonPage />);

    expect(getByText('App Component')).toBeInTheDocument();
  });
});
