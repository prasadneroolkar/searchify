const SearchMain = () => {
  return (
    <>
      {" "}
      <div className="container">
        <h1>Searchify</h1>
        <div className="search_box">
          <input type="text" placeholder="search" />
        </div>
        <div className="searched_items">
          <p>
            This is a multisearch engine.which allows the user to search a
            specific query at once on multiple platform mentioned below.
          </p>
          <div className="icons">
            <img src="./youtube.png" alt="Youtube" />
            <img src="/github.png" alt="github" />
            <img src="/stack-overflow.png" alt="stackoverflow" />
            <img src="/google.png" alt="google" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchMain;
