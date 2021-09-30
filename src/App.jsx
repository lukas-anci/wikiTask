import { useEffect, useState } from 'react';
import './App.css';

import axios from 'axios';
import Results from './components/Results';
function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (search === '') return;

    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${search}`;

    const { data } = await axios.get(url);

    setResults(data.query.search);
    setSearchInfo(data.query.searchinfo);

    let matches = [];
    if (search.length > 0) {
      matches = results.filter((result) => {
        const regex = new RegExp(`${search}`, 'gi');
        return result.title.match(regex);
      });
    }

    setSuggestions(matches);
  };

  const onSuggest = (search) => {
    setSearch(search);
    setSuggestions([]);
  };

  const deleteArticle = (id) => {
    const filterArr = results.filter((result) => result.pageid !== id);

    setResults(filterArr);
  };

  return (
    <div className="App">
      <header>
        <h1>My wiki list</h1>
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="search"
            placeholder="type in your search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 100);
            }}
          />
          {suggestions &&
            suggestions.map((suggestion, i) => (
              <div
                onClick={() => onSuggest(suggestion.title)}
                className="suggestions"
                key={i}
              >
                {suggestion.title}
              </div>
            ))}
        </form>
        {searchInfo.totalhits ? (
          <p> Search Results: {searchInfo.totalhits}</p>
        ) : (
          ''
        )}
      </header>
      <Results deleteArticle={deleteArticle} results={results} />
    </div>
  );
}

export default App;
