import App from '../App';
import { ThemeProvider } from '../context/ThemeContext';

const PersonPage: React.FC = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default PersonPage;
