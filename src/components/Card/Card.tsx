import { useRouter, useSearchParams } from 'next/navigation';

import { useGetPersonByIdQuery } from '../../services/apiService';

import styles from './Card.module.css';

const Card: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamId = searchParams.get('details');
  const id = searchParamId ? parseInt(searchParamId, 10) : 0;

  const { data: person, isFetching } = useGetPersonByIdQuery(id);

  if (!isFetching && id === 0) {
    return null;
  }

  const handleClickClose = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('details');
    const queryParams = newSearchParams.toString();

    router.push(`/?${queryParams}`);
  };

  const renderPersonDetails = () => {
    if (isFetching) {
      return <div className={styles.card__details}>Loading...</div>;
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
      <div className={styles.card__details} data-testid="card-details">
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
    <div className={styles.card}>
      <h1>Chosen person</h1>
      {renderPersonDetails()}
      <button
        className={styles.close}
        onClick={handleClickClose}
        data-testid="card-details-close-button"
      ></button>
    </div>
  );
};

export default Card;
