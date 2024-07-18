import gs from "/gs.png";
import git from "/git.png";
import ytube from "/ytube.png";

const Tabs = ({ onhandletab, tab, noRes }) => {
  return (
    <>
      <ul className="tabName">
        <li
          className={tab === "github" && "active"}
          onClick={() => onhandletab("github")}
        >
          <p>
            <img src={git} />
            Github Repos <span>{noRes}</span>{" "}
          </p>
        </li>
        <li
          className={tab === "youtube" && "active"}
          onClick={() => onhandletab("youtube")}
        >
          <p>
            <img src={ytube} />
            Youtube Videos
          </p>
        </li>
        <li
          className={tab === "google" && "active"}
          onClick={() => onhandletab("google")}
        >
          <p>
            <img src={gs} />
            Google Search Results
          </p>
        </li>
      </ul>
    </>
  );
};

export default Tabs;
