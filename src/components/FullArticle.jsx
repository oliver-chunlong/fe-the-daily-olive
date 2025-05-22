import { useState } from "react";
import theDailyOliveApi from "../api";

function FullArticle({ article, numOfComments }) {
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

  function handleVote() {
    if (hasVoted) return;

    setVoting(true);
    setVotes((curr) => curr + 1);

    theDailyOliveApi
      .patch(`/articles/${article_id}`, { inc_votes: 1 })
      .then(() => {
        setHasVoted(true);
      })
      .catch(() => {
        setVotes((curr) => curr - 1);
        setVoteError("Failed to vote!");
      })
      .finally(() => {
        setVoting(false);
      });
  }

  return (
    <article>
      <h1>{title}</h1>
      <img src={article_img_url} alt={title} width="700" />
      <p>
        <strong>Topic:</strong> {topic} | <strong>By:</strong> {author} |{" "}
        <strong>Date:</strong> {new Date(created_at).toLocaleDateString()}
      </p>
      <p>{body}</p>
      <button onClick={handleVote} disabled={voting || hasVoted}>
        ❤️ {votes} votes
      </button>
      <p>💬 {numOfComments} comments</p>
    </article>
  );
}

export default FullArticle;
