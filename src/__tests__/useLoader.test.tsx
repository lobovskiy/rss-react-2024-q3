import { render, act, screen } from '@testing-library/react';
import { useState, useEffect } from 'react';
import { NextRouter } from 'next/router';
import useLoader from '../hooks/useLoader';

const createMockRouter = () => {
  const events = {
    on: jest.fn(),
    off: jest.fn(),
  };

  return {
    asPath: '/',
    events,
  };
};

describe('useLoader hook', () => {
  it('sets loading to true when routeChangeStart event is emitted', () => {
    const mockRouter = createMockRouter();
    const { events } = mockRouter;

    events.on.mockImplementation(
      (eventName: string, callback: (url: string) => void) => {
        if (eventName === 'routeChangeStart') {
          callback('/new-route');
        }
      }
    );

    const TestComponent = () => {
      const { loading } = useLoader(mockRouter as unknown as NextRouter);
      const [loadingState, setLoadingState] = useState(loading);

      useEffect(() => {
        setLoadingState(loading);
      }, [loading]);

      return <div>{`Loading: ${loadingState}`}</div>;
    };

    render(<TestComponent />);

    expect(events.on).toHaveBeenCalledWith(
      'routeChangeStart',
      expect.any(Function)
    );
    expect(events.off).toHaveBeenCalledWith(
      'routeChangeStart',
      expect.any(Function)
    );

    act(() => {
      events.on.mock.calls.forEach(
        ([eventName, callback]: [string, (string: string) => void]) => {
          if (eventName === 'routeChangeStart') {
            callback('/new-route');
          }
        }
      );
    });

    expect(screen.getByText('Loading: true')).toBeInTheDocument();
  });

  it('sets loading to false when routeChangeComplete or routeChangeError event is emitted', () => {
    const mockRouter = createMockRouter();
    const { events } = mockRouter;

    events.on.mockImplementation(
      (eventName: string, callback: (url: string) => void) => {
        if (eventName === 'routeChangeComplete') {
          callback('/');
        } else if (eventName === 'routeChangeError') {
          callback('/');
        }
      }
    );

    const TestComponent = () => {
      const { loading } = useLoader(mockRouter as unknown as NextRouter);
      const [loadingState, setLoadingState] = useState(loading);

      useEffect(() => {
        setLoadingState(loading);
      }, [loading]);

      return <div>{`Loading: ${loadingState}`}</div>;
    };

    render(<TestComponent />);

    expect(events.on).toHaveBeenCalledWith(
      'routeChangeComplete',
      expect.any(Function)
    );
    expect(events.on).toHaveBeenCalledWith(
      'routeChangeError',
      expect.any(Function)
    );

    act(() => {
      events.on.mock.calls.forEach(
        ([eventName, callback]: [string, (string: string) => void]) => {
          if (eventName === 'routeChangeComplete') {
            callback('/');
          } else if (eventName === 'routeChangeError') {
            callback('/');
          }
        }
      );
    });

    expect(screen.getByText('Loading: false')).toBeInTheDocument();
  });
});
