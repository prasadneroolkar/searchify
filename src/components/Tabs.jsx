import gs from "/gs.png";
import git from "/git.png";
import ytube from "/ytube.png";

const Tabs = ({ onhandletab, tab, noRes }) => {
  return (
    <>
      <ul className="tabName">
        <li
          className={tab === "github" ? "active" : undefined}
          onClick={() => onhandletab("github")}
        >
          <p>
            <img src={git} />
            Github Repos <span>{noRes[0]}</span>{" "}
          </p>
        </li>
        <li
          className={tab === "youtube" ? "active" : undefined}
          onClick={() => onhandletab("youtube")}
        >
          <p>
            <img src={ytube} />
            Youtube Videos<span>{noRes[1]}</span>
          </p>
        </li>
        <li
          className={tab === "google" ? "active" : undefined}
          onClick={() => onhandletab("google")}
        >
          <p>
            <img src={gs} />
            Google Search Results<span>{noRes[2]}</span>
          </p>
        </li>
      </ul>
    </>
  );
};

export default Tabs;
