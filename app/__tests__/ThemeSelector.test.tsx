import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSelector from '../components/ThemeSelector/ThemeSelector';
import { ThemeContext } from '../context/ThemeContext';

describe('ThemeSelector Component', () => {
  const mockSetTheme = jest.fn();

  const renderComponent = (theme: 'light' | 'dark') => {
    return render(
      <ThemeContext.Provider value={{ theme, setTheme: mockSetTheme }}>
        <ThemeSelector />
      </ThemeContext.Provider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the ThemeSelector component with the correct initial value', () => {
    renderComponent('light');

    const selectElement = screen.getByLabelText(/select theme/i);
    expect((selectElement as HTMLSelectElement).value).toBe('light');
  });

  it('changes theme when a new option is selected', () => {
    renderComponent('dark');

    const selectElement = screen.getByLabelText(/select theme/i);
    fireEvent.change(selectElement, { target: { value: 'light' } });

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('displays the correct options for the themes', () => {
    renderComponent('light');

    const selectElement = screen.getByLabelText(/select theme/i);
    expect(selectElement).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(2);
    expect((options[0] as HTMLOptionElement).value).toBe('light');
    expect((options[1] as HTMLOptionElement).value).toBe('dark');
  });
});
