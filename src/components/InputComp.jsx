const InputComp = () => {
  return (
    <div className="search_box">
      <input
        type="text"
        ref={queryRef}
        placeholder="search"
        onKeyPress={storeValue}
      />
    </div>
  );
};

export default InputComp;
