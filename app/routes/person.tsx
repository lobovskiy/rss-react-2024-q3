import App from '../App';
import Card from '../components/Card/Card';
import { ThemeProvider } from '../context/ThemeContext';

const PersonPage: React.FC = () => {
  return (
    <ThemeProvider>
      <App PersonCard={Card} />
    </ThemeProvider>
  );
};

export default PersonPage;
