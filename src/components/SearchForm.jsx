const SearchForm = ({
  handleSearch,
  search,
  setSearch,
  setSuggestions,
  suggestions,
  onSuggest,
  searchInfo,
}) => {
  return (
    <header>
      <h1>My wiki list</h1>
      <form onSubmit={handleSearch} className="search-box">
        <input
          type="search"
          placeholder="Find your wikipedia article"
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
  );
};

export default SearchForm;
