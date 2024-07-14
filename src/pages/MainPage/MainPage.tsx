import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import { fetchData } from '../../services/apiService';
import { ApiResponsePeople } from '../../services/types';
import useSearchQuery from '../../hooks/useSearchQuery';
import Search from '../../components/Search';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';
import { PersonList } from '../../types';
import { LS_KEYS } from '../../constants';

import './MainPage.css';

const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery(LS_KEYS.SearchQuery);
  const [personList, setPersonList] = useState<PersonList>({
    people: [],
    count: 0,
    progress: false,
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialPageString = searchParams.get('page');

  const [page, setPage] = useState<number | undefined>(
    initialPageString ? parseInt(initialPageString, 10) : undefined
  );

  const setPersonListProgress = useCallback((progress: boolean) => {
    setPersonList((list) => ({ ...list, progress }));
  }, []);

  const loadPeople = useCallback(
    (page?: string, searchQuery?: string) => {
      setPersonListProgress(true);

      let path = 'people';

      if (!!page || !!searchQuery) {
        path += '?';

        if (page) {
          path += `page=${page}`;
        }

        if (searchQuery) {
          path += `search=${searchQuery.trim()}`;
        }
      }

      fetchData<ApiResponsePeople>(path)
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
    },
    [setPersonListProgress]
  );

  const handleSearch = (searchQuery: string) => {
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
      !target.closest('.person')
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
    const newPageString = searchParams.get('page');
    const newPage = newPageString ? Number(newPageString) : undefined;

    if (newPage && page !== newPage) {
      setPage(newPage);
    }
  }, [searchParams, page]);

  useEffect(() => {
    loadPeople(page ? String(page) : undefined, searchQuery);
  }, [page, searchQuery, loadPeople]);

  return (
    <div className="main-page">
      <div className="top-section">
        <Search searchQuery={searchQuery} onSearch={handleSearch} />
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
