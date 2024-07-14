import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { fetchData } from '../../services/apiService';
import { Person } from '../../types';

import './Card.css';

const Card: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details');

  const [person, setPerson] = useState<Person | null>(null);
  const [progress, setProgress] = useState<boolean>(false);

  const navigate = useNavigate();

  const loadPerson = useCallback((id: string) => {
    setProgress(true);

    fetchData<Person>(`people/${id}`)
      .then((data) => {
        setPerson(data);
        setProgress(false);
      })
      .catch((error) => {
        setProgress(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (id !== null) {
      loadPerson(id);
    }
  }, [id, loadPerson]);

  if (!progress && id === null) {
    return null;
  }

  const handleClickClose = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('details');
    const queryParams = newSearchParams.toString();

    navigate(`/?${queryParams}`);
  };

  const renderPersonDetails = () => {
    if (progress) {
      return <div className="card__details">Loading...</div>;
    }

    if (!person) {
      return null;
    }

    const {
      name,
      gender,
      height,
      skin_color,
      birth_year,
      eye_color,
      hair_color,
    } = person;

    return (
      <div className="card__details">
        <div>Name: {name}</div>
        <div>Gender: {gender}</div>
        <div>Height: {height}</div>
        <div>Skin color: {skin_color}</div>
        <div>Birth year: {birth_year}</div>
        <div>Eye color: {eye_color}</div>
        <div>Hair color: {hair_color}</div>
      </div>
    );
  };

  return (
    <div className="card">
      <h1>Chosen person</h1>
      {renderPersonDetails()}
      <button
        className="close"
        onClick={handleClickClose}
        data-testid="card-details-close-button"
      ></button>
    </div>
  );
};

export default Card;
