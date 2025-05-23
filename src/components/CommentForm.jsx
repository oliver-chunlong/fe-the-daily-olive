import { useState } from "react";
import theDailyOliveApi from "../api";

function CommentForm({ article_id, onCommentPosted }) {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!comment || !username) return;

    setPosting(true);
    setError(null);
    setSuccess(false);

    theDailyOliveApi
      .post(`/articles/${article_id}/comments`, {
        body: comment,
        username: username,
      })
      .then(({ data }) => {
        setComment("");
        setSuccess("Thanks! Your comment has been posted.");
        onCommentPosted(data.comment);
      })
      .catch(() => {
        setError("Failed to post comment. Please try again.");
        setSuccess(false);
      })
      .finally(() => setPosting(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        disabled={posting}
      />
      <br />
      <textarea
        placeholder="What's on your mind?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        disabled={posting}
      />
      <br />
      <button type="submit" disabled={posting || !comment}>
        {posting ? "Posting..." : "Post Comment"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}

export default CommentForm;
