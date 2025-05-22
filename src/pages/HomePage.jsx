import { Link } from "react-router-dom";

function HomePage() {

  return (
    <div>
      <main>
        <Link to="/articles/1">Article 1</Link>
      </main>
    </div>
  );
}

export default HomePage;
