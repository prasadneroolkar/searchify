const InputComp = ({ handleStore, refProp, value, onChange }) => {
  return (
    <div className="search_box">
      <input
        ref={refProp}
        value={value}
        type="text"
        placeholder="search"
        onKeyPress={handleStore}
        onChange={onChange}
      />
    </div>
  );
};

export default InputComp;
