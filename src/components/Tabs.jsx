const Tabs = ({ onhandletab, tab }) => {
  return (
    <>
      <ul className="tabName">
        <li
          className={tab === "github" && "active"}
          onClick={() => onhandletab("github")}
        >
          <p>Github</p>
        </li>
        <li
          className={tab === "youtube" && "active"}
          onClick={() => onhandletab("youtube")}
        >
          <p>Youtube</p>
        </li>
        <li
          className={tab === "google" && "active"}
          onClick={() => onhandletab("google")}
        >
          <p>Google</p>
        </li>
      </ul>
    </>
  );
};

export default Tabs;
