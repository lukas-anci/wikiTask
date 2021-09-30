const Results = ({ results, deleteArticle }) => {
  return (
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
  );
};

export default Results;
