import { IPerson } from '../types.ts';

interface Props {
  people: IPerson[];
  progress: boolean;
}

const PersonList: React.FC<Props> = ({ people, progress }) => {
  if (progress) {
    return <div>Loading...</div>;
  }

  return (
    <div className="people">
      {people.map((result, index) => (
        <div key={index} className="result-item">
          <h3>Name: {result.name}</h3>
          <p>Gender: {result.gender}</p>
          <p>Year of birth: {result.birth_year}</p>
        </div>
      ))}
    </div>
  );
};

export default PersonList;
