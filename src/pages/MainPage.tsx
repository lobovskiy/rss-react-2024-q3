import { useCallback, useEffect, useState } from 'react';

import { fetchResults } from '../services/apiService';
import Search from '../components/Search';
import CardList from '../components/CardList';
import { PersonList } from '../types';

import './MainPage.css';
import { LS_KEYS } from '../constants';

const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [personList, setPersonList] = useState<PersonList>({
    people: [],
    progress: false,
  });

  const setPersonListProgress = useCallback((progress: boolean) => {
    setPersonList((list) => ({ ...list, progress }));
  }, []);

  const loadPeople = useCallback(
    (searchQuery: string) => {
      setPersonListProgress(true);

      fetchResults(searchQuery.trim())
        .then((results) => {
          setPersonList({
            people: results,
            progress: false,
          });
        })
        .catch((error) => {
          setPersonListProgress(false);
          console.error('Error fetching results:', error);
        });
    },
    [setPersonListProgress]
  );

  const handleSearch = (searchQuery: string) => {
    localStorage.setItem(LS_KEYS.SearchQuery, searchQuery);
    setSearchQuery(searchQuery);
    loadPeople(searchQuery);
  };

  function setInvalidState() {
    setPersonList({ ...personList, people: {} as [] });
  }

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem(LS_KEYS.SearchQuery) ?? '';

    setSearchQuery(storedSearchQuery);
    loadPeople(storedSearchQuery);
  }, [loadPeople]);

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
      </div>
    </div>
  );
};

export default MainPage;
