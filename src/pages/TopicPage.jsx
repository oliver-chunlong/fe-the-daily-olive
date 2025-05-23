import { useEffect, useState } from "react";
import theDailyOliveApi from "../api";
import ArticleSnippet from "../components/ArticleSnippet";
import { useParams } from "react-router-dom";

function TopicPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { topic } = useParams();

  useEffect(() => {
    if (!topic) return;

    theDailyOliveApi
      .get(`/articles?topic=${topic}`)
      .then(({ data }) => {
        setArticles(data.articles || []);
        setError(null);
      })
      .catch(() => setError("Failed to load articles."))
      .finally(() => setLoading(false));
  }, [topic]);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>Articles on {topic}</h1>
      {articles.length === 0 ? (
        <p>Oops! No articles to see here.</p>
      ) : (
        articles.map((article) => (
          <ArticleSnippet
            key={article.article_id}
            article={article}
            numOfComments={article.comment_count}
          />
        ))
      )}
    </main>
  );
}

export default TopicPage;
