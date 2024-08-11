import { useRouter, useSearchParams } from 'next/navigation';
import { saveAs } from 'file-saver';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  addSelectedPerson,
  clearSelectedPeople,
  removeSelectedPerson,
} from '../../redux/selectedPeople/slice';

import { Person } from '../../types.ts';

import styles from './CardList.module.css';

interface Props {
  people: Person[];
  progress: boolean;
}

const CardList: React.FC<Props> = ({ people, progress }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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

      router.push(`/person?${queryParams}`);
    }
  };

  if (!people.length) {
    return <div className={styles.people}>There is no people found</div>;
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

  async function handleClickDownload() {
    if (!selectedPeople) {
      return;
    }

    const selectedPeopleData: Person[] = [];

    await Promise.allSettled(
      selectedPeople.map(async (id) => {
        await fetch(`https://swapi.dev/api/people/${id}`)
          .then((response) => response.json() as Promise<Person>)
          .then((person) => {
            selectedPeopleData.push(person);
          });
      })
    );

    const csvData = [
      'name,gender,birth year,url,eye color,hair color,height,skin color',
      ...selectedPeopleData.map(
        (person) =>
          `${person.name},${person.gender},${person.birth_year},${person.url},${person.eye_color},${person.hair_color},${person.height},${person.skin_color}`
      ),
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    saveAs(blob, `${selectedPeopleData.length}_people.csv`);
  }

  return (
    <div className={styles.people}>
      {people.map((person, index) => {
        let className = styles.person;
        const urlSegments = person.url
          .split('/')
          .filter((segment) => segment !== '');
        const id = urlSegments.pop();
        const details = searchParams.get('details') ?? undefined;

        if (id === details) {
          className += ` ${styles.person_active}`;
        }

        return (
          <div key={`${index}${id}`} className={className}>
            <input
              type="checkbox"
              checked={!!id && selectedPeople.includes(id)}
              onChange={(event) => {
                setSelectedPerson(id, event.target.checked);
              }}
              data-testid="card-list-item-checkbox"
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
        <div className={styles.flyout}>
          <div>{selectedPeople.length} items selected</div>
          <button onClick={handleClickUnselectAll}>Unselect All</button>
          <button
            onClick={() => {
              void (async () => {
                await handleClickDownload();
              })();
            }}
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
};
export default CardList;
