import { render, screen } from '@testing-library/react';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

describe('NotFoundPage', () => {
  test('should render the not found message', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Page not found'
    );
    expect(screen.getByText('Page not found').closest('div')).toHaveClass(
      'not-found-page'
    );
  });
});
