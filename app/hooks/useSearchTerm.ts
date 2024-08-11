import { useState, useEffect, useCallback } from 'react';

const useSearchTerm = (
  lsKey: string,
  initialValue?: string | undefined
): [string | undefined, (query: string) => void] => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(
    initialValue
  );

  const saveSearchTermToLs = useCallback(() => {
    localStorage.setItem(lsKey, searchQuery ?? '');
  }, [lsKey, searchQuery]);

  useEffect(() => {
    saveSearchTermToLs();

    return () => {
      saveSearchTermToLs();
    };
  }, [saveSearchTermToLs]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      saveSearchTermToLs();
    });

    return () => {
      window.removeEventListener('beforeunload', () => {
        saveSearchTermToLs();
      });
    };
  }, [saveSearchTermToLs]);

  return [searchQuery, setSearchQuery];
};

export default useSearchTerm;
