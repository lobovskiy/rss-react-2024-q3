import { useContext, useState } from 'react';
import {
  useRouter as useNavigationRouter,
  useSearchParams,
} from 'next/navigation';
import { useRouter } from 'next/router';

import { PeopleResponse } from '../../services/types';

import useSearchTerm from '../../hooks/useSearchTerm';
import { ThemeContext } from '../../context/ThemeContext';

import ThemeSelector from '../../components/ThemeSelector/ThemeSelector';
import Search from '../../components/Search';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';
import { LS_KEYS } from '../../constants';

import styles from './MainPage.module.css';
import cardListStyles from '../../components/CardList/CardList.module.css';
import cardStyles from '../../components/Card/Card.module.css';
import paginationStyles from '../../components/Pagination/Pagination.module.css';
import { Person } from '../../types';
import useLoader from '../../hooks/useLoader';

interface Props {
  data: PeopleResponse;
  cardData?: Person;
  PersonCard?: React.ElementType<{ cardData: Person }>;
}

const MainPage: React.FC<Props> = ({ data, cardData, PersonCard }) => {
  const navigationRouter = useNavigationRouter();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useSearchTerm(LS_KEYS.SearchQuery);
  const [testError, setTestError] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  const searchParamPage = searchParams.get('page');
  const page = searchParamPage ? parseInt(searchParamPage, 10) : undefined;

  const { loading } = useLoader(router);

  const handleSearch = (searchTerm: string) => {
    const newSearchParams = new URLSearchParams();
    searchTerm
      ? newSearchParams.set('search', String(searchTerm))
      : newSearchParams.delete('search');
    const queryParams = newSearchParams.toString();

    setSearchTerm(searchTerm);
    navigationRouter.push(`/?${queryParams}`);
  };

  const handleSetPage = (page: number) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('page', String(page));
    const queryParams = newSearchParams.toString();

    navigationRouter.push(`/?${queryParams}`);
  };

  const handleClickSection = (event: React.MouseEvent<HTMLDivElement>) => {
    const { target } = event;

    if (
      target instanceof Element &&
      searchParams.get('details') &&
      !target.closest(`.${cardStyles.card}`) &&
      !target.closest(`.${cardListStyles.person}`) &&
      !target.closest(`.${paginationStyles.pagination}`) &&
      !target.closest(`.${cardListStyles.flyout}`)
    ) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('details');
      const queryParams = newSearchParams.toString();

      navigationRouter.push(`/?${queryParams}`);
    }
  };

  if (testError) {
    throw new Error('Test error');
  }

  return (
    <div
      className={`${styles.wrapper} ${theme}-theme`}
      data-testid="app-wrapper"
    >
      <div className={styles['main-page']}>
        <div className={styles['top-section']}>
          <Search searchTerm={searchTerm ?? ''} onSearch={handleSearch} />
          <button
            onClick={() => {
              setTestError(true);
            }}
          >
            Throw Error
          </button>
          <ThemeSelector />
        </div>
        <div className={styles['bottom-section']} onClick={handleClickSection}>
          <div className={styles['bottom-section__list']}>
            <div className={styles['bottom-section__list-content']}>
              <CardList people={data?.results ?? []} progress={loading} />
            </div>
            <div className={styles['bottom-section__list-pagination']}>
              <Pagination
                page={page ?? 1}
                count={data?.count ?? 1}
                progress={loading}
                setPage={handleSetPage}
              />
            </div>
          </div>

          {PersonCard && cardData && <PersonCard cardData={cardData} />}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
