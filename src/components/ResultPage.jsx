import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const [tab, setTab] = useState("github");
  const location = useLocation();
  const retriveUrl = () => {
    return new URLSearchParams(location.search);
  };

  const queries = retriveUrl();

  const searchQuery = queries.get("query");
  const [resSearch, setResearch] = useState(searchQuery || "");
  const [gitApi, setGitapi] = useState([]);
  const [error, setError] = useState(null);
  const maxResults = 10; // Set your desired maximum number of results here

  const gitApiFunc = async () => {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${resSearch}&per_page=${maxResults}`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.mercy-preview+json", // Required for topics API
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setGitapi(data.items);
    } catch (error) {
      console.error("Error fetching data", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (resSearch) {
      gitApiFunc();
    }
  }, [resSearch]);

  const handleTab = (selectedTab) => {
    setTab(selectedTab);
  };

  return (
    <>
      <div className="container">
        <div className="search_result">
          <input
            type="text"
            value={resSearch}
            onChange={(e) => setResearch(e.target.value)}
          />
        </div>
        <div className="tab">
          <ul className="tabName">
            <li onClick={() => handleTab("github")}>github</li>
            <li onClick={() => handleTab("youtube")}>youtube</li>
            <li onClick={() => handleTab("google")}>google</li>
          </ul>
          {error && <p>Error: {error}</p>}
          {gitApi.length > 0 && (
            <div className="content">
              {tab === "github" && (
                <>
                  {gitApi.map((elem, id) => {
                    return (
                      <ul className="tab_content one" key={id}>
                        <li>
                          <img
                            className="profileImg"
                            style={{ width: "20px", height: "20px" }}
                            src={`https://github.com/${elem.name}.png?size=40`}
                            alt=""
                          />
                          <a
                            href={`https://github.com/${elem.name}`}
                            target="_blank"
                          >
                            {elem.name}
                          </a>
                        </li>
                        <li>{elem.short_description}</li>
                      </ul>
                    );
                  })}
                </>
              )}
              {tab === "youtube" && (
                <>
                  {gitApi.map((elem, id) => {
                    return (
                      <ul className="tab_content two" key={id}>
                        <li>
                          <img
                            className="profileImg"
                            style={{ width: "20px", height: "20px" }}
                            src={`https://github.com/${elem.name}.png?size=40`}
                            alt=""
                          />
                          <a
                            href={`https://github.com/${elem.name}`}
                            target="_blank"
                          >
                            {elem.name}
                          </a>
                        </li>
                        <li>{elem.short_description}</li>
                      </ul>
                    );
                  })}
                </>
              )}
              {tab === "google" && (
                <>
                  {gitApi.map((elem, id) => (
                    <ul className="tab_content three" key={id}>
                      <li>
                        <img
                          className="profileImg"
                          style={{ width: "20px", height: "20px" }}
                          src={`https://github.com/${elem.name}.png?size=40`}
                          alt=""
                        />
                        <a
                          href={`https://github.com/${elem.name}`}
                          target="_blank"
                        >
                          {elem.name}
                        </a>
                      </li>
                      <li>{elem.short_description}</li>
                    </ul>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultPage;
