import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

describe('ErrorBoundary', () => {
  test('should render children without error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  test('should display fallback UI when there is an error', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      console.log('error');
    });

    const ProblematicComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  test('should call console.error when an error is caught', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      console.log('error');
    });

    const ProblematicComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
