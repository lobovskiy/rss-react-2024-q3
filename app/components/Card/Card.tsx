import { useNavigate, useSearchParams } from 'react-router-dom';

import { useGetPersonByIdQuery } from '../../services/apiService';

import './Card.css';

const Card: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchParamId = searchParams.get('details');
  const id = searchParamId ? parseInt(searchParamId, 10) : 0;

  const { data: person, isLoading } = useGetPersonByIdQuery(id);

  const navigate = useNavigate();

  if (!isLoading && id === 0) {
    return null;
  }

  const handleClickClose = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('details');
    const queryParams = newSearchParams.toString();

    navigate(`/?${queryParams}`);
  };

  const renderPersonDetails = () => {
    if (isLoading) {
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
