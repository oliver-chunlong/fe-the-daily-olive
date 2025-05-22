import { useState } from "react";

function NavBar({ setSearchTopic, orderBy, setOrderBy }) {
  const [input, setInput] = useState("");
  
  function handleSearch() {
    setSearchTopic(input);
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
