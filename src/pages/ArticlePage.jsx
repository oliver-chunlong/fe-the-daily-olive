import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import theDailyOliveApi from "../api";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    theDailyOliveApi
      .get(`/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.articles);
      })
      .catch(() => {
        setError("Failed to load article!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [article_id]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>{error}</p>;
  if (!article) return <p>No article found!</p>;

  const { title, topic, author, body, created_at, votes, article_img_url } =
    article;

  return (
    <article>
      <h1>{title}</h1>
      <img src={article_img_url} alt={title} width="700" />
      <p>
        <strong>Topic:</strong> {topic} | <strong>By:</strong> {author} | <strong>Date:</strong> {new Date(created_at).toLocaleDateString()}
      </p>
      <p>{body}</p>
      <p>❤️ {votes} votes</p>
    </article>
  );
}

export default ArticlePage;
