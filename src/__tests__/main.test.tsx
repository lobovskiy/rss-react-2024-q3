import { createRoot } from 'react-dom/client';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}));

describe('Root App Rendering', () => {
  test('renders the application without crashing', () => {
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);

    require('../main.tsx');

    expect(createRoot).toHaveBeenCalledWith(rootDiv);
  });
});
