import { Component, ChangeEvent } from 'react';

interface SearchProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

interface SearchState {
  input: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    this.state = {
      input: props.searchTerm,
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.input.trim());
  };

  render() {
    return (
      <div className="search">
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
