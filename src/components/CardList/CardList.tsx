import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  addSelectedPerson,
  clearSelectedPeople,
  removeSelectedPerson,
} from '../../redux/selectedPeople/slice';

import { Person } from '../../types.ts';

import './CardList.css';

interface Props {
  people: Person[];
  progress: boolean;
}

const CardList: React.FC<Props> = ({ people, progress }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const selectedPeople = useAppSelector((state) => state.selectedPeople.ids);

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

  if (!people.length) {
    return <div className="people">There is no people found</div>;
  }

  function setSelectedPerson(id: string | undefined, checked: boolean) {
    if (id) {
      checked
        ? dispatch(addSelectedPerson(id))
        : dispatch(removeSelectedPerson(id));
    }
  }

  function handleClickUnselectAll() {
    dispatch(clearSelectedPeople());
  }

  const handleClickDownload = () => {
    // TODO
  };

  return (
    <div className="people">
      {people.map((person, index) => {
        let className = 'person';
        const urlSegments = person.url
          .split('/')
          .filter((segment) => segment !== '');
        const id = urlSegments.pop();
        const details = searchParams.get('details') ?? undefined;

        if (id === details) {
          className += ' person_active';
        }

        return (
          <div key={`${index}${id}`} className={className}>
            <input
              type="checkbox"
              checked={!!id && selectedPeople.includes(id)}
              onChange={(event) => {
                setSelectedPerson(id, event.target.checked);
              }}
            />
            <button
              onClick={() => {
                showPersonCard(id);
              }}
              data-testid="card-list-item"
            >
              <h3>Name: {person.name}</h3>
              <p>Gender: {person.gender}</p>
              <p>Year of birth: {person.birth_year}</p>
            </button>
          </div>
        );
      })}
      {selectedPeople.length > 0 && (
        <div className="flyout">
          <div>{selectedPeople.length} items selected</div>
          <button onClick={handleClickUnselectAll}>Unselect All</button>
          <button onClick={handleClickDownload}>Download</button>
        </div>
      )}
    </div>
  );
};
export default CardList;
