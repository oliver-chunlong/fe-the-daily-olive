function FullArticle({ article, numOfComments }) {
  const { title, topic, author, body, created_at, votes, article_img_url } = article;

  return (
    <article>
      <h1>{title}</h1>
      <img src={article_img_url} alt={title} width="700" />
      <p>
        <strong>Topic:</strong> {topic} | <strong>By:</strong> {author} | <strong>Date:</strong> {new Date(created_at).toLocaleDateString()}
      </p>
      <p>{body}</p>
      <p>❤️ {votes} votes</p>
      <p>💬 {numOfComments} comments</p>
    </article>
  );
}

export default FullArticle;