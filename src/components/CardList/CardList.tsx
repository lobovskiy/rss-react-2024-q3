import { Person } from '../../types.ts';

import { useNavigate, useSearchParams } from 'react-router-dom';
import './CardList.css';

interface Props {
  people: Person[];
  progress: boolean;
}

const CardList: React.FC<Props> = ({ people, progress }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  if (progress) {
    return <div>Loading...</div>;
  }

  const showPersonCard = (personIndex: string | undefined) => {
    if (personIndex) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('details', personIndex);
      const queryParams = newSearchParams.toString();

      navigate(`/person?${queryParams}`);
    }
  };

  return (
    <div className="people">
      {people.map((person, index) => (
        <button
          key={index}
          className="person"
          onClick={() => {
            const urlSegments = person.url
              .split('/')
              .filter((segment) => segment !== '');
            const id = urlSegments.pop();
            showPersonCard(id);
          }}
        >
          <h3>Name: {person.name}</h3>
          <p>Gender: {person.gender}</p>
          <p>Year of birth: {person.birth_year}</p>
        </button>
      ))}
    </div>
  );
};

export default CardList;
