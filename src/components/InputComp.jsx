import search from "/search.png";
const InputComp = ({ handleStore, refProp, value, onChange }) => {
  return (
    <>
      <h1>Searchify</h1>
      <div className="search_box">
        <span>
          <span>
            <img src={search} alt="searchicon" />
          </span>
          <input
            ref={refProp}
            value={value}
            type="text"
            placeholder="Search"
            onKeyPress={handleStore}
            onChange={onChange}
          />
        </span>
      </div>
    </>
  );
};

export default InputComp;
