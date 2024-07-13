import { useEffect, useState } from 'react';

interface Props {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
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
