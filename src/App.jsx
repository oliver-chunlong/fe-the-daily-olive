import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

function App() {
  const [searchTopic, setSearchTopic] = useState("");
  const [orderBy, setOrderBy] = useState("asc");

  return (
    <Router>
      <Header />
      <NavBar
        searchTopic={searchTopic}
        setSearchTopic={setSearchTopic}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;
