import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

import './ThemeSelector.css';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="theme-selector">
      <label htmlFor="theme">Select theme: </label>
      <select
        id="theme"
        value={theme}
        onChange={(event) => {
          setTheme(event.target.value as 'light' | 'dark');
        }}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default ThemeSelector;
