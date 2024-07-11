import { ChangeEvent, useState } from 'react';

interface Props {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

const Search: React.FC<Props> = ({ searchTerm, onSearch }) => {
  const [input, setInput] = useState<string>(searchTerm);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  function handleClickSearch() {
    onSearch(input.trim());
  }

  return (
    <div className="search">
      <input type="text" value={input} onChange={handleChange} />
      <button onClick={handleClickSearch}>Search</button>
    </div>
  );
};

export default Search;
