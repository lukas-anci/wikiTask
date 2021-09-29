import { useEffect, useState } from 'react';
import './App.css';

import axios from 'axios';
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

    // console.log(data);
    setResults(data.query.search);
    setSearchInfo(data.query.searchinfo);
    // const titleName = data.query.search.filter((x) => x.title);
    // // console.log('resultai', titleName);

    let matches = [];
    if (search.length > 0) {
      matches = results.filter((result) => {
        const regex = new RegExp(`${search}`, 'gi');
        return result.title.match(regex);
      });
    }
    // console.log('matches?', matches);

    setSuggestions(matches);
  };

  const onSuggest = (search) => {
    setSearch(search);
    setSuggestions([]);
  };

  const deleteArticle = (id) => {
    console.log('delete', id);

    const filterArr = results.filter((result) => result.pageid !== id);

    setResults(filterArr);
  };

  console.log('rezultas', results);
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
      <div className="results">
        {results.map((result, i) => {
          const newUrl = `https://en.wikipedia.org/?curid=${result.pageid}`;

          return (
            <div key={i} className="result">
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={newUrl} target="_blank" rel="noreferrer">
                Read more
              </a>

              <button
                className="delete"
                onClick={() => deleteArticle(result.pageid)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
