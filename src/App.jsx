import { useState } from 'react';
import './App.css';

import axios from 'axios';
import Results from './components/Results';

import SearchForm from './components/SearchForm';
// import OneResult from './components/OneResult';

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  // const [findOne, setFindOne] = useState('');

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

  const onSuggest = async (search) => {
    // const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${search}`;
    // const { data } = await axios.get(url);
    // console.log({ data: data.query.search[0] });
    // setFindOne(data.query.search[0]);

    // console.log('what is search', search);
    setSearch(search);
    setSuggestions([]);
  };

  const deleteArticle = (id) => {
    const filterArr = results.filter((result) => result.pageid !== id);

    setResults(filterArr);
  };

  return (
    <div className="App">
      <SearchForm
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
        setSuggestions={setSuggestions}
        suggestions={suggestions}
        onSuggest={onSuggest}
        searchInfo={searchInfo}
      />
      {/* {findOne ? <OneResult findOne={findOne} /> : ''} */}
      <Results deleteArticle={deleteArticle} results={results} />
    </div>
  );
}

export default App;
