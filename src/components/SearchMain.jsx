import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchMain = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const storeValue = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/result-page?query=${query}`);
    }
  };
  return (
    <>
      <div className="container">
        <h1>Searchify</h1>
        <div className="search_box">
          <input
            type="text"
            placeholder="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={storeValue}
          />
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
