import FullArticle from "./FullArticle";

function ArticlePanel({ article, numOfComments }) {
  return (
    <section>
      <FullArticle article={article} numOfComments={numOfComments} />
    </section>
  );
}

export default ArticlePanel;