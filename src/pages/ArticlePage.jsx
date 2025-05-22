import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import theDailyOliveApi from "../api";
import ArticlePanel from "../components/ArticlePanel";
import CommentsPanel from "../components/CommentsPanel";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      theDailyOliveApi.get(`/articles/${article_id}`),
      theDailyOliveApi.get(`/articles/${article_id}/comments`),
    ])
      .then(([articleRes, commentsRes]) => {
        setArticle(articleRes.data.articles);
        setComments(commentsRes.data.comments);
        setError(null);
      })
      .catch(() => setError("Failed to load article or comments!"))
      .finally(() => setLoading(false));
  }, [article_id]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>{error}</p>;
  if (!article) return <p>No article found!</p>;

  return (
    <div>
      <ArticlePanel article={article} numOfComments={comments.length} />
      <CommentsPanel comments={comments} />
    </div>
  );
}

export default ArticlePage;
