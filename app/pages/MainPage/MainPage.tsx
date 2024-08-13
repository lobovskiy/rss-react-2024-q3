import { useContext, useState } from 'react';
import { useNavigation, useSearchParams } from '@remix-run/react';

import { PeopleResponse } from '../../services/types';
import { Person } from '../../types';

import useSearchTerm from '../../hooks/useSearchTerm';
import { ThemeContext } from '../../context/ThemeContext';

import ThemeSelector from '../../components/ThemeSelector/ThemeSelector';
import Search from '../../components/Search';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';
import { LS_KEYS } from '../../constants';

import './MainPage.css';

interface Props {
  data: PeopleResponse;
  cardData?: Person;
  PersonCard?: React.ElementType<{ cardData?: Person }>;
}

const MainPage: React.FC<Props> = ({ data, cardData, PersonCard }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useSearchTerm(LS_KEYS.SearchQuery);
  const [testError, setTestError] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  const searchParamPage = searchParams.get('page');
  const page = searchParamPage ? parseInt(searchParamPage, 10) : undefined;

  const handleSearch = (searchTerm: string) => {
    const newSearchParams = new URLSearchParams();
    searchTerm
      ? newSearchParams.set('search', String(searchTerm))
      : newSearchParams.delete('search');

    setSearchTerm(searchTerm);
    setSearchParams(newSearchParams);
  };

  const handleSetPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', String(page));

    setSearchParams(newSearchParams);
  };

  const handleClickSection = (event: React.MouseEvent<HTMLDivElement>) => {
    const { target } = event;

    if (
      target instanceof Element &&
      searchParams.get('details') &&
      !target.closest('.card') &&
      !target.closest('.person') &&
      !target.closest('.pagination') &&
      !target.closest('.flyout')
    ) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('details');

      setSearchParams(newSearchParams);
    }
  };

  if (testError) {
    throw new Error('Test error');
  }

  return (
    <div className={`wrapper ${theme}-theme`} data-testid="app-wrapper">
      <div className="main-page">
        <div className="top-section">
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
        <div className="bottom-section" onClick={handleClickSection}>
          <div className="bottom-section__list">
            <div className="bottom-section__list-content">
              <CardList
                people={data?.results ?? []}
                progress={navigation.state === 'loading'}
              />
            </div>
            <div className="bottom-section__list-pagination">
              <Pagination
                page={page ?? 1}
                count={data?.count ?? 1}
                progress={navigation.state === 'loading'}
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
