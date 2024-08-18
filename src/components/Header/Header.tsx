import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/uncontrolled-form">Uncontrolled Form</Link>
          </li>
          <li className="nav-item">
            <Link to="/hook-form">React Hook Form</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
