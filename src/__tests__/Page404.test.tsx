import { render, screen } from '@testing-library/react';
import Page404 from '../app/404';

describe('Page404', () => {
  test('should render the not found message', () => {
    render(<Page404 />);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Page not found'
    );
    expect(screen.getByText('Page not found').closest('div')).toHaveClass(
      'not-found-page'
    );
  });
});
