import { useCallback, useEffect, useState } from 'react';

import { fetchResults } from '../services/apiService';
import Search from '../components/Search';
import CardList from '../components/CardList';
import { PersonList } from '../types';

import './MainPage.css';

const MainPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [personList, setPersonList] = useState<PersonList>({
    people: [],
    progress: false,
  });

  const setPersonListProgress = useCallback((progress: boolean) => {
    setPersonList((list) => ({ ...list, progress }));
  }, []);

  const loadPeople = useCallback(
    (searchTerm: string) => {
      setPersonListProgress(true);

      fetchResults(searchTerm.trim())
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

  const handleSearch = (searchTerm: string) => {
    localStorage.setItem('searchTerm', searchTerm);
    setSearchTerm(searchTerm);
    loadPeople(searchTerm);
  };

  function setInvalidState() {
    setPersonList({ ...personList, people: {} as [] });
  }

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm') ?? '';

    setSearchTerm(storedSearchTerm);
    loadPeople(storedSearchTerm);
  }, [loadPeople]);

  return (
    <div className="main-page">
      <div className="top-section">
        <Search searchTerm={searchTerm} onSearch={handleSearch} />
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
