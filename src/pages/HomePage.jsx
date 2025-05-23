import { useEffect, useState } from "react";
import theDailyOliveApi from "../api";
import ArticleSnippet from "../components/ArticleSnippet";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    theDailyOliveApi
      .get("/articles")
      .then(({ data }) => {
        setArticles(data.articles || []);
        setError(null);
      })
      .catch(() => setError("Failed to load articles."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>Latest Articles</h1>
      {articles.map((article) => (
        <ArticleSnippet
          key={article.article_id}
          article={article}
          numOfComments={article.comment_count ?? 0}
        />
      ))}
    </main>
  );
}

export default HomePage;
