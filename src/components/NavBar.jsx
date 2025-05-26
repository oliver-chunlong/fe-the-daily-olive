import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar({}) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    if (input) {
      navigate(`/topics/${input.toLowerCase()}`);
    }
  }

  return (
    <nav>
      <input
        type="text"
        placeholder="Search by topic"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </nav>
  );
}

export default NavBar;