import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar({ setOrderBy, orderBy }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    if (input.trim()) {
      navigate(`/topics/${input.trim().toLowerCase()}`);
    }
  }

  function handleSort() {
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
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
      <button onClick={handleSort}>
        Sort: {orderBy === "asc" ? "Ascending" : "Descending"}
      </button>
    </nav>
  );
}

export default NavBar;
