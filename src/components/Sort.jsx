function Sort({ sortBy, setSortBy, orderBy, setOrderBy }) {
  return (
    <div>
      <label>Sort by: </label>
      <select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
      >
        <option value="created_at">Date</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comment Count</option>
      </select>

      <button onClick={() => setOrderBy(orderBy === "asc" ? "desc" : "asc")}>
        Order: {orderBy === "asc" ? "Ascending" : "Descending"}
      </button>
    </div>
  );
}

export default Sort;