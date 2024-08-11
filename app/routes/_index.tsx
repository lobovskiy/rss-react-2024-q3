import App from '../App';
import { ThemeProvider } from '../context/ThemeContext';

const HomePage: React.FC = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default HomePage;
