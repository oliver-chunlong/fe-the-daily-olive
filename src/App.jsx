import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import TopicPage from "./pages/TopicPage";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

function App() {
  const [orderBy, setOrderBy] = useState("asc");

  return (
    <Router>
      <Header />
      <NavBar setOrderBy={setOrderBy} orderBy={orderBy} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="/topics/:topic" element={<TopicPage />} />
      </Routes>
    </Router>
  );
}

export default App;
