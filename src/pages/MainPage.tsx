import { useCallback, useEffect, useState } from 'react';

import { fetchResults } from '../services/apiService';
import Search from '../components/Search';
import PersonList from '../components/PersonList.tsx';
import { IPerson } from '../types.ts';

import './MainPage.css';

interface IPersonList {
  people: IPerson[];
  progress: boolean;
}

const MainPage: React.FC = () => {
  const initialSearchTerm = localStorage.getItem('searchTerm') ?? '';
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [personList, setPersonList] = useState<IPersonList>({
    people: [],
    progress: false,
  });

  const loadResults = useCallback(() => {
    setPersonList((list) => ({ ...list, progress: true }));
    fetchResults(searchTerm.trim())
      .then((results) => {
        setPersonList({
          people: results,
          progress: false,
        });
      })
      .catch((error) => {
        console.error('Error fetching results:', error);
        setPersonList((list) => ({ ...list, progress: true }));
      });
  }, [searchTerm]);

  useEffect(() => {
    loadResults();
  }, [loadResults]);

  function handleSearch(searchTerm: string) {
    localStorage.setItem('searchTerm', searchTerm);

    setSearchTerm(searchTerm);
    loadResults();
  }

  function setInvalidState() {
    setPersonList({ ...personList, people: {} as [] });
  }

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
        <PersonList people={personList.people} progress={personList.progress} />
      </div>
    </div>
  );
};

export default MainPage;
