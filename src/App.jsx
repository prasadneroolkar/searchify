import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchMain from "./components/SearchMain";

import "./App.css";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SearchMain />}></Route>
          <Route path="/result-page" element={<ResultPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
