import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputComp from "./InputComp";
import Tabs from "./Tabs";
import TabContent from "./TabContent";
import Loader from "./Loader";

const ResultPage = () => {
  const [tab, setTab] = useState("github");
  const location = useLocation();

  const [resSearch, setResearch] = useState(location.state?.query || ""); // Get query from state
  const [gitApi, setGitapi] = useState([]);
  const [youApi, setYouapi] = useState({});
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const maxResults = 10;

  const gitApiFunc = async () => {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    try {
      setLoader(true);
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${resSearch}`,
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
    } finally {
      setLoader(false);
    }
  };

  const youApiFunc = async () => {
    const apiKey = "AIzaSyCahw31RJVcj1d8xd3DG9pwZfIzF2K9838";

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${resSearch}&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setYouapi(data.items);
    } catch (error) {
      console.error("Error fetching data", error);
      setError(error.message);
    }
  };

  const gogApiFunc = async () => {
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
      youApiFunc();
    }
  }, [resSearch, tab]);

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

  const totalitems = gitApi.length;

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
          <Tabs onhandletab={handleTab} tab={tab} noRes={totalitems} />
          {error && <p>Error: {error}</p>}
          {gitApi.length > 0 && (
            <div className="content">
              {loader ? (
                <Loader />
              ) : (
                tab === "github" && (
                  <>{<TabContent mapGit={gitApi} tab={tab} />}</>
                )
              )}
              {tab === "youtube" && (
                <>{<TabContent mapGit={youApi} tab={tab} />}</>
              )}
              {tab === "google" && (
                <>{<TabContent mapGit={gitApi} tab={tab} />}</>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultPage;
