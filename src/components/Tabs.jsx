const Tabs = ({ onhandletab }) => {
  return (
    <>
      <ul className="tabName">
        <li onClick={() => onhandletab("github")}>github</li>
        <li onClick={() => onhandletab("youtube")}>youtube</li>
        <li onClick={() => onhandletab("google")}>google</li>
      </ul>
    </>
  );
};

export default Tabs;
