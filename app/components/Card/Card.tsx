import { useNavigation, useSearchParams } from '@remix-run/react';

import { Person } from '../../types';

import './Card.css';

interface Props {
  cardData?: Person;
}

const Card: React.FC<Props> = ({ cardData: person }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamId = searchParams.get('details');
  const navigation = useNavigation();
  const id = searchParamId ? parseInt(searchParamId, 10) : 0;

  const loading = navigation.state === 'loading';

  if (!loading && id === 0) {
    return null;
  }

  const handleClickClose = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('details');

    setSearchParams(newSearchParams);
  };

  const renderPersonDetails = () => {
    if (loading) {
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
      <div className="card__details" data-testid="card-details">
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
