import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useGetPeopleQuery } from '../../services/apiService';
import useSearchTerm from '../../hooks/useSearchTerm';

import ThemeSelector from '../../components/ThemeSelector/ThemeSelector';
import Search from '../../components/Search';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';
import { LS_KEYS } from '../../constants';

import styles from './MainPage.module.css';
import cardListStyles from '../../components/CardList/CardList.module.css';
import cardStyles from '../../components/Card/Card.module.css';
import paginationStyles from '../../components/Pagination/Pagination.module.css';

interface Props {
  PersonCard?: React.ElementType;
}

const MainPage: React.FC<Props> = ({ PersonCard }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useSearchTerm(LS_KEYS.SearchQuery);
  const [testError, setTestError] = useState<boolean>(false);

  const searchParamPage = searchParams.get('page');
  const page = searchParamPage ? parseInt(searchParamPage, 10) : undefined;

  const { data, isFetching } = useGetPeopleQuery({ page, search: searchTerm });

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    router.push('/');
  };

  const handleSetPage = (page: number) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('page', String(page));
    const queryParams = newSearchParams.toString();

    router.push(`/?${queryParams}`);
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

      router.push(`/?${queryParams}`);
    }
  };

  if (testError) {
    throw new Error('Test error');
  }

  return (
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
            <CardList people={data?.results ?? []} progress={isFetching} />
          </div>
          <div className={styles['bottom-section__list-pagination']}>
            <Pagination
              page={page ?? 1}
              count={data?.count ?? 1}
              progress={isFetching}
              setPage={handleSetPage}
            />
          </div>
        </div>

        {PersonCard && <PersonCard />}
      </div>
    </div>
  );
};

export default MainPage;
