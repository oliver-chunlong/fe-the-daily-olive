import { useEffect, useState } from "react";
import theDailyOliveApi from "../api";
import ArticleSnippet from "../components/ArticleSnippet";
import { useParams } from "react-router-dom";
import Sort from "../components/Sort";

function TopicPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { topic } = useParams();
  const [sortBy, setSortBy] = useState("created_at");
  const [orderBy, setOrderBy] = useState("desc");

  useEffect(() => {
    if (!topic) return;

    setLoading(true);

    theDailyOliveApi
      .get(`/articles?topic=${topic}&sort_by=created_at&order=desc`)
      .then(({ data }) => {
        let sortedArticles = data.articles || [];

        if (sortBy === "comment_count") {
          sortedArticles.sort((a, b) => {
            const aCount = parseInt(a.comment_count);
            const bCount = parseInt(b.comment_count);

            return orderBy === "asc" ? aCount - bCount : bCount - aCount;
          });
        } else {
          sortedArticles = data.articles || [];
        }

        setArticles(sortedArticles);
        setError(null);
      })
      .catch(() => setError("Failed to load articles."))
      .finally(() => setLoading(false));
  }, [topic, sortBy, orderBy]);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>Articles on {topic}</h1>

      <Sort
        sortBy={sortBy}
        setSortBy={setSortBy}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />

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
