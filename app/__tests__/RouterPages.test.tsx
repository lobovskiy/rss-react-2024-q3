import { render } from '@testing-library/react';

import HomePage from '../routes/_index';
import PersonPage from '../routes/person';

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
