function Filters({ filterText, setSearchTerm, filterStatus, setFilterStatus }) {
  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Search Tasks Here"
        value={filterText}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="dropdown-btn"
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  );
}

export default Filters;
