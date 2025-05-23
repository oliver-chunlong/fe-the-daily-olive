import { useState } from "react";
import theDailyOliveApi from "../api";
import { useNavigate } from "react-router-dom";

function ArticleSnippet({ article, numOfComments }) {
  const {
    article_id,
    title,
    topic,
    author,
    body,
    created_at,
    votes: initialVotes,
    article_img_url,
  } = article;

  const [votes, setVotes] = useState(initialVotes);
  const [voting, setVoting] = useState(false);
  const [voteError, setVoteError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const navigate = useNavigate();

  function handleVote() {
    if (hasVoted) return;

    setVoting(true);
    setVotes((curr) => curr + 1);

    theDailyOliveApi
      .patch(`/articles/${article_id}`, { inc_votes: 1 })
      .then(() => setHasVoted(true))
      .catch(() => {
        setVotes((curr) => curr - 1);
        setVoteError("Failed to vote!");
      })
      .finally(() => setVoting(false));
  }

  function handleReadNow() {
    setLoading(true);

    theDailyOliveApi
      .get(`/articles/${article_id}`)
      .then(() => {
        navigate(`/articles/${article_id}`);
      })
      .catch(() => setLoadingError("Failed to load article."))
      .finally(() => setLoading(false));
  }

  return (
    <article>
      <h2>{title}</h2>
      <img src={article_img_url} alt={title} width="700" />
      <p>
        <strong>Topic:</strong> {topic} | <strong>By:</strong> {author} |{" "}
        <strong>Date:</strong> {new Date(created_at).toLocaleDateString()}
      </p>
      <button onClick={handleReadNow} disabled={loading}>
        📄 Read now
      </button>
      <button onClick={handleVote} disabled={voting || hasVoted}>
        ❤️ {votes} votes
      </button>
      {voteError && <p style={{ color: "red" }}>{voteError}</p>}
      <p>💬 {numOfComments} comments</p>
      <hr />
    </article>
  );
}

export default ArticleSnippet;