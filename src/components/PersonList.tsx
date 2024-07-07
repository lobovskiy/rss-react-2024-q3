import { Component } from 'react';

import { IPerson } from '../types.ts';

interface PersonListProps {
  people: IPerson[];
  progress: boolean;
}

class PersonList extends Component<PersonListProps> {
  render() {
    const { people, progress } = this.props;

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
  }
}

export default PersonList;
