import { useLocation } from "react-router-dom";
const ResultPage = () => {
  const retriveUrl = () => {
    return new URLSearchParams(useLocation().search);
  };

  const queries = retriveUrl();
  console.log(queries);
  const searchQuery = queries.get("query");

  return <>{searchQuery}</>;
};

export default ResultPage;
