import { useState, useEffect, useCallback } from 'react';

const useSearchQuery = (lsKey: string): [string, (query: string) => void] => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return localStorage.getItem(lsKey) ?? '';
  });

  const saveSearchQueryToLs = useCallback(() => {
    localStorage.setItem(lsKey, searchQuery);
  }, [lsKey, searchQuery]);

  useEffect(() => {
    return () => {
      saveSearchQueryToLs();
    };
  }, [saveSearchQueryToLs]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      saveSearchQueryToLs();
    });

    return () => {
      window.removeEventListener('beforeunload', () => {
        saveSearchQueryToLs();
      });
    };
  }, [saveSearchQueryToLs]);

  return [searchQuery, setSearchQuery];
};

export default useSearchQuery;
