import { useEffect, useState } from 'react';

interface Props {
  searchTerm: string;
  onSearch: (searchQuery: string) => void;
}

const Search: React.FC<Props> = ({ searchTerm, onSearch }) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form className="search" onSubmit={handleSubmit} data-testid="search-form">
      <input
        type="text"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        data-testid="search-input"
      />
      <button type="submit" data-testid="search-button">
        Search
      </button>
    </form>
  );
};

export default Search;
