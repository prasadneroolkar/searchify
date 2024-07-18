import { useRef } from "react";

import { useNavigate } from "react-router-dom";
import InputComp from "./InputComp";
const SearchMain = () => {
  const queryRef = useRef();
  const navigate = useNavigate();

  const storeValue = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = queryRef.current.value;
      if (query.trim()) {
        navigate("/result-page", { state: { query } });
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="search_box">
          <InputComp refProp={queryRef} handleStore={storeValue} />
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
