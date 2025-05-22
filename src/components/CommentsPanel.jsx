function CommentsPanel({ comments, numOfComments }) {
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
          <hr />
        </div>
      ))}
    </section>
  );
}

export default CommentsPanel;
