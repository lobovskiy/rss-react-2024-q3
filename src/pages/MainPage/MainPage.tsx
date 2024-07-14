import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { fetchData } from '../../services/apiService';
import { ApiResponsePeople } from '../../services/types';
import useSearchQuery from '../../hooks/useSearchQuery';
import Search from '../../components/Search';
import CardList from '../../components/CardList/CardList';
import { PersonList } from '../../types';
import { LS_KEYS } from '../../constants';

import './MainPage.css';

const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery(LS_KEYS.SearchQuery);
  const [personList, setPersonList] = useState<PersonList>({
    people: [],
    progress: false,
  });

  const navigate = useNavigate();

  const setPersonListProgress = useCallback((progress: boolean) => {
    setPersonList((list) => ({ ...list, progress }));
  }, []);

  const loadPeople = useCallback(
    (searchQuery?: string) => {
      setPersonListProgress(true);

      const path = searchQuery
        ? `people?search=${searchQuery.trim()}`
        : 'people';

      fetchData<ApiResponsePeople>(path)
        .then((data) => {
          setPersonList({
            people: data.results,
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

  function setInvalidState() {
    setPersonList({ ...personList, people: {} as [] });
  }

  useEffect(() => {
    loadPeople(searchQuery);
  }, [searchQuery, loadPeople]);

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
      <div className="bottom-section">
        <CardList people={personList.people} progress={personList.progress} />
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
