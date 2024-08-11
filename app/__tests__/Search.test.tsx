import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';

describe('Search component', () => {
  test('should render with initial searchTerm', () => {
    render(<Search searchTerm="initial" onSearch={jest.fn()} />);

    const input = screen.getByTestId('search-input');
    expect((input as HTMLInputElement).value).toBe('initial');
  });

  test('should update input value when searchTerm prop changes', () => {
    const { rerender } = render(
      <Search searchTerm="initial" onSearch={jest.fn()} />
    );

    rerender(<Search searchTerm="updated" onSearch={jest.fn()} />);
    const input = screen.getByTestId('search-input');
    expect((input as HTMLInputElement).value).toBe('updated');
  });

  test('should update input value on change', () => {
    render(<Search searchTerm="initial" onSearch={jest.fn()} />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect((input as HTMLInputElement).value).toBe('new value');
  });

  test('should call onSearch with the correct value on form submit', () => {
    const onSearchMock = jest.fn();
    render(<Search searchTerm="initial" onSearch={onSearchMock} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'search query' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('search query');
  });

  test('should prevent form submission default behavior', () => {
    const onSearchMock = jest.fn();
    render(<Search searchTerm="initial" onSearch={onSearchMock} />);

    const form = screen.getByTestId('search-form');

    fireEvent.submit(form);

    expect(onSearchMock).toHaveBeenCalled();
  });
});
