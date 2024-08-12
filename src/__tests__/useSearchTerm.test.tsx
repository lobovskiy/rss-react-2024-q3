import { render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import useSearchTerm from '../hooks/useSearchTerm';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

describe('useSearchTerm hook', () => {
  const lsKey = 'searchTermKey';

  beforeAll(() => {
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should initialize with the value from localStorage', () => {
    localStorageMock.setItem(lsKey, 'initialSearchTerm');

    const TestComponent = () => {
      const [searchTerm] = useSearchTerm(lsKey);
      return <div>{searchTerm}</div>;
    };

    render(<TestComponent />);
    expect(screen.getByText('initialSearchTerm')).toBeInTheDocument();
  });

  it('should save the search term to localStorage when updated', () => {
    const TestComponent = () => {
      const [searchTerm, setSearchTerm] = useSearchTerm(lsKey);

      useEffect(() => {
        setSearchTerm('newSearchTerm');
      }, [setSearchTerm]);

      return <div>{searchTerm}</div>;
    };

    render(<TestComponent />);
    expect(localStorageMock.getItem(lsKey)).toBe('newSearchTerm');
  });

  it('should clean up event listeners on unmount', () => {
    const removeEventListener = jest.spyOn(window, 'removeEventListener');

    const TestComponent = () => {
      useSearchTerm(lsKey);
      return <div>Test</div>;
    };

    const { unmount } = render(<TestComponent />);
    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      'beforeunload',
      expect.any(Function)
    );
  });
});
