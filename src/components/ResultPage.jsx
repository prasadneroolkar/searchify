import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
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
    const token = process.env.REACT_APP_GITHUB_TOKEN;
    console.log("GitHub Token:", token);

    try {
      const response = await fetch(
        `https://api.github.com/search/topics?q=${resSearch}&per_page=${maxResults}`,
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
        <div>
          {error && <p>Error: {error}</p>}
          {gitApi.length > 0 &&
            gitApi.map((elem, id) => (
              <div key={id}>
                <p>
                  <a
                    href={`https://github.com/topics/${elem.name}`}
                    target="_blank"
                  >
                    {elem.name}
                  </a>
                </p>
                <p>{elem.short_description}</p>

                {/* <p>{elem.short_description}</p> */}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ResultPage;
