import { useState, useEffect, useCallback } from 'react';

const useSearchQuery = (
  lsKey: string
): [string | undefined, (query: string) => void] => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(() => {
    return localStorage.getItem(lsKey) ?? undefined;
  });

  const saveSearchQueryToLs = useCallback(() => {
    if (searchQuery) {
      localStorage.setItem(lsKey, searchQuery);
    }
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
