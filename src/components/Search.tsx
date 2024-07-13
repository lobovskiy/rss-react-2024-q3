import { useEffect, useState } from 'react';

interface Props {
  searchQuery: string;
  onSearch: (searchQuery: string) => void;
}

const Search: React.FC<Props> = ({ searchQuery, onSearch }) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
