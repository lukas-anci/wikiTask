const OneResult = ({ findOne }) => {
  return (
    <div className="results one-result">
      <div className="result one">
        <h3>{findOne.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: findOne.snippet }}></p>
        <a href="/" target="_blank" rel="noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
};

export default OneResult;
