import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputComp from "./InputComp";
import Tabs from "./Tabs";
import TabContent from "./TabContent";

const ResultPage = () => {
  const [tab, setTab] = useState("github");
  const location = useLocation();
  // const retriveUrl = () => {
  //   return new URLSearchParams(location.state?.query);
  // };

  // const queries = retriveUrl();

  // const searchQuery = queries.get("query");
  const [resSearch, setResearch] = useState(location.state?.query || ""); // Get query from state
  const [gitApi, setGitapi] = useState([]);
  const [error, setError] = useState(null);
  const maxResults = 10;

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

  const handleInputChange = (e) => {
    setResearch(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = e.target.value.trim();
      if (query) {
        setResearch(query); // Update search query
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="search_result">
          <InputComp
            handleStore={handleSearch}
            refProp={null}
            value={resSearch}
            onChange={handleInputChange}
          />
        </div>
        <div className="tab">
          <Tabs onhandletab={handleTab} />
          {error && <p>Error: {error}</p>}
          {gitApi.length > 0 && (
            <div className="content">
              {tab === "github" && <>{<TabContent mapGit={gitApi} />}</>}
              {tab === "youtube" && <>{<TabContent mapGit={gitApi} />}</>}
              {tab === "google" && <>{<TabContent mapGit={gitApi} />}</>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultPage;
