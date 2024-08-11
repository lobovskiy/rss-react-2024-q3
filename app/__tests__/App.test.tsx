import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import App from '../App';
import { ThemeContext } from '../context/ThemeContext';
import MainPage from '../pages/MainPage/MainPage';
import Card from '../components/Card/Card';
import * as React from 'react';

jest.mock('../pages/MainPage/MainPage', () => {
  return jest.fn(() => <div>MainPage Component</div>);
});

jest.mock('../clientOnly', () => ({
  ClientOnly: ({ children }: { children(): React.ReactNode }) => (
    <>{children()}</>
  ),
}));

jest.mock('../components/Card/Card', () => {
  return function CardMock() {
    return <div>Card Component</div>;
  };
});

const mockStore = configureStore([]);
const store = mockStore({});

describe('App Component', () => {
  it('renders with the correct theme from ThemeContext', () => {
    const theme = 'dark';
    const setTheme = jest.fn();

    const { getByTestId } = render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <App />
        </ThemeContext.Provider>
      </Provider>
    );

    const wrapperDiv = getByTestId('app-wrapper');
    expect(wrapperDiv).toHaveClass('wrapper dark-theme');
  });

  it('renders the MainPage component with PersonCard', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light', setTheme: jest.fn() }}>
          <App PersonCard={Card} />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(MainPage).toHaveBeenCalledWith(
      expect.objectContaining({ PersonCard: Card }),
      expect.anything()
    );
  });

  it('renders ClientOnly content', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light', setTheme: jest.fn() }}>
          <App />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(getByText('MainPage Component')).toBeInTheDocument();
  });
});
