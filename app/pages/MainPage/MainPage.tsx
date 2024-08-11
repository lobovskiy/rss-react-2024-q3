import { useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import { useGetPeopleQuery } from '../../services/apiService';
import useSearchTerm from '../../hooks/useSearchTerm';

import Search from '../../components/Search';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';
import { LS_KEYS } from '../../constants';

import './MainPage.css';
import ThemeSelector from '../../components/ThemeSelector/ThemeSelector';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useSearchTerm(LS_KEYS.SearchQuery);
  const [testError, setTestError] = useState<boolean>(false);

  const searchParamPage = searchParams.get('page');
  const page = searchParamPage ? parseInt(searchParamPage, 10) : undefined;

  const { data, isLoading } = useGetPeopleQuery({ page, search: searchTerm });

  const handleSearch = (searchTerm: string) => {
    setSearchParams();
    setSearchTerm(searchTerm);
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
      !target.closest('.pagination') &&
      !target.closest('.flyout')
    ) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('details');
      const queryParams = newSearchParams.toString();

      navigate(`/?${queryParams}`);
    }
  };

  if (testError) {
    throw new Error('Test error');
  }

  return (
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
            <CardList people={data?.results ?? []} progress={isLoading} />
          </div>
          <div className="bottom-section__list-pagination">
            <Pagination
              page={page ?? 1}
              count={data?.count ?? 1}
              progress={isLoading}
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
