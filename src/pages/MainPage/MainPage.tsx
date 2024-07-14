import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import { fetchData } from '../../services/apiService';
import { ApiResponsePeople } from '../../services/types';
import useSearchQuery from '../../hooks/useSearchQuery';
import Search from '../../components/Search';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';
import { getPeopleQuery } from './utils';
import { PersonList } from '../../types';
import { LS_KEYS } from '../../constants';

import './MainPage.css';

const MainPage: React.FC = () => {
  const [personList, setPersonList] = useState<PersonList>({
    people: [],
    count: 0,
    progress: false,
  });

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useSearchQuery(LS_KEYS.SearchQuery);

  const searchParamPage = searchParams.get('page');
  const page = searchParamPage ? parseInt(searchParamPage, 10) : undefined;

  const loadPeople = useCallback((query?: string) => {
    const PEOPLE_URL = `people`;
    const resource = query ? `${PEOPLE_URL}?${query}` : PEOPLE_URL;
    const setPersonListProgress = (progress: boolean) => {
      setPersonList((list) => ({ ...list, progress }));
    };

    setPersonListProgress(true);

    fetchData<ApiResponsePeople>(resource)
      .then((data) => {
        setPersonList({
          people: data.results,
          count: data.count,
          progress: false,
        });
      })
      .catch((error) => {
        setPersonListProgress(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (searchQuery: string) => {
    setSearchParams();
    setSearchQuery(searchQuery);
    navigate('/');
  };

  const handleSetPage = (page: number) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('page', String(page));
    const queryParams = newSearchParams.toString();

    navigate(`/?${queryParams}`);
  };

  const handleClickSection = (event: React.MouseEvent<HTMLDivElement>) => {
    const { target } = event;

    if (
      target instanceof Element &&
      searchParams.get('details') &&
      !target.closest('.card') &&
      !target.closest('.person') &&
      !target.closest('.pagination')
    ) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('details');
      const queryParams = newSearchParams.toString();

      navigate(`/?${queryParams}`);
    }
  };

  function setInvalidState() {
    setPersonList({ ...personList, people: {} as [] });
  }

  useEffect(() => {
    const pageQuery = page ? String(page) : undefined;
    const query = getPeopleQuery(pageQuery, searchQuery);

    loadPeople(query);
  }, [page, searchQuery, loadPeople]);

  return (
    <div className="main-page">
      <div className="top-section">
        <Search searchQuery={searchQuery ?? ''} onSearch={handleSearch} />
        <button
          onClick={() => {
            setInvalidState();
          }}
        >
          Throw Error
        </button>
      </div>
      <div className="bottom-section" onClick={handleClickSection}>
        <div className="bottom-section__list">
          <div className="bottom-section__list-content">
            <CardList
              people={personList.people}
              progress={personList.progress}
            />
          </div>
          <div className="bottom-section__list-pagination">
            <Pagination
              page={page ?? 1}
              count={personList.count}
              progress={personList.progress}
              setPage={handleSetPage}
            />
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
