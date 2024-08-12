import {
  useRouter as useNavigationRouter,
  useSearchParams,
} from 'next/navigation';
import { useRouter } from 'next/router';

import { Person } from '../../types';

import useLoader from '../../hooks/useLoader';

import styles from './Card.module.css';

interface Props {
  cardData?: Person;
}

const Card: React.FC<Props> = ({ cardData: person }) => {
  const navigationRouter = useNavigationRouter();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamId = searchParams.get('details');
  const id = searchParamId ? parseInt(searchParamId, 10) : 0;

  const { loading } = useLoader(router);

  if (!loading && id === 0) {
    return null;
  }

  const handleClickClose = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('details');
    const queryParams = newSearchParams.toString();

    navigationRouter.push(`/?${queryParams}`);
  };

  const renderPersonDetails = () => {
    if (loading) {
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
