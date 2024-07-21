import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputComp from "./InputComp";
import Tabs from "./Tabs";
import TabContent from "./TabContent";
import Loader from "./Loader";
import {
  fetchGitHubResults,
  fetchYouTubeResults,
  fetchGoogleResults,
} from "../api";

const ResultPage = () => {
  const [tab, setTab] = useState("github");
  const location = useLocation();

  const [resSearch, setResearch] = useState(location.state?.query || ""); // Get query from state
  const [gitApi, setGitapi] = useState([]);
  const [youApi, setYouapi] = useState([]);
  const [gogApi, setgogapi] = useState([]);
  const [gitError, setGitError] = useState(null);
  const [youError, setYouError] = useState(null);
  const [gogError, setGogError] = useState(null);
  const [loader, setLoader] = useState(false);
  // const maxResults = 10;

  // const gitApiFunc = async () => {
  //   const token = import.meta.env.VITE_GITHUB_TOKEN;

  //   try {
  //     setLoader(true);

  //     const response = await fetch(
  //       `https://api.github.com/search/repositories?q=${resSearch}`,
  //       {
  //         headers: {
  //           Authorization: `token ${token}`,
  //           Accept: "application/vnd.github.mercy-preview+json", // Required for topics API
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Please wait a few minutes before you try again`);
  //     }
  //     const data = await response.json();
  //     // console.log(data);
  //     setGitapi(data.items);
  //   } catch (error) {
  //     console.error("Error fetching data", error);
  //     setGitError(error.message);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  // const youApiFunc = async () => {
  //   const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  //   try {
  //     setLoader(true);

  //     const response = await fetch(
  //       `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${resSearch}&key=${apiKey}`
  //     );

  //     if (!response.ok) {
  //       // throw new Error(`HTTP error! status: ${response.status}`);
  //       throw new Error(`Please wait a few minutes before you try again`);
  //     }
  //     const data = await response.json();
  //     // console.log(data);
  //     setYouapi(data.items);
  //   } catch (error) {
  //     console.error("Error fetching data", error);
  //     setYouError(error.message);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  // const gogApiFunc = async () => {
  //   const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  //   const cx = import.meta.env.VITE_GOOGLE_CX;

  //   try {
  //     setLoader(true);

  //     const response = await fetch(
  //       `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${resSearch}`
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Please wait a few minutes before you try again`);
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     setgogapi(data.items);
  //   } catch (error) {
  //     console.error("Error fetching data", error);
  //     setGogError(error.message);
  //   } finally {
  //     setLoader(false);
  //   }
  // };
  const fetchData = async () => {
    if (!resSearch.trim()) {
      return;
    }
    setLoader(true);
    try {
      let gitData = await fetchGitHubResults(resSearch);
      console.log(gitData);
      setGitapi(gitData);
    } catch (error) {
      console.error("GitHub API error", error);

      setGitError(error.gitError);
    }

    try {
      let youApi = await fetchYouTubeResults(resSearch);
      setYouapi(youApi);
    } catch (error) {
      console.error("YouTube API error", error);
      setYouError(error.youError);
    }

    try {
      let gogData = await fetchGoogleResults(resSearch);
      setgogapi(gogData);
    } catch (error) {
      console.error("Google API error", error);
      setGogError(error.gogError);
    }
    setLoader(false);
  };

  useEffect(() => {
    if (resSearch) {
      fetchData();
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
        setResearch(query);
        // Update search query
      }
    }
  };

  const totalitems = [gitApi.length, youApi.length, gogApi.length];

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

          {gitApi.length > 0 && (
            <div className="content">
              {tab === "github" && loader ? (
                <Loader />
              ) : (
                tab === "github" &&
                (gitError ? (
                  <p className="error">{gitError}</p>
                ) : (
                  <>{<TabContent mapGit={gitApi} tab={tab} />}</>
                ))
              )}
              {tab === "youtube" && loader ? (
                <Loader />
              ) : (
                tab === "youtube" &&
                (youError ? (
                  <p className="error"> {youError}</p>
                ) : (
                  <>{<TabContent mapGit={youApi} tab={tab} />}</>
                ))
              )}
              {tab === "google" && loader ? (
                <Loader />
              ) : (
                tab === "google" &&
                (gogError ? (
                  <p className="error">{gogError}</p>
                ) : (
                  <>{<TabContent mapGit={gogApi} tab={tab} />}</>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultPage;
