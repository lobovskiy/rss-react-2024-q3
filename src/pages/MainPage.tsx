import { Component } from 'react';

import { fetchResults } from '../services/apiService';
import Search from '../components/Search';
import PersonList from '../components/PersonList.tsx';
import { IPerson } from '../types.ts';

import './MainPage.css';

interface MainPageState {
  searchTerm: string;
  results: IPerson[];
  progress: boolean;
}

class MainPage extends Component<NonNullable<unknown>, MainPageState> {
  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') ?? '',
      results: [],
      progress: false,
    };
  }

  componentDidMount() {
    this.loadResults();
  }

  loadResults = () => {
    const { searchTerm } = this.state;
    const onSuccess = () => this.setState({ progress: false });
    const onError = () => this.setState({ progress: false });

    this.setState({ progress: true }, () => {
      fetchResults(searchTerm.trim(), { onSuccess, onError })
        .then((results) => {
          this.setState({ results });
        })
        .catch((error) => {
          console.error('Error fetching results:', error);
        });
    });
  };

  handleSearch = (searchTerm: string) => {
    localStorage.setItem('searchTerm', searchTerm);

    this.setState({ searchTerm }, this.loadResults);
  };

  setInvalidState = () => {
    this.setState({ results: {} as [] });
  };

  render() {
    const { searchTerm, results, progress } = this.state;

    return (
      <div className="main-page">
        <div className="top-section">
          <Search searchTerm={searchTerm} onSearch={this.handleSearch} />
          <button
            onClick={() => {
              this.setInvalidState();
            }}
          >
            Throw Error
          </button>
        </div>
        <div className="bottom-section">
          <PersonList people={results} progress={progress} />
        </div>
      </div>
    );
  }
}

export default MainPage;
