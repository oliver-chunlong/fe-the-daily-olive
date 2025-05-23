import CommentForm from "./CommentForm";
import { useState } from "react";
import theDailyOliveApi from "../api";

function CommentsPanel({
  comments: initialComments,
  numOfComments,
  article_id,
}) {
  const [comments, setComments] = useState(initialComments);
  const [deletingId, setDeletingId] = useState(null);

  function handleNewComment(newComment) {
    setComments((currComments) => [newComment, ...currComments]);
  }

  function handleDelete(comment_id) {
    setDeletingId(comment_id);
    theDailyOliveApi
      .delete(`/comments/${comment_id}`)
      .then(() => {
        setComments((currComments) =>
          currComments.filter((comment) => comment.comment_id !== comment_id)
        );
      })
      .catch(() => setError("Failed to delete comment. Please try again."))
      .finally(() => setDeletingId(null));
  }

  if (numOfComments === 0) {
    return (
      <section>
        <h2>Comments</h2>
        <p>No comments to see here!</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Comments</h2>
      {comments.map(({ comment_id, author, body, created_at }) => (
        <div key={comment_id}>
          <p>
            By <strong>{author}</strong> on{" "}
            {new Date(created_at).toLocaleDateString()}:
          </p>
          <p>{body}</p>
          <button
            onClick={() => handleDelete(comment_id)}
            disabled={deletingId === comment_id}
          >
            {deletingId === comment_id ? "Deleting..." : "🗑 Delete"}
          </button>
          <hr />
        </div>
      ))}
      <CommentForm article_id={article_id} onCommentPosted={handleNewComment} />
    </section>
  );
}

export default CommentsPanel;
